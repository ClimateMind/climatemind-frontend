import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { usePasswordResetLink } from '../hooks/usePasswordResetLink';
import ROUTES from '../components/Router/RouteConfig';

type UrlParamType = {
    passwordResetLinkUuid: string;
  };

const PasswordReset: React.FC = () => {

    const history = useHistory();

    const { passwordResetLinkUuid } = useParams<UrlParamType>();
    const { verifyPasswordResetLink } = usePasswordResetLink();

    const [isBusy, setBusy] = useState(true)
    const [linkIsValid, setLinkIsValid] = useState(true);

    // When the page loads, we evaluate the uuid from the url to see if the reset link is valid or not
    useEffect(() => {
        const fetchData = async() => {
            verifyPasswordResetLink({ passwordResetLinkUuid })
            .then(res => {
                setLinkIsValid(true);
                setBusy(false);
            })
            .catch(err => setBusy(false));
        }

        fetchData();
    }, []);
    
    // As long as the verification isn't finished, we display nothing
    if (isBusy) {
        return (
            <Loader />
        )
    }

    if (!linkIsValid) {
        return (
            <div style={{textAlign: "center", marginTop: "200px"}}>
                <Typography variant="body1">Your password reset link has expired, please request a new one.</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: '2em 0 1.5em' }}
                    onClick={() => history.push(ROUTES.ROUTE_LOGIN)}
                >
                    Back to login
                </Button>
            </div>
        )
    } else {
        return (
            <div style={{marginTop: "100px"}}>
                Method finished! {linkIsValid ? 'true' : 'false'}
            </div>
        )
    }
        
}

export default PasswordReset;
