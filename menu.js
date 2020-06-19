var telas = ["menu", "gameover", "level1", "level2", "level3", "level4", "level5", "fim", "bonus", "intro"];
var larguraJogo = 800;
var alturaJogo = 640;


function menu() {
	
	var texto;
	var setas;
	var konami = 0;
	
	this.preload = function () { 
	game.load.image("fundo", "titlefundo.png");
	game.load.image("start", "titlestart.png");
	game.load.image("title","titlesandmann.png");
	game.load.image("start2", "startbranco.png");
	game.load.audio("musica", "musica.mp3");
};
	
	this.create = function () {
		konami = 0;
		setas = game.input.keyboard.createCursorKeys();
		a = game.input.keyboard.addKey(Phaser.KeyCode.A);
		b = game.input.keyboard.addKey(Phaser.KeyCode.B);
		enter = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);

//fundo
		game.add.tileSprite(0, 0, 800,600, "fundo");
//título
		title = game.add.image(200, 20, "title");
//configurarstart
		start = game.add.image(524, 360, "start");
		start.inputEnabled = true;
		start.input.useHandCursor = true;
		start.events.onInputDown.add(startFoiClicado);
		fadeIn();
//musica
		musica = game.add.audio("musica" , 0.3);
		musica.loop = true;
		musica.play();
		
};
	this.update = function () {
	
//	konami
	
		
		if (konami === 0 && setas.up.isDown)
		{
		konami++;
		}
		if (konami == 1 && !setas.up.isDown)
		{
		konami++;
		
		}
		if (konami == 2 && setas.up.isDown)
		{
		konami++;
		
		}
		if (konami == 3 && !setas.up.isDown)
		{
		konami++;
		
		}
		if (konami ==4 && setas.down.isDown)
		{
		konami++;
		}
		if (konami ==5 && !setas.down.isDown)
		{
		konami++;
		}
		if (konami ==6 && setas.down.isDown)
		{
		konami++;
		}
		if (konami ==7 && !setas.down.isDown)
		{
		konami++;
		}
		
		if (konami === 8 && setas.left.isDown)
		{
		konami++;
		}
		if (konami == 9 && !setas.left.isDown)
		{
		konami++;
		
		}
		if (konami == 10 && setas.right.isDown)
		{
		konami++;
		
		}
		if (konami == 11 && !setas.right.isDown)
		{
		konami++;
		
		}
		if (konami ==12 && setas.left.isDown)
		{
		konami++;
		}
		if (konami ==13 && !setas.left.isDown)
		{
		konami++;
		}
		if (konami ==14 && setas.right.isDown)
		{
		konami++;
		}
		if (konami ==15 && !setas.right.isDown)
		{
		konami++;
		}
		if (konami ==16 && b.isDown)
		{
		konami++;	
		}
		if (konami ==17 && !b.isDown)
		{
		konami++;
		}
		if (konami ==18 && a.isDown)
		{
		konami++;
		}
		if (konami ==19 && !a.isDown)
		{
		konami++;
		}
		if (konami ==20 && enter.isDown)
		{
			game.state.start("bonus");
		}
	
		
		
	};
//clicarnostart
	function startFoiClicado() {
		fadeOut(fadeOutAcabou);
		
		
	}
//fadeoutclick
	function fadeOutAcabou() {
		
		// Apenas inicia a primeira tela do jogo.
		game.state.start("intro");
		
	}
	

}





