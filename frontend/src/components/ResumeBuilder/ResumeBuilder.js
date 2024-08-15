import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createResume, updateResume, fetchResumeByUserId, deleteResume } from '../../redux/actions/resumeActions';
import { Button, Form, Input } from 'antd';

const ResumeBuilder = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);

  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
  });

  useEffect(() => {
    const userId = 'someUserId'; // Get user ID from auth or state
    dispatch(fetchResumeByUserId(userId));
  }, [dispatch]);

  useEffect(() => {
    if (resume && resume.personalDetails) {
      setResumeData(resume.personalDetails);
    }
  }, [resume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resume && resume._id) {
      dispatch(updateResume(resume._id, { personalDetails: resumeData }));
    } else {
      dispatch(createResume({ personalDetails: resumeData }));
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (resume && resume._id) {
      dispatch(deleteResume(resume._id));
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5">Resume Builder</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={resumeData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={resumeData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={resumeData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Education</label>
          <input
            type="text"
            className="form-control"
            name="education"
            value={resumeData.education}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Experience</label>
          <input
            type="text"
            className="form-control"
            name="experience"
            value={resumeData.experience}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Skills</label>
          <input
            type="text"
            className="form-control"
            name="skills"
            value={resumeData.skills}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="primary" htmlType="submit">
          {resume && resume._id ? 'Update Resume' : 'Create Resume'}
        </Button>
        {resume && resume._id && (
          <Button type="danger" onClick={handleDelete} className="ml-2">
            Delete Resume
          </Button>
        )}
      </form>
    </div>
  );
};

export default ResumeBuilder;
