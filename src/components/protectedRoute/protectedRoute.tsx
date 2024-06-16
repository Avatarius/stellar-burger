import { FC, useEffect } from 'react';
import { ProtectedRouteProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectIsAuthChecked,
  selectUserData
} from '../../services/slices/user';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { fetchOrders } from '../../services/slices/orders';

const ProtectedRoute: FC<ProtectedRouteProps> = ({ onlyUnAuth, children }) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUserData);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders());
    }
  });

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};

export { ProtectedRoute };
