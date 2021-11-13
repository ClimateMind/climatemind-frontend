import { useClipboard } from 'use-clipboard-copy';
import { useToast } from './useToast';

export const useCopyLink = () => {
  const { showToast } = useToast();
  const clipboard = useClipboard({
    onSuccess() {
      showToast({
        message: 'Link was successfully copied',
        type: 'success',
      });
    },
    onError() {
      showToast({
        message: 'Failed to copy link',
        type: 'error',
      });
    },
  });

  const copyLink = (link: string) => {
    if (!clipboard.isSupported()) {
      showToast({
        message: 'Copy-to-clipboard not supported by your browser',
        type: 'error',
      });
      return;
    }
    clipboard.copy(link);
  };

  return { copyLink, clipboard };
};
