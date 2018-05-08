/**用户管理视图布局类*/
Ext.define("core.system.view.MenuLayout", {
	extend : 'Ext.panel.Panel',
    id: 'menuLayout',
	alias : 'widget.menuLayout',
	title : "<center height=40>栏目管理</center>",
	closable:true,
	iconCls: 'salesOrder',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"menuWindow"
	}, {
        xtype: "menuGrid"
    }

	]
});