Ext.define("core.student.controller.StudentController", {
    extend: "Ext.app.Controller",

    init: function () {
        var self = this;
        var url;
        var nameTemp;

        var setDateTime = function (record, form) {
            var startTime = new Number(record.data.stuBirthday);
            form.getForm().findField("stuBirthdayStr").setValue(new Date(startTime));
        };
        var editRecord = function (record) {
            var win = Ext.widget("studentWindow");
            var form = win.down("form");
            //把选择的数据加载到form中去
            form.loadRecord(record);//加载数据
            setDateTime(record, form);
            var btn = form.down("button[ref=reset]");
            btn.disable();
            win.show();
        };
        this.control({
            "studentGrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    if (Ext.util.Cookies.get('grade') < 1) {
                        return;
                    }
                    editRecord(record);
                }
            },
            /**
             * 修改学生,这个功能在保存按钮中完成， 要修改用户，请双击记录
             */
            "studentGrid button[ref=updateStudent]": {
                click: function (_btn) {
                    var grid = _btn.up("studentGrid");
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条数据!");
                        return;
                    }
                    editRecord(records[0]);
                }
            },
            /**
             * 添加学生
             */
            "studentGrid button[ref=addStudent]": {
                click: function (btn) {
                    var win = Ext.widget("studentWindow");
                    win.setTitle("添加学生信息");
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
             * 删除栏目
             */
            "studentGrid button[ref=removeStudent]": {
                click: function (btn) {
                    var grid = btn.up("studentGrid");
                    commonDelete(grid, "/v1/students");
                }
            },
            /**
             * 刷新按钮
             */
            "studentGrid button[ref=refresh]": {
                click: function (btn) {
                    var grid = btn.ownerCt.ownerCt;
                    var store = grid.getStore();
                    store.currentPage = 1;
                    store.load();
                }
            },
            /**
             * 查找功能
             */
            "studentGrid button[ref=search]": {
                click: function (_btn) {
                    var tbar = _btn.ownerCt;
                    var store = tbar.ownerCt.getStore();
                    var stuNoKey = tbar.down("textfield[ref = stuNoKey]").value;
                    var stuNameKey = tbar.down("textfield[ref = stuNameKey]").value;
                    store.load({
                        params: {stuNo: stuNoKey, stuName: stuNameKey}
                    });
                }
            },
            //重置事件
            "studentGrid button[ref=reset]": {
                click: function (btn) {
                    var tbar = btn.ownerCt;
                    tbar.down("textfield[ref = stuNoKey]").setValue("");
                    tbar.down("textfield[ref = stuNameKey]").setValue("");
                    var store = tbar.ownerCt.getStore();
                }
            },
            /**
             * 添加菜单form的保存按钮
             */
            "studentWindow button[ref=save]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var id = _form.getForm().findField("id").getValue();
                    var _url = _hostUrl + "/v1/student";
                    var method;
                    if (id == "" || null == id) {
                        method = "POST";
                    } else {
                        _url = _url + "/" + id;
                        method = "PUT";
                    }
                    var dateTime = getTimeField(_form, 'stuBirthdayStr');
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: true,
                        waitMsg: '正在进行处理,请稍后...',
                        url: _url,
                        params: {
                            dateStr: dateTime
                        },
                        method: method,
                        failure: function (form, action) {
                            //因为不再返回success，所以在failure中请求回调
                            var resObj = action.result;
                            if (resObj.code == 201) {
                                Ext.getCmp("studentWindow").close();
                                var _grid = Ext.widget("studentGrid");
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
            "studentWindow button[ref=reset]": {
                click: function (btn) {
                    var form = btn.ownerCt.ownerCt;
                    form.getForm().reset();
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "studentWindow button[ref=return]": {
                click: function (btn) {
                    Ext.getCmp("studentWindow").close();
                }
            },

            "studentGrid combobox[ref=studentPageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    var store = _this.up("studentGrid").getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load();//用来加载数据
                }
            }
        });
    },
    views: [
        "core.student.view.StudentLayout",
        "core.student.view.StudentGrid",
        "core.student.view.StudentWindow"
    ],
    stores: ["core.student.store.StudentStore"],
    models: ["core.student.model.StudentModel"]
});

getTimeField = function (_form, date) {
    var dateFormat = 'Y年m月d日';
    var dateValue = _form.getForm().findField(date).getValue();
    if (null === dateValue) {
        return null;
    }
    var startDate = Ext.Date.format(dateValue, dateFormat);
    return startDate;

};