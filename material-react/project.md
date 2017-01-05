# 项目目录结构

# 如何运行项目
* 请`npm i`安装好各种依赖，如果node_sass安装报错，请联系我
* 执行`npm run start`即可

# 开发相关信息
* 原型负责人：*小礼子*
* 后端负责人：*小礼子*
* 前端负责人：*丁丁*

# 文件夹结构
* src/
    * components/
        * 所有的组件都放在这里，组件请用大写字母开头
    * containers/
        * 所有的容器（页面）都放在这里，容器命名与组件相同
    * index.js
        * 入口文件
* package.json
    * `homepage`用于定义product版本的打包路径(写入到`public/index.html`中)，需要打包请修改该字段，正常开发可以无视掉

# 文件规范
* 所有的组件(components)、容器(containers)、actions和reducers均采用以大写开头命名，比如Demo PageList Tab Mobile （除index文件外）
* actions/reducer文件命名规则同1（但是请都手动加上Action/Reducer后缀，比如DemoAction, TabReducer， PageListAction）（除index文件外）
    注意是Action/Reducer，请不要加复数的s
* 组件目录(components )下的组件如果需要有自己的actions，其type定义按照目录层级加下划线来命名（注意action全部大写，action creator保持驼峰式命名）。比如
    `const TABLIST_TAB_CLICK = 'TABLIST_TAB_CLICK'`
* 所有的action请务必写明注释，表明其含义
* 请使用封装后的createStore，即src/configureStore.jsx
* 请不要在win平台上随意修改大小写，这会导致本地看到的大小写状态和GIT库上不一致
* 所有ajax action请在actions/AjaxAction.js中定义     
* 图标请务必使用Icon组件
* css命名请用小写字母加连字符，比如`i-am-the-class`

# 注意事项
* react-router请暂时用hashHistory而不是browserHistory,后者需要服务器配置支持才行

# 未完成事项
* dashboard/api页面如果从object转化为非object时的层级
* getArrayValueType方法和其调用方并没有处理array-array的情况，这种情况只会作为基本的array来做处理
* listToObject没有顺序
* Tab通常会跳出到下一个焦点上的解决方案