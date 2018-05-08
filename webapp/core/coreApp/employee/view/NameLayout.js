/**用户管理视图布局类*/
Ext.define("core.employee.view.NameLayout", {
	extend : 'Ext.panel.Panel',
    id: 'nameLayout',
	alias : 'widget.nameLayout',
	title : "<center height=40>差错姓名管理</center>",
	closable:true,
	iconCls: 'tree_role_see',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"nameWindow"
	}, {
        xtype: "nameGrid"
    }

	]
});