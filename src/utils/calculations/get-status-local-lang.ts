const getStatusLocalLang = (status: 'created' | 'pending' | 'done') => {
  switch (status) {
    case 'created':
      return 'Создан';
    case 'pending':
      return 'Готовится';
    default:
      return 'Выполнен';
  }
};

export default getStatusLocalLang;
