import { useReducer } from "react";
import { Button } from "antd";

function UseReducer() {
  const [state, dispatch] = useReducer((state = 1, action) => {
    const { name } = action;
    switch (name) {
      case "a":
        return state + 1;
      case "b":
        return state - 1;
      default:
        return state;
    }
  });
  return (
    <>
      {state}
      <Button onClick={() => dispatch({ name: "a" })}>add</Button>
      <Button onClick={() => dispatch({ name: "b" })}>add</Button>
    </>
  );
}
export default UseReducer;
