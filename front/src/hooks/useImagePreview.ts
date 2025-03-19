import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const useImagePreview = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [sendImage, setSendImage] = useState<File>();

  const { setValue } = useFormContext();

  const handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void> = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue('image', file);
      setSendImage(file);      
    }
  };

  return { previewImage, setPreviewImage, handleImageChange, sendImage };
};
