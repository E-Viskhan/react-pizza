export const stringify = (params: { [index: string]: string | number }) => {
  return Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');
};
