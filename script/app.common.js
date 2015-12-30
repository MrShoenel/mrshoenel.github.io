/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/oclazyload/oclazyload.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />
/**
 * This file should contain commonly used interfaces and classes.
 */
var Common;
(function (Common) {
    ;
    /**
     * Class used to encapsulate constants as they're not automagically
     * populated using TypeScript.
     */
    var Constants = (function () {
        function Constants() {
            this.values = {};
        }
        ;
        Constants.prototype.add = function (key, value) {
            this.values[key] = value;
            return this;
        };
        ;
        Constants.prototype.get = function (key, defaultIfMissing) {
            return this.values[key] || defaultIfMissing;
        };
        ;
        return Constants;
    })();
    Common.Constants = Constants;
    ;
    ;
    ;
    ;
    ;
    /**
     * This class represents one Article which can be displayed by STAB.
     */
    var Article = (function () {
        function Article(_metaArticle, _original, $sce) {
            this._metaArticle = _metaArticle;
            this._original = _original;
            this.$sce = $sce;
        }
        ;
        Object.defineProperty(Article.prototype, "meta", {
            get: function () {
                return angular.extend({}, this._metaArticle);
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Article.prototype, "original", {
            get: function () {
                return this._original.substr(0);
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Article.prototype, "asJQuery", {
            get: function () {
                return angular.element(this._original);
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Article.prototype, "asTrustedHtml", {
            get: function () {
                var article = Array.prototype.slice.call(this.asJQuery, 0).filter(function (element) {
                    return element instanceof HTMLElement &&
                        element.nodeName.toUpperCase() === 'ARTICLE';
                })[0];
                return this.$sce.trustAsHtml(angular.element(article).html());
            },
            enumerable: true,
            configurable: true
        });
        ;
        /**
         * This function accepts a content transformer which can apply changes
         * to the original content of this article.
         */
        Article.prototype.transformContent = function (transformer) {
            this._original = transformer.transform(this._original);
            return this;
        };
        ;
        return Article;
    })();
    Common.Article = Article;
    ;
    ;
    var Page = (function () {
        function Page(items, index) {
            this.items = items;
            this.index = index;
            this.next = null;
            this.prev = null;
        }
        ;
        Page.prototype.hasPrev = function () {
            return this.prev !== null;
        };
        ;
        Page.prototype.hasNext = function () {
            return this.next !== null;
        };
        ;
        /**
         * Takes a number of items and partitions them into pages by the
         * given chunk-size. All pages are linked together and the first
         * page is returned.
         */
        Page.partitionAndGetFirstPage = function (allItems, partSize) {
            if (partSize === void 0) { partSize = 5; }
            if (allItems.length === 0) {
                return new Page([], 0);
            }
            var numChunks = Math.ceil(allItems.length / partSize);
            var pages = [];
            for (var i = 0; i < numChunks; i++) {
                pages.push(new Page(allItems.splice(0, partSize), i));
            }
            for (var i = 0; i < numChunks; i++) {
                if (i > 0) {
                    pages[i].prev = pages[i - 1];
                }
                if (i < (numChunks - 1)) {
                    pages[i].next = pages[i + 1];
                }
            }
            return pages[0];
        };
        ;
        return Page;
    })();
    Common.Page = Page;
    ;
    /**
     * We might want to have different list-sites and each of them requires
     * different logic or filters.
     */
    var AListStrategy = (function () {
        function AListStrategy(type, reverse) {
            this.type = type;
            this.reverse = reverse;
            this.injected = {};
        }
        ;
        /**
         * This function may be used by a controller to inject parameters such
         * as search parameters.
         */
        AListStrategy.prototype.inject = function (key, value) {
            this.injected[key] = value;
            return this;
        };
        ;
        /**
         * Static method that returns false by default. When a specific
         * list-type is requested, the designated controller will probe
         * all registered ListStrategies with this method. Each strategy
         * should override this static method.
         */
        AListStrategy.canHandle = function (listType) {
            return false;
        };
        ;
        return AListStrategy;
    })();
    Common.AListStrategy = AListStrategy;
    ;
    var I2Tuple = (function () {
        function I2Tuple(_t1, _t2) {
            this._t1 = _t1;
            this._t2 = _t2;
        }
        ;
        Object.defineProperty(I2Tuple.prototype, "t1", {
            get: function () {
                return this._t1;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(I2Tuple.prototype, "t2", {
            get: function () {
                return this._t2;
            },
            enumerable: true,
            configurable: true
        });
        ;
        return I2Tuple;
    })();
    Common.I2Tuple = I2Tuple;
    ;
    ;
    ;
    /**
     * This class represents a fragment.
     */
    var Fragment = (function () {
        function Fragment(_meta, _original, $sce) {
            this._meta = _meta;
            this._original = _original;
            this.$sce = $sce;
            // Takes the best match or default if no match for mime:
            var $sceMethod = Fragment.supportedMimeTypesArray.filter(function (t) { return t.regex.test(_meta.mime); }).concat(Fragment.supportedMimeTypesArray.filter(function (t) { return t.hasOwnProperty('default') && t.default === true; }))[0].sce;
            var asJQuery = Array.prototype.slice.call(angular.element(_original), 0);
            var fragmentElem = asJQuery.filter(function (element) {
                return element instanceof HTMLElement &&
                    element.nodeName.toUpperCase() === 'FRAGMENT';
            })[0];
            this.trusted = $sce.trustAs($sceMethod, angular.element(fragmentElem).html());
        }
        ;
        Object.defineProperty(Fragment.prototype, "meta", {
            get: function () {
                return angular.extend({}, this._meta);
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Fragment.prototype, "trustedValue", {
            /**
             * Getter for the trusted value of the fragment.
             */
            get: function () {
                return this.trusted;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Fragment, "supportedMimeTypes", {
            get: function () {
                return Fragment.supportedMimeTypesArray.slice(0).map(function (t) { return t.mime; });
            },
            enumerable: true,
            configurable: true
        });
        ;
        Fragment.supportedMimeTypesArray = [
            { mime: 'css', regex: /css/i, sce: 'css' },
            { mime: 'html', regex: /(?:html?)|(?:xml)/i, sce: 'html' },
            { mime: 'js', regex: /(?:js)|(?:javascript)/i, sce: 'js' },
            { mime: 'text', regex: /(?:text)|(?:plain)/i, sce: 'html', default: true }
        ];
        return Fragment;
    })();
    Common.Fragment = Fragment;
    ;
})(Common || (Common = {}));
//# sourceMappingURL=app.common.js.map