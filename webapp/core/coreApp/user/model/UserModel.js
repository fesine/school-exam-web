/*
 * 用户实体类
 */
 Ext.define("core.user.model.UserModel",{
 	extend:"Ext.data.Model",
 	fields:[
        {name: "id", type: "number", sortable: true},
        {name: "pacteraNo", type: "string", sortable: true},
        {name: "name", type: "string", sortable: true},
        {name: "sex", type: "number", sortable: true},
        {name: "password", type: "string", sortable: true},
        {name: "cellphone", type: "string", sortable: true},
        {name: "jobNo", type: "string", sortable: true},
        {name: "createTime", type: "string", sortable: true},
        {name: "updateTime", type: "string", sortable: true}
 	]
 });