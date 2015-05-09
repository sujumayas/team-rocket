<?php
 
$app_id     = "157411";
$app_secret = "ee821bce99e730c1d6aff0ef5541c5eb";
$my_url     = "http://localhost";
 
session_start();
$code = $_REQUEST["code"];
 
if(empty($code)){
	$_SESSION['state'] = md5(uniqid(rand(), TRUE)); //CSRF protection
 
	$dialog_url = "https://connect.deezer.com/oauth/auth.php?app_id=".$app_id
		."&redirect_uri=".urlencode($my_url)."&perms=email,offline_access"
		."&state=". $_SESSION['state'];
 
	header("Location: ".$dialog_url);
	exit;
 
	}
 
if($_REQUEST['state'] == $_SESSION['state']) {
	$token_url = "https://connect.deezer.com/oauth/access_token.php?app_id="
	.$app_id."&secret="
	.$app_secret."&code=".$code;
 
	$response  = file_get_contents($token_url);
	$params    = null;
	parse_str($response, $params);
	$api_url   = "https://api.deezer.com/user/me?access_token="
			.$params['access_token'];
 
	$user = json_decode(file_get_contents($api_url));
	echo("Hello " . $user->name);
}else{
	echo("The state does not match. You may be a victim of CSRF.");
}
?>