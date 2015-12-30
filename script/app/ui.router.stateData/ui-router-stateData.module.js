/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/requirejs/require.d.ts" />
/// <reference path="../../../typings/oclazyload/oclazyload.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="./../../app.common.ts" />
/// <reference path="./../../app.config.ts" />
/**
 * This module is based on ideas for angular-ui-router-title. It
 * provides arbitrary and hierarchical state-data. This module is
 * an enhanced replacement for angular-ui-router-title.
 */
var Ui;
(function (Ui) {
    var Router;
    (function (Router) {
        var StateData;
        (function (StateData) {
            var UiRouterStateData = (function () {
                function UiRouterStateData() {
                }
                UiRouterStateData.prototype.createModule = function () {
                    return angular.module('ui.router.stateData', ['ui.router'])
                        .run(['$rootScope', '$timeout', '$state', '$window', '$location',
                        function ($rootScope, $timeout, $state, $window, $location) {
                            var locationSearch = {};
                            $rootScope.$on('$stateChangeStart', function () {
                                delete $rootScope['$uiStateData'];
                                //save location.search so we can add it back after transition is done
                                locationSearch = $location.search();
                            });
                            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                                // Do some checks on the extended state data, if present
                                if (toState.data instanceof ExtendedStateData) {
                                    var esd = toState.data;
                                    // Restore all query string parameters back to $location.search
                                    // if the state signalizes that it uses it.
                                    if (esd.usesLocationSearch()) {
                                        $location.search(locationSearch);
                                    }
                                }
                                // In this array we will store all states from this one upwards,
                                // and the root state will be the last one in this array. This is
                                // important as we'll be building up the $uiStateData bottom to top.
                                var stateHierarchy = [];
                                // Build up hierarchy.
                                var state = $state.$current;
                                while (state !== undefined) {
                                    stateHierarchy.push(state);
                                    state = state['parent'];
                                }
                                // clean-out rootScope before re-building
                                $rootScope['$uiStateData'] = {};
                                // set the isMobileView variable
                                $rootScope['$uiStateData']['isMobileView'] = $window.innerWidth < 768;
                                // store the hierarchy for abritrary access
                                $rootScope['$uiStateData']['$hierarchy'] = stateHierarchy.slice(0).reverse();
                                // will get all states that define a title
                                $rootScope['$uiStateData']['$breadCrumb'] = [];
                                while (stateHierarchy.length > 0) {
                                    var current = stateHierarchy.pop();
                                    var currentData = current.locals.globals.hasOwnProperty('$uiStateData') ?
                                        current.locals.globals['$uiStateData'] : {};
                                    angular.extend($rootScope['$uiStateData'], currentData);
                                    if (currentData.hasOwnProperty('breadCrumb')) {
                                        $rootScope['$uiStateData']['$breadCrumb'].push({
                                            title: currentData['breadCrumb'],
                                            state: current
                                        });
                                    }
                                }
                            });
                        }]);
                };
                return UiRouterStateData;
            })();
            StateData.UiRouterStateData = UiRouterStateData;
            /**
             * Helper class to encapsulate a state's data (the data-property)
             * in a nicer way. The ui-router-stateData module will take certain
             * actions if a state's data-property is an instance of this class
             * and has certain values.
             * The purpose of this class is to tame the <any>-nature of the data-
             * property and to bring in some conformity.
             */
            var ExtendedStateData = (function () {
                function ExtendedStateData(obj) {
                    this.data = obj || {};
                }
                ExtendedStateData.prototype.set = function (key, value) {
                    this.data[key] = value;
                    return this;
                };
                ExtendedStateData.prototype.get = function (key, defaultIfEmpty) {
                    if (this.data.hasOwnProperty(key)) {
                        return this.data[key];
                    }
                    return defaultIfEmpty || undefined;
                };
                /**
                 * Getter/setter depending on if an argument was supplied
                 */
                ExtendedStateData.prototype.usesLocationSearch = function (use) {
                    if (use === void 0) {
                        // getter
                        return this.get(ExtendedStateData.prop_usesLocationSearch, false);
                    }
                    return this.set(ExtendedStateData.prop_usesLocationSearch, use === true);
                };
                // What follows are shortcut methods and properties
                ExtendedStateData.prop_usesLocationSearch = 'usesLocationSearch';
                return ExtendedStateData;
            })();
            StateData.ExtendedStateData = ExtendedStateData;
            StateData.module = new UiRouterStateData().createModule();
        })(StateData = Router.StateData || (Router.StateData = {}));
    })(Router = Ui.Router || (Ui.Router = {}));
})(Ui || (Ui = {}));
//# sourceMappingURL=ui-router-stateData.module.js.map