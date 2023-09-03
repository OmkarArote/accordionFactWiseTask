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
import { useUsers } from '@/store/hackers';

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
  age?: number;
}

interface CollapsibleCardProps {
  userDetails: UserDetails[];
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({ userDetails }) => {
  const [editedData, setEditedData] = useState<UserDetails[]>(
    userDetails.map((user) => ({ ...user }))
  );
  const [collapsedStates, setCollapsedStates] = useState<boolean[]>(
    editedData.map(() => true)
  );
  const [editMode, setEditMode] = useState<boolean[]>(
    editedData.map(() => false)
  );

  const toggleCollapse = (index: number) => {
    const newCollapsedStates = collapsedStates.map((state, i) =>
      i === index ? !state : true
    );
    setCollapsedStates(newCollapsedStates);

    if (editMode[index]) {
      toggleEditMode(index, false);
    }
  };

  const toggleEditMode = (index: number, isSave: boolean) => {
    const newEditMode = editMode.map((mode, i) =>
      i === index ? !mode : mode
    );
    setEditMode(newEditMode);

    // If The Input Is Not A Save Button
    if (!isSave && !newEditMode[index]) {
      setEditedData((prevData) => {
        const newData = [...prevData];
        newData[index] = { ...editedData[index] };
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
      // Check if the input field is for 'age'
      newData[index] = { ...newData[index], [name]: value };
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
    // Save changes (you can update your data here)
    // For now, we'll just switch back to view mode
    toggleEditMode(index, true);
  };

  const handleDiscardChanges = (index: number) => {
    // Discard changes and switch back to view mode
    toggleEditMode(index, false);
  };

  const handleDelete = (index: number) => {
    // Delete the user
    setEditedData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      console.log(newData)
      return newData;
    });
  }

  return (
    <div className="container">
      {editedData.map((users, index) => (
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
              <h1>{users.first + ' ' + users.last}</h1>
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
                      <>
                        <input
                          type="number"
                          name="age"
                          value={users.age}
                          style={{
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            padding: '4px',
                          }}
                          onChange={(e) => handleInputChange(e, index)}
                        /><span> Years</span>
                      </>
                    ) : (
                      <p>{users.age} Years</p>
                    )}
                  </div>
                  <div className="col-md-4">
                    <h4 className="text-muted">Gender</h4>
                    {editMode[index] ? (
                      <select
                        name="gender"
                        value={users.gender}
                        onChange={(e) => handleGenderChange(e, index)}
                        style={{
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          padding: '4px',
                        }}
                      >
                        {/* Male | Female | Transgender | Rather not say | Other */}
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Rather Not Say">Rather Not Say</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p>{users.gender}</p>
                    )}
                  </div>
                  <div className="col-md-4">
                    <h4 className="text-muted">Country</h4>
                    {editMode[index] ? (
                      <input
                        type="text"
                        name="country"
                        value={users.country}
                        onChange={(e) => handleInputChange(e, index)}
                        style={{
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          padding: '4px',
                        }}
                      />
                    ) : (
                      <p>{users.country}</p>
                    )}
                  </div>
                  <div className="col-md-12">
                    <h4 className="text-muted mt-2">Description</h4>
                    {editMode[index] ? (
                      <textarea
                        name="description"
                        value={users.description}
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
                      <p>{users.description}</p>
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
                      <button>
                        <FontAwesomeIcon
                          icon={faSave}
                          size="2x"
                          style={{ cursor: 'pointer', marginRight: '8px' }}
                          onClick={() => handleSaveChanges(index)}
                        />
                      </button>
                      <button>
                        <FontAwesomeIcon
                          icon={faTimes}
                          size="2x"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleDiscardChanges(index)}
                        />
                      </button>
                    </>
                  ) : (
                    <>
                      <button>
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="2x"
                          style={{ cursor: 'pointer', marginRight: '8px' }}
                          onClick={() => handleDelete(index)}
                        />
                      </button>
                      <button disabled={users.age < 18}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          size="2x"
                          style={{ cursor: 'pointer' }}
                          onClick={() => toggleEditMode(index, false)}
                        />
                      </button>
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
