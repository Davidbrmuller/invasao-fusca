class Barco {
    constructor(x,y,width,height,barcopos){
        this.speed=0.05
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height
        this.barcopos=barcopos;
this.body=Bodies.rectangle(x,y,width,height);
this.image=loadImage("assets/fusca.png")
World.add(world,this.body);
    }
    remove(i){
        setTimeout(()=>{
        Matter.World.remove(world,barcos[i].body)
        delete barcos[i]},500)
    }
    display(){
var pos=this.body.position;
var angle=this.body.angle;
push()
translate(pos.x,pos.y)
rotate(angle);
imageMode(CENTER)
image(this.image,0,this.barcopos,this.width,this.height)
pop();
    }
}