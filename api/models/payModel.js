import { connection } from "../config.js";

export class PayModel {

  // Returns true if transaction was already processed
  static async checkTransactionProcessed(txnId) {
    const [rows] = await connection.execute('SELECT 1 FROM Payments WHERE transaction_id = ? LIMIT 1', [txnId]);
    return Array.isArray(rows) && rows.length > 0;
  }

  // Store successful payment information. Accepts a plain object with payment details.
  static async processSuccessfulPayment(paymentDetails) {
    const { id, txnId, paymentDate, payerName, payerEmail, amount, status } = paymentDetails;

    // Insert into Payments (adjust column names to match your schema if different)
    await connection.execute(
      'INSERT INTO Payments (id_i, transaction_id, PayerName_i, PayerEmail_i, PaymentDate_i, Amount_i, Status_i) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, txnId, payerName, payerEmail, paymentDate, amount, status]
    );

    // Insert summary into Sales table and link back to payment id
    await connection.execute(
      'INSERT INTO Sales (PayerName_s, PayerEmail_s, PaymentDate_s, Amount_s, Status_s, Id_i_s) VALUES (?, ?, ?, ?, ?, ?)',
      [payerName, payerEmail, paymentDate, amount, status, id]
    );
  }

  static async getIpnData() {
    const [ipnData] = await connection.execute('SELECT * FROM Ipn WHERE status_i = "Completed"');
    return ipnData;
  }
}