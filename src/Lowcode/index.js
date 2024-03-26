
import { useState, Fragment } from 'react'
import {
    Input,
    Form,
    Checkbox,
    Button,
    Cascader,
    Card,
    Row,
    Col,
    Select,
    Radio
} from 'antd'
import { CloseOutlined, PlusOutlined, ArrowUpOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import CustomDrawer from './CustomDrawer';
import './style.css'
const { Item } = Form

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};
function Lowcode() {
    const [form] = Form.useForm()
    const [customItems, setCustomItems] = useState([
        {
            id: `custom_${Date.now()}_0`,
            items: [
                {
                    itemId: `custom_${Date.now()}_0_${Date.now()}_0`,
                    type: 'radio',
                    itemTitle: '',
                    options: [
                        { id: `custom_${Date.now()}_0_${Date.now()}_0_radio_00` },
                        { id: `custom_${Date.now()}_0_${Date.now()}_0_radio_01` },
                    ],
                    isRequired: false
                },
                {
                    itemId: `custom_${Date.now()}_0_${Date.now()}_1`,
                    type: 'input',
                    itemTitle: '',
                    options: [
                        { id: `custom_${Date.now()}_0_${Date.now()}_1_radio_10` },
                        { id: `custom_${Date.now()}_0_${Date.now()}_1_radio_11` },
                    ],
                    isRequired: true
                }
            ],
            title: '测试模板1',
        },
    ])

    const [state, setState] = useState({})

    const [open, setOpen] = useState(false)
    const options = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hanzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake',
                        },
                    ],
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        },
                    ],
                },
            ],
        },
    ]
    const plainOptions = [
        { label: '服务端', value: 'server' }, { label: '前端', value: 'front' }];
    const handleVisible = () => {
        setOpen(!open)
    }

    const addCustomReport = () => {
        setCustomItems([...customItems, {
            id: `custom_${Date.now()}_${customItems.length}`,
            items: [],
            title: `自定义报告${customItems.length + 1}`,
        }])
    }
    const removeCustomReport = (id) => {
        setCustomItems(customItems.filter(item => item.id !== id))
    }

    const addCustomComponent = (id) => {
        let newArr = [...customItems]
        let filterArr = newArr.find(item => item.id === id).items
        newArr.find(item => item.id === id).items.push({
            itemId: `${id}_${Date.now()}_${filterArr.length}`,
            type: 'input',
            itemTitle: '测试文本框',
            options: [{ id: `${id}_${Date.now()}_${filterArr.length}_${Date.now()}_0_radio_00` }, { id: `${id}_${Date.now()}_${filterArr.length}_${Date.now()}_0_radio_01` }],
            isRequired: false

        })
        setCustomItems(newArr)

    }
    const removeCustomComponent = (key, childKey) => {
        let newArr = [...customItems]
        newArr[key].items.splice(childKey, 1)
        setCustomItems(newArr)
    }

    const changeTitle = (key, e) => {
        let newArr = [...customItems]
        newArr[key].title = e.target.value || `自定义报告${key + 1}`
        setCustomItems(newArr)
    }

    const changeCompContent = (key, childKey, itemName, val) => {
        let newArr = [...customItems]
        newArr[key].items[childKey][`${itemName}`] = val
        // console.log(newArr);
        setCustomItems(newArr)
    }

    const addOpition = (key, childKey, optKey) => {
        let newArr = [...customItems]
        newArr[key].items[childKey].options.push({ id: `custom_${Date.now()}_${key}_${Date.now()}_${childKey}_radio_${childKey}${optKey + 1}` },)
        setCustomItems(newArr)
    }
    const removeOpition = (key, childKey, optKey) => {
        let newArr = [...customItems]
        newArr[key].items[childKey].options.splice(optKey, 1)
        setCustomItems(newArr)
    }

    const changeOpition = (key, childKey, optKey, value) => {
        let newArr = [...customItems]
        newArr[key].items[childKey].options[optKey].value = value
    }

    const handleToMove = (key, childKey, direction) => {
        console.log(key, childKey, direction, 'item');
        let newArr = [...customItems]
        let oldItem = newArr[key].items[childKey]
        // console.log(newArr[key].items[childKey - 1], 'newArr[key].items[childKey - 1]');
        let newItem = direction === 'up' ? newArr[key].items[childKey - 1] : newArr[key].items[childKey + 1]
        newArr[key].items.splice(childKey, 1)
        if (direction === 'up') {
            newArr[key].items.splice(childKey - 1, 1, oldItem, newItem)
        }
        if (direction === "down") {
            newArr[key].items.splice(childKey, 1, newItem, oldItem)
        }
        setCustomItems(newArr)
    }
    const onFinish = () => {
        form.validateFields().then(value =>
            // console.log(value, customItems, 'value')
            setState({ ...value, custom: customItems })
        )
            .catch(err => console.log(err))
            .finally(() => {
                console.log('aaa');
            })
    }
    return (
        <div className='main'>
            {console.log(state)}
            <Form
                onFinish={onFinish}
                form={form}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                <Item
                    name="moduleName"
                    label="模板名称"
                    rules={[{
                        required: true,
                        message: '请输入模板名称!'
                    }]}
                >
                    <Input style={{ width: 360 }} placeholder='请输入模板名称' />
                </Item>
                <Item
                    name="modelType"
                    label="应用类型"
                    rules={[{
                        required: true,
                        message: '请勾选一个类型!'
                    }]}
                >
                    <Checkbox.Group options={plainOptions} />
                </Item>
                <Item
                    name="businessLine"
                    label="业务线"
                    rules={[
                        {
                            required: true,
                            message: '请选择一个业务线！'
                        }
                    ]}
                >
                    <Cascader style={{ width: 360 }} options={options} changeOnSelect placeholder="请选择一个业务线" />
                </Item>

                <Row style={{ marginTop: 20 }}>
                    <Col offset={6} span={7}> 自定义模板:</Col>
                </Row>
                <Row style={{ marginTop: 20, marginBottom: 20, width: '100%' }}>
                    <Col offset={3} span={18} style={{ width: '100%' }}>
                        <div className='box'>
                            {customItems.length > 0 && customItems.map((item, key) => (
                                <Fragment key={item?.id}>
                                    <Card
                                        title={`${customItems[key].title || `自定义问题录入报告${key + 1}`}`}
                                        className='customBox'
                                        extra={<CloseOutlined onClick={() => removeCustomReport(item.id)} />}
                                    >
                                        <Item label={`自定义问题录入报告名称`} {...layout}>
                                            <Input value={item.title} onChange={(e) => changeTitle(key, e)} />
                                        </Item>
                                        {
                                            item?.items &&
                                            item.items.length > 0 &&
                                            item.items.map((child, childKey) => (
                                                <div style={{ display: 'flex' }} key={child?.itemId}>
                                                    <div className='customComponent' style={{ width: '290px' }}>
                                                        <span className='comptitle'>组件名称: </span>
                                                        <Input
                                                            style={{ width: 200, marginLeft: 5, height: 30 }}
                                                            value={child?.itemTitle}
                                                            onChange={(e) => changeCompContent(key, childKey, 'itemTitle', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='customComponent' style={{ flex: 1, flexDirection: 'column' }}>
                                                        <div>
                                                            <span className='comptitle'>组件类型: </span>
                                                            <Select
                                                                allowClear
                                                                value={child?.type}
                                                                onChange={e => changeCompContent(key, childKey, 'type', e)}
                                                                style={{ width: 240 }}
                                                                options={[
                                                                    { value: 'input', label: 'input输入框(推荐短文本)' },
                                                                    { value: 'textArea', label: 'textArea文本域(推荐长文本)' },
                                                                    { value: 'radio', label: 'radio单选框' },
                                                                    { value: 'checkbox', label: 'checkbox多选框' },
                                                                    { label: '更多组件添加中', disabled: true },
                                                                ]}
                                                            />
                                                            {
                                                                (child?.type === 'radio' || child?.type === 'checkbox') ?
                                                                    <Col offset={4} style={{ display: 'flex', flexDirection: 'column' }}>
                                                                        <>
                                                                            {
                                                                                child.options.length > 0 &&
                                                                                child.options.map((opt, optKey) => (
                                                                                    <div key={opt.id}>
                                                                                        <Input style={{ width: 200, marginLeft: '8px', marginTop: '10px' }} value={opt.value} onChange={(e) => changeOpition(key, childKey, optKey, e.target.value)} />
                                                                                        {
                                                                                            child.options.length - 1 === optKey &&
                                                                                            <PlusCircleOutlined style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => addOpition(key, childKey, optKey)} />
                                                                                        }
                                                                                        {
                                                                                            optKey >= 2 &&
                                                                                            <>
                                                                                                <MinusCircleOutlined style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => removeOpition(key, childKey, optKey)} />
                                                                                            </>
                                                                                        }
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </>
                                                                    </Col> :
                                                                    null
                                                            }
                                                        </div>

                                                    </div>
                                                    <div className='customComponent' style={{ width: '200px', alignItems: 'center', height: 30 }}>
                                                        <span className='comptitle'>是否必选: </span>
                                                        <Radio.Group
                                                            value={child.isRequired}
                                                            onChange={(e) => changeCompContent(key, childKey, 'isRequired', e.target.value)}
                                                        >
                                                            <Radio value={true}>是</Radio>
                                                            <Radio value={false}>否</Radio>
                                                        </Radio.Group>
                                                    </div>
                                                    <div className='customComponent' style={{ width: 150, height: 30 }} >
                                                        {
                                                            childKey > 0 &&
                                                            <ArrowUpOutlined style={{ cursor: "pointer", marginLeft: 10, }} onClick={() => handleToMove(key, childKey, 'up')} />
                                                        }
                                                        {
                                                            childKey !== item.items.length - 1 &&
                                                            <ArrowUpOutlined style={{ rotate: '180deg', marginLeft: 10, cursor: "pointer" }} onClick={() => handleToMove(key, childKey, 'down')} />
                                                        }
                                                        <MinusCircleOutlined style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => removeCustomComponent(key, childKey)} />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <Item
                                            wrapperCol={{
                                                offset: 3,
                                                span: 18,
                                            }}
                                        >
                                            <Button type="dashed" block style={{ width: '100%' }} onClick={() => addCustomComponent(item.id)} >
                                                <PlusOutlined /> 添加问题项
                                            </Button>
                                        </Item>
                                    </Card>
                                    {
                                        key === customItems.length - 1 &&
                                        <Button type="dashed" block style={{ width: '70%' }} onClick={addCustomReport} >
                                            <PlusOutlined /> 添加报告
                                        </Button>
                                    }
                                </Fragment>
                            ))}
                            {customItems.length === 0 &&
                                <Button type="dashed" block style={{ width: '70%' }} onClick={() => addCustomReport(0)} >
                                    <PlusOutlined /> 添加报告
                                </Button>
                            }
                        </div>
                        <Item>  {/*  wrapperCol={{ offset: 8, span: 16 }} */}
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                            <Button style={{ marginLeft: 15 }} onClick={handleVisible}>
                                预览
                            </Button>
                        </Item>
                    </Col>
                </Row>
            </Form>
            <CustomDrawer open={open} handleVisible={handleVisible} state={state} />
        </div>
    )
}

export default Lowcode