import { Dialog } from "@mui/material";
import CmTypography from "./CmTypography";

interface Props {
  open: boolean;
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

function CmModal({ open, onClose, title, children, maxWidth = false }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth}>
      <div style={{ padding: 20 }}>
        <CmTypography variant="h4" style={{ textAlign: "left", marginBottom: 0 }}>{title}</CmTypography>
        {children}
      </div>
    </Dialog>
  );

}

export default CmModal;
