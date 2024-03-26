import React, { Suspense, lazy, useState, /*useMemo,*/useRef } from "react";
import { Route, Link, Routes, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
// import { getUrlParams } from './util.js'
// import MenuList from "./MenuList";
// import myContext from './redux/reducer'
// import CatchError from "./CatchError";
// import BiShi from "./BiShi.js";
import "./App.css";
import BishiTi from "./BishiTi/index.js";
// import BishiTi2 from "./BishiTI2/index.js";
import BiShiTi3 from "./BishiTi3/index.js";
import BiShiTi4 from "./BishiTi4/index.js";
import BiShiTi5 from "./BiShiTi5/index.js";
import Lowcode from "./Lowcode/index.js";
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
  const [searchParams,] = useSearchParams();
  const myInput = useRef(null)
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
  const [arr, setArr] = useState([
    { id: 1, name: 'aaa' },
    { id: 2, name: 'bbb' },
    { id: 3, name: 'ccc' },
    { id: 4, name: 'ddd' },
  ])
  const del = (id) => {
    console.log(id);
    let newArr = arr
    newArr.splice(id, 1)
    setArr([...newArr])
  }

  //  如果在memo中写个数字会怎么样 如果不写函数包裹会报错，如果有的话 就会返回这个数字
  // const memo1 = useMemo(() => 1, [])
  // {console.log(memo1, 'memo1')}
  const [state, setState] = useState({
    title: '',
    type: '',
    custom: [{
      repTit: '',
      compArr: [ //存放
        {
          comType: 'input',
          compArr: [''] // 存放下拉 单选的数据
        }
      ]
    }]
  })

  const focusTextInput = () => {
    // 使用 current 来访问 DOM 节点，并修改 input 的值
    console.log(myInput.current.value);
    setState(s => ({
      ...s,
      a: 888
    }))
  };

  // console.log(state, 'state');


  return (
    <div>
      <input ref={myInput} />
      <button onClick={focusTextInput}>Set Input Value</button>


      {arr.map((item, key) => (
        <div key={item?.id}>
          {item?.name} <span onClick={() => del(key)}>删除</span>
        </div>
      ))}
      {/* {time} */}
      <Button onClick={changeUrl}>更改地址栏参数</Button>
      <Button onClick={getUrlParams}>获取参数</Button>
      <div style={{ marginTop: 10 }}>
        <Link style={{ marginLeft: 10 }} to="/">Home</Link>
        <Link style={{ marginLeft: 10 }} to="/table-list">TableList</Link>
        <Link style={{ marginLeft: 10 }} to="/bishi">BiShi</Link>
        <Link style={{ marginLeft: 10 }} to="/bishi2">BiShi2</Link>
        <Link style={{ marginLeft: 10 }} to="/bishi3">BiShi3</Link>
        <Link style={{ marginLeft: 10 }} to="/bishi4">BiShi4</Link>
        <Link style={{ marginLeft: 10 }} to="/bishi5">BiShi5</Link>
        <Link style={{ marginLeft: 10 }} to="/lowcode">丐版低代码功能</Link>
      </div>
      <Suspense fallback={<p>Loading component...</p>}>
        <Routes>
          <Route path="/" exact element={<MenuList />} />
          <Route path="table-list" element={<TableList />} />
          <Route path="bishi" element={<BishiTi />} />
          <Route path="bishi3" element={<BiShiTi3 />} />
          <Route path="bishi4" element={<BiShiTi4 />} />
          <Route path="bishi5" element={<BiShiTi5 />} />
          <Route path="lowcode" element={<Lowcode />} />
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
