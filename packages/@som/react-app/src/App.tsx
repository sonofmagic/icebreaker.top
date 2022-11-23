import React from 'react'
import 'antd/dist/antd.css'

import moment from 'moment'

import { Button, Form, DatePicker } from 'antd'

const App: React.FC = () => {
  const [form] = Form.useForm<{ a: any }>()

  const huixian = () => {
    console.log(111)
    form.setFieldsValue({
      a: moment('2020-12-11')
    })
  }

  const ok = async () => {
    const formData = await form.validateFields()
    console.log(formData)
    const time = moment(formData.a)
    console.log(time, 'time')
  }
  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="a"
        name="a"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <DatePicker></DatePicker>
      </Form.Item>
      <Button onClick={ok}>Submit</Button>
      <Button onClick={huixian}>回显</Button>
    </Form>
  )
}

export default App
