import { useRouter } from 'next/router';

const UnauthorizedPage = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login'); // Redirect to the login page
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <h1>Unauthorized Access</h1>
        <p>You do not have permission to view this page.</p>
        
        {/* Login button */}
        <button 
          onClick={handleLoginRedirect}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
