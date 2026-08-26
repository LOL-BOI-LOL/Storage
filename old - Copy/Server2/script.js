function lt() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    print('e')
    if (this.readyState == 4 && this.status == 200) {
      print('e')
      document.getElementById("messagearea").innerHTML = this.responseText;
    }
  };
  xmlhttp.open("GET", "https://replit.com/@LOLBOILOL/Server#server.php?q=load", true);
  xmlhttp.send();
}