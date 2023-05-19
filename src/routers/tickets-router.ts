/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket, getTicketTypes, getTickets, createOrUpdateTicketType } from '@/controllers';
import { ticketsSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .put('/types', createOrUpdateTicketType)
  .get('/', getTickets)
  .post('/', validateBody(ticketsSchema), createTicket);

export { ticketsRouter };
