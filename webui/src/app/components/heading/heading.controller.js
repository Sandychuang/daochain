class HeadingController {
    constructor($timeout, $http, $state, appConfig) {
        "ngInject";
        this.$timeout = $timeout;
        this.$http = $http;
        this.$state = $state;
        this.ApiUrl = appConfig.APIUrl;
        this.name = 'heading';
        this.username = localStorage.getItem('username');
    }

    $onInit() {
        (() => {
            this.$http({
                method: 'GET',
                url: this.ApiUrl + '/get-token-info',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }).then((res, status) => {
                if (!(localStorage.getItem('username') && localStorage.getItem('user-avatar'))) {
                    this.username = res.data.user.username;
                    localStorage.setItem('username', res.data.user.username);
                    localStorage.setItem('user-avatar', res.data.user.avatar_url);
                }
                this.tenants = res.data.user.tenants;
            });
        })();
    }
}

export default HeadingController;