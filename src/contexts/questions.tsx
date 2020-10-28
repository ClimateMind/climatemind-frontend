import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { TQuestions } from '../types/types';

export const QuestionsContext = createContext<TQuestions>({} as TQuestions);

export const QuestionsProvider: React.FC = ({ children }) => {
  const [questions, setQuestions] = useState({} as TQuestions);
  const API_HOST =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : process.env.REACT_APP_API_URL;
  const QUESTIONS_ENDPOINT = '/questions';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(API_HOST + QUESTIONS_ENDPOINT);
        const data = request.data;
        setQuestions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [API_HOST]);

  return (
    <QuestionsContext.Provider value={questions}>
      {children}
    </QuestionsContext.Provider>
  );
};
