
let tablestring = "<tr><td>15</td><td>13.03.2003 14:12:22</td><td>John</td></tr>\n" +
                    "<tr><td>16</td><td>23.03.2003 14:12:22</td><td>Jon</td></tr>";

function addElement() {
   let table = document.getElementById('myTable');
   table.insertAdjacentHTML('beforeend', tablestring);
}
 
