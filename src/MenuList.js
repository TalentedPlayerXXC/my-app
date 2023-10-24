import React, { useState, useImperativeHandle, forwardRef, useContext } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import myContext from './redux/reducer';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('质量策略', 'celue', <MailOutlined />, [
    getItem('批量配置', 'peizhi'),
    getItem('单应用配置', 'yingyong', null,
      [
        getItem('流水线', 'kshuixian', null, [
          getItem('linke', 'llinke'),
          getItem('linke+', 'llinkplus'),
          getItem('coludeIde', 'lcoludeIde'),
        ]
        ),
        getItem('卡点', 'kadian', null, [
          getItem('linke', 'klinke'),
          getItem('linke+', 'klinkplus'),
          getItem('coludeIde', 'kcoludeIde'),
          getItem('雨燕', 'yuyan'),
        ])
      ]
    ),
  ]),
  getItem('风险评估', 'risk', <AppstoreOutlined />, [
    getItem('迭代报告', 'itealreport', null, [getItem('服务端', 'server'), getItem('前端', 'front')]),
    getItem('发布报告', 'fabu', null, [getItem('服务端', 'fserver')]),
    getItem('报告配置', 'baogaopeizhi', null, [getItem('模版配置', 'moban'), getItem('模块配置', 'mokuai')]),
  ]),
  getItem('问题录入', 'problem', <AppstoreOutlined />, [
    getItem('服务端/前端', 'zonghe', null, [getItem('数据大盘', 'zonghedapan')]),
    getItem('客户端', 'client', null, [getItem('问题录入', 'wentiluru'), getItem('数据大盘', 'shujudapan')]),
    getItem('配置管理', 'peizhiguanli', null, [
      getItem('业务线配置', 'business'),
      getItem('问题标签配置', 'tag'),
      getItem('模版权限配置', 'quanxian'),
      getItem('问题原因配置', 'wentiyuanyin'),
      getItem('问题引入配置', 'wentiyinru'),
      getItem('击穿环节配置', 'jichuanhuanjie'),
      getItem('自定义模版配置', 'zidingyimoban'),
    ]),
  ]),
];
const MenuList = forwardRef((props, ref) => {
  // console.log(props);
  const val = useContext(myContext)
  const { setCount } = props
  const [collapsed,] = useState(false);
  const [num, setNum] = useState(0)
  const getMenuStatus = (a) => {
    console.log(a);
  }
  useImperativeHandle(ref, () => {
    return {
      getMenuStatus,
      setNum
    }
  })
  return (
    <div
      style={{
        width: 256,
        height: 700,
        overflowY: 'auto'
      }}
    >
      {console.log(val, '跨组件通讯')}
      <div>
        这是祖先组件的num: {val?.count} <Button onClick={() => val?.setCount(s => s + 1)}>点击这里修改祖先组件的值</Button>
      </div>
      <Button onClick={() => setCount((s) => s + 1)}>调用父组件count + 1</Button>
      子组件num：{num}
      <Menu
        // defaultSelectedKeys={['1']}
        // onClick={getMenuStatus}
        defaultOpenKeys={['risk']}
        mode="inline"
        // theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
})
class Demo extends React.Component { }
console.log(MenuList.prototype, '函数组件',Demo.prototype, '类组件');
export default MenuList;