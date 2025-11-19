import { connection } from "../config.js";

export class ClientModel {
    
    // Function to simulate checking if a transaction has already been processed
    static async getClients() {
      const [clients] = await connection.execute('SELECT * FROM Clients');
        return clients; 
    }
      
      // Function to simulate processing a successful payment
  static async getClientById({ id }) {
        const [Clients] = await connection.execute('SELECT * FROM Clients where id_c = ?', [id]);
        return Clients; // Assuming you want to return the first row of data
  }
  static async createClient({ input }) {
    const { name, email } = input;
    const [result] = await connection.execute('INSERT INTO Clients (PayerName_c, PayerEmail_c) VALUES (?, ?)', [name, email]);
    return { id: result.insertId, name, email };
  }
      
      // Function to simulate processing a refund
      static async updateClient({id, input}) {
        const { name, email } = input;
        await connection.execute('UPDATE Clients SET PayerName_c = ?, PayerEmail_c = ? WHERE Id_c = ?', [name, email, id]);
        return true; 
    }
    
        static async deleteClient({id}) {
          await connection.execute('DELETE FROM Clients WHERE Id_c = ?', [id]);
            return true; 
        }
}