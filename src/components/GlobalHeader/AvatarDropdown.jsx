import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale'
import React from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event

    if (key === 'logout') {
      const { dispatch } = this.props

      if (dispatch) {
        dispatch({
          type: 'login/logout'
        })
      }

      return
    }

    router.push(`/account/${key}`)
  }

  render() {
    const { currentUser = {}, menu } = this.props

    if (!menu) {
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      )
    }

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="center">
          <UserOutlined />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item>
        <Menu.Item key="settings">
          <SettingOutlined />
          <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    )
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    )
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser
}))(AvatarDropdown)
