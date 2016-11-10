angular.module( 'app', [
    'ngMaterial',
    'ngAnimate',
    'ngRoute',
    'ngCookies',

    'app.routes',
    'mainCtrl',

    'resizer',

    'search.service',
    'query.service',

    'advancedSearch.directive',
    'configure.directive',
    'dateFilter.directive',
    'facets.directive',
    'filters.directive',
    'guiSearch.directive',
    'quickSearch.directive',
    'results.directive'
] )
