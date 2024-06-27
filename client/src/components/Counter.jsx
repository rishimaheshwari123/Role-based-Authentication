import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../redux/counterSlice";
const Counter = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.counter);
  return (
    <div>
      <button onClick={() => dispatch(increment(value))}>Increment</button>
      {value}
      <button onClick={() => dispatch(decrement(value))}>Decrement</button>
    </div>
  );
};

export default Counter;
