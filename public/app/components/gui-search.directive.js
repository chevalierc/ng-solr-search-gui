angular.module( 'guiSearch.directive', [] )

.directive( 'guiSearch', function ( ) {
    return {
        templateUrl: 'app/components/gui-search.directive.html',
        scope: {
            params: '=',
            search: '&',
            get_autocomplete_suggestions: '=autocomplete'
        },
        link: function ( vm, element, attrs ) {

            vm.columns = get_config().columns

            vm.submit = function(){
                gui_to_query()
                vm.search()
            }

            var gui_to_query = function(){
                var query = ""
                var logic = vm.params.advanced_search.logic
                for ( var i = 0; i < vm.params.advanced_search.queries.length; i++ ) {
                    var cur_query = vm.params.advanced_search.queries[ i ]
                    if ( cur_query.column && cur_query.val ) {
                        if ( i != 0 ) query += " " + logic + " "
                        query += cur_query.column + ":" + cur_query.val
                    } else if ( cur_query.val ) {
                        if ( i != 0 ) query += " " + logic + " "
                        query += cur_query.val
                    }
                }
                vm.params.term = query
            }

            vm.add_advanced_query = function () {
                vm.params.advanced_search.queries.push( {
                    column: "",
                    val: ""
                } )
            }

            vm.clear_advanced_query = function () {
                var length = vm.params.advanced_search.queries.length
                if ( length > 1 ) {
                    vm.params.advanced_search.queries.splice( length - 1, 1 )
                } else {
                    vm.params.advanced_search.queries = [ {
                        column: "",
                        val: ""
                    } ]
                }
            }

        }
    };
} )
