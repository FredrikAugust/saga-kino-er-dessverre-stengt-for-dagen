import React from "react";

import styled from "styled-components";
import { connect } from "react-redux";
import { State, action } from "./store";

const Header = styled.h1`
  font-weight: 300;
`;

const Container = styled.div`
  margin: auto;
  width: 60vw;
`;

const Button = styled.button`
  &:not(:last-of-type) {
    margin-right: 0.5em;
  }
`;

const App: React.FC<State> = ({ counter, news }) => {
  const increment = () => action("INCREMENT");
  const incrementAsync = () => action("ASYNC_INCREMENT");
  const decrement = () => action("DECREMENT");
  const decrementAsync = () => action("ASYNC_DECREMENT");
  const fetchNews = () => action("FETCH_NEWS", { id: counter });

  return (
    <Container>
      <Header>Redux Saga</Header>
      <p>Current value is {counter}.</p>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
      <Button onClick={incrementAsync}>Increment [Async]</Button>
      <Button onClick={decrementAsync}>Decrement [Async]</Button>
      <Button onClick={fetchNews}>Fetch News [Async]</Button>
      <hr />
      <p>We have fetched {news.length} news articles.</p>
    </Container>
  );
};

export default connect<State, {}, {}, State>(state => state)(App);
