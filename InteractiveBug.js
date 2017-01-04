/**
 * Created by anallaal on 09-Dec.
 */
// This pattern is completely inspired from
// https://www.youtube.com/playlist?list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f

// This finally worked. We are able to obtain the list of bugs (19-Dec)

$ (document).ready (function () {

    // This is object literal pattern
    // This object will Analyze the Interactive Report and obtain the list of bugs
    var interactiveReportRegion = {
        // List of bugs from the interactive report
        listOfBugsFromReport: [],
        // Some Properties on analyzing the regions
        isTheTableOfBugsPresent: false,
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
            this.$interactiveReport = $ ('#BugPreventiveIR_data_panel');
        },
        // TODO: This can be commented out later
        // Any Rendering of the UI goes here
        render: function () {
            // This iterates through the object and gets the html (The bug number)
            this.$linkInsideRowsContainingBugs.each (function () {
                $ (this).append (' - ' + $ (this).html ());
            });
        },
        //  Analyze and Inspect the Interactive Report
        analyzeInteractiveReport: function () {
            // If the table Inside the interactive Report is present,
            // set the isTheTableOfBugsPresent to true
            this.$tableIndsideInteractiveReport = this.$interactiveReport.find ('table');
            if (this.$tableIndsideInteractiveReport.length !== 0) {
                this.isTheTableOfBugsPresent = true;
            }
        },
        // Get the List of Bugs
        getListofBugs: function () {
            if (this.isTheTableOfBugsPresent === true) {
                // assigning this (object reference to a local variable
                // This can be accessed inside the each function
                var _this = this;

                this.$tableRows = this.$tableIndsideInteractiveReport.find ('tr');

                // The Table cell (TD) , which has headers headers attribute that starts with
                this.$rowsContainingBugs = this.$tableRows.find ("td[headers^='BugNumber']");
                this.$linkInsideRowsContainingBugs = this.$rowsContainingBugs.find ("a");

                // Iterate through this.$this.$linkInsideRowsContainingBugs
                this.$linkInsideRowsContainingBugs.each (function (index) {
                    console.log (index + ":" + $ (this).html ());

                    // Pushing into array
                    _this.listOfBugsFromReport.push ($ (this).html ());

                });

                this.$bugNumberInLinkInsideRowsContainingBugs = this.$linkInsideRowsContainingBugs.html ();
            }
        },
        // All Logging goes in here
        logging: function () {
            // This set seems to be coming up correctly
            console.log (" This is $ " + $);
            console.log (" This is jQuery " + jQuery);
            console.log (" This is an object from cacheDom : this.$interactiveReport " + this.$interactiveReport);
            // The next set of debug to get properties of a jQueryObject
            console.log (" This is an object from cacheDom : this.$interactiveReport.length " + this.$interactiveReport.length);

            console.log ("The list of bugs " + this.listOfBugsFromReport);
            console.log ("Is the Interactive Report Present ? " + this.isTheInteractiveReportPresent);
            console.log ("Is the Table of Bugs Present ? " + this.isTheTableOfBugsPresent);
            console.log ("The table inside interactive Report " + this.$tableIndsideInteractiveReport);
            console.log ("The Number of Table Rows = " + this.$tableRows.length);

        }
    };

    //This Object will be used to derive the final BugDBLink
    var bugDBLinkForListofBugsFromReport = {
        //Try and annotate the different parameters
        bugDBLinkFoundation: "",
        init: function () {
            this.logging ();
        },
// All Logging goes in here
        logging: function () {
            console.log (" I am inside bugDBLinkForListofBugsFromReport"); // jshint ignore:line
        }
    };

    // This Object will deal with displaying the link
    var displayOfBugList = {
        // Wanted features
        // 1. Position it right above the Bug header cell
        // 2. Display count bubble.
        // 3. On Hover display more details for clicking
        // 4. If No bugs, display zero bubble and disappear
        // 5. If bug is control broken, only one bug bubble

        cssForDisplayRegion: {},
        init: function () {
            this.logging ();

        },
// All Logging goes in here
        logging: function () {
            console.log (" I am inside displayOfBugList"); // jshint ignore:line
        }
    };


    console.clear (); // jshint ignore:line
    // Invoking the Objects
    interactiveReportRegion.init ();
    bugDBLinkForListofBugsFromReport.init ();
    displayOfBugList.init ();

});