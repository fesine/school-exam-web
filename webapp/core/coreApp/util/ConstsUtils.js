/**
 * Created by Fesine on 2017/6/9.
 */
Ext.define('core.util.ConstsUtils',{

    //日期格式化
     formatDateTime: function (v) {
         var date = new Date(parseInt(v));
        return Ext.Date.format(date, 'Y年m月d日 H:i:s')
            + " 周" + "日一二三四五六".charAt(date.getDay());
    },
     formatOverTime: function (v) {
         var date = new Date(parseInt(v));
        return Ext.Date.format(date, 'Y年m月d日 H:00')
            + " 周" + "日一二三四五六".charAt(date.getDay());
    },
     formatDate: function (v) {
         var date = new Date(parseInt(v));
        return Ext.Date.format(date, 'Y年m月d日')
            + " 周" + "日一二三四五六".charAt(date.getDay());
    },
     authConvent: function (v,metaData) {
         var value;
         if (v == "0") {
             value = "<font color=white>管理员</font>";
             metaData.style = ' margin: 1px; padding: 1px;background: green;';
         } else if (v == "1") {
             value = "<font color=white>权限管理员</font>";
             metaData.style = ' margin: 1px; padding: 1px;background: rgb(255,165,0);';
         } else if (v == "2") {
             value = "<font color=white>超级管理员</font>";
             metaData.style = ' margin: 1px; padding: 1px;background: orangered;';
         }
         return value;
    },
     scoreConvent: function (v,metaData) {
         var value;
         if (v < 60 ) {
             value =  "<font color=white>"+v+"</font>";
             metaData.style = ' margin: 1px; padding: 1px;background: orangered;';
         } else if (v  < 90) {
             value = v;
         } else {
             value = "<font color=red>" + v + "</font>";
         }
         return value;
    },
     statusConvent: function (v,metaData) {
         var value;
         if (v == "0") {
             value = "<font color=white>新增</font>";
             metaData.style = ' margin: 1px; padding: 1px;background: rgb(255,165,0);';
         } else if (v == "1") {
             value = "<font color=white>通过</font>";
             metaData.style = ' margin: 1px; padding: 1px;background: green;';

         } else if (v == "2") {
             value = "<font color=white>拒绝</font>";
             metaData.style = ' margin: 1px; padding: 1px;background: orangered;';
         }
         return value;
    }

});