/**用户管理视图布局类*/
Ext.define("core.system.view.SysLayout", {
	extend : 'Ext.panel.Panel',
    id: 'sysLayout',
	alias : 'widget.sysLayout',
	title : "<center height=40>个人信息</center>",
	closable:true,
	iconCls: 'password',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"sysWindow"
	}, {
        xtype: "sysGrid"
    }

	]
});