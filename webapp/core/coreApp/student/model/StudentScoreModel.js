/*
 * 用户实体类
 */
 Ext.define("core.student.model.StudentScoreModel",{
 	extend:"Ext.data.Model",
 	fields:[
        {name:"stuNo",type:"string",sortable:true},
        {name:"stuName",type:"string",sortable:true},
        {name:"gradeId",type:"number",sortable:true},
        {name:"classroomId",type:"number",sortable:true},
        {name:"courseId",type:"number",sortable:true},
 		{name:"gradeName",type:"string",sortable:true},
 		{name:"classroomName",type:"string",sortable:true},
 		{name:"chinese",type:"string", sortable:true},
 		{name:"math",type:"string", sortable:true},
 		{name:"english",type:"string", sortable:true},
 		{name:"physics",type:"string", sortable:true},
 		{name:"chemistry",type:"string", sortable:true},
 		{name:"sum",type:"string", sortable:true},
 		{name:"avg",type:"string", sortable:true},
 		{name:"rowNo",type:"string", sortable:true}
 	]
 });