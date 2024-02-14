const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label | null = null;

    @property
    text: string = 'hello';

    @property
    jumpHeight: number = 0;

    @property
    jumpDuration: number = 0;
    
    @property
    maxMoveSpeed: number = 0;
    
    @property
    xSpeed: number = 0;
    
    @property
    acc: number = 0; 

    @property
    accLeft: boolean = false;
    
    @property
    accRight: boolean = false;

    @property(cc.AudioClip)
    jumpAudio:cc.AudioClip=null;


    private jumpAction: cc.ActionInterval | null = null;

    start() {
        // Your start logic here
    }

    playJumpSound(){
       cc.audioEngine.playEffect(this.jumpAudio,false);
    }
    
    setJumpAction(): cc.ActionInterval {
        const jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        const jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var callback=cc.callFunc(this.playJumpSound,this);
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown,callback));
    }
     
    protected onLoad(): void {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.OnKeyUp, this);
    }

    OnKeyDown(event): void {
        switch (event.keyCode) {
             case cc.macro.KEY.a:
                this.accLeft = true;
                break;
             case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    }
    
    OnKeyUp(event): void {
        switch (event.keyCode) {
             case cc.macro.KEY.a:
                this.accLeft = false;
                break;
             case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    }

    protected onDestroy(): void {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.OnKeyUp, this);
    }

    update(dt) {
        if (this.accLeft) {
            this.xSpeed -= this.acc * dt;
        } else if(this.accRight){
            this.xSpeed += this.acc * dt;
        }
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
       this.node.x += this.xSpeed * dt;
    }
}
