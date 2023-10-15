import { useRef, useState } from "react";
import { Button } from 'antd'
import MenuList from "./MenuList";
import "./App.css";
// import Counter from "./Count";
// import useCountdown from "./useCountdown";
// import UseReducer from "./UseReducer";

import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  const [count, setCount] = useState(0)
  const dom = useRef(null)
  // 父组件调用子组件的方法
  const getRef = () => {
    dom?.current?.getMenuStatus(2)
    // 调用子组件num加一
    
  }
  return (
    // <Provider store={store}>
    //   <div>
    //     {/* <input ref={dom} /> */}
    //     {/* <Button onClick={() => console.log(dom.current.value)}>get iptVal</Button> */}
    //     {/* <UseReducer />  */}
    //     <MenuList />
    //     {/* {console.log(dom)} */}
    //   </div>
    // </Provider>
    <div onClick={getRef}>
      父组件count： {count}
      <Button onClick={() => dom?.current?.setNum((s) => s + 1)}>子组件num + 1</Button>
      {/* <UseReducer />  */}
      <MenuList ref={dom} setCount={setCount} />
      {/* {console.log(dom)} */}
    </div>
  );
}

export default App;
