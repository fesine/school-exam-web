/**用户管理视图布局类*/
Ext.define("core.attendance.view.AttendanceLayout", {
	extend : 'Ext.panel.Panel',
    id: 'attendanceLayout',
	alias : 'widget.attendanceLayout',
	title : "<center height=40>考勤基本信息</center>",
	closable:true,
	iconCls: 'table_row_delete',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"attendanceGrid"
	}]
});