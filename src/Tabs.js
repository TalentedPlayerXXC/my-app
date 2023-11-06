
import './tabs.css'
const Tabs = () => {
    return (
        <div className='tabs' style={{ marginTop: 20, marginBottom: 20 }}>
            <div style={{ display: 'flex', }}>
                <div className='tab1show'></div>
                <div className='tab2show'></div>
            </div>
            <div style={{ marginTop: 30 }}>
                <div className='tab1hide'>用电信息</div>
                <div className='tab2hide'>用水信息</div>
            </div>
        </div>
    )
}

export default Tabs