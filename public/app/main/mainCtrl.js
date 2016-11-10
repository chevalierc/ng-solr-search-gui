angular.module( 'mainCtrl', [] )

.controller( 'mainController', function ( $scope, search_service, query_service, $location, $scope, $location ) {
    var vm = this;

    var top_of_page = function () {} //just for my IDE TODO: remove later

    //VARIABLES
    vm.columns = get_config().columns

    vm.params = {
        results_per_page: 10,
        page: 1,
        term: "",
        main_query: "",
        search_method: "New Search",
        sort: null,
        facets: [ "compoundId" ],
        filters: [],
        date: {
            start: null,
            end: null,
            created: "Created"
        },
        advanced_search: {
            logic: "AND",
            queries: [ {
                column: "",
                val: ""
            } ]
        }
    }

    vm.meta = {
        num_found: 0,
        speed: 0,
        start: 0,
        end: 0,
        num_of_pages: 0,
        message: "",
        facet_results: []
    }

    vm.results = []

    var keywords = []

    vm.searching = false
    var store_query_in_url = get_config().store_query_in_url

    //prototypes
    String.prototype.clean_text = function () {
        var clean_text = this.replace( /([A-Z])/g, function ( char ) {
            return " " + char.toUpperCase();
        } )
        clean_text = clean_text.charAt( 0 ).toUpperCase() + clean_text.slice( 1 );
        clean_text = clean_text.replace( /(Id)/, function ( substring ) {
            return substring.toUpperCase();
        } );
        clean_text = clean_text.replace( /(I D)/, function () {
            return "ID";
        } );
        return clean_text
    };

    String.prototype.display_date = function () {
        var date = new Date( this )
        return date.toUTCString()
    };

    //INITITILIZATIONS / GET data from path / get data from cookies

    angular.element( document ).ready( function () {
        update_from_url()
        get_search_suggestion_keywords( function () {
            query_service.refresh_all( vm.params, vm.meta )
            vm.search() //Cannot search unless document is ready and scope!!!
        } )
    } );

    var update_from_url = function () {
        if ( store_query_in_url ) {
            var url_params = $location.search()
            if ( url_params.filters ) vm.params.filters = JSON.parse( url_params.filters )
            if ( url_params.facets ) vm.params.facets = JSON.parse( url_params.facets )
            if ( url_params.sort ) vm.params.sort = JSON.parse( url_params.sort )
            if ( url_params.date ) vm.params.date = JSON.parse( url_params.date )
            if ( url_params.page ) vm.params.page = JSON.parse( url_params.page )
            if ( url_params.main_query ) vm.params.main_query = JSON.parse( url_params.main_query )
            if ( url_params.term ) vm.params.term = JSON.parse( url_params.term )
        }
    }

    /////////////////////////////////////////////////////////////////
    //SEARCH SUGGESTIONS

    var get_search_suggestion_keywords = function ( cb ) {
        var query = "&q=*:*&rows=0&facet=on"
        var columns_to_get_keywords = get_config().keyword_columns
        for ( var i = 0; i < columns_to_get_keywords.length; i++ ) {
            query += "&facet.field=" + columns_to_get_keywords[ i ]
        }
        search_service.search( query ).then( function ( res ) {
            var facet_res = res.facet_counts.facet_fields
            for ( var column in facet_res ) {
                cur_facet = facet_res[ column ]
                for ( var i = 0; i < cur_facet.length; i = i + 2 ) {
                    keywords.push( cur_facet[ i ] )
                }
            }
            cb()
        } )
    }

    vm.get_autocomplete_suggestions = function ( query ) {
        return keywords.filter( create_filter_for( query ) );
    }
    var create_filter_for = function ( query ) {
        var lowercaseQuery = angular.lowercase( query );
        return function filterFn( item ) {
            return ( item.indexOf( lowercaseQuery ) === 0 );
        }
    }

    ////////////////////////////////////////////////////////////////
    //SEARCH HELPERS: Queries builders, results handler, etc

    var handle_results = function ( res ) {
        vm.results = res.response.docs
        vm.meta.facet_results = make_facet_parsable( res.facet_counts )
        vm.meta.num_found = res.response.numFound
        vm.meta.start = res.response.start
        vm.meta.end = res.response.start + vm.params.results_per_page
        if ( vm.meta.end > vm.meta.num_found ) vm.meta.end = vm.meta.num_found
        vm.meta.num_of_pages = Math.ceil( vm.meta.num_found / vm.params.results_per_page )
        vm.meta.message = "Showing " + vm.meta.start + '-' + vm.meta.end + " of " + vm.meta.num_found
        vm.meta.message += ". Found in " + vm.meta.speed + "ms (server: " + res.responseHeader.QTime + " ms)"
    }

    var make_facet_parsable = function ( facet ) {
        var res = []
        if ( facet ) {
            for ( var column in facet.facet_fields ) {
                res.push( {
                    column: column,
                    values: []
                } )
                var cur_facet = facet.facet_fields[ column ]
                for ( var i = 0; i < cur_facet.length; i = i + 2 ) {
                    res[ res.length - 1 ].values.push( {
                        val: cur_facet[ i ],
                        num: cur_facet[ i + 1 ]
                    } )
                }
            }
        }
        return res
    }

    ////////////////////////////////////////////////////////////////
    //EXPOSED METHODS

    vm.search = function ( ) {
        if ( vm.params.search_method == "New Search" ) {
            query_service.refresh_main_query( vm.params )
            vm.params.page = 1
        } else if ( vm.params.search_method == "Search Results" ) {
            vm.params.filters.push( {
                query: vm.params.term
            } )
            query_service.refresh_filter_query( vm.params )
        }
        vm.refresh()
    }

    vm.refresh = function ( location ) {
        if ( !vm.searching ) {
            var start = new Date()
            vm.searching = true
            var query = query_service.get_query()
            search_service.search( query ).then( function ( res ) {
                var end = new Date()
                vm.searching = false
                vm.meta.speed = end - start
                handle_results( res )
            } )
        }
    }


} )
