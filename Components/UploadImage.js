import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadImage = ({ onImageUploaded }) => {
  const [image, setImage] = useState(null);

  // Función para manejar el cambio en la carga de la imagen
  const onDrop = (acceptedFiles) => {
    const selectedImage = acceptedFiles[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        onImageUploaded(reader.result); // Llamada a la función proporcionada para pasar la imagen al componente padre
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  // Configuración de Dropzone
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', multiple: false });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {
        image ? (
          <img src={image} alt="Imagen seleccionada" style={imageStyles} />
        ) : (
          <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una.</p>
        )
      }
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const imageStyles = {
  maxWidth: '100%',
  maxHeight: '400px',
};

export default UploadImage;