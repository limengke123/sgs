# sgs

`swagger` 页面的前端辅助工具，快速复制对应接口的方法声明（`typescript`）。对 `swagger` 文档中的输入值和返回值类型
处理，生成 `typescript` 对应的 `interface`。


这里有一个手动复制生成型的页面工具：[地址](https://limengke123.github.io/tiny-waffle/#/sg2ts)

## 插件安装

```bash
yarn # 安装依赖

yarn build # 打包生成 ./lib 目录
```

生成lib目录，浏览器扩展程序添加lib目录下的文件，即可加载插件。(需要打开**开发者模式**，才能添加文件夹作为插件)

不能用crx压缩包的安装方式，因为这种方式需要将应用打包发布到*谷歌商店*，需要收取费用。


## 插件使用

安装完插件之后，在swagger页面的每一个接口上增加三个按钮：

1. 复制函数(接口的函数声明)
2. 复制入参(接口需要传入参数的声明)
3. 复制返参(接口返回参数的声明)

这三个按钮复制出来的内容就能完全覆盖一个接口的所有。

### 模版

由于内部支持了简易的模版引擎，所以对于不同情境下，可以根据自定义的模板去生成所需要的内容。

#### 默认模版

「*复制函数*」的默认模版：

```javascript
/**
 * @name {{methodName}}
 * @description {{comment}}
 * */
export function {{methodName}}(opts: {{methodName ? methodName + 'Request' : 'request'}}) {
  return instance<{{ responseModel[0] ? responseModel[0].name.replace(/Result\<(.*)\>/g, (_, b) => b) : 'any'}}>({
    method: '{{methodType}}',
    url: '{{path}}',
    opts: opts
  });
}
```

「*复制入参*」的默认模版：

```javascript
export interface {{methodName ? methodName + 'Request' : 'request'}} {
  {{requestModel.map(item => item.baseRequestTemplate).join('\\n  ')}}
}
```

「*复制返参*」的默认模版：

```javascript
{{responseModel.map(item => item.value).join('\\n\\n')}}
```

#### 模版细节

`{{}}` 中的内容将被替换成模版对象去匹配，当然内部支持表达式，可以进行条件判断、循环，满足不同业务形式的声明。

`\n` 模版中的换行符号需要写成`\\n`，不然模版解析会报错。

#### 模版对象

模版对象有如下字段，可以在模版中直接使用：

|字段|类型|解释|实例|
|---|---|---|---|
|methodType|string|类型|get、post|
|path|string|方法路径|/active/queryActiveDetail.json|
|comment|string|方法注释|根据uid获取活动详情|
|methodName|string|方法名称|queryActiveDetail|
|requestModel|RequestModelInfo[]|请求参数列表|下面解释|
|responseModel|ResponseModelInfo[]|返回参数列表|下面解释|


`RequestModelInfo` 的字段解释:

|字段|类型|解释|实例|
|---|---|---|---|
|paramName|string|参数名称|uid|
|required|boolean|是否是必传的字段|true|
|description|string|参数的解释|活动uid|
|type|string|参数类型|string|
|baseRequestTemplate|string|根据最基本的字段组装了的typescript的interface，为了方便模版遍历方便|uid: string //活动uid|



`ResponseModelInfo` 的字段解释:

|字段|类型|解释|实例|
|---|---|---|---|
|name|string|返回bean的名称|ActiveDetailDTO|
|value|string|完整组装好的类型interface |-|


### 模版修改

在options.html页面去修改默认模版，修改页面通过右击右上角的图标，点击选项按钮，在弹出的配置页面中修改默认模版。



