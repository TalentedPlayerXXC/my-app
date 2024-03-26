import { cloneElement, useState } from "react"

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

export { MyInput3 }