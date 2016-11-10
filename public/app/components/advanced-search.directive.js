angular.module( 'advancedSearch.directive', [] )

.directive( 'advancedSearch', function () {
    return {
        templateUrl: 'app/components/advanced-search.directive.html',
        scope: {
            params: '=',
            search: '&'
        },
        link: function ( vm, element, attrs ) {

            vm.column_to_add = "default"
            vm.columns = get_config().columns

            vm.add_to_search = function () {
                if ( vm.params.term.length != 0 ) vm.params.term += " AND "
                vm.params.term += vm.column_to_add + ": VAL"
                vm.column_to_add = "default"
            }

            vm.submit = function(){
                vm.search()
            }

        }
    };
} )
