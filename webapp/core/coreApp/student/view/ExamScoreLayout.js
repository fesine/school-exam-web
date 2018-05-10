/**用户管理视图布局类*/
Ext.define("core.student.view.ExamScoreLayout", {
	extend : 'Ext.panel.Panel',
    id: 'examScoreLayout',
	alias : 'widget.examScoreLayout',
	title : "<center height=40>成绩基本信息</center>",
	closable:true,
	iconCls: 'table_row_delete',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"examScoreGrid"
	}]
});