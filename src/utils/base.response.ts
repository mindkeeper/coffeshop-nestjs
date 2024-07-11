import { z } from 'zod';

export const ResponseBase = z.object({
  message: z.string().default('Success'),
  path: z.string(),
  timestamp: z.string().default(new Date().toISOString()),
  status: z.number().default(200),
});

export const MetaBase = z.object({
  page: z.number().default(1),
  perPage: z.number().default(10),
  total: z.number().default(40),
  totalPages: z.number().default(4),
  previousPage: z.number().default(null),
  nextPage: z.number().default(2),
});
