import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const DoctorPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== 1) {
    router.push('/unauthorized'); // Redirect if not a doctor
    return null;
  }

  const handleSignOut = () => {
    signOut({
      callbackUrl: '/login', // Redirect to the login page after sign out
    });
  };

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>
      
      {/* Sign out button */}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default DoctorPage;
