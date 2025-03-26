window.onload = function() {
    /*$('#loading').delay('1000').fadeOut();*/
    $('#loading').fadeOut();
}

function openNav() {
    document.getElementById('mysidenav').style.left = '0px';
}
function closeNav() {
    document.getElementById('mysidenav').style.left = '-350px';
}

function openC() {
    document.getElementById('mycart').style.right = '0px';
}
function closeC() {
    document.getElementById('mycart').style.right = '-400px';
}

$('#loginbt').click(function(){
    alert('로그인 되셨습니다.');
})

$('#ptbt').click(function(){
    alert('감사합니다. 가입되셨습니다.');
})

$('#remove').click(function(){
    document.getElementById('cart').style.opacity = '0%';
})

function count(type)  {
    // 결과를 표시할 element
    const resultElement = document.getElementById('result');
    
    // 현재 화면에 표시된 값
    let number = resultElement.innerText;
    
    // 더하기/빼기
    if(type === 'plus') {
      number = parseInt(number) + 1;
    }else if(type === 'minus')  {
      number = parseInt(number) - 1;
    }
    if(number<0){
        number=0;
    }
    
    // 결과 출력
    resultElement.innerText = number;
}