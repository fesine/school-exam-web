/*
 * 用户实体类
 */
 Ext.define("core.student.model.StudentModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"number",sortable:true},
 		{name:"stuNo",type:"string",sortable:true},
 		{name:"stuName",type:"string",sortable:true},
 		{name:"stuSex",type:"number",sortable:true},
 		{name:"stuBirthday",type:"string",sortable:true},
        {name:"stuCell",type:"string",sortable:true},
        {name:"stuAddress",type:"string",sortable:true},
        {name:"stuEmail",type:"string",sortable:true},
        {name:"gradeId",type:"number",sortable:true},
        {name:"gradeName",type:"string", sortable:true},
        {name:"classroomId",type:"number",sortable:true},
        {name:"classroomName",type:"string", sortable:true}
    ]
 });