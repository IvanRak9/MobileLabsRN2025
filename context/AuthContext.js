import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../services/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        await AsyncStorage.setItem('user', JSON.stringify(u));
      } else {
        setUser(null);
        await AsyncStorage.removeItem('user');
      }
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
