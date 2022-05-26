import { BaseSyntheticEvent } from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  setModalState: any;
  modalState: any;
};

const SignUpForm = ({ setModalState, modalState }: Props) => {
  const {
    registration: { email, password, passwordConfirmation },
  } = modalState;

  const handleChange = (event: BaseSyntheticEvent) => {
    const {
      target: { name, value },
    } = event;

    setModalState({
      ...modalState,
      registration: {
        ...modalState.registration,
        [name]: value,
      },
    });
  };

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          name='email'
          onChange={handleChange}
          value={email}
        />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleChange}
          value={password}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password Cofirmation'
          name='passwordConfirmation'
          onChange={handleChange}
          value={passwordConfirmation}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicCheckbox'>
        <Form.Check type='checkbox' label='Check me out' />
      </Form.Group>
    </Form>
  );
};

export default SignUpForm;
