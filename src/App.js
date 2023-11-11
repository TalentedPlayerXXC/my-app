import React, { useRef, useState, Suspense, useEffect, lazy } from "react";
import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";
import { Button, Input } from 'antd'
import MenuList from "./MenuList";
import myContext from './redux/reducer'
import CatchError from "./CatchError";
import BiShi from "./BiShi.js";
import "./App.css";
// import Counter from "./Count";
// import useCountdown from "./useCountdown";
// import UseReducer from "./UseReducer";

// import { Provider } from 'react-redux'
// import store from './redux/store'
// import TableList from './TableList.tsx'
const TableList = lazy(() => import('./TableList.tsx'))
function App() {
  const [count, setCount] = useState(0)
  const [val, setVal] = useState('1')
  const [loading, setLoading] = useState('')
  const dom = useRef(null)
  // 父组件调用子组件的方法
  // const getRef = () => {
  //   dom?.current?.getMenuStatus(2)
  //   // 调用子组件num加一
  // }
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/table-list">TableList</Link>
        <Link to="/bishi">BiShi</Link>
      </div>
      <Suspense fallback={<p>Loading component...</p>}>
        <Routes>
          <Route path="/" exact element={<MenuList />} />
          <Route path="table-list" element={<TableList />} />
          <Route path="bishi" element={<BiShi />} />
        </Routes>
      </Suspense>

      {/* <TableList /> */}
      {/* 父组件count: {count}
      <Button onClick={() => dom?.current?.setNum((s) => s + 1)}>子组件num + 1</Button> */}
      {/* <UseReducer />  */}
      {/* <myContext.Provider value={{
        count, setCount
      }}>
        <MenuList ref={dom} setCount={setCount} />
        使用错误捕获组件包裹
        <CatchError>
          <TableList />
        </CatchError>
      </myContext.Provider> */}
      {/* {console.log(dom)} */}
      {/* <Button onClick={() => console.log(dom.current.value)}>get iptVal</Button> */}
    </div>
  );
}

export default App;
