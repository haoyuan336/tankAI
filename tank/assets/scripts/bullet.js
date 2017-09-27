const BulletState = {
    Invalide: -1,
    Running: 1,
    OutScreen: 2
};
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
        this.speed = 1000;
        this.state = BulletState.Invalide;
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;


    },
    initWithData: function (data) {
        //位置  方向
        console.log("init with data  =" + JSON.stringify(data));
        this.node.position = data.position;
        this.direction = data.direction;
        this.setState(BulletState.Running)
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        if (this.state === BulletState.Running){
            this.node.position = cc.pAdd(this.node.position, cc.pMult(this.direction, this.speed * dt));
        }
    },
    setState: function (state) {
        if (this.state === state){
            return
        }
        switch (state){
            case BulletState.Running:
                cc.log("bullet state running");
                break;
            case BulletState.OutScreen:
                this.node.parent.removeChild(this.node);
                this.node.destroy();
                break;
            default:
                break;
        }
        this.state = state;
    },
    onCollisionEnter: function (other, self) {
        console.log('碰撞了');
    },
    onCollisionStay: function (other, self) {
        console.log("碰撞");

    },
    onCollisionExit: function (other, self) {
        console.log("结束碰撞");
    }
    ,
    onDestroy: function () {
        console.log("on destroy");
    }
});
