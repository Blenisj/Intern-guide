import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const {
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const score = [
      `previousContact`,
      `altercationsWithCats`,
      `altercationsWithOwner`,
      `playsWithDogs`,
      `hissesAtStrangers`,
    ]
      .reduce((total, key) => total + Number(data[key]), 0);
    data.score = score;
    if (score === 0) {
      data.riskLevel = `Low`;
    } else if (score === 1 || score === 2) {
      data.riskLevel = `Medium`;
    } else {
      data.riskLevel = `High`;
    }
    data.instrumentType = `Cat Behavioral Instrument`;
    const assessment = {
      catDateOfBirth: data.catDateOfBirth,
      catName: data.catName,
      instrumentType: data.instrumentType, // This value seems to be fixed based on your form
      riskLevel: data.riskLevel, // You need to add a form field for this value
      score,
    };
    await AssessmentService.submit(assessment);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Cat Assessment Info</h2>
      <p>Instrument</p>
      <p>Cat Behavioral Instrument</p>
      <h3>Cat Details</h3>
      <Form.Group controlId="catName">
        <Form.Label>Cat Name</Form.Label>
        <Form.Control type="text" {...register(`catName`, { required: true })} />
      </Form.Group>
      <Form.Group controlId="catDateOfBirth">
        <Form.Label>Cat Date of Birth</Form.Label>
        <Form.Control type="date" {...register(`catDateOfBirth`, { required: true })} />
      </Form.Group>
      <h3>Questions & Responses</h3>
      <Form.Group controlId="previousContact">
        <Form.Label>Previous contact with the Cat Judicial System</Form.Label>
        <Form.Control as="select" {...register(`previousContact`, { required: true })}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="altercationsWithCats">
        <Form.Label>Physical altercations with other cats</Form.Label>
        <Form.Control as="select" {...register(`altercationsWithCats`, { required: true })}>
          <option value="0">0-3 altercations</option>
          <option value="1">3+ altercations</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="altercationsWithOwner">
        <Form.Label>Physical altercations with owner (scratching, biting, etc...)</Form.Label>
        <Form.Control as="select" {...register(`altercationsWithOwner`, { required: true })}>
          <option value="0">0-10 altercations</option>
          <option value="1">10+ altercations</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="playsWithDogs">
        <Form.Label>Plays well with dogs</Form.Label>
        <Form.Control as="select" {...register(`playsWithDogs`, { required: true })}>
          <option value="0">Yes</option>
          <option value="1">No</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="hissesAtStrangers">
        <Form.Label>Hisses at strangers</Form.Label>
        <Form.Control as="select" {...register(`hissesAtStrangers`, { required: true })}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
};
