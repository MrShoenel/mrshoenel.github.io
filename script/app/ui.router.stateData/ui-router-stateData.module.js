var Ui;!function(a){var b;!function(a){var b;!function(a){var b=function(){function a(){}return a.prototype.createModule=function(){return angular.module("ui.router.stateData",["ui.router"]).run(["$rootScope","$timeout","$state","$window","$location",function(a,b,d,e,f){var g={};a.$on("$stateChangeStart",function(){delete a.$uiStateData,g=f.search()}),a.$on("$stateChangeSuccess",function(b,h,i,j,k){if(h.data instanceof c){var l=h.data;l.usesLocationSearch()&&f.search(g)}for(var m=[],n=d.$current;void 0!==n;)m.push(n),n=n.parent;for(a.$uiStateData={},a.$uiStateData.isMobileView=e.innerWidth<768,a.$uiStateData.$hierarchy=m.slice(0).reverse(),a.$uiStateData.$breadCrumb=[];m.length>0;){var o=m.pop(),p=o.locals.globals.hasOwnProperty("$uiStateData")?o.locals.globals.$uiStateData:{};angular.extend(a.$uiStateData,p),p.hasOwnProperty("breadCrumb")&&a.$uiStateData.$breadCrumb.push({title:p.breadCrumb,state:o})}})}])},a}();a.UiRouterStateData=b;var c=function(){function a(a){this.data=a||{}}return a.prototype.set=function(a,b){return this.data[a]=b,this},a.prototype.get=function(a,b){return this.data.hasOwnProperty(a)?this.data[a]:b||void 0},a.prototype.usesLocationSearch=function(b){return void 0===b?this.get(a.prop_usesLocationSearch,!1):this.set(a.prop_usesLocationSearch,b===!0)},a.prop_usesLocationSearch="usesLocationSearch",a}();a.ExtendedStateData=c,a.module=(new b).createModule()}(b=a.StateData||(a.StateData={}))}(b=a.Router||(a.Router={}))}(Ui||(Ui={}));