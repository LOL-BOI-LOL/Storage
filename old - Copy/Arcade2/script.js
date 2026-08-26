const canvas = document.getElementById('Machine').getContext('2d');
const vwtopx = function (vw) { return vw*window.innerWidth/100; };
const vhtopx = function (vh) { return vh*window.innerHeight/100; };
Number.prototype.vwtopx = this*window.innerHeight/100;

canvas.fillRect(vwtopx(25), vhtopx(25), vwtopx(50), vhtopx(50));