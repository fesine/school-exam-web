/**用户管理视图布局类*/
Ext.define("core.attendance.view.ErrorLayout", {
	extend : 'Ext.panel.Panel',
    id: 'errorLayout',
	alias : 'widget.errorLayout',
	title : "<center height=40>异常基本信息</center>",
	closable:true,
	iconCls: 'error',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"errorGrid"
	}]
});