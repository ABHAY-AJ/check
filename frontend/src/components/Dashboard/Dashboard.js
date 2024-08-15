import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './Dashboard.css'; // Import your custom CSS file

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <p className="text-center mb-4">Welcome, {auth.user ? auth.user.name : ''}</p>
      <div className="row">
        <div className="col-md-3 mb-4">
          <Card>
            <Card.Img variant="top" src="https://img.lovepik.com/background/20211027/large/lovepik-blue-tech-poster-background-image_401590513.jpg" alt="Events" />
            <Card.Body className="text-center">
              <Card.Title>Events</Card.Title>
              <Card.Text>
                View and manage all your events.
              </Card.Text>
              <Link to="/events">
                <Button variant="primary">View Events</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 mb-4">
          <Card>
            <Card.Img variant="top" src="https://png.pngtree.com/png-clipart/20210627/original/pngtree-job-vacancy-design-with-colorful-speaker-illustration-for-template-on-poster-png-image_6458624.jpg" alt="Jobs" />
            <Card.Body className="text-center">
              <Card.Title>Jobs</Card.Title>
              <Card.Text>
                Explore job opportunities and manage listings.
              </Card.Text>
              <Link to="/jobs">
                <Button variant="primary">View Jobs</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 mb-4">
          <Card>
            <Card.Img variant="top" src="https://png.pngtree.com/thumb_back/fw800/background/20220506/pngtree-a-notepad-with-the-pros-of-an-internship-listed-photo-image_30281478.jpg" alt="Internships" />
            <Card.Body className="text-center">
              <Card.Title>Internships</Card.Title>
              <Card.Text>
                Find and manage internships.
              </Card.Text>
              <Link to="/internships">
                <Button variant="primary">View Internships</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 mb-4">
          <Card>
            <Card.Img variant="top" src="https://png.pngtree.com/background/20210711/original/pngtree-education-open-class-poster-background-template-picture-image_1088106.jpg" alt="Courses" />
            <Card.Body className="text-center">
              <Card.Title>Courses</Card.Title>
              <Card.Text>
                Browse and enroll in courses.
              </Card.Text>
              <Link to="/courses">
                <Button variant="primary">View Courses</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
