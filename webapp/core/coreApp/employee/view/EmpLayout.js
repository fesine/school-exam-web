/**用户管理视图布局类*/
Ext.define("core.employee.view.EmpLayout", {
	extend : 'Ext.panel.Panel',
    id: 'empLayout',
	alias : 'widget.empLayout',
	title : "<center height=40>员工管理</center>",
	closable:true,
	iconCls: 'employees',
	defaults : {
		bodyStyle : 'padding:1px'
	},
	layout : 'fit',
	items:[{
		xtype:"empWindow"
	}, {
        xtype: "empGrid"
    }

	]
});