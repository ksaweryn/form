import {
  EMAIL_ACTION,
  PASSWORD_ACTION,
  PASSWORD_CONFIRMATION_ACTION,
  USERNAME_ACTION,
} from './actions';

export const formReducer = (state, action) => {
  switch (action.type) {
    case USERNAME_ACTION:
      return { ...state, usernameState: action.payload };

    case EMAIL_ACTION:
      return { ...state, emailState: action.payload };

    case PASSWORD_ACTION:
      return { ...state, passwordState: action.payload };

    case PASSWORD_CONFIRMATION_ACTION:
      return { ...state, passwordConfirmationState: action.payload };

    default:
      throw new Error('No valid state action');
  }
};
