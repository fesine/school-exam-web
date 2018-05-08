/*
 * ClassName 用户数据集
 */
Ext.define("core.system.store.MenuTreeStore", {
    alias: 'widget.menuTreeStore',
    extend: 'Ext.data.TreeStore',
    pageSize: 10,//每页显示10条记录
    proxy: {
        type: "ajax",
        url: _hostUrl+"/v1/menus/2",
        reader: {
            type: "json",
            root: "data",
            totalProperty: 'totalRecord'
        },
        writer: {
            type: "json"
        }
    },
    autoLoad: true,
    fields: [{name: "id", type: "string"},
        {name: "menuId", type: "string"},
        {name: "text", type: "string"},
        {name: "iconCls", type: "string"},
        {name: "leaf", type: "boolean"},
        {name: "parentId", type: "string"},
        {name: 'url', type: "string"},
        {name: 'funViewXtype', type: "string"},
        {name: 'funController', type: "string"},
        {name: 'funViewName', type: "string"},
        {name: 'orderNo', type: "string"},
        {name: 'grade', type: "string"},
        {name: 'description', type: "string"}
    ]
});