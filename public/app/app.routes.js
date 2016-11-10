angular.module( 'app.routes', [ 'ngRoute' ] )

.config( function( $routeProvider, $locationProvider ) {

    $routeProvider

    //Misc Pages
    .when( '/', {
        templateUrl: 'app/main/search.html'
    } )

    $locationProvider.html5Mode( true );

} )

//clean up console. No blindindividual is using this app
.decorator('$mdAria', function mdAriaDecorator($delegate) {
    $delegate.expect = angular.noop;
    $delegate.expectAsync = angular.noop;
    $delegate.expectWithText = angular.noop;
    return $delegate;
});
