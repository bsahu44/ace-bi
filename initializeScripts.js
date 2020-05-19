function importScripts(envDetails){
  var fileVersion='?v=2.0';
  var urlLib = {
    'development' :{
      'icons':'http://10.52.192.30:8080/ClaimSearch/Standard/fonts/icomoon/icons.min.css',
      'styles':'http://10.52.192.30:8080/ClaimSearch/Standard/css/bi_dashboard.min.css',
      'js':'http://10.52.192.30:8080/ClaimSearch/Standard/js/bi_dash.min.js'
    },
    'test' :{
      'icons':'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Test/assets/fonts/icomoon/icons.min.css',
      'styles':'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Test/assets/css/bi_dashboard.min.css',
      'js':'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Test/assets/js/bi_dash.min.js',
      'sentimentJS' : 'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Test/assets/sentimentWidget/sentimentJS.min.js',
      'sentimentCSS' : 'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Test/assets/sentimentWidget/sentimentCSS.min.css'
    },
    'acceptance' :{
      'icons':'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Acceptance/assets/fonts/icomoon/icons.min.css',
      'styles':'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Acceptance/assets/css/bi_dashboard.min.css',
      'js':'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Acceptance/assets/js/bi_dash.min.js'
    },
    'production' :{
      'icons':'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Production/assets/fonts/icomoon/icons.min.css',
      'styles':'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Production/assets/css/bi_dashboard.min.css',
      'js':'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Production/assets/js/bi_dash.min.js',
      'ga':'https://d3mch2x00c5eox.cloudfront.net/7.11/Vader/Production/assets/ga.min.js'
    }
  };

  var urls = urlLib[envDetails.environment.toLowerCase()];
  if (!urls){
    urls=urlLib['production'];
  }
  if($("#iconsCSS").length == 0) {
    $('head').append('<link id=iconsCSS rel="stylesheet" href="'+urls.icons+fileVersion+'" type="text/css" />');
  }
  if($("#standardsCSS").length == 0) {
    $('head').append('<link id=standardsCSS rel="stylesheet" href="'+urls.styles+fileVersion+'" type="text/css" />');
  }
  if($("#standardsJS").length == 0) {
    $('body').append('<script id=standardsJS type="text/javascript" src="'+urls.js+fileVersion+'"/>');
  }
  if(($("#gaJS").length == 0) && (!!envDetails.enableGA)){
    if((envDetails.enableGA=="1") && (!!urls.ga)){
      $('head').append('<script id=gaJS type="text/javascript" src="'+urls.ga+fileVersion+'"/>');
    }
  }
  if(($("#sentimentJS").length == 0) && (!!envDetails.enableFeedback) && ($("#sentimentCSS").length == 0) && (Spotfire.isWebPlayer())) {
    if((envDetails.enableFeedback=="1") && (!!urls.sentimentJS) && (!!urls.sentimentCSS)){
      $('head').append('<script id=sentimentJS type="text/javascript" src="'+urls.sentimentJS+fileVersion+'"/>');
      $('head').append('<link id=sentimentCSS rel="stylesheet" href="'+urls.sentimentCSS+fileVersion+'" type="text/css" />');
    }
  }
}

importScripts(document.envDetails);