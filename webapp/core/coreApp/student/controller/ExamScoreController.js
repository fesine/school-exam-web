Ext.define("core.student.controller.ExamScoreController", {
    extend: "Ext.app.Controller",

    init: function () {
        var self = this;
        var url;
        var nameTemp;

        var editRecord = function (record) {
            var win = Ext.widget("examScoreUpdateWindow");
            var form = win.down("form");
            //把选择的数据加载到form中去
            form.loadRecord(record);//加载数据
            var btn = form.down("button[ref=reset]");
            btn.disable();
            win.show();
        };
        this.control({
            "examScoreGrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    editRecord(record);
                }
            },
            /**
             * 修改课程,这个功能在保存按钮中完成， 要修改用户，请双击记录
             */
            "examScoreGrid button[ref=updateExamScore]": {
                click: function (_btn) {
                    var grid = _btn.up("examScoreGrid");
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条数据!");
                        return;
                    }
                    editRecord(records[0]);
                }
            },
            /**
             * 添加课程
             */
            "examScoreGrid button[ref=addExamScore]": {
                click: function (btn) {
                    var win = Ext.widget("examScoreUpdateWindow");
                    win.setTitle("添加成绩信息");
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
            "examScoreGrid button[ref=removeExamScore]": {
                click: function (btn) {
                    var grid = btn.up("examScoreGrid");
                    commonDelete(grid, "/v1/examScores");
                }
            },
            /**
             * 刷新按钮
             */
            "examScoreGrid button[ref=refresh]": {
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
            "examScoreGrid button[ref=search]": {
                click: function (_btn) {
                    var tbar = _btn.ownerCt;
                    var store = tbar.ownerCt.getStore();
                    var stuNoKey = tbar.down("textfield[ref = stuNoKey]").value;
                    var stuNameKey = tbar.down("textfield[ref = stuNameKey]").value;
                    var gradeKey = tbar.down("combobox[ref = gradeKey]").value;
                    var classroomKey = tbar.down("combobox[ref = classroomKey]").value;
                    var courseKey = tbar.down("combobox[ref = courseKey]").value;
                    if (null == stuNoKey || Ext.util.Format.trim(stuNoKey) == ""){
                        stuNoKey = null;
                    }
                    if (null == stuNameKey || Ext.util.Format.trim(stuNameKey) == ""){
                        stuNameKey = null;
                    }
                    store.load({
                        params: {
                            stuNo: stuNoKey,
                            stuName: stuNameKey,
                            gradeId: gradeKey,
                            classroomId: classroomKey,
                            courseId: courseKey
                        }
                    });
                }
            },
            //重置事件
            "examScoreGrid button[ref=reset]": {
                click: function (btn) {
                    var tbar = btn.ownerCt;
                    tbar.down("textfield[ref = stuNoKey]").setValue("");
                    tbar.down("textfield[ref = stuNameKey]").setValue("");
                    tbar.down("textfield[ref = gradeKey]").setValue("");
                    tbar.down("textfield[ref = classroomKey]").setValue("");
                    tbar.down("textfield[ref = courseKey]").setValue("");
                    tbar.down("textfield[ref = courseKey]").disable();
                }
            },
            /**
             * 添加菜单form的保存按钮
             */
            "examScoreUpdateWindow button[ref=save]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var id = _form.getForm().findField("id").getValue();
                    var _url = _hostUrl + "/v1/examScore";
                    var method;
                    if (id == "" || null == id) {
                        method = "POST";
                    } else {
                        _url = _url + "/" + id;
                        method = "PUT";
                    }
                    //2.把数据保存到数据库中去
                    _form.submit({
                        clientValidation: true,
                        waitMsg: '正在进行处理,请稍后...',
                        url: _url,
                        method: method,
                        failure: function (form, action) {
                            //因为不再返回success，所以在failure中请求回调
                            var resObj = action.result;
                            if (resObj.code == 201) {
                                Ext.getCmp("examScoreUpdateWindow").close();
                                var _grid = Ext.widget("examScoreGrid");
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
            "examScoreUpdateWindow button[ref=reset]": {
                click: function (btn) {
                    var form = btn.ownerCt.ownerCt;
                    form.getForm().reset();
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "examScoreUpdateWindow button[ref=return]": {
                click: function (btn) {
                    Ext.getCmp("examScoreUpdateWindow").close();
                }
            },

            "examScoreGrid combobox[ref=examScorePageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    var store = _this.up("examScoreGrid").getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load();//用来加载数据
                }
            }
        });
    },
    views: [
        "core.student.view.ExamScoreLayout",
        "core.student.view.ExamScoreGrid",
        "core.student.view.ExamScoreUpdateWindow"
    ],
    stores: ["core.student.store.ExamScoreStore"],
    models: ["core.student.model.ExamScoreModel"]
});
getTimeField = function (_form, date) {
    var dateFormat = 'Y-m-d';
    var dateValue = _form.getForm().findField(date).getValue();
    if (null === dateValue) {
        return null;
    }
    var startDate = Ext.Date.format(dateValue, dateFormat);
    return startDate;
};
getTimeFormat = function (dateValue, dateFormat) {
    if (null === dateValue) {
        return null;
    }
    var startDate = Ext.Date.format(dateValue, dateFormat);
    return startDate;
};
//获取学生列表
getStudentName = function (obj) {
    var _form = obj.ownerCt;
    var gradeId = _form.getForm().findField('gradeId').value;
    var classroomId = _form.getForm().findField('classroomId').value;
    var stuNo = _form.getForm().findField('stuNo');
    stuNo.getStore().load({
        params: {
            gradeId: gradeId,
            classroomId: classroomId,
            limit: 1000
        }
    });
};
//获取课程列表
getCourseName = function (obj) {
    var gradeId = obj.ownerCt.down("textfield[ref = gradeKey]").value;
    var courseId = obj.ownerCt.down("textfield[ref = courseKey]");
    courseId.getStore().load({
        params: {
            gradeId: gradeId,
            limit: 1000
        }
    });
};