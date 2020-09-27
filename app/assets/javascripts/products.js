$(function()  {
  

  // 価格入力時に手数料、利益計算
  $('.input_style-price').on('keyup', function(){
    let input = $(this).val();
    if (input >= 300 && input <= 9999999){
      let fee = Math.floor(input * 0.1);
      let profit = "¥" +(input - fee).toLocaleString();
      $('.tax-yen').html("¥" + fee.toLocaleString());
      $('.result').html(profit);
    } else {
      let fee = '-';
      let profit = '-';
      $('.tax-yen').html(fee);
      $('.result').html(profit);
    }
  });
});

