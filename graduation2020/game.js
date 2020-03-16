var game;

var colors = ["orange", "maroon", "gray", "yellow", "blue"];
var selectedColor = "orange";
var photo,
  gradbg,
  tassel,
  name = "senior";

var menu = {
  preload: function() {
    if (gradbg) {
      game.load.image("bg", gradbg);
    } else {
      game.load.image("bg", "./imgs/bg.png");
    }
    game.load.image("grad", "./imgs/grad.png");
    game.load.image("cap", "./imgs/gradCap.png");
    colors.forEach(color => {
      game.load.image(color, `./imgs/${color}.png`);
      game.load.image(`${color}Tassel`, `./imgs/${color}Tassel.png`);
    });
    game.load.image("gradButton", "./imgs/graduateButton.png");

    if (photo) {
      game.load.image("person", photo);
    }
  },

  create: function() {
    var width = game.world.width;
    var height = game.world.height;
    var bg = game.add.sprite(0, 0, "bg");
    bg.width = width;
    bg.height = height;

    var grad = game.add.sprite(0, 0, "grad");
    grad.y += height - grad.height;
    grad.x += (width - grad.width) / 2;

    var person;
    if (photo) {
      person = game.add.sprite(grad.x, grad.y, "person");
      person.width = 99;
      person.height = 96;
    }

    var cap = game.add.sprite(0, 0, "cap");
    if (photo) {
      cap.y += height - grad.height - 40;
    } else {
      cap.y += height - grad.height - 30;
    }
    cap.x += grad.x - cap.width / 7;

    tassel = game.add.sprite(
      cap.x + cap.width / 2,
      cap.y + cap.height / 2 - 5,
      `${selectedColor}Tassel`
    );

    for (var i = 0; i < colors.length; i++) {
      var color = game.add.sprite(
        i * 55 + width / 2 - (colors.length / 2) * 50,
        height / 2 - 100,
        colors[i]
      );
      color.width = 50;
      color.height = 50;
      var button = game.add.button(
        i * 55 + width / 2 - (colors.length / 2) * 50,
        height / 2 - 100,
        colors[i],
        function() {
          selectedColor = this.key;
        }
      );
      button.width = 50;
      button.height = 50;
      button.input.useHandCursor = true;
    }

    var style = {
      font: "bold 20px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };
    var text = game.add.text(0, 0, "Select Tassel Color", style);
    text.setShadow(3, 3, "rgba(0,0,0,0.5)", 50);
    text.x += (width - text.width) / 2;
    text.y += (height - text.height) / 2 - 20;
    text.stroke = "#000000";
    text.strokeThickness = 4;

    var graduateButton = game.add.button(
      width - 140,
      height - 90,
      "gradButton",
      function() {
        game.state.start("graduate");
      }
    );
    graduateButton.input.useHandCursor = true;
  },

  update: function() {
    tassel.loadTexture(`${selectedColor}Tassel`);
  }
};

var graduate = {
  preload: function() {
    if (gradbg) {
      game.load.image("bg", gradbg);
    } else {
      game.load.image("bg", "./imgs/bg.png");
    }
    game.load.image("grad", "./imgs/grad.png");
    game.load.image("cap", "./imgs/gradCap.png");
    colors.forEach(color => {
      game.load.image(color, `./imgs/${color}.png`);
      game.load.image(`${color}Tassel`, `./imgs/${color}Tassel.png`);
    });

    game.load.image("stage", "./imgs/stage.png");

    game.load.image("diploma", "./imgs/diploma.png");
    game.load.image("speech", "./imgs/speechBubble.png");
    game.load.audio("gradSong", "./music/graduationSong.mp3");

    if (photo) {
      game.load.image("person", photo);
    }
  },
  create: function() {
    var width = game.world.width;
    var height = game.world.height;

    var bg = game.add.sprite(0, 0, "bg");
    bg.width = width;
    bg.height = height;

    var stage = game.add.sprite(0, 0, "stage");
    stage.x += (width - stage.width) / 2;
    stage.y += height - stage.height;

    this.grad = game.add.sprite(0, 0, "grad");
    this.grad.y += height - this.grad.height;
    this.grad.x += width - 100;

    this.person;
    if (photo) {
      this.person = game.add.sprite(this.grad.x, this.grad.y, "person");
      this.person.width = 99;
      this.person.height = 96;
    }

    this.cap = game.add.sprite(0, 0, "cap");
    if (photo) {
      this.cap.y += height - this.grad.height - 40;
    } else {
      this.cap.y += height - this.grad.height - 30;
    }
    this.cap.x += this.grad.x - this.cap.width / 7;

    this.tassel = game.add.sprite(
      this.cap.x + this.cap.width / 2,
      this.cap.y + this.cap.height / 2 - 5,
      `${selectedColor}Tassel`
    );

    this.diploma = game.add.sprite(190, this.grad.y + 60, "diploma");
    this.diploma.visible = false;

    this.speech = game.add.sprite(220, 100, "speech");
    var style = {
      font: "bold 20px Arial",
      fill: "#000",
      wordWrap: true,
      wordWrapWidth: 200
    };

    if (document.getElementById("name").value !== "") {
      name = document.getElementById("name").value;
    }

    this.text = game.add.text(0, 0, `Congrats, ${name}!`, style);
    this.text.x += this.speech.x + 30;
    this.text.y +=
      this.speech.y + (this.speech.height / 2 - this.text.height) + 10;

    if (this.text.width < 250) {
      this.speech.width = 250;
    }

    this.speech.visible = false;
    this.text.visible = false;

    game.physics.arcade.enable(this.cap);
    game.physics.arcade.enable(this.grad);
    game.physics.arcade.enable(this.tassel);
    if (photo) {
      game.physics.arcade.enable(this.person);
    }

    game.time.events.loop(20, this.animate, this);
    this.pause = 100;
    this.music = game.add.audio("gradSong");
    this.music.play("", 0, 1, true);
  },

  animate: function() {
    var width = game.world.width;
    var height = game.world.height;
    if (this.pause > 0) {
      this.pause--;
      if (this.pause == 80) {
        this.speech.visible = true;
        this.text.visible = true;
      }
    } else if (
      this.grad.y > height - this.grad.height - 20 &&
      this.grad.x > width / 2
    ) {
      this.speech.visible = false;
      this.text.visible = false;
      this.cap.body.velocity.y = this.grad.body.velocity.y = this.tassel.body.velocity.y = -20;
      this.cap.body.velocity.x = this.grad.body.velocity.x = this.tassel.body.velocity.x = -40;
    } else if (this.grad.x > 200) {
      this.cap.body.velocity.y = this.grad.body.velocity.y = this.tassel.body.velocity.y = 0;
      this.cap.body.velocity.x = this.grad.body.velocity.x = this.tassel.body.velocity.x = -60;
    } else {
      this.cap.body.velocity.y = this.grad.body.velocity.y = this.tassel.body.velocity.y = this.cap.body.velocity.x = this.grad.body.velocity.x = this.tassel.body.velocity.x = 0;
      this.diploma.visible = true;
    }
    if (this.person && photo) {
      this.person.body.velocity.y = this.cap.body.velocity.y;
      this.person.body.velocity.x = this.cap.body.velocity.x;
    }
  }
};

game = new Phaser.Game(640, 480, Phaser.CANVAS, "gameDiv");

function uploadGrad() {
  photo = document.getElementById("grad").files[0];
  photo = URL.createObjectURL(photo);
  game.state.start("menu");
}

function uploadBg() {
  gradbg = document.getElementById("background").files[0];
  gradbg = URL.createObjectURL(gradbg);
  game.state.start("menu");
}

game.state.add("menu", menu);
game.state.add("graduate", graduate);

game.state.start("menu");
