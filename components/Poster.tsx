import React from "react";
import { makeImagePath } from "../utils";
import styled from "styled-components/native";

const PosterImage = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

interface IPosterProps {
  path?: string;
}

const Poster: React.FC<IPosterProps> = ({ path }) => {
  return (
    <PosterImage
      source={
        path !== null
          ? { uri: makeImagePath(path) }
          : require(`../poster-placeholder.png`)
      }
    />
  );
};

export default Poster;
