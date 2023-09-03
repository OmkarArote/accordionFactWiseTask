'use client'
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import {
  faChevronDown,
  faChevronUp,
  faSave,
  faTimes,
  faTrash,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import AlertModal from './ModelAlert';

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
  age?: string;
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
  const [isSaveEnable, setSaveEnable] = useState<boolean>(true);
  const [isDeleteOption, setIsDeleteOption] = useState<boolean>(false);

  const toggleCollapse = (index: number) => {
    if (editMode.includes(true)) {
      toast.error('Forbidden Action!');
    } else {
      const newCollapsedStates = collapsedStates.map((state, i) =>
        i === index ? !state : true
      );
      setCollapsedStates(newCollapsedStates);

      if (editMode[index]) {
        toggleEditMode(index, false);
      }
    }
  };

  const toggleEditMode = (index: number, isSave: boolean) => {
    const newEditMode = editMode.map((mode, i) =>
      i === index ? !mode : mode
    );
    setEditMode(newEditMode);

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
    if (name === 'age') {
      console.log('age:: ', value)
      console.log('age:: ', typeof value);
    }
    setSaveEnable(false);
    setEditedData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [name]: value };
      return newData;
    });
  };

  const handleGenderChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    setSaveEnable(false);
    const { value } = event.target;
    setEditedData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], gender: value };
      return newData;
    });
  };

  const handleSaveChanges = (index: number) => {
    let countryRezx = /^\D+$/;
    if (!countryRezx.test(editedData[index].country)) {
      toast.error(`Country Cannot Have Number In It's Name And Cannot Be Empty`)
    } else if (editedData[index].description === "") {
      toast.error(`Description Cannot Be Empty`)
    } else if (typeof editedData[index].age === 'string' && editedData[index].age === '') {
      toast.error(`Age Cannot Be Empty`)
    } else {
      toggleEditMode(index, true);
    }
  };

  const handleDiscardChanges = (index: number) => {
    toggleEditMode(index, false);
  };

  const handleYes = (id: number) => {
    console.log(`Yes clicked for id: ${id}`);
    setEditedData((prevData) => {
      const newData = [...prevData];
      newData.splice(id, 1);
      userDetails.splice(id, 1);
      return newData;
    });
  }

  const handleClose = () => {
    setIsDeleteOption(false);
  };

  const handleDelete = (index: number) => {
    setIsDeleteOption(true);
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
                    <div>
                      <button
                        disabled={isSaveEnable}
                        className="btn btn-outline-success border-0 mr-2"
                        style={{ cursor: isSaveEnable ? 'not-allowed' : 'pointer' }}
                      >
                        <FontAwesomeIcon
                          icon={faSave}
                          size="2x"
                          onClick={() => handleSaveChanges(index)}
                        />
                      </button>
                      <button
                        className="btn btn-outline-danger border-0"
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          size="2x"
                          onClick={() => handleDiscardChanges(index)}
                        />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-danger border-0 mr-2"
                        style={{ cursor: 'pointer' }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="2x"
                          onClick={() => handleDelete(index)}
                        />
                      </button>
                      <button
                        className="btn btn-outline-info border-0"
                        disabled={users.age < 18}
                        style={{ cursor: (users.age < 18) ? 'not-allowed' : 'pointer' }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          size="2x"
                          onClick={() => toggleEditMode(index, false)}
                        />
                      </button>
                      <AlertModal
                        id={index}
                        show={isDeleteOption}
                        title={'Are You Sure?'}
                        msg={`Clicking Yes will delete all the details of ${users.first + ' ' + users.last}`}
                        onClose={handleClose}
                        onYes={handleYes}
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
