let targetY = 0, animY = 0, currentY = 0, ease = 0.1;

const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
const isChrome = navigator.userAgent.indexOf("Chrome") > -1;

const colors = {
    amber: '0xcebc81',
    black: '0x2a363b',
    orange : '0xff847c',
    trans : 'transparent',
}
function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}
function getTranslate(el) {
    const translate = {}
    if (!window.getComputedStyle) return;

    const style = getComputedStyle(el);
    const transform = style.transform || style.webkitTransform || style.mozTransform;

    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);

    mat = transform.match(/^matrix\((.+)\)$/);
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;

    return translate;
}
const getMousePos = (ev) => {
    let posx = 0;
    let posy = 0;
    if (!ev) ev = window.event;
    if (ev.pageX || ev.pageY) {
        posx = ev.pageX;
        posy = ev.pageY;
    }
    else if (ev.clientX || ev.clientY) {
        posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
        posy = ev.clientY + body.scrollTop + docEl.scrollTop;
    }
    return { x: posx, y: posy };
}
//variables

const main = document.querySelector('.main');
const content = document.querySelector('.scroll-content');
anime.set(main, { overflow: 'hidden'});
anime.set(content, { overflow: 'hidden',paddingTop : window.innerHeight * 3 });
anime.set('.work', { paddingBottom : window.innerHeight});

const limit = main.getBoundingClientRect().height - window.innerHeight;
function initHome() {
    document.body.classList.add('loading');
   
    console.log('init-home');
    setTimeout(() => {
        document.body.classList.remove('loading');
        initEverything();
    }, 2000);
}
function initEverything(){
    document.addEventListener('wheel', initScroll)
    const works = document.querySelectorAll('.item');
    works.forEach((el, i) => {
        el.firstElementChild.setAttribute('data-work', i + 1)
        el.firstElementChild.nextElementSibling.setAttribute('data-work', i + 1)
        el.firstElementChild.addEventListener('mouseenter', workMouseEnterFn);
        el.firstElementChild.addEventListener('mouseleave', workMouseLeaveFn);
    });
    function workMouseEnterFn(e) {
        let g = e.target.getAttribute('data-work');

    }
    function workMouseLeaveFn(e) {
        let g = e.target.getAttribute('data-work');

    }
//pixi-webgl things

    const app = new PIXI.Application(window.innerWidth,window.innerHeight,{
        transparent : true,
        resolution : 2,
        antialias : true,
        autoResize: true
    });
    app.view.setAttribute('id','canvas');
    main.appendChild(app.view);

    var mainBg = new PIXI.Graphics;
    mainBg.beginFill(colors.amber);
    mainBg.drawRect(0,0,window.innerWidth,window.innerHeight);
    app.stage.addChild(mainBg);
    
    var cont = new PIXI.Container();
    app.stage.addChild(cont);
       
    var introtxt_1 = new PIXI.Text('Simple_M.',{
        fontFamily : 'league',
        fontSize : 120,
        fontWeight : 900,
        fill : colors.black
    });
    introtxt_1.anchor.set(0.5,0.5);
    introtxt_1.x = window.innerWidth/2;
    introtxt_1.y = window.innerHeight/2;
    cont.addChild(introtxt_1);

    var mask_one = new PIXI.Graphics;
    mask_one.beginFill(0);
    mask_one.drawRect(0,0,window.innerWidth,window.innerHeight);
    app.stage.addChild(mask_one); 

    var bgOne = new PIXI.Graphics;
    bgOne.beginFill(colors.black);
    bgOne.drawRect(0,0,window.innerWidth,window.innerHeight);
    bgOne.mask = mask_one;
    app.stage.addChild(bgOne); 

    var cont_2 = new PIXI.Container();
    app.stage.addChild(cont_2);

    var introtxt_2 = new PIXI.Text('Simple_M.',{
        fontFamily : 'league',
        fontSize : 120,
        fontWeight : 900,
        fill : colors.amber
    });
    introtxt_2.anchor.set(0.5,0.5);
    introtxt_2.x = window.innerWidth/2;
    introtxt_2.y = window.innerHeight/2;
    cont_2.addChild(introtxt_2);
    cont_2.mask = mask_one;

    var scrolltxt = new PIXI.Text('scroll to discover',{
        fontFamily : 'league',
        fontSize : 15,
        fontWeight : 600,
        fill : colors.black
    });
    scrolltxt.anchor.set(0.5,0.5);
    scrolltxt.x = window.innerWidth/2;
    scrolltxt.y = window.innerHeight -scrolltxt.height;
    app.stage.addChild(scrolltxt);

    var bgTwo = new PIXI.Graphics;
    bgTwo.beginFill(colors.amber);
    bgTwo.drawRect(0,0,window.innerWidth,window.innerHeight);
    app.stage.addChild(bgTwo);
    
    
    var introdesc_1 = new PIXI.Text("Hi..I\'m Malinda Anupama.",{
        fontFamily : 'league',
        fontSize : 45,
        fontWeight : 900,
        fill : colors.amber
    });
    introdesc_1.anchor.set(0.5,0.5);
    introdesc_1.alpha = 0;
    introdesc_1.x = window.innerWidth/2 - introdesc_1.width/4;
    introdesc_1.y = window.innerHeight - introdesc_1.height*2;
    app.stage.addChild(introdesc_1);
    
    var introdesc_2 = new PIXI.Text("Freelance Web Designer.",{
        fontFamily : 'league',
        fontSize : 45,
        fontWeight : 900,
        fill : colors.amber
    });
    introdesc_2.anchor.set(0.5,0.5);
    introdesc_2.alpha = 0;
    introdesc_2.x = window.innerWidth/2 + introdesc_2.width/4;
    introdesc_2.y = window.innerHeight - introdesc_2.height;
    app.stage.addChild(introdesc_2);

    var fancytxt_1 = new PIXI.Text('Creative',{
        fontFamily : 'monument',
        fontSize : 300,
        fontWeight : 900,
        fill : colors.black
    });
    fancytxt_1.anchor.set(0.5,0.5);
    fancytxt_1.x = -window.innerWidth;
    fancytxt_1.y = window.innerHeight/4;
    app.stage.addChild(fancytxt_1);
    
    var fancytxt_2 = new PIXI.Text('Developer',{
        fontFamily : 'monument',
        fontSize : 300,
        fontWeight : 900,
        fill : colors.black
    });
    fancytxt_2.anchor.set(0.5,0.5);
    fancytxt_2.x = window.innerWidth + fancytxt_2.width;
    fancytxt_2.y = window.innerHeight/2 + fancytxt_2.height/3;
    app.stage.addChild(fancytxt_2);

    var bgThree = new PIXI.Graphics;
    bgThree.beginFill(colors.orange);
    bgThree.drawRect(0,0,window.innerWidth,window.innerHeight);
    app.stage.addChild(bgThree);

    var tl = anime.timeline({
        loop: false,
        //autoplay: false,
        delay : 0,
    });
    tl
    .add({
        targets : mask_one,
        y : [window.innerHeight,0],
        duration : 1000,
        easing : 'easeOutExpo'
    },0)
    .add({
        targets : introtxt_1,
        y : [window.innerHeight/2,window.innerHeight/2 - 300],
        duration : 4500,
        easing : 'easeOutExpo'
    },0)
    .add({
        targets : introtxt_2,
        y : [window.innerHeight/2,window.innerHeight/2 - 300],
        duration : 4500,
        easing : 'easeOutExpo'
    },0)
    .add({
        targets : introdesc_1,
        x : [window.innerWidth/2 - introdesc_1.width/4,window.innerWidth/2],
        alpha : 1,
        duration : 2800,
        easing : 'easeOutExpo'
    },100)
    .add({
        targets : introdesc_2,
        x : [window.innerWidth/2 + introdesc_2.width/4,window.innerWidth/2],
        alpha : 1,
        duration : 2800,
        easing : 'easeOutExpo'
    },100)
    .add({
        targets : bgTwo,
        y : [window.innerHeight,0],
        duration : 1000,
        easing : 'easeOutExpo'
    },1000)
    .add({
        targets : fancytxt_1,
        x : [-window.innerWidth,window.innerWidth + fancytxt_1.width],
        duration : 2500,
        easing : 'easeOutSine'
    },1200)
    .add({
        targets : fancytxt_2,
        x : [window.innerWidth + fancytxt_2.width,-window.innerWidth],
        duration : 2500,
        easing : 'easeOutSine'
    },1200)
    .add({
        targets : bgThree,
        y : [window.innerHeight,0],
        duration : 1000,
        easing : 'easeOutQuart'
    },3000)
    
    
    
    function initScroll(e) {

        if (e.deltaY < 0) { this.direction = 'down' } else { this.direction = 'up' }
        if (isFirefox && e.deltaMode == 1) {
            e.deltaX *= 15;
            e.deltaY *= 15;
        }
        targetY += e.deltaY * -10;
        targetY = Math.max((limit) * -1, targetY);
        targetY = Math.min(0.0001, targetY);
        animY = (targetY / 30);
    }

    update();

    function update() {
        requestAnimationFrame(update);
        let p = 0;
        currentY += (targetY - currentY) * ease;
        transform(content, 0, currentY)
        tl.seek((currentY / -2000) * tl.duration);
    }

    function transform(element, x, y, delay) {
        var transform;

        if (!delay) {
            transform = "matrix(1,0,0,1,".concat(x, ",").concat(y, ")");
        } else {
            var start = getTranslate(element);
            var lerpX = lerp(start.x, x, delay);
            var lerpY = lerp(start.y, y, delay);
            transform = "matrix(1,0,0,1,".concat(lerpX, ",").concat(lerpY, ")");
        }

        element.style.webkitTransform = transform;
        element.style.msTransform = transform;
        element.style.transform = transform;
    }
}
    





window.addEventListener('load', initHome);