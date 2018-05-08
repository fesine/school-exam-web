/*
 * 用户实体类
 */
 Ext.define("core.system.model.AuthModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"number",sortable:true},
 		{name:"pacteraNo",type:"string", sortable:true},
        {name:"name",type:"string", sortable:true},
 		{name:"grade",type:"number", sortable:true}
 	]
 });