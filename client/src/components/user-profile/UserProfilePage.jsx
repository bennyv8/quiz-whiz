import React, { useState, useEffect, useContext } from 'react';
import './styles/profile.css';
import UserProfileFieldBox from './UserProfileFieldBox.jsx';
import axios from 'axios';
import { Buffer } from 'buffer';
import { UserContext } from '../../components/global/UserContext';


function UserProfilePage() {
  const [userData, setUserData] = useState({});

  const { profile } = useContext(UserContext);
  const loggedInUserId = profile.userId;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URI}/settings/user`,{
      params: {
        id: loggedInUserId
      }
    })
    .then(response => {
      setUserData(response.data[0]);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, [loggedInUserId]);

  return (
    <div>
      <UserProfileFieldBox field_title={"Profile Picture"}
          label={"Profile Picture"}
          default_value={"Upload a pic!"}
          initial_value={userData.profile_img ? `data:image/jpeg;base64,${Buffer.from(userData.profile_img.data).toString('base64')}` : ""}
          saveRoute={'/settings/updatePic'}/>
      <UserProfileFieldBox field_title={"Username"}
          label={"Username"}
          default_value={"Choose a username"}
          initial_value={userData.username}
          secondary_value={userData.email}
          saveRoute={'/settings/updateUsername'}/>
      <UserProfileFieldBox field_title={"Password"}
          label={"Password"}
          default_value={"********"}
          hidden_value={userData.password}
          saveRoute={'/settings/updatePassword'} />
      <UserProfileFieldBox field_title={"Bio"}
          label={"bio"}
          default_value={"Add a Bio"}
          initial_value={userData.bio}
          saveRoute={'/settings/updateBio'}/>
    </div>
  );
}

export default UserProfilePage;
