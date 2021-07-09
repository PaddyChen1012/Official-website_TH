window.onload=function(){

    //獲取所有元素
    var list=document.querySelector('.list');
    var icos=document.querySelectorAll('.icos li');
    var li=document.querySelectorAll('.list li');
    var len=li.length; //一共幾張圖
    if (window.innerWidth>500){
        var li_width=document.querySelector('.banner').clientWidth / 5; //每張圖的寬度
    }else{
        var li_width=document.querySelector('.banner').clientWidth / 2; //每張圖的寬度
    }
    
    list.innerHTML=list.innerHTML+list.innerHTML; //在列表最後添加一份，在展示最後一張切到第一張時實際展示的是剛添加的這張
    li=document.querySelectorAll('.list li'); //重新獲取所有節點
    //為每一個li設置寬度
    for(var i=0;i<li.length;i++){
    li[i].style.width=li_width+'px';
    }
    list.style.width=li_width*li.length+"px"; //設置總寬度，讓所有圖片在一行顯示
    //給每一個按鈕綁定事件
    for(var i=0; i<icos.length; i++){
    icos[i].onmouseover=function(){ //鼠標移到小圖標上時取消自動播放並切換到指定的圖片上
    clearInterval(timeId);
    show(this.innerText);
    }
    icos[i].onmouseout=function(){ //鼠標移開時繼續自動播放
    autoplay();
    }
    }
    //通過偏移實現動畫
    function show(n){
    if(n==1){ //這個判斷順序很關鍵，必須放在上面，實現最後一張瞬間切回第一張，再轉到第二張
    list.style.marginLeft='0px';
    }
    /*
    默認出現第1張
    n=1 動畫出現第二張，第一張消失
    n=2 動畫出現第三張，第二張消失
    n=0 動畫出現第四張（第一張的覆制），第三張消失
    n=1 瞬間切回第一張（由於第一張和第四張相同，肉眼看不出變化），再動畫出現第二張，第一張消失
    */
    var w=n>0 ? -(n-1)*li_width : -(len-1)*li_width; //計算偏移量，以實現動畫效果，等於0時特殊處理，展示手動加的那一張
    var step=10; //步長可根據寬度計算得到
    var i=step;
    var timer=setInterval(function(){
    list.style.marginLeft=(w-i)+'px';
    i+=step;
    if(i>li_width){ //顯示完一張圖就停止
    clearInterval(timer);
    console.log(w);
    }
    },10);
    //改變按鈕狀態
    for(var j=0; j<icos.length; j++){
    if(n==j){
    icos[j].className='on';
    }else{
    icos[j].className='';
    }
    }
    }
    //自動播放函數
    function autoplay(){
    var count=1; //初始是第1張，自動播放從第2張開始
    timeId=setInterval(function(){
    show(count % len); //取余數實現輪流播放
    count++;
    },3000);
    }
    autoplay();
}