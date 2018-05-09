/**用户管理视图布局类*/
Ext.define("core.student.view.StudentLayout", {
	extend : 'Ext.panel.Panel',
    id: 'studentLayout',
	alias : 'widget.studentLayout',
	title : "<center height=40>学生基本信息</center>",
	closable:true,
	iconCls: 'username',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"studentGrid"
	}]
});