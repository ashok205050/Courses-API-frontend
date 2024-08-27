import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        setError('There was an error fetching the courses: ' + error.message);
        console.error('There was an error fetching the courses!', error);
      });
  }, []);

  return (
    <Container>
      <h1 className="my-4">Course List</h1>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {courses.map(course => (
          <Col md={4} key={course.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Link to={`/course/${course.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CourseList;
