(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports === "object") {
    module.exports = factory;
  } else {
    root.util = factory();
  }
})(this, function() {
  var util = {};

  // 获取查询字符串中的变量值
  util.queryString = function(name) {
    var result = location.search.match(
      new RegExp("[?&]" + name + "=([^&]+)", "i")
    );
    if (result == null || result.length < 1) {
      return "";
    }
    return result[1];
  };

  // 冒泡排序
  util.bubbleSort = function(arr) {
    var arrLen = arr.length,
      temp,
      i,
      j;
    for (i = 0; i < arrLen - 1; i++) {
      for (j = 0; j < arrLen - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };

  // 获取表单数据
  util.getSerializeData = id => {
    if (typeof id !== "string") return {};
    var pElt = document.getElementById(id);
    if (pElt === null) {
      return {};
    }

    var result = {};
    var item;
    var inputList = pElt.getElementsByTagName("input");
    for (var i = 0, len = inputList.length; i < len; i++) {
      item = inputList[i];
      // 有name值才需取值
      if (item.name !== "") {
        switch (item.type) {
          case "radio":
            if (result[item.name] === "" || result[item.name] === undefined) {
              result[item.name] = item.checked ? item.value : "";
            }
            break;
          case "checkbox":
            result[item.name] = result[item.name] || [];
            if (item.checked) {
              result[item.name].push(item.value);
            }
            break;
          default:
            result[item.name] = item.value.trim();
        }
        item = null;
      }
    }

    var textareaList = pElt.getElementsByTagName("textarea");
    for (i = 0, len = textareaList.length; i < len; i++) {
      item = textareaList[i];
      // 有name值才需取值
      if (item.name !== "") {
        result[item.name] = item.value.trim();
        item = null;
      }
    }

    return result;
  };

    // 克隆
    util.clone = function(obj){
        var result;
        switch(typeof obj){
            case 'object':
                if(obj === null){
                    result = null;
                }else if(obj instanceof Array){
                    result = [];
                    for(var i = 1; i < obj.length; i++){
                        result.push(util.clone(obj[i]));
                    }
                }else{
                    result = {};
                    for(var key in obj){
                        result[key] = util.clone(obj[key]);
                    }
                }
            break;
            default:
                result = obj;
        }
        return result;
    }

    return util;
});
