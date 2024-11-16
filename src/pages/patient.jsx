import React from 'react';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';


const Patient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle loading state while NextAuth is checking session
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Redirect if the user is not signed in or doesn't have the "patient" role
  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  if (session.user.role !== 2) {
    router.push('/unauthorized'); // Redirect if not a patient
    return null; // Optionally you can return a loading spinner or placeholder
  }


  return (
    <div>
      <h1>Patient Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>

    </div>
  );
};

export default Patient;
