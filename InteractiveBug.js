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

    //The base URL for Bug Mass Update
    bugDBBaseURL: "https://bug.oraclecorp.com/pls/bug/WEBBUG_REPORTS.do_edit_report?rpt_title=&fcont_arr=off&fid_arr=157&fcont_arr=",

    // The HTML for Bug Header Column
    //htmlForLink: "<span class=\"badge bg-green\">25</span>",

    // The initializing function - All functions should be called from here.
    init: function () {
        this.cacheDom ();
        this.getListofBugs ();
        this.createFinalBugLink ();
        this.finalHTML ();
        this.render ();
        this.logging ();
    },

    // Fetching the interactive report - Only once!
    cacheDom: function () {
        // Find Interactive Report's DOM element
        // The variables used to assign objects from JQuery will have
        // $ sign as prefix
        // TODO : This has to be variablized. Right now it is hard coded
        this.$interactiveReport             = $ ('#BugPreventiveIR_data_panel');
        this.$tableIndsideInteractiveReport = this.$interactiveReport.find ('table');
        this.$tableRows                     = this.$tableIndsideInteractiveReport.find ('tr');

        // The Table cell (TD) , which has headers headers attribute that starts with
        this.$rowsContainingBugs           = this.$tableRows.find ("td[headers^='BugNumber']");
        this.$linkInsideRowsContainingBugs = this.$rowsContainingBugs.find ("a");
        this.$bugNumberHeaderCell          = this.$tableRows.find ("th#BugNumber");
    },

    // TODO: This can be commented out later
    // Any Rendering of the UI goes here
    render: function () {
        // This is the overlaying DIV
        this.$bugNumberHeaderCell.append (this.$htmlForLink);
    },

    // Get the List of Bugs
    getListofBugs: function () {
        // assigning this (object reference to a local variable
        // This can be accessed inside the each function
        var _this = this;

        // Iterate through this.$this.$linkInsideRowsContainingBugs
        this.$linkInsideRowsContainingBugs.each (function (index) {
            console.log (index + ":" + $ (this).html ());

            // Pushing into array
            _this.listOfBugsFromReport.push ($ (this).html ());

        });

        this.$bugNumberInLinkInsideRowsContainingBugs = this.$linkInsideRowsContainingBugs.html ();

    },

    // Concatentenate Bug Link with list of Bugs
    createFinalBugLink: function () {
        //itereate through listOfBugsFromReport
        this.listOfBugsAsConcatentatedText = "";
        this.listOfBugsAsConcatentatedText = this.listOfBugsFromReport.join (",");
        this.finalBugDBLink                = this.bugDBBaseURL + this.listOfBugsAsConcatentatedText +
            "&fid_arr=40&fcont_arr=2&fid_arr=100&cid_arr=2&cid_arr=27&cid_arr=9&cid_arr=8&cid_arr=7&cid_arr=11&cid_arr=6&cid_arr=12&cid_arr=13&f_count=3&c_count=9&query_type=1";

    },
    finalHTML         : function () {

        this.$htmlForLink = $ ('<a></a>').attr ("href", this.finalBugDBLink).html ('<span class="badge bg-green">' + this.listOfBugsFromReport.length + '</span>');

    },

    // testing events
    bindEvents: function () {
        this.$tableRows.on('click',this.alertTest.bind(this));

    },
    alertTest: function () {
        alert("hi there");
    },
    // All Logging goes in here
    logging           : function () {
        console.log ("The list of bugs " + this.listOfBugsFromReport);
        console.log ("The Number of Bugs  = " + this.listOfBugsFromReport.length);
        console.log ("The concatenated list of bug " + this.listOfBugsAsConcatentatedText);
        console.log (" html for link " + this.$htmlForLink);

    }
};

$ (document).ready (function () {
    console.clear ();
    // Invoking the Objects
    interactiveReportRegion.init ();
});

//Refer to this for understanding refresh
//http://vmorneau.me/using-apex-javascript-events/
$(window).on("click", function(e) {
    console.log(e.type);
    console.log("Anand , the page is refreshed");
});