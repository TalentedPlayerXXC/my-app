import { useEffect, useState } from "react";
import "./styles.css";
import { TimeoutComp, formattedDate, timeF } from "./util";
import axios from "axios";
function BiShiTi4() {
    const [state, setState] = useState(11543)
    const [platform, ] = useState(window.navigator?.userAgent.toLowerCase()?.includes('windows') || false)
    useEffect(() => {
        axios.get('https://systemjs.1688.com/krump/schema/1352.json')
            .then(res => {
                if (res && res?.data?.list) {
                    setState(res?.data?.list || [])
                }
            })
            .catch(err => { console.log(err, '服务器出小差了～'); })
    }, [])
    return (
        <div className={`app1 ${platform ? 'window-scroll' : ''}`}>
            {
                state && state.length > 0 &&
                state.map((item, idx) => (
                    // platform ? styles['window-scroll'] : ''
                    <div className='card' key={idx} >
                        <div className="place">{item?.money || '--'}<span style={{ fontSize: '14px' }}>{' '}元</span></div>
                        <div className="context">
                            <div className="title">{item?.title || '--'}</div>
                            <div className="desc">{item?.description || '--'}</div>
                            <div className="date">
                                {
                                    item?.restTime ?
                                        <>
                                            <span>据结束 </span>
                                            <TimeoutComp fn={timeF(item?.restTime, 1)} />
                                        </>
                                        :
                                        <>有效期: {formattedDate(item?.time[0])}-{formattedDate(item?.time[1])}</>
                                }
                            </div>
                        </div>
                        <div className="status" style={{ cursor: item?.status === '已过期' ? 'not-allowed' : 'pointer' }}>{item?.status || '--'}</div>
                    </div>
                ))
            }
        </div>
    )
}
export default BiShiTi4