import axios from 'axios';
import { pickBy } from 'lodash';
import {
  FetchPizzasAnswer,
  FetchPizzasArgs,
  Pizza,
} from '../redux/pizza/types';

const api = axios.create({
  baseURL: 'https://62c70b8074e1381c0a70239f.mockapi.io/',
});

const pizzasApi = {
  getPizzas: (args: FetchPizzasArgs) => {
    const {
      categoryId: category,
      sortBy,
      order,
      searchValue: title,
      limit,
      currentPage: page,
    } = args;

    const params = pickBy({ category, sortBy, order, title, limit, page });

    return api.get<FetchPizzasAnswer>('pizzas', { params });
  },
  getPizzaById: (id: string) => {
    return api.get<Pizza>('pizzas/' + id);
  },
};

export { pizzasApi };
