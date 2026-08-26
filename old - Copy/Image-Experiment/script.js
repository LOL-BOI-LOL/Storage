const fileReader = new FileReader();
const img = document.getElementsByTagName('img')[0];

fileReader.onloadend = () => {
  console.log(fileReader.result);
  img.src = fileReader.result;
}

fetch('https://image-experiment.lolboilol.repl.co/Test.png')
  .then(response => {
    return response.blob()
  })
  .then(blob => {
    fileReader.readAsDataURL(blob)
  });