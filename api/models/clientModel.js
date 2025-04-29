import { connection } from "../config";
export class ClientsModel {
    
    // Function to simulate checking if a transaction has already been processed
    static async getClients() {
        const [clients] = await connection.execute('SELECT * FROM Cliens');
        return clients; 
    }
      
      // Function to simulate processing a successful payment
      static async getClientsById({id}) {
        const [Clients] = await connection.execute('SELECT * FROM Clients where id_c = ?', [id]);
        return Clients; // Assuming you want to return the first row of data
    }
      
      // Function to simulate processing a refund
      static async updateClient({id, input}) {
        const { name, email, role } = input;
        await connection.execute('UPDATE Clients SET name_c = ?, email_c = ?, role_c = ? WHERE id_c = ?', [name, email, role, id]);
        return true; 
    }
    
        static async deleteClient({id}) {
            await connection.execute('DELETE FROM Clients WHERE id_c = ?', [id]);
            return true; 
        }
}