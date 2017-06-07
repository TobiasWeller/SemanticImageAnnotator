/**
 * Annotator Extension Module Script
 * Author: DominikMartin, BenjaminHosenfeld
 */

( function () {
	var url = mw.config.get('wgScriptPath')
		+'/api.php?action=ask&query='
		+'[[Category:ImageAnnotation]]'
		+'[[Annotation of::'+mw.config.get('wgPageName')+']]'
		+'|?AnnotationComment|?AnnotationMetadata&format=json';
	$.getJSON(url, function(json) {
		var annotations = util.parseAskApiCall(json);
		annotationsStore.init(annotations);
	})
		.done(function() {
			/* start annotator if loading successfully */
			console.log("loading annotations completed");

			api.getAllCategoryPageForms(function(results) {
				categories = new Object();
				Object.keys(results).forEach(function(prop) {
					categoriesMap[results[prop].printouts['SA Category Name'][0]] = results[prop].fulltext.split('#')[0];
					categories[results[prop].printouts['SA Category Name'][0]] = 'annotator-hl-'+results[prop].printouts['SA Category Color'][0];
				});
				initAnnotator();
			});
		})
		.fail(function() {
			console.log("loading annotations error");
		})
}() );

function initAnnotator(){
		var k = $('.fullImageLink a img');
		$('.fullImageLink').empty();
		$('.fullImageLink').append(k);
		$('.fullImageLink img').addClass('annotatable');
		$('.annotator-loading').hide();
		anno.addPlugin('FancyBoxSelector', { activate: true });
		anno.addPlugin('MediaWiki', { activate: true });

		anno.makeAnnotatable($('.fullImageLink img'));
}

var categoriesMap = new Object();
var categories;
