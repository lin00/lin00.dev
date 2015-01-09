/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var game;
var highScore = 0;

var menu = {
    preload:function() {
        game.load.image('bg', 'imgs/background.jpg');
        game.load.image('tree','imgs/tree.png');
        game.load.image('scroll', 'imgs/scroll.png');
        game.load.image('start', 'imgs/start.png');
        game.load.audio('jingleBells', 'music/jingleBells.mp3')
    },
    
    create: function() {
        this.bg = game.add.sprite(0,0, 'bg');
        this.bg.width = game.world.width; this.bg.height = game.world.height;
        this.tree = game.add.sprite(0, 90, 'tree');
        this.scroll = game.add.sprite(200, 80, 'scroll');
        this.scroll.scale.x = 0.74; this.scroll.scale.y  = 0.74;
        this.start = game.add.button(440, 242, 'start', function() {game.state.start('main');}, this)
        this.music = game.add.audio('jingleBells');
        this.music.play('', 0, 1, true);
        
 
    } 
};

var flappyJosh = {
    preload: function() {
        game.load.image('bg', 'imgs/flappyBirdBackground.png');
        game.load.image('josh', 'imgs/josh.png');
        game.load.image('pipe', 'imgs/pipe.png');
        game.load.image('pipe2', 'imgs/pipe2.png');
        game.load.image('board', 'imgs/board.png');
        game.load.image('replay', 'imgs/replayButton.png');
        game.load.image('back', 'imgs/backButton.png');
    },
    create: function() {
        this.gameOverhuh = false;
        
        //bg
        this.bg = game.add.sprite(0,0,'bg');
        this.bg.height = game.world.height;
        this.bg2 = game.add.sprite(this.bg.width, 0, 'bg');
        this.bg2.height = game.world.height;
        
        //llama
        this.josh = game.add.sprite(0, game.world.height/2, 'josh');
        this.josh.scale.x = 0.5; this.josh.scale.y = 0.5;
        game.physics.arcade.enable(this.josh);
        this.josh.body.gravity.y = 1000;
        
        
        var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            space.onDown.add(this.jump, this);
        
        //pipes
        this.pipes = game.add.group();  
        this.pipes.enableBody = true;   
        this.pipes.createMultiple(5, 'pipe'); 
        game.time.events.loop(1500, this.addOnePipe, this);
        
        this.pipes2 = game.add.group();
        this.pipes2.enableBody = true;
        this.pipes2.createMultiple(5, 'pipe2');
        this.pipes2.checkWorldBounds = true;
        this.pipes2.outOfBoundsKill = true;
        //texts
        this.score = -2;  
        this.scoreText = game.add.text(game.world.centerX, 0, '', { font: "30px Arial", fill: "#ffffff" });
            
    },
    
    update: function() {
        if (this.josh.inWorld == false){
            this.gameOver();
        }
        
        
        this.scoreText.setText(Math.max(this.score, 0));
        
        game.physics.arcade.overlap(this.josh, this.pipes, this.gameOver, null, this);
        game.physics.arcade.overlap(this.josh, this.pipes2, this.gameOver, null, this); 

    },
    
    jump: function() {
        this.josh.body.velocity.y = -350;
    },
    
    gameOver: function() {
        if (highScore<= this.score)
            highScore = this.score;
        this.gameOverhuh = true;
        this.josh.body.velocity.y = 0;
        this.pipes.forEachAlive(function(pipeT){
            pipeT.body.velocity.x = 0;
        },this);
        this.pipes2.forEachAlive(function(pipeB){
            pipeB.body.velocity.x = 0;
        },this);
        this.gameOverBoard = game.add.sprite(50, 50, 'board');
        this.gameOverBoard.x = game.world.width/2 - this.gameOverBoard.width/2;
        this.replay = game.add.button(0, 350,'replay', this.restart, this);
        this.replay.x = game.world.width/2 - this.replay.width/2;
        this.scoreText2 = game.add.text(game.world.centerX - 200,game.world.centerY - 100, 'Score:' + Math.max(this.score, 0), { font: "60px Arial", fill: "black" });
        this.highScoreText = game.add.text(game.world.centerX - 200,game.world.centerY  , 'High score:' + highScore, { font: "60px Arial", fill: "black" });
    },
    
    restart: function() {
        game.state.start('main');
    },
    
    addOnePipe: function(x, y) {
        if (!this.gameOverhuh) {
        
            this.score++;
            var pipeT = this.pipes.getFirstDead();
            pipeT.reset(game.world.width, Math.random() * -200);
            pipeT.body.velocity.x = -200;
            pipeT.checkWorldBounds = true;
            pipeT.outOfBoundsKill = true;


            var pipeB = this.pipes2.getFirstDead();
            pipeB.reset(pipeT.position.x, pipeT.position.y + 190 + pipeT.height);
            pipeB.body.velocity.x = -200;
            pipeB.checkWorldBounds = true;
            pipeB.outOfBoundsKill = true;
        } else
            return;
    }
        
        
};

// Initialize Phaser
game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', flappyJosh);
game.state.add('menu',menu);
game.state.start('menu');
