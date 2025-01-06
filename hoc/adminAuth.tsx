'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export default function adminAuth(WrappedComponent: React.ComponentType) {
  const AdminProtectedRoute = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User logged in")
          try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists() && userDoc.data()?.isAdmin) {
                console.log("user is admin")
                setIsAdmin(true);
            } else {
                console.log("user is not admin, redirecting to login...")
                router.push('/admin/login');
            }
          } catch (error) {
            console.error('Error fetching user document:', error);
            router.push('/admin/login');
          }
        } else {
          router.push('/admin/login');
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (isLoading) 
      return <div>Loading...</div>;
    

    // If user isn't admin, don't display the web page
    if (!isAdmin) 
      return null; 
    
    // Returns the web page
    return <WrappedComponent {...props} />;
  };

  return AdminProtectedRoute;
}
