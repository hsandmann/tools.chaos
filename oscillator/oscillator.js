$(document).ready(function() {

	var illustrationFunctions = [
		kuramoto,
//		integratefire,
//		tinkerbell
	];

	var requestAnimationFrame =  
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(callback) {
			return setTimeout(callback, 1);
		};

	var N = 10;
	var sample = 200;
	var x0 = 0.01;
	var mu = 3.2;
	var func = null;

	var data = null;
	var graph = null;

/*
	$('#x0').on('input change', function(){
		x0 = (parseInt($(this).val()) * (func.y.max - func.y.min)) / 100 + func.y.min;
//		console.log("mu: " + mu + " , x0 = " + x0);
		draw(func, mu, x0);
	});

	$('#mu').on('input change', function(){
		mu = (parseInt($(this).val()) * (func.mu.max - func.mu.min)) / 100 + func.mu.min;
//		console.log("mu: " + mu + " , x0 = " + x0);
		draw(func, mu, x0);
	});

*/

	function init() {

		requestAnimationFrame(plot);
		changeFunction(illustrationFunctions[0]);

	}

	function changeFunction(f) {
		func = f;
		var t = $("<table/>");
/*
		$.each(func.params, function(i, p) {
			t.append($("<tr/>")
				.append($("<td/>")
					.html(p)
					.addClass('right')
				).append($("<td/>").append(
					$("<input/>")
					.attr("data-param", p)
					.val(func[p])
					.addClass('right')
				)));
		});
*/
		$("#parameters").empty().append(t);

//		$("#n").val(func.N);
//		$("#step").val(func.step);

		plot();
	}


	var graphPhases = {

		element: document.getElementById("canvasPhases"),
		ctx    : function() { return this.element.getContext("2d"); },

		func   : null,

		height : function() { return this.element.height; },
		width  : function() { return this.element.width;  },

		h      : 1,
		w      : 1,
		rh     : 1,
		rw     : 1,

		getX   : function(x) { return this.rw * (x - this.func.mu.min); },
		getY   : function(y) { return this.h - this.rh * (y - this.func.y.min); },

		init   : function(f) {
			this.func = f;
			this.h = this.height();
			this.w = this.width();
			this.rh = this.h / (f.y.max - f.y.min);
			this.rw = this.w / (f.x.max - f.x.min);
			this.ctx().clearRect(0, 0, this.w, this.h);

			this.ctx().beginPath();
			var c = this.h > this.w ? this.w : this.h;
			this.ctx().arc((c/2), (c/2), (c*0.40), 0, 2 * Math.PI);
			this.ctx().strokeStyle = "#CCCCCC";
			this.ctx().lineWidth = 1;
			this.ctx().stroke();
			this.ctx().closePath();
		},

		close  : function() {
		},

		plot   : function(mu, x) {
			this.ctx().beginPath();
			this.ctx().fillRect(this.getX(mu), this.getY(x), 1, 1);
			this.ctx().closePath();
		}

	};

	function plot() {

		graphPhases.init(func);

	}




	init();

});
