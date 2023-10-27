
# react-lowcode-backend 低代码平台后端代码


> node v16+


## NestJs

https://docs.nestjs.com/


### 新建项目

- npm i -g @nestjs/cli
- nest new project-name

- npm run start



### 新建page模块
- `nest g res page`
> 选择`Rest API`, 会在src目录下自动生成 page 模块

``` js
-- src/
    -- page/
        -- dto/ // DTO层：处理客户端参数
        -- entities/
        -- page.controller.ts // 控制层：这一层用于处理客户端传入的请求以及向客户端返回响应，所有的请求映射都会在这一层来实现。每个请求会对应一个控制器，一个控制器中可以有多个子方法用于处理同类型的不同操作
        -- page.service.ts // 服务层: 用于处理具体的业务逻辑，当我们收到客户端的请求后，取出参数编写具体的业务代码。
        -- page.modules.ts // 模块层：它提供了元数据，Nest 用它来组织应用程序结构。我们有了控制层和服务层后，它们还无法运行，因为它们缺少一个组织。
    -- app.controller.ts
    -- app.modules.ts
    -- app.service.ts
    -- main.ts // 入口文件
```



### 引入 mySql

- pnpm install --save @nestjs/typeorm typeorm sqlite sqlite3

> sqlite是直接可以在本地运行的简易的sql


- npm run start后，根目录下会生成`db.sql`文件
> 安装vscode插件：`SQLite Viewer`查看sql文件




梳理：

- 接口进来，进到`page.controller.ts`: `@Controller`, 通过 `@Post`递给 @Service: `pageService`

- 然后在`page.service.ts`里，通过 `this.pageRepository.save`操作`createPageDto`, 


前后端本地启动服务后，前端发动POST请求：`http://localhost:3001/page`，传递参数，之后在`db.sql`中就能看到新建的数据了




## 部署


- 根目录下新建`vercel.json`




https://vercel.com

1. 注册账号

2. github上授权

3. 添加项目
- Add New => Project => 选择项目，Import


4. 部署
  - 手动部署
  - shell部署
  - Git actions部署

