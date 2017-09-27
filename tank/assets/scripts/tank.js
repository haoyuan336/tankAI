cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.direction = cc.p(0,1);

        this.speed = 0;


    },

    moveForword: function () {
        console.log("move forword");
        this.speed = 1;
        this.move();
    },
    moveBack: function () {
        console.log("move back");
        this.speed = -1;
        this.move()
    },
    move: function () {
        this.node.position = cc.pAdd(this.node.position, cc.pMult(this.direction, this.speed));
    },
    rotationLeft: function () {
        console.log("rotation left");
        this.direction = cc.pRotateByAngle(this.direction, cc.p(0,0), 0.1);
        this.node.rotation = cc.pToAngle(this.direction);
    },
    rotationRight: function () {
        console.log("rotation right");
        this.direction = cc.pRotateByAngle(this.direction, cc.p(0,0), Math.PI * 0.01);
        console.log("direction = " + JSON.stringify(this.direction));
        let angle = cc.pAngleSigned(cc.p(0,1), this.direction);
        console.log("angle = " + angle);
        let ration = angle * Math.PI ;
        console.log("ration = "+ ration);
        this.node.rotation += 1;
    },



    update: function () {


    }
});
