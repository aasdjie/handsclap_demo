import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Modal, List, Typography } from 'antd';
import imageConversion from 'image-conversion';
import moment from 'moment';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    data: [],
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        orign: 0,
        compress: 0,
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  };

  handleFinish(file) {
    console.log('handlefinish, file,', file);
    const { data } = this.state;
    if (file) {
      data.push(file);
      this.setState({ data });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    console.log('file,', file);
    // imageConversion.compress(file, 200)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  handleCompress = async file => {
    if (file) {
      const { onFinish } = this.props;
      const start = moment().format('x');
      console.log(' 开始时间，', start);

      //  按比例压缩
      const res = await imageConversion.compress(file, 0.5);
      // 精确压缩至指定大小
      // const res = await imageConversion.compressAccurately(file, 0.3)
      const end = moment().format('x');
      if (typeof onFinish === 'function') {
        this.handleFinish();
      }
      const info = {
        start,
        end,
        before: file.size / 1024,
        after: res.size / 1024,
      };
      this.handleFinish(info);
      console.log(' 结束时间，', end);
      console.log(' 压缩前， file 大小，', file.size / 1024);
      console.log('压缩后  file,', res.size / 1024);
      console.log('压缩用时 time,', `${end - start}ms`);
      // const compress = await imageConversion.filetoDataURL(file)
      // const down = await imageConversion.downloadFile(res)
    }

    return false;
  };

  render() {
    const { previewVisible, previewImage, fileList, data } = this.state;

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="uploader">
        <Upload
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          // previewFile={this.handleCompress}
          beforeUpload={this.handleCompress}
        >
          {uploadButton}
        </Upload>
        <List
          className="picture-info"
          bordered
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>
                开始时间:
                {item.start}, 结束时间: {item.end}, 压缩前大小：{item.before}, 压缩后大小:
                {item.after}, 压缩用时: {item.end - item.start} ms
              </Typography.Text>
            </List.Item>
          )}
        />
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
