import React, { useState } from 'react';
import '../css/SubmitPetForm.css';

function SubmitPetForm() {
  const initialState = { name: '', age: '', type: '' };
  const [petInfo, setPetInfo] = useState(initialState);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validateField = (field) => {
    if (field === 'name' && petInfo.name.trim() === '') {
      return 'Please enter a pet name.';
    }
    if (field === 'age' && petInfo.age.trim() === '') {
      return 'Please enter the pet age.';
    }
    if (field === 'type' && petInfo.type === '') {
      return 'Please select a pet type.';
    }
    return '';
  };

  const isFormValid = () => {
    return (
      validateField('name') === '' &&
      validateField('age') === '' &&
      validateField('type') === ''
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (isFormValid()) {
      console.log('Submitted pet info:', petInfo);
      alert('Submission Successful!');
      setPetInfo(initialState);
      setSubmitAttempted(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetInfo({ ...petInfo, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="name">Pet Name:</label></td>
            <td>
              <input
                id="name"
                type="text"
                name="name"
                value={petInfo.name}
                onChange={handleChange}
              />
              {submitAttempted && <p className="error-message">{validateField('name')}</p>}
            </td>
          </tr>
          <tr>
            <td><label htmlFor="age">Pet Age:</label></td>
            <td>
              <input
                id="age"
                type="number"
                name="age"
                value={petInfo.age}
                onChange={handleChange}
              />
              {submitAttempted && <p className="error-message">{validateField('age')}</p>}
            </td>
          </tr>
          <tr>
            <td><label htmlFor="type">Pet Type:</label></td>
            <td>
              <select
                id="type"
                name="type"
                value={petInfo.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Cat">Cat</option>
                <option value="Dog">Dog</option>
              </select>
              {submitAttempted && <p className="error-message">{validateField('type')}</p>}
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="submit">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default SubmitPetForm;
