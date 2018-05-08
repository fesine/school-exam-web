/**用户管理视图布局类*/
Ext.define("core.system.view.CodeLayout", {
	extend : 'Ext.panel.Panel',
    id: 'codeLayout',
	alias : 'widget.codeLayout',
	title : "<center height=40>代码管理</center>",
	closable:true,
	iconCls: 'salesOrder',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"codeWindow"
	}, {
        xtype: "codeGrid"
    }

	]
});