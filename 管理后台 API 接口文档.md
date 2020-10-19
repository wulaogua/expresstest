# 1. 管理后台 API 接口文档

## 1.1. API V1 接口说明

- 接口基准地址：`http://39.99.205.217:4000/api/`
- 服务端已开启 CORS 跨域支持
- API V1 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌（每个POST请求都在头部填充了TOKEN）
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON
### 1.1.0. 数据库介绍
**表1：User**

**存放**：**管理员数据**

| *键值*          |       *含义*             |                      *说明*                                                       |
| ------------- | --------------------| -------------------------------------------------------------|
| username    | 用户名                  | 区分大小写                                                                      |
| password    | 密码                      | 经过bcryptjs加密                                                             |
| tal               | 电话                      |                                                                                       |
| machinekey| 初始绑定设备序列号|                                                                                       |
| Jurisdiction  | 权限                      | admin                                                                             |

**表2：UserM**

**存放**：**管理员片区表**

|   *键值*        |   *含义*       |  *说明*      |
| --- | --- | --- |
|  inPin   |   网关输入引脚启动状态  |     |
|  outPin   | 网关输出引脚启动状态    |     |
|   projectnumb  |  项目标志   | 每个管理员下每个平台下从1开始记录，每添加一个项目+1    |
|  nickname   |  片区名称   |  项目下片区名称   |
|  AdminName   |  管理员名称   |     |
|  platename   |  平台名称   |     |
|  machinekey   | 片区绑定的网管序列号    |     |

**表3：UserC**

**存放：管理员子账户表**

|   *键值*    |   *含义*        |  *说明*        |
| --- | --- | --- |
|  adminnmae   | 管理员名称    |     |
|  username   |  管理员下子用户名称   |     |
|  password   |   密码  |   经过bcryptjs加密     |
|  areadatarights   |  管理员分配给子用户的片区数据访问权限   |  子用户访问片区数据权限   |
|  areacontrolarights   |  管理员分配给子用户的片区控制权限   |   子用户访问片区控制权限  |
|  phone   |  电话  |     |
|  Jurisdiction   |  权限名称   |  user子用户   |
|   projectnumb  |  项目标志   |  提供管理员项目下的子用户标志   |

**表3：sensorA**

**存放：随机数据表**

|   *键值*  |  *含义*     |  *说明*   |
| --- | --- | --- |
|  username   |     |     |
|  sensorname   |     |     |
| tair    |     |     |
|  airhumidity   |     |     |
|  Soiltemp   |     |     |
|  soilmoisture   |     |     |
|  soi   |     |     |
|  rainfall   |     |     |
|  time   |     |     |

**表4：ProjectL**

**存放：管理员设备表**

|    *键值*   |  *含义*     | *说明*    |
| --- | --- | --- |
|  platename   |  平台名   |     |
|  username   |  管理员   |     |
|  areaname  |  项目名   |     |
|  projectnumb   |   项目标志  |     |
|  usernumb   | 子用户数量    |     |
|  areanumb   |  片区数量   |     |
|  errornumb   |  片区报错数量   |     |
|  waringnumb   |  片区报警数量   |     |

**表5：porject**

**存放：设备详情表**

|  *键值*   | *含义*   |  *说明*    |
| --- | --- | --- |
|  platename   |  平台名   |     |
|   username  |  管理员用户名   |     |
|  projectname  |   项目名称  |     |
| projectnumb    |  项目标志   |     |
|  comnpanyname   |  公司名称   |     |
|  companaddr   |  公司地址   |     |
|  companfex   |  公司传真   |     |
|  compantal   | 公司电话    |     |
|  projectintr   |  项目介绍   |     |
|  usericonadder   |  项目图片方位地址   |     |

**表5：MachineKey**

**存放：全部设备**

|   *键值*  |  *含义*   |  *说明*    |
| --- | --- | --- |
|  machinekey   |  设备序列号   |     |
|  keystate   |  设备状态   |  true已注册，false未注册   |

**表6：deviced**

**存放：设备控制数据**

|  *含义*   |  *键值*   |  *说明*    |
| --- | --- | --- |
| 网关下设备名称   |  devicename   |     |
|  网关下输出口ID   |  id   |     |
|  供电状态   |  power   |  true正常,false异常   |
|  远程连接状态   |   remote  |  true正常,false异常    |
|  网关下设备状态   |   status  | 三态1左转，2停止，3右转；2态1运行,2停止； |
|  调节值   |  Nvalue   |  仅限可调类型   |
|  网关下设备类型   |  value   |  1两态，2三态，3可调   |
|  电压   |  voltage   |     |
| 电流    |  ec   |     |
|  网关绑定序列号   |  devicekey   |     |

**表7：chartData**

**存放：树状表**

|  *键值*    |  *含义*    |  *说明*     |
| --- | --- | --- |
|  josnArry   |  JSON格式树  |     |
|  adminname   |  管理员名称   |     |
|   formname  |  平台名称   |     |

**表8：videolist**

**存放：视频流链接**

| *键值*      | *含义*     | *说明* |
| ----------- | ---------- | ------ |
| adminname   | 管理员名称 |        |
| projectnumb | 项目编号   |        |
| videourl    | 视频地址   |        |

**表9：zongland**

**存放：总览数据**

| *键值*     | *含义*                       | *说明* |
| ---------- | ---------------------------- | ------ |
| name       | 网关下子片区名称             |        |
| waringnumb | 网关下子片区报警数量         |        |
| renwuname  | 网关下子片区未来任务名称     |        |
| waringstr  | 网关下子片区报警信息         |        |
| renwuing   | 网关下子片区正在运行的任务   |        |
| shezhi     | 网关下子片区默认初始监控参数 |        |
| videoname  | 网关下子片区监控名称         |        |
| videobool  | 网关下子片区是否有用监控     |        |
| videoaddr  | 网关下子片区监控地址         |        |
| sensorlist | 网关下子片区信息列表         |        |
| machinekey | 网关序列号                   |        |

**表10：jiager**

**存放：每日水产价格**

| *键值* | *含义*   | *说明* |
| ------ | -------- | ------ |
| date   | 时间     |        |
| data   | 价格数组 |        |

### 1.1.1. 支持的请求方法

- GET
- POST


### 1.1.2. 通用返回状态说明

| *状态码* |       *含义*        |                      *说明*                     |
| -------- | ------------------- | ----------------------------------------------- |
| 200      | OK                  | 请求成功                                         |
| 422      | Unprocesable entity | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |

------

## 1.2. 登录

### 1.2.1. 登录验证接口

- 请求路径：login
- 所在文件：login.js
- 请求方法：post
- 涉及表：User,UserC
- 请求参数

|  参数名   | 参数说明 |   备注   |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

|  参数名   | 参数说明 |      备注      |
| -------- | ------- | -------------- |
| id       | 用户 ID  | mongo生产的ID  |
| username | 用户名   |                |
| tal      | 手机号   |                |
| email    | 邮箱     |                |
| token    | 令牌     | `不需要携带同头部获取` |

- 响应数据（admin）

```json
{
  "id": "5ecce364648f393d3ceeba4c",
  "username": "admin",
  "tal": "1234",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTkxMDk3Mzc4fQ.yUVhcSzdMTD2eVqrud0B_O39WuFHuHLncPDYjomjAT8",
  "meta": {
    "msg": "登陆成功",
    "status": 200
  }
}
```
- 响应数据（user）

  ```json
  {
    "username": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MDAzMjExMzh9.wE3538Y4R7n-x29sT9y3NEHtFDTXfnV18ZC8f8eaz1w",
    "Jurisdiction": "user",
    "meta": {
      "msg": "登陆成功",
      "status": 200
    }
  }
  ```

- 相应数据（error）

  ```json
  {
    "meta": {
      "msg": "登陆失败",
      "status": 422
    }
  }
  ```

### 1.2.2. 获取权限

- 请求路径：user/role
- 请求方法：get
- 所在文件：server.js
- 涉及表：User,UserC
- 请求参数

| 参数名 | 参数说明 | 备注                   |
| ------ | -------- | ---------------------- |
| token  | 令牌     | `不需要携带同头部获取` |

- 响应数据

```json
//管理员
"admin"
//子用户
"user"
```



- 登陆逻辑
![](./登陆.png)

### 1.2.3. 查询项目

- 请求路径：chartdata/seek
- 请求方法：post
- 所在文件：chartdata.js
- 涉及表：chartData
- 请求参数

| 参数名 | 参数说明 | 备注                   |
| ------ | -------- | ---------------------- |
| token  | 令牌     | `不需要携带同头部获取` |

- 响应数据

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| numb   | 项目数组 |      |

- 响应数据（有项目）

```json
{
  "meta": {
    "msg": "成功",
    "data": [
      {
        "josnArry": [
          {
            "name": "苏鲜润农业平台",
            "children": [
              {
                "name": "设施农业",
                "children": [
                  {
                    "name": "苏鲜润大棚",
                    "children": [
                      {
                        "name": "1号棚",
                        "value": "57973a30-c040-11ea-89fa-4352fce2dd3a"
                      },
                      {
                        "name": "2号棚",
                        "value": "57973a31-c040-11ea-89fa-4352fce2dd3a"
                      },
                      {
                        "name": "3号棚",
                        "value": "57973a32-c040-11ea-89fa-4352fce2dd3a"
                      },
                      {
                        "name": "4号棚",
                        "value": "57973a33-c040-11ea-89fa-4352fce2dd3a"
                      },
                      {
                        "name": "5号棚",
                        "value": "57973a34-c040-11ea-89fa-4352fce2dd3a"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "_id": "5f045494a454870c789280d8",
        "adminname": "suxianrun",
        "formname": "苏鲜润农业平台",
        "__v": 0
      }
    ],
    "status": 200
  }
}
```

- 相应数据（无项目）

```json
{
            "meta": {
                'msg': "无项目",
                'status': 422
            }
        }
```

- 登陆逻辑2

![](./登陆2.png)

## 1.3. 管理员用户管理

### 1.3.1.注册管理员用户

- 请求路径：register
- 请求方法：post
- 所在文件：register.js
- 涉及表：User
- 请求参数

| 参数名     | 参数说明   | 备注     |
| ---------- | ---------- | -------- |
| username   | 用户名     | 不能为空 |
| password   | 密码       | 不能为空 |
| tal        | 电话       | 不能为空 |
| machinekey | 设备序列号 | 不能为空 |

- 响应数据（成功）

  ```json
  {
    "meta": {
      "msg": "注册成功",
      "status": 200
    }
  }
  ```

  

- 响应数据（失败）

```json
{
  "meta": {
    "msg": "注册失败",
    "status": 422
  }
}
```

### 1.3.2. 用户名验证

- 请求路径：users/:id:
- 请求方法：get
- 所在文件：registerNameSch.js
- 涉及表：User
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | 用户名称 | 不能为空`携带在url中` |

- 响应成功

  ```json
  {
          "meta":{
              'msg': "验证成功",
              'status':200
              }
      }
  ```

  

- 响应数据(失败)

```json
{
  "meta": {
    "msg": "用户名重复",
    "status": 422
  }
}
```

### 1.3.3. 设备码验证

- 请求路径：machinekey/:id:
- 请求方法：get
- 所在文件：keysch
- 涉及表：MachineKey
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | 用户 ID  | 不能为空`携带在url中` |

- 响应数据（成功）

  ```json
  {
    "meta": {
      "msg": "验证成功",
      "status": 200
    }
  }
  ```

  

- 响应数据（失败）

```json

{
  "meta": {
    "msg": "序列号不存在",
    "status": 422
  }
}
```

- 注册逻辑

  ![](./注册.png)



## 1.4. 项目模块

### 1.4.1. 添加项目

- 请求路径：chartdata/add
- 请求方法：post
- 所在文件：chartdata.js
- 涉及表：chartData,ProjectL,porject,UserM
- 请求参数

| 参数名      | 参数说明 | 备注               |
| ----------- | -------- | ------------------ |
| token       | 令牌     | `头部获取不用携带` |
| b           | 行业数组 |                    |
| UpLevelForm | 原始树   |                    |
| listform    | 基地数组 |                    |

- b示意

```js
[
  { Fname: 'text-hangye2', Sname: 'test-xiangmu2' },//Fname：行业//Sname：行业下项目
  { Fname: 'text-hangye1', Sname: 'test-xiangmu1' }
]
```

- listform示意

```js
[
  { id: 0, list: [ {id:1,name:"槽1"}, {id:52,name:"槽2"} },
  { id: 1, list: [ {id:3,name:"蓬1"}, {id:54,name:"蓬2"} ] }
]
```

- UpLevelForm示意

```json
{"name":"test",
 "relationship":"001",
 "children":
    [
        {"name":"test-hangye2",
         "relationship":"111",
         "Id":1600399743982898,
           "children":
         	  [
                  {"name":"test-xiangmu2",
                   "relationship":"100",
                   "Id":1600399756094830
                  }
              ]
         },
        {"name":"test-hangye1",
         "relationship":"111",
         "Id":1600399740662982,
         "children":
         [
             {"name":"test-xiangmu1",
              "relationship":"100",
              "Id":1600399753415183
             }
         ]
        }
    ]
}
```

- 响应数据(成功)

```json
{
                "meta": {
                    'msg': "添加失败",
                    'status': 422
                }
            }
```

- 响应数据(失败)


```json
  {
                "meta": {
                    'msg': "添加成功",
                    'status': 200
                }
            }
```

- 新建项目逻辑图

![](./新建项目.png)

### 1.4.2. 查询单项目树数据

- 请求路径：chartdata/query
- 请求方法：post
- 所在文件：chartdata.js
- 涉及表：chartData
- 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| id     | 数据库ID |      |

- 响应数据(成功)

```json
{
  "meta": {
    "msg": "成功",
    "data": [
      {
        "name": "苏鲜润农业平台",
        "children": [
          {
            "name": "设施农业",
            "children": [
              {
                "name": "苏鲜润大棚",
                "children": [
                  {
                    "name": "1号棚",
                    "value": "57973a30-c040-11ea-89fa-4352fce2dd3a"
                  },
                  {
                    "name": "2号棚",
                    "value": "57973a31-c040-11ea-89fa-4352fce2dd3a"
                  },
                  {
                    "name": "3号棚",
                    "value": "57973a32-c040-11ea-89fa-4352fce2dd3a"
                  },
                  {
                    "name": "4号棚",
                    "value": "57973a33-c040-11ea-89fa-4352fce2dd3a"
                  },
                  {
                    "name": "5号棚",
                    "value": "57973a34-c040-11ea-89fa-4352fce2dd3a"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "status": 200
  }
}
```

- 相应数据（失败）

```json
{
    "meta": 
    {
      'msg': '失败',
      'status': 422
     }
 }
```

- 项目逻辑图

![](./项目2.png)

### 1.4.3. 查询单项目详细数据

- 请求路径：project/searchprojectOne
- 请求方法：post
- 所在文件：projectadd.js
- 涉及表：ProjectL
- 请求参数

| 参数名    | 参数说明 | 备                 |
| --------- | -------- | ------------------ |
| token     | 令牌     | `头部获取不用携带` |
| platename | 平台名称 | utf-8              |
| areaname  | 项目名称 | utf-8              |

- 响应数据(成功)

| 参数名      | 参数说明     | 备   |
| ----------- | ------------ | ---- |
| platename   | 平台名       |      |
| username    | 管理员用户名 |      |
| areaname    | 项目名       |      |
| projectnumb | 项目序号     |      |
| usernumb    | 子用户数量   |      |
| areanumb    | 片区数量     |      |
| errornumb   | 错误数量     |      |
| waringnumb  | 警告数量     |      |
| accessToken | 萤石云token  |      |
| appkey      | 萤石云码     |      |
| secret      | 萤石云码     |      |



```json
{
  "data": [
    {
      "_id": "5f045494a454870c789280d9",
      "platename": "苏鲜润农业平台",
      "username": "suxianrun",
      "areaname": "苏鲜润大棚",
      "projectnumb": 1,
      "usernumb": 1,
      "areanumb": 5,
      "errornumb": 0,
      "waringnumb": 0,
      "__v": 0,
      "accessToken": "at.arbobfvy42bwpaj99ckoarag9g866mfb-7zopkspveo-09y6u1h-fvx7466p2",
      "appkey": "bc824dc91c664a1c8c2469a3c03e0f06",
      "secret": "19ec4402541c7258cf51d4275db6f445"
    }
  ],
  "meta": {
    "msg": "查询成功",
    "status": 200
  }
}
```

- 响应数据(失败)

```json
{
  "msg": "查询失败",
  "status": 422
}
```



### 1.4.4. 查询平台下所有项目

- 请求路径：project/searchprojectOne
- 请求方法：post
- 所在文件：projectadd.js
- 涉及表：ProjectL
- 请求参数

| 参数名    | 参数说明 | 备                 |
| --------- | -------- | ------------------ |
| token     | 令牌     | `头部获取不用携带` |
| platename | 平台名称 | utf-8              |
| areaname  | 项目名称 | utf-8              |

- 响应数据(成功)

```json
{
  "data": [
    {
      "_id": "5f045494a454870c789280d9",
      "platename": "苏鲜润农业平台",
      "username": "suxianrun",
      "areaname": "苏鲜润大棚",
      "projectnumb": 1,
      "usernumb": 1,
      "areanumb": 5,
      "errornumb": 0,
      "waringnumb": 0,
      "__v": 0,
      "accessToken": "at.arbobfvy42bwpaj99ckoarag9g866mfb-7zopkspveo-09y6u1h-fvx7466p2",
      "appkey": "bc824dc91c664a1c8c2469a3c03e0f06",
      "secret": "19ec4402541c7258cf51d4275db6f445"
    }
  ],
  "meta": {
    "msg": "查询成功",
    "status": 200
  }
}
```

- 相应数据（失败）

```json
{
  "msg": "查询失败",
  "status": 422
}
```



## 1.5. 控制台相关

### 1.5.1. 项目介绍-项目介绍数据

- 请求路径：projectinr
- 请求方法：post
- 所在文件：projectadd.js
- 涉及表：ProjectL
- 请求参数

| 参数名 | 参数说明 | 备                 |
| ------ | -------- | ------------------ |
| token  | 令牌     | `头部获取不用携带` |
| data   | 项目序号 | Number             |

- 响应数据（成功）

```json
[
  {
    "_id": "5f045494a454870c789280da",
    "platename": "苏鲜润农业平台",
    "username": "suxianrun",
    "projectname": "苏鲜润大棚",
    "projectnumb": 1,
    "__v": 0,
    "comnpanyname": "江苏苏鲜润生态农业科技有限公司 ",
    "companaddr": "南京市江宁区横溪街道许呈社区",
    "compantal": "18694989090",
    "companfex": "12131"
  }
]
```

- 响应数据（失败）

```json
{
  "meta": {
    "msg": "获取失败",
    "status": 422
  }
}
```

### 1.5.2. 项目介绍-项目图片

- 请求路径：usericon
- 请求方法：post
- 所在文件：userIcon.js
- 涉及表：porject
- 请求参数

| 参数名 | 参数说明 | 备                 |
| ------ | -------- | ------------------ |
| token  | 令牌     | `头部获取不用携带` |
| data   | 项目编号 | Number             |
| file   | 图片信息 | 见下               |

```json
//http post请中req.file非req.body 中携带的数据
file: {
    fieldname: 'usericon',
    originalname: 'timg.jpg',//图片名称
    encoding: '7bit',
    mimetype: 'image/jpeg',//图片类型
    destination: '../usericon/',//请求地址
    filename: '3c6084140daa23a356dd791bb689dc29',//唯一编号
    path: '..\\usericon\\3c6084140daa23a356dd791bb689dc29',
    size: 60201//图片大小
  },
```

- 响应数据（成功）

```json
{
                data: "savePic/1600658731865.jpeg",
                "meta": {
                    'msg': "注册成功",
                    'status': 200
                }
            }
```

- 响应数据（失败）

```json
{
                    "meta": {
                        'msg': "上传失败",
                        'status': 420
                    }
                }
```

### 1.5.3. 项目介绍-添加/修改项目信息

- 请求路径：register/project
- 请求方法：post
- 所在文件：projectinr.js
- 涉及表：porject
- 请求参数

| 参数名         | 参数说明 | 备注               |
| -------------- | -------- | ------------------ |
| token          | 令牌     | `头部获取不用携带` |
| data           | 项目编号 | Number             |
| projectName    | 项目名称 |                    |
| companyName    | 公司名称 |                    |
| companyFax     | 公司传真 |                    |
| companyTal     | 公司电话 |                    |
| projectSuggest | 项目介绍 |                    |

- 响应参数（成功）

```json
{
        "meta": {
            'msg': "提交成功",
            'status': 200
        }
    }
```

- 响应参数（失败）

```json
{
            "meta": {
                'msg': "提交失败",
                'status': 422
            }
        }
```

## 1.6. 子用户管理

### 1.6.1. 子用户删除

- 请求路径：user/deletchlidren
- 请求方法：post
- 所在文件：deletuser.js
- 涉及表：UserC
- 请求参数

| 参数名 | 参数说明 | 备注               |
| ------ | -------- | ------------------ |
| token  | 令牌     | `头部获取不用携带` |
| nanme  | 子用户名 |                    |
| data   | 项目序号 |                    |

- 响应参数（成功）

```json
{
            "meta": {
                'msg': "删除成功",
                'status': 200
            }
        }
```

- 响应数据（失败）

```json
{
            'msg': "删除失败",
            'status': 422
        }
```

### 1.6.2. 获取子用户数据

- 请求路径：user/childuser
- 请求方法：post
- 所在文件：server.js
- 涉及表：UserC
- 请求参数

| 参数名 | 参数说明 | 备注               |
| ------ | -------- | ------------------ |
| token  | 令牌     | `头部获取不用携带` |
| data   | 项目序号 |                    |

- 响应数据（s）

```json
[
  {
    "_id": "5f57156fcb96000ba84f9e17",
    "adminnmae": "suxianrun",//管理员名字
    "username": "user",//子用户名字
    "password": "$2a$10$NcZSYP4rMUTDPtO.e/oPP.HU7Ebpmu7RgSellNcdgSb4q8o9KBUyW",//密码
    "areadatarights": [
      "1号棚",
      "2号棚",
      "3号棚"
    ],//子用户可以看到数据片区
    "areacontrolarights": [
      "3号棚",
      "2号棚",
      "1号棚"
    ],//子用户可以控制的片区
    "phone": "12345678912",//电话
    "Jurisdiction": "user",//权利 user
    "projectnumb": 1,//项目编号
    "__v": 0
  }
]
```

- 响应数据（e）

```json
{
            "meta": {
                
                'msg': "读取失败",
                'status': 422
            }
        }
```



### 1.6.4. 查询所有片区设备

- 请求路径：user/MachineSchAll
- 请求方法：post
- 所在文件：usermachinelist.js
- 涉及表：UserC
- 请求参数

| 参数名 | 参数说明 | 备注               |
| ------ | -------- | ------------------ |
| token  | 令牌     | `头部获取不用携带` |
| data   | 项目序号 |                    |

- 响应数据（s）

```json
[
  {
    "inPin": [
      "1Pin",
      "2Pin",
      "3Pin",
      "4Pin"
    ],//已经使用的I口
    "outPin": [
      "1Pin",
      "2Pin",
      "3Pin",
      "4Pin",
      "5Pin",
      "6Pin"
    ],//已经使用的O口
    "_id": "5f045494a454870c789280dc",
    "projectnumb": 1,//项目编号
    "nickname": "2号棚",//片区名字
    "AdminName": "suxianrun",//管理员名称
    "platename": "苏鲜润农业平台",//平台名字
    "__v": 0,
    "machinekey": "FX017",//设备编码
    "Ip": "192.168.1.51",//
    "sensorsNum": "15",//传感器数量
    "deviceNum": "4",//控制设备数量
    "networkType": "有线",//连接方式
    "networkState": "140ms"//延迟
  },.....
  ]
```

- 响应数据（e）

```json
{
  "meta": {
    "msg": "查询失败",
    "status": 422
  }
}
```

### 1.6.5. 子用户名验证

- 请求路径：users/:id:
- 请求方法：get
- 所在文件：registerNameSch.js
- 涉及表：User
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| :id    | 名字     | 不能为空`携带在url中` |

- 响应数据（s）

```json
{
  "meta": {
    "msg": "验证成功",
    "status": 200s
  }
}
```

- 响应数据（e）

```json
{
        "meta":{
            'msg': "用户名重复",
            'status':422
            }
       }
```

### 1.6.6. 子用户修改

- 请求路径：user/updatachlidren
- 请求方法：post
- 所在文件：updatachilden.js
- 涉及表：UserC
- 请求参数

| 参数名                 | 参数说明           | 备注 |
| ---------------------- | ------------------ | ---- |
| ouserame               | 原始用户名         |      |
| data                   | 项目编号           |      |
| name                   | 现在用户名         |      |
| password               | 现在密码           |      |
| newdata.checkeduseris  | 现在管理数据的片区 |      |
| newdata.checkeduserisO | 现在管理控制的片区 |      |

- 请求参数newdata.checkeduseris例：

```json
[ '1号棚', '2号棚', '3号棚' ]
```

- 请求参数newdata.checkeduserisO例：

```json
[ '1号棚', '2号棚', '3号棚' ]
```

- 响应数据（s）

```json
{
        "meta": {
            'msg': "修改成功",
            'status': 200
        }
    }
```

- 响应数据（e）

```json
{
            'msg': "修改失败",
            'status': 422
        }
```

### 1.6.7. 子用户注册

- 请求路径：user/childregister
- 请求方法：post
- 所在文件：addchildrenusers.js
- 涉及表：UserC
- 请求参数

| 参数名         | 参数说明           | 备注               |
| -------------- | ------------------ | ------------------ |
| token          | 令牌               | `头部获取不用携带` |
| name           | 姓名               |                    |
| password       | 密码               |                    |
| checkeduseris  | 可以管理数据的片区 |                    |
| checkeduserisO | 可以管理控制的片区 |                    |
| phone          | 手机               |                    |
| data           | 项目编号           |                    |

- 请求参数checkeduseris例：

```json
[ '1号棚', '2号棚', '3号棚' ]
```

- 请求参数checkeduserisO例：

```json
[ '1号棚', '2号棚', '3号棚' ]
```

- 响应数据（s）

```json
{
                "meta": {
                    'msg': "注册成功",
                    'status': 200
                }
            }
```

- 响应数据（e）

```json
{
                "meta": {
                    'msg': "注册失败",
                    'status': 422
                }
            }
```

## 1.7. 片区管理相关

### 1.7.1. 查看相关设备

- 请求路径：user/MachineSchOne
- 请求方法：post
- 所在文件：usermachinelist.js
- 涉及表：ProjectL,UserM
- 请求参数

| 参数名 | 参数说明 | 备注               |
| ------ | -------- | ------------------ |
| token  | 令牌     | `头部获取不用携带` |
| data   | 参数     |                    |

- 请求参数:data例

```json
 [ '苏鲜润农业平台', '设施农业', '苏鲜润大棚', '3号棚' ] 
//[平台名，行业名，项目名，片区名]
```

- 响应数据（s）同1.6.4

```json

[
  {
    "inPin": [
      "1Pin",
      "2Pin",
      "3Pin",
      "4Pin"
    ],
    "outPin": [
      "1Pin",
      "2Pin",
      "3Pin",
      "4Pin",
      "5Pin",
      "6Pin"
    ],
    "_id": "5f045494a454870c789280dd",
    "projectnumb": 1,
    "nickname": "3号棚",
    "AdminName": "suxianrun",
    "platename": "苏鲜润农业平台",
    "__v": 0,
    "machinekey": "FX018",
    "Ip": "192.168.1.52",
    "sensorsNum": "15",
    "deviceNum": "4",
    "networkType": "有线",
    "networkState": "150ms"
  }
]
```

- 响应数据（e）同1.6.4

### 1.7.2. 通过key查询设备参数

- 请求路径：user/MachineSch
- 请求方法：post
- 所在文件：usermachinelist.js
- 涉及表：UserM
- 请求参数

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| machinekey | 设备编号 |      |

- 响应数据(s)

```json
{
  "inPin": [],
  "outPin": [],
  "_id": "5f06c558059a1a46845cddb5",
  "projectnumb": 1,
  "nickname": "气象站",
  "AdminName": "suxianrun",
  "platename": "苏鲜润农业平台",
  "machinekey": "FX050",
  "Ip": "192.168.1.55",
  "sensorsNum": "5",
  "deviceNum": "0",
  "networkType": "有线",
  "networkState": "150ms"
}
```

- 响应数据(s)

```json
{
  "meta": {
    "msg": "查询失败",
    "status": 422
  }
}
```

### 1.7.3. 设备注册

- 请求路径： user/Machineregister
- 请求方法：post
- 所在文件：usermachinelist.js
- 涉及表：UserM
- 请求参数

| 参数名       | 参数说明       | 备注               |
| ------------ | -------------- | ------------------ |
| token        | 令牌           | `头部获取不用携带` |
| name         | 管理员名称     |                    |
| machinekey   | 设备编号       |                    |
| nickname     | 片区名称       |                    |
| state        | 状态           |                    |
| sensorsNum   | 传感器数量     |                    |
| deviceNum    | 设备数量       |                    |
| Ip           |                |                    |
| networkType  | 网络连接方式   |                    |
| networkState | 延迟           |                    |
| error        | 错误           |                    |
| Location     | 地址           |                    |
| inPin        | 已使用输入管脚 |                    |
| outPin       | 已使用输出管脚 |                    |
| data         | 项目序列号     |                    |

- 响应数据（s）

```json
{
                "meta": {
                    'msg': "注册成功",
                    'status': 200
                }
            }
```

- 响应数据（e）

```json
{
                "meta": {
                    'msg': "注册失败",
                    'status': 422
                }
            }
```

### 1.7.4. 删除片区

- 请求路径：user/deletmachine
- 请求方法：post
- 所在文件：usermachinelist.js
- 涉及表：UserM，MachineKey，ProjectL
- 请求参数

| 参数名      | 参数说明 | 备注               |
| ----------- | -------- | ------------------ |
| token       | 令牌     | `头部获取不用携带` |
| machinekey  | 设备编号 |                    |
| projectnumb | 项目编号 |                    |

- 响应数据（s）

```json
{
            "meta": {
                "msg": "删除成功",
                'statys': 200
            }
        }
```

- 响应数据（e）

```json
{
            "meta": {
                "msg": "删除失败",
                'statys': 300
            }
        }
```

### 1.7.5. 设备号查询

- 请求路径：machinekey/:id:
- 请求方法：get
- 所在文件：keysch.js
- 涉及表：MachineKey
- 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| id     | 设备编号 |      |

- 响应数据（s）

```json
{
        "meta":{
            'msg': "验证成功",
            'status':200
            }
    }
```

- 响应数据（e）

```json
{
            "meta":{
                'msg': "序列号不存在",
                'status':422
                }
           })
```

## 1.8. 数据展示相关

### 1.8.1. 单个片区当前最新数据查询

- 请求路径：seachdataOne
- 请求方法：post
- 所在文件：seachdata.js
- 涉及表：yanshiy
- 请求参数

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| machinekey | 设备编号 |      |

- 响应数据（s）

```json
{
  "date": "2020-09-21 15:12:10",//时间戳
  "machinekey": "FX017",//设备序列号
   //值
  "value": [
    {
      "name": "tair1",
      "data": "28.8",
      "nikename": "空气温度1"
    },
    {
      "name": "airhumidity1",
      "data": "71",
      "nikename": "空气湿度1"
    },
    {
      "name": "Soiltemp1",
      "data": "28.8",
      "nikename": "土壤温度1"
    },
   .......
  ]
}
```

### 1.8.2. 单个片区选定时间小时数据

- 请求路径：seachdataOne
- 请求方法：post
- 所在文件：seachdata.js
- 涉及表：yanshiy
- 请求参数

| 参数名     | 参数说明 | 备注                  |
| ---------- | -------- | --------------------- |
| fdate      | 开始时间 | 例2020-09-20 17:02:02 |
| sdate      | 结束时间 | 例2020-09-21 02:02:02 |
| machinekey | 设备编号 |                       |

- 响应数据（s）

```JSON
[
    //设备信息
  [
    {
      "date": "2020-09-20 18:00:10",
      "data": "26.2",
      "nikename": "空气温度1"
    },
    {
      "date": "2020-09-20 19:00:10",
      "data": "25.7",
      "nikename": "空气温度1"
    },
     .....
  ],
   //数据
  [
    [
      "26.2",
      "25.7"
    ],
      .....
  ],
    //时间戳
  [
    "2020-09-20 18:00:10",
    "2020-09-20 19:00:10"
  ]
]
```

## 1.9. 片区控制相关

### 1.9.1. 查找片区控制任务

- 请求路径：device/search
- 请求方法：post
- 所在文件：devicedata.js
- 涉及表：deviced
- 请求参数

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| machinekey | 设备编号 |      |

- 响应数据

```json
//所有的任务已经做过优先级排序，数组中靠前的就是优先的
{
  "adata": [
    {
       //定时任务
      "task": [
        {
          "name": "任务1",
          "id": "1",
          "dingshi": true,
          "janj": "231",
          "form": {
            "name": "231",
            "region": "dingshi",
            "date1": "2020-08-12T05:51:27.000Z",//开始时间东8区时间
            "date2": "2020-08-12T06:52:31.000Z",//结束时间东8区时间
            "canshu": "",
            "data1": "",
            "data2": ""
          },
          "canshulist": [
            {
              "name": "温度",
              "id": 1,
              "value": "wendu"
            },
            {
              "name": "日照",
              "id": 2,
              "value": "rizhao"
            }
          ]
        },
      ],
        //阈值任务
      "task1": [
        {
          "name": "任务2",
          "id": "2",
          "dingshi": false,
          "janj": "1",
          "form": {
            "name": "1",
            "region": "yuzhi",
            "date1": "",
            "date2": "",
            "canshu": "tair1",//需要比较的参数
            "data1": "11",//最小值
            "data2": "333",//最大值
            "youxian": 1
          },
          "canshulist": [
            {
              "name": "空气温度1",
              "id": 1,
              "value": "tair1"
            },
            {
              "name": "空气湿度1",
              "id": 2,
              "value": "airhumidity1"
            },
            {
              "name": "土壤温度1",
              "id": 3,
              "value": "Soiltemp1"
            },
            {
              "name": "土壤湿度1",
              "id": 4,
              "value": "soilmoisture1"
            },
            {
              "name": "光照强度1",
              "id": 5,
              "value": "soi1"
            },
            {
              "name": "1号CO2",
              "id": 6,
              "value": "co21"
            },
            {
              "name": "空气温度2",
              "id": 7,
              "value": "tair2"
            },
            {
              "name": "空气湿度2",
              "id": 8,
              "value": "airhumidity2"
            },
            {
              "name": "土壤温度2",
              "id": 9,
              "value": "Soiltemp2"
            },
            {
              "name": "土壤湿度2",
              "id": 10,
              "value": "soilmoisture2"
            },
            {
              "name": "光照强度2",
              "id": 11,
              "value": "soi2"
            },
            {
              "name": "2号CO2",
              "id": 12,
              "value": "co22"
            },
            {
              "name": "空气温度3",
              "id": 13,
              "value": "tair3"
            },
            {
              "name": "空气湿度3",
              "id": 14,
              "value": "airhumidity3"
            },
            {
              "name": "土壤温度3",
              "id": 15,
              "value": "Soiltemp3"
            },
            {
              "name": "土壤湿度3",
              "id": 16,
              "value": "soilmoisture3"
            },
            {
              "name": "光照强度3",
              "id": 17,
              "value": "soi3"
            },
            {
              "name": "3号CO2",
              "id": 18,
              "value": "co23"
            }
          ]
        },
      ],
      "_id": "5f0445e6a454870c789217c6",
      "devicename": "控制1",//控制路数
      "id": "reg00001",//设备控制号
      "power": false,//供电状态
      "remote": false,//远程状态
      "status": 1,//运行状态 1开2关 //1左2关3右
      "Nvalue": 45,//线性值
      "value": 3,//1双控2三控3线性值
      "voltage": "380V",
      "ec": "6A",
      "devicekey": "FX016",
      "__v": 0
    },
   ]
}
```

### 1.9.1. 双态/三态/调值控制

- 请求路径：device/updata
- 请求方法：post
- 所在文件：devicedata.js
- 涉及表：deviced
- 请求参数

| 参数名     | 参数说明               | 备注 |
| ---------- | ---------------------- | ---- |
| machinekey | 设备编号               |      |
| id         | 设备控制编号           |      |
| status     | 状态1开2关 或 左2关3右 |      |
| Nvalue     | 调值的数值             |      |

- 响应数据（s）

```json
{
                    data: { "status": 1, Nvalue:  },
                    meta: {
                        'msg': "更新成功",
                        'status': 200
                    }
                }
```

- 响应数据（e）

```json
{
                "meta": {
                    'msg': "更新失败",
                    'status': 422
                }
            }
```



## 1.10. 视频相关

### 1.10.1. 添加视频列表

- 请求路径：seachdata/seachvideo
- 请求方法：post
- 所在文件：seachdata.js
- 涉及表：ProjectL
- 请求参数

| 参数名      | 参数说明         | 备注               |
| ----------- | ---------------- | ------------------ |
| token       | 令牌             | `头部获取不用携带` |
| AppKey      | 萤石云提供AppKey |                    |
| Secret      | 萤石云提供Secret |                    |
| projectnumb | 项目编号         |                    |

- 响应数据（s）

```json

{
  "data": [
    {
      "deviceSerial": "E29436901",
      "channelNo": 13,
      "channelName": "1号大棚",
      "picUrl": "http://hls01open.ys7.com/openlive/abd49c84a5a943f7a7febe6208a530e4.m3u8"
    },
    {
      "deviceSerial": "E29436901",
      "channelNo": 2,
      "channelName": "3号大棚",
      "picUrl": "http://hls01open.ys7.com/openlive/3fa680fb9db74ef383d8b5571513a9b3.m3u8"
    },
    {
      "deviceSerial": "E29436901",
      "channelNo": 3,
      "channelName": "2号大鹏",
      "picUrl": "http://hls01open.ys7.com/openlive/f9f0701d08e24100adb2db0d800fffed.m3u8"
    },
    {
      "deviceSerial": "E29436901",
      "channelNo": 6,
      "channelName": "4号大棚",
      "picUrl": "http://hls01open.ys7.com/openlive/be4f6561cf54491aa84c1530a7e5b633.m3u8"
    },
    {
      "deviceSerial": "E29436901",
      "channelNo": 7,
      "channelName": "5号大棚",
      "picUrl": "http://hls01open.ys7.com/openlive/c98d5f92aec342d695197be8cdd94fde.m3u8"
    }
  ],
  "meta": {
    "msg": "查询成功",
    "status": 200
  }
}
```

- 响应数据（e）

```json
//萤石云AppKey/Secret错误
{
  "meta": {
    "msg": "token获取失败",
    "status": 403
  }
}
//无相关直播地址
{
  "meta": {
     'msg': "查询直播地址失败",
     'status': 403
   }
 }
//无相关直播通道
{
    "meta": {
      'msg': "查询设备通道失败",
      'status': 403
   }
}
//无相关设备
{
   "meta": {
     'msg': "查询设备(硬盘录像机)失败",
     'status': 403
   }
}
//
{
  "meta": {
     'msg': "视频信息更新失败",
     'status': 403
   }
}
```



### 1.10.2. 查询单个项目的视频

- 请求路径：seachdata/oneseachvideo
- 请求方法：post
- 所在文件：seachdata.js
- 涉及表：videolist
- 请求参数

| 参数名      | 参数说明 | 备注               |
| ----------- | -------- | ------------------ |
| token       | 令牌     | `头部获取不用携带` |
| projectnumb | 项目编号 |                    |

- 响应数据（s）

```json

{
  "data": {
    "videourl": [
      {
        "deviceSerial": "E29436901",
        "channelNo": 13,
        "channelName": "1号棚",
        "picUrl": "http://hls01open.ys7.com/openlive/abd49c84a5a943f7a7febe6208a530e4.m3u8"
      },
      {
        "deviceSerial": "E29436901",
        "channelNo": 2,
        "channelName": "3号棚",
        "picUrl": "http://hls01open.ys7.com/openlive/3fa680fb9db74ef383d8b5571513a9b3.m3u8"
      },
      {
        "deviceSerial": "E29436901",
        "channelNo": 3,
        "channelName": "2号棚",
        "picUrl": "http://hls01open.ys7.com/openlive/f9f0701d08e24100adb2db0d800fffed.m3u8"
      },
      {
        "deviceSerial": "E29436901",
        "channelNo": 6,
        "channelName": "4号棚",
        "picUrl": "http://hls01open.ys7.com/openlive/be4f6561cf54491aa84c1530a7e5b633.m3u8"
      },
      {
        "deviceSerial": "E29436901",
        "channelNo": 7,
        "channelName": "5号棚",
        "picUrl": "http://hls01open.ys7.com/openlive/c98d5f92aec342d695197be8cdd94fde.m3u8"
      }
    ],
    "_id": "5f07f2b34d8a401ae4b23bb0",
    "adminname": "suxianrun",
    "projectnumb": 1,
    "__v": 0
  },
  "meta": {
    "msg": "查询成功",
    "status": 200
  }
}
```

- 响应数据（e）

```json
{
            "meta": {
                'msg': "无数据",
                'status': 403
            }
        }
```




## 1.11. 子用户相关

### 1.11.1.  查询子用户有权限控制的片区

- 请求方法：user/userdata
- 请求方法：post
- 所在文件：chindrndata.js
- 涉及表：UserC，UserM
- 请求参数

| 参数名 | 参数说明     | 备注               |
| ------ | ------------ | ------------------ |
| token  | 令牌（user） | `头部获取不用携带` |

- 响应数据（s）

```js
[
  {
    "inPin": [
      "1Pin",
      "2Pin",
      "3Pin",
      "4Pin"
    ],
    "outPin": [
      "1Pin",
      "2Pin",
      "3Pin",
      "4Pin",
      "5Pin",
      "6Pin"
    ],
    "_id": "5f045494a454870c789280dc",
    "projectnumb": 1,
    "nickname": "2号棚",
    "AdminName": "suxianrun",
    "platename": "苏鲜润农业平台",
    "__v": 0,
    "machinekey": "FX017",
    "Ip": "192.168.1.51",
    "sensorsNum": "15",
    "deviceNum": "4",
    "networkType": "有线",
    "networkState": "140ms"
  }
]
```

- 响应数据（e）

```json
{
                "meta": {
                    'msg': "查询失败",
                    'meta': 301
                }
            }
```

### 1.11.2.  查询子用户分配的视频

- 请求方法：user/uservideo
- 请求方法：post
- 所在文件：chindrndata.js
- 涉及表：UserC，videolist
- 请求参数

| 参数名 | 参数说明     | 备注               |
| ------ | ------------ | ------------------ |
| token  | 令牌（user） | `头部获取不用携带` |

- 响应数据（s）

```json

[
  {
    "nikenmae": "3号棚",
    "picUrl": "http://hls01open.ys7.com/openlive/3fa680fb9db74ef383d8b5571513a9b3.m3u8"
  },
  {
    "nikenmae": "4号棚",
    "picUrl": "http://hls01open.ys7.com/openlive/be4f6561cf54491aa84c1530a7e5b633.m3u8"
  }
]
```

- 响应数据（e）

```json
{
            "meta": {
                'msg': "查询失败",
                'meta': 301
            }
        }
```

### 1.11.3.  查询子用户有权限看数据的片区

- 请求方法：user/userdatak
- 请求方法：post
- 所在文件：chindrndata.js
- 涉及表：UserC，UserM，porject
- 请求参数

| 参数名 | 参数说明     | 备注               |
| ------ | ------------ | ------------------ |
| token  | 令牌（user） | `头部获取不用携带` |

- 响应数据（s）

```json

{
  "resd": [
    {
      "inPin": [
        "1Pin",
        "2Pin",
        "3Pin",
        "4Pin"
      ],
      "outPin": [
        "1Pin",
        "2Pin",
        "3Pin",
        "4Pin",
        "5Pin",
        "6Pin"
      ],
      "_id": "5f045494a454870c789280de",
      "projectnumb": 1,
      "nickname": "4号棚",
      "AdminName": "suxianrun",
      "platename": "苏鲜润农业平台",
      "__v": 0,
      "machinekey": "FX019",
      "Ip": "192.168.1.53",
      "sensorsNum": "15",
      "deviceNum": "4",
      "networkType": "有线",
      "networkState": "170ms"
    }
  ],
  "meta": {
    "msg": "获取成功",
    "meta": 200
  }
}
```

- 响应数据（e）

```json
{
                "meta": {
                    'msg': "获取失败",
                    'meta': 422
                }
            }
```

## 1.12. 爬虫相关

### 1.12.1.  新闻爬虫

- 请求方法：pachong
- 请求方法：get
- 所在文件：pachong.js

- 响应数据（s）

```json
[
  {
    "href": "http://www.shuichan.cc/news_view-408341.html",
    "name": "重庆梁平：活水养鱼养出经济生态双丰收"
  },
  {
    "href": "http://www.shuichan.cc/news_view-408268.html",
    "name": "第37周: 豆粕暴涨 鱼粉止跌企稳"
  },
  {
    "href": "http://www.shuichan.cc/news_view-408050.html",
    "name": "池塘“告急”，解毒这些要点不可不知？"
  },
  {
    "href": "http://www.shuichan.cc/news_view-408237.html",
    "name": "农业农村部全力推进实施水产苗种产地检疫制度"
  },
........
]
```

### 1.12.2.  天气爬虫

- 请求方法：pachongtianqi
- 请求方法：get
- 所在文件：pachong.js

- 响应数据（s）

```json

[
  {
    "date": "22日（今天）",
    "icon": "d03",
    "wea": "阵雨",
    "temp": "24/19℃"
  },
  {
    "date": "23日（明天）",
    "icon": "d03",
    "wea": "阵雨转多云",
    "temp": "25/18℃"
  },
  {
    "date": "24日（后天）",
    "icon": "d01",
    "wea": "多云",
    "temp": "25/17℃"
  }
]
```

### 1.12.3.  水产行情爬虫

- 请求方法：pachongshuichan
- 请求方法：get
- 所在文件：pachong.js

- 响应数据（s）

```json
[
  [
    "2020-9-8",
    "昂刺鱼",
    "24.00"
  ],
  [
    "2020-9-8",
    "白鲢",
    "6.20"
  ],
  [
    "2020-9-8",
    "白鱼",
    "27.20"
  ],
  [
    "2020-9-8",
    "鳊鱼",
    "11.50"
  ],
  [
    "2020-9-8",
    "草虾",
    "45.50"
  ],
  [
    "2020-9-8",
    "草鱼",
    "14.00"
  ],
  [
    "2020-9-8",
    "长江回鱼",
    "15.90"
  ],
  [
    "2020-9-8",
    "桂鱼",
    "65.50"
  ],
  [
    "2020-9-8",
    "河虾",
    "133.00"
  ],
  [
    "2020-9-8",
    "黑鱼",
    "21.30"
  ],
  [
    "2020-9-8",
    "花鲢",
    "11.80"
  ],
  [
    "2020-9-8",
    "黄鳝",
    "61.50"
  ],
  [
    "2020-9-8",
    "基围虾",
    "38.00"
  ],
  [
    "2020-9-8",
    "鲫鱼",
    "22.50"
  ],
  [
    "2020-9-8",
    "甲鱼",
    "70.50"
  ],
  [
    "2020-9-8",
    "龙虾",
    "48.00"
  ],
  [
    "2020-9-8",
    "鲈鱼",
    "32.50"
  ],
  [
    "2020-9-8",
    "螺蛳",
    "5.90"
  ],
  [
    "2020-9-8",
    "鳗鱼",
    "73.50"
  ],
  [
    "2020-9-8",
    "泥鳅",
    "20.90"
  ],
........
]
```

