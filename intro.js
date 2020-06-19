function intro() {
	

	this.preload = function () {
	game.load.image("intro", "intro.png");
	game.load.image("title", "skip.png");
	game.load.audio("flavio1", "flavio1.mp3");
	};
	
	this.create = function () {
		
	game.add.image(0, 0, "intro");
		

	//configurartitle
	title = game.add.image(320, 550, "title");
	title.inputEnabled = true;
	title.input.useHandCursor = true;
	title.events.onInputDown.add(titleFoiClicado);
	fadeIn();
		};


//clicarnotitle
	function titleFoiClicado() {
		fadeOut(fadeOutAcabou);
	}
	function fadeOutAcabou() {
	flavio = game.add.audio("flavio1" , 2);
	flavio.play();
	game.state.start("level1");	
	}
	
	
}