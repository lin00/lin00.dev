/*global $*/
/*jslint sloppy: true, browser: true*/

var $rock = $('.rock');
var $paper = $('.paper');
var $scissor = $('.scissor');


$rock.on('click', function (e) {
    if (Math.random(1) > 0.5) {
        window.location.href = "rock-win.html";
    } else {
        window.location.href = "rock-lose.html";
    }
});

$paper.on('click', function (e) {
    if (Math.random(1) > 0.5) {
        window.location.href = "paper-win.html";
    } else {
        window.location.href = "paper-lose.html";
    }
});

$scissor.on('click', function (e) {
    if (Math.random(1) > 0.5) {
        window.location.href = "scissor-win.html";
    } else {
        window.location.href = "scissor-lose.html";
    }
});