/**用户管理视图布局类*/
Ext.define("core.attendance.view.LeaveLayout", {
	extend : 'Ext.panel.Panel',
    id: 'leaveLayout',
	alias : 'widget.leaveLayout',
	title : "<center height=40>请假基本信息</center>",
	closable:true,
	iconCls: 'leave',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"leaveGrid"
	}]
});