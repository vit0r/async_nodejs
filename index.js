var async = require('async');
var GithubApi = require('github');

var github = new GithubApi({ version: '3.0.0' });

/*SERIES*/

async.series([
    function vit0r(callback) {
        github.search.users({ q: 'vit0r' }, function (err, res) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, res.data.items);
        });
    },
    function watson(callback) {
        github.search.users({ q: 'watsonwilliam' }, function (err, res) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, res.data);
        });
    },
    function anderson(callback) {
        github.search.users({ q: 'andersonCiandT' }, function (err, res) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, res.data);
        });
    }


], function (err, data) {
    console.log(data);
});

/*EACH*/

var userNames = ['vit0r', 'watsonwilliam', 'andersonCiandT'];
var gits = [];

async.each(userNames, function (userName, callback) {
    github.search.users({ q: userName }, function (err, res) {
        if (err) {
            callback(err, null);
            return;
        }
        gits.push(res.data);
        callback();
    });
}, function (err, data) {
    if (err) {
        console.error('Error ao receber dados %s', err);
        return;
    }
    console.log(gits);
});

//AUTO

async.auto({
    get_user: function(callback) {
        github.search.users({ q: 'vit0r' }, function (err, data) {
            if (err) {
                //call done err
                callback(err, null);
                return;
            }
            callback(null, data);
        });
    },
    get_user_repo: ['get_user', function(data, callback) {
        var login = data.get_user.data.items[0].login;
        github.search.repos({ q: login }, function (err, data) {
            if (err) {
                //call done err
                callback(err, null);
                return;
            }
            callback(null, data);
        });
    }]    
}, function(err, data) {
    //call done
    console.log('data = ', data.get_user_repo.data.items);
});