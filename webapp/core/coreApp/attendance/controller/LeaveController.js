Ext.define("core.attendance.controller.LeaveController", {
    extend: "Ext.app.Controller",

    init: function () {
        var self = this;
        var url;
        var nameTemp;
        var updateReadOnly = function (form) {
            var name = form.getForm().findField("name");
            var pacteraNo = form.getForm().findField("pacteraNo");
            var status = form.getForm().findField("status");
            form.items.each(function (item) {
                if (status.getValue() === 1) {
                    item.readOnly = true;
                } else {
                    item.readOnly = false;
                }
            });
            name.readOnly = true;
            pacteraNo.readOnly = true;
            status.readOnly = true;
        };
        var resetForm = function (form) {
            form.getForm().reset();
            var name = form.getForm().findField("name");
            var pacteraNo = form.getForm().findField("pacteraNo");
            var status = form.getForm().findField("status");
            name.setValue(Ext.util.Cookies.get('userName'));
            pacteraNo.setValue(Ext.util.Cookies.get('pacteraNo'));
            status.setValue(0);
            name.readOnly = true;
            if (!Ext.util.Cookies.get('hiddenMenu')) {
                name.readOnly = false;
            }

        };
        var setDateTime = function (record, form) {
            var startTime = new Number(record.data.startTime);
            var endTime = new Number(record.data.endTime);
            form.getForm().findField("startDate").setValue(new Date(startTime));
            form.getForm().findField("endDate").setValue(new Date(endTime));
        };
        var editRecord = function (record) {
            var win = Ext.widget("leaveWindow");
            var form = win.down("form");
            //把选择的数据加载到form中去
            form.loadRecord(record);//加载数据
            setDateTime(record, form);
            var btn = form.down("button[ref=reset]");
            updateReadOnly(form);
            btn.disable();
            win.show();
        };
        var applyStatus = function (_btn, status) {
            var grid = _btn.up("leaveGrid");
            var records = grid.getSelectionModel().getSelection();
            if (!records) {
                Ext.Msg.alert("提示", "请至少选择一条数据!");
                return;
            }
            Ext.MessageBox.confirm(
                "请确认"
                , "确定" + (status === 1 ? "通过" : "拒绝") + "选中的请假申请吗？", function (btn) {
                    if (btn == 'yes') {
                        // 根据id删除多条记录
                        var data = [];
                        Ext.Array.each(records, function (model) {
                            data.push(Ext.JSON.encode(model.get('id')));
                        });
                        Ext.Ajax.request({
                            waitMsg: '正在进行处理,请稍后...',
                            url: _hostUrl + "/v1/leave/status/" + status,
                            params: {
                                overIds: data.join(',')
                            },
                            method: "PUT",
                            timeout: 10000,
                            success: function (response, opts) {
                                var resObj = Ext.decode(response.responseText);
                                if (resObj.code == 201) {
                                    var store = grid.getStore();
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
        };
        this.control({
            "leaveGrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    editRecord(record);
                }
            },
            /**
             * 修改用户,这个功能在保存按钮中完成， 要修改用户，请双击记录
             */
            "leaveGrid button[ref=updateLeave]": {
                click: function (_btn) {
                    var grid = _btn.up("leaveGrid");
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条数据!");
                        return;
                    }
                    editRecord(records[0]);
                }
            },
            /**
             * 通过申请
             */
            "leaveGrid button[ref=accept]": {
                click: function (_btn) {
                    applyStatus(_btn, 1);
                }
            },
            /**
             * 拒绝申请
             */
            "leaveGrid button[ref=refuse]": {
                click: function (_btn) {
                    applyStatus(_btn, 2);
                }
            },
            /**
             * 查找功能
             */
            "leaveGrid button[ref=search]": {
                click: function (_btn) {
                    var tbar = _btn.ownerCt;
                    var store = tbar.ownerCt.getStore();
                    var nameField = tbar.down("combobox[ref = nameKey]");
                    var nameKey = Ext.util.Cookies.get("userName");
                    if (nameField) {
                        nameKey = nameField.getValue();
                        if (nameKey != nameTemp) {
                            store.currentPage = 1;
                        }
                        if (null == nameKey || Ext.util.Format.trim(nameKey) == "") {
                            nameKey = null;
                        } else {
                            nameTemp = nameKey;
                        }
                    }
                    var dateKey = tbar.down("textfield[ref = dateKey]").value;
                    var statusKey = tbar.down("textfield[ref = statusKey]").value;
                    var dateStr;
                    if (null != dateKey) {
                        var format = 'Y-m-d H:i:s';
                        dateStr = Ext.Date.format(dateKey, format);
                    }

                    //临时设置请求地址
                    if (!url) {
                        url = store.getProxy().url;
                    }
                    //临时设置请求地址
                    store.getProxy().url = _hostUrl + "/v1/leaves/query";
                    store.getProxy().extraParams.name = nameKey;
                    store.getProxy().extraParams.dateStr = dateStr;
                    store.getProxy().extraParams.status = statusKey;
                    store.load();
                }
            },
            /**
             * 添加用户
             */
            "leaveGrid button[ref=addLeave]": {
                click: function (btn) {
                    var win = Ext.widget("leaveWindow");
                    win.setTitle("添加请假申请");
                    var form = win.down("form");
                    var btn = form.down("button[ref=reset]");
                    form.down("button[ref=save]").disable();
                    btn.enable(true);
                    // //清空数据
                    resetForm(form);
                    win.show();
                }
            },
            /**
             * 删除栏目
             */
            "leaveGrid button[ref=removeLeave]": {
                click: function (btn) {
                    var grid = btn.up("leaveGrid");
                    //你选择的将要删除的记录,判断选择的数据是否包含已经通过的。
                    var flag=true;
                    Ext.Array.some(grid.getSelectionModel().getSelection(), function (model) {
                        if(model.get('status') ===1){
                            flag=false;
                        }
                    });
                    if(!flag){
                        Ext.Msg.alert("异常", "已经通过的申请无法删除!");
                        return;
                    }
                    commonDelete(grid, "/v1/leaves");
                }
            },
            /**
             * 刷新按钮
             */
            "leaveGrid button[ref=refresh]": {
                click: function (btn) {
                    var grid = btn.ownerCt.ownerCt;
                    var store = grid.getStore();
                    var tbar = btn.ownerCt;
                    var nameField = tbar.down("combobox[ref = nameKey]");
                    var nameKey = Ext.util.Cookies.get("userName");
                    if (!url) {
                        url = store.getProxy().url;
                    }
                    if (nameField) {
                        nameKey = nameField.getValue();
                        if (null == nameKey || Ext.util.Format.trim(nameKey) == "") {
                            nameKey = Ext.util.Cookies.get("userName");
                            store.getProxy().url = url;
                        } else {
                            //临时设置请求地址
                            store.getProxy().url = _hostUrl + "/v1/leaves/query";
                            store.getProxy().extraParams.name = nameKey;
                        }
                    }
                    var dateKey = tbar.down("textfield[ref = dateKey]").value;
                    var dateStr;
                    if (!(null == dateKey)) {
                        var format = 'Y-m-d H:i:s';
                        dateStr = Ext.Date.format(dateKey, format);
                    }
                    store.getProxy().extraParams.name = nameKey;
                    store.getProxy().extraParams.dateStr = dateStr;
                    store.currentPage = 1;
                    store.load();
                }
            },
            //重置事件
            "leaveGrid button[ref=reset]": {
                click: function (btn) {
                    var tbar = btn.ownerCt;
                    var nameField = tbar.down("combobox[ref = nameKey]");
                    if (nameField) {
                        nameField.setValue("");
                    }
                    tbar.down("datefield[ref = dateKey]").setValue("");
                    tbar.down("combobox[ref = statusKey]").setValue("");
                    var store = tbar.ownerCt.getStore();
                    store.getProxy().url = url;
                }
            },
            /**
             * 添加菜单form的保存按钮
             */
            "leaveWindow button[ref=save]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var status = _form.getForm().findField("status").getValue();
                    if (status === 1) {
                        Ext.Msg.alert("提示", "通过的申请无法编辑保存!");
                        return;
                    }
                    var id = _form.getForm().findField("id").getValue();
                    var url = _hostUrl + "/v1/leave";
                    var method;
                    if (id == "" || null == id) {
                        method = "POST";
                    } else {
                        url = url + "/" + id;
                        method = "PUT";
                    }
                    var startTime = getTimeField(_form, 'startDate');
                    var endTime = getTimeField(_form, 'endDate');
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: true,
                        waitMsg: '正在进行处理,请稍后...',
                        url: url,
                        params: {
                            startDateStr: startTime,
                            endDateStr: endTime
                        },
                        method: method,
                        failure: function (form, action) {
                            //因为不再返回success，所以在failure中请求回调
                            var resObj = action.result;
                            if (resObj.code == 201) {
                                Ext.getCmp("leaveWindow").close();
                                var _grid = Ext.widget("leaveGrid");
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
            "leaveWindow button[ref=reset]": {
                click: function (btn) {
                    var form = btn.ownerCt.ownerCt;
                    resetForm(form);
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "leaveWindow button[ref=return]": {
                click: function (btn) {
                    Ext.getCmp("leaveWindow").close();
                }
            },
            "leaveGrid combobox[ref=leavePageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    var store = _this.up("leaveGrid").getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load();//用来加载数据
                }
            }
        });
    },
    views: [
        "core.attendance.view.LeaveLayout",
        "core.attendance.view.LeaveGrid",
        "core.attendance.view.LeaveWindow"
    ],
    stores: ["core.attendance.store.LeaveStore"],
    models: ["core.attendance.model.LeaveModel"]
});
//计算加班时间
setTimeCount = function (obj) {
    var _form = obj.ownerCt;
    var timeCount = _form.getForm().findField('dayCount');
    var startTime = getTimeField(_form, 'startDate');
    var endTime = getTimeField(_form, 'endDate');
    //结束时间戳
    if (null === startTime || null === endTime) {
        return;
    }
    var startNum = stringParseDate(startTime).getTime();
    var endNum = stringParseDate(endTime).getTime();
    var count = endNum - startNum;
    if (count < 0) {
        _form.down("button[ref=save]").disable();
        Ext.Msg.alert("提示", "结束日期不能小于开始日期!");
    } else {
        timeCount.setValue(count / (1000 * 60 * 60 * 24));
    }
};

getTimeField = function (_form, date) {
    var dateFormat = 'Y-m-d';
    var dateValue = _form.getForm().findField(date).getValue();
    if (null === dateValue) {
        return null;
    }
    var startDate = Ext.Date.format(dateValue, dateFormat);
    return startDate;

};

stringParseDate = function (dateStr) {
    var dateTimeFormat = 'Y-m-d';
    return Ext.Date.parse(dateStr, dateTimeFormat);
}