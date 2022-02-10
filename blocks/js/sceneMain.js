class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
    	//load our images or sounds
       this.load.spritesheet("blocks","images/blocks.png",{frameWidth:64,frameHeight:84});
    }
    create() {
      this.colorArray=[];
      this.centerBlock=null;
      for (var i = 0; i < 25; i++) {
        var color=Phaser.Math.Between(0,4);
        this.colorArray.push(color);
      }

        //define our objects
      var xx=0;
      var yy=0;
      var k=0;
      for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
          var block = this.add.image(0, 0, "blocks");
          block.displayWidth=game.config.width/5;
          block.displayHeight=game.config.height/5;
          block.setFrame(this.colorArray[k]);
          //block.setOrigin(0,0);
          block.x = xx+block.displayWidth/2;
          block.y = yy+block.displayHeight/2;
          if (i==2 && j==2) {
            this.centerBlock=block;
          }
          else
          {
            block.setInteractive();
          }
          xx+=block.displayWidth;
          k++;
        }
        xx=0;
        yy+=block.displayHeight;
      }
      this.colorArray[12]=-1;
      this.pickColor();
      this.input.on("gameobjectdown",this.selectBlock,this);

      this.timer=new CircleTimer({scene:this});
      this.timer.x=this.centerBlock.x;
      this.timer.y=this.centerBlock.y;
      console.log("start to be called from Scene");
      this.timer.setCallback(this.timeUp, this);
      this.timer.start();
    }
    timeUp()
    {
      alert('Time is up!');
    }
    selectBlock(pointer,block) {
      if (block.frame.name==this.centerBlock.frame.name) {
        console.log("right");
        block.removeInteractive();
        this.fall(block);
        this.pickColor();
      }
      else
      {
        console.log("wrong");
      }
    }
    fall(block)
    {
      this.tweens.add({targets: block,duration: 1000,scaleX:0,scaleY:0});
    }
    pickColor()
    {
      if (this.colorArray.length==0)
      {
        console.log("next level");
        //next level
        return;
      }
      var color=this.colorArray.shift();
      if (color==-1)
      {
        this.pickColor();
        return;
      }
      this.centerBlock.setFrame(color);
    }
    update() {
        //constant running loop
    }
}
