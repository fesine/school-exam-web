/*
 * ClassName 用户数据集
 */
Ext.define("core.system.store.MenuStore", {
    alias: 'widget.menuStore',
    extend: 'Ext.data.Store',
    model: 'core.app.model.WestMenuModel',
    proxy: {
        type: "ajax",
        url: _hostUrl+"/v1/menus/",
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