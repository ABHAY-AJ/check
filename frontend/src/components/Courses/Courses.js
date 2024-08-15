import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, createCourse, deleteCourse, updateCourse } from '../../redux/actions/courseActions';
import { Button, Form, Input, Collapse } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse as BootstrapCollapse } from 'react-bootstrap';
import moment from 'moment';
import Navbar from '../navbar/navbar';
// import './Courses.css'; // Import the CSS file for styling

const { Panel } = Collapse;

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);

  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const onFinishCreate = (values) => {
    dispatch(createCourse(values));
    setShowCreateForm(false);
  };

  const onFinishEdit = (values) => {
    dispatch(updateCourse(currentCourse._id, values));
    setIsEditing(false);
    setCurrentCourse(null);
  };

  const onDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
  };

  const onEdit = (course) => {
    setIsEditing(true);
    setCurrentCourse(course);
  };

  const renderEditForm = () => (
    <Form
      layout="vertical"
      onFinish={onFinishEdit}
      initialValues={currentCourse ? {
        title: currentCourse.title,
        description: currentCourse.description,
        duration: currentCourse.duration,
        price: currentCourse.price,
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
        label="Duration"
        name="duration"
        rules={[{ required: true, message: 'Please input the duration!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input the price!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Course
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
        label="Duration"
        name="duration"
        rules={[{ required: true, message: 'Please input the duration!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input the price!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Course
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className="container">
      <h2 className="text-center mt-5">Courses</h2>

      <Button
        variant="primary"
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="mb-4"
      >
        {showCreateForm ? 'Cancel' : 'Create New Course'}
      </Button>

      <BootstrapCollapse in={showCreateForm}>
        <div>
          {renderCreateForm()}
        </div>
      </BootstrapCollapse>

      <Collapse defaultActiveKey={['1']} className="responsive-collapse">
        {courses.map((course, index) => (
          <Panel header={course.title || 'No Title'} key={index + 1}>
            <div className="panel-content">
              <p><strong>Description:</strong> {course.description}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Price:</strong> {course.price}</p>
              <p><strong>Instructor:</strong> {course.instructor ? course.instructor.name : 'Unknown'}</p>
              <div className="button-group">
                <Button type="primary" onClick={() => onEdit(course)}>Edit</Button>
                <Button type="danger" onClick={() => onDelete(course._id)}>Delete</Button>
              </div>
              {isEditing && currentCourse && currentCourse._id === course._id && renderEditForm()}
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Courses;
