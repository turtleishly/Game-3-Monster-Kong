var GameState = {
    init : function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.physics.startSystem(Phaser.Physics.Arcade);
        this.game.physics.arcade.gravity.y = 1000;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.RUNNING_SPEED = 180;
        this.JUMPING_SPEED = 550;
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
        this.game.physics.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        var platformData = [
            {"x" :0 ,"y" :430},
            {"x" :45 ,"y" :560},
            {"x" :90 ,"y" :290},
            {"x" :0 ,"y" :140},

        ];
        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        platformData.forEach(function(element){
            this.platforms.create(element.x,element.y ,'platform')
        },this)

        this.platforms.setAll('body.immovable',true);
        this.platforms.setAll('body.allowGravity',false)


        this.player = this.add.sprite(100,200,'player',3);
        this.player.anchor.setTo(0.5);
        this.player.animations.add('walking',[0,1,2,1],6,true);
        this.game.physics.enable(this.player);
        this.player.customParams = {};

        this.createOnScreenControls();
    },
    update: function(){
        this.game.physics.arcade.collide(this.player,this.ground);
        this.game.physics.arcade.collide(this.player,this.platforms);

        this.player.body.velocity.x = 0;

        if(this.cursors.left.isDown ||this.player.customParams.isMovingLeft){
            this.player.body.velocity.x = -this.RUNNING_SPEED;
        }
        else if(this.cursors.right.isDown || this.player.customParams.isMovingRight){
            this.player.body.velocity.x = this.RUNNING_SPEED;
        }

        if((this.cursors.up.isDown ||this.player.customParams.mustJump) && this.player.body.touching.down){
            this.player.body.velocity.y = -this.JUMPING_SPEED;

        }


    },
    createOnScreenControls : function(){

        this.leftArrow = this.add.button(20,535,'arrowButton');
        this.rightArrow = this.add.button(110,535,'arrowButton');
        this.actionButton = this.add.button(280,535,'actionButton');

        this.rightArrow.alpha = 0.5;
        this.leftArrow.alpha = 0.5;
        this.actionButton.alpha = 0.5;

        this.actionButton.events.onInputDown.add(function(){
            this.player.customParams.mustJump = true;
        },this);
        this.actionButton.events.onInputUp.add(function(){
            this.player.customParams.mustJump = false;
        },this)

        //left

        this.leftArrow.events.onInputDown.add(function(){
            this.player.customParams.isMovingLeft = true;
        },this);
        this.leftArrow.events.onInputUp.add(function(){
            this.player.customParams.isMovingLeft = false;
        },this)

        this.leftArrow.events.onInputOver.add(function(){
            this.player.customParams.isMovingLeft = true;
        },this);
        this.leftArrow.events.onInputOut.add(function(){
            this.player.customParams.isMovingLeft = false;
        },this)

        //right

        this.rightArrow.events.onInputDown.add(function(){
            this.player.customParams.isMovingRight = true;
        },this);
        this.rightArrow.events.onInputUp.add(function(){
            this.player.customParams.isMovingRight = false;
        },this)

        this.rightArrow.events.onInputOver.add(function(){
            this.player.customParams.isMovingRight = true;
        },this);
        this.rightArrow.events.onInputOut.add(function(){
            this.player.customParams.isMovingRight = false;
        },this)

    },
   
};

var game = new Phaser.Game(360,592,Phaser.AUTO);


game.state.add('GameState',GameState);
game.state.start('GameState');