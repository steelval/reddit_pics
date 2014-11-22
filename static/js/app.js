
(function (){

    function getURLParameter(name) {
        var rex = RegExp(name + '=' + '(.+?)(&|$)');
        var result = rex.exec(location.search);
        var rv = decodeURI(
            (result||[,null])[1]
        );
        return rv;
    }

    function makeUrl() {
        var url = 'http://www.reddit.com/r/all/.json?count=25&'
        var after = getURLParameter("after");
        var before = getURLParameter("before");
        url += (typeof after != "undefined" ? "&after=" + after : "");
        url += (typeof before != "undefined" ? "&before=" + before : "");
        return url
    }

    var app = angular.module('reddit', []);

    app.controller('RedditController', ['$http', '$scope', function($http, $scope){
        var all_pics = this;

        // initial state
        all_pics.pics = [];
        var url = makeUrl();
        var after = null;
        var before = null;

        $scope.isAfter = function(){return !!after;}
        $scope.isBefore = function(){return !!before;}

        $http.get(url).success(function(data){
            before = data.data.children[0].data.name;
            after = data.data.children.pop().data.name;

            $scope.urlBefore = "?before=" + before;
            $scope.urlAfter = "?after=" + after;
            all_pics.pics = data.data.children;
        });
    }]);

    app.filter('addExtension', function(){
        return function(input) {
            var a = input.split(".").pop();
            if( a.length === 3 || a.length === 4 ) {
                return input;
            }
            return input + ".jpg";
        }
    });

    app.directive('watchimg', function(){
        return {
            link: function(scope, element, attrs){
                element.bind("error", function(e){
                    this.src = "static/img/oops.jpg";
                });
                element[0].onerror = function (evt){
                    this.src = "static/img/oops.jpg";
                }
            }
        }
    });

    app.directive("singlePic", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/pic_template.html"
        };
    });

    app.filter('submitted', function(){
        return function(created_utc) {
            var now = Date.now();
            var difference = now - created_utc*1000;

            var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
            difference -= daysDifference * 1000 * 60 * 60 * 24;

            var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
            difference -= hoursDifference * 1000 * 60 * 60;

            var minutesDifference = Math.floor(difference / 1000 / 60);

            return "submitted " + (daysDifference ? daysDifference + " day(s) " : "" ) + (hoursDifference ? hoursDifference + " hour(s) and " : "" ) + minutesDifference + ' minute(s) ago'
        }
    })

})();