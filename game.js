// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 230;


// add collectable items to the game

let health = document.getElementById("health") 





function addItems() {
  items = game.add.physicsGroup();
  createItem(375, 450, 'coin');

  createItem(400, 350, 'coin');

  createItem(80, 50, 'coin');

  createItem(0, 150, 'coin');

  createItem(100, 250, 'coin');

  createItem(20, 350, 'coin');

  createItem(500, 70, 'coin');

  createItem(300, 150, 'coin');

  createItem(250, 20, 'coin');

  createItem(290, 20, 'coin');

  createItem(220, 20, 'poison');

  createItem(120, 50, 'poison1');

  createItem(170, 150, 'star');

}





// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(350, 500, 'platform2');

  platforms.create(400, 400, 'platform');

  platforms.create(80, 100, 'platform2');

  platforms.create(0, 200, 'platform');

  platforms.create(100, 300, 'platform2');

  platforms.create(20, 400, 'platform');

  platforms.create(500, 130, 'platform2');

  platforms.create(300, 200, 'platform');

  platforms.create(250, 70, 'platform2');

  platforms.setAll('body.immovable', true);

  
}


// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}



// when the player collects an item on the screen
function itemHandler(player, item) {
  // console.log(item.key);


  item.kill();
  
  if (item.key === 'coin'){
    currentScore = currentScore + 20;
  }

  if(item.key === 'poison'){
    currentScore = currentScore - 10;
  }

  if(item.key === 'poison1'){
    currentScore = currentScore - 10;
  }

  if(item.key === 'star'){
    currentScore = currentScore + 70;
  }

  if (currentScore === winningScore) {
    createBadge();
  }

  if (item.key === "poison") {
    health = health.value -= 50;
    

  
  }

  if (item.key === "poison1") {
    health = health.value -= 50;
    location.reload();

    alert("You lost all your health, it will reload the page");
  }

 
  
  
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#ccd921';
    
    //Load images
    game.load.image('platform', 'assests/platform_1.png');
    game.load.image('platform2', 'assests/platform_2.png');
    
    //Load spritesheets
    game.load.spritesheet('player', 'assests/sans.jpg', 50.5, 61) ;
    game.load.spritesheet('coin', 'assests/coin.png', 36, 44);
    game.load.spritesheet('badge', 'assests/badge.png', 42, 54);
    game.load.spritesheet('poison', 'assests/poison.png', 32, 32 )
    game.load.spritesheet('poison1', 'assests/poison1.png', 32, 32 )
    game.load.spritesheet('star', 'assests/star.png', 32, 32)
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }
  }

  function render() {

  }

};
