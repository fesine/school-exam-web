/**
 * 通用删除方法，支持多记录删除
 * @param grid
 */
commonDelete = function (grid, suffix) {
    var records = grid.getSelectionModel().getSelection();
    if (!records) {
        Ext.Msg.alert("提示", "请至少选择一条需要删除的数据!");
        return;
    }
    Ext.MessageBox.confirm(
        "请确认"
        , "确定删除选中的数据吗？", function (btn) {
            if (btn == 'yes') {
                // 根据id删除多条记录
                var data = [];
                Ext.Array.each(records, function (model) {
                    data.push(Ext.JSON.encode(model.get('id')));
                });
                Ext.Ajax.request({
                    waitMsg: '正在进行处理,请稍后...',
                    url: _hostUrl + suffix + "/" + data.join(','),
                    method: "DELETE",
                    timeout: 10000,
                    success: function (response, opts) {
                        var resObj = Ext.decode(response.responseText);
                        var store = grid.getStore();
                        store.load({
                            params: {
                                start: 0,
                                limit: store.limit
                            }
                        });
                        Ext.Msg.alert("提示", resObj.msg);
                    }
                });
            } else {
                return;
            }
        }
    );
}
