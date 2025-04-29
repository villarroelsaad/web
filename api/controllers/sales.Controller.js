import { SalesModel } from '../models/sales.Model.js';

export class SalesController {
    static async getSales(req, res) {
        try {
            const sales = await SalesModel.getAllSales();
            res.status(200).json(sales);
        } catch (error) {
            console.error('Error fetching sales:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
  /* static async editSale(req, res) {
        const { id } = req.params;
        const input = req.body;
        try {
            const sale = await SalesModel.getSaleById(id);
            if (!sale) {
                return res.status(404).json({ message: 'Sale not found' });
            }
            const updatedSale = await SalesModel.updateSale(id, input);
            res.status(200).json(updatedSale);
        }
        catch (error) {
            console.error('Error updating sale:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }*/
    static async deleteSale(req, res) {
        const { id } = req.params;
        try {
            const sale = await SalesModel.getSaleById(id);
            if (!sale) {
                return res.status(404).json({ message: 'Sale not found' });
            }
            await SalesModel.deleteSale(id);
            res.status(200).json({ message: 'Sale deleted successfully' });
        } catch (error) {
            console.error('Error deleting sale:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

