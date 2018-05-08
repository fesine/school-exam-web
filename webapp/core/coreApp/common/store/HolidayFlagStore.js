/**
 * Created by Fesine on 2017/6/8.
 */
Ext.define("core.common.store.HolidayFlagStore", {
    alias: 'widget.holidayFlagStore',
    extend: 'Ext.data.ArrayStore',
    fields: ["id", "text"],
    data: [
        [0, '不是'],
        [1, '是']
    ]
});