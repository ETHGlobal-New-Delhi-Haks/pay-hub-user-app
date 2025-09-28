/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button, Input, Sheet, Snackbar, Typography } from '@mui/joy';
import type { LoginScreenProps } from './type';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axiosInstance, { setAuthToken } from '../../api/axios';
import { useState } from 'react';

const initialSchemeValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must contain at least 6 symbols')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Confirm password')
    .oneOf([yup.ref('password')], "Passwords don't match"),
});

export function SignIn({ toggleSignScreen, onLogin }: LoginScreenProps) {
  const [requestError, setRequestError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    dirty,
  } = useFormik({
    initialValues: initialSchemeValues,
    validationSchema: validationSchema,
    onSubmit: () => undefined,
  });

  const inputFormProps = (inputName: keyof typeof initialSchemeValues) => ({
    error: touched[inputName] && Boolean(errors[inputName]),
    onBlur: handleBlur,
    onChange: handleChange,
    value: values[inputName],
    autoComplete: 'new-password',
    name: inputName,
  });

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      if (isLoading) {
        return;
      }
      const { data } = await axiosInstance.post('/auth/local/register', {
        email: values.email,
        username: values.username,
        password: values.password,
      });

      setAuthToken(data.jwt);
      localStorage.setItem('access_token', data.jwt);
      onLogin();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setRequestError(error?.response?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet
      sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', p: 2 }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <Box
          sx={{ display: 'grid', gap: 2 }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography level="h2" sx={{ textAlign: 'center', mb: 1 }}>
            PayHub
          </Typography>
          <Box>
            <Input
              size="lg"
              placeholder="Enter username"
              {...inputFormProps('username')}
            />
            {inputFormProps('username').error && (
              <Typography color="danger" pl={1}>
                {touched.username &&
                  Boolean(errors.username) &&
                  errors.username}
              </Typography>
            )}
          </Box>
          <Box>
            <Input
              size="lg"
              placeholder="Enter your e‑mail"
              {...inputFormProps('email')}
            />
            {inputFormProps('email').error && (
              <Typography color="danger" pl={1}>
                {touched.email && Boolean(errors.email) && errors.email}
              </Typography>
            )}
          </Box>
          <Box>
            <Input
              size="lg"
              type="password"
              placeholder="Password"
              {...inputFormProps('password')}
            />
            {inputFormProps('password').error && (
              <Typography color="danger" pl={1}>
                {touched.password &&
                  Boolean(errors.password) &&
                  errors.password}
              </Typography>
            )}
          </Box>
          <Box>
            <Input
              size="lg"
              type="password"
              placeholder="Confirm password"
              {...inputFormProps('passwordConfirmation')}
            />
            {inputFormProps('passwordConfirmation').error && (
              <Typography color="danger" pl={1}>
                {touched.passwordConfirmation &&
                  Boolean(errors.passwordConfirmation) &&
                  errors.passwordConfirmation}
              </Typography>
            )}
          </Box>
          <Button
            size="lg"
            loading={isLoading}
            onClick={handleSignIn}
            sx={{ mt: 1 }}
            disabled={
              !dirty ||
              Object.values(errors).some((error) => !!error) ||
              !!Object.values(values).some((value) => !value)
            }
          >
            Sign in
          </Button>
          <Typography
            level="body-sm"
            sx={{ textAlign: 'center' }}
            onClick={toggleSignScreen}
          >
            Sign up
          </Typography>
        </Box>
      </Box>
      {/*  @ts-ignore */}
      <Snackbar
        autoHideDuration={3000}
        open={!!requestError}
        color="danger"
        variant="solid"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={(_, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setRequestError(false);
        }}
      >
        {requestError}
      </Snackbar>
    </Sheet>
  );
}
