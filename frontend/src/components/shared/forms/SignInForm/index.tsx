import { ModalStateType } from '../../../../config/types';
import SignInForm from './SignInForm';

type Props = {
  setModalState: React.Dispatch<React.SetStateAction<ModalStateType>>;
  modalState: ModalStateType;
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
