import React, { createContext, useState, useEffect } from 'react';

import { TClimateFeed } from '../types/types';
import { TClimateFeedContext } from '../types/types';

import { useSession } from '../hooks/useSession';
import getFeed from '../api/getFeed';

const initialState: TClimateFeedContext = {
  data: [] as TClimateFeed,
  isLoading: false,
  isError: false,
};

export const FeedContext = createContext<TClimateFeedContext>(initialState);

export const FeedContextDispatch = createContext<React.Dispatch<any>>(
  () => null
);

export const ClimateFeedProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState([] as TClimateFeed);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { sessionId } = useSession();

  const callFeedApi = async (sessionId: string) => {
    try {
      setIsLoading(true);
      const data: any = await getFeed(sessionId);
      setData(data);
      setIsLoading(false);
      if(data.error){
        throw new Error('Climate Feed failed to load');
      }
    } catch(err) {
      console.error(err);
      setIsLoading(false);
      setIsError(true);
    }
  };

  // Refresh the data if the sessionId changes
  useEffect(() => {  
    if(sessionId){ 
      callFeedApi(sessionId);
    }
  },[sessionId]);

  // Update the state
  useEffect(() => {
    const newState = {
      data,
      isLoading,
      isError,
    };
    setState(newState);
  }, [setState, data, isLoading, isError]);

    const mockData = [
      {
        "effectDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius. Enim eu turpis egestas pretium aenean pharetra. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Proin sagittis nisl rhoncus mattis. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Ultrices in iaculis nunc sed augue lacus viverra vitae. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Eget est lorem ipsum dolor sit amet consectetur. Quis lectus nulla at volutpat. Urna molestie at elementum eu facilisis. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies.\n\nNon quam lacus suspendisse faucibus. Nunc consequat interdum varius sit amet mattis vulputate. Posuere urna nec tincidunt praesent semper feugiat nibh sed. Leo urna molestie at elementum. Viverra tellus in hac habitasse platea dictumst. Enim ut tellus elementum sagittis vitae et leo duis. Nunc sed augue lacus viverra vitae congue eu. Vivamus at augue eget arcu. Tellus cras adipiscing enim eu turpis egestas pretium. Luctus accumsan tortor posuere ac ut consequat semper.", 
        "effectId": "R8t0oNsG3WgnupXsBVSjMHZ", 
        "effectScore": 61.25, 
        "effectShortDescription": "The warming air in the atmosphere is causing more heatwaves. This combined with warming days and nights is causing increases in suicide. Rising temperature and climate change are not direct motivations for suicide. Instead, temperature and climate increase the risk of suicide by affecting the likelihood that an individual situation leads to an attempt at self-harm. More people are triggered to intentionally cause their own death.", 
        "effectSolutions": [
          {
            "imageURL": [], 
            "longDescription": [], 
            "shortDescription": [
              "The negative effects of climate change can increase suicide rates. More funding for mental health services and education can help prevent suicides.", 
              "The negative effects of climate change can increase suicide rates. More funding for mental health services and education can help prevent suicides."
            ], 
            "solutionTitle": "increase in funding for suicide prevention"
          }, 
          {
            "imageURL": [
              "https://c.pxhere.com/photos/36/9f/solar_panels_installation_workers_array_power_sun_electricity_energy-1028805.jpg!d", 
              "https://c.pxhere.com/photos/36/9f/solar_panels_installation_workers_array_power_sun_electricity_energy-1028805.jpg!d"
            ], 
            "longDescription": [], 
            "shortDescription": [
              "Government investment can create jobs that reduce emissions, such as positions in agriculture, manufacturing, R&D, administrative, and service activities aimed at substantially preserving or restoring environmental quality.", 
              "Government investment can create jobs that reduce emissions, such as positions in agriculture, manufacturing, R&D, administrative, and service activities aimed at substantially preserving or restoring environmental quality."
            ], 
            "solutionTitle": "establish a federal green jobs program"
          }, 
          {
            "imageURL": [], 
            "longDescription": [], 
            "shortDescription": [
              "Charging people and companies a carbon tax on emissions can be made more popular by redistributing the income back to taxpayers.", 
              "Charging people and companies a carbon tax on emissions can be made more popular by redistributing the income back to taxpayers."
            ], 
            "solutionTitle": "enact carbon tax policy (revenue neutral)"
          }, 
        ], 
        "effectTitle": "increase in suicide", 
        "imageUrl": "https://im.indiatimes.in/media/content/2016/Jun/netsafe%20org_1466062085.jpg"
      }, 
      {
        "effectDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius. Enim eu turpis egestas pretium aenean pharetra. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Proin sagittis nisl rhoncus mattis. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Ultrices in iaculis nunc sed augue lacus viverra vitae. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Eget est lorem ipsum dolor sit amet consectetur. Quis lectus nulla at volutpat. Urna molestie at elementum eu facilisis. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies.\n\nNon quam lacus suspendisse faucibus. Nunc consequat interdum varius sit amet mattis vulputate. Posuere urna nec tincidunt praesent semper feugiat nibh sed. Leo urna molestie at elementum. Viverra tellus in hac habitasse platea dictumst. Enim ut tellus elementum sagittis vitae et leo duis. Nunc sed augue lacus viverra vitae congue eu. Vivamus at augue eget arcu. Tellus cras adipiscing enim eu turpis egestas pretium. Luctus accumsan tortor posuere ac ut consequat semper.", 
        "effectId": "RDavliTi6W93xwahwtUnUtG", 
        "effectScore": 61.25, 
        "effectShortDescription": "The continued rise in frequency of warm days and night in addition to heatwaves are driving increases in physical violence. More people are harming others through acts of physical aggression.", 
        "effectSolutions": [
          {
            "imageURL": [
              "https://62e528761d0685343e1c-f3d1b99a743ffa4142d9d7f1978d9686.ssl.cf2.rackcdn.com/files/8/width668/aapone-20110307000303779168-australia-weather-rain-record-files-original.jpg", 
              "https://cdn.pixabay.com/photo/2013/09/08/19/15/hurricane-katrina-180538_960_720.jpg", 
            ], 
            "longDescription": [], 
            "shortDescription": [
              "Building on higher ground prevents flood damage to property as flooding continues to intensify due to climate change.", 
              "Building on higher ground prevents flood damage to property as flooding continues to intensify due to climate change."
            ], 
            "solutionTitle": "avoid building on land that is or will become a floodplain"
          }, 
          {
            "imageURL": [
              "https://c.pxhere.com/photos/36/9f/solar_panels_installation_workers_array_power_sun_electricity_energy-1028805.jpg!d", 
              "https://c.pxhere.com/photos/36/9f/solar_panels_installation_workers_array_power_sun_electricity_energy-1028805.jpg!d"
            ], 
            "longDescription": [], 
            "shortDescription": [
              "Government investment can create jobs that reduce emissions, such as positions in agriculture, manufacturing, R&D, administrative, and service activities aimed at substantially preserving or restoring environmental quality.", 
              "Government investment can create jobs that reduce emissions, such as positions in agriculture, manufacturing, R&D, administrative, and service activities aimed at substantially preserving or restoring environmental quality."
            ], 
            "solutionTitle": "establish a federal green jobs program"
          }, 
          {
            "imageURL": [], 
            "longDescription": [], 
            "shortDescription": [
              "Charging people and companies a carbon tax on emissions can be made more popular by redistributing the income back to taxpayers.", 
              "Charging people and companies a carbon tax on emissions can be made more popular by redistributing the income back to taxpayers."
            ], 
            "solutionTitle": "enact carbon tax policy (revenue neutral)"
          }, 
         
        ], 
        "effectTitle": "increase in physical violence", 
        "imageUrl": "https://i0.pickpik.com/photos/744/359/676/fist-strength-anger-tear-preview.jpg"
      }] as TClimateFeed;

  const mockState: TClimateFeedContext = {
    data: mockData,
    isLoading: false,
    isError: false,
  };
 
  return ( !!process.env.STORYBOOK_MOCK_CONTEXT ?
    <FeedContext.Provider value={mockState}>{children}</FeedContext.Provider> : 
    <FeedContext.Provider value={state}>
      <FeedContextDispatch.Provider value={setState}>
        {children}
      </FeedContextDispatch.Provider>
    </FeedContext.Provider>
  );
};
