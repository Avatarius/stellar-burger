import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { selectLoginError, selectRequest } from '../../services/slices/user';
import { Preloader } from '@ui';
import { loginUser } from '../../services/thunk/user';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(selectLoginError);
  const request = useSelector(selectRequest);

  const dispatch = useDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (request) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
