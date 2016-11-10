angular.module( 'query.service', [] )

.factory( 'query_service', function ( $location ) {
    var query_service = {};

    var store_query_in_url = get_config().store_query_in_url
    var queries = {
        main: null,
        facet: null,
        filter: null,
        paging: null,
        sort: null,
        date: null
    }

    query_service.get_query = function () {
        var string_query = ""
        query_types = [ 'main', "facet", "filter", "paging", "sort", "date" ]
        for ( var i = 0; i < query_types.length; i++ ) {
            var query_type = query_types[ i ]
            if ( queries[ query_type ] ) string_query += queries[ query_type ]
        }
        console.log( "QUERY: ", string_query )
        return string_query
    }

    query_service.refresh_all = function ( params ) {
        query_service.refresh_main_query( params )
        query_service.refresh_facet_query( params )
        query_service.refresh_filter_query( params )
        query_service.refresh_paging_query( params )
        query_service.refresh_sort_query( params )
        query_service.refresh_date_query( params )
    }

    query_service.refresh_main_query = function ( params ) {
        if(params.term == "" || !params.term){
            queries.main = "&q=*:*"
        }else{
            queries.main = "&q=" + params.term
        }
        if ( store_query_in_url ) $location.search( 'main_query', JSON.stringify( params.term ) );
        if ( store_query_in_url ) $location.search( 'term', JSON.stringify( params.term ) );
    }

    query_service.refresh_facet_query = function ( params ) {
        if ( store_query_in_url ) $location.search( 'facets', JSON.stringify( params.facets ) );
        queries.facet = null
        if ( params.facets.length > 0 ) {
            var query = "&facet=on"
            for ( var i = 0; i < params.facets.length; i++ ) {
                query += "&facet.field=" + params.facets[ i ]
            }
            queries.facet = query
        }
    }

    query_service.refresh_filter_query = function ( params ) {
        if ( store_query_in_url ) $location.search( 'filters', JSON.stringify( params.filters ) );
        var query = ""
        for ( var i = 0; i < params.filters.length; i++ ) {
            var filter = params.filters[ i ]
            query += "&fq="
            if ( filter.query ) {
                query += filter.query
            } else {
                query += filter.column + ":" + filter.val
            }
        }
        queries.filter = query
    }

    query_service.refresh_paging_query = function ( params ) {
        if ( store_query_in_url ) $location.search( 'page', JSON.stringify( params.page ) );
        var start = ( params.page - 1 ) * params.results_per_page
        var query = "&rows=" + params.results_per_page
        query += "&start=" + start
        queries.paging = query
    }

    query_service.refresh_sort_query = function ( params ) {
        if ( store_query_in_url ) $location.search( 'sort', JSON.stringify( params.sort ) );
        var query = null
        if ( params.sort ) query = "&sort=" + params.sort
        queries.sort = query
    }

    query_service.refresh_date_query = function ( params ) {
        if ( store_query_in_url ) $location.search( 'date', JSON.stringify( params.date ) );
        if ( params.date.created == "Created" ) {
            var query = "&fq=fileTimeCreated:["
        } else {
            var query = "&fq=fileTimeModified:["
        }
        params.date.start ? query += params.date.start.toISOString() : query += "*"
        query += " TO "
        params.date.end ? query += params.date.end.toISOString() : query += "*"
        query += "]"
        queries.date = query
    }

    return query_service;

} )
