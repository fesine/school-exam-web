/*
 * ClassName 用户数据集
 */
Ext.define("core.user.store.UserStore", {
    alias: 'widget.userStore',
    extend: 'Ext.data.Store',
    model: 'core.user.model.UserModel',
    pageSize: 10,//每页显示10条记录
    proxy: {
        type: "ajax",
        url: "userInfo/listUserInfo",
        reader: {
            type: "json",
            root: "userInfoList",
            totalProperty: 'total',
            messageProperty: 'error'
        },
        writer: {
            type: "json"
        }
    },
    constructor: function () {
        var me = this;
        me.callParent(arguments);
        me.on("load", function (records, operation, success) {
            if (success === false) {
                checkLogin();
            }
        });
    },
    autoLoad: true
});