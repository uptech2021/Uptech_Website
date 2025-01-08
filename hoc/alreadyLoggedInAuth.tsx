'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function alreadyLoggedInAuth(WrappedComponent: React.ComponentType) {
  const AdminProtectedRoute = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists() && userDoc.data()?.isAdmin) {
                console.log("Admin already logged in, redirecting to dashboard...")
                router.push('/admin/dashboard');
            } 
          } catch (error) {
            console.error('Error fetching user document:', error);
            router.push('/');
          }
        } else setIsLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (isLoading) 
      return <div>Loading...</div>;
    

    if (isAdmin) 
      return null; 
    

    return <WrappedComponent {...props} />;
  };

  return AdminProtectedRoute;
}
