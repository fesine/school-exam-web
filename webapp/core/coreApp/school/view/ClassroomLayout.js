/**用户管理视图布局类*/
Ext.define("core.school.view.ClassroomLayout", {
	extend : 'Ext.panel.Panel',
    id: 'classroomLayout',
	alias : 'widget.classroomLayout',
	title : "<center height=40>班级基本信息</center>",
	closable:true,
	iconCls: 'table_row_delete',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"classroomGrid"
	}]
});