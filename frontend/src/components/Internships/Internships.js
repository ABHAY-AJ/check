import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInternships, createInternship, deleteInternship, updateInternship } from '../../redux/actions/internshipActions';
import { Button, Form, Input, DatePicker, Collapse, TimePicker } from 'antd';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse as BootstrapCollapse } from 'react-bootstrap';
import Navbar from '../navbar/navbar';
// import './Internships.css'; // Import the CSS file for styling

const { Panel } = Collapse;

const Internships = () => {
  const dispatch = useDispatch();
  const internships = useSelector((state) => state.internships);

  const [isEditing, setIsEditing] = useState(false);
  const [currentInternship, setCurrentInternship] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(fetchInternships());
  }, [dispatch]);

  const onFinishCreate = (values) => {
    const deadlineDate = moment(values.deadline).toISOString();

    dispatch(createInternship({ ...values, deadline: deadlineDate }));
    setShowCreateForm(false);
  };

  const onFinishEdit = (values) => {
    const deadlineDate = moment(values.deadline).toISOString();

    dispatch(updateInternship(currentInternship._id, { ...values, deadline: deadlineDate }));
    setIsEditing(false);
    setCurrentInternship(null);
  };

  const onDelete = (internshipId) => {
    dispatch(deleteInternship(internshipId));
  };

  const onEdit = (internship) => {
    setIsEditing(true);
    setCurrentInternship(internship);
  };

  const renderEditForm = () => (
    <Form
      layout="vertical"
      onFinish={onFinishEdit}
      initialValues={currentInternship ? {
        title: currentInternship.title,
        description: currentInternship.description,
        companyName: currentInternship.companyName,
        location: currentInternship.location,
        internshipType: currentInternship.internshipType,
        stipend: currentInternship.stipend,
        duration: currentInternship.duration,
        deadline: moment(currentInternship.deadline),
      } : {}}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[{ required: true, message: 'Please input the company name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: 'Please input the location!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Internship Type"
        name="internshipType"
        rules={[{ required: true, message: 'Please input the internship type!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Stipend"
        name="stipend"
        rules={[{ required: true, message: 'Please input the stipend!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Duration"
        name="duration"
        rules={[{ required: true, message: 'Please input the duration!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Deadline"
        name="deadline"
        rules={[{ required: true, message: 'Please select the deadline!' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Internship
        </Button>
        <Button type="default" onClick={() => setIsEditing(false)} className="ml-2">
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );

  const renderCreateForm = () => (
    <Form
      layout="vertical"
      onFinish={onFinishCreate}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[{ required: true, message: 'Please input the company name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: 'Please input the location!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Internship Type"
        name="internshipType"
        rules={[{ required: true, message: 'Please input the internship type!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Stipend"
        name="stipend"
        rules={[{ required: true, message: 'Please input the stipend!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Duration"
        name="duration"
        rules={[{ required: true, message: 'Please input the duration!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Deadline"
        name="deadline"
        rules={[{ required: true, message: 'Please select the deadline!' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Internship
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className="container">
      <h2 className="text-center mt-5">Internships</h2>

      <Button
        variant="primary"
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="mb-4"
      >
        {showCreateForm ? 'Cancel' : 'Create New Internship'}
      </Button>

      <BootstrapCollapse in={showCreateForm}>
        <div>
          {renderCreateForm()}
        </div>
      </BootstrapCollapse>

      <Collapse defaultActiveKey={['1']} className="responsive-collapse">
        {internships.map((internship, index) => {
          const deadlineDate = moment(internship.deadline);
          const formattedDeadline = deadlineDate.format('MMMM Do YYYY');

          return (
            <Panel header={internship.title || 'No Title'} key={index + 1}>
              <div className="panel-content">
                <p><strong>Company Name:</strong> {internship.companyName}</p>
                <p><strong>Location:</strong> {internship.location}</p>
                <p><strong>Internship Type:</strong> {internship.internshipType}</p>
                <p><strong>Stipend:</strong> {internship.stipend}</p>
                <p><strong>Duration:</strong> {internship.duration}</p>
                <p><strong>Deadline:</strong> {formattedDeadline}</p>
                <p><strong>Description:</strong> {internship.description}</p>
                <p><strong>Created By:</strong> {internship.postedBy ? internship.postedBy.name : 'Unknown'}</p>
                <div className="button-group">
                  <Button type="primary" onClick={() => onEdit(internship)}>Edit</Button>
                  <Button type="danger" onClick={() => onDelete(internship._id)}>Delete</Button>
                </div>
                {isEditing && currentInternship && currentInternship._id === internship._id && renderEditForm()}
              </div>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default Internships;
