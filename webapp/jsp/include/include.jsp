<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% String _contextPath_ = request.getContextPath().equals("/") ? "" : request.getContextPath();%>
<html>
<head>
    <title>农大附中学习辅助系统管理系统 V1.0 beta</title>
    <%
        // 权限验证
        String userName = (String) session.getAttribute("userName");
        String nickName = (String) session.getAttribute("nickName");
        String uploadFileRoot = (String) session.getAttribute("uploadFileRoot");
        if (userName == null) {
            response.sendRedirect("login.jsp");
            return;
        }
    %>
    <link rel="stylesheet" type="text/css" href="<%=_contextPath_%>/extjs4/resources/css/ext-all.css"/>
    <link rel="stylesheet" type="text/css" href="<%=_contextPath_%>/core/css/comm.css"/>
    <script type="text/javascript" src="<%=_contextPath_%>/extjs4/ext-all.js"></script>
    <script type="text/javascript" src="<%=_contextPath_%>/extjs4/pc-textField.js"></script>
    <script type="text/javascript" src="<%=_contextPath_%>/extjs4/locale/ext-lang-zh_CN.js"></script>
    <script>
        var userName = '<%=userName%>';
        var nickName = '<%=nickName%>';
        var uploadFileRoot = '<%=uploadFileRoot%>';
        var baseUrl = '<%=_contextPath_%>';
    </script>
