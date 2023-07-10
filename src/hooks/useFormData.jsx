import { useState } from 'react';

export default function useFormData() {
  const [data, setData] = useState({});

  const handleData = (evt) => {
    setData({
      ...data,
      [evt.target.name]: evt.target.value,
    });
  };

  return { data, setData, handleData };
}
