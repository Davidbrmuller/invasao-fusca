const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var backgroundimg;
var torre, torreimg;
var cannon, angle=20, cannonimg; 
var bala
var balas=[]
var barco
var barcos =[]
var boatanimation=[]
var boatspritedata
var boatspritesheet
var boatsframes
var img;
var brokenboatss
var brokenboatsd
var brokenboatanimation=[]
var watersplashs
var watersplashsd
var watersplashanimation=[]
var isgameover=false;
var musicadefundo
var splash
var explosaodocanhao
var risadadopirata
var isrisada=false
var score=0
function preload() {
  musicadefundo=loadSound("assets/background_music.mp3")
  splash=loadSound("assets/cannon_water.mp3")
  explosaodocanhao=loadSound("assets/cannon_explosion.mp3")
  risadadopirata=loadSound("assets/pirate_laugh.mp3")
 backgroundimg=loadImage("assets/background.gif");
 torreimg=loadImage("assets/tower.png");
 watersplashsd=loadJSON("assets/water_splash/water_splash.json")
 watersplashss=loadImage("assets/water_splash/water_splash.png")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
 options={
 isStatic:true
 }
 angleMode(DEGREES);
 angle=15;
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 torre=Bodies.rectangle(160,350,160,310,options);
 World.add(world,torre);
 cannon=new Cannon(180,110,130,100,angle)
 barco=new Barco(width-79,height-20,170,170,-80)
var splashframes=watersplashsd.frames
  for (var i=0;i<splashframes.length;i=i+1){
    var pos=splashframes[i].position
    var img =watersplashss.get(pos.x,pos.y,pos.w,pos.h)
    watersplashanimation.push(img)
}
}

function draw() {
  
  image(backgroundimg,0,0,1200,600);
  Engine.update(engine);
  if (!musicadefundo.isPlaying()){
    musicadefundo.play()
    musicadefundo.setVolume(0.1)
  }
 fill("white")
 textSize(40)
 text("pontuacao:"+score,350,50)
 rect(ground.position.x, ground.position.y,width*2,1);
 push();
 imageMode(CENTER);
 image(torreimg,torre.position.x, torre.position.y,160,310); 
   pop();
   cannon.display();
   showbarcos();

   //criando as bolas de canhao de acordo com o compromento da matriz
   for(var i=0;i<balas.length;i++){
  showCannonBall(balas[i],i);
  colisaobarco(i);
}
}
function keyReleased(){
  if (keyCode===DOWN_ARROW){
  balas[balas.length-1].shoot()}//atirando as balas de canhao de dentro da matriz balas
  explosaodocanhao.play() 
}
function keyPressed(){
  if(keyCode===DOWN_ARROW){
    bala= new Cannonball(cannon.x,cannon.y)//criando balas de canhao apos a seta para baixo
    balas.push(bala);//adicionando as balas de canhao na matriz
  }
}
//exibindo as balas de canhao de acordo com o indice da matriz(i)
function showCannonBall(bala,i){
  if(bala){
    bala.display();
    if(bala.body.position.x>=width||bala.body.position.y>=height-50){
      if (!bala.issink){bala.remove(i) 
        splash.play()}
    }
  }
}
function showbarcos(){
  //se o comprimento da matriz de barcos é maior que 0 se nao for, criar barco no else (linha 89)
  if(barcos.length>0){
    //se barco for indefinido ou estiver na posicao menor que -300 criar novo barco
        if(barcos[barcos.length-1]===undefined||barcos[barcos.length-1].body.position.x<width-300){
          //vriando barcos em uma posicao aleatoria dentro da matriz posicoes
          var posicoes=[-40,-60,-70,-20]
          var posicao=random(posicoes)
          var barco=new Barco(width,height-100,170,170,posicao)
          //adicionando o barco na matriz barcos
          barcos.push(barco)
        }
        //verificar se tem barcos na matriz, se tiver, exibir barco e adicionar velocidade
for(var i=0;i<barcos.length;i++){
  if(barcos[i]){
    Matter.Body.setVelocity(barcos[i].body,{x:-0.9,y:0})
    barcos[i].display();
    var colision=Matter.SAT.collides(torre,barcos[i].body)
    if (colision.collided){
      if (!isrisada && !risadadopirata.isPlaying()){
        risadadopirata.play()
        isrisada=true 
      }
      isgameover=true;
      gameover();
    }
  }
  else{
    barcos[i];
  }
}
  }
  //estruçao para criar e adicionar o primeiro barco,se nao tiver barcos na matriz
  else{
    var barco=new Barco(width,height-60,170,170,-60)
    barcos.push(barco);
  }
}


function colisaobarco(index){
  for(var i=0;i<barcos.length;i=i+1){
if(balas[index]!==undefined && barcos[i]!==undefined){
  var colisao= Matter.SAT.collides(balas[index].body,barcos[i].body)
  if(colisao.collided){
    barcos[i].remove(i)
    score+=5
    Matter.World.remove(world,balas[index].body)
    delete balas[index]
  }
}

  }
}
function gameover(){
  swal({
    title:"fim de jogo",
    text:"OBRIGADO POR JOGAR",
    confirmButtomText:"jogar novamente"
  },
  function(isConfirm){
    location.reload()
  })
}