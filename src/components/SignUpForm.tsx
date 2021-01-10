import React from 'react';
import Button from './Button';
import TextInput from './TextInput';

const SignUpForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    console.log('Form Submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="emailInput"
        label="Email"
        placeholder="greta@climatemind.org"
        fullWidth={true}
        variant="filled"
        color="secondary"
        margin="none"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
