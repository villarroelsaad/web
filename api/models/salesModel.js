import { connection } from "../config";

export class SalesModel {
    
    // Function to simulate checking if a transaction has already been processed
    static async getSales() {
        const [sales] = await connection.execute('SELECT * FROM Sales');
        return sales; // Assuming you want to return the first row of data
    }
  
      
      // Function to simulate processing a successful payment
      static async getSalesById({id}) {
        const [sales] = await connection.execute('SELECT * FROM Sales where id_c = ?', [id]);
        return sales; // Assuming you want to return the first row of data
    }
      
      
}