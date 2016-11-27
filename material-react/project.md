# 项目目录结构

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
    
    
# 注意事项
* react-router请暂时用hashHistory而不是browserHistory,后者需要服务器配置支持才行