import React, {useState} from 'react';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [lang, setLang] = useState('en');
  const [change, setChange] = useState('en');
  const [userData, setuserData] = useState('en');
  return (
    <AppContext.Provider
      value={{user, setUser, lang, setLang, change, setChange,userData,setuserData}}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider, AppContext as default};
