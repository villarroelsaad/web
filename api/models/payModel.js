import { connection } from "../config.js";

export class PayModel {
    

  static async checkTransactionProcessed(txnId) {

    const id = txnId;
    const [check] = await connection.execute('SELECT * from Ipn WHERE pay_id_i = ?', [id])
    if (check[0].length > 0) {
      return false; 
    }
  }
      

      static async processSuccessfulPayment({paymentDetails}) {
        const { id, txnId, paymentDate, payerName, payerEmail, amount, status } = paymentDetails;
        await connection.execute('INSERT INTO Payments (id_i,transaction_id, PayerName_i,PayerEmail_i,PaymentDate_i,   Amount_i,Status_i ) VALUES (?, ?, ?, ?, ?, ?)', [id, txnId, paymentDate, payerName, payerEmail, amount, status]);
        await connection.execute('INSERT INTO Sales ( PayerName_s,PayerEmail_s,PaymentDate_s,  Amount_s,Status_s,Id.i_s ) VALUES (?, ?, ?, ?, ?, ?)', [paymentDate, payerName, payerEmail, amount, status, id]);
      }
      

  static async getIpnData() {
    const [ipnData] = await connection.execute('SELECT * FROM Ipn WHERE status_i = "Completed"');
    return ipnData; 
  }
}