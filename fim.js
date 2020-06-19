
function fim() {
	
	var scoretxt;
		
		this.preload = function () {
	game.load.image("end", "end.png");
	game.load.image("retry", "retry.png");
	game.load.image("title", "title.png");
	game.load.audio("srs", "kill4.mp3");
	game.load.audio("endmusic", "endmusic.mp3");
	
	
	};
	
	this.create = function () {
	
	var estilo = {
			font: "bold 68px OCR A",
			fill: "#000000"
		};
	musica.destroy();
	musica = game.add.audio("endmusic", 0.3);
	musica.play();
	srs = game.add.audio("srs", 3);
	srs.play();
	//fundo
	game.add.tileSprite(0, 0, 800, 640, "end");
	fadeIn();
	//configurarretry
	retry = game.add.image(25, 390, "retry");
	scoretxt = game.add.text(96, 180, "FINAL SCORE:"+pontuacao, estilo);
	
	fadeIn();
	retry.inputEnabled = true;
	retry.input.useHandCursor = true;
	retry.events.onInputDown.add(retryFoiClicado);
	//configurartitle
	title = game.add.image(535, 390, "title");
	fadeIn();
	title.inputEnabled = true;
	title.input.useHandCursor = true;
	title.events.onInputDown.add(titleFoiClicado);
	
		

	fadeIn();
	
	
	};
//clicarnoretry
	function retryFoiClicado() {
		fadeOut(fadeOutAcabou);
	}
	function fadeOutAcabou() {
	musica.destroy();
	game.state.start("level1");	
	}
//clicarnotitle
	function titleFoiClicado() {
		fadeOut(fadeOutAcabo);
	}
	function fadeOutAcabo() {
	musica.destroy();
	game.state.start("menu");	
	}
	
	
}
