$(function()  {
  $(document).on("click", ".image_upload", function () {
    //$liに追加するためのプレビュー画面のHTML
    var preview = $(
      `<div class="image-preview__wapper"><img class="preview"></div><div class="image-preview_btn"><div class="image-preview_btn_delete">削除</div></div>`
    );
    //次の画像を読み込むためのinput。処理の最後にappendで追加する。
    var append_input = $(
      `<li class="input">
      <label class="upload-label">
      <div class="btn_contents">
      <i class="fas fa-camera fa-2x"></i>
      <div class="input-area">
      <input class="hidden image_upload" type="file">
      </div>
      </div>
      </div>
      </label>
      </li>`
    );
    $ul = $("#previews");
    $li = $(this).parents("li");
    $label = $(this).parents(".upload-label");
    $inputs = $ul.find(".image_upload");
    //inputに画像を読み込んだら、"プレビューの追加"と"新しいli追加"処理が動く
    $(".image_upload").on("change", function (e) {
      //inputで選択した画像を読み込む
      var reader = new FileReader();

      // プレビューに追加させるために、inputから画像ファイルを読み込む。
      reader.readAsDataURL(e.target.files[0]);

      //画像ファイルが読み込んだら、処理が実行される。
      reader.onload = function (e) {
        //previewをappendで追加する前に、プレビューできるようにinputで選択した画像を<img>に'src'で付与させる
        $(preview).find(".preview").attr("src", e.target.result);
      };

      //inputの画像を付与した,previewを$liに追加。
      $li.append(preview);

      //プレビュー完了後は、inputを非表示にさせる。これによりプレビューだけが残る。
      $label.css("display", "none");
      $li.removeClass("input");
      $li.addClass("image-preview");
      $lis = $ul.find(".image-preview");

      $("#previews li").css({
        width: `114px`,
      });
      //"ul"に新しい"li(inputボタン)"を追加させる。
      if ($lis.length <= 4) {
        $ul.append(append_input);
        $("#previews li:last-child").css({
          width: `calc(100% - (120px * ${$lis.length}))`,
        });
      } else if ($lis.length == 5) {
        $li.addClass("image-preview");
        $ul.append(append_input);
        $("#previews li:last-child").css({
          width: `100%`,
        });
      } else if ($lis.length <= 9) {
        $li.addClass("image-preview");
        $ul.append(append_input);
        $("#previews li:last-child").css({
          width: `calc(100% - (20% * (${$lis.length} - 5 )))`,
        });
      }

      //inputの最後の"data-image"を取得して、input nameの番号を更新させてる。
      $inputs.each(function (num, input) {
        //nameの番号を更新するために、現在の番号を除去
        $(input).removeAttr("name");
        $(input).attr({
          name: "product[images_attributes][" + num + "][name]",
          id: "product_images_attributes_" + num + "_name",
        });
      });
    });
  });

    //削除ボタンをクリックしたとき、処理が動く。
  $(document).on('click','.image-preview_btn_delete',function(){
    var append_input = $(`<li class="input"><label class="upload-label"><div class="upload-label__text">ドラッグアンドドロップ<br>またはクリックしてファイルをアップロード<div class="input-area"><input class="hidden image_upload" type="file"></div></div></label></li>`)
    $ul = $('#previews')
    $lis = $ul.find('.image-preview');
    $input = $ul.find('.input');
    $ul = $('#previews')
    $li = $(this).parents('.image-preview');


    //"li"ごと削除して、previewとinputを削除させる。
    $li.remove();

    // inputボタンのサイズを更新する、または追加させる
    // まずはプレビューの数を数える。
    $lis = $ul.find('.image-preview');
    $label = $ul.find('.input');
    if($lis.length <= 4 ){
      // inputのサイズを変更
      $('#previews li:last-child').css({
        'width': `calc(100% - (20% * ${$lis.length}))`
      })
    }
    else if($lis.length == 5 ){
      // inputのサイズを変更
      $('#previews li:last-child').css({
        'width': `100%`
      })
    }
    else if($lis.length < 9 ){
      // inputのサイズを変更
      $('#previews li:last-child').css({
        'width': `calc(100% - (20% * (${$lis.length} - 5 )))`
      })
    }
    else if($lis.length == 9 ){
      $ul.append(append_input) // 9個の時だけ、新しいinputを追加してやる
      $('#previews li:last-child').css({
        'width': `calc(100% - (20% * (${$lis.length} - 5 )))`
      })
    }
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

