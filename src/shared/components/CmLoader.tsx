import { CircularProgress } from "@mui/material";

function CmLoader() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress style={{ color: 'gray', margin: 'auto' }} />
    </div>
  );
}

export default CmLoader;
