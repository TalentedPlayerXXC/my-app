import React, { memo, useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Popconfirm,
  message,
} from "antd";
const options = [
  {
    value: "small",
  },
  {
    value: "medium",
  },
  {
    value: "warn",
  },
];
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
function TableList(): any {
  const [form] = Form.useForm();
  const [state, setState]: any = useState({
    isModalOpen: false,
    title: "create",
    editObj: {},
    searchName: "",
    searchDesc: "",
    isFilter: false,
    dataSource: [
      {
        key: "1",
        name: "胡彦斌",
        tags: ["small", "medium"],
        desc: "西湖区湖底公园1号",
      },
      {
        key: "2",
        name: "胡彦祖",
        tags: ["small", "medium", "warn"],
        desc: "西湖区湖底公园2号",
      },
    ],
    filterDate: [],
  });

  useEffect(() => {
    form.setFieldsValue({
      name: state.editObj?.name || undefined,
      desc: state.editObj?.desc || undefined,
      tags: state.editObj?.tags || undefined,
    });
  }, [state?.editObj, form]);
  const handleSearch = () => {
    if (state.searchDesc || state.searchName) {
      setState((s: any) => ({
        ...s,
        isFilter: true,
      }));
    } else {
      setState((s: any) => ({
        ...s,
        isFilter: false,
      }));
    }
  };
  const renderTag = (type: string) => {
    switch (type) {
      case "small":
        return <Tag color="green">small</Tag>;
      case "medium":
        return <Tag color="blue">medium</Tag>;
      case "warn":
        return <Tag color="red">warn</Tag>;
      default:
        return '--'
    }
  };
  const renderTagColor = (type: string) => {
    switch (type) {
      case "small":
        return "green";
      case "medium":
        return "blue";
      case "warn":
        return "red";

      default:
        break;
    }
  };
  // 数据删除
  const confirm = (id: number) => {
    const idx = state?.dataSource.findIndex((item: any) => item?.id === id);
    let arr = state?.dataSource;
    if (idx >= 0) {
      arr.splice(idx, 1);
      setState((s: any) => ({
        ...s,
        dataSource: arr,
      }));
      message.success("数据已删除");
    }
  };
  // 处理数据
  const getTableData = (data: any) => {
    const idx = state?.dataSource.findIndex(
      (item: any) => item?.id === data?.id
    );
    let arr = state?.dataSource;
    if (idx >= 0) {
      arr.splice(idx, 1, data);
      setState((s: any) => ({
        ...s,
        dataSource: arr,
      }));
    } else {
      setState((s: any) => ({
        ...s,
        dataSource: [data, ...state?.dataSource],
      }));
    }
    setState((s: any) => ({
      ...s,
      isModalOpen: false,
    }));
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((res) => {
        getTableData({
          ...res,
          id: state?.title === "edit" ? state.editObj?.id : Date.now(),
        });
        console.log(res, "res");
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleCancel = () => {
    setState((s: any) => ({
      ...s,
      isModalOpen: false,
      title: "create",
    }));
    form.resetFields();
  };
  const showModal = (title: string, obj: any) => {
    setState((s: any) => ({
      ...s,
      isModalOpen: true,
      title,
      editObj: obj || {},
    }));
  };
  const columns = [
    {
      id: 1,
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      id: 2,
      title: "描述",
      dataIndex: "desc",
      key: "desc",
    },
    {
      id: 3,
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (arr: any, record: any) => (
        <>
          {arr &&
            arr.length > 0 &&
            arr.map((item: any, idx: any) => (
              <span key={idx}>{renderTag(item)}</span>
            ))}
        </>
      ),
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any) => (
        <>
          <span
            style={{ color: "#1677ff", cursor: 'pointer' }}
            onClick={() => showModal("edit", record)}

          >
            编辑
          </span>
          <Popconfirm
            title=""
            description="确认删除吗？"
            onConfirm={() => this.confirm(record?.id)}
            // onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <span style={{ color: "#1677ff", cursor: 'pointer', marginLeft: "5px" }}>删除</span>
          </Popconfirm>
        </>
      ),
    },
  ];
  const renderTitle = () => {
    let title = "新建";
    // let title = '编辑'
    return title;
  };
  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={renderTagColor(value)}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };
  const searchName = (e: any) => {
    let value = e.target.value;
    let arr = state.dataSource;

    let newArr = arr
      .filter((item: any) => item.name.includes(value))
      .filter((item: any) => item.desc.includes(state.searchDesc));
    console.log(newArr, "newArr");
    setState((s: any) => ({
      ...s,
      filterDate: newArr,
      searchName: value,
    }));
  };
  const searchDesc = (e: any) => {
    let value = e.target.value;
    let arr = state.dataSource;

    let newArr = arr
      .filter((item: any) => item.desc.includes(value))
      .filter((item: any) => item.name.includes(state.searchName));
    console.log(newArr, "newArr1");
    setState((s: any) => ({
      ...s,
      filterDate: newArr,
      searchDesc: value,
    }));
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex" }}>
        <div>
          名称：{" "}
          <Input
            style={{ width: 200 }}
            value={state.searchName}
            onChange={searchName}
          />
        </div>
        <div style={{ marginLeft: "15px" }}>
          描述：{" "}
          <Input
            style={{ width: 200 }}
            value={state.searchDesc}
            onChange={searchDesc}
          />
        </div>
        <Button
          style={{ marginLeft: "5px" }}
          type="primary"
          onClick={handleSearch}
        >
          {" "}
          搜索{" "}
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>应用列表</h3>
        {/* <Button onClick={() => showModal("create", {})} type="primary"> */}
        <Button onClick={() => { throw new Error('111') }} type="primary">
          新建
        </Button>
      </div>
      <Table
        rowKey={'key'}
        style={{ marginTop: "5px" }}
        // 解决数据不刷新。。。。
        dataSource={
          !state.isFilter ? [...state?.dataSource] : [...state.filterDate]
        }
        columns={columns}
      />
      <Modal
        title={renderTitle()}
        destroyOnClose
        forceRender
        open={state?.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} {...formItemLayout}>
          <Form.Item
            initialValue={state.editObj?.name}
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入名称！" }]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item
            initialValue={state.editObj?.tags}
            name="desc"
            label="描述"
            rules={[{ required: true, message: "请输入描述！" }]}
          >
            <Input placeholder="请输入描述" />
          </Form.Item>
          <Form.Item
            initialValue={state.editObj?.tags}
            name="tags"
            label="标签"
            rules={[{ required: true, message: "请选择标签！" }]}
          >
            <Select
              mode="tags"
              placeholder="请选择标签"
              tagRender={tagRender}
              style={{ width: "100%" }}
              options={options}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(TableList);
