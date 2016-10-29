/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-09-30 08:48:06
 * @version $Id$
 */
//页面加载完毕后需要执行的事件
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    }
  }
}

//将元素插入到指定元素的后面
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

//为class属性添加值
function addClass(element, value) {
  if (!element.className) {
    //如果class原来不存在，直接添加一个class属性
    element.className = value;
  } else {
    //如果原class属性存在，就在原来class属性值得后面添加一个空格和一个value
    newClassName = element.className;
    newClassName += " ";
    newClassName += value;
    element.className = newClassName;
  }
}

//高亮当前页面导航
function highlightPage() {
  //判断功能存在与否
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  //获取页面中的所有header，并判断数量是否为0
  var headers = document.getElementsByTagName('header');
  if (headers.length == 0) return false;
  //获取第一个header中的所有nav，并判断数量是否为0
  var navs = headers[0].getElementsByTagName('nav');
  if (navs.length == 0) return false;

  //获取第一个nav中的所有a
  var links = navs[0].getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var linkurl;
    //遍历所有链接
    for (var i = 0; i < links.length; i++) {
      //获取链接的href属性
      linkurl = links[i].getAttribute("href");
      //使用indexOf来判断当前链接href与便利到的链接的href属性是否相同，如果相同就为这个链接添加class="here"
      if (window.location.href.indexOf(linkurl) != -1) {
        links[i].className = "here";
        //获取链接中的文本信息，并将他设置为小写
        var linktext = links[i].lastChild.nodeValue.toLowerCase();
        //为相应页面的body设置id=“linktext”
        document.body.setAttribute("id", linktext);
      }
    }
  }
}


// 首页
//图库切换动画效果
function moveElement(elementID, final_x, final_y, interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos) / 10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x) / 10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos) / 10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y) / 10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
  elem.movement = setTimeout(repeat, interval);
}

//用于鼠标停留在链接时在页面上显示图库
function prepareSlideshow() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("intro")) return false;
  //获取intro段落对象
  var intro = document.getElementById("intro");
  //创建包含图库的块,设置id为shlideshow
  var slideshow = document.createElement("div");
  slideshow.setAttribute("id", "slideshow");
  //创建用去覆盖图库的圆角矩形图框,并将其添加到到slideshow中
  var frame = document.createElement("img");
  frame.setAttribute("src", "images/frame.gif");
  frame.setAttribute("alt", "");
  frame.setAttribute("id", "frame");
  slideshow.appendChild(frame);
  ///创建链接显示的图库
  var preview = document.createElement("img");
  preview.setAttribute("src", "images/slideshow.gif");
  preview.setAttribute("alt", "a glimpse of what awaits you");
  preview.setAttribute("id", "preview");
  slideshow.appendChild(preview);
  //将整个块添加到段落之后
  insertAfter(slideshow, intro);
  //获取页面的链接，然后遍历链接，根据链接的不同来移动图库显示区域
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    links[i].onmouseover = function () {
      var destination = this.getAttribute("href");
      if (destination.indexOf("index.html") != -1) {
        moveElement("preview", 0, 0, 5);
      }
      if (destination.indexOf("about.html") != -1) {
        moveElement("preview", -150, 0, 5);
      }
      if (destination.indexOf("photos.html") != -1) {
        moveElement("preview", -300, 0, 5);
      }
      if (destination.indexOf("live.html") != -1) {
        moveElement("preview", -450, 0, 5);
      }
      if (destination.indexOf("contact.html") != -1) {
        moveElement("preview", -600, 0, 5);
      }
    }
  }
}


// 关于页面
//当文章较长时配合id来只显示一部分区域
function showSection(id) {
  var sections = document.getElementsByTagName("section");
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].getAttribute("id") != id) {
      sections[i].style.display = "none";
    } else {
      sections[i].style.display = "block";
    }
  }
}

//让关于页面显示歌手信息的section默认不显示
function prepareInternalnav() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  //获取article
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  //获取第一个article区域中的所有nav元素
  var navs = articles[0].getElementsByTagName("nav");
  if (navs.length == 0) return false;
  //获取第一个nav中的所有链接
  var nav = navs[0];
  var links = nav.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    //将遍历的链接的href通过#来分割，分割后#号之前为空字符串，之后为有用的字符串，所以这里选择 [1]。
    var sectionId = links[i].getAttribute("href").split("#")[1];
    if (!document.getElementById(sectionId)) continue;
    //页面加载后默认隐藏所有section
    document.getElementById(sectionId).style.display = "none";
    //sectionId为局部变量，要想在时间处理函数即onclick执行的时候使用它，必须将它赋值给一个自定义属性destination。
    links[i].destination = sectionId;
    links[i].onclick = function () {
      showSection(this.destination);
      return false;
    }
  }
}


// 图库页面
//将需要展示的图库的信息覆盖占位图库
function showPic(whichpic) {
  if (!document.getElementById("placeholder")) return true;
  //获取展示图库的href
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  //将展示图库的href设置为占位图库的src
  placeholder.setAttribute("src", source);
  if (!document.getElementById("description")) return false;
  //获取展示图库的title
  if (whichpic.getAttribute("title")) {
    var text = whichpic.getAttribute("title");
  } else {
    var text = "";
  }
  //获取description文字段
  var description = document.getElementById("description");
  if (description.firstChild.nodeType == 3) {
    description.firstChild.nodeValue = text;
  }
  return false;
}

//创建占位图库及文字
function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  // 创建占位图库
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id", "placeholder");
  placeholder.setAttribute("src", "images/placeholder.gif");
  placeholder.setAttribute("alt", "my image gallery");
  // 创建占位文字
  var description = document.createElement("p");
  description.setAttribute("id", "description");
  var desctext = document.createTextNode("请选择一张图库");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  // 依次添加占位文字及占位图库
  insertAfter(description, gallery);
  insertAfter(placeholder, description);
}

//为点击图库事件添加动作
function prepareGallery() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  //点击图库链接，触发showPic函数
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function () {
      return showPic(this);
    }
  }
}


// 现场

function stripeTables() {
  if (!document.getElementsByTagName) return false;
  //获取table元素
  var tables = document.getElementsByTagName("table");
  for (var i = 0; i < tables.length; i++) {
    var odd = false;
    // 获取tr元素
    var rows = tables[i].getElementsByTagName("tr");
    for (var j = 0; j < rows.length; j++) {
      if (odd == true) {
        // 为奇数行添加class="odd",，用于改变表格奇数行的背景颜色
        addClass(rows[j], "odd");
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}

//让鼠标所在行颜色改变
function highlightRows() {
  if (!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    rows[i].oldClassName = rows[i].className
    rows[i].onmouseover = function () {
      //为鼠标所在行添加 class=”highlight“
      addClass(this, "highlight");
    }
    rows[i].onmouseout = function () {
      //鼠标移走后回复原来的class值
      this.className = this.oldClassName
    }
  }
}

//在表格下方显示缩略词的全名
function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  // 获取缩略词对象
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1) return false;
  // 创建用于存储键值对的数组
  var defs = [];
  for (var i = 0; i < abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) continue;
    // 获取当前缩略词的title
    var definition = current_abbr.getAttribute("title");
    // 将当前缩略词的缩略字赋值给key变量
    var key = current_abbr.lastChild.nodeValue;
    // 将缩略词缩略字与全名对应储存到数组中
    defs[key] = definition;
  }
  // 创建自定义列表dl
  var dlist = document.createElement("dl");
  for (key in defs) {
    var definition = defs[key];
    // 创建自定义列表抬头dt，并将缩略词赋值给dt
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    // 创建自定义列表定义dd，并将缩略词全名赋值给dd
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
  //创建自定义列表项表头header
  var header = document.createElement("h3");
  var header_text = document.createTextNode("缩写");
  header.appendChild(header_text);
  // 获取页面中的article元素
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  //将自定义表头header和自定义列表dlist添加到第一个article元素的末尾
  articles[0].appendChild(header);
  articles[0].appendChild(dlist);
}


// 联系
//确保所有浏览器都支持label for
function focusLabels() {
  if (!document.getElementsByTagName) return false;
  var labels = document.getElementsByTagName("label");
  for (var i = 0; i < labels.length; i++) {
    if (!labels[i].getAttribute("for")) continue;
    labels[i].onclick = function () {
      var id = this.getAttribute("for");
      if (!document.getElementById(id)) return false;
      var element = document.getElementById(id);
      element.focus();
    }
  }
}

function resetFields(whichform) {

  // whichform.element.length返回属于表单元素的元素，比如input、textarea
  for (var i = 0; i < whichform.elements.length; i++) {
    var element = whichform.elements[i];
    // 如果元素是提交按钮，就跳过。
    if (element.type == "submit") continue;
    // 为赋值check赋值placeholder
    if (!element.getAttribute('placeholder')) continue;
    // 组件激活事件
    element.onfocus = function () {
      if (this.value == this.getAttribute('placeholder')) {
        this.value = "";
      }
    }
    // 组件失去焦点事件
    element.onblur = function () {
      if (this.value == "") {
        this.value = this.getAttribute('placeholder');
      }
    }
    element.onblur();
  }
}

// 校验表单
function validateForm(whichform) {
  // 遍历form，获取所有表单元素
  for (var i = 0; i < whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.getAttribute("required") == 'required') {
      // 判断名字
      if (!isFilled(element)) {
        alert("Please fill in the " + element.name + " field.");
        return false;
      }
    }
    if (element.getAttribute("type") == 'email') {
      // 判断电子邮件地址
      if (!isEmail(element)) {
        alert("The " + element.name + " field must be a valid email address.");
        return false;
      }
    }
  }
  return true;
}

function isFilled(field) {
  return (field.value.length > 1 && field.value != field.placeholder);
}

function isEmail(field) {
  return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function prepareForms() {
  for (var i = 0; i < document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function () {
      if (!validateForm(this)) return false;
      var article = document.getElementsByTagName('article')[0];
      if (submitFormWithAjax(this, article)) return false;
      return true;
    }
  }
}


// Ajax

function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined")
    XMLHttpRequest = function () {
      try {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
      } catch (e) {
      }
      try {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
      } catch (e) {
      }
      try {
        return new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
      }
      return false;
    }
  return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
  //删除所有子节点
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
  // 创建一个img元素，并为其设置属性，然后将它添加到element中。
  var content = document.createElement("img");
  content.setAttribute("src", "images/loading.gif");
  content.setAttribute("alt", "Loading...");
  element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget) {

  var request = getHTTPObject();
  if (!request) {
    return false;
  }

  // 调用displayAjaxLoading函数，删除目标元素的子元素，并添加loading.gif图像
  displayAjaxLoading(thetarget);

  // 创建一个URL编码的表单数据字符串
  var dataParts = [];
  var element;
  for (var i = 0; i < whichform.elements.length; i++) {
    element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }
  // 收集到数据后用&号连接起来
  var data = dataParts.join('&');
  // 向原始表单的action属性指定的处理函数发送POST请求
  request.open('POST', whichform.getAttribute("action"), true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // 添加application头部
  request.onreadystatechange = function () {
    // readyState=4，表示可以访问服务器发回来的数据了
    if (request.readyState == 4) {
      if (request.status == 200 || request.status == 0) {
        var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
        if (matches.length > 0) {
          thetarget.innerHTML = matches[1];
        } else {
          thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
        }
      } else {
        thetarget.innerHTML = '<p>' + request.statusText + '</p>';
      }
    }
  };

  request.send(data);
  // 返回true表示已经成功发送请求
  return true;
};


function loadEvents() {
  // 首页
  prepareSlideshow();
  // 关于
  prepareInternalnav();
  // 图库
  preparePlaceholder();
  prepareGallery();
  // 现场
  stripeTables();
  highlightRows();
  displayAbbreviations();
  // 联系
  focusLabels();
  prepareForms();
}

// 加载事件
addLoadEvent(highlightPage);
addLoadEvent(loadEvents);
