/**
 * 程序布局放在中间的部分
 */
//将/core/coreApp/ux定义为Ext.ux包名
Ext.Loader.setPath({
    'Ext.ux': '/core/coreApp/ux'
});
Ext.define("core.app.view.CenterView",{
	extend: 'Ext.tab.Panel',
	alias: 'widget.centerview',
	id:'centerid',
	border : 0,
	bodyStyle: 'padding:0px',
	menuAlign:"center",
	requires:['Ext.ux.TabCloseMenu'],
	items:[{
		title:'<center height=40>首页</center>',
		iconCls:'home',
		bodyPadding :5,
		layout:'fit',
		items:{
			html: "<iframe width=100% height=100% src='jsp/readme.html' frameborder='no'" +
			" border=0 marginwidth=10 marginheight=0 scrolling='no' allowtransparency='yes'/>"
		},
		tabConfig  : {//标签配置参数
			
        }
	}],
    plugins: new Ext.create('Ext.ux.TabCloseMenu', {

        closeTabText: '关闭面板',

        closeOthersTabsText: '关闭其他',

        closeAllTabsText: '关闭所有'

    }),
	initComponent:function(){
		this.callParent(arguments);
	}
});