/*
 * 用户实体类
 */
 Ext.define("core.system.model.AuthModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"number",sortable:true},
 		{name:"username",type:"string", sortable:true},
        {name:"nickName",type:"string", sortable:true},
        {name:"cell",type:"string", sortable:true},
        {name:"email",type:"string", sortable:true},
 		{name:"grade",type:"number", sortable:true},
        {name:"createTime",type:"string", sortable:true},
        {name:"lastUpdateTime",type:"string", sortable:true}
    ]
 });