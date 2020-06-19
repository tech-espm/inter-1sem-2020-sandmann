function bonus() {
	
	this.preload = function () {
			game.load.image("vincechop", "vincechop.png");
	};
	
	this.create = function () {
		vincehop = game.add.image(0,0, "vincechop");
		musica.destroy();
	};
	
	this.update = function () {
		
	};
	
}
