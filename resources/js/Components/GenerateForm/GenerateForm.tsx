import React, { FC } from "react";
import { Button, Radio, Form, Input, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

interface GenerateFormProps {}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const GenerateForm: FC<GenerateFormProps> = () => {
    return (
        <div className="rounded-lg border border-4">
            <div className="flex flex-col w-full py-2">
                <div>
                    <h1 className="text-center py-6">Generator Form</h1>
                </div>
                <Form
                    style={{ maxWidth: "600px", padding: "50px" }}
                    {...formItemLayout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={(values) => {
                        console.log(values);
                    }}
                    onFinishFailed={(errorInfo) => {
                        console.log("Failed:", errorInfo);
                    }}
                >
                    <Form.Item
                        label="Employee ID"
                        name="employeeId"
                        className=""
                        rules={[
                            {
                                required: true,
                                message: "Please input your User ID!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter your username"
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined
                                        style={{ color: "rgba(0,0,0,.45)" }}
                                    />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Generator Name: "
                        name="generatorName"
                        className="flex"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the Generator Name!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="input with clear icon"
                            allowClear
                            onChange={() => {
                                console.log("change");
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Stage 1 (Insulation Resistance Test)"
                        name="stage1"
                        className=""
                        rules={[
                            {
                                required: true,
                                message: "Please enter the Generator Name!",
                            },
                        ]}
                    >
                        <Radio.Group
                            onChange={(e) => {
                                console.log(e.target);
                            }}
                            className="flex"
                        >
                            <Radio value={true}>Passed</Radio>
                            <Radio value={false}>Failed</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Stage 2"
                        name="stage1"
                        className="flex justify-center"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the Generator Name!",
                            },
                        ]}
                    >
                        <Radio.Group
                            onChange={(e) => {
                                console.log(e.target);
                            }}
                            className="flex"
                        >
                            <Radio value={true}>Passed</Radio>
                            <Radio value={false}>Failed</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default GenerateForm;
