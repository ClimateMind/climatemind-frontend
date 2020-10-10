import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


import { TClimateFeed } from '../types/types';

export const FeedContext = createContext<TClimateFeed>(
  {} as TClimateFeed
);

const dummyData : TClimateFeed = [
    {
      "effectId" : "6eb9e216-a8e9-4ae7-8a52-5a2d2cf84ae9",
      "effectTitle" : "This is the effect title",
      "effectShortDesc" : "Deserunt ea consequat veniam aute commodo sunt nostrud. Irure nisi id culpa ex sunt. Anim dolore magna laborum nisi. Et commodo amet ut ea nisi incididunt minim aute ex mollit labore. Anim nostrud nisi fugiat nulla excepteur incididunt mollit ut. Commodo minim nisi magna adipisicing amet. Ad est aliqua exercitation voluptate officia deserunt enim est eiusmod laboris id."
    },
    {
      "effectId" : "6eb9e216-a8e9-4ae7-8a52-5a2d2cf84ae9",
      "effectTitle" : "This is the effect title",
      "effectShortDesc" : "Qui ex ullamco Lorem consequat non elit ea. Ex est incididunt voluptate eiusmod commodo magna deserunt magna non sint. Occaecat velit pariatur aliquip est culpa ullamco qui tempor laboris cillum pariatur reprehenderit non. In labore labore qui incididunt laborum proident consequat nisi excepteur aute labore nulla ullamco. Officia aliqua do enim laborum nulla voluptate ea excepteur aliquip sit non ullamco. Velit occaecat sint esse sunt id cillum cupidatat. Deserunt in consequat do id velit adipisicing eu elit commodo commodo officia."
    }
  ]

export const ClimateFeedProvider: React.FC = ({ children }) => {
  const [climatefeed, setClimateFeed] = useState(dummyData);
  
  // const API_HOST =
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:5000'
  //     : process.env.REACT_APP_API_URL;
  // //TODO: session-id should not be hardcoded like this

  // const { sessionId } = useSession();
  // const PERSONAL_VALUES_ENDPOINT = `/personal_values?session-id=${sessionId}`;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const request = await axios.get(API_HOST + PERSONAL_VALUES_ENDPOINT);
  //       const data = request.data;
  //       setPersonalValues(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   if (sessionId) {
  //     fetchData();
  //   }
  // }, [API_HOST, PERSONAL_VALUES_ENDPOINT, sessionId]);

  return (
    <FeedContext.Provider value={climatefeed}>
      {children}
    </FeedContext.Provider>
  );
};
