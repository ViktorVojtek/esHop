import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Context } from '../../../app-data/lib/state/Store';
import { REGISTER_USER_MUTATION } from '../../../app-data/graphql/mutation';
import RegisterForm from '../../../app-data/shared/components/RegisterForm';

const SetupPage: () => JSX.Element = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { dispatch } = useContext(Context);
  const [registerUserMutate] = useMutation(REGISTER_USER_MUTATION);

  const handleSetErrorMessage: (message: string) => void = (message) => {
    const parsedMessage: string = message.replace('GraphQL error:', ' ').trim();

    setErrorMessage(parsedMessage);
    dispatch({ type: 'SET_MODAL', payload: true });
  };

  const handleSubmitRegister: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    try {
      event.preventDefault();

      const form = event.currentTarget;
      const email = form.email.value;
      const firstName = form.firstName.value;
      const lastName = form.lastName.value;
      const password = form.password.value;

      await registerUserMutate({
        variables: {
          userRegInput: {
            admin: true,
            email,
            firstName,
            lastName,
            password,
            role: 0,
          },
        },
      });
    } catch (err) {
      console.log(err);
      handleSetErrorMessage(err.message);
    }
  };

  return (
    <RegisterForm
      submitHandler={handleSubmitRegister}
      errorMsg={errorMessage}
    />
  );
};

export default SetupPage;
