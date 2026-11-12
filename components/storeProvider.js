// components/StoreProvider.jsx
'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { makeStore } from '@/app/redux/store';
import { setUser, clearUser } from '@/app/redux/features/userSlice';
import { auth } from '@/lib/firebase'; // Your initialized Firebase auth instance

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Extract only serializable fields to avoid Redux non-serializable errors
        storeRef.current.dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          })
        );
      } else {
        storeRef.current.dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}