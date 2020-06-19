function gameover() {
	
	var scoretext;
	
	this.preload = function () {
	game.load.image("gameover", "gameover.png");
	game.load.image("retry", "retry.png");
	game.load.image("title", "title.png");
	game.load.audio("lose6", "lose6.mp3");
	};
	
	this.create = function () {
		
			var estilo = {
			font: "bold 68px OCR A",
			fill: "#FFFFFF"
		};
		
		musica.destroy();
		lose6 = game.add.audio("lose6" , 3);
		lose6.play();
		
	//fundo
	game.add.tileSprite(0, 0, 800,640, "gameover");
	//configurarretry
	retry = game.add.image(50, 520, "retry");
	retry.inputEnabled = true;
	retry.input.useHandCursor = true;
	retry.events.onInputDown.add(retryFoiClicado);
	//configurartitle
	title = game.add.image(510, 520, "title");
	title.inputEnabled = true;
	title.input.useHandCursor = true;
	title.events.onInputDown.add(titleFoiClicado);
	
		scoretxt = game.add.text(96, 150, "FINAL SCORE:"+pontuacao, estilo);
	fadeIn();
		};

//clicarnoretry
	function retryFoiClicado() {
		fadeOut(fadeOutAcabou);
	}
	function fadeOutAcabou() {
	game.state.start("level1");	
	}
//clicarnotitle
	function titleFoiClicado() {
		fadeOut(fadeOutAcabo);
	}
	function fadeOutAcabo() {
	game.state.start("menu");	
	}
	
	
}