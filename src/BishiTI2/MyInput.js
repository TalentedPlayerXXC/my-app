import { cloneElement, useEffect, useState } from "react"

function MyInput1() {
    const [val, setVal] = useState('')
    return (
        <>
            <input value={val} onChange={e => setVal(e.target?.value || '')} />
            <div>{val}</div>
        </>
    )
}

function MyInput2({ value = "", onChange = null }) {
    const [val, setVal] = useState(value)
    useEffect(() => {
        setVal(value)
    }, [value])
    return (
        <>
            <input value={val} onChange={(e) => onChange ? onChange(e) : setVal(e?.target?.value || '')} />
            <div>{val}</div>
        </>
    )
}

function MyInput3({ name, children }) {
    const [val, setVal] = useState('')
    const renderChild = () => {
        return cloneElement(children, {
            name,
            onChange: e => setVal(e?.target?.value || '')
        })
    }
    return (
        <>
            {renderChild()}
            <div>{val}</div>
        </>
    )
}

export { MyInput1, MyInput2, MyInput3 }