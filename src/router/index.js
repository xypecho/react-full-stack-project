/*
 * @Author: xueyp
 * @Date: 2019-11-21 14:33:26
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-21 14:41:33
 * @description: 路由配置表
 */
const menus = [
  { key: '/', title: '工作台', icon: 'dashboard' },
  {
    key: '/form',
    title: '表单页',
    icon: 'form',
    subs: [
      { key: '/form/stepForm', title: '分步表单' },
      { key: '/form/fileUpload', title: '文件上传' }
    ],
  },
  {
    key: '/config',
    title: '系统设置',
    icon: 'setting',
    subs: [
      { key: '/config/user', title: '用户管理' },
      { key: '/config/account', title: '帐号设置' },
      { key: '/config/log', title: '操作日志' }
    ],
  },
  { key: '/auth', title: '权限测试页', icon: 'idcard' },
  { key: '/404', title: '404', icon: 'facebook' }
];

export default menus;
