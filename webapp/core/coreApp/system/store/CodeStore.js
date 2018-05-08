/*
 * ClassName 用户数据集
 */
Ext.define("core.system.store.CodeStore", {
    alias: 'widget.codeStore',
    extend: 'Ext.data.Store',
    model: 'core.system.model.CodeModel',
    proxy: {
        type: "ajax",
        url: _hostUrl+"/v1/codes/",
        reader: {
            type: "json",
            root: "data",
            totalProperty: 'totalRecord',
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