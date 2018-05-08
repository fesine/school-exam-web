Ext.define("core.system.model.CodeModel", {
    extend: "Ext.data.Model",
    fields: [{name: "id", type: "number"},
        {name: "codeId", type: "string"},
        {name: "text", type: "string"},
        {name: "value", type: "string"},
        {name: "leaf", type: "boolean"},
        {name: "parentId", type: "number"},
        {name: 'orderNo', type: "number"},
        {name: 'grade', type: "number"},
        {name: 'remark1', type: "string"}
    ]
});