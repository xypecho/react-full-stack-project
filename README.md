## 0、写在前面
最近看react教程跟着写了两个demo，然后发现还是需要自己来写一个才能更好的学习，之前写过一个[vue版本的后台管理系统](https://github.com/xypecho/vue-full-stack-project)，然后就用那个项目的接口复刻了一个react版本的。

[线上预览地址](http://106.53.78.195/react/)

## 1、技术栈
前端：react 16.x 、 react-dedux 、 react-router 、 axios 、 webpack 、 ES6 、 stylus 、 antd

## 2、项目结构

```
├──  build                                  ---react打包后的代码所在文件夹
├──  config                              
├──  node_modules                          
├──  public                          
├──  src                                    ---核心代码目录
|   ├──  api                                ---封装的接口调用
|   ├──  assets                            
|   |    ├── images                         ---静态资源存放目录
|   ├──  components                         ---组件存放目录
|   ├──  layout                             ---页面骨架
|   ├──  pages                              ---页面存放目录
|   ├──  router                             ---路由信息
|   ├──  store                              ---redux相关的文件
|   ├──  utils                              
|   |    ├── request.js                     ---封装了axios
|   |    ├── tools.js                       ---封装了一些常用的函数
|   ├── App.js                           
|   ├── index.js                          
├── package.json     
......                                      
```

## 3、快速部署

```
yarn install     
yarn start

// 后端的代码运行步骤详见[这里](https://github.com/xypecho/vue-full-stack-project)
```
