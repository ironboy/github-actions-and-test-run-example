// Affärslogik för ärenden. Ren logik utan HTTP – därför lätt att enhetstesta.

export const MAX_TITLE_LENGTH = 100;
export const PRIORITIES = ['low', 'normal', 'high'];

// Kontrollerar indata. Returnerar en lista med fel (tom lista = giltigt).
export function validateTicket(input) {
  const errors = [];
  const title = typeof input?.title === 'string' ? input.title.trim() : '';

  if (title.length === 0) {
    errors.push('Titel saknas');
  }
  if (title.length > MAX_TITLE_LENGTH) {
    errors.push(`Titeln får vara högst ${MAX_TITLE_LENGTH} tecken`);
  }
  if (input?.priority !== undefined && !PRIORITIES.includes(input.priority)) {
    errors.push('Ogiltig prioritet');
  }
  return errors;
}

// Skapar ett ärende av redan validerad indata.
export function createTicket(input, id, now = new Date()) {
  return {
    id,
    title: input.title.trim(),
    priority: input.priority ?? 'normal',
    done: false,
    createdAt: now.toISOString()
  };
}

// Sorterar så att högst prioritet kommer först. Ändrar inte originallistan.
export function sortByPriority(tickets) {
  const rank = { high: 0, normal: 1, low: 2 };
  return [...tickets].sort((a, b) => rank[a.priority] - rank[b.priority]);
}
