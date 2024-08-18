# 文件目录

## server/**

服务端请求的api，用于在asyncData等第一次server调用时
可这样写
async asyncData(){
  let res
  if(process.server){
    res = await serverDoSomething()
  }else if(process.client){
    res = await clientDoSomething()
  }else{
    //process.static
    doStaticSomething()
  }
}

## client/**

客户端端请求的api

## utils/**

一些公共的小工具
