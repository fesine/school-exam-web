Ext.define("core.employee.controller.EmpController", {
    extend: "Ext.app.Controller",
    requires:['core.common.controller.CommonCRUD'],

    init: function () {
        var self = this;
        this.control({
            /**
             * 上传文件
             */
            "empGrid button[ref=upload]": {
                click: function (_btn) {
                    var tbar = _btn.ownerCt;
                    var file = tbar.down("filefield[ref = file]").getValue();
                    if (null == file || Ext.util.Format.trim(file) == "") {
                        Ext.Msg.alert("提示", "请选择文件！");
                        return;
                    }
                    //1获得form
                    var _form = tbar.down("form");
                    var url = _hostUrl + "/v1/employee/file";
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: false,
                        waitMsg: '正在进行处理,请稍后...',
                        url: url,
                        method: 'POST',
                        failure: function (form, action) {
                            var resObj = action.result;
                            if (resObj.code == 200) {
                                var store = tbar.ownerCt.getStore();
                                store.load();
                                Ext.Msg.alert("提示", resObj.msg);
                            } else {
                                Ext.Msg.alert("提示", resObj.msg);
                            }
                        }
                    });

                }
            },
            "empGrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    var win = Ext.widget("empWindow");
                    var form = win.down("form");
                    //把选择的数据加载到form中去
                    form.loadRecord(record);//加载数据
                    var btn = form.down("button[ref=reset]");
                    form.down("button[ref=save]").enable();
                    btn.disable();
                    win.show();
                }

            },
            /**
             * 添加用户
             */
            "empGrid button[ref=addEmp]": {
                click: function (btn) {
                    var win = Ext.widget("empWindow");
                    win.setTitle("添加员工信息");
                    var form = win.down("form");
                    var btn = form.down("button[ref=reset]");
                    form.down("button[ref=save]").disable();
                    btn.enable(true);
                    // //清空数据
                    form.getForm().reset();
                    win.show();
                }
            },
            /**
             * 修改用户,这个功能在保存按钮中完成， 要修改用户，请双击记录
             */
            "empGrid button[ref=updateEmp]": {
                click: function (_btn) {
                    var grid = _btn.up("empGrid");
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条数据!");
                        return;
                    }
                    var win = Ext.widget("empWindow");
                    var form = win.down("form");
                    var btn = form.down("button[ref=reset]");
                    form.down("button[ref=save]").enable();
                    btn.disable();
                    //把选择的数据加载到form中去
                    form.loadRecord(records[0]);//加载数据，第1条
                    win.show();
                }
            },
            /**
             * 删除栏目
             */
            "empGrid button[ref=removeEmp]": {
                click: function (btn) {
                    var grid = btn.up("empGrid");
                    //你选择的将要删除的记录
                    commonDelete(grid, "/v1/employees");
                }
            },
            /**
             * 刷新按钮
             */
            "empGrid button[ref=refresh]": {
                click: function (btn) {
                    var grid = btn.ownerCt.ownerCt;
                    var store = grid.getStore();
                    store.load();
                }
            },
            /**
             * 添加菜单form的保存按钮
             */
            "empWindow button[ref=save]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var id = _form.getForm().findField("id").getValue();
                    var url = _hostUrl + "/v1/employee";
                    var method;
                    if (id == "" || null == id) {
                        method = "POST";
                    } else {
                        method = "PUT";
                    }
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: true,
                        waitMsg: '正在进行处理,请稍后...',
                        url: url,
                        method: method,
                        failure: function (form, action) {
                            //因为不再返回success，所以在failure中请求回调
                            var resObj = action.result;
                            if (resObj.code == 201) {
                                Ext.getCmp("empWindow").close();
                                var _grid = Ext.widget("empGrid");
                                var store = _grid.getStore();
                                store.load();
                                _grid.show();
                                Ext.Msg.alert("提示", resObj.msg);
                            } else {
                                Ext.Msg.alert("提示", resObj.msg);
                            }
                        }
                    });

                }
            },

            //重置事件
            "empWindow button[ref=reset]": {
                click: function (btn) {
                    var form = btn.ownerCt.ownerCt;
                    form.getForm().reset();
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "empWindow button[ref=return]": {
                click: function (btn) {
                    Ext.getCmp("empWindow").close();
                }
            },
            "empGrid combobox[ref=empPageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    var store = _this.up("empGrid").getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load();//用来加载数据
                }
            }
        });
    },
    views: [
        "core.employee.view.EmpLayout",
        "core.employee.view.EmpGrid",
        "core.employee.view.EmpWindow"
    ],
    stores: ["core.employee.store.EmpStore"],
    models: ["core.employee.model.EmpModel"]
});