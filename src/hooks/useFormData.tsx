import React, { useState } from 'react';

interface IFormEntryData {
  [key: string]: string;
}

export default function useFormData() {
  const [data, setData] = useState<IFormEntryData>({});

  const handleData = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [evt.target.name]: evt.target.value,
    });
  };

  return { data, setData, handleData };
}
