import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  selectRequest,
  selectUpdateError,
  selectUserData
} from '../../services/slices/user';
import { useSelector, useDispatch } from '../../services/store';
import { updateUser } from '../../services/thunk/user';
import { Preloader } from '@ui';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const request = useSelector(selectRequest);
  const updateError = useSelector(selectUpdateError);

  const [formValue, setFormValue] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user ? user.name : '',
      email: user ? user.email : '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (request) {
    return <Preloader />;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateError}
    />
  );
};
