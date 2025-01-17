import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import './styles/profile.css';
import ProfilePicBox from './ProfilePicBox.jsx';
import axios from 'axios';
import { UserContext } from '../../components/global/UserContext';


const UserProfileFieldBox = (props) => {
  // TODO: Update this with the logged in userid.
  // const userid = 1;
  const { profile } = useContext(UserContext);
  const loggedInUserId = profile.userId;


  const [editing, setEditing] = useState(false);
  const [field, setField] = useState(props.initial_value ? props.initial_value : props.default_value);
  const [oldPassword, setOldPassword] = useState('Enter current password');

  useEffect(() => {
    if (props.initial_value) {
      setField(props.initial_value);
    }
  }, [props.initial_value]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    if (props.field_title === 'Profile Picture') {
      // Handle cancel logic for Profile Picture
    } else {
      // Reset the field value to props.initial_value
      setField(props.initial_value ? props.initial_value : props.default_value);
    }
    setEditing(false);
  };

  const handleCurrentPasswordFocus = () => {
    if (oldPassword === 'Enter current password') {
      setOldPassword('');
    }
  };

  const handleDefaultNewPasswordFocus = () => {
    if (field === props.default_value) {
      setField('');
    }
  };

  const handleSaveClick = () => {
    // TODO: if it's the password field, need to check password first before updating
    axios.put(`${import.meta.env.VITE_APP_API_URI}${props.saveRoute}`, {
    updatedField: field,
    oldPassword: oldPassword,
    email: props.profile.email,
    id: loggedInUserId
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      id: loggedInUserId
    }
  })
  .then(res => {
    if (res.status === 200) {
      console.log(`${props.field_title} updated successfully!`);
      alert(`${props.field_title} updated successfully!`);
    } else {
      console.error(`Failed to update ${props.field_title}.`);
    }
  })
  .catch(error => {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      // Display the error message on the screen using an alert or a notification component
      // Replace the following line with your own implementation
      alert(errorMessage);
    } else {
      console.error(error);
      alert('Something went wrong during update.');
    }
  });
  setEditing(false);
};

  const handleFieldChange = (event) => {
    setField(event.target.value);
  };

  const handleCurrentPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  return (
    <Box className="user-profile-box">
      <h3>{props.field_title}</h3>
      { editing ? (
        <>
          {props.field_title === 'Password' ? (
            <TextField
              className="input"
              label="Current password"
              variant="outlined"
              value={oldPassword}
              onChange={handleCurrentPasswordChange}
              onFocus={handleCurrentPasswordFocus}
            />
          ) : null}

          {props.field_title === "Profile Picture" ? (
            <ProfilePicBox saveRoute={props.saveRoute} img={field}/>
          ) : (
            <TextField
              className="input"
              label={props.label}
              variant="outlined"
              value={field}
              onChange={handleFieldChange}
              onFocus={handleDefaultNewPasswordFocus}
            />
          )}

          <div className="cancelSaveButtons">
            <Button variant="contained" onClick={handleCancelClick}>
              Cancel
            </Button>
            { props.field_title === "Profile Picture" ? (
              <></>
            ) : (
              <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Save
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
        {props.field_title === "Profile Picture" ? (
          field ? (
            <p>
            <img className="user-profile-image" src={field} alt="User profile" />
            </p>
          ) : null
        ) : (
          <p>{field}</p>
        )}
        <Button className="editButton" variant="contained" onClick={handleEditClick}>
          Edit
        </Button>
      </>
      )}
    </Box>
  );
}


export default UserProfileFieldBox;