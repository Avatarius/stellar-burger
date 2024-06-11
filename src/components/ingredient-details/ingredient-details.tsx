import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/burgerSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const location = useLocation();
  const id = location.pathname.split('/').at(-1);

  const ingredientData = useSelector(selectIngredients).find(
    (item) => item._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
