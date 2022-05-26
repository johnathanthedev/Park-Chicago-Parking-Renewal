import SignUpForm from './SignUpForm';

type Props = {
  setModalState: any;
  modalState: any;
};

const index = (props: Props) => {
  return (
    <SignUpForm
      modalState={props.modalState}
      setModalState={props.setModalState}
    />
  );
};

export default index;
