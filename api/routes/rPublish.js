import express from 'express';
import { PublishController } from '../controllers/publishController.js';

export const routerPublish = express.Router();

// Get all publishes
routerPublish.get('/', PublishController.getPublishes);

// Create or update a publish (expects { publish, userId } in body)
routerPublish.post('/', PublishController.createPublish);

// Get publish by user id
routerPublish.get('/user/:userId', PublishController.getByUser);

// Delete publish by id
routerPublish.delete('/:id', PublishController.deletePublish);
