import React from 'react';
import styled from 'styled-components';

interface SearchButtonProps {
    onClick: () => void;
}

// const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
//     return (
//         <button onClick={onClick}>Search</button>
//     );
// }

// export default SearchButton;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; // Căn giữa nút
  margin-top: 20px; // Khoảng cách từ thanh tìm kiếm
`;

const Button = styled.button`
  background-color: #ff8787;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  max-width: 200px; // Giới hạn chiều ngang tối đa của nút
  width: 100%; // Đảm bảo nút mở rộng tối đa trong wrapper
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff6b6b;
  }
`;

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
    return (
        <ButtonWrapper>
            <Button type="submit" onClick={onClick}>Tìm Kiếm</Button>
        </ButtonWrapper>
    );
};

export default SearchButton;
