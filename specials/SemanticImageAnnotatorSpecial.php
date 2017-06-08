<?php
/**
 * SpecialPage for SemanticImageAnnotator extension
 *
 * @file
 * @ingroup Extensions
 */

class SemanticImageAnnotatorSpecial extends SpecialPage {
	public function __construct() {
		parent::__construct( 'SemanticImageAnnotator', 'editinterface' ); //restrict to sysops
	}

    /**
     * Override the parent to set where the special page appears on Special:SpecialPages
     * 'other' is the default. If that's what you want, you do not need to override.
     * Specify 'media' to use the <code>specialpages-group-media</code> system interface message, which translates to 'Media reports and uploads' in English;
     * 
     * @return string
     */
    function getGroupName() {
        return 'annotation';
    }


	/**
	 * Show the page to the user
	 *
	 * @param string $sub The subpage string argument (if any).
	 *  [[Special:HelloWorld/subpage]].
	 */
	public function execute( $sub ) {

		$out = $this->getOutput();

		$out->setPageTitle( $this->msg( 'sia-special-title' ) );

		$out->addWikiMsg( 'sia-special-intro' );

        $installForm = HTMLForm::factory( 'ooui', [], $this->getContext(), 'install-form' );

        if( !self::pageExists( 'Form:ImageAnnotation' ) )
        {
            $out->addWikiText( '== '.$this->msg( 'sia-install' ).' ==' );
            $out->addWikiMsg( 'sia-install-description' );

            $installForm->setSubmitTextMsg( 'sia-install-button-submit' );
            $installForm->setSubmitCallback( [ 'SemanticImageAnnotatorSpecial', 'install' ] );

            $installForm->show();
        }
        else
        {
            $out->addWikiText( '== '.$this->msg( 'sia-category-pageform-assignment' ).' ==' );
            $out->addWikiMsg( 'sia-category-pageform-assignment-description' );
            $out->addHTML( '<div id="sa-categories" class="oo-ui-panelLayout-padded oo-ui-panelLayout-framed">'.$this->msg( 'sia-loading' ).'</div>' );

            
            $out->addWikiText( '== '.$this->msg( 'sta-reinstall-header' ).' ==' );
            $btn = new OOUI\ButtonWidget( array(
                'infusable' => true,
                'id' => 'reinstall-btn',
                'label' => ''.$this->msg( 'sta-reinstall-header' ).'',
            ) );

            
            $out->addWikiText( ''.$this->msg( 'sta-reinstall-text' ).'' );
            $out->addHTML($btn);

        }

        $out->addModules( 'ext.imageannotator.special' );
	}

    static function install( $formData ) {
        // # Create Properties
        // - Annotation of:Page
        $text = '[[Has type::Page]]';
        self::editPage( 'Property:Annotation_of', $text );
        // - AnnotationComment:Text
        $text = '[[Has type::Text]]';
        self::editPage( 'Property:AnnotationComment', $text );
        // - LastModificationDate:Date
        $text = '[[Has type::Date]]';
        self::editPage( 'Property:LastModificationDate', $text );
        // - LastModificationUser:Page
        $text = '[[Has type::Page]]';
        self::editPage( 'Property:LastModificationUser', $text );
        // - AnnotationMetadata:Sourcecode
        $text = '[[Has type::Code]]';
        self::editPage( 'Property:AnnotationMetadata', $text );

        // # Create Category
        // - Annotation
        $text = 'This is the Annotation category used by the Annotator Tools.';
        self::editPage( 'Category:Annotation', $text );
        //   - TextAnnotation (subcategory)
        $text = 'This is the ImageAnnotation category used by Semantic Image Annotator.'."\n\n";
        $text .= '[[Category:Annotation]]';
        self::editPage( 'Category:ImageAnnotation', $text );

        // # Create Template
        // - TextAnnotationTemplate
        $text = '<noinclude>'."\n";
        $text .= 'This is the "Semantic Image Annotation" template.'."\n";
        $text .= 'It should be called in the following format:'."\n";
        $text .= '<pre>'."\n";
        $text .= '{{ImageAnnotation'."\n";
        $text .= '|AnnotationOf='."\n";
        $text .= '|AnnotationComment='."\n";
        $text .= '|LastModificationDate='."\n";
        $text .= '|LastModificationUser='."\n";
        $text .= '|AnnotationMetadata='."\n";
        $text .= '}}'."\n";
        $text .= '</pre>'."\n";
        $text .= 'Edit the page to see the template text.'."\n";
        $text .= '</noinclude><includeonly>{| class="wikitable"'."\n";
        $text .= '! Annotation of'."\n";
        $text .= '| [[Annotation of::{{{AnnotationOf|}}}]] '."\n";
        $text .= '|-'."\n";
        $text .= '! Annotation Comment'."\n";
        $text .= '| [[AnnotationComment::{{{AnnotationComment|}}}]] '."\n";
        $text .= '|-'."\n";
        $text .= '! Last Modification Date'."\n";
        $text .= '| [[LastModificationDate::{{{LastModificationDate|}}}]] '."\n";
        $text .= '|-'."\n";
        $text .= '! Last Modification User'."\n";
        $text .= '| [[LastModificationUser::{{{LastModificationUser|}}}]] '."\n";
        $text .= '|-'."\n";
        $text .= '! Annotation Metadata'."\n";
        $text .= '| [[AnnotationMetadata::{{{AnnotationMetadata|}}}]] '."\n";
        $text .= '|}'."\n";
        $text .= ''."\n";
        $text .= '[[Category:ImageAnnotation]]'."\n";
        $text .= '</includeonly>';
        self::editPage( 'Template:ImageAnnotation', $text );

        // # Create Form
        // - TextAnnotationForm
        $text = '<noinclude>'."\n";
        $text .= 'Please do not use or modify this form because it belongs to Semantic Image Annotator Extension.'."\n";
        $text .= '</noinclude><includeonly>'."\n";
        $text .= '{{{for template|ImageAnnotation}}}'."\n";
        $text .= '{| class="formtable"'."\n";
        $text .= '! AnnotationOf: '."\n";
        $text .= '| {{{field|AnnotationOf|hidden}}}'."\n";
        $text .= '|-'."\n";
        $text .= '! AnnotationComment: '."\n";
        $text .= '| {{{field|AnnotationComment|hidden}}}'."\n";
        $text .= '|-'."\n";
        $text .= '! LastModificationDate: '."\n";
        $text .= '| {{{field|LastModificationDate|hidden}}}'."\n";
        $text .= '|-'."\n";
        $text .= '! LastModificationUser: '."\n";
        $text .= '| {{{field|LastModificationUser|hidden}}}'."\n";
        $text .= '|-'."\n";
        $text .= '! AnnotationMetadata: '."\n";
        $text .= '| {{{field|AnnotationMetadata|hidden}}}'."\n";
        $text .= '|}'."\n";
        $text .= '{{{end template}}}'."\n";
        $text .= '\'\'\'Free text:\'\'\''."\n";
        $text .= '{{{standard input|free text|rows=3}}}'."\n";
        $text .= '{{{standard input|save}}} {{{standard input|preview}}} {{{standard input|cancel}}}'."\n";
        $text .= '</includeonly>';
        self::editPage( 'Form:ImageAnnotation', $text );

        return wfMessage( 'sia-install-success' )->inContentLanguage()->text();
    }

    static function editPage( $pagename, $text ) {
        $title = Title::newFromText($pagename);
        $wikiPage = new WikiPage( $title );
        $summary = wfMessage( 'sia-autogenerate-summary' )->inContentLanguage()->text();
        $content = ContentHandler::makeContent( $text, $title );
        $wikiPage->doEditContent( $content, $summary, 0 );

        return true;
    }

    static function pageExists( $pagename ) {
        $title = Title::newFromText($pagename);
        $wikiPage = new WikiPage( $title );
        return $wikiPage->exists();
    }
}
