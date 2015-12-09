require.config({
    baseUrl:'javascripts',
    paths:{
        'angular':'angular.min',
        'query':'reJs/query',
        'jquery':'jquery'
    }
});

define(['jquery'],function($){

    require(['query'],function(query){
        console.log(query);
        console.log(query.query('body'));
    });

});