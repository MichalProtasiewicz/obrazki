/* eslint-disable no-undef */
import React, { useState } from 'react';
import GlobalStyle from 'theme/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 7%;
  box-shadow: 1px 1px 5px grey;
  padding: 10px;
`;

const Input = styled.input`
  width: 50%;
`;

const PicturesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Item = styled.img`
  width: 30%;
  margin: 5px;
`;

const Button = styled.button`
  padding: 7px 12px;
  background: none;
  border: 2px solid;
`;

const Root = () => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const fetchImage = () => {
    fetch(
      `https://api.unsplash.com/search/photos?client_id=D-pP_IqrT8AVze205HZEdIdBGPDWdp2posnq6wf2t4M&query=${value}&orientation=squarish`,
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results);
      });
  };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SearchWrapper>
          <span>Search:</span>
          <Input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          <Button onClick={() => fetchImage()}>search</Button>
        </SearchWrapper>
        <PicturesWrapper>
          {results.map((item) => {
            return <Item key={item.id} src={item.urls.regular} />;
          })}
        </PicturesWrapper>
      </ThemeProvider>
    </>
  );
};

export default Root;
