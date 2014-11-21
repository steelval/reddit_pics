
(function (){
    var app = angular.module('reddit', []);

    app.controller('RedditController', ['$http', function($http){
        var all_pics = this;
        all_pics.pics = [];

        $http.get('http://www.reddit.com/r/pics/.json?&jsonp=').success(function(data){
            asd = data.data.children
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
            difference -= daysDifference * 1000 * 60 * 60 * 24

            var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
            difference -= hoursDifference * 1000 * 60 * 60

            var minutesDifference = Math.floor(difference / 1000 / 60);

            return "submitted " + (daysDifference ? daysDifference + " day(s) " : "" ) + (hoursDifference ? hoursDifference + " hour(s) and " : "" ) + minutesDifference + ' minute(s) ago'
        }
    })

})();