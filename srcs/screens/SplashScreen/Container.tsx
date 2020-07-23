import React, {useEffect} from 'react';
import {SplashScreenComponent} from './Component';
import {useAuthorize} from './useAuthorize';

export const SplashScreenContainer = () => {
  const {authorize, loading} = useAuthorize();

  useEffect(() => {
    authorize();
  }, []);

  return <SplashScreenComponent loading={loading} />;
};
