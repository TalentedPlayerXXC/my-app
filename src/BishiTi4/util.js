import { useState, useEffect } from 'react'
import "./styles.css";
// 时间过滤
function timeFormat(time) {
    if (time) {
        let h = Math.floor(time / 3600)
        let m = Math.floor(time / 60) % 60
        let s = time % 60
        if (h === 0) {
            return { m, s }
        }
        if (h === 0 && m === 0) {
            return { s }
        }
        return { h, m, s }
    }

}
// 时间格式化
function timeF(time, ss = 0) {
    time -= ss
    if (time > 0) {
        return time
    } else {
        return 0
    }
}

// 日期格式化
const formattedDate = (date) => {
    const newDate = new Date(date)
    // const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    const hours = newDate.getHours()
    const minutes = newDate.getMinutes()
    return `${month}.${day} ${hours || '00'}:${minutes || '00'}`
}

// 倒计时组件
const TimeoutComp = (props) => {
    const [time, setTime] = useState('')
    useEffect(() => {
        setTime(() => props?.fn)
        let timer = setInterval(() => {
            setTime((s) => timeF(s, 1))
        }, 1000)
        return () => { clearInterval(timer) }
    }, [props?.fn])

    return (
        <div className='timeout'>
            <span>
                {
                    timeFormat(time)?.h > 0 ? <>{timeFormat(time)?.h}</> : 0
                }
            </span>
            {' : '}
            <span>
                {
                    timeFormat(time)?.m > 0 ? <>{timeFormat(time)?.m}</> : 0
                }
            </span>
            {' : '}
            <span>{timeFormat(time)?.s > 0 ? timeFormat(time)?.s : 0}</span>
        </div>
    )
}

export {
    timeFormat,
    TimeoutComp,
    timeF,
    formattedDate,
}