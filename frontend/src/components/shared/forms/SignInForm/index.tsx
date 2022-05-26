import SignInForm from './SignInForm';

type Props = {
  setModalState: any;
  modalState: any;
};

const index = (props: Props) => {
  return (
    <SignInForm
      modalState={props.modalState}
      setModalState={props.setModalState}
    />
  );
};

export default index;
