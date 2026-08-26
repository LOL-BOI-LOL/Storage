document.getElementById("count").addEventListener("click", resetCount);
function resetCount() {
  document.getElementById('count').innerHTML = '99:99';
}
function countDown() {
  let curTime = [parseInt(document.getElementById('count').innerHTML.split(':')[0]),parseInt(document.getElementById('count').innerHTML.split(':')[1])];
}