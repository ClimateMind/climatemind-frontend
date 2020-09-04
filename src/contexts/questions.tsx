import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { Questions } from "../types/types";

export const QuestionsContext = createContext<Questions>({} as Questions);

export const QuestionsProvider: React.FC = ({ children }) => {
    const [questions, setQuestions] = useState({} as Questions);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const url = "http://localhost:5000/questions"; //TODO add to ENV
          const request = await axios.get(url);
          const data = request.data;
          setQuestions(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);
  
    return (
      <QuestionsContext.Provider value={questions}>
        {children}
      </QuestionsContext.Provider>
    );
  };