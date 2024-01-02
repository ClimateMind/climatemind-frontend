import { CmButton, CmTypography } from "shared/components";

function ConversationRating() {
  return (
    <>
      <CmTypography variant="h1" style={{ textAlign: 'left' }}>Yay! Go you!</CmTypography>
      <CmTypography variant="h3" style={{ textAlign: 'left' }}>How Did it go?</CmTypography>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CmButton text='😡' />
        <CmButton text='😐' />
        <CmButton text='🤔' />
        <CmButton text='😊' />
        <CmButton text='🥳' />
      </div>
    </>
  );
}

export default ConversationRating;
