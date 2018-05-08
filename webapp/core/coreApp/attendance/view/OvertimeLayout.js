/**用户管理视图布局类*/
Ext.define("core.attendance.view.OvertimeLayout", {
	extend : 'Ext.panel.Panel',
    id: 'overtimeLayout',
	alias : 'widget.overtimeLayout',
	title : "<center height=40>加班基本信息</center>",
	closable:true,
	iconCls: 'overtime',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"overtimeGrid"
	}]
});