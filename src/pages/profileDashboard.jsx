import React,{useEffect} from "react";

const Profile = () => {
  useEffect(() => {
    document.title = "Profile";
  }, []);
  return (
    <span>Profile</span>
  );
};

export default Profile;
