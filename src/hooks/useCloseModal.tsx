import { useEffect } from 'react';

function useCloseModal(id: string, isOpened: boolean, handleClose: () => void) {
  useEffect(() => {
    if (!isOpened) return;

    const closeModal = (evt: Event) => {
      if (
        (evt.target as Element)?.id === id ||
        (evt as KeyboardEvent).key === 'Escape'
      ) {
        handleClose();
      }
    };

    document.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
    };
  }, [isOpened]);
}

export default useCloseModal;
