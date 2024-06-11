import {
  ConstructorPage,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Feed } from '@pages';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchBurgers } from '../../slices/burgerSlice';
import { fetchFeed } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { IngredientDetailsContainer } from '../ui/ingredient-details-container/ingredient-details-container';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  console.log(location);

  useEffect(() => {
    dispatch(fetchBurgers());
    dispatch(fetchFeed());
  }, []);

  return (
    <div className={styles.app}>
      {/* <AppHeader />
    <ConstructorPage /> */}
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<AppHeader />}>
          <Route index element={<ConstructorPage />} />
          <Route
            path='/ingredients/:id'
            element={
              <IngredientDetailsContainer>
                <IngredientDetails />
              </IngredientDetailsContainer>
            }
          />
          <Route path='/feed' element={<Feed />} />
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='*' element={<NotFound404 />} />
          <Route
            path='/feed/:number'
            element={
              <Modal title='test' onClose={() => console.log('clsoe')}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='test' onClose={() => console.log('clsoe')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='test' onClose={() => console.log('clsoe')}>
                <IngredientDetails />
              </Modal>
            }
          /> */}
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
