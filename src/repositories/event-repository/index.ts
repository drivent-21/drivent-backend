import { prisma } from '@/config';
import { redis } from '@/config/redis';

async function findFirst() {
  const cachedEvents = await redis.get('events');

  if (cachedEvents) {
    const event = JSON.parse(cachedEvents);
    return event;
  }
  const event = await prisma.event.findFirst();

  redis.set('events', JSON.stringify(event));

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
