import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this.direction = cc.p(0,1);
        this.speed = 0;
        this.shootTotalTime = 0.5;
    },

    moveForword: function () {
        // console.log("move forword");
        this.speed = 1;
        this.move();
    },
    moveBack: function () {
        // console.log("move back");
        this.speed = -1;
        this.move()
    },
    move: function () {
        this.node.position = cc.pAdd(this.node.position, cc.pMult(this.direction, this.speed));
    },
    rotationLeft: function () {
        // console.log("rotation left");
        this.direction = cc.pRotateByAngle(this.direction, cc.p(0,0), Math.PI * 0.01);
        let angle = cc.pAngleSigned(this.direction, cc.p(0,1));
        this.node.rotation = 180 /Math.PI * angle;
    },
    rotationRight: function () {
        // console.log("rotation right");
        this.direction = cc.pRotateByAngle(this.direction, cc.p(0,0), Math.PI * -0.01);
        let angle = cc.pAngleSigned(this.direction, cc.p(0,1));
        this.node.rotation = 180 /Math.PI * angle;
    },
    shoot: function () {
        // if (this.shootTotalTime > 0.5){
        //     this.shootTotalTime = 0;
        //     this.shootBullet();
        // }else {
        //     this.shootTotalTime += dt;
        // }
        this.shootBullet();
    },
    shootBullet: function () {
        // cc.log("shoot on bullet");
        global.event.fire("shoot_one_bullet", {
            position: this.node.position,
            direction: this.direction
        })
    },


    update: function (dt) {


    },
    onCollisionEnter: function (other, self) {
        console.log("collision enter");
    }
});
