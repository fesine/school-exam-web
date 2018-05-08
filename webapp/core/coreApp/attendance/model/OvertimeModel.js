/*
 * 用户实体类
 */
 Ext.define("core.attendance.model.OvertimeModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"number",sortable:true},
 		{name:"pacteraNo",type:"string", sortable:true},
        {name:"name",type:"string", sortable:true},
        {name:"startTime",type:"string", sortable:true},
        {name:"endTime",type:"string", sortable:true},
        {name:"timeCount",type:"string", sortable:true},
 		{name:"holidayFlag",type:"number", sortable:true},
 		{name:"adjustFlag",type:"number", sortable:true},
 		{name:"reason",type:"string", sortable:true},
 		{name:"status",type:"number", sortable:true},
 		{name:"createTime",type:"string", sortable:true},
 		{name:"updateTime",type:"string", sortable:true}
 	]
 });