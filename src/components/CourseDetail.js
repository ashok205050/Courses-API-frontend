import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/courses/${id}/`)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the course details!', error);
      });
  }, [id]);

  return (
    <Container>
      {course ? (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>{course.title}</Card.Title>
            <Card.Text>
              <strong>Description:</strong> {course.description}
            </Card.Text>
            <Card.Text>
              <strong>Code:</strong> {course.course_code}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default CourseDetail;
