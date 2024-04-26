import React from 'react';

interface UploadImageProps {
    onImageUpload: (imageData: string, imageInput: HTMLInputElement | null) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload }) => {
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = event.target.files![0];
        const reader = new FileReader();
        reader.onload = () => {
            onImageUpload(reader.result as string, event.target);
        };
        reader.readAsDataURL(imageFile);
    };

    return (
        <input id="image-input" type="file" accept="image/*" onChange={handleUpload} />
    );
}

export default UploadImage;
