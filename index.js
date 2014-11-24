(function() {

	var infoTmpl = $('#info_tmpl').text();

	var Test = function(data) {
		this._data = _(data).shuffle();
		this._done = -1;
		this._correct = 0;
	};

	Test.prototype.start = function() {
		$('#start').hide();
	    $('#finish').hide();
	    $('#test').show();
		$('#pass').click(this._pass.bind(this));
        $('#fail').click(this._fail.bind(this));
        $('#countdown-label').removeClass().addClass('alert').addClass('alert-info');

        var scope = this;
	    
	    var totalTime = 60;
	    var counter = totalTime;
	    
	    function tick() {
	        $('#countdown').html(counter);
	        this._timer = window.setTimeout(next, 1000);
	    }

	    function next() {
	        counter--;
	        if (counter == 0) {
	        	scope._finish();	            
	        }
	        else {
	            if (counter < 10) {
	                $('#countdown-label').removeClass('alert-warning').addClass('alert-danger');
	            } else if (counter < 20) {
	                $('#countdown-label').removeClass('alert-info').addClass('alert-warning');
	            }
	            tick();
	        }
	    }
	    tick();
	    this._nextWord();

	};

	Test.prototype._pass = function () {
	    this._correct++;
	    this._nextWord();
	};

	Test.prototype._nextWord = function () {
	    if(this._data.length == 0) {
	        clearTimeout(this._timer);
	        $('#spell').text('Well done, you finished the list.');
	        $('#buttons').remove();
	    } else {
	        var w = this._data.pop();
	        $('#eng-word').text(w[0]);
	        $('#fr-word').text(w[1]);
	    }
	    this._done++;
		$('#info').empty().html(Mustache.render(infoTmpl, {completed: this._done, correct: this._correct}));
	};

	Test.prototype._fail = function () {
    	this._nextWord();
	};

	Test.prototype._finish = function () {
		var info = $('#info');
	    $('#test').hide()
	    $('#completed').text(this._done);
	    $('#correct').text(this._correct);
        $('#finish').show();
        $('#start').show();
	$('#finish_info').empty().html(Mustache.render(infoTmpl, {completed: this._done, correct: this._correct}));
        //$('#test').html('Finished!  ' + done + ' words completed, ' + correct + ' correct.' );
	};

	$(function() {
        $.getJSON('data.json', null, function(data) {
			$('#start').click(function () {
				new Test(data).start();
			});
        });
    });

})();



