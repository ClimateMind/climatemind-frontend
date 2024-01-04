import { CmButton, CmModal, CmTypography } from "shared/components";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userBName: string;
}

function DeleteConversationModal({ isOpen, onClose, onConfirm , userBName}: Props) {
  return (
    <CmModal open={isOpen} onClose={onClose} title="Delete Conversation?">
      <CmTypography variant='body'>Are you sure you want to delete your conversation with <em>{userBName}</em>?</CmTypography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 50, marginTop: 50 }}>
        <CmButton variant='text' text='Cancel' onClick={onClose} />
        <CmButton variant='text' text='Confirm' onClick={onConfirm} />
      </div>
    </CmModal>
  );
}

export default DeleteConversationModal;
