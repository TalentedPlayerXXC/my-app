import { useState } from 'react'
import { MyInput3 } from "./MyInput"

function BiShiTi5() {
    const [val, setVal] = useState('')
    const [arr, setArr] = useState(
        [
            {
                "id": 1710038739577,
                "val": "123",
                "isCheck": false
            },
            {
                "id": 1710038742658,
                "val": "543",
                "isCheck": true
            },
            {
                "id": 1710038744876,
                "val": "fds",
                "isCheck": true
            },
            {
                "id": 1710038781443,
                "val": "12",
                "isCheck": true
            }
        ]
    )
    const [bol, setBol] = useState(false)
    const dataFormat = () => {
        // 1、将{"a": {"n1": 1, "n2": 3 },  "b": {"n1": 2, "n2": 4},  "c": { "n1": 3,"n2": 5}}）
        // 转换成{"n1": {"a": 1, "b": 2, "c": 3 }, "n2": { "a": 3, "b": 4, "c": 5}}
        const oldData = {
            "a": { "n1": 1, "n2": 3 },
            "b": { "n1": 2, "n2": 4 },
            "c": { "n1": 3, "n2": 5 }
        };
        const newData = {}
        // 双for in
        for (const key in oldData) {
            // console.log(key, 'key111');
            for (const children in oldData[key]) {
                //    console.log(children,' children22');
                // if (!newData[children]) newData[children] = {} //这是一行的 如果格式出现问题请直接按这个格式复原
                if (!newData[children]) newData[children] = {}
                // newData['n1']['a'] = oldData['a']['n1'] => {'n1': {a: }...} = 1
                newData[children][key] = oldData[key][children];
            }
        }
        // console.log(newData);


    }
    const getVal = (e) => {
        setVal(e?.target?.value)
    }
    const changeStatus = (e, idx) => {
        let bol = e?.target?.checked
        let newArr = arr
        newArr[idx].isCheck = bol
        setArr([...newArr])
    }
    const handleAdd = () => {
        // let newArr = arr
        if (!val.trim()) {
            setBol(true)
            return null
        } else {
            setBol(false)
            setArr([...arr, { id: Date.now(), val, isCheck: false }])
            setVal('')
        }
    }
    const handleDel = (id) => {
        let newArr = arr.filter(item => item?.id !== id)
        setArr([...newArr])
    }
    const delMore = () => {
        // let newArr = arr
        setArr([...arr.filter(item => item.isCheck !== true)])
    }
    return (
        <>
            {dataFormat()}
            <MyInput3 name='ceshi'>
                <input />
            </MyInput3>
            <input value={val} onChange={getVal} /> <button onClick={handleAdd}>add</button>
            <div>{bol ? '请输入内容' : null}</div>
            <ul>
                <button onClick={delMore}>删除选中</button>
                {arr && arr?.length > 0 && arr.map((item, key) => (
                    <li style={{ margin: 10 }} key={item?.id}>
                        <input type="checkbox" checked={item?.isCheck} onChange={(e) => changeStatus(e, key)} />
                        <span> 待办事项{key + 1}{'  '}{item?.val}</span>
                        <button onClick={() => handleDel(item?.id)}>del</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BiShiTi5