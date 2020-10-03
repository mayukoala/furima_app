$(function()  {
  const buildFileField =(index)=> {
    const html = `<label class="image_upload__btn" for="product_product_images_attributes_${index}_image_url">
                    <div class="btn_contents">
                      <i class="fas fa-camera fa-2x"></i>
                      <input class="file" type="file" name="product[product_images_attributes][${index}][image_url]" id="product_product_images_attributes_${index}_image_url">
                      <div class="remove_image">削除</div>
                    </div>
                  </label>`;
    return html;
  }

  let fileIndex = [1,2,3,4,5,6,7,8,9,10];

 
  $('.image_upload').on('change', '.file', function(e) {
    $('.image_upload').append(buildFileField(fileIndex[0]));
    fileIndex.shift();
    fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
  });

  $('.remove_image').on('click',  function() {
    console.log('test')
    $(this).parents('.image_upload__btn').remove();
    //if ($('.file').length == 0) $('.image_upload').append(buildFileField(fileIndex[0]));


    // checkbox check
    let index = $(this).parents('.image').data("index")
    console.log(index)
    $(`#product_product_images_attributes_${index}__destroy`).prop("checked",true)

  });

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

