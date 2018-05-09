Ext.define("core.exam.controller.ExamController", {
    extend: "Ext.app.Controller",
    requires:['core.common.controller.CommonCRUD'],

    init: function () {
        var self = this;
        var setDateTime = function (record, form) {
            var startTime = new Number(record.data.startTime);
            var endTime = new Number(record.data.endTime);
            form.getForm().findField("startDate").setValue(new Date(startTime));
            form.getForm().findField("startTimeStr").setValue(new Date(startTime));
            form.getForm().findField("endTimeStr").setValue(new Date(endTime));
        };
        this.control({
            "examGrid": {
                itemdblclick: function (_grid, record, item, index, e, eOpts) {
                    var win = Ext.widget("examWindow");
                    var form = win.down("form");
                    //把选择的数据加载到form中去
                    setDateTime(record,form);
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
            "examGrid button[ref=addExam]": {
                click: function (btn) {
                    var win = Ext.widget("examWindow");
                    win.setTitle("添加考试信息");
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
            "examGrid button[ref=updateExam]": {
                click: function (_btn) {
                    var grid = _btn.up("examGrid");
                    var records = grid.getSelectionModel().getSelection();
                    if (!records || records.length != 1) {
                        Ext.Msg.alert("提示", "请选择一条数据!");
                        return;
                    }
                    var win = Ext.widget("examWindow");
                    var form = win.down("form");
                    var btn = form.down("button[ref=reset]");
                    form.down("button[ref=save]").enable();
                    btn.disable();
                    //把选择的数据加载到form中去
                    setDateTime(records[0], form);
                    form.loadRecord(records[0]);//加载数据，第1条
                    win.show();
                }
            },
            /**
             * 删除栏目
             */
            "examGrid button[ref=removeExam]": {
                click: function (btn) {
                    var grid = btn.up("examGrid");
                    //你选择的将要删除的记录
                    commonDelete(grid, "/v1/exams");
                }
            },
            /**
             * 刷新按钮
             */
            "examGrid button[ref=refresh]": {
                click: function (btn) {
                    var grid = btn.ownerCt.ownerCt;
                    var store = grid.getStore();
                    store.load();
                }
            },
            /**
             * 添加菜单form的保存按钮
             */
            "examWindow button[ref=save]": {
                click: function (btn) {
                    //1获得form
                    var _form = btn.ownerCt.ownerCt;
                    var id = _form.getForm().findField("id").getValue();
                    var url = _hostUrl + "/v1/exam";
                    var method;
                    if (id == "" || null == id) {
                        method = "POST";
                    } else {
                        url = url + "/" + id;
                        method = "PUT";
                    }
                    var startTime = getTimeField(_form, 'startDate', 'startTimeStr');
                    var endTime = getTimeField(_form, 'startDate', 'endTimeStr');
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
                                Ext.getCmp("examWindow").close();
                                var _grid = Ext.widget("examGrid");
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
            "examWindow button[ref=reset]": {
                click: function (btn) {
                    var form = btn.ownerCt.ownerCt;
                    form.getForm().reset();
                }
            },
            /**
             * 添加用户form的返回按钮
             */
            "examWindow button[ref=return]": {
                click: function (btn) {
                    Ext.getCmp("examWindow").close();
                }
            },
            "examGrid combobox[ref=examPageSize]": {
                change: function (_this, newValue, oldValue, eOpts) {
                    var store = _this.up("examGrid").getStore();
                    store.pageSize = newValue;//设值新分页大小
                    store.currentPage = 1;//每次都从第一页开始加载
                    store.load();//用来加载数据
                }
            }
        });
    },
    views: [
        "core.exam.view.ExamLayout",
        "core.exam.view.ExamGrid",
        "core.exam.view.ExamWindow"
    ],
    stores: ["core.exam.store.ExamStore"],
    models: ["core.exam.model.ExamModel"]
});
//获取课程列表
getCourseName = function (obj) {
    var _form = obj.ownerCt;
    var gradeId = _form.getForm().findField('gradeId').value;
    var courseId = _form.getForm().findField('courseId');
    courseId.getStore().load({
        params:{
            gradeId:gradeId,
            limit:1000
        }
    });
};
//计算加班时间
setTimeCount = function (obj) {
    var _form = obj.ownerCt;
    var startTime = getTimeField(_form, 'startDate', 'startTimeStr');
    var endTime = getTimeField(_form, 'startDate', 'endTimeStr');
    //结束时间戳
    if (null === startTime || null === endTime) {
        return;
    }
    var startNum = stringParseDate(startTime).getTime();
    var endNum = stringParseDate(endTime).getTime();
    var count = endNum - startNum;
    if (count < 0) {
        _form.down("button[ref=save]").disable();
        Ext.Msg.alert("提示", "结束时间不能小于开始时间!");
    }
};

getTimeField = function (_form, date, time) {
    var dateFormat = 'Y-m-d';
    var timeFormat = ' H:i:s';

    var dateValue = _form.getForm().findField(date).getValue();
    var timeValue = _form.getForm().findField(time).getValue();
    if (null === dateValue
        || null === timeValue) {
        return null;
    }
    var startDate = Ext.Date.format(dateValue, dateFormat);
    var startTimeStr = Ext.Date.format(timeValue, timeFormat);
    return startDate + startTimeStr;

};

stringParseDate = function (dateStr) {
    var dateTimeFormat = 'Y-m-d H:i:s';
    return Ext.Date.parse(dateStr, dateTimeFormat);
}
