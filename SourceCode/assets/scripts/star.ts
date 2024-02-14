const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property
    pickRadius: number = 0;

    @property(cc.Node)
    game: cc.Node = null;

    init(game) {
        this.game = game;
        this.enabled = true;
        this.node.opacity = 255;
    }

    reuse(game) {
        this.init(game);
    }

    getPlayerDistance(): number {
        if (this.game.getComponent('game').player) {
            const playerPos = this.game.getComponent('game').player.getPosition();
            const dist = this.node.position.sub(new cc.Vec3(playerPos.x, playerPos.y, 0)).mag();
            return dist;
        }
        console.log("player not exist");
        return 100000000;
    }

    OnPicked() {
        this.game.getComponent('game').spawnNewStar();
        this.game.getComponent('game').gainScore();
        this.game.getComponent('game').timer=0;
        this.game.getComponent('game').endCounter=0;
        this.node.destroy();
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad() {}

    start() {
       
    }

    map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    update(dt: number) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.OnPicked();
            // console.log(this.getPlayerDistance());
            // console.log("touch made");
        }
        // console.log(this.game.getComponent('game').timer+":Timer");
        this.node.opacity = this.map(this.game.getComponent('game').timer, 0, this.game.getComponent('game').starDuration, 255, 0);
        if(this.node.opacity==0 ){
            this.destroy();
        }
    }
}
