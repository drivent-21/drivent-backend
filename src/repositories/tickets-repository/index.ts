import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { CreateTicketParams } from '@/protocols';

async function createOrUpdateTicketType(
  name: string,
  price: number,
  isRemote: boolean,
  includesHotel: boolean,
  ticketTypeId: any,
): Promise<number> {
  let ticketType = null;

  !ticketTypeId
    ? (ticketType = await prisma.ticketType.create({
        data: {
          name,
          price,
          isRemote,
          includesHotel,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }))
    : (ticketType = await prisma.ticketType.update({
        where: ticketTypeId,
        data: {
          name,
          price,
          isRemote,
          includesHotel,
          updatedAt: new Date(),
        },
      }));

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
  createOrUpdateTicketType,
};
