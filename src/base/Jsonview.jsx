import React from 'react';
import { Descriptions } from 'antd';
import PropTypes from 'prop-types';

class Jsonview extends React.Component {
  jsonToView(json) {
    const keys = Object.keys(json);
    return keys.map(item => {
      let prop = json[item];
      if (prop instanceof Array) {
        prop = prop.join(',');
      }
      if (prop instanceof Object) {
        return this.jsonToView(prop);
      }
      return (
        <Descriptions.Item label={item} key={item}>
          {prop}
        </Descriptions.Item>
      );
    });
  }

  render() {
    const { data, title } = this.props;
    const view = this.jsonToView(data);
    return (
      <div>
        <Descriptions title={title}>{view}</Descriptions>
      </div>
    );
  }
}
Jsonview.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
};
export default Jsonview;
