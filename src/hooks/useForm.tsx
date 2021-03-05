import { useState } from 'react';

export const useForm = <T,>(intialVals: T) => {
  const [values, setValues] = useState({
    ...intialVals,
  });

  const updateValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { value } = e.target;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  return { values, updateValue };
};
