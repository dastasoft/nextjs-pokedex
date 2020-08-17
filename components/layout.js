import { ReactQueryDevtools } from 'react-query-devtools';

const Layout = ({ children }) => (
  <div>
    {children}
    <ReactQueryDevtools />
  </div>
);

export default Layout;
