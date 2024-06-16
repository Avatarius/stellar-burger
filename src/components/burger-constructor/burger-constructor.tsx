import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectConstructorsItems
} from '../../services/slices/burgerConstructor';

import {
  selectOrder,
  selectRequest,
  clearOrder
} from '../../services/slices/order';

import { orderBurger } from '../../services/thunk/order';

import { useNavigate } from 'react-router-dom';
import { selectUserData } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserData);
  const constructorItems = useSelector(selectConstructorsItems);
  const ingredientsIdArray =
    !constructorItems.bun || !constructorItems.ingredients
      ? []
      : [
          constructorItems.bun._id,
          ...constructorItems.ingredients.map((item) => item._id)
        ];

  const orderRequest = useSelector(selectRequest);

  const orderModalData = useSelector(selectOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    dispatch(orderBurger(ingredientsIdArray))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
