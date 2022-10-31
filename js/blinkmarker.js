L.blinkMarker = function (point, property) {
  // 使用js标签,便于操作,这个temDivEle的作用是将divEle通过innerHTML的方式获取为字符串
  var tempDivEle = document.createElement("div");
  var imgEl = document.createElement("img");
  var divEle = document.createElement("div");
  var spanEl = document.createElement("span");
  var aEl = document.createElement("a");

  divEle.style = "position:relative";

  tempDivEle.append(divEle);
  divEle.append(spanEl);
  spanEl.append(aEl);
  // 设置上基础的样式
  spanEl.classList.add("pulse-icon");
  aEl.classList.add("dive-icon");
  // 操作样式
  var style = document.createElement("style");
  style.type = "text/css";
  document.head.appendChild(style);
  sheet = style.sheet;

  if (property.iconUrl) {
    imgEl.src = property.iconUrl;
    imgEl.style = "width:14px;height:14px;position:absolute;top:0;left:0";
    tempDivEle.append(imgEl);
  }

  // 主体颜色
  if (property) {
    if (property.color) {
      spanEl.style.backgroundColor = "transparent";
      if (!property.diveColor) {
        aEl.style.boxShadow = "0 0 6px 2px " + property.color;
      }
    }
    // 标记大小
    if (property.iconSize) {
      spanEl.style.width = property.iconSize[0] + "px";
      spanEl.style.height = property.iconSize[1] + "px";
    }
    // 发散的color
    if (property.diveColor) {
      // 发散的重度
      if (property.level) {
        aEl.style.boxShadow =
          "0 0 " +
          property.level * 3 +
          "px " +
          property.level +
          "px " +
          property.diveColor;
      } else {
        aEl.style.boxShadow = "0 0 6px 2px " + property.diveColor;
      }
    }
    // 发散的重度
    if (property.level) {
      if (property.diveColor) {
        aEl.style.boxShadow =
          "0 0 " +
          property.level * 3 +
          "px " +
          property.level +
          "px " +
          property.diveColor;
      } else if (property.color) {
        aEl.style.boxShadow =
          "0 0 " +
          property.level * 3 +
          "px " +
          property.level +
          "px " +
          property.color;
      } else {
        aEl.style.boxShadow =
          "0 0 " + property.level * 3 + "px " + property.level + "px red";
      }
    }

    // 闪烁的速度
    if (property.speedTime) {
      aEl.style.setProperty(
        "animation",
        "pulsate " + property.speedTime + "s infinite"
      );
    }
  }

  const myIcon = L.divIcon({
    className: "my-div-icon",
    html: tempDivEle.innerHTML,
    iconUrl: property.iconUrl,
  });
  const marker = L.marker(point, {
    icon: myIcon,
    draggable: property.draggable ? true : false,
  });
  return marker;
};
