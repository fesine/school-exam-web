/*
 * ClassName 用户数据集
 */
Ext.define("core.system.store.SysStore", {
    alias: 'widget.sysStore',
    extend: 'Ext.data.Store',
    model: 'core.user.model.UserModel',
    pageSize: 10,//每页显示10条记录
    proxy: {
        type: "ajax",
        url: _hostUrl+"/v1/employee/"+ Ext.util.Cookies.get("userId"),
        reader: {
            type: "json",
            root: "data",
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