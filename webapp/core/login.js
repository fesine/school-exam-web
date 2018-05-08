/**
 * 刷新验证码
 * @param imgObj 验证码Img元素
 */
var refreshCode = function (imgObj) {
    var checkValue = Ext.getCmp("checkCode");
    checkValue.reset();
    if (!imgObj) {
        imgObj = Ext.getCmp("checkImg");
    }
    var index = imgObj.src.indexOf("?");
    if (index != -1) {
        var url = imgObj.src.substring(0, index + 1) + Math.random();
        imgObj.setSrc(url);
    } else {
        imgObj.setSrc(imgObj.src + "?" + Math.random());
    }
};

Ext.onReady(function () {
    var username=Ext.util.Cookies.get('username');
    var _rem= Ext.util.Cookies.get("rememberMe");
    var userLoginPanel = Ext.create('Ext.panel.Panel', {
        bodyCls: 'bgimage',
        border: false,
        defaults: {
            margin: '58 0'
        },
        items: {
            xtype: 'tabpanel',
            id: 'loginTabs',
            activeTab: 0,
            height: 180,
            border: false,
            items: [{
                title: "身份认证",
                xtype: 'form',
                id: 'loginForm',
                defaults: {
                    width: 260,
                    margin: '15 0 0 70'
                },
                defaultType: 'textfield',
                labelWidth: 40,
                listeners: {
                    afterRender: function (thisForm, options) {
                        //监听键盘回车事件
                        this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                            enter: login,
                            scope: this
                        });
                    }
                },
                items: [{
                    fieldLabel: '用户名',
                    cls: 'user',
                    name: 'username',
                    labelAlign: 'right',
                    labelWidth: 65,
                    maxLength: 30,
                    emptyText: '请输入用户名',
                    maxLengthText: '用户名最大长度为20个字符',
                    blankText: "用户名不能为空，请填写！",
                    value: username,
                    allowBlank: false
                }, {
                    fieldLabel: '密   码',
                    cls: 'key',
                    name: 'password',
                    inputType: "password",
                    labelWidth: 65,
                    labelAlign: 'right',
                    emptyText: '请在这里填写密码',
                    maxLengthText: '密码长度不能超过20',
                    maxLength: 20,
                    blankText: "密码不能为空，请填写！",
                    allowBlank: false
                }, {
                    xtype: 'container',
                    width: 300,
                    layout: 'hbox',
                    fieldDefaults: {
                        labelAlign: 'side'
                    },
                    items: [{
                        name: 'checkCode',
                        id: 'checkCode',
                        cls: 'Userkey',
                        labelAlign: 'right',
                        labelWidth: 65,
                        width: 160,
                        xtype: 'textfield',
                        fieldLabel: '验证码:',
                        allowBlank: false
                    }, {
                        xtype: 'image',
                        id: 'checkImg',
                        width: 100,
                        height:25,
                        src: _hostUrl+'/v1/checkCode'

                    },{
                        html: "<a href='#' onclick='refreshCode()'>换一张</a>"

                    }]
                }, {
                    fieldLabel: '记住我',
                    labelStyle: "text-align: right;",
                    margin:'0 5 0 70',
                    labelWidth: 65,
                    width: 160,
                    xtype: 'checkbox',
                    name: 'rememberMe',
                    checked: _rem
                },
                    {
                        id: 'id_reg_panel',
                        xtype: 'panel',
                        border: false,
                        hidden: true,
                        html: "<span id='messageTip' style='color: red'> </span>"
                    }]
            }, {
                title: '关于',
                contentEl: 'aboutDiv',
                defaults: {
                    width: 230
                }
            }]
        }
    });

    Ext.getCmp("checkImg").on({
        click: function (imgObj) {
            if (!imgObj) {
                imgObj = Ext.getCmp("checkImg");
            }
            var index = imgObj.src.indexOf("?");
            if (index != -1) {
                var url = imgObj.src.substring(0, index + 1) + Math.random();
                imgObj.setSrc(url);
            } else {
                imgObj.setSrc(imgObj.src + "?" + Math.random());
            }
        }
    });


    var login = function () {
        var basic = Ext.getCmp("loginForm").getForm();
        var username = basic.findField("username").getValue();
        var password = basic.findField("password").getValue();
        var checkCode = basic.findField("checkCode").getValue();
        var rememberMe = basic.findField("rememberMe").getValue();
        if (!basic.isValid()) {
            if (null == username || Ext.util.Format.trim(username) == "") {
                Ext.Msg.alert("提示", "请输入用户名！");
            } else if (null == password || Ext.util.Format.trim(password) == "") {
                Ext.Msg.alert("提示", "请输入密码！");
            } else if (null == checkCode || Ext.util.Format.trim(checkCode) == "") {
                Ext.Msg.alert("提示", "请输入验证码！");
            }
            return;
        }
        Ext.Ajax.request({
            waitMsg: '正在登录……',
            waitTitle: '提示',
            url: _hostUrl+"/v1/user/login",
            params: {
                checkCode: checkCode,
                username: username,
                password: password
            },
            method: "POST",
            timeout: 4000,
            success: function (response, opts) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.code==200) {
                    var userName = resObj.data.user.username;
                    var grade = resObj.data.user.grade;
                    var now = new Date();
                    var expiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);//保存7天
                    Ext.util.Cookies.set('userId', resObj.data.user.id , expiry);
                    Ext.util.Cookies.set('nickName', resObj.data.user.nickName,expiry);
                    Ext.util.Cookies.set('userName', userName , expiry);
                    Ext.util.Cookies.set('grade', grade,expiry);
                    Ext.util.Cookies.set('rememberMe', rememberMe,expiry);
                    if(grade == 1)
                        Ext.util.Cookies.set('gradeName', '权限管理员', expiry);
                    else if(grade == 2)
                        Ext.util.Cookies.set('gradeName', '超级管理员', expiry);
                    else {
                        Ext.util.Cookies.set('gradeName', '管理员', expiry);
                        Ext.util.Cookies.set('hiddenMenu', true, expiry);
                    }

                    function callBack() {
                        location.href = "index.html";
                    }
                    Ext.Msg.alert("提示", "登录成功!", callBack);
                } else {
                    Ext.Msg.alert("提示", resObj.msg);
                    refreshCode();
                }
            },
            failure: function (response, opts) {
                var resObj = Ext.decode(response.responseText);
                Ext.Msg.alert("提示", resObj.msg);
            }
        });
    }

    Ext.create('Ext.window.Window', {
        title: '农大附中学习辅助系统管理系统 V1.0 beta',
        width: 440,
        height: 300,
        layout: 'fit',
        plain: true,
        modal: true,
        maximizable: false,
        draggable: false,
        closable: false,
        resizable: false,
        items: userLoginPanel,
        buttons: [{
            text: '重置',
            iconCls: 'reset',
            handler: function () {
                var formObj = Ext.getCmp("loginForm");
                var basic = formObj.getForm();
                basic.reset();//basic中重置方法
            }
        }, {
            text: '登录',
            id: 'login',
            iconCls: 'login',
            handler: login
        }]
    }).show();
});  