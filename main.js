var GameState = {
    init : function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
     },
    preload : function(){
        this.load.image('ground','images/ground.png');
        this.load.image('platform','images/platform.png');
        this.load.image('goal','images/gorilla3.png');
        this.load.image('arrowButton','images/arrowButton.png');
        this.load.image('actionButton','images/actionButton.png');
        this.load.image('barrel','images/barrel.png');
        
        this.load.spritesheet('player','images/player_spritesheet.png',28,30,5,1,1);
        this.load.spritesheet('fire','images/fire_spritesheet.png',20,21,2,1,1)

    },
    create : function(){
        this.ground = this.add.sprite(0,500,'ground');

        var platform = this.add.sprite(0,300,'platform');

        this.player = this.add.sprite(100,200,'player',3);
        this.player.anchor.setTo(0.5);
        this.player.animations.add('walking',[0,1,2,1],6,true);
        this.player.animations.play('walking');

    },
    update: function(){

    },
};

var game = new Phaser.Game(360,592,Phaser.AUTO);


game.state.add('GameState',GameState)
game.state.start('GameState');