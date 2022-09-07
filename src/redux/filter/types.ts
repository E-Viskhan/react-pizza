export enum sortName {
  RATING = 'популярные',
  EXPENSIVE_FIRST = 'сначала дорогие',
  CHEAP_FIRST = 'сначала доступные',
  ALPHABET = 'от А до Я',
  REVERSE_ALPHABET = 'от А до Я',
}

export enum sortBy {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export enum sortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortItem = {
  name: sortName;
  sortBy: sortBy;
  order: sortOrder;
};

export interface FilterSliceState {
  categoryId: number;
  searchValue?: string;
  currentPage: number;
  sort: SortItem;
}
