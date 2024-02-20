import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import { makeImagePath } from "../utils";
import Poster from "./Poster";
import Votes from "./Votes";

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8);"};
  margin-top: 10px;
`;

interface ISlideProps {
  backdropPath: string;
  posterPath: string;
  voteAverage: number;
  originalTitle: string;
  overview: string;
}

const Slide: React.FC<ISlideProps> = ({
  backdropPath,
  posterPath,
  voteAverage,
  originalTitle,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImagePath(backdropPath) }}
      />

      <BlurView
        intensity={80}
        style={StyleSheet.absoluteFill}
        tint={isDark ? "dark" : "light"}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            <Votes votes={voteAverage} />

            <Overview isDark={isDark}>{overview.slice(0, 80)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
