<?php

if ( function_exists( 'wfLoadExtension' ) ) {
	wfLoadExtension( 'SemanticImageAnnotator' );
	// Keep i18n globals so mergeMessageFileList.php doesn't break
	$wgMessagesDirs['SemanticImageAnnotator'] = __DIR__ . '/i18n';
	//$wgExtensionMessagesFiles['SemanticAnnotatorAlias'] = __DIR__ . '/SemanticAnnotator.i18n.alias.php';
	wfWarn(
		'Deprecated PHP entry point used for Annotator extension. Please use wfLoadExtension ' .
		'instead, see https://www.mediawiki.org/wiki/Extension_registration for more details.'
	);

	return true;
} else {
	die( 'This version of the Annotator extension requires MediaWiki 1.25+' );
}
