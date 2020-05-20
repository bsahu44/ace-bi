/* Utility function to detect the end of resize events*/
$(window).resize(function() {
        if(this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 500);
});
function updateTextBoxProp(elemId,value){
	$("#"+elemId+" input").val(value);
	$("#"+elemId+" input").focus();
	$("#"+elemId+" input").blur();
}
/* 7.11 JQuery List Box Fix */
function fixListBoxFilters(element){
	element.find('.sf-list-box-container').parent().each(function() {
		var settings={ CheckBoxMode: $(this).hasClass("sfc-listcheckbox-filter") }
		Spotfire.Filters.ListBoxFilter.update(this.id,settings,Number.MAX_SAFE_INTEGER)
	});
}
/*JQuery Drop Down Fix */
function fixPropertyControls(){
	updateTextBoxProp("randomNumber",Math.floor(Math.random() * 100));
}

/*Elemetns that need to be resized when window is resized*/
function resizeElements(){
	var newHeight = $(".sfc-text-area.sfpc-first-row.sfpc-first-column")[0].clientHeight - 40;
	$("#CustomStyleSidePanel").html("#slideoutFilter,#slideoutContent { height: "+newHeight+"px !important; }");
}
/* Binding resizeElements() to resizeEnd trigger*/
$(window).bind('resizeEnd', resizeElements);

$(document).ready(function(){
		var rootTextArea = $(".bi-toolbar").parents(".StyledScrollbar");
		rootTextArea.find(".sf-element-scroll-bar").css("display","none");
		if($("#CustomStyleSidePanel").length == 0) {
			var newHeight = $(".sfc-text-area.sfpc-first-row.sfpc-first-column")[0].clientHeight - 40;
			$("head").append("<style id=CustomStyleSidePanel> #slideoutFilter,#slideoutContent { height: "+newHeight+"px !important; } </style>")
		}
});

$("body").on("click", ".bi-toolbar-item-action", function() {
	var id = this.id;
	$("#slideoutLabel").html(id.substring(6));
	$("#"+id+"Content").detach().appendTo('#slideoutContent');
	/* 7.11 JQuery Fix */
	if ($("#slideoutContent .bi-slideout-accordion-item-selected .has-list-box-filter").length > 0){
		fixListBoxFilters($(".bi-slideout-accordion-item-content-selected"));
	}
	if ($("#slideoutContent .bi-slideout-accordion-item-selected .has-list-box-property").length > 0){
		fixPropertyControls();
	}
  $('.bi-slideout').css({"top": "50%", "height": "50%"});
	$("#slideoutFilter").toggleClass("bi-slideout-hide");
	$("#slideoutHeader").toggleClass("bi-slideout-header-hide");
	$("#slideoutContent").toggleClass("bi-slideout-content-hide");
	if ($("#slideoutContent .bi-slideout-filter-dropdown").length > 0){
		fixPropertyControls();
	}
});

$("body").on("click", "#slideoutClose", function() {
  $('.bi-slideout').css({"top": "0px", "height": "inherit"});
	$("#slideoutFilter").toggleClass("bi-slideout-hide");
	$("#slideoutHeader").toggleClass("bi-slideout-header-hide");
	$("#slideoutContent").toggleClass("bi-slideout-content-hide");
	$("#slideoutContent").children("div").eq(0).detach().appendTo('.bi-slideout-hidden-elements');
});

$("body").on("click", ".action-button", function() {
	var id=this.id;
	$("#"+id+"Button input").click();
});

$("body").on("click", "#showBookmarks", function() {
	$("#showBookmarks").toggleClass("bi-toolbar-item-selected",$(".sf-element-panel-header .sf-element-text-box:contains('Bookmarks')").length==0);
});

$("body").on("click", ".bi-slideout-accordion-item-header", function() {
	var rootElement = $(this).parent();
	var hiddenElement = rootElement.find(".bi-slideout-accordion-item-content");
	/* 7.11 JQuery Fix */
	if(!hiddenElement.hasClass("bi-slideout-accordion-item-content-selected")){
		if ($(this).hasClass("has-list-box-filter")){
			fixListBoxFilters(hiddenElement);
		}
		if ($(this).hasClass("has-list-box-property")){
			fixPropertyControls();
		}
	}
	rootElement.toggleClass("bi-slideout-accordion-item-selected");
	hiddenElement.toggleClass("bi-slideout-accordion-item-content-selected");
	$(this).find("#accordionArrow").toggleClass("icon-ic_arrow_drop_up_48px icon-ic_arrow_drop_down_48px");
});




/*Helper References
/*JQuery Drop Down Fix */
/*$("body").on("click",".sf-element-dropdown-list-item",function(){
	element =  $(".sf-element-dropdown-list-item").parents(".bi-slideout-filter-dropdown-content").find('.bi-slideout-filter-dropdown-index');
	updateTextBoxProp(element,$(this).index());
});
JQuery Drop Down Fix
element.find('.sf-element-dropdown').parent().each(function() {
	 var id = this.id;
	 var value = document.dropdownIndices[id];
		Spotfire.PropertyControls.DropDown.update(id,!value?0:value);
	});
$("#setProperties").click();
*/
