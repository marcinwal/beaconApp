// Define application object and common functions.
var element;
var info;

var app = (function()
{
	// Application object.
	var app = {};


	// Application data.
	app.currentScreenId = null;
	app.beaconColorStyles = [
		'style-color-unknown style-color-unknown-text',
		'style-color-mint style-color-mint-text',
		'style-color-ice style-color-ice-text',
		'style-color-blueberry-dark style-color-blueberry-dark-text',
		'style-color-white style-color-white-text',
		'style-color-transparent style-color-transparent-text'];
	app.proximityNames = [
		'unknown',
		'immediate',
		'near',
		'far'];

	// ------------- Private helper function ------------- //



  function onDeviceReady() {
        element = document.getElementById('deviceProperties');
        // element.innerHTML = 'Device Model: '    + device.model    + '<br />' +
        //                     'Device Cordova: '  + device.cordova  + '<br />' +
        //                     'Device Platform: ' + device.platform + '<br />' +
        //                     'Device UUID: '     + device.uuid     + '<br />' +
        //                     'Device Version: '  + device.version  + '<br />';

        info = document.getElementById('beaconInfo');

        element.innerHTML ='';     
        info.innerHTML ='';

        var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");

				deviceInfo.get(function(result) {        	
        						phoneData = myToArray(result);
   						      emails = fetchEmail(phoneData);
   						      if (emails[0] === undefined){myError("email of mobile user is unknown");}
   						      email = emails[0];
   						      element.innerHTML = email; 
                    info.innerHTML = "Hello"+email;
   						      // alert("Hello "+email);
   						      jsonCall(heroku_path,"/qry",{email:email},function(json){
   											partyBeacon={beacon_major:json.beacon_major,beacon_minor:json.beacon_minor};
   										  // alert("Beacon party details: "+partyBeacon.beacon_major+"/"+partyBeacon.beacon_minor);
                        info.innerHTML = "Beacon party details: "+partyBeacon.beacon_major+"/"+partyBeacon.beacon_minor;
                        //added
                        app.startScanningBeacons();
                        app.startRangingBeacons();
   						      });
    		});                            
   
    }


	// ------------- Application functions ------------- //

	app.initialize = function()
	{

	}

	app.formatDistance = function(meters)
	{
		if (!meters) { return 'Unknown'; }

		if (meters > 1)
		{
			return meters.toFixed(3) + ' m';
		}
		else
		{
			return (meters * 100).toFixed(3) + ' cm';
		}
	};

	app.formatProximity = function(proximity)
	{
		if (!proximity) { return 'Unknown'; }

		// Eliminate bad values (just in case).
		proximity = Math.max(0, proximity);
		proximity = Math.min(3, proximity);

		// Return name for proximity.
		return app.proximityNames[proximity];
	};

	app.beaconColorStyle = function(color)
	{
		if (!color)
		{
			color = 0;
		}

		// Eliminate bad values (just in case).
		color = Math.max(0, color);
		color = Math.min(5, color);

		// Return style class for color.
		return app.beaconColorStyles[color];
	};

	app.showScreen = function(screenId)
	{
		// Hide current screen if set.
		if (app.currentScreenId != null)
		{
			$('#' + app.currentScreenId).hide();
		}

		// Show new screen.
		app.currentScreenId = screenId;
		$('#' + app.currentScreenId).show();
		document.body.scrollTop = 0;
	};

	app.showHomeScreen = function()
	{
		app.showScreen('id-screen-range-beacons');
	};

	app.onNavigateBack = function()
	{
		history.back();
	};

	// ------------- Initialisation ------------- //

	document.addEventListener('deviceready', onDeviceReady, false);

	app.showHomeScreen();

	// ------------- Return application object ------------- //

	return app;

})();
