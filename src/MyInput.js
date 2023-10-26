import { useEffect, useState } from "react"
// 第一题
function MyInput() {
    const [val, setVal] = useState('')
    // / 实现一个组件<Input>组件, 里面有两个标签 div、input，当用户在input框里面输入任意值，div就展示任意值
    // // exp: 用户输入 123， div中展示123

    // function Input() {

    // return <>
    // <input />
    // <div></div>
    // <>
    // }
    return (
        <>
            <input onChange={e => setVal(e.target?.value)} value={val} />
            <div>{val || '--'}</div>
        </>
    )
}
// 第二题
function MyInput1(props) {
    //     // 实现一个组件<Input>组件, 里面有两个标签 div、input，当用户在input框里面输入任意值，div就展示任意值,
    //     // 同时为input组件实现 value和onChange 可传可不传，当用户输入任意值触发onchange， 当父组件传入value的时候，以父组件为准

    //     // exp: <Input value={'1'} onChange={'xxx'}/>
    //     // <Input />
    const { value = "", onChange = null } = props
    const [val, setVal] = useState(value || '')
    useEffect(() => {
        setVal(value)
    }, [value])
    return (
        <>
            <input onChange={e => onChange ? onChange(e.target?.value) : setVal(e.target?.value)} value={val} />
            <div>{val || '--'}</div>
        </>
    )
}








export { MyInput, MyInput1 };