import { FlatList } from "react-native";
import React, { Children } from "react";
import styled from "styled-components/native";
import VMedia from "./VMedia";
import { Movie, TV } from "../api";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

interface HlistProps {
  title: string;
  data: Movie[] | TV[];
  loadMore: () => void;
}

const Hlist: React.FC<HlistProps> = ({ title, data, loadMore }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={HListSeparator}
        data={data}
        keyExtractor={(item: Movie | TV) => item.id + ""}
        renderItem={({ item }: { item: Movie | TV }) => (
          <VMedia
            posterPath={item.poster_path || ""}
            originalTitle={
              "original_title" in item
                ? item.original_title
                : item.original_name
            }
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default Hlist;
