import { connection } from "../config.js";

export class SalesModel {
    

    static async getSales() {
        const [sales] = await connection.execute('SELECT Id_s,PayerName_s,PayerEmail_s,PaymentDate_s,Amount_s,Status_s FROM Sales inner join Ipn on Id_i_s = Id_i where Status_i = "Completed" order by PaymentDate_s desc limit 10');
        return sales; 
    }
  
      

      static async getSalesById({id}) {
          const [sales] = await connection.execute('SELECT * FROM Sales where id_s = ?', [id]);
        return sales;
    }


    static async deleteSale({ id }) {
        await connection.execute('DELETE FROM Sales WHERE Id_s = ?', [id]);
        return true;
    }
      
      
}