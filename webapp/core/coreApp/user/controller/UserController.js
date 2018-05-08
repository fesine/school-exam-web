Ext.define("core.user.controller.UserController", {
    extend: "Ext.app.Controller",

    init: function () {
        var self = this;

        function addOrUpdateData(record) {
            var win = Ext.widget("userWindow");
            var form = win.down("form");
            var item = Ext.getCmp('userName');
            item.setReadOnly(true);
            var ps = form.getForm().findField("password");
            var psc = form.getForm().findField("checkPwd");
            ps.allowBlank = true;
            psc.allowBlank = true;
            ps.hide();
            psc.hide();
            form.down("image").setSrc(uploadFileRoot + record.get("headPhoto"));
            //把选择的数据加载到form中去
            form.loadRecord(record);//加载数据，第1条
            var btn = form.down("button[ref=reset]");
            form.down("button[ref=save]").formBind = false;
            form.down("button[ref=save]").enable();

            btn.disable();
            win.show();
        }

        this.control({
            /**
             * 添加用户
             */
            "usergrid button[ref=addUser]": {
                click: function (btn) {
                    var win = Ext.widget("userWindow");
                    win.setTitle("用户信息新增");
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
            "usergrid button[ref=updateUser]": {
                click: function (btn) {
                    var grid = btn.up("usergrid");
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条数据!");
                        return;
                    }
                    var record = records[0];
                    addOrUpdateData(record);

                }
            },

            /**
             * 添加用户form的保存按钮
             */
            "userWindow button[ref=save]": {
                click: function (btn) {

                    //根据id值来做判断，如果id为null说明是做添加操作，否则就是做修改操作
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var _grid = Ext.widget("usergrid");
                    var id = _form.getForm().findField("id").getValue();
                    var url = "";
                    if (id == "" || null == id) {
                        url = "userInfo/addUserInfo";
                    } else {
                        url = "userInfo/updateUserInfo";
                    }
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: false,
                        waitMsg: '正在进行处理,请稍后...',
                        url: url,
                        method: 'POST',
                        success: function (form, action) {
                            var resObj = Ext.decode(action.response.responseText);
                            if (resObj.success) {
                                //3.把这条数据加到grid中
                                var store = _grid.getStore();
                                store.load({
                                    start: store.start,
                                    limit: store.limit
                                });
                                Ext.getCmp("userWindow").close();
                                _grid.show();
                                Ext.Msg.alert("提示", resObj.msg);
                            } else {
                                Ext.Msg.alert("提示", resObj.msg);
                            }
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert("错误", "表单数据处理有误，无法请求到后台!");
                        }
                    });

                }
            },

            //重置事件
            "userWindow button[ref=reset]": {
                click: function (btn) {
                    var form = btn.ownerCt.ownerCt;
                    form.getForm().reset();
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "userWindow button[ref=return]": {
                click: function (btn) {
                    Ext.getCmp("userWindow").close();
                }
            },

            /**
             * 删除用户
             */
            "usergrid button[ref=removeUser]": {
                click: function (btn) {
                    var grid = btn.up("usergrid");
                    var store = grid.getStore();
                    //你选择的将要删除的记录
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length <= 0) {
                        Ext.Msg.alert("提示", "请选择需要删除的数据!");
                        return;
                    }
                    Ext.MessageBox.confirm(
                        "请确认"
                        , "确定删除[<font color=red>" + records.length + "</font>]个用户吗？"
                        , function (btn) {//异步执行，删除方法需要在判断条件内执行
                            if (btn == 'yes') {
                                // 根据id删除多条记录
                                var data = [];
                                Ext.Array.each(records, function (model) {
                                    data.push(Ext.JSON.encode(model.get('id')));
                                });
                                Ext.Ajax.request({
                                    waitMsg: '正在进行处理,请稍后...',
                                    url: "userInfo/deleteUserInfo",
                                    params: {
                                        userIds: data.join(",")
                                    },// 根据id删除
                                    method: "POST",
                                    timeout: 4000,
                                    success: function (response, opts) {
                                        var resObj = Ext.decode(response.responseText);
                                        if (resObj.success) {
                                            store.load();
                                            Ext.Msg.alert("提示", resObj.msg);
                                        } else {
                                            Ext.Msg.alert("提示", resObj.msg);
                                        }
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
             * 双击进入form，修改信息
             */
            "usergrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    addOrUpdateData(record);
                }

            },

            "usergrid combobox[id=userPageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    var store = _this.up("usergrid").getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load();//用来加载数据
                }
            }
        });
    },
    views: [
        "core.user.view.UserLayout",
        "core.user.view.UserGrid",
        "core.user.view.UserWindow"
    ],
    stores: ["core.user.store.UserStore"],
    models: ["core.user.model.UserModel"]
});