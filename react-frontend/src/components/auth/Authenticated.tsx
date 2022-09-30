import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Authenticated = () => {
  const shouldRedirect = localStorage.getItem('shouldRedirect');
  const navigate = useNavigate();

  // useEffect(() => {
  // if (!shouldRedirect) {
  //   localStorage.setItem('shouldRedirect', 'ok');
  //   navigate(0);
  // }
  // }, [navigate, shouldRedirect]);

  if (shouldRedirect === 'ok') {
    localStorage.removeItem('shouldRedirect');
  }
  return <Navigate to='/project' state='orieo' />;

  return (
    <div className='grid place-items-center w-full bg-slate-200 text-lg'>Authenticating ... 🚀</div>
  );
};

export default Authenticated;
