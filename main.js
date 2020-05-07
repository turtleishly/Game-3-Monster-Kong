var GameState = {

    preload : function(){

    },
};

var game = new Phaser.Game(800,600,Phaser.AUTO);


game.state.add('GameState',GameState)
game.state.start('GameState');