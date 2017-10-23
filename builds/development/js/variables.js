const BOARD = document.querySelector("#board");
const HEADER = document.querySelector('#header');
const BTN = document.querySelector('#resetBtn');
const TIMER = document.querySelector('#timer');
const COUNT = document.querySelector('#counter');


var allGrids = [];
var level = 99; //99
var col = 30; //30
var row = 16; //16

var width;
var height;
var cellLength;


var leftButtonDown = false;
var rightButtonDown = false;

var interval;
var time = 0;
var count = level;

var gameStart = false, gameEnd = false;
