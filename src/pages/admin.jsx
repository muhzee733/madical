import { getSession } from 'next-auth/react';

const AdminPage = ({ user }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 0) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}

export default AdminPage;
