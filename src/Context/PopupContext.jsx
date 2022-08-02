import React from 'react';

export const PopupContext = React.createContext(); 

export function PopupContextProvider({children}) {
    const [popup, setPopup] = React.useState(false);
  return (
    <PopupContext.Provider value={{popup, setPopup}}>
        {children}
    </PopupContext.Provider>
  )
}

