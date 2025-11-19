import { ClientModel } from '../models/clientModel.js';

export class ClientsController {
    static async getClients(req, res) {
        try {
            const Clients = await ClientModel.getClients();
            res.status(200).json(Clients);
        } catch (error) {
            console.error('Error fetching Client:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async createClient(req, res) {
        const input = req.body;
        console.log(input);
        try {
            const newClient = await ClientModel.createClient({ input });
            res.status(201).json(newClient);
        } catch (error) {
            console.error('Error creating client:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async editClient(req, res) {
        const { id } = req.params;
        const input = req.body;
        try {
            const sale = await ClientModel.getClientById({ id });
            if (!sale) {
                return res.status(404).json({ message: 'Sale not found' });
            }
            const updatedSale = await ClientModel.updateClient({ id, input });
            res.status(200).json(updatedSale);
        }
        catch (error) {
            console.error('Error updating sale:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async deleteClient(req, res) {
        const { id } = req.params;
        try {
            const sale = await ClientModel.getClientById({ id });
            if (!sale) {
                return res.status(404).json({ message: 'Client not found' });
            }
            await ClientModel.deleteClient({ id });
            res.status(200).json({ message: 'Client deleted successfully' });
        } catch (error) {
            console.error('Error deleting client:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

