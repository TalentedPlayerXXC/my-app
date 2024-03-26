import { useState } from 'react'

// TODOList
function TODOList() {

    const [val, setVal] = useState('')
    const [bol, setBol] = useState(false)
    const [arr, setArr] = useState([])

    const changeVal = (e) => {
        setVal(e?.target?.value)
    }
    const handleAdd = () => {
        let newArr = arr
        if (!val.trim()) {
            setBol(true)

        } else {
            newArr.push({ id: Date.now(), value: val })
            setArr([...newArr])
            setVal('')
            setBol(false)
        }
    }
    const handleDel = (id) => {
        let newArr = arr
        newArr.filter(item => item.id !== id)
    }
    return (
        <>
            <input value={val} onChange={changeVal} /><button onClick={handleAdd} >add</button>
            <div>{bol ? '请输入' : null}</div>
            <ul>
                {arr.length > 0 && arr.map(item => (
                    <li key={item?.id}>{item?.vlaue}   <button onClick={() => handleDel(item?.id)} >del</button></li>
                ))}
            </ul>
        </>
    )
}

// 将[1,2,3,4,5] 各项+1，然后过滤出偶数
function numform() {
    const arr = [1, 2, 3, 4, 5]
    // let newArr = []
    arr.forEach(item => {
        newArr.push(item + 1)
    })

    let newArr = arr.reduce((cur, pre) => {
        cur.push(pre + 1)
        return cur
    }, [])

  
    return newArr.filter(item => item % 2 === 0) || []
}