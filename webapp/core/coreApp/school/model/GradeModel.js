/*
 * 用户实体类
 */
 Ext.define("core.school.model.GradeModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"number",sortable:true},
 		{name:"gradeName",type:"string", sortable:true}
 	]
 });