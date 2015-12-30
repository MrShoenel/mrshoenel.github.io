/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/requirejs/require.d.ts" />
/// <reference path="../../../typings/oclazyload/oclazyload.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="./../../app.common.ts" />
/// <reference path="./../../app.config.ts" />
/**
 * This is the main module of the blog.
 */
var Blog;
(function (Blog) {
    var Article;
    (function (Article_1) {
        var Article = (function () {
            function Article() {
            }
            Article.prototype.createModule = function () {
                return angular.module('blogapp.article', []);
            };
            return Article;
        })();
        Article_1.Article = Article;
        ;
        /**
         * This class will transform internal links which use the notation
         * <a stab-ref="<article-url-name>">..</a> into proper links that
         * can be used to link within articles.
         */
        var StabArticleLinkContentTransformer = (function () {
            function StabArticleLinkContentTransformer() {
            }
            StabArticleLinkContentTransformer.prototype.transform = function (original) {
                return original.replace(/stab-ref="(.*?)"/ig, function (substring, ref) {
                    return 'href="#!/read/' + ref + '"';
                });
            };
            ;
            return StabArticleLinkContentTransformer;
        })();
        Article_1.StabArticleLinkContentTransformer = StabArticleLinkContentTransformer;
        ;
        Article_1.module = new Article().createModule();
    })(Article = Blog.Article || (Blog.Article = {}));
})(Blog || (Blog = {}));
//# sourceMappingURL=article.module.js.map