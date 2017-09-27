cc.Class({
    extends: cc.Component,

    properties: {

        tankNode: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {

        this.moveForword = true;
        this.rotationLeft = true;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  (keyCode, event)=>{
                switch (keyCode){
                    case cc.KEY.w:
                        this.moveForword = "forword";
                        console.log("pressed w");
                        break;
                    case cc.KEY.s:
                        // this.tankNode.getComponent("tank").moveBack();
                        console.log("pressed s");
                        this.moveForword = "back";

                        break;
                    case cc.KEY.a:
                        // this.tankNode.getComponent("tank").rotationLeft();
                        console.log("pressed a");
                        this.rotationLeft = "left";

                        break;
                    case cc.KEY.d:
                        // this.tankNode.getComponent("tank").rotationRight();
                        console.log("pressed d");
                        this.rotationLeft = "right";

                        break;
                }
            },
            onKeyReleased: (keyCode, event)=>{
                switch (keyCode){
                    case cc.KEY.w:
                        this.moveForword = undefined;
                        break;
                    case cc.KEY.s:
                        this.moveForword = undefined;
                        break;
                    case cc.KEY.a:
                        this.rotationLeft = undefined;
                        break;
                    case cc.KEY.d:
                        this.rotationLeft = undefined;
                        break;
                    default:
                        break;
                }
            }
        },this.node);

    },
    update: function () {
       if (this.moveForword === "forword"){
           this.tankNode.getComponent("tank").moveForword();
       }else if(this.moveForword === "back"){

            this.tankNode.getComponent("tank").moveBack();
       }
       if (this.rotationLeft === "left"){
           this.tankNode.getComponent("tank").rotationLeft();

       }else if (this.rotationLeft === "right"){
           this.tankNode.getComponent("tank").rotationRight();

       }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
