import { useState } from 'react';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = () => {
      console.log('reader.error', reader.error);
    };
  };

  const uploadImage = async () => {
    try {
      const headers = {
        'Content-Type': 'image/jpeg', 
      };

      const response = await fetch('/api/postImage', {
        method: 'POST',
        body: image,
        headers: headers,
      });

      if (response.ok) {
        console.log('Image uploaded successfully!');
      } else {
        console.error('Image upload failed.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleSubmit} />
      <button onClick={uploadImage}>Upload Image</button>
    </>
  );
};

export default ImageUploadForm;
