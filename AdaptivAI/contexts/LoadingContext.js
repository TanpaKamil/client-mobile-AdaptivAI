import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
   const [isLoading, setIsLoading] = useState(false);
   const [loadingMessage, setLoadingMessage] = useState('');

   const startLoading = (message = '') => {
       setLoadingMessage(message);
       setIsLoading(true);
   };

   const stopLoading = () => {
       setIsLoading(false);
       setLoadingMessage('');
   };

   return (
       <LoadingContext.Provider value={{
           isLoading,
           loadingMessage,
           startLoading,
           stopLoading
       }}>
           {children}
       </LoadingContext.Provider>
   );
}

export const useLoading = () => useContext(LoadingContext);