import React from 'react'
import { List, Typography, Button } from 'antd'
import PicturesWall from '../base/PicturesWall'
import '../assets/compress.css'

function Upload() {
  return (
    <div className="App">
      <header className="App-header">
        <p>图片压缩示例</p>

        <PicturesWall />
        <p>文件压缩示例</p>
        <a
          href="data:text/txt;charset=utf-8,测试下载纯文本"
          download="测试.txt"
        >
          下载1
        </a>
        <Button
          onClick={() => {
            openDownloadDialog(
              'data:text/txt;charset=utf-8,测试下载纯文本',
              '测试.txt',
            )
          }}
        >
          下载
        </Button>
      </header>
    </div>
  )
}

/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog(url, saveName) {
  if (typeof url == 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url) // 创建blob地址
  }
  var aLink = document.createElement('a')
  aLink.href = url
  aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  var event
  if (window.MouseEvent) event = new MouseEvent('click')
  else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null,
    )
  }
  aLink.dispatchEvent(event)
}

export default Upload
