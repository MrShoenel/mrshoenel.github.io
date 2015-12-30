/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/oclazyload/oclazyload.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="./app.common.ts" />
/// <reference path="./app/service/content.service.ts" />
/// <reference path="./app/article/article.controller.ts" />
/// <reference path="./app/ui.router.stateData/ui-router-stateData.module.ts" />
var Blog;
(function (Blog) {
    function configure(module) {
        return module.config([
            '$ocLazyLoadProvider', '$locationProvider', '$urlRouterProvider', '$stateProvider', 'DEBUG',
            function ($ocLazyLoadProvider, $locationProvider, $urlRouterProvider, $stateProvider, DEBUG) {
                $ocLazyLoadProvider.config({
                    debug: DEBUG.get('oclazyload.debug', false),
                    events: false
                });
                $locationProvider.hashPrefix('!');
                $urlRouterProvider.otherwise('/');
                // constants
                configure_constants();
                // states
                configure_states();
                /**
                 * Function that will go through the provided constants and
                 * take the application into the correct state.
                 */
                function configure_constants() {
                    // Enable debugging states
                    if (DEBUG.get('LOG_STATES', false)) {
                        module.run(function ($rootScope) {
                            $rootScope.$on('$stateChangeError', console.log.bind(console));
                        });
                    }
                }
                ;
                /**
                 * Function that will configure the application's states and
                 * views. States use resolve and ocLazyLoad to satisfy their
                 * dependencies.
                 */
                function configure_states() {
                    $stateProvider.state('main', {
                        abstract: true,
                        url: '',
                        views: {
                            navigation: {
                                template: '<app-navigation></app-navigation>'
                            },
                            breadcrumb: {
                                template: '<app-fragment id="breadcrumb"></app-fragment>'
                            },
                            header: {
                                template: '<app-fragment id="header"></app-fragment>'
                            },
                            footer: {
                                template: '<app-fragment id="footer"></app-fragment>'
                            },
                            // absolute targets the default (nameless) view
                            "@": {
                                template: '<div ui-view></div>'
                            }
                        },
                        resolve: {
                            directives: function ($ocLazyLoad) { return $ocLazyLoad.load({
                                name: 'blogapp.directive',
                                serie: true,
                                files: [
                                    './script/app/fragment/fragment.controller.js',
                                    './script/app/fragment/fragment.directive.js'
                                ]
                            }); },
                            navigation: function ($ocLazyLoad) { return $ocLazyLoad.load({
                                name: 'blogapp.navigation',
                                serie: true,
                                files: [
                                    './script/app/article/htmlCompile.directive.js',
                                    './script/app/navigation/navigation.directive.js'
                                ]
                            }); },
                            services: ['$ocLazyLoad', '$injector', '$q', function ($ocLazyLoad, $injector, $q) { return $ocLazyLoad.load({
                                    name: 'blogapp.service',
                                    files: [
                                        './script/app/service/content.service.js'
                                    ]
                                }).then(function () {
                                    // This one will make the service initialize itself.
                                    var svc = $injector.get('ContentService');
                                    return $q.all([
                                        svc.initializeMetaContent(),
                                        svc.loadMyDeps($ocLazyLoad)
                                    ]);
                                }); }
                            ],
                            $uiStateData: [function () {
                                    return {
                                        title: '',
                                        defaultTitle: 'mrshoenel.github.io'
                                    };
                                }]
                        }
                    });
                    $stateProvider.state('default', {
                        parent: 'main',
                        url: '/',
                        template: '<article-list></article-list>',
                        resolve: {
                            articleList: function ($ocLazyLoad) { return $ocLazyLoad.load({
                                name: 'blogapp.articleList',
                                files: [
                                    './script/app/articleList/listStrategies.js',
                                    './script/app/articleList/articleList.controller.js',
                                    './script/app/articleList/articleList.directive.js'
                                ]
                            }); }
                        }
                    });
                    $stateProvider.state('read', {
                        parent: 'main',
                        url: '/read/{articleUrlName:.*}',
                        controller: 'ArticleController',
                        controllerAs: 'vm',
                        templateProvider: ['$templateFactory', function ($templateFactory) {
                                return $templateFactory.fromUrl('./script/app/article/article.template.html');
                            }],
                        params: {
                            articleUrlName: {
                                value: undefined,
                                squash: false
                            }
                        },
                        resolve: {
                            articleModule: function ($ocLazyLoad) { return $ocLazyLoad.load({
                                name: 'blogapp.article',
                                serie: true,
                                files: [
                                    './script/app/article/article.module.js',
                                    './script/app/article/article.controller.js',
                                    './script/app/article/htmlCompile.directive.js',
                                ]
                            }); },
                            // 'services' is from the parent's resolve
                            currentArticle: ['$stateParams', 'articleModule', 'ContentService', 'services', function ($stateParams, articleModule, contentService, services) {
                                    return contentService.articleByUrlName($stateParams['articleUrlName']);
                                }],
                            $uiStateData: ['currentArticle', function (currentArticle) {
                                    var am = currentArticle.meta, ho = function (prop) { return am.hasOwnProperty(prop); }, stateData = {
                                        article: currentArticle,
                                        title: realDecodeURI(currentArticle.meta.title),
                                        breadCrumb: realDecodeURI(currentArticle.meta.title),
                                        meta: [
                                            ['last-modified', new Date(Date.parse(am.lastMod))['toGMTString']()]
                                        ]
                                    };
                                    ['author', 'copyright', 'description', 'keywords'].filter(function (prop) { return ho(prop); }).forEach(function (prop) { return stateData.meta.push([prop, am[prop]]); });
                                    return stateData;
                                }]
                        }
                    });
                    $stateProvider.state('list', {
                        parent: 'main',
                        url: '/list/{listType:string}/{pageIdx:int}',
                        template: '<article-list></article-list>',
                        params: {
                            listType: {
                                value: 'all',
                                squash: false
                            },
                            pageIdx: {
                                value: 0,
                                squash: true
                            }
                        },
                        resolve: {
                            articleList: function ($ocLazyLoad) { return $ocLazyLoad.load({
                                name: 'blogapp.articleList',
                                files: [
                                    './script/app/articleList/listStrategies.js',
                                    './script/app/articleList/articleList.controller.js',
                                    './script/app/articleList/articleList.directive.js'
                                ]
                            }); },
                            $uiStateData: ['$stateParams', function ($stateParams) {
                                    return {
                                        title: 'dir:/' + realDecodeURI($stateParams['listType']),
                                        breadCrumb: 'dir:/' + realDecodeURI($stateParams['listType'])
                                    };
                                }]
                        }
                    });
                    $stateProvider.state('search', {
                        reloadOnSearch: false,
                        parent: 'main',
                        url: '/search/{pageIdx:int}',
                        // The search-template will use the Jaro Winkler string distance for scoring now by default.
                        template: '<article-list list-type="search" inject="scorer=jaro-winkler;scorer-min-certainty=.5"></article-list>',
                        params: {
                            pageIdx: {
                                value: 0,
                                squash: true
                            }
                        },
                        // For this state we supply extended state data
                        data: new Ui.Router.StateData.ExtendedStateData()
                            .usesLocationSearch(true),
                        resolve: {
                            articleList: function ($ocLazyLoad) { return $ocLazyLoad.load({
                                name: 'blogapp.articleList',
                                files: [
                                    './script/app/articleList/listStrategies.js',
                                    './script/app/articleList/articleList.controller.js',
                                    './script/app/articleList/articleList.directive.js'
                                ]
                            }); },
                            $uiStateData: ['$location', function ($location) {
                                    var q = $location.search()['q'];
                                    return {
                                        title: 'search' + (q ? ':' + q : ''),
                                        breadCrumb: 'search'
                                    };
                                }]
                        }
                    });
                }
                ;
            }]);
    }
    Blog.configure = configure;
    ;
    /**
     * Decodes a URL-encoded string, even if it has been encoded
     * multiple times.
     */
    function realDecodeURI(str) {
        while (/%[0-9a-f]{2}/i.test(str)) {
            str = decodeURIComponent(str);
        }
        return str;
    }
    Blog.realDecodeURI = realDecodeURI;
})(Blog || (Blog = {}));
//# sourceMappingURL=app.config.js.map