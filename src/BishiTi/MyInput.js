import { cloneElement, useState } from "react";
// 1.实现一个组件<Input>组件, 里面有两个标签 div、input，当用户在input框里面输入任意值，div就展示任意值
// exp: 用户输入 123， div中展示123



// 2.实现一个组件<Input>组件, 里面有两个标签 div、input，当用户在input框里面输入任意值，div就展示任意值,
// 同时为input组件实现 value和onChange 可传可不传，当用户输入任意值触发onchange， 当父组件传入value的时候，以父组件为准

// exp: <Input value={'1'} onChange={'xxx'}/>
// <Input />





// 3.实现一个FormItem 接收name FormItem可以放一个Input组件，放在FomItem下的Input组件可以不用显示传value/onchange, 同时Input的值会录入到FormItem里面 
// exp: <FormItem name="ceshi">
// <Input />
// </FormItem> 
// 第一题 
function MyInput1() {
    const [val, setVal] = useState('--')
    return (
        <>
            <input value={val} onChange={(e) => setVal(e.target?.value)} />
            <div>{val}</div>
        </>
    )
}
// 第二题
function MyInput2({ value = "", onChange = null }) {
    const [val, setVal] = useState(value)
    return (
        <>
            <input
                value={val}
                onChange={(e) => onChange ? onChange(e) : setVal(e.target.value)} />
            <div>{val}</div>
        </>
    )
}
// 第三题
function MyFormItem({ name = "", children }) {
    const [val, setVal] = useState('')
    const renderChild = () => {
        return cloneElement(children, {
            name,
            onChange: (e) => { setVal(e?.target?.value) },
        })
    }
    return (
        <>
            {renderChild()}
            <div>{val}</div>
        </>
    )
}

export { MyInput1, MyInput2, MyFormItem }