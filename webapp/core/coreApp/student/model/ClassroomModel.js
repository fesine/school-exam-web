/*
 * 用户实体类
 */
 Ext.define("core.school.model.ClassroomModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"number",sortable:true},
 		{name:"classroomName",type:"string", sortable:true}
 	]
 });