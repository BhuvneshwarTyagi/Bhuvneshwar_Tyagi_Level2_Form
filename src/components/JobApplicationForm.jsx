import React, { useState } from 'react';
import useFormValidation from './useFormValidation';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const validate = (values) => {
    const errors = {};

    if (!values.fullName) errors.fullName = 'Full Name is required';
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if (values.position === 'Developer' || values.position === 'Designer') {
      if (!values.relevantExperience || values.relevantExperience <= 0) {
        errors.relevantExperience = 'Relevant Experience is required and must be a number greater than 0';
      }
    }
    if (values.position === 'Designer' && !values.portfolioURL) {
      errors.portfolioURL = 'Portfolio URL is required';
    } else if (values.portfolioURL && !/^(ftp|http|https):\/\/[^ "]+$/.test(values.portfolioURL)) {
      errors.portfolioURL = 'Portfolio URL is invalid';
    }
    if (values.position === 'Manager' && !values.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (values.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected';
    }
    if (!values.preferredInterviewTime) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    }

    return errors;
  };

  const { errors, validateForm } = useFormValidation(formData, validate);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        additionalSkills: checked
          ? [...prevData.additionalSkills, value]
          : prevData.additionalSkills.filter((skill) => skill !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-200 text-black">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md w-full max-w-md px-4 py-4 mt-4 mb-4 overflow-y-auto">
        <div className="mb-4">
          <label className="block mb-2">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-white"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-white"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-white"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Applying for Position:</label>
          <select name="position" value={formData.position} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div className="mb-4">
            <label className="block mb-2">Relevant Experience (Years):</label>
            <input
              type="number"
              name="relevantExperience"
              value={formData.relevantExperience}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-white"
            />
            {errors.relevantExperience && <p className="text-red-500 text-sm">{errors.relevantExperience}</p>}
          </div>
        )}

        {formData.position === 'Designer' && (
          <div className="mb-4">
            <label className="block mb-2">Portfolio URL:</label>
            <input
              type="text"
              name="portfolioURL"
              value={formData.portfolioURL}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-white"
            />
            {errors.portfolioURL && <p className="text-red-500 text-sm">{errors.portfolioURL}</p>}
          </div>
        )}

        {formData.position === 'Manager' && (
          <div className="mb-4">
            <label className="block mb-2">Management Experience:</label>
            <textarea
              name="managementExperience"
              value={formData.managementExperience}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-white"
            ></textarea>
            {errors.managementExperience && <p className="text-red-500 text-sm">{errors.managementExperience}</p>}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2">Additional Skills:</label>
          <div className="flex flex-wrap">
            {['JavaScript', 'CSS', 'Python', 'React', 'Node.js'].map((skill) => (
              <label key={skill} className="mr-4">
                <input
                  type="checkbox"
                  name="additionalSkills"
                  value={skill}
                  checked={formData.additionalSkills.includes(skill)}
                  onChange={handleChange}
                />
                {skill}
              </label>
            ))}
          </div>
          {errors.additionalSkills && <p className="text-red-500 text-sm">{errors.additionalSkills}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Preferred Interview Time:</label>
          <input
            type="datetime-local"
            name="preferredInterviewTime"
            value={formData.preferredInterviewTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-white"
          />
          {errors.preferredInterviewTime && <p className="text-red-500 text-sm">{errors.preferredInterviewTime}</p>}
        </div>

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
