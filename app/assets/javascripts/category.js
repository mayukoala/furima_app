$(function(){
  $(function(){
  // カテゴリーボックスのオプションを作成
  function appendOption(category){
    var html = `<option value="${category.id}">${category.name}</option>`;
    return html;
  }
  // 子カテゴリーの表示作成
  function appendChidrenBox(insertHTML){
    var childHtml = '';
    childHtml = `<div class="category__child" id="children_wrapper">
                  <select id="child__category" name="product[category_id]">
                    <option value="">---</option>
                    ${insertHTML}
                  </select>
                </div>`;
    $('.append__category').append(childHtml);
  }

  // 孫カテゴリーの表示作成
  function appendGrandchidrenBox(insertHTML){
    var grandchildHtml = '';
    grandchildHtml = `<div class="category__child" id="grandchildren_wrapper">
                        <select id="grandchild__category" name="product[category_id]">
                          <option value="">---</option>
                          ${insertHTML}
                          </select>
                      </div>`;
    $('.append__category').append(grandchildHtml);
  }

  // 親カテゴリー選択後のイベント
  $('#parent__category').on('change', function(){

    // 親ボックスのidを取得してAjax通信でコントローラーへ送る
    var parent__category_id = document.getElementById('parent__category').value;
    if (parent__category_id != ""){
      $.ajax({
        url: '/products/get_category_children',
        type: 'GET',
        data: { parent_id: parent__category_id },
        dataType: 'json'
      })
      // 親が変更された時、子以下を削除する
      .done(function(children){
        $('#children_wrapper').remove();
        $('#grandchildren_wrapper').remove();
        var insertHTML = '';
        children.forEach(function(child){
          insertHTML += appendOption(child);
        });
        appendChidrenBox(insertHTML);
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      // 親カテゴリーが初期値になった時、子以下を削除する
      $('#children_wrapper').remove();
      $('#grandchildren_wrapper').remove();
    }
  });

  // 子カテゴリー選択後のイベント
  $('.append__category').on('change', '#child__category', function(){
    var child__category_id = document.getElementById('child__category').value;
    if (child__category_id != ""){
      $.ajax({
        url: '/products/get_category_grandchildren',
        type: 'GET',
        data: { child_id: child__category_id },
        dataType: 'json'
      })
      .done(function(grandchildren){
        $('#grandchildren_wrapper').remove();
        var insertHTML = '';
        grandchildren.forEach(function(grandchild){
          insertHTML += appendOption(grandchild);
        });
        appendGrandchidrenBox(insertHTML);
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#grandchildren_wrapper').remove();
    }
  });
});
})