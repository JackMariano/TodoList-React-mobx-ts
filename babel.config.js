module.exports = {
  // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { browsers: ["> 1%", "last 2 versions", "not ie <= 8"] },
        useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        corejs: 3, // 配置使用core-js使用的版本
        loose: true,
      },
      "mobx"
    ],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/transform-runtime",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css" // `style: true` 会加载 less 文件
      }
    ]
  ]
};