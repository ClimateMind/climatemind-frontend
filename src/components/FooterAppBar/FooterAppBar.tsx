import { AppBar, Toolbar } from '@mui/material';

export interface FooterAppBarProps {
  bgColor?: string;
  children?: React.ReactNode;
  align?: 'space-between' | 'center';
}

export const FooterAppBar: React.FC<FooterAppBarProps> = ({
  bgColor,
  children,
  align = 'space-between',
}: FooterAppBarProps) => {
  return (
    <AppBar
      position="fixed"
      color="primary"
      style={{
        backgroundColor: bgColor || 'inherit',
        top: 'auto',
        bottom: 0,
        padding: '0 8px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Toolbar
        disableGutters={true}
        style={{
          width: '100%',
          maxWidth: '640px',
          display: 'flex',
          justifyContent: align,
        }}
      >
        {children}
      </Toolbar>
    </AppBar>
  );
};
