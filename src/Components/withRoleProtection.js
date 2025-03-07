import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

// A higher-order component to protect pages based on the role
const withRoleProtection = (Component, allowedRoles) => {
  const ProtectedComponent = (props) => {
    const { data: session, status } = useSession(); // Access the session data
    const router = useRouter();

    useEffect(() => {
      // If there is no session, redirect the user to the login page
      if (!session) {
        router.push("/login");
        return;
      }

      // If the user does not have one of the allowed roles, redirect to the home page or another page
      if (!allowedRoles.includes(session.user.role)) {
        router.push("/unauthorized"); // You can change this to any page you want to redirect to
      }
    }, [session, router]);

    if (status === "loading") {
      return <div>Loading...</div>; // Show a loading indicator while session is being fetched
    }

    // If user has the correct role, render the component
    return <Component {...props} />;
  };

  return ProtectedComponent;
};

export default withRoleProtection;
