<?php
if(isset($_GET['f']) && file_exists("../protected/sgf/$_GET[f]")){
  echo file_get_contents("../protected/sgf/$_GET[f]");
}
else if(isset($_GET['callback']) && file_exists("../protected/sgf/$_GET[jsonpf]")){
  $json = $_GET['callback'].'({sgf:"'.file_get_contents("../protected/sgf/$_GET[jsonpf]").'"})';
  echo $json;
}
else{
  echo '(;GM[1]FF[4]CA[UTF-8]SZ[19])';
}
