import React, { createContext, useContext, useMemo, useState } from 'react';

interface IAppContext {
  pageTitle: string;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext({});

export const AppContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [pageTitle, setPageTitle] = useState<string>('Welcome');

  const value = useMemo(
    () => ({
      pageTitle,
      setPageTitle,
    }),
    [pageTitle]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useApp = (): IAppContext => useContext(AppContext) as IAppContext;

export default useApp;
