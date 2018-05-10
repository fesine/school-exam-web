/*
 * 用户实体类
 */
 Ext.define("core.student.model.ExamScoreModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"number",sortable:true},
 		{name:"examId",type:"number",sortable:true},
 		{name:"score",type:"number",sortable:true},
        {name:"stuNo",type:"string",sortable:true},
        {name:"stuName",type:"string",sortable:true},
        {name:"gradeId",type:"number",sortable:true},
        {name:"classroomId",type:"number",sortable:true},
        {name:"courseId",type:"number",sortable:true},
 		{name:"gradeName",type:"string",sortable:true},
 		{name:"classroomName",type:"string",sortable:true},
 		{name:"startTime",type:"string",sortable:true},
 		{name:"endTime",type:"string",sortable:true},
 		{name:"courseName",type:"string", sortable:true}
 	]
 });