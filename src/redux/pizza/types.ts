export type Pizza = {
  id: string;
  category: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  countItems: number;
  status: Status;
}

export type FetchPizzasArgs = {
  categoryId?: number;
  sortBy?: string;
  order?: string;
  searchValue?: string;
  limit?: number;
  currentPage?: number;
};

export type FetchPizzasAnswer = {
  count: number;
  pizzas: Pizza[];
};
