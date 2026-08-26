const td       = [].filter.call(
                   document.getElementsByTagName("td"),
                   ele => ele.innerText.length > 0 && ele.innerText.indexOf("1") == -1
                 ),
      key      = {},
      table    = document.getElementsByTagName("table")[0];
      genQsBtn = document.getElementById("genQs");

var selectedElements = [];

td.forEach((ele, i) => {
  ele.onclick = () => {
    if (selectedElements.includes(i)) {
      selectedElements.splice(selectedElements.indexOf(i), 1);
      ele.style.backgroundColor = "#717880";
      ele.style.color = "#212121";
    } else {
      selectedElements.push(i);
      ele.style.backgroundColor = "#1e2529";
      ele.style.color = "#F1F1F2";
    }
    console.log(selectedElements);
  };
  key[i] = ele.innerText.split("\n");
});

genQsBtn.onclick = () => {
  genQsBtn.style.backgroundColor = "#1e2529";
  genQsBtn.style.color = "#F1F1F2";
  setTimeout(() => {
    genQsBtn.style.backgroundColor = "rgb(189, 189, 189)";
    genQsBtn.style.color = "black";
  }, 1500);
  genQsBtn.style.display = "none";
  table.style.display = "none";
};