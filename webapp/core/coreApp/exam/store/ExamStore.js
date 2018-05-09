/*
 * ClassName 用户数据集
 */
Ext.define("core.exam.store.ExamStore", {
    alias: 'widget.examStore',
    extend: 'Ext.data.Store',
    model: 'core.exam.model.ExamModel',
    pageSize: 20,
    proxy: {
        type: "ajax",
        url: _hostUrl+"/v1/exams",
        reader: {
            type: "json",
            root: "data.resultList",
            totalProperty: 'data.totalRecord',
            messageProperty: 'error'
        },
        writer: {
            type: "json"
        }
    },
    constructor: function () {
        var me = this;
        me.callParent(arguments);
        me.on("load", function (records, operation, success) {
            if (success === false) {
                checkLogin();
            }
        });
    },
    autoLoad: true
});