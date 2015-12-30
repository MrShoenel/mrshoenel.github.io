/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/oclazyload/oclazyload.d.ts" />
/// <reference path="../article/article.module.ts" />
/// <reference path="../../app.common.ts" />
var Blog;
(function (Blog) {
    var Service;
    (function (Service) {
        /**
         * The service that provides data to controllers.
         */
        var ContentService = (function () {
            function ContentService($http, $q, $cacheFactoryService, $sce) {
                this.$http = $http;
                this.$q = $q;
                this.$cacheFactoryService = $cacheFactoryService;
                this.$sce = $sce;
                this.contentJson = null;
                this.metaCache = $cacheFactoryService('contentMeta');
                this.cache = $cacheFactoryService('content');
                this.fragmentCache = $cacheFactoryService('fragments');
            }
            ;
            /**
             * Used to initialize the meta-content. That means it will load
             * the content.json which gives us information about all the
             * available content.
             */
            ContentService.prototype.initializeMetaContent = function () {
                var _this = this;
                // If there were two or more calls to this function:
                if (this.contentJson !== null) {
                    return this.$q.when(angular.extend({}, this.contentJson));
                }
                return this.$http.get('content/content.json').then(function (contentJson) {
                    _this.contentJson = contentJson.data;
                    for (var i = 0; i < contentJson.data.metaArticles.length; i++) {
                        _this.metaCache.put(contentJson.data.metaArticles[i].urlName, contentJson.data.metaArticles[i]);
                    }
                    return contentJson.data;
                });
            };
            ;
            /**
             * Function that loads all the user's dependencies.
             */
            ContentService.prototype.loadMyDeps = function ($ocLazyLoad) {
                return this.initializeMetaContent().then(function (cJson) {
                    return $ocLazyLoad.load(cJson.mydeps.map(function (dep) { return dep.path; }));
                });
            };
            ;
            /**
             * Gets one Article by its URL-name. Uses caching internally.
             */
            ContentService.prototype.articleByUrlName = function (urlName) {
                var _this = this;
                var article = this.cache.get(urlName);
                return article === undefined ? this.getMetaArticles().then(function (metaArts) {
                    return _this.$http.get(_this.metaCache.get(urlName).path).then(function (arg) {
                        var article = new Common.Article(_this.metaCache.get(urlName), arg.data, _this.$sce);
                        ContentService.preprocessArticle(article);
                        _this.cache.put(urlName, article);
                        return article;
                    });
                }) : this.$q.when(article);
            };
            ;
            /**
             * This function returns all MetaArticles. The optional argument filter allows
             * to return a filtered subset of all articles.
             *
             * @param filter if the filter is a 2Tuple, then its t1 is used for specifying
             *  the meta tag to compare with and its t2 is used for the comparison. So if
             *  you were to provide <"displayat", "topnav"> then only those articles which
             *  have the meta-tag "displayat" with the value "topnav" would be returned.
             *  If the provided filter is a function, then it will be given each MetaArticle
             *  and must return true or false.
             */
            ContentService.prototype.getMetaArticles = function (filter) {
                var _this = this;
                var postFilter = filter instanceof Common.I2Tuple ?
                    function (metaArt) { return metaArt.hasOwnProperty(filter.t1) && metaArt[filter.t1] === filter.t2; } :
                    (filter instanceof Function ? filter : function (dummy) { return true; });
                var dateMethod = Date.prototype['toGMTString'] || Date.prototype.toLocaleString || Date.prototype.toString;
                return this.initializeMetaContent().then(function () {
                    return _this.contentJson.metaArticles.slice(0).filter(postFilter).map(function (metaArt) {
                        metaArt.lastMod = dateMethod.call(new Date(Date.parse(metaArt.lastMod)));
                        return metaArt;
                    });
                });
            };
            ;
            Object.defineProperty(ContentService.prototype, "fragments", {
                /**
                 * Returns all fragments. There are no parameters to this function so we
                 * can implement it as property. Ensures that all returned fragments
                 * have been cached properly.
                 */
                get: function () {
                    var _this = this;
                    return this.initializeMetaContent().then(function (contentJson) {
                        return _this.$q.all(contentJson.metaFragments.map(function (fragment) {
                            return _this.getFragmentByID(fragment.id);
                        }));
                    });
                },
                enumerable: true,
                configurable: true
            });
            ;
            /**
             * Returns a single fragment by ID. Fragments will be put to the local
             * cache before they are returned. Subsequent requests to the same ID
             * will returned the cached fragment.
             */
            ContentService.prototype.getFragmentByID = function (id) {
                var _this = this;
                return this.initializeMetaContent().then(function (contentJson) {
                    var metaFragment = contentJson.metaFragments.filter(function (frg) { return frg.id === id; })[0], fragment = _this.fragmentCache.get(metaFragment.id);
                    if (fragment !== undefined) {
                        return _this.$q.when(fragment);
                    }
                    if (!angular.isString(metaFragment.path) || metaFragment.path.length === 0) {
                        fragment = new Common.Fragment(metaFragment, (metaFragment.content || '').toString(), _this.$sce);
                        _this.fragmentCache.put(metaFragment.id, fragment);
                        return _this.$q.when(fragment);
                    }
                    // Ok, we have to load it as the fragment was not embedded.
                    return _this.$http.get(metaFragment.path).then(function (mfrgString) {
                        fragment = new Common.Fragment(metaFragment, (mfrgString.data + '').toString(), _this.$sce);
                        _this.fragmentCache.put(metaFragment.id, fragment);
                        return fragment;
                    });
                });
            };
            ;
            /**
             * This function picks up all ContentTransformers and applies them to
             * the given article.
             */
            ContentService.preprocessArticle = function (article) {
                var allTransformers = Object.keys(Blog.Article).map(function (key) {
                    var proto = Blog.Article[key]['prototype'] || null;
                    var instance = Object.create(proto);
                    return typeof instance['transform'] === 'function' ? instance : null;
                }).filter(function (transformer) { return transformer !== null; });
                allTransformers
                    .forEach(function (transformer) { return article.transformContent(transformer); });
                return article;
            };
            ;
            /**
             * Used as dependecy-injected factory.
             */
            ContentService.inlineAnnotatedConstructor = ['$http', '$q', '$cacheFactory', '$sce', ContentService];
            return ContentService;
        })();
        Service.ContentService = ContentService;
        ;
        angular.module('blogapp').service('ContentService', ContentService.inlineAnnotatedConstructor);
    })(Service = Blog.Service || (Blog.Service = {}));
})(Blog || (Blog = {}));
//# sourceMappingURL=content.service.js.map