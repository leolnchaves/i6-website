
import React from 'react';
import GradientBackground from '@/components/ui/gradient-background';
import { useLogin } from './auth/useLogin';
import LoginHeader from './auth/LoginHeader';
import LoginForm from './auth/LoginForm';
import DevCredentialsInfo from './auth/DevCredentialsInfo';

const CMSLogin = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    loginAttempts,
    isLockedOut,
    handleLogin,
  } = useLogin();

  return (
    <GradientBackground className="min-h-screen">
      <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <LoginHeader />
          
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            error={error}
            loginAttempts={loginAttempts}
            isLockedOut={isLockedOut}
            onSubmit={handleLogin}
          />

          <DevCredentialsInfo />
        </div>
      </div>
    </GradientBackground>
  );
};

export default CMSLogin;
