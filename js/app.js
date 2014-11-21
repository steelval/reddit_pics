
(function (){
    var app = angular.module('reddit', []);

    app.controller('RedditController', function () {
        this.pics = all_pics;
    });

    var all_pics = [
        {kind: "t2",
            data: {
                author: "JEWPACOLYPSE",
                subreddit: "aww",
                score: "277",
                title: "They get along fairly well",
                url: "http://i.imgur.com/pXo6yG5.jpg",
                created: 123456789.0
            }
        },
        {kind: "t2",
            data: {
                author: "JEWPACOLYPSE",
                subreddit: "aww",
                score: "5910",
                title: "Current march in Mexico City against the government, taken in the Zocalo. Bring awareness to our cause, please.",
                url: "http://i.imgur.com/rzzs9Sk.jpg.gif",
                created: 123456789.0
            }
        }
    ]


})();