import { connection } from '../config.js'; // Adjust the path as necessary

export class PayModel {
    
    // Function to simulate checking if a transaction has already been processed
  static async checkTransactionProcessed(txnId) {
  // In a real application, you would query your database here
    const id = txnId;
    const [check] = await connection.execute('SELECT * WHERE Id = ?', [id])
    if (check[0].length > 0) {
      return false; // Replace with your database lookup
    }
  }
      
      // Function to simulate processing a successful payment
      static async processSuccessfulPayment({paymentDetails}) {
        const { txnId, paymentDate, payerName, payerEmail, amount, status } = paymentDetails;
        await connection.execute('INSERT INTO Payments (TxnId, PaymentDate, PayerName, PayerEmail, Amount, ) VALUES (?, ?, ?, ?, ?, ?)', [txnId, paymentDate, payerName, payerEmail, amount, status]);

      }
      
      // Function to simulate processing a refund
  static async getIpnData() {
    const [ipnData] = await connection.execute('SELECT * FROM Payments WHERE status = "Completed"');
    return ipnData; // Assuming you want to return the first row of data
  }
}