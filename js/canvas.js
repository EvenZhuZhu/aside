

//定义查找元素方法
function $(selector) {
  return document.querySelector(selector);
}

//生成canvas图形
var main = {
  init: function () {
    main.setListener();
  },
  //获取像素密度
  getPixelRatio: function (context) {
    var backingStore = context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  },
  //绘制dom 元素，生成截图canvas
  html2Canvas: function () {
    var shareContent = $(".text");// 需要绘制的部分的 (原生）dom 对象 ，注意容器的宽度不要使用百分比，使用固定宽度，避免缩放问题
    var width = shareContent.offsetWidth;  // 获取(原生）dom 宽度
    var height = shareContent.offsetHeight; // 获取(原生）dom 高
    var offsetTop = shareContent.offsetTop;  //元素距离顶部的偏移量
    
    var canvas = document.createElement('canvas');  //创建canvas 对象
    var context = canvas.getContext('2d');
    var scaleBy = main.getPixelRatio(context);  //获取像素密度的方法 (也可以采用自定义缩放比例)
    canvas.width = width * scaleBy;   //这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
    canvas.height = (height + offsetTop) * scaleBy;  // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
    context.scale(scaleBy, scaleBy);
    
    var image = document.getElementById('cav');
    var opts = {
      allowTaint: true,//允许加载跨域的图片
      tainttest: true, //检测每张图片都已经加载完成
      scale: scaleBy, // 添加的scale 参数
      canvas: canvas, //自定义 canvas
      logging: true, //日志开关，发布的时候记得改成false
      width: width, //dom 原始宽度
      height: height //dom 原始高度
    }
    html2canvas(shareContent, opts).then(function (canvas) {
      image.src = canvas.toDataURL("image/png")
      var body = document.getElementsByTagName("body");
      body[0].appendChild(canvas);
      canvas.style.display = 'none';
      document.getElementById('content').style.display = 'none';
      var imgimgs = document.getElementById('downLoad')
      // triggle(imgimgs, "onclick");
    })
  }
}

var triggle = function(element, method) {
  var func = element[method];
  return func();
}



function myBrowser() {
  var userAgent = navigator.userAgent;
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
    return "Opera"
  }
  ;
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  }
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  }
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
    return "IE";
  }
  ;
  if (userAgent.indexOf("Trident") > -1) {
    return "Edge";
  }
}

function SaveAs5(imgURL) {
  var oPop = window.open(imgURL, "", "width=1, height=1, top=5000, left=5000");
  for (; oPop.document.readyState != "complete";) {
    if (oPop.document.readyState == "complete") break;
  }
  oPop.document.execCommand("SaveAs");
  oPop.close();
}

function oDownLoad(url) {
  myBrowser();
  if (myBrowser() === "IE" || myBrowser() === "Edge") {
    odownLoad.href = "#";
    var oImg = document.createElement("img");
    oImg.src = url;
    oImg.id = "downImg";
    var odown = document.getElementById("down");
    odown.appendChild(oImg);
    SaveAs5(document.getElementById('downImg').src)
  } else {
    odownLoad.href = url;
    odownLoad.download = "";
  }
}

var content = document.getElementById("content");
var odownLoad = document.getElementById("downLoad");
var image = document.getElementById("cav");
var btn = document.getElementById('btn')
var imgimg = document.getElementById('imgimg')
var imgimgs = document.getElementById('downLoad')

content.style.display = 'none'
btn.onclick = function () {
  event.stopPropagation();
  content.style.display = 'block'
  main.html2Canvas()
}

imgimgs.onclick = function () {
  oDownLoad(image.src)
  content.style.display = 'none'
}
