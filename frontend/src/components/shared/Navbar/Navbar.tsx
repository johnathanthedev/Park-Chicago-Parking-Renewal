import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  Button,
  Modal,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN, SIGN_UP } from '../../../config/constants';
import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';
import { ModalStateType } from '../../../config/types';

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();

  const [modalState, setModalState] = useState<ModalStateType>({
    show: false,
    type: '',
    registration: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    user: {
      isSignedIn: false,
    },
  });

  useEffect(() => {
    const isUserSignedIn = async () => {
      const userId = await axios.get('http://localhost:3000/sessions/ping', {
        withCredentials: true,
      });
      return userId;
    };
    isUserSignedIn().then((data) => {
      data.data.userId !== null
        ? setModalState({
            ...modalState,
            user: {
              ...modalState.user,
              isSignedIn: true,
            },
          })
        : setModalState({
            ...modalState,
            user: {
              ...modalState.user,
              isSignedIn: false,
            },
          });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () =>
    setModalState({
      ...modalState,
      show: false,
      registration: {
        ...modalState.registration,
        email: '',
        password: '',
        passwordConfirmation: '',
      },
    });

  const handleSignIn = () => {
    setModalState({ ...modalState, show: true, type: SIGN_IN });
  };

  const handleSignUp = () => {
    setModalState({ ...modalState, show: true, type: SIGN_UP });
  };

  const handleSubmit = async () => {
    try {
      switch (modalState.type) {
        case SIGN_UP:
          const signUpRes = await axios.post(
            `${process.env.REACT_APP_PCPR_API_URL}/registrations/sign-up`,
            {
              email: modalState.registration.email,
              password: modalState.registration.password,
              passwordConfirmation:
                modalState.registration.passwordConfirmation,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );
          signUpRes.status === 200 &&
            setModalState({
              ...modalState,
              show: false,
              user: {
                ...modalState.user,
                isSignedIn: true,
              },
            });
          navigate('/dashboard');
          break;
        case SIGN_IN:
          const signInRes = await axios.post(
            `${process.env.REACT_APP_PCPR_API_URL}/sessions/sign-in`,
            {
              email: modalState.registration.email,
              password: modalState.registration.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );
          signInRes.status === 200 &&
            setModalState({
              ...modalState,
              show: false,
              user: {
                ...modalState.user,
                isSignedIn: true,
              },
            });
          navigate('/dashboard');
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    await axios.delete('http://localhost:3000/sessions/sign-out', {
      withCredentials: true,
    });

    setModalState({
      ...modalState,
      user: {
        ...modalState.user,
        isSignedIn: false,
      },
    });

    navigate('/');
  };

  return (
    <>
      <BootstrapNavbar
        id='bootstrap-navbar'
        collapseOnSelect
        expand='lg'
        bg='dark'
        variant='dark'
      >
        <Container>
          <BootstrapNavbar.Brand href='/'>
            Park Chicago - Parking Renewal
          </BootstrapNavbar.Brand>
          <div>
            <Nav>
              {modalState.user.isSignedIn === false ? (
                <div>
                  <Button onClick={handleSignIn} variant='secondary'>
                    Sign In
                  </Button>
                  <Button onClick={handleSignUp} variant='secondary'>
                    Sign Up
                  </Button>
                </div>
              ) : (
                <Button onClick={handleSignOut} variant='secondary'>
                  Sign Out
                </Button>
              )}
            </Nav>
          </div>
        </Container>
      </BootstrapNavbar>
      <Modal show={modalState.show} onHide={handleClose}>
        <Container className='pt-3'>
          {modalState.type === SIGN_IN && (
            <SignInForm modalState={modalState} setModalState={setModalState} />
          )}
          {modalState.type === SIGN_UP && (
            <SignUpForm modalState={modalState} setModalState={setModalState} />
          )}
        </Container>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
