$(function(){
  var dataBox = new DataTransfer();
  var file_field = document.getElementById('img-file')
  $('#append-js-edit').on('change','#img-file',function(){
    $.each(this.files, function(i, file){
      //FileReaderのreadAsDataURLで指定したFileオブジェクトを読み込む
      var fileReader = new FileReader();
      //DataTransferオブジェクトに対して、fileを追加
      dataBox.items.add(file)
      var num = $('.product-image').length + 1 + i
      var aaa = $('.product-image').length + i
// ①
      var image_id = Number($('#image-box-1').attr('class'))
      var append_div_count = Number($('div[id=1]').length) 
      var noreset_id = image_id + append_div_count

      fileReader.readAsDataURL(file);
     //画像が10枚になったら超えたらボックスを削除する
      if (num == 10){
        $('#image-box__container').css('display', 'none')
      }
      //読み込みが完了すると、srcにfileのURLを格納
      fileReader.onloadend = function() {
        var src = fileReader.result
// ②
        var html= `<div class='product-image' data-image="${file.name}" data-index="${aaa}" id="${noreset_id-1}">
                    <div class=' product-image__content'>
                      <div class='product-image__content--icon'>
                        <img src=${src} width="188" height="180" >
                      </div>
                    </div>
                    <div class='product-image__operation'>
                      <div class='product-image__operation--edit__delete__file'>削除</div>
                    </div>
                  </div>`
        const buildFileField1 = (num)=> {
// ③
          const html = `<div  class="js-file_group" data-index="${num}" id=1>
                          <input class="js-file-edit" type="file"
                          name="item[images_attributes][${append_div_count+9}][image]"
                          id="img-file" data-index="${num}value="${noreset_id}" >
                        </div>`;
          return html;
        }
        $('.js-file-edit').removeAttr('id');
        //image_box__container要素の前にhtmlを差し込む
        $('.img-label').before(html);
        $('#append-js-edit').append(buildFileField1(num));
      };
      //image-box__containerのクラスを変更し、CSSでドロップボックスの大きさを変えてやる。
      $('#image-box__container').attr('class', `product-num-${num}`)
    });
  });
  
// ④
  // 10枚登録されていた場合にボックスを消す
  $(document).ready(function(){
    var image_num = $('.product-image').length
    if (image_num==10){
      $('#image-box__container').css('display', 'none')
    }
  });
// ⑤
  $(document).ready(function(){
    $('.js-file-edit').removeAttr('id');
    var num = $('.product-image').length - 1
    var image_id = Number($('#image-box-1').attr('class'))
    var append_div_count = Number($('div[id=1]').length) 
    var noreset_id = image_id + append_div_count
    const buildFileField = (num)=> {
      const html = `<div  class="js-file_group" data-index="${num}" id=1>
                      <input class="js-file-edit" type="file"
                      name="product[images_attributes][100][image]"
                      id="img-file" data-index="${num}" value="${noreset_id}" >
                    </div>`;
      return html;
    }
    $('#append-js-edit').append(buildFileField(num));
  });
// ⑥
  $(document).on("click", '.product-image__operation--edit__delete__hidden', function(){
    //削除を押されたプレビュー要素を取得
    var target_image = $(this).parent().parent();
    //削除を押されたプレビューimageのfile名を取得
    var target_id = $(target_image).attr('id');
    var target_image_file = $('input[value="'+target_id+'"][type=hidden]');
    //プレビューを削除
    target_image.remove()
    target_image_file.remove()
    //image-box__containerクラスをもつdivタグのクラスを削除のたびに変更
    var num = $('.product-image').length
    $('#image-box__container').show()
    $('#image-box__container').attr('class', `product-num-${num}`)
  })
// ⑦
  $(document).on("click", '.product-image__operation--edit__delete__file', function(){
    //削除を押されたプレビュー要素を取得
    var target_image = $(this).parent().parent();
    var target_id = Number($(target_image).attr('id'));
    //削除を押されたプレビューimageのfile名を取得
    var target_image_file = $('#append-js-edit').children('div').children('input[value="'+target_id+'"][type=file]');
    //プレビューを削除
    target_image.remove()
    target_image_file.remove()
      // フォームに割り振られた固有のインデックスを取得。
      const targetIndex = $(this).parent().data('index')
      // 取得したインデックスに対応するチェックボックスを取得。
      const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden`);
      // チェックボックスが存在する場合チェックを入れる。
      if (hiddenCheck) hiddenCheck.prop('checked', true);
    //image-box__containerクラスをもつdivタグのクラスを削除のたびに変更
    var num = $('.product-image').length
    $('#image-box__container').show()
    $('#image-box__container').attr('class', `product-num-${num}`)
  })
  // 価格入力時に手数料、利益計算
 
})
