$.get("/spotfire/rest/pub/headerConfig", function(config) { document.SWUser=config.currentUser.displayName; });
function addWidget(){
  if(($("#feedbackProperty").length != 0)) {
    if($("#toggleFeedback").length == 0){
        $("#toggleHelp").before('<div class="bi-toolbar-item bi-toolbar-item-action" id="toggleFeedback"><div class="bi-toolbar-item-ico icon-cs-thumbsup"></div><div class="bi-toolbar-item-label">Feedback</div></div>');
    }
    if($("#toggleFeedbackContent").length == 0){
      $(".bi-slideout-hidden-elements").append('<div id="toggleFeedbackContent"><div class="feedback-header-label">What do you think of this dashboard?</div><div class="feedback-content"><table class="feedback-reaction"><tbody><tr><td></td><td><span id="likeReaction" class="feedback-icon icon-cs-thumbsup"></span></td><td><span id="dislikeReaction" class="feedback-icon icon-cs-thumbsdown"></span></td><td></td></tr></tbody></table><div class="feedback-text feedback-hidden"><br><textarea id="feedbackComment" rows="6"></textarea> <br><br> <input id="feedbackSubmit" type="Submit" value="Send!"></div><div id="feedbackSubmitted" class="feedback-done feedback-hidden"> Thank you! </div></div></div>');
    }
  }
}

function waitFor(condition,timeout,callback,error) {
	var start_time = Date.now();
    if(condition()) {
      callback();
    } else if (Date.now() <= (start_time + timeout)) {
      setTimeout(waitFor.bind(null, condition,timeout, callback,error), 100);
    } else {
      error();
	  }
}

function getTabName(){
  var tab = $(".sfpc-active[tabindex][title]")[0].title;
  if(!tab){
    return "Unknown"
  }else{
    return tab
  }
}

function getReaction(){
  var reaction = $(".feedback-icon.feedback-icon-selected")[0].id;
  if (!reaction){
    return "Unknown"
  }else if(reaction == "likeReaction"){
    return "Y"
  }else {
    return "N"
  }
}

$(document).ready(function(){
  waitFor(
    Spotfire.WebAnalysis.isReady,
    600000,addWidget,addWidget
  );
});

$("body").on("click","div[tabindex][title]",function(){
  waitFor(
    Spotfire.WebAnalysis.isReady,
    600000,addWidget,addWidget
  );
});


$("body").on("click",".feedback-icon",function(){
  var otherId = $(".feedback-icon:not(#"+this.id+")")[0].id;
  $("#"+otherId).removeClass("feedback-icon-selected");
	$(this).toggleClass("feedback-icon-selected");
  if ($(".feedback-icon-selected").length > 0){
    $("#"+otherId).addClass("feedback-icon-not-selected");
    $(this).removeClass("feedback-icon-not-selected");
    $(".feedback-text").removeClass("feedback-hidden");
  }else{
    $(".feedback-icon").removeClass("feedback-icon-not-selected");
    $(".feedback-text").addClass("feedback-hidden");
  }
});

$("body").on("click","#feedbackSubmit",function(){
	var result = {
      user: !!document.SWUser ? document.SWUser : "Unknown",
      dashboard: document.envDetails.dashboardName,
      page: getTabName(),
			reaction : getReaction(),
			comment : $("#feedbackComment")[0].value,
			server : window.location.hostname
		};
	$("#feedbackProperty input").val(JSON.stringify(result));
	$("#feedbackProperty input").focus();
	$("#feedbackProperty input").blur();
	$("#feedbackComment")[0].value="";
  $(".feedback-text").addClass("feedback-hidden");
  $(".feedback-reaction").addClass("feedback-hidden");
  $("#feedbackSubmitted").removeClass("feedback-hidden");
});