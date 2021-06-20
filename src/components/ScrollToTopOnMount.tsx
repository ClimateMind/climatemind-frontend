import { useEffect } from 'react';
// https://reactrouter.com/web/guides/scroll-restoration

export default function ScrollToTopOnMount() {
  useEffect(() => {
    window !== undefined && window.scrollTo(0, 0);
  }, []);

  return null;
}
