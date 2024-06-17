import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders, selectOrders } from '../../services/slices/orders';
import { selectUserData } from '../../services/slices/user';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchOrders());
    }
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
