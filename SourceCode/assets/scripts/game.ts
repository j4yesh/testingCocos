const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property({
        type: cc.Prefab
    })
    starPrefab: cc.Prefab = null;

    @property
    maxStarDuration: number = 0;

    @property
    minStarDuration: number = 0;

    @property({
        type: cc.Node
    })
    player: cc.Node = null;

    @property({
        type: cc.Node
    })
    ground: cc.Node = null;

    @property(cc.AudioClip)
    scoreAudio:cc.AudioClip =null;

    groundY: number = 0;

    @property(cc.Label)
    scoreDisplay:cc.Label;

    @property
    score:number = 0;

    // LIFE-CYCLE CALLBACKS:

    starDuration:number=3;
    timer:number=0;
    endCounter:number=0;

    onLoad() {
        this.score=0;
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
    }

    spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);
        newStar.setPosition(this.getNewStarPosition());
        // newStar.getComponent('star').init=this;
        newStar.getComponent('star').game=this;
        this.node.addChild(newStar);
    }

    getNewStarPosition() {
        var randX = (Math.random() - 0.5) * 2 * (this.node.width / 2);
        var randY = this.groundY + Math.random() * this.player.getComponent('player').jumpHeight + 50;
        return cc.v2(randX, randY);
    }

    

    gainScore(){
        this.score+=1;
        this.scoreDisplay.string='Score: '+this.score; 
        cc.audioEngine.playEffect(this.scoreAudio,false);
    }
    
    gameOver() {
        this.scoreDisplay.string = 'GameOver';
        this.player.stopAllActions();
        // cc.director.loadScene('helloworld');
    }

    start() {
        
    }

    update (dt) {
        this.timer+=dt;
        this.endCounter+=dt;
        if(this.endCounter>this.starDuration){
            if(this.scoreDisplay.string=='GameOver'){
                cc.director.loadScene('helloworld');
            }
            this.endCounter=0;
        }
        if(this.timer>this.starDuration){
            this.gameOver();
            // this.enabled = false;  
            //this.endCounter=0;
            return;
        }
    }
}
