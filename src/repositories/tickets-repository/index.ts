/* eslint-disable import/no-unresolved */
import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { CreateTicketParams } from '@/protocols';

async function upsertTicketType(
  name: string,
  price: number,
  isRemote: boolean,
  includesHotel: boolean,
  ticketTypeId: any,
): Promise<number> {
  if (!ticketTypeId)
    return prisma.ticketType
      .create({
        data: {
          name,
          price,
          isRemote,
          includesHotel,
        },
      })
      .then((ticketType) => ticketType.id);

  const ticketType = await prisma.ticketType.upsert({
    where: {
      id: ticketTypeId,
    },
    create: {
      name,
      price,
      isRemote,
      includesHotel,
    },
    update: {
      name,
      price,
      isRemote,
      includesHotel,
    },
  });
  console.log(ticketType);
  return ticketType.id;
}

async function findTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number): Promise<
  Ticket & {
    TicketType: TicketType;
  }
> {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true, //join
    },
  });
}

async function createTicket(ticket: CreateTicketParams) {
  return prisma.ticket.create({
    data: ticket,
  });
}

async function findTickeyById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function findTickeWithTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function ticketProcessPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

export default {
  findTicketTypes,
  findTicketByEnrollmentId,
  createTicket,
  findTickeyById,
  findTickeWithTypeById,
  ticketProcessPayment,
  upsertTicketType,
};
