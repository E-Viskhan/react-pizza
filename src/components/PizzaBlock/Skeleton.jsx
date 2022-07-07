import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={468}
    viewBox="0 0 280 468"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="273" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="309" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="413" rx="10" ry="10" width="95" height="30" />
    <rect x="128" y="408" rx="25" ry="25" width="150" height="40" />
    <circle cx="140" cy="125" r="125" />
  </ContentLoader>
);

export default MyLoader;
