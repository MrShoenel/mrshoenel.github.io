/// <reference path="../../../typings/angularjs/angular.d.ts" />
var Blog;
(function (Blog) {
    Blog.BindHtmlCompileDirective = function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var endWatch = scope.$watch(function () {
                    return scope.$eval(attrs['bindHtmlCompile']);
                }, function (value) {
                    element.html(value && value.toString());
                    var compileScope = scope;
                    if (attrs['bindHtmlScope']) {
                        compileScope = scope.$eval(attrs['bindHtmlScope']);
                    }
                    $compile(element.contents())(compileScope);
                    // Compile only once
                    endWatch();
                });
            }
        };
    };
    Blog.BindHtmlCompileDirective.$inject = ['$compile'];
    angular.module('blogapp').directive('bindHtmlCompile', Blog.BindHtmlCompileDirective);
})(Blog || (Blog = {}));
//# sourceMappingURL=htmlCompile.directive.js.map