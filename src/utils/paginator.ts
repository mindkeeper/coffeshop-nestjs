export interface IPaginatedResult<T> {
  items: T[];
  meta: {
    total: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
    previousPage: number | null;
    nextPage: number | null;
  };
}

export type PaginateOptions = {
  page?: number | string;
  perPage: number | string;
};

export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<IPaginatedResult<T>>;

export const paginator = (
  defaultOptions: PaginateOptions,
): PaginateFunction => {
  return async (model, args: any = { where: undefined }, options) => {
    const page = Number(options?.page || defaultOptions.page) || 1;
    const perPage = Number(options?.perPage || defaultOptions.perPage) || 10;
    const skip = page > 0 ? (page - 1) * perPage : 0;
    const [items, total] = await Promise.all([
      model.findMany({
        ...args,
        take: perPage,
        skip,
      }),
      model.count({ where: args.where }),
    ]);
    const totalPages = Math.ceil(total / perPage);
    return {
      items,
      meta: {
        total,
        currentPage: page,
        perPage,
        totalPages,
        previousPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
      },
    };
  };
};
