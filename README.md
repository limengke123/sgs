# sgs

`swagger` 页面的前端辅助工具，快速复制对应接口的方法声明（`typescript`）。对 `swagger` 文档中的输入值和返回值类型
处理，生成 `typescript` 对应的 `interface`。


这里有一个手动复制生成型的页面工具：[地址](https://limengke123.github.io/tiny-waffle/#/sg2ts)

## 使用

```bash
yarn # 安装依赖

yarn build # 打包生成 ./lib 目录
```

生成lib目录，浏览器扩展程序添加lib目录下的文件，即可加载插件。(需要打开**开发者模式**，才能添加文件夹作为插件)

不能用crx压缩包的安装方式，因为这种方式需要将应用打包发布到*谷歌商店*，需要收取费用。
