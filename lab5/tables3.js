var SortTable;

(function () {
  "use strict";
  console.log("hi!");

  SortTable = function(id, types) {
    /*
     * - Determine the types of each column based on the types argument; if it is
     *   empty or not an array, just assume all the types are strings. Otherwise
     *   push the type.
     * - Set up the proper handlers (as before)
     * - Set up any other variables you need (e.g. instance variables that would
     *   have been globals before)
     */

    // declare instance variables
    this.cur_column = -1;
    this.sort_dir = -1; // -1 is unsorted, 0 is ascending, 1 is descending
    this.colors = ["blue", "red"];

    // attach listeners to headers
    var headers = document.getElementById(id).getElementsByTagName("thead")[0];
    this.header_elements = headers.children[0].children; // first row of header

    var i;
    for (i = 0; i < this.header_elements.length; i++) {
      this.header_elements[i].addEventListener("click", (function(idx) {
        return function(e) {
          this.sortColumn(idx);
        };
      })(i).bind(this));
    }

    // read data from the table and set correct type
    this.rows = [];
    var trs = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    var tds;
    var j;
    var k;
    for (j = 0; j < trs.length; j++){
    tds = trs[j].children;
    var row = [];
    for (k = 0; k < tds.length; k++) {
      if (types[k] === Number) {
        row.push(Number(tds[k].innerHTML));
      }
      else { // default is String
        row.push(tds[k].innerHTML); 
      } 
    }
    this.rows.push(row);
    }
  };

  SortTable.prototype.sortColumn = function(index) {
    /* 
     * Sort by cur_column and sort_dir.
     */

     if (index !== this.cur_column) {
      // reset old column
      if (this.cur_column >= 0) {
        this.header_elements[this.cur_column].style.color = "";
      }
      // set variables for new column
      this.cur_column = index;
      this.sort_dir = 0;
     }
     else {
      this.sort_dir = 1 - this.sort_dir; // toggle between 0 and 1
     }

     // update color
     this.header_elements[this.cur_column].style.color = this.colors[this.sort_dir];
     
     // sort
     this.rows.sort(this.compareByCol.bind(this));

     // put data back in table
     var trs = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
     var tds;
     var j;
     var k;
     for (j = 0; j < trs.length; j++){
      tds = trs[j].children;
      for (k = 0; k < tds.length; k++) {
        tds[k].innerHTML = this.rows[j][k];
      }
     }
  };

  SortTable.prototype.compareByCol = function(a, b) {
    /* Sort by cur_column and sort_dir */
    if (a[this.cur_column] < b[this.cur_column]) {
      if (this.sort_dir === 0) {
        return -1;
      }
      return 1;
    }
    
    if (a[this.cur_column] > b[this.cur_column]) {
      if (this.sort_dir === 0) {
        return 1;
      }
      return -1;
    }

    return 0;

  };

}) ();
