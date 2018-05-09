/*
 * ClassName 用户数据集
 */
Ext.define("core.employee.store.NameStore", {
    alias: 'widget.nameStore',
    extend: 'Ext.data.Store',
    model: 'core.employee.model.NameModel',
    pageSize: 10,//每页显示10条记录
    proxy: {
        type: "ajax",
        url: _hostUrl+"/v1/names",
        reader: {
            type: "json",
            root: "data",
            totalProperty: 'data.totalRecord',
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