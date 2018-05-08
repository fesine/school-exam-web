/**
 * Created by Fesine on 2017/6/8.
 */
Ext.define("core.common.store.DataStatusStore", {
    alias: 'widget.adjustFlagFlagStore',
    extend: 'Ext.data.ArrayStore',
    fields: ["id", "text"],
    data: [
        ['0', '未处理'],
        ['1', '已处理']
    ]
});