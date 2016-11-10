var get_config = function () {
    return {
        keyword_columns: [ "compoundId", "projectCode", "personUserFullName", "experimentSite" ],
        solr_url: "http://localhost:8080/solr/sdc",
        as_jsonp: true,
        store_query_in_url: true,

        columns: [ {
            display: "Compound ID",
            val: "compoundId",
            show_in_results: true,
            show_in_filters: true
        }, {
            display: "Project Code",
            val: "projectCode",
            show_in_results: true,
            show_in_filters: true
        }, {
            display: "Project Description",
            val: "projectDescription",
            show_in_results: true,
            show_in_filters: true
        }, {
            display: "User Full Name",
            val: "personUserFullName",
            show_in_results: true,
            show_in_filters: true
        }, {
            display: "Experiment ID",
            val: "experimentID",
            show_in_results: true,
            show_in_filters: true
        }, {
            display: "Experiment Site",
            val: "experimentSite",
            show_in_results: true,
            show_in_filters: true
        }, {
            display: "Experiment Title",
            val: "experimentTitle",
            show_in_results: false,
            show_in_filters: true
        }, {
            display: "Experiment Keywords",
            val: "experimentKeywords",
            show_in_results: true,
            show_in_filters: true
        }, {
            display: "Experiment Group",
            val: "experimentGroup",
            show_in_results: true,
            show_in_filters: true
        }, {
            display: "Experiment Division",
            val: "experimentDivision",
            show_in_results: true,
            show_in_filters: true
        }, {
            display: "Experiment Line",
            val: "experimentLine",
            show_in_results: true,
            show_in_filters: true
        }, {
            display: "Experiment Work Category",
            val: "experimentWorkCategory",
            show_in_results: true,
            show_in_filters: true
        }, {
            display: "File Time Created",
            val: "fileTimeCreated",
            show_in_results: false,
            show_in_filters: false,
            is_date: true
        }, {
            display: "File Time Modified",
            val: "fileTimeModified",
            show_in_results: true,
            show_in_filters: false,
            is_date: true
        } ],

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
