/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../service/content.service.ts" />
/// <reference path="../../app.common.ts" />
/**
 * This is the directive for the Main Header Navigation.
 */
var Blog;
(function (Blog) {
    Blog.AppNavigationDirective = function () {
        return {
            restrict: 'E',
            templateUrl: './script/app/navigation/navigation.template.html',
            replace: true,
            controllerAs: 'vm',
            controller: ['ContentService', function (ContentService) {
                    var that = this;
                    this.metaArticles = [];
                    ContentService.getMetaArticles(new Common.I2Tuple("displayat", "topnav")).then(function (metaArts) {
                        that.metaArticles = metaArts;
                    });
                }]
        };
    };
    Blog.AppNavigationDirective.$inject = [];
    angular.module('blogapp').directive('appNavigation', Blog.AppNavigationDirective);
})(Blog || (Blog = {}));
//# sourceMappingURL=navigation.directive.js.map