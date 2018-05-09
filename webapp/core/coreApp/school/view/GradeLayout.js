/**用户管理视图布局类*/
Ext.define("core.school.view.GradeLayout", {
	extend : 'Ext.panel.Panel',
    id: 'gradeLayout',
	alias : 'widget.gradeLayout',
	title : "<center height=40>年级基本信息</center>",
	closable:true,
	iconCls: 'table_row_delete',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"gradeGrid"
	}]
});