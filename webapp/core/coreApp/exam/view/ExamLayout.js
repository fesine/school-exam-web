/**用户管理视图布局类*/
Ext.define("core.exam.view.ExamLayout", {
	extend : 'Ext.panel.Panel',
    id: 'examLayout',
	alias : 'widget.examLayout',
	title : "<center height=40>考试管理</center>",
	closable:true,
	iconCls: 'employees',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"examWindow"
	}, {
        xtype: "examGrid"
    }

	]
});