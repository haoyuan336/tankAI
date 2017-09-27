import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        tankNode: {
            default: null,
            type: cc.Node
        },
        worldBg: {
            default: null,
            type: cc.Node
        }

    },

    onLoad: function () {
        global.event.on("shoot_one_bullet", this.addOneBullet.bind(this));


        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        collisionManager.enabledDebugDraw = true;
        collisionManager.debugDraw = true;
        collisionManager.enabledDrawBoundingBox = true;

    },
    addOneBullet: function (data) {
        //添加一颗子弹
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.node;
        bullet.getComponent("bullet").initWithData(data);

    }


});
