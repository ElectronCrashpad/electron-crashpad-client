# 使用手册
## 运行步骤
* npm install
* npm run rebuild
* npm start

## 说明
基于vite-electron react-ts模版的简易客户端，用来演示electron崩溃日志上报功能
运行之前需要rebuild是为了用electron-rebuild来编译一遍产生崩溃的C文件，如果用nodejs的rebuild有可能导致nodejs版本不一致
在/src/main/index.ts中可以手动修改上报地址，和添加产生崩溃的方法