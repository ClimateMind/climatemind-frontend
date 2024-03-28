import { useNavigate } from 'react-router';
import ReactMarkdown from 'react-markdown';
import classes from './PrivacyPolicyPage.module.css';

import markdown from './PrivacyPolicy';
import { CmBackButton, CmButton, CmTypography, Page, PageContent } from 'shared/components';

function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <Page style={{ backgroundColor: 'white' }}>
      <PageContent style={{ paddingTop: 20 }}>
        <CmTypography variant='h1'>Privacy Policy</CmTypography>

        <CmBackButton onClick={() => navigate(-1)} style={{ alignSelf: 'flex-start' }} />

        {/* Privacy Policy Rendered from markdown file. */}
        <ReactMarkdown children={markdown} className={classes.root} />

        <CmButton text='Go Back' onClick={() => navigate(-1)} style={{ marginTop: 30 }}/>
      </PageContent>
  </Page>
  );
}

export default PrivacyPolicyPage;
