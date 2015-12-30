/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/oclazyload/oclazyload.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="./app.common.ts" />
/// <reference path="./app.config.ts" />
/**
 * This is the main module of the blog.
 */
var Blog;
(function (Blog) {
    var BlogApp = (function () {
        function BlogApp() {
        }
        BlogApp.prototype.createModule = function () {
            return Blog.configure(angular.module('blogapp', [
                'ui.router',
                'oc.lazyLoad',
                'ui.bootstrap',
                'ui.router.stateData',
                'ngAnimate'
            ]).constant('CONFIG', new Common.Constants()
                .add('ITEMS_PER_PAGE', 5)
                .add('ALLOW_ANGULAR_HTML', true)).constant('DEBUG', new Common.Constants()
                .add('LOG_STATES', false)));
        };
        return BlogApp;
    })();
    Blog.BlogApp = BlogApp;
    Blog.module = new BlogApp().createModule();
})(Blog || (Blog = {}));
//# sourceMappingURL=app.module.js.map