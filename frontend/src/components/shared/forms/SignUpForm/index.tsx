import { ModalStateType } from '../../../../config/types';
import SignUpForm from './SignUpForm';

type Props = {
  setModalState: React.Dispatch<React.SetStateAction<ModalStateType>>;
  modalState: ModalStateType;
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
