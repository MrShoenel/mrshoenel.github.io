/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../app.common.ts" />
/// <reference path="./listStrategies.ts" />
/// <reference path="../service/content.service.ts" />
var Blog;
(function (Blog) {
    var ArticleList;
    (function (ArticleList) {
        var ArticleListController = (function () {
            function ArticleListController(ContentService, $stateParams, $scope, $location, CONFIG) {
                var _this = this;
                this.ContentService = ContentService;
                this.$stateParams = $stateParams;
                this.$scope = $scope;
                this.$location = $location;
                this.CONFIG = CONFIG;
                /**
                 * Used by the directive's template.
                 */
                this.isSearchList = false;
                this.listType = $scope['listType'] || $stateParams['listType'];
                this.isSearchList = this.listType === 'search';
                this.sortReverse = $scope['sortReverse'] === 'true';
                this.pageIndex = $scope['sortReverse'] ?
                    parseInt($scope['sortReverse']) : $stateParams['pageIdx'] || 0;
                this.inject = ArticleListController.parseInject($scope['inject'] || '');
                this.searchTerm = this.$location.search()['q'];
                this.itemsPerPage = CONFIG.get('ITEMS_PER_PAGE', 5);
                this.ContentService.getMetaArticles().then(function (metaArts) {
                    _this.currentPage = Common.Page.partitionAndGetFirstPage(_this.getStrategy(_this.listType, _this.sortReverse).itemsList(metaArts), _this.itemsPerPage);
                    // advance to page
                    _this.advanceToPage();
                    return metaArts;
                });
                if (this.searchTerm) {
                    this.search();
                }
            }
            ;
            Object.defineProperty(ArticleListController.prototype, "isSearch", {
                /**
                 * Public getter for isSearch.
                 */
                get: function () {
                    return this.isSearchList;
                },
                enumerable: true,
                configurable: true
            });
            ;
            /**
             * Parses a string of the form "a=b;c=d;.." into a KVStore<string>.
             * This is useful when multiple values were supposed to be injected.
             */
            ArticleListController.parseInject = function (inject) {
                inject = (inject + '').trim();
                if (inject.length === 0) {
                    return {};
                }
                var kv = {}, split = inject.split(';');
                split.forEach(function (spl) {
                    var arr = spl.split('=');
                    kv[arr[0]] = arr[1];
                });
                return kv;
            };
            ;
            ArticleListController.prototype.advanceToPage = function () {
                var idx = this.pageIndex;
                while (idx-- > 0) {
                    this.currentPage = this.currentPage.next;
                }
            };
            ;
            ArticleListController.prototype.search = function () {
                var _this = this;
                this.$location.search({ q: this.searchTerm });
                this.$scope.$root['$uiStateData']['title'] = 'search' +
                    (angular.isString(this.searchTerm) && this.searchTerm.length ? ':' + this.searchTerm : '');
                this.ContentService.getMetaArticles().then(function (metaArts) {
                    _this.currentPage = Common.Page.partitionAndGetFirstPage(_this.getStrategy(_this.listType, _this.sortReverse).itemsList(metaArts), _this.itemsPerPage);
                    // advance
                    _this.advanceToPage();
                });
            };
            ;
            ArticleListController.prototype.gotoPrevPage = function () {
                this.currentPage = this.currentPage.prev;
            };
            ;
            ArticleListController.prototype.gotoNextPage = function () {
                this.currentPage = this.currentPage.next;
            };
            ;
            ArticleListController.prototype.getStrategy = function (listType, sortReverse, throwIfNone) {
                if (listType === void 0) { listType = 'all'; }
                if (sortReverse === void 0) { sortReverse = false; }
                if (throwIfNone === void 0) { throwIfNone = false; }
                var allStratgiesNames = Object.keys(ArticleList).filter(function (key) {
                    return typeof ArticleList[key]['canHandle'] === 'function' &&
                        new ArticleList[key]() instanceof Common.AListStrategy &&
                        ArticleList[key]['canHandle'](listType);
                });
                if (allStratgiesNames.length === 0) {
                    if (throwIfNone) {
                        throw new Error('Unknown list-type strategy: ' + listType);
                    }
                    else {
                        return new ArticleList.ListAllStrategy(listType, sortReverse);
                    }
                }
                var strategy = new ArticleList[allStratgiesNames[0]](listType, sortReverse);
                // Now inject things
                var search = this.$location.search();
                if (search.hasOwnProperty('q')) {
                    strategy.inject('locationSearch', search['q']);
                }
                for (var key in this.inject) {
                    strategy.inject(key, this.inject[key]);
                }
                return strategy;
            };
            ;
            /**
                 * Used as dependecy-injected factory.
                 */
            ArticleListController.inlineAnnotatedConstructor = ['ContentService', '$stateParams', '$scope', '$location', 'CONFIG', ArticleListController];
            return ArticleListController;
        })();
        ArticleList.ArticleListController = ArticleListController;
        angular.module('blogapp').controller('ArticleListController', ArticleListController.inlineAnnotatedConstructor);
    })(ArticleList = Blog.ArticleList || (Blog.ArticleList = {}));
})(Blog || (Blog = {}));
//# sourceMappingURL=articleList.controller.js.map