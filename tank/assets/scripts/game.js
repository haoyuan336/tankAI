import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        }

    },

    onLoad: function () {
        global.event.on("shoot_one_bullet", this.addOneBullet.bind(this));


        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        collisionManager.debugDraw = true;

    },
    addOneBullet: function (data) {
        //添加一颗子弹
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.node;
        bullet.getComponent("bullet").initWithData(data);




    }


});
