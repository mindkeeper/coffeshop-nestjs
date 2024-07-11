type TQuery = {
  [key: string]: any;
};

export const filterArrayObject = (array: TQuery[]): TQuery[] => {
  return array.filter((obj) => {
    return Object.values(obj).every(
      (value) => value !== null && value !== undefined && value !== '',
    );
  });
};
