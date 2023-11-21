class Core{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.mMap = Array.from(Array(x),()=>new Array(y).fill(0));
    }

    Print() {
        for(let i = 0;i < this.mMap.length;i++){
            console.log(this.mMap[i]);
        }
    }

    // ClearZero(arr){
    //     let index = arr.length-1;
    //     let newarr = [0,0,0,0];
    //     for(let i = arr.length-1;i >= 0; i--){
    //         if(arr[i] != 0){
    //             newarr[index--] = arr[i]
    //         }
    //         console.log("123");
    //     }
    //     return newarr;
    // }
    ClearZero(arr){
        let index = 0;
        let newarr = new Array(this.y).fill(0);
        for(let i = 0;i < arr.length; i++){
            if(arr[i] != 0){
                newarr[index++] = arr[i];
            }
        }
        return newarr;
    }
    ClearZeroRight(arr){
        let index = this.y-1;
        let newarr = new Array(this.y).fill(0);
        for(let i = 0;i < arr.length; i++){
            if(arr[i] != 0){
                newarr[index--] = arr[i];
            }
        }
        return newarr;
    }
    merge(arr){
        let firstarr = this.ClearZero(arr);
        for(let i = 0;i < firstarr.length-1;i++){
            if(firstarr[i] != 0 && firstarr[i] == firstarr[i+1]){
                firstarr[i] = firstarr[i]*2;
                firstarr[i+1] = 0;
            }
        }
        return this.ClearZero(firstarr);
    }
    randNum(){
        let x = parseInt(Math.random()*this.x);
        let y = parseInt(Math.random()*this.y);
        if(this.mMap[x][y] == 0 ){
            if(parseInt(Math.random()*10) == 0){
                this.mMap[x][y] = 4
            }
            else{
                this.mMap[x][y] = 2;
            }
            return;
        }
        else if(this.isGameover()){
            return;
        }
        else if(this.isFull()){
            return;
        }
        else{
            this.randNum();
        }
    }
    isFull(){
        for(let i = 0;i < this.mMap.length;i++){
            for(let x = 0; x < this.mMap[0].length;x++){
                if(this.mMap[i][x] == 0){
                    return false;
                }
            }
        }
        return true;
    }
    isGameover(){
        for(let i = 0;i < this.mMap.length;i++){
            for(let x = 0; x < this.mMap[0].length;x++){
                if(this.mMap[i][x] == 0){
                    return false;
                }else if(x < this.mMap[0].length-1 && this.mMap[i][x] == this.mMap[i][x+1]) {
                    return false;
                }else if(i < this.mMap.length - 1 && this.mMap[i][x] == this.mMap[i+1][x]){
                    return false;
                }
            }
        }
        return true;
    }
    isGameWin(){
        for(let i = 0;i < this.mMap.length;i++){
            for(let x = 0; x < this.mMap[0].length;x++){
                if(this.mMap[i][x] == 32) {
                    return true;
                }
            }
        }
        return false;
    }
    moveUp(){
        let ls = [];
        for(let i = 0;i < this.mMap[0].length;i++){
            for(let x = 0;x < this.mMap.length;x++){
                ls.push(this.mMap[x][i]);
            }
            let lsls = this.merge(ls);
            ls = [];
            for(let x = 0;x < this.mMap.length;x++){
                this.mMap[x][i] = lsls[x];
            }  
        }
    }
    moveDown(){//
        let ls = [];
        for(let i = 0;i < this.mMap[0].length;i++){
            for(let x = this.mMap.length - 1;x >= 0;x--){
                ls.push(this.mMap[x][i]);
            }
            let lsls = this.ClearZeroRight(this.merge(ls));
            ls = [];
            for(let x = 0;x < this.mMap.length;x++){
                this.mMap[x][i] = lsls[x];
            }  
        }
    }
    moveLeft(){
        for(let i = 0;i < this.mMap.length;i++){
            this.mMap[i] = this.merge(this.mMap[i]);
        }
    }
    moveRight(){
        let ls = [];
        for(let i = 0;i < this.mMap.length;i++){
            for (let x = this.mMap[0].length - 1;x>=0;x--){
                ls.push(this.mMap[i][x]);
            }
            this.mMap[i] = this.ClearZeroRight(this.merge(ls));
            ls = [];
        }
    }

 }
