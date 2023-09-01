'use client'
// components/UserAccordion.tsx
import React, { useState } from 'react';

interface UserData {
  name: string;
  age: number;
  gender: string;
  country: string;
  description: string;
}

interface UserAccordionProps {
  users: UserData[];
}

const UserAccordion: React.FC<UserAccordionProps> = ({ users }) => {
  return (
    <div>
      {users.map((user, index) => (
        <SingleUserAccordion key={index} user={user} />
      ))}
    </div>
  );
};

const SingleUserAccordion: React.FC<{ user: UserData }> = ({ user }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [tempUserData, setTempUserData] = useState(user);

  const toggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleEdit = (field: keyof UserData, value: string | number) => {
    setTempUserData({ ...tempUserData, [field]: value });
  };

  const handleSave = () => {
    // Save the temporary data (e.g., update in a state or make an API call)
    console.log('Saved data:', tempUserData);
  };

  const handleDiscard = () => {
    // Discard temporary changes and revert to the original data
    setTempUserData(user);
  };

  return (
    <div className="user-accordion">
      <div className="user-header" onClick={toggleAccordion}>
        <img
          src="profile-image.jpg"
          alt="User Profile"
          width="50"
          height="50"
        />
        <span>{user.name}</span>
      </div>
      {isCollapsed ? (
        <div className="user-details">
          <p>Age: {tempUserData.age}</p>
          <p>Gender: {tempUserData.gender}</p>
          <p>Country: {tempUserData.country}</p>
          <p>Description: {tempUserData.description}</p>
        </div>
      ) : (
        <div className="user-edit-details">
          <label>Age: </label>
          <input
            type="text"
            value={tempUserData.age}
            onChange={(e) => handleEdit('age', e.target.value)}
          />
          <label>Gender: </label>
          <input
            type="text"
            value={tempUserData.gender}
            onChange={(e) => handleEdit('gender', e.target.value)}
          />
          <label>Country: </label>
          <input
            type="text"
            value={tempUserData.country}
            onChange={(e) => handleEdit('country', e.target.value)}
          />
          <label>Description: </label>
          <input
            type="text"
            value={tempUserData.description}
            onChange={(e) => handleEdit('description', e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDiscard}>Discard</button>
        </div>
      )}
    </div>
  );
};

export default UserAccordion;

