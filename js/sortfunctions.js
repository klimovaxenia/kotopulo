
//let ctrl = false;
//let bgr = document.querySelector("#swiching")
//
//window.addEventListener("keydown", ctrlDown); 
//function ctrlDown(e) {
//    if (e.ctrlKey) {
//        ctrl = true;
//        bgr.style.backgroundColor = "blue";
//    }
//}
//
//window.addEventListener("keyup", ctrlUp); 
//function ctrlUp(e) {
//    if (e.keyCode == 17) {
//        ctrl = false;
//        bgr.style.backgroundColor = bgr.style.backgroundColor.replace("blue", "");
//    }
//}




function mySort(mytableId, sortModelArray, event) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, dataType;
    
    // Setting direction
    //tableDirection(tdColNum, event);
    
    // Check if CTRL is down
    //if (event.ctrlKey) {
        table = document.getElementById(mytableId);
        switching = true;
        dir = "";
        //console.log(sortModelArray);
        
        //if (colNumber.length < document.getElementById("tableheader").rows[0].cells.length) {
          //  colNumber.push(tdColNum);
        //}

        //console.log(colSortOrder);
        
        while (switching) {

            switching = false;
            rows = table.rows;

            for (i = 0; i < rows.length - 1; i++) {
                shouldSwitch = false;
                
                for (colIndx = 0; colIndx < sortModelArray.length; colIndx++) {
                    curSortOrder = sortModelArray[colIndx];
                    dir = curSortOrder.sortdir;
                    dataType = curSortOrder.dataType
                    //console.log("dir: " + curSortOrder.sortdir);
                    x = rows[i].getElementsByTagName("td")[curSortOrder.colNum];
                    y = rows[i + 1].getElementsByTagName("td")[curSortOrder.colNum];
                    
                    xval = x.innerHTML.toLowerCase();
                    yval = y.innerHTML.toLowerCase();
                    
                    // convert to date
                    if (dataType == "datetime") {
                      xval = getDateFromFormat(xval, 'dd.MM.yyyy HH:mm:ss');
                      yval = getDateFromFormat(yval, 'dd.MM.yyyy HH:mm:ss');
                    } else if (dataType == "date") {
                      xval = getDateFromFormat(xval, 'dd.MM.yyyy');
                      yval = getDateFromFormat(yval, 'dd.MM.yyyy');
                    } else if (dataType == "number") {
                      xval = Number(xval);
                      yval = Number(yval);
                    }
                    
                    if (dir == "asc") {
                        if (xval > yval) {
                            // If so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        } else if (xval < yval) {
                            // It means we should break this loop but not switch rows
                            shouldSwitch = false;
                            break;
                        }
                    } else if (dir == "desc") {
                        if (xval < yval) {
                            // If so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        } else if (xval > yval) {
                            // It means we should break this loop but not switch rows
                            shouldSwitch = false;
                            break;
                        }
                    }
                }
                

                if (shouldSwitch) {
                    break;
                }

            }

            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            } else {
                switching = false;
            }
        }
    //}
}

function modelTableDirection(headerTableId, tdColNum, event) {
    let thdr = Array.from(document.getElementById(headerTableId).rows[0].getElementsByTagName("td"));
    let noCtrlDir
    // If CTRL is pressed - never set direction to null
    if (event.ctrlKey) {
        if (thdr[tdColNum].getAttribute("sortdir") == "null") {
            thdr[tdColNum].setAttribute("sortdir", "asc");
        } else if (thdr[tdColNum].getAttribute("sortdir") == "asc") {
            thdr[tdColNum].setAttribute("sortdir", "desc");
        } else if (thdr[tdColNum].getAttribute("sortdir") == "desc") {
            thdr[tdColNum].setAttribute("sortdir", "asc");
        }
        //console.log("dir: " + thdr[tdColNum].getAttribute("sortdir"));
    } else {
        // Memorizing direction befor setting it to null with loop
        noCtrlDir = thdr[tdColNum].getAttribute("sortdir");
        for (i = 0; i < thdr.length; i++) {
            thdr[i].setAttribute("sortdir", "null");
        }
        // Checking memorized direction
        if (noCtrlDir == "null") {
            thdr[tdColNum].setAttribute("sortdir", "asc");
        } else if (noCtrlDir == "asc") {
            thdr[tdColNum].setAttribute("sortdir", "desc");
        } else if (noCtrlDir == "desc") {
            thdr[tdColNum].setAttribute("sortdir", "asc");
        }
        
    }
}

function getTableSortOrder(headerTableId) {
    let list = Array.from(document.getElementById(headerTableId).rows[0].getElementsByTagName("td"));
    let sortList = [];

    for (i=0; i<list.length; i++) {
        cell = list[i];
        chainNum = parseInt(cell.getAttribute("chainNum"));
        sortdir = cell.getAttribute("sortdir");
        dataType = cell.getAttribute("dataType");

        if (chainNum != null) {
            if (chainNum > 0) {
                sortModel = {};
                sortModel.colNum = i;
                sortModel.chainNum = chainNum;
                sortModel.sortdir = sortdir;
                sortModel.dataType = dataType;
                sortList.push(sortModel);
            }
        }
    }
    sortList.sort(function(a, b) {
        chainNumA = a.chainNum;
        chainNumB = b.chainNum;
        return chainNumA - chainNumB;
    });
    //console.log(sortList);
    return sortList;
}

function modelTableSortOrder(headerTableId, tdColNum, event) {
    let chainOrderList = Array.from(document.getElementById(headerTableId).rows[0].getElementsByTagName("td"));
    let chainNumber = 0;
    let j = 0;
    
    if (event.ctrlKey) {

        for (i = 0; i < chainOrderList.length; i++) {
            
            if (chainOrderList[i].getAttribute("chainNum") > 0) {
                j++;
            }
        }
        if (j == 0) {
            chainNumber = 1;
        }
        if (j > 0 && j !== chainOrderList.length) {
            chainNumber = j + 1
        }

    } else {
        chainNumber = 1;
        for (i = 0; i < chainOrderList.length; i++) {
            chainOrderList[i].setAttribute("chainNum", 0);
        }
    }
        if (j !== chainOrderList.length && chainOrderList[tdColNum].getAttribute("chainNum") == 0) {
            chainOrderList[tdColNum].setAttribute("chainNum", chainNumber);
        }
    //console.log("span: " + chainOrderList[tdColNum].getElementsByTagName("span"));
    //console.log("j: " + j);
    //console.log("chainNum: " + chainNumber);
    //console.log("colNum: " + tdColNum);
}

function showTableSortOrderDir(headerTableId, event) {
    let chainOrderList = Array.from(document.getElementById(headerTableId).rows[0].getElementsByTagName("td"));
    let arowDivBox = Array.from(document.getElementById(headerTableId).rows[0].getElementsByTagName("div"));
    let k = 0;
    // cheking how many collumns have chainNum set > 0
    for (i = 0; i < chainOrderList.length; i++) {
        if (chainOrderList[i].getAttribute("chainNum") > 0) {
            k++;
        }
    }
    // If only one collumn has chainNum > 0
    if (k == 1) {
        for (i = 0; i < chainOrderList.length; i++) {
            // no digits with one collumn sort
            chainOrderList[i].getElementsByTagName("span")[0].innerHTML = "";
            // hiding all arrows if necessary
            if (arowDivBox[i].classList.contains("hide-arrow")) {
              arowDivBox[i].className += "";
            } else {
              arowDivBox[i].className += " hide-arrow";
            }
            // drawing up or down arrow
            if (chainOrderList[i].getAttribute("sortdir") == "asc") {
                chainOrderList[i].getElementsByTagName("img")[0].src = "img/arrow-down.png";
                arowDivBox[i].classList.remove("hide-arrow");
            } else if (chainOrderList[i].getAttribute("sortdir") == "desc" ) {
                chainOrderList[i].getElementsByTagName("img")[0].src = "img/arrow-up.png";
                arowDivBox[i].classList.remove("hide-arrow");
            }
        }
    // If more than one collumn has chainNum > 0
    } else if (k > 1){
        for (i = 0; i < chainOrderList.length; i++) {
            let chainNum = chainOrderList[i].getAttribute("chainNum");
            let sortdir = chainOrderList[i].getAttribute("sortdir");
            // Don't touch collumns with chainNum < 0
            if (chainNum > 0) {
                // showing up or down arrow
                arowDivBox[i].classList.remove("hide-arrow");
                if (chainOrderList[i].getAttribute("sortdir") == "asc") {
                    chainOrderList[i].getElementsByTagName("img")[0].src = "img/arrow-down.png";
                    arowDivBox[i].classList.remove("hide-arrow");
                } else if (chainOrderList[i].getAttribute("sortdir") == "desc" ) {
                    chainOrderList[i].getElementsByTagName("img")[0].src = "img/arrow-up.png";
                    arowDivBox[i].classList.remove("hide-arrow");
                }
            // showing chein order in the header
            chainOrderList[i].getElementsByTagName("span")[0].innerHTML = chainNum;
            }
        }
    }
}

function sortMyTable(tdColNum, event) {
    headerTableId = "tableheader";
    sortableTableId = "myTable2";
    modelTableDirection(headerTableId, tdColNum, event)
    modelTableSortOrder(headerTableId, tdColNum, event)
    showTableSortOrderDir(headerTableId, event);
    sortModelArray = getTableSortOrder(headerTableId);
    mySort(sortableTableId, sortModelArray, event);
}

function sortMyTable2(tdColNum, event) {
    headerTableId = "tableheader2";
    sortableTableId = "myTable";
    modelTableDirection(headerTableId, tdColNum, event)
    modelTableSortOrder(headerTableId, tdColNum, event)
    showTableSortOrderDir(headerTableId, event);
    sortModelArray = getTableSortOrder(headerTableId);
    mySort(sortableTableId, sortModelArray, event);
}

// On header click:
// 1. Change sort model and write it down into header attrs
// 2. Draw the header
// 3. Call getTableSortOrder
// 4. call mySort

