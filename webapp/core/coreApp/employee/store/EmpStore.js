/*
 * ClassName 用户数据集
 */
Ext.define("core.employee.store.EmpStore", {
    alias: 'widget.empStore',
    extend: 'Ext.data.Store',
    model: 'core.employee.model.EmpModel',
    pageSize: 25,
    proxy: {
        type: "ajax",
        url: _hostUrl+"/v1/employees",
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