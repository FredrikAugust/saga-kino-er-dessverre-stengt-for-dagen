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

const BoxedParagraph = styled.p`
  padding: 0.5em 1em;
  border: 1px solid rgb(0, 122, 255);
  background: rgb(0, 122, 255);
  color: white;
  border-radius: 0.25em;
  display: inline-block;
`;

const Button = styled.button`
  &:not(:last-of-type) {
    margin-right: 0.5em;
  }
`;

const App: React.FC<State> = ({ counter }) => {
  const increment = () => action("INCREMENT");
  const incrementAsync = () => action("ASYNC_INCREMENT");
  const decrement = () => action("DECREMENT");
  const decrementAsync = () => action("ASYNC_DECREMENT");

  return (
    <Container>
      <Header>Redux Saga</Header>
      <BoxedParagraph>Counter is currently {counter}.</BoxedParagraph>
      <br />
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
      <br />
      <Button onClick={incrementAsync}>Increment [Async]</Button>
      <Button onClick={decrementAsync}>Decrement [Async]</Button>
    </Container>
  );
};

export default connect<State, {}, {}, State>(state => state)(App);
