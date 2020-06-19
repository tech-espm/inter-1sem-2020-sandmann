

function level5() {
	
	var dude;
	var setas;
	var teclaTiro;
	var horaParaOProximoTiro;
	var tiros;
	var inimigos;
	var ultimoLadoOlhado, direcaoTiroX, direcaoTiroY;
	var speed;
	
	var scoretxt;
	var vidastxt;
	var flaviotxt;
	var flaviovida;
	var morto = false;
	
	var inimigosMortos;
	var numeroInimigos;
	
	var posicoesSpawn = [
		{ x: 32, y: 32 },
		{ x: 784, y: 32 },
		{ x: 784, y: 624 },
		{ x: 32, y: 624 },
		{ x: 542, y: 32 },
		{ x: 294, y: 32 },
		{ x: 694, y: 524 },
		{ x: 142, y: 624 },
		{ x: 732, y: 342 },
		{ x: 784, y: 542 },
		{ x: 784, y: 644 },
		{ x: 32, y: 644 },
		{ x: 132, y: 32 },
		{ x: 684, y: 32 },
		{ x: 684, y: 624 },
		{ x: 132, y: 624 },
		{ x: 32, y: 132 },
		{ x: 784, y: 132 },
		{ x: 784, y: 524 },
		{ x: 32, y: 524 },
		{ x: 332, y: 32 },
		{ x: 484, y: 32 },
		{ x: 484, y: 624 },
		{ x: 332, y: 624 },
		{ x: 232, y: 232 },
		{ x: 784, y: 332 },
		{ x: 784, y: 324 },
		{ x: 32, y: 324 },
		{ x: 362, y: 82 },
		{ x: 444, y: 82 },
	
	
	
	
	
	
		
		
	
		
	];
	
	this.preload = function () {
		
		game.stage.backgroundColor = "#202020";
		
		// http://tech-espm.github.io/labs-editor/phaser/game/examples/assets/dude.png
		game.load.tilemap('level5', 'level5.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiletech', 'tiletech.png');
		game.load.image('bossroom', 'bossroom.png');
		game.load.spritesheet("dude", "humberto.png", 32, 32);
		game.load.spritesheet("antidude", "bixo.png", 32, 32);
		game.load.spritesheet("antidude2", "ciborg.png", 16, 16);
		game.load.spritesheet("flavio", "flavio.png", 128, 120);
		game.load.image('nuvem','nuvem.png');
		game.load.audio("musica", "bossmusic.mp3");
		game.load.spritesheet('flavioputo', "flavioputo.png", 128, 120);
	
		//tiros
		game.load.image("tiro", "tirohumb.png");
		
		//sons
		game.load.audio("kill", "kill.mp3");
		game.load.audio("hit", "hit.mp3");
		
		game.load.audio("kill1", "kill1.mp3");
		game.load.audio("kill2", "kill2.mp3");
		game.load.audio("kill3", "kill3.mp3");
		game.load.audio("kill4", "kill4.mp3");
		
		game.load.audio("lose1", "lose1.mp3");
		game.load.audio("lose2", "lose2.mp3");
		game.load.audio("lose3", "lose3.mp3");
		game.load.audio("lose4", "lose4.mp3");
		game.load.audio("lose5", "lose5.mp3");
		game.load.audio("lose6", "lose6.mp3");
		game.load.audio("lose7", "lose7.mp3");
		game.load.audio("lose8", "lose8.mp3");
		
		game.load.audio("flavio1", "flavio1.mp3");
		game.load.audio("flavio3", "flavio3.mp3");
		game.load.audio("flavio4", "flavio4.mp3");
		game.load.audio("flavio5", "flavio5.mp3");
		
	};
	
	this.create = function () {

		musica.destroy();
		musica = game.add.audio("musica" , 0.3);
		musica.loop = true;
		musica.play();
		
		setas = game.input.keyboard.createCursorKeys();
		teclaTiro = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
		
		game.add.image(0,0, "bossroom");
		map = game.add.tilemap('level5');
		map.addTilesetImage('tiletech');
		map.setCollisionByExclusion([751,752,753,754,755,756,757,801,802,803,804,805,806,807,808]);
		layer = map.createLayer('Tile Layer 1');
		layer.resizeWorld();
		dude = game.add.sprite(384, 560, "dude");
		nuvem = game.add.image(0,0, "nuvem");

		flaviovida = 200;
		
		numeroInimigos = 100;
		morto = false;	
		
		//PONTUACAO TEXTO
		
		// pontuacao = 0;
		 inimigosMortos = 0;
		var estilo = {
			font: "bold 32px OCR A",
			fill: "#AA0000"
		};
		
		scoretxt = game.add.text(600, 8, "SCORE " +pontuacao, estilo);
		vidastxt = game.add.text(600, 36, "LIVES "+humbvidas, estilo);
		flaviotxt = game.add.text(64,36, "FLAVIO "+flaviovida, estilo);
		
		game.physics.arcade.enable(dude);
		
		dude.animations.add("esquerda", [0, 1, 2, 3], 8, true);
		dude.animations.add("parado", [8], 1, true);
		dude.animations.add("direita", [4, 5, 6, 7], 8, true);
		dude.animations.add("baixo", [8, 9, 10, 11], 8, true);
		dude.animations.add("cima", [12, 13, 14, 15], 8, true);
		dude.animations.add("morto", [16], 1, true);

		dude.animations.play("parado");
		
		dude.body.collideWorldBounds = true;
		
		dude.body.bounce.x = 0.4;
		dude.body.bounce.y = 0.4;
		
		dude.body.maxVelocity.x = 330;
		dude.body.maxVelocity.y = 330;
		
		dude.body.drag.x = 1000;
		dude.body.drag.y = 1000;
		
		var i;
		//tiros
		tiros = game.add.group();
		tiros.enableBody = true;
		tiros.physicsBodyType = Phaser.Physics.ARCADE;
		for (i = 0; i < 5; i++) {
			var tiro = tiros.create(0, 0, "tiro");
			tiro.exists = false;
			tiro.visible = false;	
			tiro.checkWorldBounds = true;
			tiro.events.onOutOfBounds.add(destruirTiro);
		}
		
		//inimigos
		inimigos = game.add.group();
		inimigos.enableBody = true;
		inimigos.physicsBodyType = Phaser.Physics.ARCADE;
	 
		for (i = 0; i < 8; i++) {
			var c = posicoesSpawn[i];
			criarInimigo(c.x, c.y);
		}
		

	
		criarFlavio();
		
		horaParaOProximoTiro = game.time.now;
		direcaoTiroX = 0;
		direcaoTiroY = -1;
		
		fadeIn();
		
			
	};
	
	this.update = function () {
		
		if (flaviovida == 180)	{
			flavio5 = game.add.audio("flavio5" , 5);
			flavio5.play();
			flaviovida--;
			flaviotxt.setText("FLAVIO " + flaviovida);
		}
		
		if (flaviovida == 130)	{
			flavio4 = game.add.audio("flavio4" , 5);
			flavio4.play();
			flaviovida--;
			flaviotxt.setText("FLAVIO " + flaviovida);
			
		}
		
		if (flaviovida == 100)	{
			flavio1 = game.add.audio("flavio1" , 5);
			flavio1.play();
			criarFlavioputo(215, 100);
			criarFlavioputo(460, 100);
			criarFlavioputo(705, 100);
			numeroInimigos = 20;
			flaviovida--;
			flaviotxt.setText("FLAVIO " + flaviovida);
		}
		
		
			if (flaviovida == 30)	{
			flavio3 = game.add.audio("flavio3" , 5);
			flavio3.play();
			flaviovida--;
			flaviotxt.setText("FLAVIO " + flaviovida);
		}
		
		if (flaviovida <=0)
	{
		flaviotxt.destroy();
	}
		
		if (!morto) {
			game.physics.arcade.collide(dude, layer);
			game.physics.arcade.overlap(tiros, inimigos, tiroAcertouInimigo);
			game.physics.arcade.collide(dude, inimigos, dudeBateuNoInimigo);
			controlarDude();
		
		}
		game.physics.arcade.collide(tiros, layer, destruirTiro);
		game.physics.arcade.collide(inimigos, layer);
		
		inimigos.forEachAlive(moverInimigo);
		
	
		
	};
	
	function moverInimigo(inimigo) {
		
		game.physics.arcade.moveToXY(inimigo, dude.x, dude.y, inimigo.speed);
		
	}
	
	function controlarDude() {
		
		//movimento
		var teclando = false;
		if (setas.left.isDown) {
			direcaoTiroX = -1;
			ultimoLadoOlhado = -1;
			teclando = true;
			dude.body.velocity.x = -300;
		}  else {
			if (setas.right.isDown) {
				direcaoTiroX = 1;
				ultimoLadoOlhado = 1;
				teclando = true;
				dude.body.velocity.x = 300;
			} else {
				if (setas.up.isDown || setas.down.isDown) {
					direcaoTiroX = 0;
				}
			}
		}
		if (setas.up.isDown) {
			direcaoTiroY = -1;
			teclando = true;
			dude.body.velocity.y = -300;
			dude.animations.play("cima");
		} else {
			if (setas.down.isDown) {
				direcaoTiroY = 1;
				teclando = true;
				dude.body.velocity.y = 300;
				dude.animations.play("baixo");
			} else {
				if (setas.left.isDown || setas.right.isDown) {
					direcaoTiroY = 0;
				}
				if (setas.left.isDown) {
					dude.animations.play("esquerda");
				}  else {
					if (setas.right.isDown) {
						dude.animations.play("direita");
					}
				}
			}
		}
		if (teclando === false) {
			dude.body.velocity.x = 0;
			dude.body.velocity.y = 0;
			dude.animations.play("parado");
		}
		
		var agora = game.time.now;
		if (teclaTiro.isDown && agora >= horaParaOProximoTiro) {
			var tiro = tiros.getFirstExists(false);
			
			if (tiro) {
				tiro.reset(dude.x + 16, dude.y + 24);
				tiro.body.velocity.x = direcaoTiroX * 1000;
				tiro.body.velocity.y = direcaoTiroY * 1000;
				
				horaParaOProximoTiro = agora + 100;
			}
		}
		
	}
	
	function destruirTiro(tiro) {
		
		tiro.kill();
		
	}
	
	function criarInimigoAleatorio() {
		var x0 = dude.x - 50;
		var y0 = dude.y - 50;
		var x1 = x0 + 100;
		var y1 = y0 + 100;
		for (;;) {
			var i = ((Math.random() * 100 * posicoesSpawn.length) | 0) % posicoesSpawn.length;
			var c = posicoesSpawn[i];
			if (c.x >= x0 && c.x <= x1 && c.y >= y0 && c.y <= y1) {
				continue;
			}
			if (flaviovida%5 === 0)	{
			criarInimigo2(c.x, c.y);
			break;	}
			
			if (flaviovida%5 != 0)	{
				criarInimigo(c.x, c.y);
			break;	}
		}
	}
	
	function criarInimigo(x, y) {
	
		var inimigo = inimigos.create(x, y, "antidude");
		inimigo.vida = 1;
		inimigo.speed = 100;
		inimigo.body.bounce.x = 0.4;
		inimigo.body.bounce.y = 0.4;
		inimigo.animations.add("esquerda", [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		inimigo.animations.play("esquerda");
		
	}
	
	function criarInimigo2(x, y) {
		
		var inimigo = inimigos.create(x, y, "antidude2");
		inimigo.vida = 10;
		inimigo.speed = 50;
		inimigo.body.bounce.x = 0.4;
		inimigo.body.bounce.y = 0.4;
		inimigo.animations.add("esquerda", [9, 10, 11, 12, 13, 14, 15, 16], 8, true);
		inimigo.animations.play("esquerda");
	
	 
	}
	
		
	function criarFlavio(x, y) {
		
		var inimigo = inimigos.create(336, 200, "flavio");
		inimigo.vida = 100000;
		inimigo.speed = 30;
		inimigo.body.bounce.x = 0.4;
		inimigo.body.bounce.y = 0.4;
		inimigo.animations.add("andar", [0,1], 8, true);
		inimigo.animations.play("andar");
	
	 
	}
	
		function criarFlavioputo(x, y) {
		
		var inimigo = inimigos.create(x, y, "flavioputo");
		inimigo.vida = 30;
		inimigo.speed = 80;
		inimigo.body.bounce.x = 1;
		inimigo.body.bounce.y = 1;
		inimigo.animations.add("andar", [0,1], 8, true);
		inimigo.animations.play("andar");
	
	 
	}
	
	function perderVida() {
		humbvidas--;
		 vidastxt.setText("LIVES " + humbvidas);
	
		if (humbvidas <= 0)
		{
			morto = true;
			game.state.start("gameover");
		
		}
	}
	
	function dudeBateuNoInimigo(dude, inimigo) {
		
		// Tirar vida do dude
		
		pontuacao--;
		scoretxt.setText("SCORE " + pontuacao);
		inimigo.vida = inimigo.vida -2;
		if (inimigo.vida <=0)
		{
			hit = game.add.audio("hit" ,3);
			hit.play();
			inimigo.kill();
			inimigosMortos++;
			if (inimigosMortos < numeroInimigos) {
				criarInimigoAleatorio();
			}
			if (game.time.now%20 == 0)	{
			falarfraseslose();
			}
				
		}
		perderVida();
		
	}
	
	function tiroAcertouInimigo(tiro, inimigo) {
		
		tiro.kill();
		pontuacao++;
		scoretxt.setText("SCORE " + pontuacao);
		inimigo.vida--;
		if (inimigo.vida > 30)	{
		flaviovida--;
		flaviotxt.setText("FLAVIO " + flaviovida);
		kill = game.add.audio("kill" ,1);
		kill.play();}
		if (flaviovida <= 0){
			inimigo.kill();
			game.state.start("fim");}
		if (inimigo.vida <= 0) {
			inimigosMortos++;
			kill = game.add.audio("kill" ,3);
			kill.play();
			inimigo.kill();
			if (game.time.now%20 == 0)	{
			falarfraseskill();		}
			if (inimigosMortos < numeroInimigos) {
				criarInimigoAleatorio();
			}
		
			
		}
		
		
	}
	
	function falarfraseskill(tiro, inimigo) {	

		
		var vez, f, total = fraseskill.length;
		
		for (vez = 0; vez < 4; vez++) {
			
			for (f = 0; f < total; f++) {
				
				fraseskill.push(fraseskill[f]);
				
			}
			
		}		

		
		fraseAtualkill++;
		
		if (fraseAtualkill >= fraseskill.length) {
			
			fraseAtualkill = 0;
			
		}
		
		som = game.add.audio(fraseskill[fraseAtualkill] ,1.5);
		som.play();
	
	
	}
	
	function falarfraseslose(dude, inimigo) {	

		
		var vez, f, total = fraseslose.length;
		
		for (vez = 0; vez < 4; vez++) {
			
			for (f = 0; f < total; f++) {
				
				fraseslose.push(fraseslose[f]);
				
			}
			
		}		

		
		fraseAtuallose++;
		
		if (fraseAtuallose >= fraseslose.length) {
			
			fraseAtuallose = 0;
			
		}
		
		
		som = game.add.audio(fraseslose[fraseAtuallose] ,1.5);
		som.play();
	
	
	}
 
 

}
