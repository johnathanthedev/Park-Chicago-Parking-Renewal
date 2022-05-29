export type ModalStateType = {
  show: boolean;
  type: string;
  registration: {
    email: string;
    password: string;
    passwordConfirmation?: string;
  };
  user: {
    isSignedIn: boolean;
  };
};
