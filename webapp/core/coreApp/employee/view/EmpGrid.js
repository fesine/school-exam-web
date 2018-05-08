Ext.define("core.employee.view.EmpGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.empGrid",
    store: "core.employee.store.EmpStore",
    mixins: ['core.util.ConstsUtils'],
    selModel: {
        selType: "checkboxmodel"
    },
    border: 0,
    multiSelect: true,
    frame: true,
    viewConfig: {
        enableTextSelection: true//单元格内容可以被选中，便于复制
    },
    tbar: [
        {xtype: 'button',text:"刷新",ref:'refresh',  iconCls: 'table_refresh'},
        {xtype: 'button', text: '新增员工', ref: 'addEmp', iconCls: 'table_add'},
        {xtype: 'button', text: '修改员工', ref: 'updateEmp', iconCls: 'table_edit'},
        {xtype: 'button', text: '删除员工', ref: 'removeEmp', iconCls: 'table_remove'},
        "-上传员工信息-",
        {
            xtype: "form",
            style: 'border-width:0 0 0 0;',
            height: 22,
            items: [
                {
                    xtype: 'filefield', emptyText: '请选择excel文件', name: 'file',
                    ref: 'file', allowBlank: false, disabled: Ext.util.Cookies.get('hiddenMenu')
                }
            ]
        },

        {
            xtype: 'button', text: '上传', ref: 'upload', iconCls: 'upload',
            disabled: Ext.util.Cookies.get('hiddenMenu')
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        id: 'empPage',
        store: 'core.employee.store.EmpStore',
        dock: 'bottom',
        displayInfo: true,
        items: [
            {
                xtype: 'combobox',
                width: 45,
                forceSelection: true,
                mode: 'local',
                store: Ext.create("core.common.store.PageSizeStore", {}),
                displayField: 'id',
                valueField: 'pageSize',
                ref: 'empPageSize',
                value: 10
            }]
    },
    enableKeyNav: true,  //可以使用键盘控制上下
    columnLines: true, //展示竖线
    columns: [
        {xtype: 'rownumberer'},
        {text: "编号", dataIndex: "id", width: 50, border: 50},
        {text: "员工号", dataIndex: "pacteraNo", width: 100, border: 50},
        {text: "员工姓名", dataIndex: "name", width: 100, border: 50},
        {text: "性别", dataIndex: "sex", width: 100, border: 50,
            renderer: function (v) {
                var store = Ext.create("core.common.store.SexTypeStore", {});
                return store.findRecord("id", v).data["text"];
            }
        },
        {text: "卡号", dataIndex: "jobNo", width: 100, border: 50},
        {text: "手机", dataIndex: "cellphone", width: 100, border: 50},
        {text: "创建时间", dataIndex: "createTime", width: 180, border: 50,
            renderer: function (v) {
                var date = new Date(parseInt(v));
                return Ext.Date.format(date, 'Y年m月d日 H:i:s');
            }
        },
        {text: "更新时间", dataIndex: "updateTime", width: 180, border: 50,
            renderer: function (v) {
                var date = new Date(parseInt(v));
                return Ext.Date.format(date, 'Y年m月d日 H:i:s');
            }
        }

    ],
    initComponent: function () {
        this.callParent(arguments);
    }
});