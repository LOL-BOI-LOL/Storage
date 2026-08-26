<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Chat Room</title>
    <style>
      body {
        margin:0px;
      }
      #top {
        background-color:rgb(19,21,32);
        color:rgb(216,220,246);
      }
      .top {
        display:inline-block;
        font-size:20px;
        margin:0vw;
      }
      #title {
        font-size:20px;
        margin:25px 50px 30px 30px;
      }
      #login {
        margin-right:30px;
      }
      #chatrooms {
        font-size:40px;
      }
      #messagespace {
        overflow: auto;
        height:400px;
        width:75%;
        margin:20px 12.5% 0px 12.5%;
        border: 3px solid black;
        border-radius: 6px;
      }
      .message {
        width:500px;
        overflow:auto;
        display:block;
        border:2px solid black;
        margin:5px;
      }
      #roomselec {
        display:inline-block;
      }
      #c {
        display:inline;
      }
      #rooms {
        position:relative;
      }
      #rooms2 {
        position:absolute;
        margin-top:1px;
        margin-left:-13px;
      }
      .r {
        min-width: 20px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 12px 16px;
        z-index: 1;
        display:none;
        background-color:rgb(19,21,32);
        margin:0px;
      }
      #roomselec:hover .r {
        display:block;
      }
      a {
        color:rgb(216,220,246);
        text-decoration:none;
      }
    </style>
  </head>
  <body>
    <div id='top'>
      <p id='title' class='top'>undefined <span id='chatrooms'>Chat Rooms</span></p>
      <a id='login' class='top'>Login</a>
      <div id='roomselec'>
        <p id='rooms' class='top'>Rooms</p>
        <div id='rooms2'>
          <a href='https://anotherone.lolboilol.repl.co/?room=1&type=r' id='room1' class='r'>Room 1</a>
          <a href='https://anotherone.lolboilol.repl.co/?room=2&type=r' id='room2' class='r'>Room 2</a>
          <a href='https://anotherone.lolboilol.repl.co/?room=3&type=r' id='room3' class='r'>Room 3</a>
        </div>
      </div>
    </div>
    <div id='messagespace'>
    <?php
      $R = "room";
      $R .= $_GET["room"];
      $R .= ".txt";
      $T = $_GET["type"];
      if ($T == "r") {
        $myfile = fopen($R, "r");
        echo fread($myfile,filesize($R));
        fclose($myfile);
      }
    ?>
    </div>
  </body>
</html>