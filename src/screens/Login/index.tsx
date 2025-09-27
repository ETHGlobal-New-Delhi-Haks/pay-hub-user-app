import { useState } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

type Props = {
  onLogin: VoidFunction;
};

export function LoginPage({ onLogin }: Props) {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleSignScreen = () => setIsSignIn((prev) => !prev);

  return isSignIn ? (
    <SignIn toggleSignScreen={toggleSignScreen} onLogin={onLogin} />
  ) : (
    <SignUp toggleSignScreen={toggleSignScreen} onLogin={onLogin} />
  );
}
