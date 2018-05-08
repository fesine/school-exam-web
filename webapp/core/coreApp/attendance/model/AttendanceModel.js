/*
 * 用户实体类
 */
 Ext.define("core.attendance.model.AttendanceModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"number",sortable:true},
 		{name:"company",type:"string", sortable:true},
 		{name:"jobNo",type:"string", sortable:true},
        {name:"name",type:"string", sortable:true},
        {name:"cardNo",type:"string", sortable:true},
 		{name:"eventTime",type:"string", sortable:true},
 		{name:"eventSource",type:"string", sortable:true},
 		{name:"eventType",type:"string", sortable:true},
 		{name:"controllerName",type:"string", sortable:true},
 		{name:"createTime",type:"string", sortable:true},
 		{name:"remark2",type:"string", sortable:true}
 	]
 });