class Cannonball {

constructor(x,y){
    var options ={
        isStatic:true,
    }
    this.r=30;
    this.speed=0.05;
    this.body=Bodies.circle(x,y,this.r,options)
    this.image=loadImage("assets/cannonBall.png")
    this.animation=[this.image]
    this.issink=false;
    World.add(world,this.body);
}

shoot(){
var newangle = cannon.angle-28  //variavel para armazenar o angulo do canhao 
newangle = newangle*(3.14/180)  //transformar o angulo em graus para radianos 
var velocity = p5.Vector.fromAngle(newangle)      //variavel para guardar o vetor de velocidade do angulo do canhao
velocity.mult(0.5)     //multiplicando a velocidade do vetor
    Matter.Body.setStatic(this.body,false)
    Matter.Body.setVelocity(this.body,{x:velocity.x*(180/3.14),y:velocity.y*(180/3.14)})

}



remove(i){
    this.issink=true
    Matter.Body.setVelocity(this.body,{x:0,y:0})
    this.animation=watersplashanimation
    this.speed=0.05
    this.r=150
    setTimeout(()=>{
    Matter.World.remove(world,this.body)
    delete balas[i]},1000)
}


display(){
    var pos=this.body.position;
    var angle=this.body.angle
    var index=floor(this.speed%this.animation.length)
    push();
    translate(pos.x,pos.y)
    rotate(angle)
    imageMode(CENTER);
    image(this.animation[index],0,0,this.r,this.r)
    pop();

}









}