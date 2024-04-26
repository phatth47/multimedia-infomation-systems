import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchButton from './SearchButton';

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;
  width: 100%; 
  padding: 20px; 
  width: 100%; 
  max-width: 640px; 
`;

const Input = styled.input`
  width: 100%; // Đảm bảo input mở rộng tối đa chiều rộng của container
  padding: 10px 20px; // Thêm padding cho thoải mái khi nhập
  font-size: 16px; // Đặt kích thước font phù hợp
  border: 1px solid #dcdcdc; // Viền xung quanh input
  border-radius: 24px; // Làm tròn góc
  &:focus {
    outline: none; // Loại bỏ đường viền mặc định khi input được focus
    box-shadow: 0 0 8px #dcdcdc; // Thêm bóng khi focus
  }
`;


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`http://127.0.0.1:5000/search_fruits?input_text=${searchQuery}`);
    const data = await response.json();

    navigate('/search', { state: { results: data["fruits"], searchQuery: searchQuery, queryTime: data["query_duration"] } });
  };

  return (
    // <InputWrapper>


    // </InputWrapper>
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSearch(e)}>
      <Input
        type="text"
        placeholder="Search Straw or type a fruit name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* <SearchButton /> */}
    </form>
  );
};

export default SearchBar;