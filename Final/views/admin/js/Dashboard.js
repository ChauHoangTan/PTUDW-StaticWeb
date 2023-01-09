// quản lý các sự kiện của trang dashboard
// Created by: NTTan 10/12/2014

var Dashboard = {
    init: function () {
        Dashboard.registerEvent();
    }
    , registerEvent: function () {
        $('.btn-logout').off('click').on('click', function () {
            $.ajax({
                url: '/Admin/User/Logout',
                type: 'POST',
                dataType: 'json',
                success: function (res) {
                    if (res.status == true) {
                        window.location.href = "/Admin/Login";
                    }
                }
            });
        });
    }
}
Dashboard.init();
