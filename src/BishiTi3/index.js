import { useState } from "react"
import { MyFormItem, MyInput1, MyInput2 } from "./MyInput"

function BiShiTi3() {
    const [val, setVal] = useState('13123213')
    return (
        <>
            <MyInput1 />
            <MyInput2 value={val} onChange={(e) => setVal(e?.target?.value || '')} />
            <MyFormItem name='ceshi'>
                <input />
            </MyFormItem>
        </>
    )
}

export default BiShiTi3