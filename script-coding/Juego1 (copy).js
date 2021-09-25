//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/

// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach,concat }  = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
  return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {}
////////////////////////
/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
 */
function moveSnake(snake, dir) {
  const head = first(snake);
  return cons({x: head.x + dir.x, y: head.y + dir.y}, snake.slice(0, length(snake) - 1));
}

const dx = 20;
const dy = 20;
const ancho = 400;
const alto = 400;

 let img ;
let img1;
let img2;
let font;

function preload(){
  img = loadImage('images/hamburguesa.png');
  img1 = loadImage('images/manzana.png');
  img2 = loadImage('images/cerveza.png');
  font = loadFont('fuentes/FredokaOne-Regular.ttf')
}


/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
  frameRate(15);
  createCanvas(400, 400);
  background(102, 249, 160 );
  Mundo = {snake: [{ x: 4, y: 1 },{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }], dir: {x: 1, y: 0}, food: {x:320, y: 40}, food1:{x:40, y:320}, food2:{x:320, y:320} ,puntaje:0, borracho:false };

  const lista = Mundo.snake;
  const bezaca= first(Mundo.snake);
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo){
  background(102, 249, 160 );
   textFont(font);

  //snakes 
  fill(75,20,219);
  forEach(Mundo.snake, s => {
    ellipse(s.x * dx+10, s.y * dy+10, dx, dy);
  });

    

//foods 
 imageMode(CENTER);
  image(img1, Mundo.food.x+10 , Mundo.food.y+10 , 30, 30);

 imageMode(CENTER);
  image(img, Mundo.food1.x+10 , Mundo.food1.y+10 , 30, 30);
   
 imageMode(CENTER);
  image(img2, Mundo.food2.x+10 , Mundo.food2.y+10  , 30, 30);


// scores
if(Mundo.puntaje>=0){
  fill(11,25,30); 
  text('Salud: '+Mundo.puntaje, 0, 20);
}
else {
  fill(11,25,30); 
  text('Colesterol: '+Mundo.puntaje*-1, 0, 20);
}

  const lista = Mundo.snake;
  const bezaca= first(Mundo.snake);

//maneras de perder

if(Mundo.puntaje == -7){
  textSize(32)
  textAlign(CENTER)
  text('Perdiste', ancho/2, alto/2);
  fill(0, 102, 153);
  return noLoop(); 
  }

if(chocar(Mundo) || morderse(rest(lista), bezaca)){
  textSize(32)
  textAlign(CENTER)
  text('Perdiste', ancho/2, alto/2);
  fill(0, 102, 153);
  return noLoop(); 
 }

  
} 

/*
contrato: Json,list -> boolean
propósito: Determinar si la serpiente tiene una colisión con alguno de los bordes. 
prototipo: chocar(dirs,snakes)
ejemplos: no aplica
*/ 
function chocar(Mundo){
 if(first(Mundo.snake).x == 19 && Mundo.dir.x == 1||first(Mundo.snake).x == 0 && Mundo.dir.x == -1 ||first(Mundo.snake).y == 19 && Mundo.dir.y == 1 || first(Mundo.snake).y == 0 && Mundo.dir.y == -1 ){
   return true ; 
 }
 else
   return false;
 }

 
  
/*
contrato: list,Json -> boolean
propósito: Determinar si la cabeza de la serpiente tiene una colisión con la comida. 
prototipo: comer(Mundo,foods)
ejemplos: 
comer(Mundo,{x:20, y:60})-> true
comer(Mundo,{x:20, y:60})-> false
*/
function comer(Mundo,foods){
  if ((first(Mundo.snake).x)*20 == foods.x && (first(Mundo.snake).y)*20 == foods.y){
    return true;
  }
  else {
    return false;
  }
}





/*
contrato: list,Json -> boolean
propósito: Determinar si alguna parte de ambas serpientes está en la misma posición que el elmento
prototipo: morderse(snakes,foods)
ejemplos:
  morderse([{ x: 39, y: 5 },{ x: 38, y: 5 }, { x: 37, y: 5 }], { x: 37, y: 5 }) -> true
  morderse([{ x: 38, y: 18 }, { x: 37, y: 18 }],{ x: 37, y: 5 }], { x: 37, y: 6 }) -> false
*/
function morderse(lista, bezaca){
   if(JSON.stringify(first(lista)) === JSON.stringify(bezaca)){
     return true;
   }
   else if(isEmpty(lista)){
    return false;
   }
   else {
    return  morderse(rest(lista), bezaca);
   }
    }



/*
contrato: number,number -> number
propósito: retonar un número aleatorio
prototipo: aleatorio(minimo,maximo)
ejemplos:
  aleatorio(4,6) -> 100
  aleatorio(10,29) -> 360
  aleatorio(5,8) -> 120
*/
function aleatorio(minimo,maximo){
  return Math.round(Math.random() * (maximo - minimo) + minimo)*20;
}

/*
contrato: Mundo,list,list -> Json
propósito: retonar una ubicación aleatoría, evitando los espacios "ocupados". 
prototipo: ubicarComida(Mundo,snakes,snakes1)
ejemplos:
  ubicarComida(Mundo,[{ x: 38, y: 18 }, { x: 37, y: 18 }]) ->{ x: 18, y: 1
  ubicarComida(Mundo,[{ x: 39, y: 5 },{ x: 38, y: 5 }, { x: 37, y: 5 }])  ->            { x: 10, y::18 }
*/

function ubicarComida(Mundo,snake){
  var ramdomF = {x: aleatorio(2,18), y: aleatorio(2,18)}
   console.log(ramdomF)
  if(ramdomF.x == Mundo.food1.x&&ramdomF.y == Mundo.food1.y || ramdomF.x == Mundo.food.x && ramdomF.y == Mundo.food.y){
     console.log("aquí pasó1")
   console.log(ramdomF)
    return ubicarComida(Mundo,snake)
  }
  if(morderse(rest(snake),{x:ramdomF.x/20, y:ramdomF.y/20})){
    
    console.log(ramdomF)
      return ubicarComida(Mundo,snake)
  }
  else{
    return ramdomF;

  }
  }


    
function ultimo2(snake) {
  if (isEmpty(rest(rest(snake)))) {return rest(snake)}
    else return ultimo2(rest(snake))
}

// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo){
// se ejecuta la funcionalidad que esté aquí 

//para la comida chatarra
if(comer(Mundo,Mundo.food1)){
if(Mundo.dir.x == 1){
     return update(Mundo, { food1: ubicarComida(Mundo,Mundo.snake) , snake: cons({x: (first(Mundo.snake).x)+1, y: first(Mundo.snake).y},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:false}) ;
   }
   else if(Mundo.dir.x == -1){
     return update(Mundo,{ food1:  ubicarComida(Mundo,Mundo.snake) , snake: cons({x: (first(Mundo.snake).x)-1, y: first(Mundo.snake).y},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:false}) ; 
   }
   else if(Mundo.dir.y == 1){
     return update(Mundo,{ food1:  ubicarComida(Mundo,Mundo.snake) , snake: cons({x: first(Mundo.snake).x, y: (first(Mundo.snake).y)+1},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:false}) ;
   }
   else if(Mundo.dir.y == -1){
     return update(Mundo, { food1: ubicarComida(Mundo,Mundo.snake), snake: cons({x: first(Mundo.snake).x, y: (first(Mundo.snake).y)-1},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:false}) ;
   }
}
//para la comida saludable

if(comer(Mundo,Mundo.food)){
if(Mundo.dir.x == 1){
     return update(Mundo, { 
      food: ubicarComida(Mundo,Mundo.snake) , 
      // snake: cons({x:(first(Mundo.snake).x)+2, y:first(Mundo.snake).y},cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake)),
      snake: concat(cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake),ultimo2(Mundo.snake)), 

      puntaje: Mundo.puntaje+1, 
      borracho:false}) ;
   }
   else if(Mundo.dir.x == -1){
     return update(Mundo,{ 
      food:  ubicarComida(Mundo,Mundo.snake) , 
      // snake: cons({x:(first(Mundo.snake).x)-2, y:first(Mundo.snake).y},cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake)),
      snake: concat(cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake),ultimo2(Mundo.snake)), 
 
      puntaje: Mundo.puntaje+1, 
      borracho:false}) ; 
   }
   else if(Mundo.dir.y == 1){
     return update(Mundo,{ 
      food:  ubicarComida(Mundo,Mundo.snake) , 
      // snake: cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+2},cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+1},Mundo.snake)),
      snake: concat(cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+1},Mundo.snake),ultimo2(Mundo.snake)), 

      puntaje: Mundo.puntaje+1, 
      borracho:false}) ;
   }
   else if(Mundo.dir.y == -1){
     return update(Mundo, { 
      food: ubicarComida(Mundo,Mundo.snake), 
      // snake: cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-2},cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-1},Mundo.snake)),
      snake: concat(cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-1},Mundo.snake),ultimo2(Mundo.snake)), 

      puntaje: Mundo.puntaje+1, 
      borracho:false}) ;
   }  
}
//para la comida saludable

// if(comer(Mundo,Mundo.food)){
// if(Mundo.dir.x == 1){
//      return update(Mundo, { food: ubicarComida(Mundo,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x)+2, y:first(Mundo.snake).y},cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake)), puntaje: Mundo.puntaje+1, borracho:false}) ;
//    }
//    else if(Mundo.dir.x == -1){
//      return update(Mundo,{ food:  ubicarComida(Mundo,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x)-2, y:first(Mundo.snake).y},cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake)), puntaje: Mundo.puntaje+1, borracho:false}) ; 
//    }
//    else if(Mundo.dir.y == 1){
//      return update(Mundo,{ food:  ubicarComida(Mundo,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+2},cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y+1},Mundo.snake)), puntaje: Mundo.puntaje+1, borracho:false}) ;
//    }
//    else if(Mundo.dir.y == -1){
//      return update(Mundo, { food: ubicarComida(Mundo,Mundo.snake), snake: cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-2},cons({x:(first(Mundo.snake).x), y:first(Mundo.snake).y-1},Mundo.snake)), puntaje: Mundo.puntaje+1, borracho:false}) ;
//    }  
// }

//para la bebida embriagante

if(comer(Mundo,Mundo.food2)){
if(Mundo.dir.x == 1){
     return update(Mundo, { food2: ubicarComida(Mundo,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x)+1, y:first(Mundo.snake).y},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:true}) ;
   }
   else if(Mundo.dir.x == -1){
     return update(Mundo,{ food2:  ubicarComida(Mundo,Mundo.snake) , snake: cons({x:(first(Mundo.snake).x)-1, y:first(Mundo.snake).y},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:true}) ; 
   }
   else if(Mundo.dir.y == 1){
     return update(Mundo,{ food2:  ubicarComida(Mundo,Mundo.snake) , snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)+1},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:true}) ;
   }
   else if(Mundo.dir.y == -1){
     return update(Mundo, { food2: ubicarComida(Mundo,Mundo.snake), snake: cons({x:first(Mundo.snake).x, y:(first(Mundo.snake).y)-1},Mundo.snake), puntaje: Mundo.puntaje-1, borracho:true}) ;
   }
}

 else { 
  return update(Mundo, {snake: moveSnake(Mundo.snake, Mundo.dir)});
}
  
  
}

 



//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent (Mundo, event) {
   return update(Mundo,{});
}


/**
* Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
*/
function onKeyEvent (Mundo, keyCode) {
  // Cambiamos la dirección de la serpiente. Noten que no movemos la serpiente. Solo la dirección
  
   // si no está ebria
  if(Mundo.borracho == false){
    if(keyCode == UP_ARROW && Mundo.dir.y != 1){
     return update(Mundo, {dir: {y: -1, x: 0}});
  }
  else if(keyCode == DOWN_ARROW && Mundo.dir.y != -1){
     return update(Mundo, {dir: {y: 1, x: 0}});
  }
  else if(keyCode == LEFT_ARROW && Mundo.dir.x != 1){
   return update(Mundo, {dir: {y: 0, x: -1}});
  }
  else if(keyCode == RIGHT_ARROW && Mundo.dir.x != -1){
    return update(Mundo, {dir: {y: 0, x: 1}});
  } 
  else{
   return update(Mundo, {})
  }
  }
 // si está ebria
  else {
   if(keyCode == UP_ARROW && Mundo.dir.y != -1){
     return update(Mundo, {dir: {y: 1, x: 0}});
  }
  else if(keyCode == DOWN_ARROW && Mundo.dir.y != 1){
     return update(Mundo, {dir: {y: -1, x: 0}});
  }
  else if(keyCode == LEFT_ARROW && Mundo.dir.x != -1){
   return update(Mundo, {dir: {y: 0, x: 1}});
  }
  else if(keyCode == RIGHT_ARROW && Mundo.dir.x != 1){
    return update(Mundo, {dir: {y: 0, x: -1}});
  } 
  else{
   return update(Mundo, {})
  }
  
  }
  
}