import global from './global'
import Brain from './utility/brain'
const TankState = {
    Invalide: -1,
    Running: 1,
    OutScreen: 2,
    BeKilled: 3,
}
cc.Class({
    extends: cc.Component,

    properties: {

        scoreLabel: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.direction = cc.p(0,1);
        this.speed = 0;
        this.brain = Brain();
        this.score = 0;

        global.event.on("killed_one", this.tankKillOne.bind(this));


    },
    initWithData: function (data) {
        this.uid = data.id;
        this.node.position = cc.p(Math.random() * 1000 - 500, Math.random() * 800 - 400);
        this.state = TankState.Running;

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
        this.shootBullet();
    },
    shootBullet: function () {
        // cc.log("shoot on bullet");
        global.event.fire("shoot_one_bullet", {
            position: cc.pAdd(this.node.position,cc.pMult(cc.pNormalize(this.direction), 100)),
            direction: this.direction,
            master: this.uid
        })
    },

    update: function (dt) {
        if (this.state === TankState.Running){
            this.scoreLabel.string = this.score + '';
            switch (this.brain.getBehaviour(dt)){
                case "moveforword":
                    this.moveForword();
                    break;
                case "rotationleft":
                    this.rotationLeft();
                    break;
                case "moveback":
                    this.moveBack();
                    break;
                case "rotationright":
                    this.rotationRight();
                    break;
                case "shoot":
                    this.shoot();
                    break;
                default:
                    break;
            }
        }


    },
    onCollisionEnter: function (other, self) {
        // if (other.){
        //
        // }
        if (other.getComponent(cc.BoxCollider).tag === 2){
            this.setState(TankState.BeKilled);
        }
    },
    onCollisionStay: function (other, self) {

    },
    onCollisionExit: function (other, self) {

        // if (other.name === "world_bg"){
        //     console.log("跑出去了");
        // }
        if (other.getComponent(cc.BoxCollider).tag === 1){
            console.log("tank  out screen");
            this.setState(TankState.OutScreen);
        }

    }
    ,
    setState: function (state) {
        if (this.state === state){
            return;
        }
        switch (state){
            case TankState.Running:
                cc.log("tank runing");
                break;
            case TankState.OutScreen:
                cc.log("世界外面去了");
                this.node.parent.removeChild(this.node);
                this.node.destroy();
                break;
            case TankState.BeKilled:
                this.offListener();
                this.node.parent.removeChild(this.node);
                this.node.destroy();
                break;
        }
        this.state = state;
    },
    tankKillOne: function (data) {
        if (data.uid === this.uid){
            //我杀死的
            this.score ++;
        }
    },
    onDestroy: function () {

    },
    offListener: function () {
        global.event.off("killed_one", this.tankKillOne);
    }
});
