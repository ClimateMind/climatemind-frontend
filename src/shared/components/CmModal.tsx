import { Dialog } from "@mui/material";
import CmTypography from "./CmTypography";

interface Props {
  open: boolean;
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
}

function CmModal({ open, onClose, title, children }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ padding: 20 }}>
        <CmTypography variant="h4" style={{ textAlign: "left", marginBottom: 0 }}>{title}</CmTypography>
        {children}
      </div>
    </Dialog>
  );

}

export default CmModal;
