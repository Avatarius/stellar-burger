import { FC, useEffect } from 'react';
import { ProtectedRouteProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  checkUserAuth,
  selectIsAuthChecked,
  selectUserData
} from '../../slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';

const ProtectedRoute: FC<ProtectedRouteProps> = ({ onlyOnAuth, children }) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUserData);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyOnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyOnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};

export { ProtectedRoute };
