/*
 * @Author: xueyp
 * @Date: 2019-10-23 16:41:55
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-10-25 15:24:11
 * @description: 首页布局
 */
import React, { useState } from "react";
import './index.styl';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

export default class LayoutElem extends React.Component {
    render() {
        return (
            <h1>这是首页</h1>
        )
    }
}
// function LayoutElem() {
//     const [collapsed, setCollapsed] = useState(false);
//     const [marginLeft, setMarginLeft] = useState(200);
//     const toggle = () => {
//         setCollapsed(!collapsed)
//         setMarginLeft(!collapsed ? 80 : 200)
//     }
//     return (
//         <Layout>
//             <Sider trigger={null} collapsible collapsed={collapsed}
//                 style={{
//                     height: '100vh',
//                     overflow: 'auto',
//                     position: 'fixed',
//                     left: 0,
//                 }}>
//                 <div className="logo">
//                     呆呆
//                 </div>
//                 <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//                     <Menu.Item key="1">
//                         <Icon type="user" />
//                         <span>nav 1</span>
//                     </Menu.Item>
//                     <Menu.Item key="2">
//                         <Icon type="video-camera" />
//                         <span>nav 2</span>
//                     </Menu.Item>
//                     <Menu.Item key="3">
//                         <Icon type="upload" />
//                         <span>nav 3</span>
//                     </Menu.Item>
//                     {
//                         [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
//                             return (
//                                 <Menu.Item key={index}>
//                                     <Icon type="upload" />
//                                     <span>{item}</span>
//                                 </Menu.Item>
//                             )
//                         })
//                     }
//                 </Menu>
//             </Sider>
//             <Layout style={{ marginLeft }}>
//                 <Header style={{ background: '#fff', padding: 0 }}>
//                     <Icon
//                         className="trigger"
//                         type={collapsed ? 'menu-unfold' : 'menu-fold'}
//                         onClick={toggle}
//                     />
//                 </Header>
//                 <Content
//                     style={{
//                         margin: '24px 16px',
//                         padding: 24,
//                         background: '#fff',
//                         minHeight: 280,
//                         overflow: 'initial'
//                     }}
//                 >
//                     {this.props.children}
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// }

// export default LayoutElem;