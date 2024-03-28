import styled from "@emotion/styled";
import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
    fontSize: 16,
    fontFamily: 'Nunito',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'white',
  },
}));

export default LightTooltip;
