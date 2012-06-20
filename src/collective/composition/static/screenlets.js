function contentSearchFilter(url) {
  var queryVal = $("#screenlet-content-search-input").val();
  $.ajax({
    url: url,
    data: {'q':queryVal},
    success: function(info) {
      $("#screenlet-content-search #item-list").html(info);
      return false;
    }
  });
  return false;
}

(function ($) {
   $.fn.liveDraggable = function (opts) {
      this.live("mouseover", function() {
         if (!$(this).data("init")) {
            $(this).data("init", true).draggable(opts);
         }
      });
      return $();
   };
}(jQuery));

$(function() {
  if($("#screenlet-content-search").length) {
    var content_name = $("#screenlet-content-search-compose-button").text()
    $("#content").append("<div id='screenlet-content-show-button'>"+content_name+"</div>");
  }
  $("#screenlet-content-search-button").click(function() {
    var dataUrl = $(this).attr("data-url");
    contentSearchFilter(dataUrl);
  });
  $( "#screenlet-content-search" ).draggable({start: function(event, ui) {
    $(this).removeClass("right");
  }});
  $( "#screenlet-content-search #item-list li" ).liveDraggable({ 
    scroll: false, 
    helper: "clone"}); 
  $(".tile").droppable({
            accept:"#screenlet-content-search #item-list li",
            hoverClass: "content-drop-hover",
      			drop: function(event, ui) {        			  
      			  var tile = $(this)
      			  var tile_type = tile.attr("data-tile-type");
      			  var tile_id = tile.attr("id");
      			  var ct_uid = ui.draggable.attr("uid")
      			  $.ajax({
                url: "@@updatetilecontent",
                data: {'tile-type':tile_type, 'tile-id':tile_id, 'uid': ct_uid},
                success: function(info) {
                  tile.html(info);
                  return false;
                }
              });
      			  }	
      			}
      		);
  $("#screenlet-content-show-button").click(function() {
    $("#screenlet-content-search").css("display", "block");  
  })
  
  $("#screenlet-content-search .close").click(function() {
    $("#screenlet-content-search").css("display", "none");
  })
});