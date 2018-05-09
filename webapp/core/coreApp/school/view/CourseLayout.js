/**用户管理视图布局类*/
Ext.define("core.school.view.CourseLayout", {
	extend : 'Ext.panel.Panel',
    id: 'courseLayout',
	alias : 'widget.courseLayout',
	title : "<center height=40>课程基本信息</center>",
	closable:true,
	iconCls: 'table_row_delete',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"courseGrid"
	}]
});