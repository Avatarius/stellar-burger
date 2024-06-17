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
import { useNavigate } from 'react-router-dom';
import { DetailsContainer } from '../ui/details-container/details-container';
import { ProtectedRoute } from '../protectedRoute';
import { fetchIngredients } from '../../services/slices/ingredients';
import { fetchFeed } from '../../services/thunk/feed';
import { checkUserAuth } from '../../services/thunk/user';
import { clearOrder } from '../../services/slices/order';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const id = location.pathname.split('/').at(-1);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, []);

  return (
    <div className={styles.app}>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<AppHeader />}>
          <Route index element={<ConstructorPage />} />
          <Route
            path='/ingredients/:id'
            element={
              <DetailsContainer title='Детали ингредиента'>
                <IngredientDetails />
              </DetailsContainer>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <DetailsContainer title={`#0${id}`}>
                <OrderInfo />
              </DetailsContainer>
            }
          />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <DetailsContainer title={`#0${id}`}>
                <OrderInfo />
              </DetailsContainer>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => {
                  navigate('/');
                  dispatch(clearOrder());
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#0${id}`}
                onClose={() => {
                  navigate('/feed');
                  dispatch(clearOrder());
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={`#0${id}`}
                onClose={() => {
                  navigate('/profile/orders');
                  dispatch(clearOrder());
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
