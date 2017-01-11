/**
 * Created by anallaal on 09-Dec.
 */
// This pattern is completely inspired from
// https://www.youtube.com/playlist?list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f

// This is object literal pattern
// This object will Analyze the Interactive Report and obtain the list of bugs

// This Object will deal with displaying the link


var interactiveReportRegion = {
    init: function () {
        this.cacheDom ();
        this.logging ();
    },
    // Fetching the interactive report - Only once!
    cacheDom: function () {
        // Find Interactive Report's DOM element
        // The variables used to assign objects from JQuery will have
        // $ sign as prefix
        this.$interactiveReport = $ ('#BugPreventiveIR_data_panel');
    },
    // All Logging goes in here
    logging: function () {
        console.log ("The interactive Report " + this.$interactiveReport);
    }
};

var displayOfBugList = {
    $IR: interactiveReportRegion.$interactiveReport,
    a: "Thanks Rahul",
    // Assiging to a
    init: function () {
        //this.logging ();
        // this.$IR = interactiveReportRegion.$interactiveReport;
    },
    // All Logging goes in here
    logging: function () {
        console.log (" I am inside displayOfBugList");
        // Similairly even this comes up as undedefined but is accessible through console
        console.log (" This is $interactive report of OBJ1 " + interactiveReportRegion.$interactiveReport);
        // This comes up as undefined as well as in console
        console.log (" This is $IR of OBJ2 " + this.$IR);
        console.log (" This is a " + this.a);

    }
};

// Invoking the respective init functions onlu
$ (document).ready (function () {
    console.clear ();
    // Invoking the Objects only after document is ready.
    interactiveReportRegion.init ();

    // displayOfBugList.init();
    displayOfBugList.logging ();

});