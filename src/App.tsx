import React from 'react';
import CMContainer from './components/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './pages/home';
import './common/styles/global.scss';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <CMContainer bgColor="#39F5AD">
        <Home />
      </CMContainer>
    </React.Fragment>
  );
}

export default App;
