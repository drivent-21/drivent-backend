/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket, getTicketTypes, getTickets, createOrUpdateTicketType } from '@/controllers';
import { ticketsSchema, ticketTypeSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .put('/types', validateBody(ticketTypeSchema), createOrUpdateTicketType)
  .get('/types', getTicketTypes)
  .get('/', getTickets)
  .post('/', validateBody(ticketsSchema), createTicket);

export { ticketsRouter };
