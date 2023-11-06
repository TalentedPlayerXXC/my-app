import React, { useRef, useState, Suspense } from "react";
import { Button, Input } from 'antd'
import MenuList from "./MenuList";
import myContext from './redux/reducer'
import Tabs from "./Tabs";
import CatchError from "./CatchError";
import "./App.css";
// import Counter from "./Count";
// import useCountdown from "./useCountdown";
// import UseReducer from "./UseReducer";

// import { Provider } from 'react-redux'
// import store from './redux/store'
import TableList from './TableList.tsx'
import { MyInput, MyInput1 } from './MyInput'
import FormItem from "./FormItem";
function App() {
  const [count, setCount] = useState(0)
  const [val, setVal] = useState('1')
  const dom = useRef(null)
  // 父组件调用子组件的方法
  // const getRef = () => {
  //   dom?.current?.getMenuStatus(2)
  //   // 调用子组件num加一
  // }
  return (
    <div>
      <Tabs />
      <Suspense fallback={<>Loading......</>}>
        <div>
          第三题:
          <FormItem name='ceshi'>
            <Input style={{ width: 200 }} />
          </FormItem>
        </div>
        <div style={{ marginTop: 10 }}>
          第一题 ：<MyInput />
        </div>
        <div style={{ marginTop: 10 }}>
          第二题： <MyInput1 value={val} onChange={e => setVal(e)} />
        </div>
      </Suspense>

      {/* 父组件count: {count}
      <Button onClick={() => dom?.current?.setNum((s) => s + 1)}>子组件num + 1</Button> */}
      {/* <UseReducer />  */}
      <myContext.Provider value={{
        count, setCount
      }}>
        <MenuList ref={dom} setCount={setCount} />
        {/* 使用错误捕获组件包裹 */}
        <CatchError>
          <TableList />
        </CatchError>
      </myContext.Provider>
      {/* {console.log(dom)} */}
      <Button onClick={() => console.log(dom.current.value)}>get iptVal</Button>
    </div>
  );
}

export default App;
