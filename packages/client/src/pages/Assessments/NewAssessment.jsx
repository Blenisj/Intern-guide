import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';
import 'bootstrap/dist/css/bootstrap.min.css';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const {
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = async (data) => {
    // eslint-disable-next-line no-console
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
    if (score <= 1) {
      data.riskLevel = `Low`;
    } else if (score === 2 || score === 3) {
      data.riskLevel = `Medium`;
    } else {
      data.riskLevel = `High`;
    }
    data.instrumentType = 1;
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
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <h2 className="mb-3">Cat Assessment Info</h2>
        <p className="mb-4">Cat Behavioral Instrument</p>
        <h3 className="mb-3">Cat Details</h3>

        <Form.Group controlId="catName" className="mb-3">
          <Form.Label>Cat Name</Form.Label>
          <Form.Control type="text" {...register(`catName`, { required: true })} />
        </Form.Group>

        <Form.Group controlId="catDateOfBirth" className="mb-3">
          <Form.Label>Cat Date of Birth</Form.Label>
          <Form.Control type="date" {...register(`catDateOfBirth`, { required: true })} />
        </Form.Group>

        <h3 className="mb-3">Questions & Responses</h3>

        <Form.Group controlId="previousContact" className="mb-3">
          <Form.Label>Previous contact with the Cat Judicial System</Form.Label>
          <Form.Control as="select" {...register(`previousContact`, { required: true })}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="altercationsWithCats" className="mb-3">
          <Form.Label>Physical altercations with other cats</Form.Label>
          <Form.Control as="select" {...register(`altercationsWithCats`, { required: true })}>
            <option value="0">0-3 altercations</option>
            <option value="1">3+ altercations</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="altercationsWithOwner" className="mb-3">
          <Form.Label>Physical altercations with owner (scratching, biting, etc...)</Form.Label>
          <Form.Control as="select" {...register(`altercationsWithOwner`, { required: true })}>
            <option value="0">0-10 altercations</option>
            <option value="1">10+ altercations</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="playsWithDogs" className="mb-3">
          <Form.Label>Plays well with dogs</Form.Label>
          <Form.Control as="select" {...register(`playsWithDogs`, { required: true })}>
            <option value="0">Yes</option>
            <option value="1">No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="hissesAtStrangers" className="mb-3">
          <Form.Label>Hisses at strangers</Form.Label>
          <Form.Control as="select" {...register(`hissesAtStrangers`, { required: true })}>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Submit</Button>
      </Form>
    </div>
  );
};
