import MenuList from "./MenuList";
import "./App.css";
// import Counter from "./Count";
// import useCountdown from "./useCountdown";
// import UseReducer from "./UseReducer";

import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  // const dom = useRef(null)
  return (
    <Provider store={store}>
      <div>
        {/* <input ref={dom} /> */}
        {/* <Button onClick={() => console.log(dom.current.value)}>get iptVal</Button> */}
        {/* <UseReducer />  */}
        <MenuList />
        {/* {console.log(dom)} */}
      </div>
    </Provider>
  );
}

export default App;
