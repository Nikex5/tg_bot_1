import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
const onFinish = (values) => {
    console.log('Success:', values);
    fetch(`/add_user?name=${values.username}&lastname=${values.lastname}&age=${values.age}&tg_login=${values.tglogin}`)
        .then(res => res.json)
        .then(res => {
            if (res.response.length === 0) {
                props.refresh()
            }
        })
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const CreateUser = (props) => (
    <Form
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Username"
            name="username"
            rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Lastname"
            name="lastname"
            rules={[
                {
                    required: true,
                    message: 'Please input your lastname!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Age"
            name="age"
            rules={[
                {
                    required: true,
                    message: 'Please input your age!',
                },
            ]}
        >
            <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
            label="Tg Login"
            name="tglogin"
            rules={[
                {
                    required: true,
                    message: 'Please input your tg login!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
                Создать
            </Button>
        </Form.Item>
    </Form>
);
export default CreateUser;