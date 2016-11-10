angular.module( 'configure.directive', [] )

.directive( 'configure', function ( $cookies ) {
    return {
        templateUrl: 'app/components/configure.directive.html',
        scope: {
            columns: '=',
            meta: "="
        },
        link: function ( vm, element, attrs ) {

            var to_cookie = function ( columns ) {
                var pref_obj = {
                    columns: [],
                    results_per_page: 10
                }
                for ( var i = 0; i < columns.length; i++ ) {
                    pref_obj.columns.push( columns[ i ].show_in_results )
                }
                var per_page = vm.meta.results_per_page
                if ( per_page && per_page > 0 && per_page < 101 ) {
                    pref_obj.results_per_page = per_page
                }
                return pref_obj
            }

            var set_prefs_from_cookie = function ( prefs ) {
                if ( prefs ) {
                    for ( var i = 0; i < prefs.columns.length; i++ ) {
                        vm.columns[ i ].show_in_results = prefs.columns[ i ]
                    }
                    vm.meta.results_per_page = prefs.results_per_page
                }
            }

            var update_prefs_from_cookie = function () {
                set_prefs_from_cookie( $cookies.getObject( "prefs" ) )
            }

            vm.set_column_prefs = function () {
                $cookies.putObject( "prefs", to_cookie( vm.columns ) )
            }

            update_prefs_from_cookie()
        }
    };
} )
