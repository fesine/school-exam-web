/**
 * Created by Fesine on 2017/6/8.
 */
Ext.define("core.common.store.LeaveTypeStore", {
    alias: 'widget.leaveTypeStore',
    extend: 'Ext.data.ArrayStore',
    fields: ["id", "text"],
    data: [
        [1, '事假'],
        [2, '病假'],
        [3, '年假'],
        [4, '调休'],
        [5, '婚假'],
        [6, '产假'],
        [7, '陪产假'],
        [8, '路途假'],
        [9, '其他']
    ]
});