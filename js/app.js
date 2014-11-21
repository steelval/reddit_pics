
(function (){
    var app = angular.module('reddit', []);

    app.controller('RedditController', ['$http', function($http){
        var all_pics = this;
        all_pics.pics = [];

        $http.get('http://www.reddit.com/r/pics/.json?&jsonp=').success(function(data){
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
                    this.src = "img/oops.jpg";
                });
                element[0].onerror = function (evt){
                    this.src = "img/oops.jpg";
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

})();