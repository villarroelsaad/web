import { connection } from "../config";

export class SalesModel {
    

    static async getSales() {
        const [sales] = await connection.execute('SELECT Id_s,PayerName_i_s,PayerEmail_i_s,PaymentDate_i_s,Amount_s,Status_s FROM Sales inner join Ipn on Sales.id_c = ipn.id_c where Status_s = "Completed" order by PaymentDate_i_s desc limit 10');
        return sales; 
    }
  
      

      static async getSalesById({id}) {
        const [sales] = await connection.execute('SELECT * FROM Sales where id_c = ?', [id]);
        return sales;
    }


    static async deleteSale({ id }) {
        await connection.execute('DELETE FROM Sales WHERE Id_s = ?', [id]);
        return true;
    }
      
      
}