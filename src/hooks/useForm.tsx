import { useState } from 'react';

//prettier-ignore
export const useForm = <T,>(intialVals: T) => {
  const [values, setValues] = useState({
    ...intialVals,
  });

  const updateValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log({ e });
    let { value } = e.target;
    // // check if is a string
    // if (typeof value === 'number') {
    //   value = parseInt(e.target.value);
    // }
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  return { values, updateValue };
};
