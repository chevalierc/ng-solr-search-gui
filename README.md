# ng-solr-search-gui
angular 1 Solr Search Webapp

Uses angular 1, angular-materials, fa-fonts.

##config

Config is located at `public/app/main/config.js`

```
        keyword_columns: [ "compoundId", "projectCode" ], //what columns will be parsed for autocomplete
        solr_url: "http://localhost:8080/solr/core", //location of solr core
        as_jsonp: true, //request as via typical http call or through jsonp. Jsonp avoids same-content errors
        store_query_in_url: false, //stores most in memory settings (filters, sort, page) in url so reloads save location/ search is shareable

        //columns to be used in search.
        columns: [ {
            display: "Compound ID",
            val: "compoundId",
            show_in_results: true, //changeable by user but determines the default
            show_in_filters: true //is it avaialable to user to be a facet
        }],

        sort_options: [ {
            val: null, //needed
            display: "Relevance"
        }, {
            val: "fileTimeModified asc",
            display: "File Modified (ASC)"
        }, {
            val: "fileTimeModified desc",
            display: "File Modified (DESC)"
        } ] {
 ```
