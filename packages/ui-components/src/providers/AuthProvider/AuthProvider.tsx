import React, { ReactElement, createContext, useContext, useEffect } from 'react';

import { useDataMutation } from '../../api/use-data-mutation';
import { getConfiguration } from '../../configuration';
import { APIRoute } from '../../store/routes';
import storage from '../../store/storage';
import { stripTrailingSlash } from '../../store/utils';
import { LoginBody } from './types';
import { getDefaultUserState } from './utils';

interface ManifestsContextProps {
  handleLogin: (body: { username: string; password: string }) => Promise<any>;
  setUserState: any;
  logOutUser: () => void;
  userState: LoginBody;
}

export const AuthContext = createContext<Partial<ManifestsContextProps>>({
  userState: { token: null, username: null },
  setUserState: () => {},
  handleLogin: async () => {},
  logOutUser: () => {},
});

const configuration = getConfiguration();

const AuthProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const basePath = stripTrailingSlash(configuration.base);
  const [userState, setUserState] = React.useState<LoginBody>(getDefaultUserState());
  const { data, isMutating, trigger } = useDataMutation<LoginBody>(
    basePath,
    APIRoute.LOGIN,
    'POST'
  );
  const handleLogin = async (body: { username: string; password: string }) => {
    await trigger(body);
  };

  const logOutUser = () => {
    setUserState(getDefaultUserState());
    storage.removeItem('username');
    storage.removeItem('token');
    window.location.reload();
  };

  useEffect(() => {
    if (data && !isMutating) {
      setUserState(data as LoginBody);
      storage.setItem('username', data.username as string);
      storage.setItem('token', data.token as string);
    }
  }, [data, isMutating]);

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        userState,
        logOutUser,
        setUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export const useAuth = () => useContext(AuthContext);
