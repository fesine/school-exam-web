/**用户管理视图布局类*/
Ext.define("core.system.view.AuthLayout", {
	extend : 'Ext.panel.Panel',
    id: 'authLayout',
	alias : 'widget.authLayout',
	title : "<center height=40>用户管理</center>",
	closable:true,
	iconCls: 'table_login',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"authWindow"
	}, {
        xtype: "authGrid"
    }

	]
});