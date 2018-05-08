Ext.define("core.system.view.RightMenu", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.funproject',
    initComponent: function () {
        var me = this;
        me.rightActionMenu = Ext.create('Ext.menu.Menu', {
            name: 'rightActionMenu',
            autoDestroy: true,
            items: [
                {
                    text: '新增项目',
                    iconCls: 'icon_add',
                    action: 'menuaddProjectInfo'
                }, {
                    text: '修改',
                    iconCls: 'icon_edit',
                    action: 'menueditProjectInfo'
                }, {
                    text: '删除',
                    iconCls: 'icon_delete',
                    action: 'menudelProjectInfo'
                }, '-', {
                    text: '项目状态参数',
                    action: 'menuProjectProcess'
                }, {
                    text: '财务参数',
                    action: 'menuAddProFinanceParam'
                }, '-', {
                    text: '货款等支付清单',
                    action: 'menuProjectCostInList'
                }, {
                    text: '回款清单',
                    action: 'menuProjectCostReList'
                }, {
                    text: '利润支付',
                    action: 'menuProjectPayList'
                }
            ],
            listeners: {
                click: function (menu, item) {
                    me.fireEvent('menuAction', me, item);
                }
            },
            onDestroy: function () {
                this.rightActionMenu.destroy();
                this.callParent(arguments);
            }
        });
    }
});