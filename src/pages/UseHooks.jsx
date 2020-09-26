import React, { useState } from 'react'
import { Input, Form } from 'antd'
import { useDebounce } from 'ahooks'
import { debounce } from 'lodash'
export default () => {
  const [value, setValue] = useState()
  const debouncedValue = useDebounce(value, { wait: 500 })
  // const dechanged = useDebounce(changed, { wait: 500 })
  const onValueChange = changed => {
    console.log('changed,', changed)
  }
  return (
    <div>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
      <Form onValuesChange={debounce(onValueChange, 500)}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
}
