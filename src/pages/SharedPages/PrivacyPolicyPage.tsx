import { useNavigate } from 'react-router';
import { Box, Grid } from '@mui/material';

import { COLORS } from '../../common/styles/CMTheme';
import PageContent from '../../components/PageContent';
import Wrapper from '../../components/Wrapper';
import ReactMarkdown from 'react-markdown';
import markdown from '../../PrivacyPolicy';
import { CmBackButton, CmButton, CmTypography } from 'shared/components';

function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <Wrapper bgColor={COLORS.PRIMARY}>
      <PageContent>
        <CmTypography variant='h1'>Privacy Policy</CmTypography>

        <CmBackButton onClick={() => navigate(-1)} />

        {/* Privacy Policy Rendered from markdown file. */}
        <ReactMarkdown children={markdown} />

        <Grid item container justifyContent="center">
          <Box my={4}>
            <CmButton 
              text='Go Back'
              onClick={() => navigate(-1)}
            />
          </Box>
        </Grid>
      </PageContent>
    </Wrapper>
  );
}

export default PrivacyPolicyPage;
