import axios from 'axios';

const api = axios.create({
  baseURL: 'https://62c70b8074e1381c0a70239f.mockapi.io/',
});

const responseInterceptor = (response) => response.data;

api.interceptors.response.use(responseInterceptor);

const pizzasApi = {
  getPizzas: (categoryId, sortBy, order) => {
    const params = {};

    if (categoryId > 0) params.category = categoryId;

    params.sortBy = sortBy;
    params.order = order;

    return api.get('pizzas', { params });
  },
};

export { pizzasApi };
