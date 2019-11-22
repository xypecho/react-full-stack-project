/*
 * @Author: xueyp
 * @Date: 2019-11-21 14:33:26
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-22 11:15:09
 * @description: 路由配置表
 */
const menus = [
  { key: '/', title: '工作台', icon: 'dashboard', hidden: false },
  {
    key: '/form',
    title: '表单页',
    icon: 'form',
    hidden: false,
    subs: [
      {
        key: '/form/stepForm', title: '分步表单', hidden: false
      },
      {
        key: '/form/fileUpload',
        title: '文件上传',
        hidden: false,
        subs: [
          {
            key: '/form/fileUploadDetail', title: '文件上传详情', hidden: true
          }
        ]
      }
    ],
  },
  {
    key: '/config',
    title: '系统设置',
    icon: 'setting',
    hidden: false,
    subs: [
      { key: '/config/user', title: '用户管理', hidden: false },
      { key: '/config/account', title: '帐号设置', hidden: false },
      { key: '/config/log', title: '操作日志', hidden: false }
    ],
  },
  { key: '/auth', title: '权限测试页', icon: 'idcard', hidden: false },
  { key: '/404', title: '404', icon: 'facebook', hidden: false }
];

export default menus;
