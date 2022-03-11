var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

// bounderies 
var line1 = createSprite(200, 300,400,1)
var line2 = createSprite(200, 100, 400, 1)
//zones
var startzone = createSprite(10, 200, 60, 200)
startzone.shapeColor = "blue"
var endzone = createSprite(390, 200, 60, 200)
endzone.shapeColor = "yellow"
// sam
var sam = createSprite(20,200, 20, 20)
sam.shapeColor = "green"
// cops
var cop1 = createSprite(130, 110, 20, 20)
cop1.shapeColor = "red"
var cop2 = createSprite(185, 290, 20, 20)
cop2.shapeColor = "red"
var cop3 = createSprite(240, 110, 20, 20)
cop3.shapeColor = "red"
var cop4 = createSprite(295, 290, 20, 20)
cop4.shapeColor = "red"

//cops velocity
cop1.setVelocity(0,9)
cop2.setVelocity(0,-9)
cop3.setVelocity(0,9)
cop4.setVelocity(0,-9)
 
//lives
var lives = 0
var edges


function draw() {
  
  background("white");
  drawSprites()
  textSize(30)
  text ("lives: "+ lives, 280,70 )
// bounce off 
  cop1.bounceOff(line1)
  cop1.bounceOff(line2)
   cop2.bounceOff(line1)
  cop2.bounceOff(line2)
   cop3.bounceOff(line1)
  cop3.bounceOff(line2)
   cop4.bounceOff(line1)
  cop4.bounceOff(line2)
  
  edges=createEdgeSprites()
  // console.log(edges)
  // 0-L 1-R 2-T 3-B
  sam.bounceOff(edges[0]);
  sam.bounceOff(edges[1]);
 
  
  //controls for sam
  sam.velocityX = 0
  sam.velocityY = 0
  
if (keyDown("d")) {
  sam.velocityX = 4
}
if (keyDown("a")) {
  sam.velocityX = -4
}
  
if (sam.isTouching(cop1)|| sam.isTouching(cop2)|| sam.isTouching(cop3)|| sam.isTouching(cop4)) {
  sam.x = 20 
  sam.y = 200
  lives+= 1
}

if (sam.isTouching(endzone)) {
  fill("black");
  textSize(30)
  text("You win",150,200)
  
}

 
}



// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
