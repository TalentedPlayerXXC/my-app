import { useState } from 'react';
import { Button, Input } from 'antd'
import { MyInput, MyInput1 } from './MyInput'
import FormItem from "./FormItem";
function BiShi() {
    const [val, setVal] = useState('1')
    return (
        <>
            <div>
                第三题:
                <FormItem name='ceshi'>
                    <Input style={{ width: 200 }} />
                </FormItem>
            </div>
            <div style={{ marginTop: 10 }}>
                第一题 ：<MyInput />
            </div>
            <div style={{ marginTop: 10 }}>
                第二题： <MyInput1 value={val} onChange={e => setVal(e)} />
            </div>
        </>
    )
}

export default BiShi