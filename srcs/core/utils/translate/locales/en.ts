export default {
  general: {
    term_agreement: 'Terms and Conditions of use'
  },
  form: {
    required_field: '{{fieldName}} is a required field',
    email_field_label: 'Email',
    gender_field_label: 'Gender',
    dob_field_label: 'Date of birth',
    phone_field_label: 'Phone number',
    address_field_label: 'Address',
    done: 'Done',
    oke: 'Oke',
    cancel: 'Cancel',
  },
  signIn: {
    title: 'Sign In',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    password: 'Password',
    passwordPlaceholder: 'Password',
    usernamePlaceholder: 'Username',
    optionDescription: {
      p1: 'Can’t Sign In?',
      p2: ' Or ',
      p3: 'don’t have an account yet?',
      p4: "\nBy clicking on Sign In, you agree SAWUBONA's ",
      p5: 'Terms and Conditions of use',
    },
  },
  signUp: {
    title: 'Sign Up',
    second_title: 'Create new account',
    field_first_name_label: 'First Name',
    field_last_name_label: 'First Last',
    field_user_name_label: 'Username',
    field_password_label: 'Password',
    field_confirm_password_label: 'Confirm Password',
    field_email_label: 'Email',
    term_agreement: {
      p1: "I agree SAWUBONA's ",
      p2: 'Terms and Conditions of use.',
    },
    button: 'Create',
    success_description:
      'We sent a verification email with a link to verify your account. \nPlease check your inbox or spam folder',
  },
  forgotPassword: {
    title: 'Forgot password',
    secondTitle: 'Enter your email address',
    description: 'We’ll send you an OTP code to reset your password.',
    email: 'Email',
    submit: 'Submit',
  },
  forgotPasswordChangePassword: {
    title: 'Forgot password',
    secondTitle: 'Enter the verification code',
    description: 'The 6-digit code has been sent to {{email}}',
    button_change_email: '\nChange',
    field_code_label: 'Code',
    field_code_placeholder: 'Enter the code',
    label_resent_code: {
      p1: 'The code will expire in 5 minutes. ',
      p2: 'Resend new code.',
    },
    field_new_password_label: 'New password',
    field_new_password_placeholder: 'New password',
    field_confirm_password_label: 'Confirm password',
    field_confirm_password_placeholder: 'Confirm password',
    button_submit: 'Reset',
    label_reset_passsword_success:
      'Your password has been reset. Please now log in.',
  },
  home: {
    search_placeholder: 'Search for stylist, destination, etc',
  },
  profile: {
    change_password_link: 'Change password',
  },
  errors: {
    SERVER_MAINTINANCE: 'Server is down for maintenance.',
    INVALID_PASSWORD:
      'Your password must contain at least one lowercase letter one capital letter one number and one special character.',
    INVALID_EMAIL: 'Email is incorrect. (sample@gmail.com)',
    PASSWORD_NOT_MATCH: 'Password is not match, please try again.',
    PASSWORD_WEAK: 'Please use a strong password.',
  },
};
