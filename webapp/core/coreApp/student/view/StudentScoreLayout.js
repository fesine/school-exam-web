/**用户管理视图布局类*/
Ext.define("core.student.view.StudentScoreLayout", {
	extend : 'Ext.panel.Panel',
    id: 'studentScoreLayout',
	alias : 'widget.studentScoreLayout',
	title : "<center height=40>学生成绩信息</center>",
	closable:true,
	iconCls: 'table_row_delete',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"studentScoreGrid"
	}]
});