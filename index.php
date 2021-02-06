

<!-- UPDATE_FOR_USE? -->
<!-- Web audio examples: https://mdn.github.io/webaudio-examples/stereo-panner-node/
		https://github.com/mdn/webaudio-examples/blob/master/stereo-panner-node/index.html
-->
<head>
	<title>Phantasmauris</title>

	<base href="UPDATE_FOR_USE" target="_self" />

	<meta charset="UTF-8" />
	<meta name="description" content="Phantasmauris is a project by Hyunji Jung. Supported by CBK Rotterdam. Developed in 2020. Design by Noemi Biro" />
	<meta name="keywords" content="sound recording Rotterdam space walk" />
	<meta name="author" content="Hyunji Jung" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv=”Refresh” content=”0;URL=https://www.phantasmauris.xyz” />


	<link rel="stylesheet" type="text/css" href="css/default.css" /> <!-- UPDATE_FOR_USE? -->
	<link rel="icon" href="/img/favicon.ico" type="image/x-icon" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="javascript.js"></script>
</head>

<frameset cols='*'>
<frame name='main' src='https://phantasmauris.xyz/' scrolling='auto' noresize>
<noframes>

<body>
	<!-- Loader -->
	<div id="load_screen">
		<div id="load-img">
			<img src="img/loading-s.png">
		</div>
		<div id="contain-load-flex">
			<div id="loading">Hi! This project uses GPS location and audio output. Please allow.
			</div>
			<div id="div-enter">
				<button class="hide" id="enter-website-button">
					<span> ENTER </span>
				</button>
			</div>
		</div>
	</div>
	<!-- WRAPPER OPEN -->
	<div id="wrapper">
		<!-- <div id="wrapper" onmousemove="myFunction(event)" onmousedown="myFunction(event)"> -->
		<!-- HEADER OPEN -->
		<div id="header">
			<!-- <div id="logo">
					<img class="UPDATE_FOR_USE" src="/img/UPDATE_FOR_USE" alt="UPDATE_FOR_USE" />
				</div> -->
			<div class="navbar__container">
				<a id="listen" class="active" href="./">LISTEN</a>
				<div class="navbar__right-items">
					<button class="navbar__menu js-nav-btn" id="menu-button">
						<span id="js-nav-close"  class="js-nav-close hide" > CLOSE </span>
						<span id="js-nav-open" class="js-nav-open"> ABOUT </span>
					</button>
				</div>
			</div>

			<div id="nav">
				<ul>
					<!-- <li><span id="about_button">ABOUT</span></li> -->
					<!-- <li><span id="locations_button">LOCATIONS</span></li> -->
				</ul>
			</div>
			<!-- NAV CLOSE -->
		</div> <!-- HEADER CLOSE -->
		<!-- About page -->
		<div id="about" class="hide">

			<div id="about-content">
				<h3>Phantasmauris</h3>
				<p> Phantasmauris is a location-based electroacoustic composition consists of five tracks. Developed as an aural augmented reality platform, audiences can listen to different soundscapes in each suggested location. </p>
				<p> Each track is arranged with field recordings and their digitally processed signals based on the correlations between sound, space and listeners. The sounds are recorded in quarantined Rotterdam to explore the shifted sonic quality of the city. </p>
				<p> The project combines the psychogeopraphic process of cartography and composition in a form of acousmatic music in the spectromorphological perspective. </p>

				<p> Phantasmauris is a project by
					<a href="https://hyunjijung.com/" target="_blank">Hyunji Jung.</a>
					<br> Supported by CBK Rotterdam, 2020 <br>
					<span style="font-size:0.7rem">Design by
						<a href="https://noemibiro.com/" target="_blank">Noemi Biro</a>
					</span></p>
				<h3 id="locations_button">Locations map</h3>
			</div>
			<div id="about-img">
				<img src="img/loading-clearer-s.jpg">
			</div>
		</div>
		<!-- Locations -->
		<div id="locations" class="hide">
			<div id="buttonsLocations">
				<img src="img/buttons-01.png"/>
				<div id="locationsInfo" >
					<img id="infoSwitcherUI" src="img/buttons-02.png"/>
				</div>
			</div>
			<div id="map-container">
				<img id="oldimg" src="img/map-grey.jpg"/>
				<img id="infoMap" class="hide" src="img/map-info.jpg"/>
			</div>
		</div>
		<!-- CONTENT OPEN -->
		<div id="content">
			<div id="temp">
				<div id="static">
					<img id="change-img" src="img/holder3-loading2-01-s.jpg"/>
				</div>
				<div id="tempInfo">
					<p> Phantasmauris is a project by
						<a href="https://hyunjijung.com/" target="_blank">Hyunji Jung.</a>
						<br> Supported by CBK Rotterdam, 2020 <br>
						<span style="font-size:0.7rem">Design by
							<a href="https://noemibiro.com/" target="_blank">Noemi Biro</a></span>
				</div>
			</div>
			<div id="audio-wrapper">
				<audio id="audio" controls="controls" loop>
					<source id ="audioSource" src=" " type="audio/mp3">
				</audio>
			</div>
			<!-- <h2>Set stereo panning</h2>
			<input class="panning-control" type="range" min="-1" max="1" step="0.1" value="0">
			<span class="panning-value">0</span> -->
			<p id="demo"></p>
		</div> <!-- CONTENT CLOSE -->
		<!-- FOOTER OPEN -->
		<div id="footer">

		</div> <!-- FOOTER CLOSE -->
	</div> <!-- WRAPPER CLOSE -->

	<!-- START ANALYTICS -->
	<!-- GOOGLE OPEN -->
	<script>
		// (function(i, s, o, g, r, a, m) {
		// 	i['GoogleAnalyticsObject'] = r;
		// 	i[r] = i[r] || function() {
		// 		(i[r].q = i[r].q || []).push(arguments)
		// 	}, i[r].l = 1 * new Date();
		// 	a = s.createElement(o),
		// 		m = s.getElementsByTagName(o)[0];
		// 	a.async = 1;
		// 	a.src = g;
		// 	m.parentNode.insertBefore(a, m)
		// })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
		//
		// ga('create', 'UPDATE_FOR_USE', 'auto');
		// ga('send', 'pageview');
	</script> <!-- GOOGLE CLOSE -->
	<!-- END ANALYTICS -->
</body>

</noframes></frameset>

</html>
