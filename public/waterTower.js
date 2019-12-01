window.addEventListener("DOMContentLoaded", () => {
  //**************** Scene ****************//
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  //**************** Camera ****************//
  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    3.2,
    0.5,
    70,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas);
  //**************** Light ****************//
  const light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.75;

  //materials
  var waterTowerMaterial = new BABYLON.StandardMaterial("waterTowerMaterial", scene);
  waterTowerMaterial.diffuseTexture = new BABYLON.Texture("https://raw.githubusercontent.com/freshusername/web/master/rust.jpg", scene);
  waterTowerMaterial.diffuseTexture.uOffset = 0.0;
  waterTowerMaterial.diffuseTexture.vOffset = 0.0;

  var kranMaterial = new BABYLON.StandardMaterial("kranMaterial", scene);
  kranMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

  //Starting creating modules for water tower

  var bottomPlData = [
    new BABYLON.Vector3(-4, 0, -4),
    new BABYLON.Vector3(4, 0, -4),
    new BABYLON.Vector3(4, 0, 4),
    new BABYLON.Vector3(-4, 0, 4)
  ];

  var bottomPl = BABYLON.MeshBuilder.ExtrudePolygon(
    "bottomPl",
    { shape: bottomPlData, depth: 0.4 },
    scene
  );
  bottomPl.position.y = 0;

  var thinConn = BABYLON.MeshBuilder.CreateBox(
    "thinConn",
    { height: 8.5, width: 0.1, depth: 0.1 },
    scene
  );
  thinConn.isVisible = false;
  
  var thinWaterPlatformConn = BABYLON.MeshBuilder.CreateBox(
    "thinWaterPlatformConn",
    { height: 1.95, width: 0.07, depth: 0.07 },
    scene
  );
  thinWaterPlatformConn.isVisible = false;

  var longConn = BABYLON.MeshBuilder.CreateBox(
    "longConn",
    { height: 22.2, width: 0.4, depth: 0.4 },
    scene
  );
  longConn.isVisible = false;

  var midConn = BABYLON.MeshBuilder.CreateBox(
    "midConn",
    { height: 6, width: 0.2, depth: 0.2 },
    scene
  );
  midConn.isVisible = false;

  //middle small conn longer at X axis
  var midSmallConnX = BABYLON.MeshBuilder.CreateBox(
    "midSmallConnX",
    { height: 1, width: 0.75, depth: 0.25 },
    scene
  );
  midSmallConnX.isVisible = false;
  
  //middle small conn longer at Z axis
  var midSmallConnZ = BABYLON.MeshBuilder.CreateBox(
    "midSmallConnZ",
    { height: 1, width: 0.25, depth: 0.75 },
    scene
  );
  midSmallConnZ.isVisible = false;

  var bottomSmallConn = BABYLON.MeshBuilder.CreateBox(
    "bottomSmallConn",
    { height: 0.1, width: 1, depth: 1 },
    scene
  );
  bottomSmallConn.isVisible = false;

  var bottomBox = BABYLON.MeshBuilder.CreateBox(
    "bottomBox",
    { height: 2.25, width: 2, depth: 2 },
    scene
  );
  bottomBox.position = new BABYLON.Vector3(0, 1, 0);

  var centerTube = BABYLON.MeshBuilder.CreateCylinder(
    "centerTube",
    { height: 16, diameter: 0.65, tessellation: 36 },
    scene
  );
  centerTube.position = new BABYLON.Vector3(0, 10, 0);

  var waterCylBottomArmor = BABYLON.MeshBuilder.CreateCylinder(
    "waterCylBottomArmor",
    { height: 9, diameterTop: 3.5, diameterBottom: 0.65 ,tessellation: 3 },
    scene
  );
  waterCylBottomArmor.position = new BABYLON.Vector3(0, 20.5, 0);

  //Water KRANS
  var waterKran1 = BABYLON.MeshBuilder.CreateCylinder(
    "waterKran1",
    { height: 2.4, diameter: 0.4, tessellation: 16 },
    scene
  );
  waterKran1.position = new BABYLON.Vector3(0.4, 1.4, 0);
  waterKran1.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);

  var waterKran2 = BABYLON.MeshBuilder.CreateCylinder(
    "waterCylBottomArmor",
    { height: 2.4, diameter: 0.4, tessellation: 16 },
    scene
  );
  waterKran2.position = new BABYLON.Vector3(-0.4, 1.4, 0);
  waterKran2.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);



  var hoop1 = BABYLON.MeshBuilder.CreateTorus("hoop1", {diameter: 9, thickness: 0.09, tessellation: 16} , scene);
  hoop1.position = new BABYLON.Vector3(0, 24, 0);
  var hoop2 = BABYLON.MeshBuilder.CreateTorus("hoop2", {diameter: 9, thickness: 0.09, tessellation: 16} , scene);
  hoop2.position = new BABYLON.Vector3(0, 23, 0);

  var waterPlatform = BABYLON.MeshBuilder.CreateCylinder("waterPlatform", {diameter: 9.4, height: 0.25, tessellation: 18}, scene);
  waterPlatform.position = new BABYLON.Vector3(0, 22.05, 0);
  var waterPlatformCut = BABYLON.MeshBuilder.CreateCylinder("waterPlatformCut", {diameter: 7.4, height: 0.4, tessellation: 18}, scene);
  waterPlatformCut.position = new BABYLON.Vector3(0, 22.05, 0);
  
  // var waterPlatformCutMesh = BABYLON.Mesh.CreateSphere("sphere", 16, 4, scene);
  // var knifeCSG = BABYLON.CSG.FromMesh(waterPlatformCutMesh);
  // var subCSG = waterPlatform.substract(knifeCSG);
  // var finWaterPlatform = subCSG.toMesh("finalWaterPlatform", scene);
  // finWaterPlatform.position = new BABYLON.Vector3(0, 20.05, 0);

  var waterCyl = BABYLON.MeshBuilder.CreateCylinder("waterCyl", {diameter: 6.509, height: 5, tessellation: 30}, scene);
  waterCyl.position = new BABYLON.Vector3(0, 23, 0);
  var waterSphere1 = BABYLON.MeshBuilder.CreateSphere("waterSphere1", {diameter: 6.5, diameterY: 5}, scene);
  waterSphere1.position = new BABYLON.Vector3(0, 25.5, 0);
  var waterSphere2 = BABYLON.MeshBuilder.CreateSphere("waterSphere2", {diameter: 6.5, diameterY: 5}, scene);
  waterSphere2.position = new BABYLON.Vector3(0, 20.5, 0);


  var longConnPos = [
    new BABYLON.Vector3(3, 11, 3),
    new BABYLON.Vector3(3, 11, -3),
    new BABYLON.Vector3(-3, 11, -3),
    new BABYLON.Vector3(-3, 11, 3)
  ];
  var thinConnPos = [
    new BABYLON.Vector3(0, 6, 3),
    new BABYLON.Vector3(3, 6, 0),
    new BABYLON.Vector3(0, 6, -3),
    new BABYLON.Vector3(-3, 6, 0)
  ];

 
  //midConnPos is parent pos for mergedMidConnPos
  var midConnPos = [
    new BABYLON.Vector3(0, 3, 3),
    new BABYLON.Vector3(3, 3, 0),
    new BABYLON.Vector3(0, 3, -3),
    new BABYLON.Vector3(-3, 3, 0)
  ];

  //small connections poss
  var midSmallConnPosX = [
    new BABYLON.Vector3(2.75, 3, 3),
    new BABYLON.Vector3(2.75, 3, -3),
    new BABYLON.Vector3(-2.75, 3, -3),
    new BABYLON.Vector3(-2.75, 3, 3)
  ];

  var midSmallConnPosZ = [
    new BABYLON.Vector3(3, 3, 2.75),
    new BABYLON.Vector3(3, 3, -2.75),
    new BABYLON.Vector3(-3, 3, -2.75),
    new BABYLON.Vector3(-3, 3, 2.75)
  ];

  var mergedMidConnPos = [
    new BABYLON.Vector3(0, 6, 0),
    new BABYLON.Vector3(0, 12, 0)
  ];
  
  var mergedThinConnPos = [
    new BABYLON.Vector3(0, 6, 0),
    new BABYLON.Vector3(0, 12, 0)
  ];
  
  var mergedMidSmallConnPos = [
    new BABYLON.Vector3(0, 6, 0),
    new BABYLON.Vector3(0, 12, 0)
  ];

  var bottomSmallConnPos = [
    new BABYLON.Vector3(3, 0, 3),
    new BABYLON.Vector3(3, 0, -3),
    new BABYLON.Vector3(-3, 0, -3),
    new BABYLON.Vector3(-3, 0, 3)
  ];

  var thinWaterPlatformConnPos = [
    new BABYLON.Vector3(4.45, 23, 0), 
    new BABYLON.Vector3(4.1, 23, -1.73),    
    new BABYLON.Vector3(3.15, 23, -3.15),   
    new BABYLON.Vector3(1.76, 23, -4.1),    
    new BABYLON.Vector3(0, 23, -4.45),      
    new BABYLON.Vector3(-1.73, 23, -4.1),   
    new BABYLON.Vector3(-3.15, 23, -3.15),  
    new BABYLON.Vector3(-4.1, 23, -1.76),
    new BABYLON.Vector3(-4.45, 23, 0),

    new BABYLON.Vector3(-4.1, 23, 1.76),
    new BABYLON.Vector3(-3.15, 23, 3.15),  
    new BABYLON.Vector3(-1.73, 23, 4.1),
    new BABYLON.Vector3(0, 23, 4.45), 
    new BABYLON.Vector3(1.73, 23, 4.1),
    new BABYLON.Vector3(3.15, 23, 3.15),
    new BABYLON.Vector3(4.1, 23, 1.76)
    

  ];

  var midConns = [];
  var thinConns = [];
  var thinConns1 = [];
  var longConns = [];
  var midSmallConnsX = [];
  var midSmallConnsZ = [];
  var smallBottomConns = [];

  //spawn small thin water platform armatures
  for(var i = 0; i < 16; i++)
  {
    var cloneThinWaterPlatformConn  = thinWaterPlatformConn.clone("thinWaterPlatformConn");
    cloneThinWaterPlatformConn.isVisible = true;
    cloneThinWaterPlatformConn.position = thinWaterPlatformConnPos[i];
    //thinWaterPlatformConns[i] = cloneThinWaterPlatformConn;
  }
  

  for (var i = 0; i < 4; i++) {
    var cloneThinConn = thinConn.clone("thinCon");
    var cloneThinConn1 = thinConn.clone("thinCon");
    var cloneLongConn = longConn.clone("longConn");
    var cloneMidConn = midConn.clone("midConn");
    var cloneMidSmallConnX = midSmallConnX.clone("midSmallConnX");
    var cloneMidSmallConnZ = midSmallConnZ.clone("midSmallConnZ");
    var cloneBottomSmallConn = bottomSmallConn.clone("bottomSmallConn");

    cloneThinConn.isVisible = true;
    cloneThinConn1.isVisible = true;
    cloneLongConn.isVisible = true;
    cloneMidConn.isVisible = true;
    cloneBottomSmallConn.isVisible = true;
    cloneMidSmallConnX.isVisible = true;
    cloneMidSmallConnZ.isVisible = true;

    cloneThinConn.position = thinConnPos[i];
    cloneThinConn1.position = thinConnPos[i];
    cloneLongConn.position = longConnPos[i];
    cloneMidConn.position = midConnPos[i];
    cloneMidSmallConnX.position = midSmallConnPosX[i];
    cloneMidSmallConnZ.position = midSmallConnPosZ[i];
    cloneBottomSmallConn.position = bottomSmallConnPos[i];

    if (i % 2 == 0) {
      cloneMidConn.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
      cloneThinConn.rotate(BABYLON.Axis.Z, Math.PI / 4, BABYLON.Space.WORLD);
      cloneThinConn1.rotate(BABYLON.Axis.Z, -Math.PI / 4, BABYLON.Space.WORLD);
    } else {
      cloneMidConn.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
      cloneThinConn.rotate(BABYLON.Axis.X, Math.PI / 4, BABYLON.Space.WORLD);
      cloneThinConn1.rotate(BABYLON.Axis.X, -Math.PI / 4, BABYLON.Space.WORLD);
    }

    midConns[i] = cloneMidConn;
    thinConns[i] = cloneThinConn;
    thinConns1[i] = cloneThinConn1;
    midSmallConnsX[i] = cloneMidSmallConnX;
    midSmallConnsZ[i] = cloneMidSmallConnZ;
    longConns[i] = cloneLongConn;
    smallBottomConns[i] = cloneBottomSmallConn;


    console.log(i);
  }

  var mergeMidConns = BABYLON.Mesh.MergeMeshes(
    [midConns[0], midConns[1], midConns[2], midConns[3]],
    true,
    false,
    null,
    true,
    true
  );
  
  var mergeSmallBottomConns = BABYLON.Mesh.MergeMeshes(
    [smallBottomConns[0], smallBottomConns[1], smallBottomConns[2], smallBottomConns[3]],
    true,
    false,
    null,
    true,
    true
  );

  var mergeThinConns = BABYLON.Mesh.MergeMeshes(
    [thinConns[0], thinConns[1], thinConns[2], thinConns[3],thinConns1[0], thinConns1[1], thinConns1[2], thinConns1[3]],
    true,
    false,
    null,
    true,
    true
  );
  var mergeMidSmallConnsX = BABYLON.Mesh.MergeMeshes(
    [midSmallConnsX[0], midSmallConnsX[1], midSmallConnsX[2], midSmallConnsX[3]], 
    true,
    false,
    null,
    true,
    true
  );

  var mergeMidSmallConnsZ = BABYLON.Mesh.MergeMeshes(
    [midSmallConnsZ[0], midSmallConnsZ[1], midSmallConnsZ[2], midSmallConnsZ[3]],
    true,
    false,
    null,
    true,
    true
  );

  var mergeLongConns = BABYLON.Mesh.MergeMeshes(
    [longConns[0], longConns[1], longConns[2], longConns[3]],
    true,
    false,
    null,
    true,
    true
  );


  var mergedCloneMergedMidConns = [];
  var mergedCloneMergedThinConns = [];
  var mergedCloneMidSmallConnsX = [];
  var mergedCloneMidSmallConnsZ = [];

  
  for (var i = 0; i < 2; i++) {
    cloneMergedMidConns = mergeMidConns.clone("mergedMidConns");
    cloneMergedMidConns.position = mergedMidConnPos[i];
    mergedCloneMergedMidConns[i] = cloneMergedMidConns;

    cloneMergedThinConns = mergeThinConns.clone("mergedThinConns");
    cloneMergedThinConns.position = mergedThinConnPos[i];
    mergedCloneMergedThinConns[i] = cloneMergedThinConns;


    cloneMergedMidSmallConnsX = mergeMidSmallConnsX.clone("mergedMidSmallConns");
    cloneMergedMidSmallConnsX.position = mergedMidSmallConnPos[i];
    mergedCloneMidSmallConnsX[i] = cloneMergedMidSmallConnsX;

    cloneMergedMidSmallConnsZ = mergeMidSmallConnsZ.clone("mergedMidSmallConns");
    cloneMergedMidSmallConnsZ.position = mergedMidSmallConnPos[i];
    mergedCloneMidSmallConnsZ[i] = cloneMergedMidSmallConnsZ;
    
  }

  var mergeClonedConns = BABYLON.Mesh.MergeMeshes(
    [mergedCloneMergedMidConns[0], mergedCloneMergedMidConns[1], mergedCloneMergedThinConns[0], mergedCloneMergedThinConns[1], mergedCloneMidSmallConnsX[0], mergedCloneMidSmallConnsX[1], mergedCloneMidSmallConnsZ[0], mergedCloneMidSmallConnsZ[1]],
    true,
    false,
    null,
    true,
    true
  );

  var waterTower = BABYLON.Mesh.MergeMeshes(
    [waterPlatformCut, waterSphere1, waterSphere2, waterPlatform, waterCylBottomArmor, hoop1, hoop2, waterCyl, mergeSmallBottomConns, centerTube, bottomBox, bottomPl, mergeLongConns, mergeMidConns, mergeThinConns, mergeMidSmallConnsX, mergeMidSmallConnsZ, mergeClonedConns ], 
    true,
    false,
    null,
    true,
    true
  );

  waterKran1.material = kranMaterial;
  waterKran2.material = kranMaterial;

  waterTower.material = waterTowerMaterial;



















  var rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  
  engine.runRenderLoop(function() {
    scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener("resize", function() {
    engine.resize();
  });
});
