import React from 'react';
import { Row, Col, List, Descriptions } from 'antd';
import ReactJson from 'react-json-view';
import _ from 'lodash';
import View from '../base/Jsonview';

class Jsonview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3],
      data: {
        firstName: 'Chuck',
        lastName: 'Last name',
        company: 'bat',
        phone: '13811119999',
        services: [1, 2, 3, 4, 5],
        detail: {
          sex: '男',
          age: '18',
          info: {
            a: '111',
            b: '222',
          },
        },
      },
    };
  }

  handleChange(e) {
    const data = e.target.value;
    const obj = data;
    const plain = JSON.parse(data);
    console.log('typeof data ==', typeof data);
    console.log('typeof plain ==', typeof plain);
    console.log(' plain ==', plain);
    if (data !== '') {
      this.setState({ data: plain });
    } else {
      console.log('格式不正确')
    }
  }

  /**
   *
   * @param {string} data json 数据
   */
  updateJsonView(data) {
    if (!data) return;
    let plain = data;
    if (typeof data === 'string') {
      plain = JSON.parse(data);
    } else {
      console.log('格式不正确');
    }
    this.setState({ data: plain });
  }

  handleEdit(payload) {
    const src = payload.updated_src;
    console.log('payload,', payload);
    console.log('src,', src);
    this.updateJsonView(src);
  }

  handleAdd(payload) {
    const src = payload.updated_src;
    this.updateJsonView(src);
  }

  handleDelete() {}

  render() {
    const { list, data } = this.state;
    return (
      <div>
        {/* <textarea
          style={{ width: '100%', height: 300 }}
          onChange={e => this.handleChange(e)}
          defaultValue={JSON.stringify(data)}
        ></textarea> */}
        <Row>
          <Col lg={12}>
            <ReactJson
              src={data}
              onEdit={e => this.handleEdit(e)}
              onAdd={e => this.handleAdd(e)}
              onDelete={e => this.handleDelete(e)}
            />
          </Col>
          <Col lg={12}>
            <View title="工单详情" data={data}></View>
          </Col>
        </Row>
        
      </div>
    );
  }
}

export default Jsonview;
