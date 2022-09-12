import { useLocation } from 'react-router-dom';
import React from 'react';

export const useQueryParams = () => {
  const { search } = useLocation();

  return React.useMemo(() => {
    const urlSearchParams = new URLSearchParams(search);

    const params: { [index: string]: string } = {};

    urlSearchParams.forEach((value, name) => {
      params[name] = value;
    });

    return params;
  }, [search]);
};
