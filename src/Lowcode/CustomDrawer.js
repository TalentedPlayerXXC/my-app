import { Fragment } from 'react'
import { Drawer, Form, Input, Radio, Checkbox } from 'antd'
const CustomCompontent = (props) => {
    const { TextArea } = Input
    const { type, item } = props
    return (
        <>
            {console.log(type, item, 'asdasda')}
            {
                type === 'input' && <Input />
            }
            {
                type === 'textArea' && <TextArea />
            }
            {
                type === 'radio' && (
                    <Radio.Group>
                        {
                            item?.options.length > 0 &&
                            item?.options.map(itm => (
                                <Radio key={itm.itemId} value={itm.value}>{itm.value}</Radio>
                            ))
                        }
                    </Radio.Group>
                )
            }
            {
                type === 'checkbox' && (
                    <Checkbox.Group>
                        {/* <Checkbox></Checkbox> */}
                        {
                            item?.options.length > 0 &&
                            item?.options.map(itm => (
                                <Checkbox key={itm.itemId} value={itm.value}>{itm.value}</Checkbox>
                            ))
                        }
                    </Checkbox.Group>
                )
            }
        </>
    )
}
function CustomDrawer(props) {
    const { Item } = Form
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };
    const { open, handleVisible = () => { }, state = {} } = props
    return (
        <Drawer open={open} onClose={handleVisible} width={900}>
            <Form {...formItemLayout} >
                {
                    state?.custom &&
                    state?.custom.length > 0 &&
                    state?.custom.map(item => (
                        <div key={item.id}>
                            {
                                item?.items &&
                                item?.items.length > 0 &&
                                item?.items.map(child => (
                                    <Item label={child.itemTitle} name={child.itemId} required={child.isRequired}>
                                        <CustomCompontent type={child?.type} item={child} />
                                    </Item>
                                ))
                            }
                        </div>
                    ))
                }
            </Form>
        </Drawer>
    )
}

export default CustomDrawer;