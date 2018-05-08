/**
 * Created by Fesine on 2017/6/8.
 */
Ext.define("core.common.store.AdjustFlagStore", {
    alias: 'widget.adjustFlagStore',
    extend: 'Ext.data.ArrayStore',
    fields: ["id", "text"],
    data: [
        [0, '申请加班费'],
        [1, '申请调休']
    ]
});