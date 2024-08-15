import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, createJob, updateJob, deleteJob } from '../../redux/actions/jobActions';
import { Button, Form, Input, DatePicker, Collapse } from 'antd';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse as BootstrapCollapse } from 'react-bootstrap';

const { Panel } = Collapse;

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const onFinishCreate = (values) => {
    dispatch(createJob({ ...values }));
    setShowCreateForm(false);
  };

  const onFinishEdit = (values) => {
    dispatch(updateJob(currentJob._id, { ...values }));
    setIsEditing(false);
    setCurrentJob(null);
  };

  const onDelete = (jobId) => {
    dispatch(deleteJob(jobId));
  };

  const onEdit = (job) => {
    setIsEditing(true);
    setCurrentJob(job);
  };

  const renderEditForm = () => (
    <Form
      layout="vertical"
      onFinish={onFinishEdit}
      initialValues={currentJob ? {
        title: currentJob.title,
        description: currentJob.description,
        companyName: currentJob.companyName,
        location: currentJob.location,
        jobType: currentJob.jobType,
        salaryRange: currentJob.salaryRange,
        deadline: moment(currentJob.deadline),
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
        label="Job Type"
        name="jobType"
        rules={[{ required: true, message: 'Please input the job type!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Salary Range"
        name="salaryRange"
        rules={[{ required: true, message: 'Please input the salary range!' }]}
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
          Update Job
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
        label="Job Type"
        name="jobType"
        rules={[{ required: true, message: 'Please input the job type!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Salary Range"
        name="salaryRange"
        rules={[{ required: true, message: 'Please input the salary range!' }]}
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
          Create Job
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className="container">
      <h2 className="text-center mt-5">Jobs</h2>

      <Button
        variant="primary"
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="mb-4"
      >
        {showCreateForm ? 'Cancel' : 'Create New Job'}
      </Button>

      <BootstrapCollapse in={showCreateForm}>
        <div>
          {renderCreateForm()}
        </div>
      </BootstrapCollapse>

      <Collapse defaultActiveKey={['1']} className="responsive-collapse">
        {jobs.map((job, index) => {
          const deadline = moment(job.deadline);
          const formattedDeadline = deadline.format('MMMM Do YYYY');

          return (
            <Panel header={job.title || 'No Title'} key={index + 1}>
              <div className="panel-content">
                <p><strong>Company Name:</strong> {job.companyName}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Job Type:</strong> {job.jobType}</p>
                <p><strong>Salary Range:</strong> {job.salaryRange}</p>
                <p><strong>Deadline:</strong> {formattedDeadline}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Posted By:</strong> {job.postedBy?.name || 'Unknown'}</p>
                <div className="button-group">
                  <Button type="primary" onClick={() => onEdit(job)}>Edit</Button>
                  <Button type="danger" onClick={() => onDelete(job._id)}>Delete</Button>
                </div>
                {isEditing && currentJob && currentJob._id === job._id && renderEditForm()}
              </div>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default Jobs;
