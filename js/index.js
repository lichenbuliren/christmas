var snowArr = [],
    stage,
    content,
    canvas,
    bg,
    tree,
    viewH,
    viewW;

var preLoader,
    mainfest, // 素材资源列表
    totalLoaded = 0; // 文件加载数量

init();


// 初始化场景
function init() {
    canvas = document.getElementById('pannel');
    stage = new createjs.Stage(canvas);

    viewW = document.documentElement.offsetWidth;
    viewH = document.documentElement.offsetHeight;
    console.log(viewW,viewH);

    stage.width = canvas.width = viewW;
    stage.height = canvas.height = viewH;

    content = new createjs.Container();
    stage.addChild(content);

    // 设置触摸可用，如果当前的设备支持的话
    createjs.Touch.enable(stage);

    mainfest = [{
        src: 'bg.jpg',
        id: 'bg'
    },{
        src: 'tree.png',
        id: 'tree'
    }];

    // 预加载
    preLoader = new createjs.LoadQueue();
    // preLoader.on('progress',handleProgress);
    preLoader.on('complete',handleComplete);
    // preLoader.on('fileload',handleFileload);
    preLoader.loadManifest(mainfest,true,'../images/');

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', stage);
}


//  资源加载完毕
function handleComplete(){
    var bgImage = preLoader.getResult('bg');
    var treeImage = preLoader.getResult('tree');
    console.log(bgImage.width,bgImage.height);
    // 创建背景
    var bgShape = new createjs.Shape();
    bgShape.graphics.beginBitmapFill(bgImage).drawRect(0,0,viewW,viewH);
    bgShape.setTransform(0,0,1-viewW/bgImage.width,1-viewH/bgImage.height);
    stage.addChild(bgShape);
}