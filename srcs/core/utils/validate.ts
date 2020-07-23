export const isEmpty = (value: string | object) => {
  return !value;
};

export const isValidPassword = (password: string): boolean => {
  return (
    !isEmpty(password) && password.length >= 8 && isStrongPassword(password)
  );
};

export const strongPasswordRegex = new RegExp(
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
);
export const isStrongPassword = (password: string): boolean => {
  return strongPasswordRegex.test(password);
};

export const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isValidEmail = (password: string) => {
  return emailRegex.test(password);
};

export const validate = {
  isValidEmail,
  isStrongPassword,
  isValidPassword,
  isEmpty,
};
