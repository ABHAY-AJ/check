import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, createEvent, deleteEvent, updateEvent } from '../../redux/actions/eventActions';
import { Button, Form, Input, DatePicker, Collapse, TimePicker } from 'antd';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse as BootstrapCollapse } from 'react-bootstrap';
import Navbar from '../navbar/navbar';
import './Events.css'; // Import the CSS file for styling

const { Panel } = Collapse;

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const onFinishCreate = (values) => {
    const eventDateTime = moment(values.date).set({
      hour: values.time.hour(),
      minute: values.time.minute(),
    }).toISOString();
  
    dispatch(createEvent({ ...values, date: eventDateTime }));
    setShowCreateForm(false);
  };
  
  const onFinishEdit = (values) => {
    const eventDateTime = moment(values.date).set({
      hour: values.time.hour(),
      minute: values.time.minute(),
    }).toISOString();
  
    dispatch(updateEvent(currentEvent._id, { ...values, date: eventDateTime }));
    setIsEditing(false);
    setCurrentEvent(null);
  };

  const onDelete = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  const onEdit = (event) => {
    setIsEditing(true);
    setCurrentEvent(event);
  };

  const renderEditForm = () => (
    <Form
      layout="vertical"
      onFinish={onFinishEdit}
      initialValues={currentEvent ? {
        title: currentEvent.title,
        description: currentEvent.description,
        date: moment(currentEvent.date),
        time: moment(currentEvent.date), // Pre-populate the time
        location: currentEvent.location,
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
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please select the date!' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Time"
        name="time"
        rules={[{ required: true, message: 'Please select the time!' }]}
      >
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: 'Please input the location!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Event
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
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please select the date!' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Time"
        name="time"
        rules={[{ required: true, message: 'Please select the time!' }]}
      >
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: 'Please input the location!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Event
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className="container">
      <h2 className="text-center mt-5">Events</h2>

      <Button
        variant="primary"
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="mb-4"
      >
        {showCreateForm ? 'Cancel' : 'Create New Event'}
      </Button>

      <BootstrapCollapse in={showCreateForm}>
        <div>
          {renderCreateForm()}
        </div>
      </BootstrapCollapse>

      <Collapse defaultActiveKey={['1']} className="responsive-collapse">
        {events.map((event, index) => {
          const eventDate = moment(event.date);
          const formattedDate = eventDate.format('MMMM Do YYYY');
          const formattedTime = eventDate.format('HH:mm');

          return (
            <Panel header={event.title || 'No Title'} key={index + 1}>
              <div className="panel-content">
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Time:</strong> {formattedTime}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Created By:</strong> {event.createdBy ? event.createdBy.name : 'Unknown'}</p>
                <div className="button-group">
                  <Button type="primary" onClick={() => onEdit(event)}>Edit</Button>
                  <Button type="danger" onClick={() => onDelete(event._id)}>Delete</Button>
                </div>
                {isEditing && currentEvent && currentEvent._id === event._id && renderEditForm()}
              </div>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default Events;
