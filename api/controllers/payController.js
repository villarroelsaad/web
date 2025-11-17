import ipn from 'paypal-ipn';
import { v4 as uuidv4 } from 'uuid';
import { PayModel } from '../models/payModel.js';

export class PayController {


    static async paypalIpn(req, res) {

        // Respond quickly to PayPal IPN (PayPal expects a 200)
        res.sendStatus(200);

        // Verify IPN asynchronously. paypal-ipn accepts the parsed body or raw body.
        ipn.verify(req.body, async (err, msg) => {
            if (err) {
                console.error('IPN Verification Error:', err);
                return;
            }

            if (msg === 'VERIFIED') {
                console.log('IPN VERIFIED:', req.body);

                const id = uuidv4();
                const paymentStatus = req.body.payment_status;
                const txnId = req.body.txn_id;
                const mcGross = req.body.mc_gross;
                const paymentDate = req.body.payment_date;
                const name = (req.body.first_name || '') + ' ' + (req.body.last_name || '');

                try {
                    // Idempotency check: avoid processing the same transaction twice
                    const alreadyProcessed = await PayModel.checkTransactionProcessed(txnId);
                    if (alreadyProcessed) {
                        console.warn('IPN Warning: Transaction already processed:', txnId);
                        return; // Do not process again
                    }

                    if (paymentStatus === 'Completed') {
                        const paymentDetails = {
                            id,
                            txnId,
                            paymentDate,
                            payerName: name.trim(),
                            payerEmail: req.body.payer_email,
                            amount: mcGross,
                            status: paymentStatus
                        };
                        await PayModel.processSuccessfulPayment(paymentDetails);
                    } else if (paymentStatus === 'Pending') {
                        console.warn('IPN: Payment Pending:', req.body.pending_reason);
                    } else if (['Failed', 'Denied', 'Reversed'].includes(paymentStatus)) {
                        console.error('IPN: Payment Error:', paymentStatus, req.body.reason_code);
                    } else {
                        console.log('IPN: Unknown Payment Status:', paymentStatus);
                    }
                } catch (e) {
                    console.error('IPN processing error:', e);
                }

            } else if (msg === 'INVALID') {
                console.error('IPN: Invalid Message Received:', req.body);
            }
        });
    };
    static async getIpnData(req, res) {
        try {
            const ipnData = await PayModel.getIpnData();
            res.status(200).json(ipnData);
        } catch (error) {
            console.error('Error fetching IPN data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}