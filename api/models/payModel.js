import { connection } from "../config";

export class PayModel {
    

  static async checkTransactionProcessed(txnId) {

    const id = txnId;
    const [check] = await connection.execute('SELECT * from Ipn WHERE Id_i = ?', [id])
    if (check[0].length > 0) {
      return false; 
    }
  }
      

      static async processSuccessfulPayment({paymentDetails}) {
        const { txnId, paymentDate, payerName, payerEmail, amount, status } = paymentDetails;
        await connection.execute('INSERT INTO Payments (Id.i, PayerName_i,PayerEmail_i,PaymentDate_i,   Amount_i,Status_i ) VALUES (?, ?, ?, ?, ?, ?)', [txnId, paymentDate, payerName, payerEmail, amount, status]);

      }
      

  static async getIpnData() {
    const [ipnData] = await connection.execute('SELECT * FROM Ipn WHERE status_i = "Completed"');
    return ipnData; 
  }
}