/**
 * Created by anallaal on 09-Dec.
 */
// This pattern is completely inspired from
// https://www.youtube.com/playlist?list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f

// Using a single Object till Hoisting issue be understood and know how
// to initialize an object referencing another object (in Debug Branch)

//    TODO

// This is object literal pattern

// Wanted features
// 1. Position it right above the Bug header cell
// 2. Display count bubble.
// 3. On Hover display more details for clicking
// 4. If No bugs, display zero bubble and disappear
// 5. If bug is control broken, only one bug bubble

// This object will Analyze the Interactive Report and obtain the list of bugs
var interactiveReportRegion = {
    // List of bugs from the interactive report
    listOfBugsFromReport: [],

    // The initializing function - All functions should be called from here.
    init: function () {
        this.cacheDom ();
        this.analyzeInteractiveReport ();
        this.getListofBugs ();
        this.render ();
        this.logging ();
    },

    // Fetching the interactive report - Only once!
    cacheDom: function () {
        // Find Interactive Report's DOM element
        // The variables used to assign objects from JQuery will have
        // $ sign as prefix
        // TODO : This has to be variablized. Right now it is hard coded
        this.$interactiveReport             = $ ( '#BugPreventiveIR_data_panel' );
        this.$tableIndsideInteractiveReport = this.$interactiveReport.find ( 'table' );
        this.$tableRows                     = this.$tableIndsideInteractiveReport.find ( 'tr' );

        // The Table cell (TD) , which has headers headers attribute that starts with
        this.$rowsContainingBugs           = this.$tableRows.find ( "td[headers^='BugNumber']" );
        this.$linkInsideRowsContainingBugs = this.$rowsContainingBugs.find ( "a" );
        this.$bugNumberHeaderCell          = this.$tableRows.find ( "th#BugNumber" );
    },

    // TODO: This can be commented out later
    // Any Rendering of the UI goes here
    render: function () {

        this.$bugNumberHeaderCell.css ( {"background-color": "yellow"} );

        // This iterates through the object and gets the html (The bug number)
        this.$linkInsideRowsContainingBugs.each ( function () {
            $ ( this ).append ( ' - ' + $ ( this ).html () );
        } );
    },

    // Get the List of Bugs
    getListofBugs: function () {
        if (this.isTheTableOfBugsPresent === true) {
            // assigning this (object reference to a local variable
            // This can be accessed inside the each function
            var _this = this;

            // Iterate through this.$this.$linkInsideRowsContainingBugs
            this.$linkInsideRowsContainingBugs.each ( function ( index ) {
                console.log ( index + ":" + $ ( this ).html () );

                // Pushing into array
                _this.listOfBugsFromReport.push ( $ ( this ).html () );

            } );

            this.$bugNumberInLinkInsideRowsContainingBugs = this.$linkInsideRowsContainingBugs.html ();
        }
    },

    // All Logging goes in here
    logging: function () {
        console.log ( "The list of bugs " + this.listOfBugsFromReport );
        console.log ( "What is  " + this.isTheInteractiveReportPresent );
        console.log ( "Is the Table of Bugs Present ? " + this.isTheTableOfBugsPresent );
        console.log ( "The table inside interactive Report " + this.$tableIndsideInteractiveReport );
        console.log ( "The Number of Table Rows = " + this.$tableRows.length );

    }
};

$ ( document ).ready ( function () {
    console.clear ();
    // Invoking the Objects
    interactiveReportRegion.init ();
} );