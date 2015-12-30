/// <reference path="./articleList.controller.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/**
 * This is the directive for the Main Header Navigation.
 */
var Blog;
(function (Blog) {
    var ArticleList;
    (function (ArticleList) {
        ArticleList.ArticleListDirective = function () {
            return {
                restrict: 'E',
                templateUrl: './script/app/articleList/articleList.template.html',
                replace: true,
                controllerAs: 'vm',
                controller: 'ArticleListController',
                scope: {
                    listType: '@',
                    sortReverse: '@',
                    pageIndex: '@',
                    inject: '@'
                }
            };
        };
        ArticleList.ArticleListDirective.$inject = [];
        angular.module('blogapp').directive('articleList', ArticleList.ArticleListDirective);
    })(ArticleList = Blog.ArticleList || (Blog.ArticleList = {}));
})(Blog || (Blog = {}));
//# sourceMappingURL=articleList.directive.js.map