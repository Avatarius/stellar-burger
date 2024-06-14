import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectConstructorItems } from '../../slices/ingredientsSlice';
import {
  selectOrderRequest,
  setOrderRequest,
  orderBurger,
  selectNewOrder
} from '../../slices/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItems);
  const ingredientsIdArray =
    !constructorItems.bun || !constructorItems.ingredients
      ? []
      : [
          constructorItems.bun._id,
          ...constructorItems.ingredients.map((item) => item._id)
        ];

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectNewOrder);

  const onOrderClick = () => {
    dispatch(orderBurger(ingredientsIdArray));
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {
    dispatch(setOrderRequest(false));
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

  // return null;

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
