angular.module( 'results.directive', [] )

.directive( 'results', function ( $location, query_service ) {
    return {
        templateUrl: 'app/components/results.directive.html',
        scope: {
            meta: '=',
            search: '&',
            resultsVal: "=",
            params: "=",
            columns: "="
        },
        link: function ( vm, element, attrs ) {

            vm.sort_options = get_config().sort_options

            var change_page = function () {
                var container = document.getElementById( 'right' );
                container.scrollTop = 0
                query_service.refresh_paging_query( vm.params )
                vm.search()
            }

            vm.next = function () {
                vm.meta.page++;
                change_page()
            }

            vm.back = function () {
                vm.meta.page--;
                change_page()
            }

            vm.sort = function () {
                query_service.refresh_sort_query( vm.params )
                vm.search()
            }

        }
    };
} )
