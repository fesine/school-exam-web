/**
 * Created by Fesine on 2017/6/8.
 */
Ext.define("core.common.store.ApplyStatusStore", {
    alias: 'widget.applyStatusStore',
    extend: 'Ext.data.ArrayStore',
    fields: ["id", "text"],
    data: [
        [0, '新增'],
        [1, '通过'],
        [2, '拒绝']
    ]
});