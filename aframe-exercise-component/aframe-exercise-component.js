var exercise = {}

exercise.loseCondition = (currentTime, totalTimeAllowed) => (currentTime > totalTimeAllowed) ;
exercise.totalTimeAllowed = 10 * 1000; //10sec
exercise.currentTime = 0;

exercise.winCondition = (matchedColors, colorsToMatch) => (matchedColors >= colorsToMatch);
exercise.colorsToMatch = 3;
exercise.matchedColors = 0;

exercise.currentColor = "";
exercise.lastMatchedColor = "";


AFRAME.registerComponent('exercise-source', {
  // check which color to send
  init: function () {
    var el = this.el
    exercise.instructionEl = document.querySelector("#exercise-instruction")
    exercise.feedbackEl = document.querySelector("#exercise-feedback")

    this.el.addEventListener('click', function (evt) {
        if ( el.getAttribute("geometry") != "a-sphere")
		exercise.currentColor = el.getAttribute('color')
	if ( exercise.lastMatchedColor == exercise.currentColor )
		exercise.matchedColors++

	if ( exercise.winCondition( exercise.matchedColors, exercise.colorsToMatch ) ){
		exercise.feedbackEl.setAttribute("text", "value", "Congratulations, you win!" )
	} else {
		exercise.feedbackEl.setAttribute("text", "value", exercise.matchedColors + " matched, nice." )
	}

	if ( exercise.loseCondition( exercise.currentTime, exercise.totalTimeAllowed ) ) return // once you lost, you lost

	exercise.lastMatchedColor = exercise.currentColor
    });
  },
  tick: function(){
	exercise.currentTime++; // not that precise, just for the sake of pedagogy
	if ( exercise.winCondition( exercise.matchedColors, exercise.colorsToMatch ) ) return // once you won, you won forever
	if ( exercise.loseCondition( exercise.currentTime, exercise.totalTimeAllowed ) ) {
		exercise.feedbackEl.setAttribute("text", "value", "Oops... too late you lost :(" )
	}
  }
});
