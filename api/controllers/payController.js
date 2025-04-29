import ipn from 'paypal-ipn';
import { PayModel } from '../models/payModel.js';

export class PayController {


    static async paypalIpn(req, res) {

        res.sendStatus(200);

        ipn.verify(req.body, async (err, msg) => {
            if (err) {
                console.error('IPN Verification Error:', err);
                // Handle the verification error (e.g., log it)
                return;
            }

            if (msg === 'VERIFIED') {
                console.log('IPN VERIFIED:', req.body);

                const paymentStatus = req.body.payment_status;
                const txnId = req.body.txn_id;
                const mcGross = req.body.mc_gross;
                const paymentDate = req.body.payment_date;
                const name = req.body.first_name + ' ' + req.body.last_name;



                // --- Idempotency Check (Crucial in a real application) ---
                const alreadyProcessed = await PayModel.checkTransactionProcessed(txnId);
                if (alreadyProcessed) {
                    console.warn('IPN Warning: Transaction already processed:', txnId);
                    return; // Do not process again
                }

                // --- Process Based on Payment Status ---
                if (paymentStatus === 'Completed') {
                    const paymentDetails = {
                        txnId: txnId,
                        paymentDate: paymentDate,
                        payerName: name,
                        payerEmail: req.body.payer_email,
                        amount: mcGross,
                        status: paymentStatus

                        // Add other relevant details from req.body
                    };
                    await PayModel.processSuccessfulPayment(paymentDetails);
                    // In a real app, you'd update your database here
                } else if (paymentStatus === 'Pending') {
                    console.warn('IPN: Payment Pending:', req.body.pending_reason);
                    // Handle pending payments (e.g., echecks)
                } else if (paymentStatus === 'Failed' || paymentStatus === 'Denied' || paymentStatus === 'Reversed') {
                    console.error('IPN: Payment Error:', paymentStatus, req.body.reason_code);
                    // Handle failed or reversed payments
                } else {
                    console.log('IPN: Unknown Payment Status:', paymentStatus);
                }

            } else if (msg === 'INVALID') {
                console.error('IPN: Invalid Message Received:', req.body);
                // Handle invalid messages (e.g., log them for investigation)
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