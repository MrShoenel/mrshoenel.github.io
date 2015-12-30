/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../app.common.ts" />
/// <reference path="../service/content.service.ts" />
var Blog;
(function (Blog) {
    var Article;
    (function (Article) {
        var ArticleController = (function () {
            function ArticleController(ContentService, Config) {
                this.ContentService = ContentService;
                this.Config = Config;
                this.useBindHtmlCompile = Config.get('ALLOW_ANGULAR_HTML', false);
            }
            /**
                 * Used as dependecy-injected factory.
                 */
            ArticleController.inlineAnnotatedConstructor = ['ContentService', 'CONFIG', ArticleController];
            return ArticleController;
        })();
        Article.ArticleController = ArticleController;
        angular.module('blogapp.article').controller('ArticleController', ArticleController.inlineAnnotatedConstructor);
    })(Article = Blog.Article || (Blog.Article = {}));
})(Blog || (Blog = {}));
//# sourceMappingURL=article.controller.js.map