import { translit } from './translit';

export const createPizzaIndex = (title: string, type: number, size: number) => {
  return `${translit(title)}-type-${type}-size-${size}`;
};
