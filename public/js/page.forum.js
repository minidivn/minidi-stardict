(function (jquery){
  var PageController = function(){
    var ctrl = this;
    this.displayTopicList = function (data){
      $('#topic-list').html("");
      $(data).each(function (row, rowText){
        var newRow = $("<li id='topic_"+rowText+"' data-topic='"+rowText+"'>")
        .text(rowText)
        .click(function (){
          ctrl.getTopicDetail($(this).data("topic"));
        });
        $('#topic-list').append(newRow);
      });
    }
    
    this.getTopicList = function (){
      $.ajax({
        url: "/api/topic/list",
        context: document.body
      }).done(function(data) {
          // console.log(data);
          ctrl.displayTopicList(data);
      });
    }
    
    this.getTopicDetail = function(topic){
      $.ajax({
        method: "GET",
        url: "/api/topic/find",
        context: document.body,
        data: {
          topic: topic
        },
        dataType: "json"
      }).done(function(data) {
          console.log(data);
          ctrl.displayTopicResult(data);
      });
      
      // $.ajax({
      //   method: "GET",
      //   url: "/api/topic/wiki",
      //   context: document.body,
      //   data: {
      //     topic: topic
      //   },
      //   dataType: "json"
      // }).done(function(data) {
      //     console.log(data);
      //     ctrl.displayTopicWikiResult(data);
      // });
    }
    
    this.displayTopicResult = function(data){
      $('#result-topic').text(data.topic);
      if (data.meaningText && data.detail) {
        $('#result-found-panel').show();
        $('#result-notfound-panel').hide();
        var main = data.detail.main;
        var categories = data.detail.categories;

        $('#result-topic-meaning').empty();
        // var preContent = $("<pre style='display:none'>")
        //       .text(main.text);
        // $('#result-topic-meaning').append(preContent);
        $(main.topicClasses).each(function(classIndex, classData){
          if (classData) {
            var newClassDiv = $("<div>");
            var titleEl = $("<div>");
            var contentEl = $("<div>");

            var listEl = $("<div>");
            $(classData.list).each(function (listIndex, listItemData){
              var itemEl = $("<div>");

              var itemSubTitleEl = $("<div>");
              itemSubTitleEl.text(listItemData.text);
              itemEl.append(itemSubTitleEl);

              var itemExamplesEl = $("<ul>");
              $(listItemData.examples).each(function (exampleIndex, exampleData){
                var itemExampleEl = $("<li>");
                itemExampleEl.append("<span class='phrase'>"+exampleData.phrase+"</span>: "+exampleData.text);
                itemExamplesEl.append(itemExampleEl);
              });
              itemEl.append(itemExamplesEl);
              listEl.append(itemEl);
            });
            contentEl.append(listEl);


            var groupsEl = $("<div>");
            $(classData.groups).each(function (groupIndex, groupData){
              var groupEl = $("<div class='topic-sub-group'>");
              var groupTitleEl = $("<div>");
              groupTitleEl.append("<b>"+groupData.title+"</b>");
              groupEl.append(groupTitleEl);

              $(groupData.list).each(function (listIndex, listItemData){
                var itemEl = $("<div>");

                var itemSubTitleEl = $("<div>");
                itemSubTitleEl.text(listItemData.text);
                itemEl.append(itemSubTitleEl);

                var itemExamplesEl = $("<ul>");
                $(listItemData.examples).each(function (exampleIndex, exampleData){
                  var itemExampleEl = $("<li>");
                  itemExampleEl.append("<span class='phrase'>"+exampleData.phrase+"</span>: "+exampleData.text);
                  itemExamplesEl.append(itemExampleEl);
                });

                itemEl.append(itemExamplesEl);
                groupEl.append(itemEl);
              });
              groupsEl.append(groupEl);
            });
            contentEl.append(groupsEl);

            titleEl.append("<u>"+classData.title+"</u>");
            newClassDiv.append(titleEl);
            newClassDiv.append(contentEl);
            $('#result-topic-meaning').append(newClassDiv);
          }
        }); 

        if (data.detail.pronunciation) {
          $("#transcription").text(data.detail.pronunciation.transcription);
        }
        
        // Other meanings
        $('#result-topic-meaning-list').empty();
        $(categories).each(function(catIndex, catData) 
        { 
          if (catData) {
            var newRow = $("<li id='text_"+catIndex+"'>");
            newRow.append("<h5>"+catData.title+"</h5>");
            // var preContent = $("<pre style='display:none'>")
            //   .text(catData.text);
            // newRow.append(preContent);
            var listEl = $("<ul>");

            $(catData.list).each(function (listIndex, listItemData){
              var itemEl = $("<li>");
              itemEl.text(listItemData);
              listEl.append(itemEl);
            });
            newRow.append(listEl);
            $('#result-topic-meaning-list').append(newRow);
          }
        });
      } else {
        $('#result-found-panel').hide();
        $('#result-notfound-panel').show();

      }
    }
  }
  
  var ctrl = new PageController();
  //START
  console.log('Forum start!');
  ctrl.getTopicList();
  
  $('#result-found-panel').hide();
  $('#btn-search').click(function(){
    ctrl.getTopicDetail($("#search-topic").val());
    });
  $("#search-topic").change(function(){
    ctrl.getTopicDetail($("#search-topic").val());
    });
  window.ctrl = ctrl;
  
})();