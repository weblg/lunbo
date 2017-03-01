
function addEvent(obj,eve,fun){
  if(obj.addEventListener){
    obj.addEventListener(eve,fun,false);
  }else if (obj.attachEvent) {
    obj.attachEvent("on"+eve,fun);
  }else{
    obj["on"+eve]=fun;
  }
}
var container=document.getElementById("container");
var list=document.getElementById("list");
var buttons=document.getElementById("buttons").getElementsByTagName("span");
var pre=document.getElementById("pre");
var next=document.getElementById("next");
var index=1;
var len=5;
var animated=false;
var interval=3000;
var timer=null;
//左右箭头点击处理函数
function animate(offset){
  animated=true;
  var time=300;//切换一次总花费时间
  var inter=10;//每隔10ms移动一次
  var speed=offset/(time/inter);//每次移动的距离
  var newLeft=parseInt(list.style.left)+offset;//需要到达的目标位置

  var go=function(){
    if((speed>0&&parseInt(list.style.left)<newLeft)||(speed<0&&parseInt(list.style.left)>newLeft)){
      list.style.left=parseInt(list.style.left)+speed+"px";
      setTimeout(go,inter);
    }else{
      list.style.left=newLeft+"px";
      if (newLeft>-400) {
        list.style.left=-400*len+"px";
      }//else
      if (newLeft<(-400*len)) {
        list.style.left=-400+"px";
      }
      animated=false;
    }
  }
  go();
  /*list.style.left=newLeft+"px";
  if (newLeft>-400) {
    list.style.left=-2000+"px";
  }//else
  if (newLeft<-2000) {
    list.style.left=-400+"px";
  }*/
  //else{
    //list.style.left=newLeft+offset+"px";

  //}
}
//var index=0;
//自动播放函数
function play(){
  //next.onclick();
  timer=setInterval(function(){
    next.onclick();
    //play();
  }

  ,interval);
}
function stop(){
  clearTimeout(timer);
}
//为这5个点添加样式
function buttonStyle(){
   //index=parseInt(list.style.left);
  //index=Math.abs(index)/400;
  for(var i=0;i<buttons.length;i++){
    if(buttons[i].className==="on")
    buttons[i].className="";
    //break;
  }
   buttons[index-1].className="on";
}
 addEvent( pre,"click",function(){
   //var index=parseInt(list.style.left);
   //index=Math.abs(index)/400;
   //window.alert("123");
   //index=parseInt(list.style.left);
  //index=Math.abs(index)/400;
  if(animated){
    return;
  }
   if(index===1){
     index=5;
   }else {
     index-=1;
   }
   buttonStyle();
   animate(400);
 });
next.onclick=function(){
  if(animated){
    return;
  }
  //index=parseInt(list.style.left);
 //index=Math.abs(index)/400;
  if(index===5){
    index=1;
  }else {
    index+=1;
  }
  buttonStyle();
  animate(-400);
};
 /*addEvent( next,"click",function(){
   if(animated){
     return;
   }
   index=parseInt(list.style.left);
  index=Math.abs(index)/400;
   if(index===5){
     index=1;
   }else {
     index+=1;
   }
   buttonStyle(index);
   animate(-400);
 });*/
//给几个span按钮添加点击事件
for(var i=0;i<buttons.length;i++){
  addEvent(buttons[i],"click",function(){
    if(animated){
      return;
    }
    if(this.className==="on"){
      return;
    }
    var myIndex=parseInt(this.getAttribute("index"));
    var nowOffset=-400*(myIndex-index);
    index=myIndex;
    animate(nowOffset);
    buttonStyle();

  });
}
container.onmouseover = stop;//父容器的移入移出事件
   container.onmouseout = play;

   play();  //调用自动播放函数
