annotorious.plugin.MediaWiki = function(opt_config_options) {
};

annotorious.plugin.MediaWiki.prototype.initPlugin = function(anno) {

  annotorious.plugin.MediaWiki.prototype.loadAnnotationsFromLocalVar();

  //Delete Editor, if not editable
  if (!$( "#ca-edit" ).length) {
    //Delete annotator-editor 
    $( ".annotorious-editor-button-save" ).remove();
  }
  
  

  anno.addHandler('onEditorShown', function(annotation) {
    $('#SMWPlugin').remove();
    var str = "<form id='SMWPlugin'>";
    var i = 0;
    $.each( categoriesMap, function( key, value ) {
      if (i == 0) {
        str = str + '<input type="radio" name="Form" value="' + value + '" checked>' + key + '<br>';
      } else {
        str = str + '<input type="radio" name="Form" value="' + value + '">' + key + '<br>';
      }
      i++;
    });
    str = str + '</form>';
    $('.annotorious-editor form textarea').after(str);
  });



  anno.addHandler('onAnnotationCreated', function(annotation) {
    //self._create(annotation);
    annotation.id = util.randomName(6);
    annotorious.plugin.MediaWiki.prototype.annotationPageForm(annotation);

    api.getPageContent('Annotation:'+mw.config.get('wgPageName'), function (content) {
        if(content.length < 1){
            var page_content = mw.msg('sia-main-page-description')
                +' [[:'+mw.config.get('wgPageName')+']].\n\n'
                +'=='+mw.msg('sia-annotations')+'==\n'
                +'{{#ask:\n'
                +'[[Category:ImageAnnotation]]\n'
                +'[[Annotation of::{{PAGENAME}}]]\n'
                +'|?AnnotationComment\n'
                +'|?LastModificationUser\n'
                +'|?LastModificationDate\n'
                +'|?Category\n'
                +'|mainlabel=Annotation\n'
                +'|format=table\n'
                +'}}';

            api.createPage('Annotation:'+mw.config.get('wgPageName'), page_content);
        }
    })

  });
};

anno.addHandler('onAnnotationRemoved', function(annotation) {
  var postDeleteUrl = mw.config.get('wgScriptPath')+'/api.php?action=delete&title=Annotation:'
        +mw.config.get('wgPageName')+'/'+annotation.id;
//var title = 'Annotation:' + mw.config.get('wgPageName')+'/'+annotation.id;
  api.deletePage(postDeleteUrl);
//  api.deletePage(title);
});

anno.addHandler('onAnnotationUpdated', function(annotation) {
  annotorious.plugin.MediaWiki.prototype.annotationPageForm(annotation);
});

anno.addHandler('onMouseOverAnnotation', function(event) {
  if (!$( "#ca-edit" ).length) {
    $( ".annotorious-popup-buttons" ).remove();
  }
});
anno.addHandler('onEditorShown', function(annotation) {
  if (!$( "#ca-edit" ).length) {
    $(".annotorious-editor-text").attr("placeholder", 'No Rights to Create Annotations...');
    $('.annotorious-editor-text').prop('disabled', true);
  }
});


annotorious.plugin.MediaWiki.prototype.annotationPageForm = function(annotation) {
    var form = $('input[name=Form]:checked').val();
    var category_form = form.replace(/\w+:/g, '');
    var url = mw.config.get('wgScript')
        + '/Special:FormEdit/'
        + category_form
        + '/Annotation:'
        + mw.config.get('wgPageName')
        + '/' + annotation.id;

    annotorious.plugin.MediaWiki.prototype.openPopup(url, annotation);
};


annotorious.plugin.MediaWiki.prototype.openPopup = function(url, annotation) {
    $.featherlight(
        {
            iframe: url,
            iframeMaxWidth: '100%',
            iframeWidth: 800,
            iframeHeight: 400,
            // SET CONFIG HERE
            afterContent: function () {
                annotorious.plugin.MediaWiki.prototype.setPopupContent(annotation);
            },
            afterClose: function () {
                annotorious.plugin.MediaWiki.prototype.afterPopupCancel(annotation);
            }
        });
};



annotorious.plugin.MediaWiki.prototype.setPopupContent = function(annotation) {
    var iframeContent = $("iframe").contents();

    // Replace body content by only the form part
    iframeContent.find("body").html( iframeContent.find("#content") );

    // CSS adjustments
    iframeContent.find("#content").css("border", "none");
    iframeContent.find("#content").css("margin", 0);

    //Delete Table if exist
    iframeContent.find('input[name="TextAnnotation[AnnotationOf]"]').closest('table').remove();

    //Hide Content
    annotorious.plugin.MediaWiki.prototype.hideContent(iframeContent, annotation, "ImageAnnotation");


    // auto scale popup
    $("iframe").width(iframeContent.find("#content").width());
    $("iframe").height(iframeContent.find("#content").height()+75);

    // append save functionality
    iframeContent.find("#wpSave").click(function() {
        annotorious.plugin.MediaWiki.annotationSaved = true;
        $.featherlight.current().close();
    });
    iframeContent.find(".editHelp > a").click(function() {
        $.featherlight.current().close();
    });
};

annotorious.plugin.MediaWiki.prototype.hideContent = function(iframeContent, annotation, annotator) {
        var annotationOfField = iframeContent.find('input[name="' + annotator + '[AnnotationOf]"]');
        annotationOfField.val(mw.config.get('wgPageName'));
        annotationOfField.closest('tr').css('display', 'none');

        var annotationCommentField = iframeContent.find('input[name="' + annotator + '[AnnotationComment]"]');
        annotationCommentField.val(annotation.text);
        annotationCommentField.closest('tr').css('display', 'none');

        var lastModificationDateField = iframeContent.find('input[name="' + annotator + '[LastModificationDate]"]');
        lastModificationDateField.val(util.formatDate(mw.now()));
        lastModificationDateField.closest('tr').css('display', 'none');

        var lastModificationUserField = iframeContent.find('input[name="' + annotator + '[LastModificationUser]"]');
        lastModificationUserField.val('User:'+mw.user.getName());
        lastModificationUserField.closest('tr').css('display', 'none');

        var annotationMetadataField = iframeContent.find('input[name="' + annotator + '[AnnotationMetadata]"]');
        annotationMetadataField.val(util.fromJsonToEscaped(annotation));
    annotationMetadataField.closest('tr').css('display', 'none');
};


annotorious.plugin.MediaWiki.prototype.afterPopupCancel = function (annotation) {
  if(annotorious.plugin.MediaWiki.annotationSaved){
      //Speichern
      //debugger;
      annotorious.plugin.MediaWiki.annotationSaved = false;
      //
  } else {
    api.existPage('Annotation:'+mw.config.get('wgPageName')+'/'+ annotation.id, function (content) {
        if(!content){
          //Seite existiert nicht
          anno.removeAnnotation(annotation);
        }
    });
  }
};

annotorious.plugin.MediaWiki.prototype.loadAnnotationsFromLocalVar = function () {
//  debugger;
    console.info("Load existing annotations...");
  //  console.info("checking for moved annotations...");
  //  plugin.checkForMovedAnnotations(annotationsStore.annotations);
    console.info("Load annotations into annotator...");
    anno.reset();
    if(annotationsStore.annotations != null && annotationsStore.annotations.length > 0){
        var clone = $.extend(true, [], annotationsStore.annotations);
        annotationsStore.annotations.forEach(function(item) {
            anno.addAnnotation(item);
        });
    }
}

annotorious.plugin.MediaWiki.annotationSaved = false;
