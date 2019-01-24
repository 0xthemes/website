<?php



	$preview_stat = 1;



	if( isset( $_GET["item_id"] ) && $_GET["item_id"] != '' ){

		$json_0xthemes = file_get_contents( "http://beta.0xthemes.com/api/get_demo_url?item_id=". htmlspecialchars( $_GET["item_id"] ) );

		if( $json_0xthemes ){

			$preview_details = json_decode( $json_0xthemes, true );

			if( empty( $preview_details ) ){

				$preview_stat = 0;

			}

		}else{

			$preview_stat = 0;

		}

	}else{

		$preview_stat = 0;

	}

	

	if( $preview_stat ){

		$site_title = $preview_details[0]["node"]["title"];

		$market_theme_url = 'http://beta.0xthemes.com/' . $preview_details[0]["node"]["url"];

		$demo_url = $preview_details[0]["node"]["demo_url"];

		$buy_txt = "Buy Now";

		$remove_txt = "Remove Frame";

	}else{

		header('Location: http://0xthemes.com/');

	}

?>



<!doctype html>

<html lang="zxx">

<head>

	<meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<title><?php echo $site_title; ?></title>

	<!-- Main Style -->

    <link rel="stylesheet" type="text/css" href="assets/css/style.css">

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-125935362-3"></script>
	<script>
	 window.dataLayer = window.dataLayer || [];
	 function gtag(){dataLayer.push(arguments);}
	 gtag('js', new Date());
	
	 gtag('config', 'UA-125935362-3');
	</script>

</head>



<body class="full-screen-preview">



	<div class="preview-header">

		<div class="market-logo">

			<img src="assets/images/market-logo.png" class="img-fluid" alt="0xthemes" />

		</div>

		<div class="header-right-part">

			<div class="theme-buynow-btn">

				<a href="<?php echo $market_theme_url; ?>" class="btn theme-btn" target="_self"><?php echo $buy_txt; ?></a>

			</div>

			<div class="remove-frame-pack">

				<a href="<?php echo $demo_url; ?>" class="btn remove-frame" target="_self"><span class="close remove-frame-icon"></span> <?php echo $remove_txt; ?></a>

			</div>

		</div>

	</div>



	<iframe class="full-screen-preview-frame" src="<?php echo $demo_url; ?>"></iframe><!-- http://themes.thefightclub.network/ -->

	

	<!-- jQuery Library -->

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

	<!-- Theme Custom Js -->

	<script src="assets/js/custom.js"></script>

	

</body>

</html>

