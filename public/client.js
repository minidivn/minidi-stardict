(function (jquery){
  var PageController = function(){
    var ctrl = this;
    this.updateWordList = function (data){
      $('#word-list').html("");
      $(data).each(function (row, rowText){
        var newRow = $("<li id='word_"+rowText+"' data-word='"+rowText+"'>")
        .text(rowText)
        .click(function (){
          ctrl.findWord($(this).data("word"));
        });
        $('#word-list').append(newRow);
      });
    }
    
    this.refreshWordList = function (){
      $.ajax({
        url: "/api/word/list",
        context: document.body
      }).done(function(data) {
          console.log(data);
          ctrl.updateWordList(data);
      });
    }
    
    this.findWord = function(word){
      $.ajax({
        method: "GET",
        url: "/api/word/find",
        context: document.body,
        data: {
          word: word
        },
        dataType: "json"
      }).done(function(data) {
          console.log(data);
          ctrl.displayWordResult(data);
      });
      
      $.ajax({
        method: "GET",
        url: "/api/word/wiki",
        context: document.body,
        data: {
          word: word
        },
        dataType: "json"
      }).done(function(data) {
          console.log(data);
          ctrl.displayWordWikiResult(data);
      });
    }
    
    this.displayWordResult = function(data){
      $('#result-word').text(data.word);
      if (data.meaningText && data.detail) {
        $('#result-found-panel').show();
        $('#result-notfound-panel').hide();
        var main = data.detail.main;
        var categories = data.detail.categories;

        $('#result-word-meaning').empty();
        var preContent = $("<pre>")
              .text(main.text);
        $('#result-word-meaning').append(preContent);
        if (data.detail.pronunciation) {
          $("#transcription").text(data.detail.pronunciation.transcription);
        }
        
        // Other meanings
        $('#result-word-meaning-list').empty();
        $(categories).each(function(catIndex, data) 
        { 
          if (data) {
            var newRow = $("<li id='text_"+catIndex+"'>");
            newRow.append("<h5>"+data.title+"</h5>");
            var preContent = $("<pre>")
              .text(data.text);
            newRow.append(preContent);
            $('#result-word-meaning-list').append(newRow);
          }
        });
      } else {
        $('#result-found-panel').hide();
        $('#result-notfound-panel').show();

      }
    }
    
    this.displayWordWikiResult = function(data){
      $('#result-wiki div').html(data);
    }
  }
  
  var ctrl = new PageController();
  //START
  ctrl.refreshWordList();
  
  $('#result-found-panel').hide();
  $('#btn-search').click(function(){
    ctrl.findWord($("#search-word").val());
    });
  $("#search-word").change(function(){
    ctrl.findWord($("#search-word").val());
    });
  window.ctrl = ctrl;
  
})();