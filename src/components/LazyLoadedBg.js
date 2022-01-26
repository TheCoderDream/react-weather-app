import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const useProgressiveImage = urls => {
  const [sourceLoaded, setSourceLoaded] = useState(false);
  const [currentSource, setCurrentSource] = useState(urls?.small);

  useEffect(() => {
    setCurrentSource(urls?.small);
    setSourceLoaded(false);
    const img = new Image();
    img.src = urls?.full;
    img.onload = () => {
      setSourceLoaded(true);
      setCurrentSource(urls?.full);
    }
  }, [urls]);

  return {
    sourceLoaded,
    currentSource
  }
}

const BackgroundImageDivStyled = styled.div`
  margin: 0 20px;
  
  ::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: url('${({imgUrl}) => imgUrl || ''}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(${({loaded}) => loaded ? '2px' : '6px'}) brightness(0.7);
    transform: scale(1.1);
    transition: filter 300ms ease-in;
    opacity: ${({loaded}) => loaded ? 1 : 0.5};
  }
`;


export const BackgroundImageDiv = (props) => {
  const {currentSource, sourceLoaded} = useProgressiveImage(props.imgUrls);
  console.log(sourceLoaded, currentSource);

  return (
    <BackgroundImageDivStyled {...props} imgUrl={currentSource} loaded={sourceLoaded} >{props.children}</BackgroundImageDivStyled>
  )
}

