import { useClipboard } from 'use-clipboard-copy';
import { useToast } from './useToast';
import { useErrorLogging } from './useErrorLogging';

export const useCopyLink = () => {
  const { showToast } = useToast();
  const { logError } = useErrorLogging();
  const clipboard = useClipboard({
    onSuccess() {
      showToast({
        message: 'Link copied!',
        type: 'success',
      });
    },
    onError() {
      showToast({
        message: 'Failed to copy link',
        type: 'error',
      });
      logError('Error Copying to clipboard');
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
