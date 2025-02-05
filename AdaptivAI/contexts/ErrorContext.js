import { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ErrorContext = createContext(null);

export function ErrorProvider({ children }) {
   const [error, setError] = useState(null);

   const showError = (message, type = 'error') => {
       setError({ message, type });
       setTimeout(() => setError(null), 3000);
   };

   const clearError = () => setError(null);

   return (
       <ErrorContext.Provider value={{
           error,
           showError,
           clearError
       }}>
           {error && (
               <ErrorToast 
                   message={error.message}
                   type={error.type}
                   onDismiss={clearError}
               />
           )}
           {children}
       </ErrorContext.Provider>
   );
}

const ErrorToast = ({ message, type, onDismiss }) => (
   <View style={styles[type]}>
       <Text>{message}</Text>
       <TouchableOpacity onPress={onDismiss}>
           <Icon name="close" />
       </TouchableOpacity>
   </View>
);

export const useError = () => useContext(ErrorContext);