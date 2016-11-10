angular.module( 'search.service', [] )

.factory( 'search_service', function ( $q, $http ) {
    var search_service = {};
    var solr_url = get_config().solr_url

    var searching = false
    var jobs = []

    search_service.search = function ( query ) {
        return $q( function ( resolve, reject ) {
            angular.element( document ).ready( function () {

                if ( get_config().as_jsonp ) {
                    jobs.push({
                        query: query,
                        cb: resolve
                    })
                    if ( !searching ) {
                        json_search()
                    }
                } else {
                    //GET AS JSON (safer but must be on same server/ have permission /etc)
                    $http.get( solr_url + '/select?wt=json' + query ).success( function ( res ) {
                        resolve( res )
                    } )
                }
            } )
        } )

    };

    var json_search = function(){
        console.log(jobs[0])
        searching = true
        var query = jobs[0].query
        var cb = jobs[0].cb
        jobs = jobs.splice(1)

        var jsonpReq = document.createElement( "script" );

        /*Json callback, called from injected script tag*/
        loadResults = function ( jsonResp ) {
            searching = false
            cb( jsonResp )
            if(jobs.length > 0){
                json_search()
            }
        };

        jsonpReq.src = solr_url + '/select?wt=json&json.wrf=loadResults' + query;
        jsonpReq.type = "text/javascript";
        document.body.appendChild( jsonpReq );
    }

    return search_service;
} )
