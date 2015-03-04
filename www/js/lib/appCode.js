var email;
var USER_NAME = 5;
var found = false;
var yourBeacon;
var partyBeacon={beacon_major:-1000,beacon_minor:-1000};
var local_path = 'http://192.168.50.187:9999';
var heroku_path = 'https://fierce-dawn-6227.herokuapp.com';


    //error handling;adding to error element or triggering pop up window 
    //to do 
    function myError(text){
      console.log(text);
      window.alert(text);
    }


    function jsonCall(path,ext,object,callback)
    {
      $.ajax({
                    type: "GET", 
                    async: false,
                    dataType: 'jsonp', 
                    jsonp: 'callback', 
                    jsonpCallback: 'callbackFunction', 
                    url: path+ext, //ext = '/qry'
                    data: object,
                    crossDomain: true,
                    success: function(json){
                        callback(json);
                    },
                    error: function(){
                        myError("cannot conect to the web!");
                    }
                });
    }




    function myToArray(text){
      result=[];
      tmp = text.split(/[\s,:}{']/);
      for(var i=0;i < tmp.length;i++){
        if (tmp[i].length>0)
        {
          result.push(tmp[i]);
        }
      }
      return result;
    }

    function fetchEmail(array){
      result = [];
      for(var el in array){
        console.log(array[el]);
        if (array[el].indexOf('@')>0){
          result.push(array[el]);
        }
      }
      return result;
    }

    beaconFound = function(beacon,text,path){

    if ((beacon.major == partyBeacon.beacon_major) && (beacon.minor == partyBeacon.beacon_minor) && !found){
      request = path+"/in";
      info = {email:email,beacon_major:beacon.major,beacon_minor:beacon.minor};
      $.get(request,info);
      found = true;
      alert("Party beacon found:"+beacon.major);
      yourBeacon = beacon;
      console.log(beacon);
      } 
    } 

    checkIfBeaconLost = function(beacon,beaconInfo,path){
  
      lost = true;

      for(var i=0;i < beaconInfo.beacons.length;i++){

        if (beaconInfo.beacons[i].major===beacon.major){
          lost = false;
        }
      };

      if (lost){
          request = path+"/out";
          info = {email:email,beacon_major:beacon.major,beacon_minor:beacon.minor};
          $.get(request,info);
          //add logic if connection is lost
          alert('I lost you');        
          found = false;
      }
    };