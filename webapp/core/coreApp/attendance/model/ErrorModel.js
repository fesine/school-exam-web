/*
 * 用户实体类
 */
 Ext.define("core.attendance.model.ErrorModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"number",sortable:true},
 		{name:"pacteraNo",type:"string", sortable:true},
        {name:"name",type:"string", sortable:true},
 		{name:"errorDate",type:"string", sortable:true},
 		{name:"errorWeek",type:"number", sortable:true},
 		{name:"errorType",type:"number", sortable:true},
 		{name:"errorMsg",type:"string", sortable:true}
 	]
 });