import { useState, useEffect, Children, cloneElement } from 'react'
function FormItem({ name, value = "", children }) {
    const [val, setVal] = useState(value || '')
    useEffect(() => {
        setVal(value)
    }, [value])
    //  实现一个FormItem 接收name FormItem可以放一个Input组件，放在FomItem下的Input组件可以不用显示传value/onchange, 
    // 同时Input的值会录入到FormItem里面 
    //     // exp: <FormItem name="ceshi">
    //     // <Input />
    //     // </FormItem> 
    //     function FormItem({name}) {}
    const renderChild = () => {
        return Children.map(children, (child, i) => {
            return cloneElement(child, {
                name,
                onChange: (e) => setVal(e.target.value)
            })
        }
        )
    }
    return (
        <div>
            {renderChild()}
            <p>
                {val || '--'}
            </p>
        </div>
    )
}
export default FormItem