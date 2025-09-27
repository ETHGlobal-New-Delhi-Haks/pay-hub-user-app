/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button, Input, Sheet, Snackbar, Typography } from '@mui/joy';
import type { LoginScreenProps } from './type';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axiosInstance, { setAuthToken } from '../../api/axios';
import { useState } from 'react';

const initialSchemeValues = {
  identifier: '',
  password: '',
};

const validationSchema = yup.object({
  identifier: yup.string().required('Username or email is required'),
  password: yup.string().required('Password is required'),
});

export function SignUp({ toggleSignScreen, onLogin }: LoginScreenProps) {
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

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      if (isLoading) {
        return;
      }
      const { data } = await axiosInstance.post('/auth/local', {
        identifier: values.identifier,
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
    <>
      <Sheet
        sx={{
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          p: 2,
        }}
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
              PayPal
            </Typography>
            <Box>
              <Input
                size="lg"
                placeholder="Enter your name or e‑mail"
                {...inputFormProps('identifier')}
              />
              {inputFormProps('identifier').error && (
                <Typography pl={1} color="danger">
                  {touched.identifier &&
                    Boolean(errors.identifier) &&
                    errors.identifier}
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
                <Typography pl={1} color="danger">
                  {touched.password &&
                    Boolean(errors.password) &&
                    errors.password}
                </Typography>
              )}
            </Box>
            <Button
              loading={isLoading}
              onClick={handleSignUp}
              size="lg"
              sx={{ mt: 1 }}
              disabled={
                !dirty ||
                Object.values(errors).some((error) => !!error) ||
                !!Object.values(values).some((value) => !value)
              }
            >
              Sign up
            </Button>
            <Typography
              level="body-sm"
              sx={{ textAlign: 'center' }}
              onClick={toggleSignScreen}
            >
              Sign in
            </Typography>
          </Box>
        </Box>
        {/*  @ts-ignore */}
        <Snackbar
          autoHideDuration={3000}
          open={!!requestError}
          color="danger"
          component="div"
          variant="solid"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          horizontal="center"
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
    </>
  );
}
