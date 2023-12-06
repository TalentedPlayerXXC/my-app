import { useState } from "react";
import { MyInput1, MyInput2 } from "./MyInput";
import { MyFormItem } from "./MyInput";

function BishiTi() {
    const [val, setVal] = useState('111')
    return (
        <>
            <MyInput1 />
            <MyInput2 value={val} onChange={e => setVal(e?.target?.value)}/>
            <MyFormItem name="ceshi">
                <input />
            </MyFormItem>
        </>
    )
}

export default BishiTi