Ext.define("core.system.model.MenuTreeModel", {
    extend: "Ext.data.TreeModel",
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