angular.module( 'dateFilter.directive', [] )

.directive( 'dateFilter', function ( $location, query_service ) {
    return {
        templateUrl: 'app/components/date-filter.directive.html',
        scope: {
            params: '=',
            search: '&'
        },
        link: function ( vm, element, attrs ) {

            vm.remove_filters = function () {
                vm.params.date.start = null
                vm.params.date.end = null
                query_service.refresh_date_query(vm.params)
                vm.search()
            }

            vm.update = function () {
                query_service.refresh_date_query(vm.params)
                vm.search()
            }

        }
    };
} )
