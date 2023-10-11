const getStatusLocalLang = (status?: 'created' | 'pending' | 'done') => {
  switch (status) {
    case 'created':
      return 'Создан';
    case 'pending':
      return 'Готовится';
    case 'done':
      return 'Выполнен';
    default:
      return '';
  }
};

export default getStatusLocalLang;
