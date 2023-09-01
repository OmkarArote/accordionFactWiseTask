'use client'
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faSave,
  faTimes,
  faTrash,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

interface UserDetails {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

interface CollapsibleCardProps {
  userDetails: UserDetails[];
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({ userDetails }) => {
  const [collapsedStates, setCollapsedStates] = useState<boolean[]>(
    userDetails.map(() => true)
  );
  const [editMode, setEditMode] = useState<boolean[]>(
    userDetails.map(() => false)
  );
  const [editedData, setEditedData] = useState<UserDetails[]>(
    userDetails.map((user) => ({ ...user }))
  );

  const toggleCollapse = (index: number) => {
    const newCollapsedStates = collapsedStates.map((state, i) =>
      i === index ? !state : true
    );
    setCollapsedStates(newCollapsedStates);

    // Discard changes if collapsing while in edit mode
    if (editMode[index]) {
      toggleEditMode(index);
    }
  };

  const toggleEditMode = (index: number) => {
    const newEditMode = editMode.map((mode, i) =>
      i === index ? !mode : mode
    );
    // console.log('newEditMode:: ', newEditMode[index]);
    setEditMode(newEditMode);

    // Discard changes if switching to view mode
    if (!newEditMode[index]) {
      setEditedData((prevData) => {
        const newData = [...prevData];
        newData[index] = { ...userDetails[index] };
        return newData;
      });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setEditedData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [name]: value };
      console.log('newData[index]:: ',newData[index]);
      return newData;
    });
  };

  const handleGenderChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value } = event.target;
    setEditedData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], gender: value };
      return newData;
    });
  };

  const handleSaveChanges = (index: number) => {
    // Update your data here with the edited data
    // For now, we'll just switch back to view mode
    toggleEditMode(index);
  };

  const handleDiscardChanges = (index: number) => {
    // Discard changes and switch back to view mode
    toggleEditMode(index);
  };

  return (
    <div className="container">
      {userDetails.map((users, index) => (
        <Card key={users.id}>
          <Card.Body>
            <div
              className="header"
              onClick={() => toggleCollapse(index)}
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <img
                src={users.picture}
                alt={users.first + ' ' + users.last}
                style={{ borderRadius: '50%', marginRight: '16px' }}
              />
              <h2>{users.first + ' ' + users.last}</h2>
              <FontAwesomeIcon
                icon={collapsedStates[index] ? faChevronDown : faChevronUp}
                size="2x"
                style={{ marginLeft: 'auto' }}
              />
            </div>
            {!collapsedStates[index] && (
              <div className="details" style={{ marginTop: '16px' }}>
                <div className="row">
                  <div className="col-md-4">
                    <h4 className="text-muted">Age</h4>
                    {editMode[index] ? (
                      <input
                        type="number"
                        name="age"
                        value={editedData[index].dob}
                        style={{
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          padding: '4px',
                        }}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    ) : (
                      <p>{editedData[index].dob}</p>
                    )}
                  </div>
                  <div className="col-md-4">
                    <h4 className="text-muted">Gender</h4>
                    {editMode[index] ? (
                      <select
                        name="gender"
                        value={editedData[index].gender}
                        onChange={(e) => handleGenderChange(e, index)}
                        style={{
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          padding: '4px',
                        }}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p>{editedData[index].gender}</p>
                    )}
                  </div>
                  <div className="col-md-4">
                    <h4 className="text-muted">Country</h4>
                    {editMode[index] ? (
                      <input
                        type="text"
                        name="country"
                        value={editedData[index].country}
                        onChange={(e) => handleInputChange(e, index)}
                        style={{
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          padding: '4px',
                        }}
                      />
                    ) : (
                      <p>{editedData[index].country}</p>
                    )}
                  </div>
                  <div className="col-md-12">
                    <h4 className="text-muted">Description</h4>
                    {editMode[index] ? (
                      <textarea
                        name="description"
                        value={editedData[index].description}
                        onChange={(e) => handleInputChange(e, index)}
                        style={{
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          padding: '8px',
                          width: '100%',
                          height: '75%',
                          resize: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    ) : (
                      <p>{editedData[index].description}</p>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '20px',
                  }}
                >
                  {editMode[index] ? (
                    <>
                      <FontAwesomeIcon
                        icon={faSave}
                        size="2x"
                        style={{ cursor: 'pointer', marginRight: '8px' }}
                        onClick={() => handleSaveChanges(index)}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        size="2x"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDiscardChanges(index)}
                      />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="2x"
                        style={{ cursor: 'pointer', marginRight: '8px' }}
                      />
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="2x"
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleEditMode(index)}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CollapsibleCard;
