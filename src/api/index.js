import axios from 'axios';
import { pickBy } from 'lodash';

const api = axios.create({
  baseURL: 'https://62c70b8074e1381c0a70239f.mockapi.io/',
});

const responseInterceptor = (response) => response.data;

api.interceptors.response.use(responseInterceptor);

const pizzasApi = {
  getPizzas: (category, sortBy, order, title, limit, page) => {
    const params = pickBy({ category, sortBy, order, title, limit, page });

    return api.get('pizzas', { params });
  },
};

export { pizzasApi };
