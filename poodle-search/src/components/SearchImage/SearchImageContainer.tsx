import React, { useRef } from 'react';
import SearchImage from './SearchImage';
import UploadImage from './UploadImage';
import SearchButton from './SearchButton';
import { useNavigate } from 'react-router-dom';

const SearchImageContainer: React.FC = () => {
    const navigate = useNavigate();
    const imageInputRef = useRef<HTMLInputElement>(null); // Bước 1

    const handleImageUpload = (imageData: string) => {
        console.log('Đã tải lên ảnh:');
    };

    const handleSearch = () => {
        const file = imageInputRef.current?.files?.[0]; // Bước 3

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                fetch('http://127.0.0.1:5000/search_fruits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image_data: base64String }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // navigate('/search', { state: { results: data["fruits"], searchQuery: "", queryTime: data["query_duration"] } });
                    })
                    .catch((error) => {
                        console.error('Error searching:', error);
                    });
            };
            reader.readAsDataURL(file);
        } else {
            console.error('No image uploaded');
        }
    };

    return (
        <div>
            <div>
                {/* <SearchImage /> */}
                {/* Bước 2: Áp dụng ref cho UploadImage nếu bạn muốn lấy file từ đây */}
                {/* <UploadImage onImageUpload={handleImageUpload} /> */}
                {/* Hoặc nếu bạn có input file trực tiếp ở đây, hãy áp dụng như sau: */}
                <input type="file" ref={imageInputRef} />
            </div>
            <SearchButton onClick={handleSearch} />
        </div>
    );
}

export default SearchImageContainer;
