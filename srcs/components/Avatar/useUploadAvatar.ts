import {useState} from 'react';
import ImagePicker, {Image} from 'react-native-image-crop-picker';

export const useUploadAvatar = () => {
  const [image, setImage] = useState<Image | null>(null);

  const handleOnPressEdit = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.5,
    }).then(image => {
      if (Array.isArray(image)) {
        setImage(image[0]);
      } else {
        setImage(image);
      }
    });
  };

  return {
    onPressEdit: handleOnPressEdit,
    selectedImage: image,
  };
};
