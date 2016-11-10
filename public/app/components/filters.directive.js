angular.module( 'filters.directive', [] )

.directive( 'filters', function ( $location, query_service ) {
    return {
        templateUrl: 'app/components/filters.directive.html',
        scope: {
            search: '&',
            params: '='
        },
        link: function ( vm, element, attrs ) {

            vm.remove_filters = function () {
                vm.params.filters = []
                query_service.refresh_filter_query( vm.params )
                vm.search()
            }

            vm.remove_filter = function ( index ) {
                vm.params.filters.splice( index, 1 )
                query_service.refresh_filter_query( vm.params )
                vm.search()
            }

        }
    };
} )
