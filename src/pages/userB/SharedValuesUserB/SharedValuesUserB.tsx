import { Button, Toolbar } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { COLORS } from '../../../common/styles/CMTheme';
import { FooterAppBar } from '../../../components/FooterAppBar/FooterAppBar';
import ROUTES_CONFIG from '../../../components/Router/RouteConfig';
import { SharedValues } from '../../SharedValues';

const SharedValuesUserB: React.FC = () => {
  const { push } = useHistory();

  return (
    <SharedValues>
      <FooterAppBar align="center" bgColor={COLORS.ACCENT10}>
        <Toolbar>
          <Button
            style={{ border: '1px solid #a347ff' }}
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => push(ROUTES_CONFIG.USERB_SHARED_IMPACTS)}
          >
            Next: Shared Impacts
          </Button>
        </Toolbar>
      </FooterAppBar>
    </SharedValues>
  );
};

export default SharedValuesUserB;
