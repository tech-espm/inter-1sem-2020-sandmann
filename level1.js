	var humbvidas;
	var pontuacao;

	var fraseskill = [
	
"kill1",
"kill2",
"kill3",
"kill4",
	
	
];
	var fraseslose = [
	
"lose1",
"lose2",
"lose3",
"lose4",
"lose5",
"lose6",
"lose7",
"lose8",

	
	
];
	var fraseAtualkill = (Math.random() * fraseskill.length) | 0;
	var fraseAtuallose = (Math.random() * fraseskill.length) | 0;

function level1() {
	


	var dude;
	var setas;
	var teclaTiro;
	var horaParaOProximoTiro;
	var tiros;
	var inimigos;
	var ultimoLadoOlhado, direcaoTiroX, direcaoTiroY;
	
	var scoretxt;
	var vidastxt;
	
	var morto = false;
	
	var inimigosMortos;
	var numeroInimigos;
	
	var posicoesSpawn = [
		{ x: 500, y: 200 },
		{ x: 100, y: 500 },
		{ x: 720, y: 160 },
		{ x: 620, y: 512 },
		{ x: 92, y: 150 },
		{ x: 340, y: 50 },
		{ x: 180, y: 380 },
		{ x: 100, y: 330 },
		{ x: 480, y: 300 },
		{ x: 600, y: 160 },
		{ x: 600, y: 330 },
		{ x: 650, y: 370 },
		{ x: 300, y: 560 },
		
	];
	
	this.preload = function () {
		
		game.stage.backgroundColor = "#202020";
		
		game.load.tilemap('level1', 'level1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiletech', 'tiletech.png');
		game.load.image('terreo', 'terreo.png');
		game.load.spritesheet("dude", "humberto.png", 32, 32);
		game.load.spritesheet("antidude", "bixo.png", 32, 32);
		game.load.spritesheet("antidude2", "ciborg.png", 12, 12);
		game.load.image('nuvem','nuvem.png');
		game.load.audio("musica", "musica.mp3");
		game.load.audio("costas", "kill1.mp3");
		
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
		
	};
	
	this.create = function () {
		
		
		setas = game.input.keyboard.createCursorKeys();
		teclaTiro = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
		
		musica.destroy();
		musica = game.add.audio("musica" , 0.3);
		musica.loop = true;
		musica.play();
		
		terreo = game.add.image(0,0, "terreo");
		map = game.add.tilemap('level1');
		map.addTilesetImage('tiletech');
		map.setCollisionByExclusion([751,752,753,754,755,756,757,801,802,803,804,805,806,807,808]);
		layer = map.createLayer('Tile Layer 1');
		layer.resizeWorld();
		dude = game.add.sprite(0, 224, "dude");
		nuvem = game.add.image(0,0, "nuvem");
		
		
		humbvidas = 20;
		numeroInimigos = 3;
		morto = false;	
		
		//PONTUACAO TEXTO
		
		 pontuacao = 0;
		 inimigosMortos = 0;
		var estilo = {
			font: "bold 32px OCR A",
			fill: "#AA0000"
		};
		
		scoretxt = game.add.text(600, 8, "SCORE 0", estilo);
		vidastxt = game.add.text(600, 36, "LIVES "+humbvidas, estilo);
		
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
		for (i = 0; i < 100; i++) {
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
	 
		for (i = 0; i < 2; i++) {
			var c = posicoesSpawn[i];
			criarInimigo(c.x, c.y);
			//criarInimigo(290, 500);
			//criarInimigo(310, 100);
			//criarInimigo2(650, 180);
		}
	
		
		horaParaOProximoTiro = game.time.now;
		direcaoTiroX = 0;
		direcaoTiroY = -1;
		
		fadeIn();
		
		
			
	};
	
	this.update = function () {
		
		
		if (!morto) {
			game.physics.arcade.collide(dude, layer);
			game.physics.arcade.overlap(tiros, inimigos, tiroAcertouInimigo);
			game.physics.arcade.collide(dude, inimigos, dudeBateuNoInimigo);
			controlarDude();
			//console.log(dude.x + " / " + dude.y);
			if (inimigosMortos >= numeroInimigos && dude.x >= 698 && dude.y >= 368 && dude.y <= 384) {
				//	musica.destroy();
					game.state.start("level2");
					
			}
		}
		game.physics.arcade.collide(tiros, layer, destruirTiro);
		game.physics.arcade.collide(inimigos, layer);
		
		inimigos.forEachAlive(moverInimigo);
		
	
		
	};
	
	function moverInimigo(inimigo) {
		
		game.physics.arcade.moveToXY(inimigo, dude.x, dude.y, 140);
		
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
			criarInimigo(c.x, c.y);
			break;
		}
	}
	
	function criarInimigo(x, y) {
	
		var inimigo = inimigos.create(x, y, "antidude");
		inimigo.vida = 1;
		inimigo.body.bounce.x = 0.4;
		inimigo.body.bounce.y = 0.4;
		inimigo.animations.add("esquerda", [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		inimigo.animations.play("esquerda");
		
	}
	
	function criarInimigo2(x, y) {
		
		var inimigo = inimigos.create(x, y, "antidude2");
		inimigo.vida = 2;
		inimigo.body.bounce.x = 0.4;
		inimigo.body.bounce.y = 0.4;
		inimigo.animations.add("esquerda", [9, 10, 11, 12, 13, 14, 15, 16], 8, true);
		inimigo.animations.play("esquerda");
	
	 
	}
	
	function perderVida() {
		humbvidas--;
		 vidastxt.setText("LIVES " + humbvidas);
	
		if (humbvidas <= 0)
		{
			morto = true;
		//	musica.destroy();
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
			if (game.time.now%2 == 0)	{
			falarfraseslose();
			}
				
		}
		perderVida();
	
		
	}
	
	function tiroAcertouInimigo(tiro, inimigo) {
		
		tiro.kill();
		pontuacao = pontuacao + 1;
		scoretxt.setText("SCORE " + pontuacao);
		inimigo.vida = inimigo.vida - 1;
		if (inimigo.vida <= 0) {
			// Aumentar a pontuação
			inimigosMortos++;
			inimigo.kill();
			kill = game.add.audio("kill" ,3);
			kill.play();
			if (game.time.now%2 == 0)	{
				falarfraseskill();
			}
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
		
		som = game.add.audio(fraseskill[fraseAtualkill] ,2);
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
		
		som = game.add.audio(fraseslose[fraseAtuallose] ,2);
		som.play();
	
	
	}

}
