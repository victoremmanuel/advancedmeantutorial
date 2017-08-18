'use strict';

var request = require('request');
var cheerio = require('cheerio');

exports.list = function(url,cb) {
    request(url,function(error,resp,body) {
        if (error) {
            cb({
                error: error
            });
        }
        if (!error) {
            var $ = cheerio.load(body);
            var pin = {};
            var $url = url;
            var $img = $(".post-image img").attr('src');
            var $desc = $(".post-title").html();
 
            console.log($img + ' imgur url');
            
            var pin = {
                img: $img,
                url: $url,
                desc: $desc
            }

            cb(pin);
        }
    })
}