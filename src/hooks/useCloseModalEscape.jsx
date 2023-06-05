import { useEffect } from 'react';

export default function useCloseModalEscape(isOpened, handleClose) {
  useEffect(() => {
    if (!isOpened) {
      return;
    }

    function handleEscBtn({ key }) {
      if (key === 'Escape') {
        handleClose();
      }
    }

    document.addEventListener('keydown', handleEscBtn);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('keydown', handleEscBtn);
    };
  }, [isOpened, handleClose]);
}
