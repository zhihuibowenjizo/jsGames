let zw = [];
let js = [];
let ygnum = 50;//初始阳光
let xzzw = null;
let jssc = [15,110,210,310,410]
let jss = [];
let xzys = ["images/interface/Shovel/0.gif","images/Plants/SunFlower/SunFlower1.gif","images/Plants/Peashooter/Peashooter.gif","images/Plants/WallNut/WallNut.gif"];

for (let i = 1;i<=document.querySelectorAll(".zw").length;i++){
    document.querySelectorAll(".zw")[i-1].onclick = function () {
        xzzw = i;
    }
}
document.querySelector("#cz").onclick = function () {
    xzzw = 0;
}
let xz = document.querySelector("#xz");
document.querySelector("#canvas1").onmousemove = function (e) {
    xz.style.left = e.offsetX+"px";
    xz.style.top = e.offsetY+"px";
    if (xzzw == null){
        xz.style.background = "none";
    }else{
        xz.style.background = "url("+xzys[xzzw]+")";
        xz.style.backgroundRepeat = "no-repeat";
    }
}
document.querySelector("#canvas1").oncontextmenu = function (e) {
    e.preventDefault();
    xzzw = null;
    xz.style.background = "none";
}
function r(num1,num2) {
    return parseInt(Math.random()*(num2+1-num1)+num1);
}
class Game{
    constructor() {
        for (let i = 0;i<5;i++){
            for (let x = 0;x<9;x++){
                 zw.push(new Ground(i,81*x+256,98*i+85));
            }
        }
        document.querySelector("#ygNum").innerText = ygnum;
        let ygset = setInterval(function () {
            let dyg = new yg(r(300,900),0);
            dyg.classList.add("ygDown");
            let top = r(100,500);
            let i = 0;
            setInterval(function () {
                if (i < top){
                    i++;
                }
                dyg.style.top = i+"px";
            },10);
        },8000);
    }
    drop(){
        document.querySelector("#canvas1").onmouseup = function (e) {
            if (e.button == 0) {
                for (let i = 0; i < zw.length; i++) {
                    if (e.offsetX >= zw[i].x && e.offsetX < zw[i].x + 81) {
                        if (e.offsetY >= zw[i].y && e.offsetY < zw[i].y + 98) {
                            if (zw[i].isHave == 0) {
                                if (xzzw == 1 && ygnum >= 50) {
                                    zw[i].obj = new Xrk(zw[i].x, zw[i].y);
                                    zw[i].isHave = 1;
                                    ygnum -= 50;
                                }
                                if (xzzw == 2 && ygnum >= 100) {
                                    zw[i].obj = new Wdss(zw[i].x, zw[i].y);
                                    zw[i].isHave = 1;
                                    ygnum -= 100;
                                }
                                if (xzzw == 3 && ygnum >= 50) {
                                    zw[i].obj = new Jg(zw[i].x, zw[i].y);
                                    zw[i].isHave = 1;
                                    ygnum -= 50;
                                }
                            document.querySelector("#ygNum").innerText = ygnum;
                            }
                            if (zw[i].isHave == 1 && xzzw == 0) {
                                zw[i].isHave = 0;
                                zw[i].obj.img.remove();
                                clearInterval(zw[i].obj.setInt);
                            }
                            xzzw = null;
                            xz.style.background = "none";
                        }
                    }
                }
            }
        }
    }
    endlessMode(ms){//无尽模式
        this.setInt = setInterval(function () {
            jss.push(new Js(930,jssc[r(0,3)]));
        },ms);
    }
}
class Ground {
    constructor(hang,x,y,obj) {
        this.hang = hang;
        this.x = x;
        this.y = y;
        this.isHave = 0;
        this.obj = obj;
        this.isJs = 0;
    }
}
class Zombie {
    constructor(blood,img,x,y,speed) {
        this.blood = blood;
        this.speed = speed;
        this.fdiv = document.createElement("div");
        this.fdiv.classList.add("zb");
        this.div = document.createElement("div");
        this.div.classList.add("boxCollider");
        this.fdiv.style.left = x+"px";
        this.fdiv.style.top = y+"px";
        this.fdiv.setAttribute("st","run");
        this.jzStyle = document.createElement("div");
        this.jzStyle.classList.add("jzStyle");
        this.img = img;
        this.img = new Image();
        this.img.src = img;
        this.fdiv.append(this.img);
        this.fdiv.append(this.div);
        this.fdiv.append(this.jzStyle);
        document.querySelector("#game").append(this.fdiv);
    }
}
class yg{//阳光
    constructor(x,y) {
        this.yg = new Image();
        this.yg.src = "images/interface/Sun.gif";
        this.yg.style.left = x+"px";
        this.yg.style.top = y+"px";
        this.yg.classList.add("y");
        let a = this;
        this.yg.onload = function (){
            let ygset = setInterval(function () {
                clearInterval(ygset);
                a.yg.remove();
            },6000);
        };
        this.yg.onmouseover = function () {
            a.yg.onmouseover = null;
            a.yg.classList.add("ygGo");
            setTimeout(function () {
                ygnum+=25;
                document.querySelector("#ygNum").innerText = ygnum;
            },800);
        }
        document.querySelector("#game").append(this.yg);
        return this.yg;
    }
}
class Zd{//豌豆射手的子弹
    constructor(x,y) {
        this.zdImg = new Image();
        this.zdImg.src = "images/Plants/PB00.gif";
        this.zdImg.style.top = y+"px";
        this.zdImg.style.left = x+"px";
        this.x = x;
        document.querySelector("#game").append(this.zdImg);
        let ts = this;
        let setInt = setInterval(function () {
            ts.x = ts.x + 1;
            ts.zdImg.style.left = ts.x+"px";
        for (let i = 0;i < jss.length;i++){
            if (ts.zdImg.offsetLeft+56 > jss[i].div.offsetLeft+jss[i].fdiv.offsetLeft && ts.zdImg.offsetLeft+56 < jss[i].div.offsetLeft+jss[i].fdiv.offsetLeft+60){
                if (ts.zdImg.offsetTop+ts.zdImg.height > jss[i].div.offsetTop+jss[i].fdiv.offsetTop && ts.zdImg.offsetTop+ts.zdImg.height<jss[i].div.offsetTop+jss[i].fdiv.offsetTop+50){
                        ts.zdImg.remove();
                        clearInterval(setInt);
                        jss[i].jzStyle.style.opacity = "1";
                        jss[i].blood = jss[i].blood-1;
                        jss[i].jzStyle.style.display = "none";
                        setTimeout(function () {
                            jss[i].jzStyle.style.display = "block";
                            if (jss[i].blood < 0){
                                jss[i].fdiv.remove();
                                jss.splice(i,1);
                            }
                        },1)
                    }
               }
            }
        },4);
    }

}
class Botany{//植物
    constructor(x,y,url) {
        this.img = new Image();
        this.img.src = url;
        this.img.style.left = x+"px";
        this.img.style.top = y+"px";
        document.querySelector("#game").append(this.img);
    }
}
class Xrk extends Botany{//向日葵
    constructor(x,y,xl) {
        super(x,y,"images/Plants/SunFlower/SunFlower1.gif");
        this.xl = xl || 3;
        this.setInt = setInterval(function () {
            new yg(x,y).classList.add("yg");
        },14000);
    }
}
class Wdss extends Botany{//豌豆射手
    constructor(x,y,xl) {
        super(x,y,"images/Plants/Peashooter/Peashooter.gif");
        this.xl = xl || 3;
        this.setInt = setInterval(function () {
            for (let i = 0;i<jss.length;i++){
                // console.log(jss[i].div.offsetTop+jss[i].fdiv.offsetTop);
                // console.log(y,y+98);
                if (jss[i].div.offsetTop+jss[i].fdiv.offsetTop>y && jss[i].div.offsetTop+jss[i].fdiv.offsetTop < y+98){
                    new Zd(x+20,y);
                }
            }
        },2000);
    }
}
class Jg extends Botany{//坚果
    constructor(x,y,xl) {
        super(x,y,"images/Plants/WallNut/WallNut.gif");
        this.xl = xl || 20;
    }
}
class Js extends Zombie{
    constructor(x,y) {
        super(10,"images/Zombies/Zombie/Zombie.gif",x,y,1);
        let a = this;
        let run = setInterval(function () {
            for (let i = 0;i<zw.length;i++){
                if (a.fdiv.offsetLeft + 50 >= zw[i].x && a.fdiv.offsetLeft+ 50 < zw[i].x+81) {
                    if (a.fdiv.offsetTop + a.div.offsetTop >= zw[i].y && a.fdiv.offsetTop + a.div.offsetTop < zw[i].y + 98) {
                        if (zw[i].isHave == 1){
                            if(a.fdiv.getAttribute("st") == "run"){
                                a.fdiv.setAttribute("st","eat");
                                a.img.src = "images/Zombies/Zombie/ZombieAttack_.gif";
                            }
                            zw[i].obj.xl-=0.1;
                            if (zw[i].obj.xl < 0){
                                clearInterval(zw[i].obj.setInt);
                                zw[i].isHave = 0;
                                zw[i].obj.img.remove();
                            }
                        }else {
                            if(a.fdiv.getAttribute("st") == "eat"){
                                a.fdiv.setAttribute("st","run");
                                a.img.src = "images/Zombies/Zombie/Zombie.gif";
                            }
                            x--;
                            a.fdiv.style.left = x+"px";
                        }
                    }
                }
            }
        },100);
    }
}
let game = new Game();
game.drop();
game.endlessMode(9000);