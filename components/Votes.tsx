import React from "react";
import styled from "styled-components/native";

interface VotesProps {
  votes: number;
}

const Text = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const Votes: React.FC<VotesProps> = ({ votes }) => (
  <Text>
    {votes > 0
      ? `⭐️${Math.round((votes + Number.EPSILON) * 100) / 100}/10`
      : `Coming soon`}
  </Text>
);
export default Votes;
