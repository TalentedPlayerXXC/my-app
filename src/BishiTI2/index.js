import { useState } from "react"
import { MyInput1, MyInput2, MyInput3 } from "./MyInput"

function BishiTi2() {
    const [val, setVal] = useState('12')
    return (
        <>
            <MyInput1 />
            <MyInput2 value={val} onChange={e => setVal(e?.target?.value)} />
            <MyInput3>
                <input />
            </MyInput3>
        </>
    )
}

export default BishiTi2