/**用户管理视图布局类*/
Ext.define("core.exam.view.CoursePointLayout", {
	extend : 'Ext.panel.Panel',
    id: 'coursePointLayout',
	alias : 'widget.coursePointLayout',
	title : "<center height=40>知识点管理</center>",
	closable:true,
	iconCls: 'employees',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"coursePointWindow"
	}, {
        xtype: "coursePointGrid"
    }

	]
});