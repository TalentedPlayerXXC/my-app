import React, { useRef, useState, Suspense, useEffect, lazy } from "react";
import { Route, Link, Routes, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
// import { getUrlParams } from './util.js'
// import MenuList from "./MenuList";
import myContext from './redux/reducer'
import CatchError from "./CatchError";
// import BiShi from "./BiShi.js";
import "./App.css";
import BishiTi from "./BishiTi/index.js";
import BishiTi2 from "./BishiTI2/index.js";
import BiShiTi3 from "./BishiTi3/index.js";
import BiShiTi4 from "./BishiTi4/index.js";
// import { getUrlParams } from "./util.js";
// import Counter from "./Count";
// import useCountdown from "./useCountdown";
// import UseReducer from "./UseReducer";

// import { Provider } from 'react-redux'
// import store from './redux/store'
// import TableList from './TableList.tsx'
const TableList = lazy(() => import('./TableList.tsx'))
const MenuList = lazy(() => import('./MenuList'))
function App(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [time, setTime] = useState(new Date().getTime())
  // const dom = useRef(null)
  const navigate = useNavigate()
  // useEffect(() => {
  //   setInterval(() => { setTime(new Date().getTime()) }, 1000)
  // }, [])
  // 父组件调用子组件的方法
  // const getRef = () => {
  //   dom?.current?.getMenuStatus(2)
  //   // 调用子组件num加一
  // }
  const changeUrl = () => {
    searchParams.append('a', 6)
    console.log(searchParams.toString());
    navigate('/table-list?' + searchParams.toString(), { replace: true });
  }
  const getUrlParams = () => {
    console.log(searchParams.toString());
  }
  return (
    <div>
      {/* {time} */}
      <Button onClick={changeUrl}>更改地址栏参数</Button>
      <Button onClick={getUrlParams}>获取参数</Button>
      <div>
        <Link to="/">Home</Link>
        <Link to="/table-list">TableList</Link>
        <Link to="/bishi">BiShi</Link>
        <Link to="/bishi2">BiShi2</Link>
        <Link to="/bishi3">BiShi3</Link>
        <Link to="/bishi4">BiShi4</Link>
      </div>
      <Suspense fallback={<p>Loading component...</p>}>
        <Routes>
          <Route path="/" exact element={<MenuList />} />
          <Route path="table-list" element={<TableList />} />
          <Route path="bishi" element={<BishiTi />} />
          <Route path="bishi3" element={<BiShiTi3 />} />
          <Route path="bishi4" element={<BiShiTi4 />} />
        </Routes>
      </Suspense>

      {/* <TableList /> */}
      {/* 父组件count: {count} */}
      {/* <Button onClick={() => dom?.current?.setNum((s) => s + 1)}>子组件num + 1</Button> */}
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
