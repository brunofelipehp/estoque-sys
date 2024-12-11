import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const useImagePreview = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { setValue } = useFormContext();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue('image', imageUrl);
    }
  };

  return { previewImage, setPreviewImage, handleImageChange };
};
