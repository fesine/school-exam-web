Ext.define("core.employee.controller.NameController", {
    extend: "Ext.app.Controller",

    init: function () {
        var self = this;
        this.control({
        "nameGrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    var win = Ext.widget("nameWindow");
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
            "nameGrid button[ref=addName]": {
                click: function (btn) {
                    var win = Ext.widget("nameWindow");
                    win.setTitle("添加差错信息");
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
            "nameGrid button[ref=updateName]": {
                click: function (_btn) {
                    var grid = _btn.up("nameGrid");
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条数据!");
                        return;
                    }
                    var win = Ext.widget("nameWindow");
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
            "nameGrid button[ref=removeName]": {
                click: function (btn) {
                    var grid = btn.up("nameGrid");
                    var store = grid.getStore();
                    //你选择的将要删除的记录
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条需要删除的数据!");
                        return;
                    }
                    Ext.MessageBox.confirm(
                        "请确认"
                        , "确定删除[<font color=red>" + records[0].data.empName + "</font>]吗？"
                        , function (btn) {//异步执行，删除方法需要在判断条件内执行
                            if (btn == 'yes') {
                                Ext.Ajax.request({
                                    waitMsg: '正在进行处理,请稍后...',
                                    url: _hostUrl+"/v1/name/"+ records[0].data.id,
                                    method: "DELETE",
                                    timeout: 4000,
                                    success: function (response, opts) {
                                        var resObj = Ext.decode(response.responseText);
                                        if (resObj.code==204) {
                                            store.load();
                                            Ext.Msg.alert("提示", resObj.msg);
                                        } else {
                                            Ext.Msg.alert("提示", resObj.msg);
                                        }
                                    },
                                    failure:function (response,opts) {
                                        Ext.Msg.alert("提示", "服务器异常!");
                                    }
                                });
                            } else {
                                return;
                            }
                        }
                    );


                }
            },
            /**
             * 刷新按钮
             */
            "nameGrid button[ref=refresh]": {
                click: function (btn) {
                    var grid = btn.ownerCt.ownerCt;
                    var store = grid.getStore();
                    store.load();
                }
            },
            /**
             * 添加菜单form的保存按钮
             */
            "nameWindow button[ref=save]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var id = _form.getForm().findField("id").getValue();
                    var url= _hostUrl + "/v1/name";
                    var method;
                    if (id == "" || null == id) {
                        method = "POST";
                    } else {
                        url =url+"/"+id;
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
                                Ext.getCmp("nameWindow").close();
                                var _grid = Ext.widget("nameGrid");
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
            "nameWindow button[ref=reset]": {
                click: function (btn) {
                    var form = btn.ownerCt.ownerCt;
                    form.getForm().reset();
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "nameWindow button[ref=return]": {
                click: function (btn) {
                    Ext.getCmp("nameWindow").close();
                }
            },
            "nameGrid combobox[ref=namePageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    var store = _this.up("nameGrid").getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load();//用来加载数据
                }
            }
        });
    },
    views: [
        "core.employee.view.NameLayout",
        "core.employee.view.NameGrid",
        "core.employee.view.NameWindow"
    ],
    stores: ["core.employee.store.NameStore"],
    models: ["core.employee.model.NameModel"]
});