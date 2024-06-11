import { FC } from 'react';
import styles from './ingredient-details-container.module.css';
import { ReactNode } from 'react';

interface IngredientDetailsContainerProps {
  children: ReactNode;
}

const IngredientDetailsContainer: FC<IngredientDetailsContainerProps> = ({
  children
}) => <div className={styles.container}>{children}</div>;

export { IngredientDetailsContainer };
