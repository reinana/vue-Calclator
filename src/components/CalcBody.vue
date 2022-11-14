<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div class="calc-body d-flex flex-column p-5">
            <h1 class="title px-1">{{ msg }}</h1>
            <div class="d-flex">
                <div class="result">{{showNum | trimNum}}</div>
                <div class="drop clear-all">
                    <button class="" v-on:click="clearAll">C</button>
                </div>
            </div>
            <div class="d-flex" v-for="(btns) in buttons" :key="btns[0]">
                <div class="drop" v-for="btn in btns" :key="btn">
                    <button type="button" class="" @click="selectBtn(btn)">{{ btn }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
	

<script>

export default {
    name: "CalcBody",
    props: {
        msg: String,
    },
    data() {
        return {
            buttons: [
                ["7", "8", "9", "÷"],
                ["6", "5", "4", "×"],
                ["3", "2", "1", "-"],
                ["0", ".", "=", "+"],
            ],
            currentNum: '0',
            currentOpe: '',
            numArr: [], //数字の配列
            opeArr: [], //演算子の配列
            isInsertNum: true, //数字を入力中
            isResult: false, //＝後

        };
    },
    filters: {
        trimNum: function(val) {
 
            return String(val).substring(0,14);
        }
    },
    computed: {
        // 画面表示 数字入力中ならcurrentNum 演算子、= 押下後なら numArr[0]
        showNum: function() {
            let result = 0;
            if(this.isInsertNum) {
                result = this.currentNum;
            }
            else {
                console.log("isResult")
                result = this.numArr[0]
            }
            return result;
        }
    },
    methods: {
        // 数値かどうか判定
        isNumber(value) {
            return Number.isFinite(parseInt(value));
        },
        // Cを押した時
        clearAll() {
            console.log("clearAll")
            this.currentNum = "",
            this.currentOpe = "",
            this.numArr = [];
            this.opeArr = [];
            this.isInsertNum = true;
            this.isResult = false;
        },
        // 受け取った引数によって関数を呼びわける
        selectBtn(btn) {
            // 数値を受け取った時
            if(this.isNumber(btn)) {
                // =押下後ならいったん初期化
                if(this.isResult) {
                    this.currentNum = '';
                    this.numArr = [];
                }
                // 数字がきたらisResultをfalseに戻す
                this.isResult = false; 

                // 二桁対応 数字入力中でなかったらcurrentNumを初期化
                if(!this.isInsertNum) {
                    this.currentNum = '';
                    this.isInsertNum = true;
                }

                // 数字が入力されたら入力中をtrue
                this.isInsertNum = true; 
                
                if(this.numArr.length == 1) {
                    if(this.currentOpe !== '')this.opeArr.push(this.currentOpe); // 2個目の数字が入ったらopeをpush
                    this.currentOpe = '';
                }

                // 0のときは置き換え、それ以外なら追加
                if(this.currentNum == "0") {
                    this.currentNum = btn;
                }
                else {
                    this.currentNum += btn;
                }
            }
            else if(btn == ".") {
                this.currentNum += btn;
            }
            else if(btn == "=") {
                this.isResult = true;
                this.isInsertNum = false;
                this.numArr.push(this.currentNum);
                this.currentNum = '';
                this.currentOpe = '';
                if(this.numArr.length >= 2) this.total();
            }
            else {
                if(!this.isResult)this.numArr.push(this.currentNum);
                this.isInsertNum = false;
                this.currentOpe = btn; //pushしてないので演算子押すたび変わる
                if(this.numArr.length >= 2) this.total();
                this.isResult = false;

            }
        },
        // =を押した時 または 要素が2個になったとき
        total() {

            let res = 0;
            const BigNumber = require('bignumber.js');
            let op1 = new BigNumber(this.numArr.pop());
            let op2 = new BigNumber(this.numArr.pop());
            let ope = this.opeArr.pop();    

            if(ope == '+') res = op1.plus(op2).toNumber();
            else if(ope == '-') res = op2.minus(op1).toNumber();
            else if(ope == '×') res = op1.times(op2).toNumber();
            else if(ope == '÷') {
                if(op1 != 0) res = op2.dividedBy(op1).toNumber();
                else alert("0では割れません")
            }
            // this.currentNum = res;
            this.numArr.unshift(res);
            return;
        },




    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    width: 100%;
    font-size: 3rem;
    letter-spacing: 0.5rem;
    background-image: linear-gradient(
        70deg,
        rgb(211, 209, 209, 0.1)  30%, 
        #fff 50%,
        rgb(211, 209, 209, 0.1) 70% 
    );
    background-size: 500% 100%;
    background-clip: text; /*背景を文字で切り取る*/
    color: transparent;
    animation: shine 10s infinite;
}

@keyframes shine {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

button {
    color: gray;
    border: none;
    background: transparent;
    width: 100%;
    height: 100%;
}
.result {
    width: 16rem;
    margin: 1rem;
    padding: 0.4rem;
    color: rgba(255, 255, 255, 0.9);
    font-size: 2rem;
    text-shadow: 
        0px 0px 2px rgba(0, 0, 0, 0.5) ,
        0px 0px 4px rgba(255, 255, 255, 1);
    text-align: right;
    border: 2px solid rgba(0,0,0,0.5);
    background: linear-gradient(to bottom right,#c0ddf0, #092c5b);
    box-shadow: 
		inset 0 0 20px rgba(122, 141, 153, 1);
}

/* 背景色 */
.container {
    width: 100%;
    height: 100vh;
    margin: auto;
    background: #b2d9fc;
}
.calc-body {
    width: 30rem;
    height: 40rem;
    border-right: 5px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05),
    15px 25px 10px rgba(0, 0, 0, 0.05), 15px 20px 20px rgba(0, 0, 0, 0.05),
    inset -10px -10px 15px rgba(255, 255, 255, 0.9);
    position: relative;
    border-radius: 30px;
}
.calc-body::before {
    content: "";
    position: absolute;
    top: 1.2rem;
    left: 1.8rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #fff;
    opacity: .8;
}
.calc-body::after {
    content: "";
    position: absolute;
    top: 1.8rem;
    left: 0.8rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #fff;
    opacity: .8;
}
.drop {
  position: relative;
  width: 5rem;
  height: 5rem;
  margin: 0.5rem;
  box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05),
    15px 25px 10px rgba(0, 0, 0, 0.05), 15px 20px 20px rgba(0, 0, 0, 0.05),
    inset -10px -10px 15px rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .3s ease;
  font-size: 2rem;
}


.drop::before {
  content: "";
  position: absolute;
  top: 0.8rem;
  left: 1.3rem;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background: #fff;
  opacity: .8;
}

.drop::after {
    content: "";
    position: absolute;
    top: 1.3rem;
    left: 0.8rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #fff;
    opacity: .8;
}


.drop:hover {
    background-color: rgba(255, 255, 255, 0.5);
}
.drop:active {
    background-color: rgb(1, 92, 183);
    animation: puru 1s;
}

@keyframes puru {
	0% {	transform: translate(0, 0);}
	5% {	transform: translate(-5px, -0);}
	10% {	transform: translate(5px, 0);}
	15% {	transform: translate(-5px, -0);}
	20% {	transform: translate(5px, 0);}
	25% {	transform: translate(-5px, -0);}
	30% {	transform: translate(0, 0);}
	100% {	transform: translate(0, 0);}
}
.clear-all:hover {
    animation: explosion 5s;
}
@keyframes explosion {
    0% {
        transform: scale(1, 1);
    }
    25% {
        transform: scale(1.2, 1.2);
    }
    50% {
        transform: scale(1.5, 1.5);
    }
    75% {
        transform: scale(1.8, 1.8);
    }
    100% {
        transform: scale(2, 2);
        background-color: red;
    }
}

</style>
