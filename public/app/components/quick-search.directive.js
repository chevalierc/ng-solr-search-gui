angular.module( 'quickSearch.directive', [] )

.directive( 'quickSearch', function ( ) {
    return {
        templateUrl: 'app/components/quick-search.directive.html',
        scope: {
            params: '=',
            search: '&',
            get_autocomplete_suggestions: '=autocomplete'
        },
        link: function ( vm, element, attrs ) {

            vm.submit = function(){
                vm.search()
            }
        }
    };
} )
