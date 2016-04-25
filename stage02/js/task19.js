
//简化选择器
function $(ele) {
	return document.querySelector(ele);
} 


/*正文开始*/
window.onload=function (){

	var data = [];
	var snapshots = []; //快照集合
	var timer = null; //定时
	//点击random按钮
	$("#randomNum").onclick=function () {
			$(".nodeChart").innerHTML = "";
			initData(40);
			render();
		//随机生成数字函数
		function initData(num) {
			data=[]; 
			for (var i=0;i<num;i++) {
				data.push(Math.floor(Math.random()*90+10));
			}
		}
	}

	
	//插入弹出算法
	$("#left-in").onclick = function () {
		data.unshift(getInputValue());
		render();
	}
	$("#right-in").onclick = function () {
		data.push(getInputValue());
		render();
	}
	$("#left-out").onclick = function () {
		$(".nodeChart").innerHTML = "";
		data.shift();	
		render();
	}
	$("#right-out").onclick = function () {
		$(".nodeChart").innerHTML = "";
		data.pop();
		render();
	}
	
	//可视化算法
	function render(){
		

			for (var i = 0; i < data.length; i++) {
				function styleValue () {
					return "width:10px; margin: 0 2px; height:"+(data[i]*3)+"px; border:1px solid #ccc; display:inline-block;";
				}
				var chart = document.createElement("div");
				chart.setAttribute("class","bar");
				chart.setAttribute("style",styleValue());
				$(".nodeChart").appendChild(chart);
			}
			
		
	}
	//冒泡排序
	$("#sorting").onclick = function () {
		$(".nodeChart").innerHTML=null;
		bubbleSort(data);
		timer = setInterval(paint, 15); //定时绘制
     function paint() {
         var snapshot = snapshots.shift() || [];
         if (snapshot.length !== 0) {
             render(snapshot);
         } else {
             clearInterval(timer); //绘制结束
             return;
         }
     }
	}

	function bubbleSort(arr) {
		snapshots = [];
		if (arr.length<1){
			return arr;
		}
		var temp;
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr.length-i-1; j++) {
					if (arr[j]>arr[j+1]) {	
						temp=arr[j];
						arr[j]=arr[j+1];
						arr[j+1]=temp;
						snapshots.push(JSON.parse(JSON.stringify(arr)));
					}
				
			}		
		}
		return arr;
	}


	//检查输入的合法性
	function getInputValue() {
		$(".nodeChart").innerHTML = "";
		if (data.length>60) throw new Error ("队列长度超过60");
		var inputValue = $(".input1").value;
		if (!isNumber(inputValue)) throw new Error("输入值无效！");
		inputValue = parseInt(inputValue);
		if (inputValue<10 || inputValue >100) throw new Error("输入值越界");
		return inputValue;		
	}

	function isNumber(n){
		return !isNaN(parseFloat(n)) && isFinite(n);
	}


}