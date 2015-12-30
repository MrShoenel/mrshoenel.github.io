/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../service/content.service.ts" />
var Blog;
(function (Blog) {
    var FragmentController = (function () {
        function FragmentController($scope, ContentService) {
            var _this = this;
            this.$scope = $scope;
            this.ContentService = ContentService;
            this.ContentService.getFragmentByID($scope['id']).then(function (fragment) {
                _this.trustedValue = fragment.trustedValue;
            });
        }
        /**
             * Used as dependecy-injected factory.
             */
        FragmentController.inlineAnnotatedConstructor = ['$scope', 'ContentService', FragmentController];
        return FragmentController;
    })();
    Blog.FragmentController = FragmentController;
    angular.module('blogapp').controller('FragmentController', FragmentController.inlineAnnotatedConstructor);
})(Blog || (Blog = {}));
//# sourceMappingURL=fragment.controller.js.map