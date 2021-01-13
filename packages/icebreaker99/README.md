# `icebreaker99`

> icebreaker99微信公众号（订阅号非服务号）

## Usage

```sh
yarn
# then
yarn deploy
```

## 思路

serverless+api网关服务

accesstoken问题 可用 redis 这种解决

本人选用的文件缓存

但是不能使用 /tmp 因为这里面是不确定的,不知道啥时候清除

我使用的是 `cfs` —— 即文件存储服务

本质上就是 **挂载** `/mnt` 嘛，大家都很熟悉

用无状态的 serverless 容器，每个区挂载一个 同vpc的 文件系统

来达到多个容器共享数据的作用

### Q&A

---
Q:为啥不用外置 redis 类似

A:因为贵

---
Q:为啥不自个买云服务器，然后直接在dockerhub上拉镜像，做集群

A:都说了，做Serverless要有做Serverless的样子，我们宗旨就是白嫖

---

## 个人订阅号权限不足

一些功能无法继续开发

只能搞搞自动回复，连自定义菜单都没有权限

### 微信你赢了

这个栈先 `archived`
