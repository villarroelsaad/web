import { ClientModel } from '../models/clientModel.js';

export class ClientsController {
    static async getClient(req, res) {
        try {
            const Clients = await ClientModel.getAllClient();
            res.status(200).json(Clients);
        } catch (error) {
            console.error('Error fetching Client:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async editClient(req, res) {
        const { id } = req.params;
        const input = req.body;
        try {
            const sale = await ClientModel.getClientById(id, input);
            if (!sale) {
                return res.status(404).json({ message: 'Sale not found' });
            }
            const updatedSale = await ClientModel.updateClient(id, req.body);
            res.status(200).json(updatedSale);
        }
        catch (error) {
            console.error('Error updating sale:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async deleteSale(req, res) {
        const { id } = req.params;
        try {
            const sale = await ClientModel.getSaleById(id);
            if (!sale) {
                return res.status(404).json({ message: 'Sale not found' });
            }
            await ClientModel.deleteSale(id);
            res.status(200).json({ message: 'Sale deleted successfully' });
        } catch (error) {
            console.error('Error deleting sale:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

