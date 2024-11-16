import React from 'react';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';

const Patient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== 2) {
    if (!session) {
      return (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      );
    }
    router.push('/unauthorized');
    return null;
  }

  return (
    <div>
      <h1>Patient Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>
    </div>
  );
};

export default Patient;
