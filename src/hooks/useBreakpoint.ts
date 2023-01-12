import { useMediaQuery } from '@material-ui/core';
import theme from '../common/styles/CMTheme';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBreakpoint = () => {
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    isXs,
    isSm,
  };
};
