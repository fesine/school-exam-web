/*
 * 用户实体类
 */
Ext.define("core.employee.model.NameModel", {
    extend: "Ext.data.Model",
    fields: [
        {name: "id", type: "number", sortable: true},
        {name: "pacteraNo", type: "string", sortable: true},
        {name: "empName", type: "string", sortable: true},
        {name: "attName", type: "string", sortable: true}
    ]
});