var cur_column = -1;
var sort_dir = -1; // -1 is unsorted, 0 is ascending, 1 is descending

function sortColumn(column) {
  "use strict";
  /*
   * Sort the column given by the index, coloring the header as necessary.
   *
   * Some notes:
   * - You will have to keep track of some sort of global state in order to know
   *   which column you are currently sorting and which direction is the current
   *   sort direction. This is kind of gross, but for this particular file you
   *   can't really do much.
   * - Arrays have a sort method that normally sorts by JavaScript's default
   *   method, but you can actually provide your own function; if you provide a
   *   function to Array.prototype.sort, it will take two arguments (comparing
   *   items, say a and b), and return -1 if a < b, 1 if a > b, and 0 if a == b.
   * - There's no really nice way to actually sort rows of things, so you'll
   *   have to first store the rows in the correct order somewhere, clear out
   *   the table, and append them back in the correct order.
   */
   var colors = ["blue", "red"];
   var headers = document.getElementById("header").children;

   if (column !== cur_column) {
    // reset old column
    if (cur_column >= 0) {
      headers[cur_column].style.color = "";
    }
    // set variables for new column
    cur_column = column;
    sort_dir = 0;
   }
   else {
    sort_dir = 1 - sort_dir; // toggle between 0 and 1
   }

   // update color
   headers[cur_column].style.color = colors[sort_dir];

   // get data from table
   var trs = document.getElementsByTagName("tr");
   var rows = [];
   var tds;
   var j;
   var k;
   for (j = 0; j < trs.length; j++){
    if (trs[j].id !== "header") {
      tds = trs[j].children;
      var row = [];
      for (k = 0; k < tds.length; k++) {
        row.push(tds[k].innerHTML);
      }
      rows.push(row);
    }

   }

   // sort
   rows.sort(compareByCol);

   // put data back in table
   var skip = 0;
   for (j = 0; j < trs.length; j++){
    if (trs[j].id !== "header") {
      tds = trs[j].children;
      for (k = 0; k < tds.length; k++) {
        tds[k].innerHTML = rows[j - skip][k];
      }
    }
    else {
      skip++;
    }
   }
}

function compareByCol(a, b) {
  "use strict";
  /*
   * Sort by cur_column and sort_dir.
   */

  if (a[cur_column] < b[cur_column]) {
    if (sort_dir === 0) {
      return -1;
    }
    return 1;
  }

  if (a[cur_column] > b[cur_column]) {
    if (sort_dir === 0) {
      return 1;
    }
    return -1;
  }

  return 0;
}

window.addEventListener("load", function(e) {
  "use strict";
  // attach a click listener on all header cells
  var i;
  var elements = document.getElementById("header").children;

  var funcSortColumn = function(idx) {
    return function(e) {
       sortColumn(idx);
    };
  };

  for (i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", (funcSortColumn)(i));
  }
});
