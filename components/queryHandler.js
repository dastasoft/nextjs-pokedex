import Spinner from '@bit/dastag.ui-components.spinner';

const QueryHandler = ({ children, status }) => {
  return (
    <>
      {status === 'loading' && <Spinner />}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && children}
    </>
  );
};

export default QueryHandler;
