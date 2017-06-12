<img src="https://cloud.githubusercontent.com/assets/11618221/26701171/56768e22-4720-11e7-8758-51dc241342d2.png" alt="Semantic Image Annotator" title="Semantic Image Annotator" align="middle" height="600"/>


Semantic Image Annotator
======================

The repository contains the Semantic Image Annotator extension for Semantic MediaWiki. The extension provides a plugin for capturing Image Annotations in Semantic MediaWiki of Uploaded Image Files.

Click [here](https://sandbox.semantic-mediawiki.org/wiki/Fichier:Logo_WikiFF.PNG) for a Demo.

## Table of content
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Annotator setup](#annotator-setup)
- [Usage](#usage)
    - [Create Annotations](#create-annotations)
    - [Edit Annotations](#edit-annotations)
    - [Delete Annotations](#delete-annotations)
    - [Query Annotations](#query-annotations)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Links](#links)
- [Related Extensions](#related-extensions)

## Prerequisites
* [MediaWiki](http://mediawiki.org) must be installed
* [Semantic MediaWiki](https://www.semantic-mediawiki.org/wiki/Semantic_MediaWiki) must be installed
* [PageForms](https://www.mediawiki.org/wiki/Extension:Page_Forms) must be installed


## Installation
* Download and extract the repository
* Place the extracted folder in your extension folder of MediaWiki
* Add the following code at the bottom of your LocalSettings.php:</br>
```wfLoadExtension( 'SemanticImageAnnotator' );```
* To users running MediaWiki 1.24 or earlier: Add the folloding at the bottom of your LocalSettings.php:</br>
```require_once "$IP/extensions/SemanticImageAnnotator/SemanticImageAnnotator.php";```

## Annotator Setup
* Go to Special Pages and Click on *Semantic Image Annotator* under the Group *Annotation*
     * *Remark: Only Users with sysops rights are allowed to access the page.*
* Click on the Install button to setup Semantic Image Annotator and refresh the Special Page
* You can now Link PageForms to Annotation-Categories by using the Table on Special Page.

![Special Page](https://cloud.githubusercontent.com/assets/11618221/26701173/568e7654-4720-11e7-9d90-f90de150f964.png)

## Usage

### Create Annotations
* Go to an uploaded Image File (In the NameSpace 6)
* On the top appears the *Annotate Image* Button. Click on it to start the Annotation Mode
* Afterwards you can select an area. Afterwards appears a popup
* You can enter a Comment to the Annotation and select an Annotation-Category (Linked by using the Special Page)
     * *Remark: If the user has no permission to create/edit pages. Then the popup is disabled.*
* A popup appears to enter additional information, based on the selected PageForm
* Click on save to store the annotation. </br>

<img src="https://cloud.githubusercontent.com/assets/11618221/26701172/568cd5ba-4720-11e7-87fc-d6d753ce2579.png" alt="Create Annotation" title="Create Annotation" align="middle" height="600"/> </br>

<img src="https://cloud.githubusercontent.com/assets/11618221/26701170/5672e63c-4720-11e7-8004-68bdf6568434.png" alt="Enter Information in PageForms" title="Enter Information in PageForms" align="middle" height="500"/>

### Edit Annotations
* Mouseover an annotation. A popup appears. Click on the Edit button.</br>

<img src="https://cloud.githubusercontent.com/assets/11618221/26701171/56768e22-4720-11e7-8758-51dc241342d2.png" alt="Edit Annotation" title="Edit Annotation" align="middle" height="600"/>


### Delete Annotations
* Mouseover an annotation. A popup appears. Click on the Delete button.


### Query Annotations
* The annotations are stored in a structured way.
* Every annotated Image has its own overview page (Annotation:*PAGENAME*) which lists all annotations.
* The following figure shows the query for listing all Pages for a certain Wiki page. </br>

<img src="https://cloud.githubusercontent.com/assets/11618221/26701168/56721ce8-4720-11e7-910b-70eb2aa0507d.png" alt="Query Annotation" title="Query Annotation" align="middle" height="200"/>
<img src="https://cloud.githubusercontent.com/assets/11618221/26701167/5671fa24-4720-11e7-98f8-53fca2219822.png" alt="Query Annotation" title="Query Annotation" align="middle" height="300"/>

## License
The Semantic Image Annotator is currently under the MIT License.


## Acknowledgements
The idea of the Semantic Image Annotator is based on a by Felix Obenauer. For the Semantic Image Annotator is the JS Library [annotorious](https://annotorious.github.io/) used.
Thank you to Roger Appleby and Karsten [Hoffmeyer](https://www.semantic-mediawiki.org/wiki/User:Kghbln) for supporting the extension and provding bug fixes.


## Links

* [MediaWiki Extension Page](https://www.mediawiki.org/wiki/Extension:Semantic_Image_Annotator)
* [AIFB](http://www.aifb.kit.edu/web/Semantic_Image_Annotator)


## Related Extensions
* [Semantic Text Annotator](https://github.com/TobiasWeller/SemanticTextAnnotator/)
* Planned: Semantic Video Annotator
* Planned: Semantic PDF Annotator
