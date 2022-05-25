import React from "react";
import useCounterContract from "./useCounterContract";

const App = () => {
  const { count, increment } = useCounterContract();
  return (
    <>
      <h1>Balance: {count}</h1>
      <button onClick={increment}>Mint</button>
    </>
  );
};

export default App;
