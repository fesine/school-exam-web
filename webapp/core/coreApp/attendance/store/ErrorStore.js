/*
 * ClassName 用户数据集
 */
Ext.define("core.attendance.store.ErrorStore", {
    alias: 'widget.errorStore',
    extend: 'Ext.data.Store',
    model: 'core.attendance.model.ErrorModel',
    pageSize: 20,//每页显示10条记录
    proxy: {
        type: "ajax",
        url: _hostUrl + "/v1/errors",
        extraParams: {
            name: Ext.util.Cookies.get("userName"),
            dateStr: null,
            status:null
        },
        reader: {
            type: "json",
            root: "data.resultList",
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