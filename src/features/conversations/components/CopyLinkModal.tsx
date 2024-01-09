import { queryClient } from "App";
import { CmButton, CmModal, CmTypography } from "shared/components";
import { useToastMessage } from "shared/hooks";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userBName: string;
  link: string;
}

function CopyLinkModal({ isOpen, onClose, userBName, link }: Props) {
  const { showSuccessToast } = useToastMessage();

  function copyLink() {
    navigator.clipboard.writeText(link);
    showSuccessToast('Link copied!');
    queryClient.invalidateQueries({ queryKey: ['conversations'] });
    onClose();
  }

  return (
    <CmModal open={isOpen} onClose={onClose} title="Copy Link" maxWidth='sm'>
      <CmTypography variant='body'>Unique link for <em>{userBName}</em>:</CmTypography>
      <CmTypography variant='body' style={{ fontWeight: 'bold', marginTop: 10 }}>{link}</CmTypography>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 50 }}>
        <CmButton variant='text' text='Copy' onClick={copyLink} />
      </div>
    </CmModal>
  );
}

export default CopyLinkModal;
