import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/strawsearch.png';
import { useNavigate } from 'react-router-dom';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 8px;
  background: #f8f8f8;
`;

const Logo = styled.img`
  height: 80px;
  cursor: pointer;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 690px;
  margin: 0 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid #dcdcdc;
  border-radius: 24px;
  &:focus {
    outline: none;
    border-color: #4d90fe;
  }
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 10px;
  padding: 20px;
`;
const ImageContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1 / 1; // Thiết lập tỉ lệ khung hình là 1:1 để hình ảnh vuông

  &:hover {
    box-shadow: 0px 0px 8px #ccc;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%; 
  object-fit: cover; 
`;

const SearchTimeText = styled.div`
  text-align: start;
  margin-top: 10px;
  margin-left: 20px;
  color: #777;
`;

const rootPath = "http://127.0.0.1:8080"

const SearchResults = () => {
  const location = useLocation();
  const { results, searchQuery, queryTime } = location.state as { results: any[], searchQuery: string, queryTime: number };

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <>
      <Header>
        <Logo src={logo} alt="StrawSearch" onClick={goHome} />
        <SearchInputWrapper>
          <SearchInput defaultValue={searchQuery} />
          {/* Có thể thêm nút tìm kiếm ở đây nếu muốn */}
        </SearchInputWrapper>
      </Header>
      <SearchTimeText>About {results.length} results in {queryTime} miliseconds</SearchTimeText>
      <ResultsContainer>
        {results.map((result, index) => (
          <ImageContainer key={index}>
            <Image src={rootPath + result.path} alt={result.name} />
          </ImageContainer>
        ))}
      </ResultsContainer>
    </>
  );
};

export default SearchResults;
