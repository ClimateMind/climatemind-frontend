import React from 'react';
import './climateMindContainer.scss';
import Text from './components/Text';
import {ReactComponent as Logo} from './assets/cm-logo.svg'
import Button from "./components/Button";

const ClimateMindContainer = () => {
  return (
      <div className="app-container">
        <div>
          <Text
            fontFamily={'atten-round-new, sans-serif'}
            fontStyle={'normal'}
            fontWeight={500}
            size={24} color={'#07373B'}
            textAlign={'center'}>
          <span>Welcome to</span>
          </Text>
          <Logo data-testid="climate-mind-logo" style={{paddingTop: 20}}/>
        </div>
        <Text
          fontFamily={'atten-round-new, sans-serif'}
          fontStyle={'normal'}
          fontWeight={800}
          size={30}
          color={'#07373B'}
          textAlign={'center'}
          >
          <span>Powering </span>
          <br/>
          <span>climate </span>
          <br/>
          <span>conversations </span>
        </Text>
        <Button displayText='Get started' onClick={() => console.log('Testy McTestface')}/>
      </div>
  );
}

export default ClimateMindContainer;
