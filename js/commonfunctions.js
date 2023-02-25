
let arwdivbox = Array.from(document.querySelectorAll("div.sub-dir"));

  // Hiding all arrows
  for (i = 0; i < arwdivbox.length; i++) {
      arwdivbox[i].className += " hide-arrow";
  }

function sortTable(tableId, colNumber, dataType, e) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  let arwbox = Array.from(document.querySelectorAll("img.direct"));

  table = document.getElementById(tableId);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  
  for (i = 0; i < arwdivbox.length; i++) {
      if (arwdivbox[i].classList.contains("hide-arrow")) {
        arwdivbox[i].className += "";
     } else {
        arwdivbox[i].className += " hide-arrow";
      }
  }

    //console.log("CTRL: " + e.ctrlKey);

  while (switching && !e.ctrlKey) {
    
    console.log("CTRL: " + e.ctrlKey);
    
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 0; i < (rows.length - 1); i++) {
      
      // Start by saying there should be no switching:
      shouldSwitch = false;
      
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[colNumber];
      y = rows[i + 1].getElementsByTagName("td")[colNumber];
      
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      xval = x.innerHTML.toLowerCase();
      yval = y.innerHTML.toLowerCase();

      // convert to date
      if (dataType == 'datetime') {
        xval = getDateFromFormat(xval, 'dd.MM.yyyy HH:mm:ss');
        yval = getDateFromFormat(yval, 'dd.MM.yyyy HH:mm:ss');
      } else if (dataType == 'date') {
        xval = getDateFromFormat(xval, 'dd.MM.yyyy');
        yval = getDateFromFormat(yval, 'dd.MM.yyyy');
      } else if (dataType == 'number') {
        xval = Number(xval);
        yval = Number(yval);
      }

      if (dir == "asc") {
        if (xval > yval) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (xval < yval) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
        if (dir == "desc") {
            arwdivbox[colNumber].classList.remove("hide-arrow");
            arwbox[colNumber].src = "img/arrow-up.png";
        } else if (dir == "asc") {
            arwdivbox[colNumber].classList.remove("hide-arrow");
            arwbox[colNumber].src = "img/arrow-down.png";
        }
}

