/**用户管理视图布局类*/
Ext.define("core.user.view.UserLayout", {
	extend : 'Ext.panel.Panel',
    id: 'userlayout',
	alias : 'widget.userlayout',
	title : "<center height=40>用户基本信息</center>",
	closable:true,
	iconCls: 'username',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"usergrid"
	}]
});