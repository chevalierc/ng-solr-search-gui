angular.module( 'facets.directive', [] )

.directive( 'facets', function ( $location, query_service ) {
    return {
        templateUrl: 'app/components/facets.directive.html',
        scope: {
            params: '=params',
            meta: '=',
            search: "&"
        },
        link: function ( vm, element, attrs ) {

            vm.facet_to_add = "default"
            vm.columns = get_config().columns

            vm.add_facet = function () {
                if ( vm.params.facets.indexOf( vm.facet_to_add ) == -1 ) {
                    vm.params.facets.push( vm.facet_to_add )
                    vm.facet_to_add = "default"
                    query_service.refresh_facet_query(vm.params)
                    vm.search()
                }
            }

            vm.remove_facet = function ( index ) {
                vm.params.facets.splice( index, 1 )
                vm.meta.facet_results.splice( index, 1 )
                query_service.refresh_facet_query(vm.params)
            }
            
            vm.add_filter = function ( value, column ) {
                for ( var i = 0; i < vm.params.filters.length; i++ ) {
                    if ( vm.params.filters[ i ].val == value && vm.params.filters[ i ].column == column ) return 0;
                }
                var filter = {
                    'column': column,
                    'val': value
                }
                vm.params.filters.push( filter )
                query_service.refresh_filter_query(vm.params)
                vm.search()
            }

        }
    };
} )
