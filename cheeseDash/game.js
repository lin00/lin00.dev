var game;
var cursors;
var cheeses;
var score = 0;
var scoreText;
var enemy;

var mainMenu = {
    preload : function() {},
    create : function() {},
    update: function() {},
    render: function () {}
};
var mainState = {
    //loads all the assets
    preload : function() {
        game.load.image('player', 'images/mouse.png');
        game.load.image('bg', 'images/bkg2.png');
        game.load.image('floor', 'images/floor2.png');
		game.load.image('cheese', 'images/sexy-cheese2.png');
		game.load.image('ground', 'images/bricks.png');
		game.load.spritesheet('cats', 'images/cats2.png', 440, 345);
		game.load.image('win', 'images/winc.png');
		game.load.image('lose', 'images/game-over.png');

    },
    
	
	
    //adds it to the game
    create : function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //backgrounds and cheating floor
        this.bg = game.add.sprite(0,-200, 'bg');
        this.floor = game.add.sprite (0 , game.world.height - 72, 'floor');
        game.physics.arcade.enable(this.floor);
        this.floor.body.immovable = true;
		this.floor.enableBody = true;
		//  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
		
		//  Now let's create two ledges
    var ledge = platforms.create(-150, 270, 'ground');

    ledge.body.immovable = true;

	ledge = platforms.create(1300, 350, 'ground');

    ledge.body.immovable = true;

	ledge = platforms.create(400, 180, 'ground');

    ledge.body.immovable = true;
		
	ledge = platforms.create(800, 290, 'ground');

    ledge.body.immovable = true;
                
                
    //player
	this.player = game.add.sprite(100, 300 ,'player');
	this.player.scale.setTo(0.3,0.3);
	game.physics.arcade.enable(this.player);
	this.player.body.gravity.y = 600;
	this.player.body.collideWorldBounds = true;

   
    // The enemy and its settings
    this.enemy = game.add.sprite(900, game.world.height - 150, 'cats');

    //  We need to enable physics on the enemy
    game.physics.arcade.enable(this.enemy);

    //  Enemy physics properties. Give the little guy a slight bounce.
    this.enemy.body.bounce.y = 0.2;
    this.enemy.body.gravity.y = 300;
    this.enemy.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.enemy.animations.add('left', [0, 1], 3, true);
	
    this.enemy.animations.add('right', [2, 3], 3, true);
		
	// Animations for Enemy
	// Cat Animations
//	this.enemy.animations.add('walk');
//	this.enemy.animations.play('walk', 3, true);
    game.add.tween(this.enemy).to({ x:156}, 10000, Phaser.Easing.Linear.None, true);
		this.enemy.animations.play('left');

	//controls
	cursors = game.input.keyboard.createCursorKeys();
	this.consecutiveJumps = 2;

	// cheeses
	//  Finally some cheeses to collect
	cheeses = game.add.group();

	//  We will enable physics for any cheese that is created in this group
	cheeses.enableBody = true;

	//  Here we'll create 12 of them evenly spaced apart
	for (var i = 0; i < 5; i++)
	{
	//  Create a cheese inside of the 'cheeses' group
	var cheese = cheeses.create(Math.floor((Math.random() * 2000) + 1), 0, 'cheese');

	//  Let gravity do its thing
	cheese.body.gravity.y = 300;

	//  This just gives each cheese a slightly random bounce value
	cheese.body.bounce.y = 0.3 + Math.random() * 0.2;
	}
    // World Bounds
    game.world.setBounds(0, -200, 2400, 800);
    
		
    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	scoreText.fixedToCamera = true;
		
    
		// Game Camera
	    game.camera.follow(this.player);
        
		
    },
    update: function() {
        
		function collectCheese (player, cheese) {
    
			// Removes the cheese from the screen
			cheese.kill();

			//  Add and update the score
			score += 1;
			scoreText.text = 'Score: ' + score;

		}
		

		function AttackCat (player, enemy) {

			// Removes the enemy from the screen
			
			
			if (player.position.y <= enemy.position.y) {
				enemy.kill();
			}
			else {
				player.kill();
            this.lose = game.add.sprite(game.camera.x,game.camera.y, 'lose');
            game.camera.unfollow(this.player);	
			}
			
		}

		this.player.body.velocity.x = 0;
        
        game.physics.arcade.collide(this.player, this.floor);
         //  Collide the player and the cheeses with the platforms
		game.physics.arcade.collide(this.player, platforms);
		game.physics.arcade.collide(cheeses, platforms);
		game.physics.arcade.collide(cheeses, this.floor);
		
		//  Checks to see if the player overlaps with any of the cheeses, if he does call the collectCheese function
		game.physics.arcade.overlap(this.player, cheeses, collectCheese, null, this);
        game.physics.arcade.overlap(this.player, this.enemy, AttackCat, null, this);
        
        if (cursors.left.isDown){
            //  Move to the left
            console.log("left pressed");
            this.player.body.velocity.x = -650;

        }
        else if (cursors.right.isDown){
            //  Move to the right
            this.player.body.velocity.x = 150;

        } 
        if (cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -650;
        
        }
		
//		// Animation for Enemy
//		this.enemy.x -= .50;

//		if (this.enemy.x < -this.enemy.width)
//		{
//		this.enemy.x = game.world.width;
//		}
		// Left
		if (this.enemy.position.x <= 356) {
		game.add.tween(this.enemy).to({x:1118}, 10000, Phaser.Easing.Linear.None, true);
			this.enemy.animations.stop();
			this.enemy.animations.play('right');
			console.log(this.enemy.animations);
		}
		else if (this.enemy.position.x >= 1118) {
		game.add.tween(this.enemy).to({ x:356}, 10000, Phaser.Easing.Linear.None, true);
			this.enemy.animations.play('left');
		}
		
		if (score >= 5) {			
			this.win = game.add.sprite(game.camera.x,game.camera.y, 'win');
            game.camera.unfollow(this.player);	
		}
		
	}
//	render: function () {
//
//    game.debug.cameraInfo(game.camera, 32, 32);
//    game.debug.spriteCoords(this.player, 32, 500);
//
//	}

};

	
//initializing the game
game = new Phaser.Game(800,600, Phaser.AUTO,'gameDiv');

//gamestates
game.state.add('main', mainState);
game.state.add('mainMenu', mainMenu);

//start game
game.state.start('main');