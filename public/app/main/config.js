var get_config = function () {
    return {
        keyword_columns: [ "compoundId", "projectCode" ],
        solr_url: "http://localhost:8080/solr/core",
        as_jsonp: true,
        store_query_in_url: false,

        columns: [ {
            display: "Compound ID",
            val: "compoundId",
            show_in_results: true,
            show_in_filters: true
        }],

        sort_options: [ {
            val: null,
            display: "Relevance"
        }, {
            val: "fileTimeModified asc",
            display: "File Modified (ASC)"
        }, {
            val: "fileTimeModified desc",
            display: "File Modified (DESC)"
        }, {
            val: "fileTimeCreated asc",
            display: "File Created (ASC)"
        }, {
            val: "fileTimeCreated desc",
            display: "File Created (DESC)"
        } ]
    }
}
