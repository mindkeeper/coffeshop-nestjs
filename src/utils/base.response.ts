import { z } from 'zod';

export const ResponseBase = z.object({
  statusCode: z.number().default(200),
  status: z.boolean().default(true),
  message: z.string().default('Success'),
  path: z.string(),
  timestamp: z.string().default(new Date().toISOString()),
});

export const MetaBase = z.object({
  currentPage: z.number().default(1),
  perPage: z.number().default(10),
  total: z.number().default(40),
  totalPages: z.number().default(4),
  previousPage: z.number().nullable().default(null),
  nextPage: z.number().nullable().default(2),
});
