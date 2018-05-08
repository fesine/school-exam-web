Ext.define("core.app.model.WestMenuModel", {
    extend: "Ext.data.Model",
    fields: [{name: "id", type: "number"},
        {name: "menuId", type: "string"},
        {name: "text", type: "string"},
        {name: "iconCls", type: "string"},
        {name: "leaf", type: "boolean"},
        {name: "parentId", type: "number"},
        {name: 'url', type: "string"},
        {name: 'funViewXtype', type: "string"},
        {name: 'funController', type: "string"},
        {name: 'funViewName', type: "string"},
        {name: 'orderNo', type: "number"},
        {name: 'grade', type: "number"},
        {name: 'remark1', type: "string"}
    ]
});