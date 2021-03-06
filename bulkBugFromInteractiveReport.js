// Script to obtain the visible list of bugs from an interactive report and
// provide a bug DB link to perform mass update.
// Initially developed by Parul Shastry. Updated for Apex by Anand
//
// Contents
// 1. Object interactiveReportRegion is defined
// 2. interactiveReportRegion.init () is invoked depending on the event
// 3. Readme. Important!



var interactiveReportRegion = {

    // List of bugs from the interactive report
    listOfBugsFromReport: [],
    //The base URL for Bug Mass Update
    bugDBBaseURL        : "https://bug.oraclecorp.com/pls/bug/WEBBUG_REPORTS.do_edit_report?rpt_title=&fcont_arr=off&fid_arr=157&fcont_arr=",

    // The initializing function - All functions should be called from here.
    init: function () {

        // Initializing list of Bugs Array
        this.listOfBugsFromReport = [];

        // Invoking all the required functions
        this.cacheDom ();
        this.getListofBugs ();
        this.createFinalBugLink ();
        this.finalHTML ();
        this.render ();
        this.bindEvents ();
        this.logging ();
    },

    // Fetching the interactive report - Only once!
    cacheDom: function () {

        // Find Interactive Report's DOM element
        // The variables used to assign objects from JQuery will have
        // $ sign as prefix
        // TODO : This has to be variablized. Right now it is hard coded
        this.$interactiveReport = $ ( '#BugPreventiveIR_data_panel' );
        this.$interactiveReportIr = $ ( '#BugPreventiveIR_ir' );
        this.$tableIndsideInteractiveReport = this.$interactiveReport.find ( 'table' );
        this.$tableRows = this.$tableIndsideInteractiveReport.find ( 'tr' );
        this.$bugNumberHeaderCell = this.$tableRows.find ( "th#BugNumber" );

        // The Table cell (TD) , which has headers headers attribute that starts with
        this.$rowsContainingBugs = this.$tableRows.find ( "td[headers^='BugNumber']" );
        this.$linkInsideRowsContainingBugs = this.$rowsContainingBugs.find ( "a" );

    },

    // Any Rendering of the UI goes here
    render: function () {

        // This is to add relative position to the bug number header
        this.$bugNumberHeaderCell.css('position', 'relative');
        // This is the overlaying DIV
        this.$bugNumberHeaderCell.append ( this.$htmlForLink );
    },

    // Get the List of Bugs
    getListofBugs: function () {

        // assigning this (object reference to a local variable
        // This can be accessed inside the each function
        var self = this;

        // Iterate through this.$this.$linkInsideRowsContainingBugs
        this.$linkInsideRowsContainingBugs.each ( function ( index ) {
            // Pushing into array
            self.listOfBugsFromReport.push ( $ ( this ).html () );
        } );

        this.$bugNumberInLinkInsideRowsContainingBugs = this.$linkInsideRowsContainingBugs.html ();
    },

    // Concatentenate Bug Link with list of Bugs
    createFinalBugLink: function () {

        //itereate through listOfBugsFromReport
        this.listOfBugsAsConcatentatedText = "";
        this.listOfBugsAsConcatentatedText = this.listOfBugsFromReport.join ( "," );
        this.finalBugDBLink = this.bugDBBaseURL + this.listOfBugsAsConcatentatedText +
            "&fid_arr=40&fcont_arr=2&fid_arr=100&cid_arr=2&cid_arr=27&cid_arr=9&cid_arr=8&cid_arr=7&cid_arr=11&cid_arr=6&cid_arr=12&cid_arr=13&f_count=3&c_count=9&query_type=1";
    },

    //
    finalHTML: function () {

        this.$htmlForLink = $ ( '<a></a>' ).attr ( { "href" : this.finalBugDBLink , "target" : "_blank" }).html ( '<span class="badge bg-green">' + this.listOfBugsFromReport.length + '</span>' );

    },

    // events
    bindEvents: function () {

    },
    // All Logging goes in here
    logging   : function () {

        console.log ( "The list of bugs " + this.listOfBugsFromReport );
        console.log ( "The Number of Bugs  = " + this.listOfBugsFromReport.length );
        console.log ( "The concatenated list of bug " + this.listOfBugsAsConcatentatedText );
        console.log ( " html for link " + this.$htmlForLink );
    }
};

// There are two events that we invoke the object
//1. When the page is loaded - document.ready
//2. When the "apexafterrefresh" event is triggered.

// When the page is loaded - document.ready
$ ( document ).ready ( function () {

    console.clear ();
    // Invoking the Objects
    interactiveReportRegion.init ();
} );

//When the "apexafterrefresh" event is triggered.
// Invoking init again once the table is refreshed.
// ""apexafterrefresh" is a custom event by Apex.
//Refer to this for understanding refresh
//http://vmorneau.me/using-apex-javascript-events/
$ ( document ).on ( "apexafterrefresh", function ( e ) {
    interactiveReportRegion.init ();
} );

// ------------Readme---------------------
// Questions
//Where to place in Apex ?
//Where to refer in Apex ?
//What variables need to be updated in Apex and the script?
//What are the dependencies?

// Answers
//Where to place in Apex ?
//  Need to navigate to project > Shared Components > Static Project files.
//  Note down the path. Eg.  #WORKSPACE_IMAGES#InteractiveBug.js

//Where to refer in Apex?
//  This is for referring in each required page. Possibly this can be
//  included for the entire project in the project setting. Go to Page
//  >  Page Proerties > Javascript > File URLS > Values from previous answer.
//  e.g #WORKSPACE_IMAGES#InteractiveBug.js

//What variables need to be updated in Apex and the script?
//  There are two changes to apex, which have to be reflected in the script.
//  The first is a unique ID for the interactive Report and the second being
//  a unique ID for the bug column.
//
//  Interactive Report
//  In Apex, ensure the interactive report has a unique ID. Go to Interactive
//  report region > Region Properties > Advanced > Static ID > Provide a Unique
//  Value. e.g BugPreventiveIR
//  In the script, need to update interactiveReportRegion.cacheDom method with
//  BugPreventiveIR_data_panel as the selector for  $interactiveReport. Note
//  the _data_panel suffixed.
//
//  Bug Column
//  In Apex, ensure the Bug Column has a unique ID.  Go to Interactive
//  report > Column > Bug > Column Properties > Advanced > Static ID >
//  Provide a Unique Value. e.g  BugNumber
//  In the script, need to update interactiveReportRegion.cacheDom method with
//  th#BugNumber as the selector for  $bugNumberHeaderCell. Note the 'th'
//  prefixed. indicating it is table header.

//What are the dependencies?
// We need to include badges.css.

//--------------Other Notes-----------------
// This pattern, object literal, is completely inspired from
// https://www.youtube.com/playlist?list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f

//    TODO
// Wanted features
// 3. On Hover display more details for clicking
// 4. Rename git Repo
// 5. Use same rubymine setting

