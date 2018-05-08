/**
 * Created by Fesine on 2017/6/8.
 */
Ext.define("core.common.store.ErrorTypeStore", {
    alias: 'widget.errorTypeStore',
    extend: 'Ext.data.ArrayStore',
    fields: ["id", "text"],
    data: [
        [0, '迟到'],
        [1, '下班未打卡'],
        [2, '上班未打卡'],
        [3, '缺勤'],
        [4, '上班考勤失败'],
        [5, '下班考勤失败']
    ]
});