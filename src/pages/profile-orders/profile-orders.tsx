import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectOrders } from '../../services/slices/orders';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  return <ProfileOrdersUI orders={orders} />;
};
