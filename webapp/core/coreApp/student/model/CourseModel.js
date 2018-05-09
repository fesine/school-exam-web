/*
 * 用户实体类
 */
 Ext.define("core.school.model.CourseModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"number",sortable:true},
 		{name:"gradeId",type:"number",sortable:true},
 		{name:"gradeName",type:"string",sortable:true},
 		{name:"courseName",type:"string", sortable:true}
 	]
 });