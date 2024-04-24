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
    await AssessmentService.submit(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Cat Assessment Info</h2>
      <p>Instrument</p>
      <p>Cat Behavioral Instrument</p>
      <h3>Cat Details</h3>
      <label>
        Cat Name
        <input {...register(`Cat Name`, { required: true })} />
      </label>
      <label>
        Cat Date of Birth
        <input type="date" {...register(`Cat Date of Birth`, { required: true })} />
      </label>
      <h3>Questions & Responses</h3>
      <label>
        Previous contact with the Cat Judicial System
        <select {...register(`Previous contact`, { required: true })}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </label>
      <label>
        Physical altercations with other cats
        <select {...register(`Altercations with cats`, { required: true })}>
          <option value="0">0-3 altercations</option>
          <option value="1">3+ altercations</option>
        </select>
      </label>
      <label>
        Physical altercations with owner (scratching, biting, etc...)
        <select {...register(`Altercations with owner`, { required: true })}>
          <option value="0">0-10 altercations</option>
          <option value="1">10+ altercations</option>
        </select>
      </label>
      <label>
        Plays well with dogs
        <select {...register(`Plays with dogs`, { required: true })}>
          <option value="0">Yes</option>
          <option value="1">No</option>
        </select>
      </label>
      <label>
        Hisses at strangers
        <select {...register(`Hisses at strangers`, { required: true })}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </label>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
};
