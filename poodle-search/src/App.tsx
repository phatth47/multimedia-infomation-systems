import React from 'react';
import SearchBar from './components/SearchBar';
import StrawSearchLogo from './components/StrawSearchLogo';
import styled from 'styled-components';
import SearchButton from './components/SearchButton';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchResult from './components/SearchResult';
import SearchImageContainer from './components/SearchImage/SearchImageContainer';

const SearchContainer = styled.div`
  width: 80%; 
  max-width: 640px; 
  margin: auto; 
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  transform: translateY(-100px);
`;


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <CenteredContainer>
            <SearchContainer>
              <StrawSearchLogo />
              {/* <SearchBar />
              <SearchButton /> */}
              <SearchImageContainer />
            </SearchContainer>
          </CenteredContainer>
        } />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </Router>
  );
}

export default App;
