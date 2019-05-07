/*
 * Copyright (C) 2018 Baidu, Inc. All Rights Reserved.
 */


export default {
    install(Vue, options) {

        /*解析选中的对象和值*/
        Vue.prototype.parsePropertiesConfig = function (str, splitStr, objSplitStr) {

            if (str == undefined || str.length == 0) {

                return '';
            }

            var returnStr = new Array();
            var arrObj = str.split(objSplitStr);
            for (var i = 0; i < arrObj.length; i++) {

                if (arrObj[i] != '') {
                    var propertie = arrObj[i].split(splitStr);
                    returnStr.push({key: propertie[0], value: propertie[1], isDistabled: true, changeText: '修改'});
                }
            }

            return returnStr;
        }

        /*根据数据对象根据属性组装属性信息*/
        Vue.prototype.assPropertiesConfig = function (array, splitStr, objSplitStr) {

            if (array == undefined || array.length == 0) {

                return '';
            }
            var len = array.length;
            var properties = '';
            for (var i = 0; i < len; i++) {
                properties += this.tableData[i].key + splitStr + this.tableData[i].value + objSplitStr;
            }
            return properties;
        }


        /*将逗号分割的字符串转换成数组*/
        Vue.prototype.strSplitArray = function (str) {

            if (str == undefined || str.length == 0) {

                return {};
            }

            // 转换为逗号分割的字符串
            return str.split(",");
        }

        /*对象转换逗号分割字符串*/
        Vue.prototype.objSplitStr = function (str) {

            if (str == undefined || str.length == 0) {

                return '';
            }

            // 转换为逗号分割的字符串
            return Array.of(str).toString();
        }

    }
}

