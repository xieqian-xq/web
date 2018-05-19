; (function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof exports === "object") {
        module.exports = factory;
    } else {
        root.util = factory();
    }
})(this, function () {
    var util = {};
    util.queryString = function (name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    };

    // 冒泡排序
    util.bubbleSort = function (arr) {
        var arrLen = arr.length, temp, i, j;
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


    return util;
});
