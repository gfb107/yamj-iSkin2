var nmt = {
  device: null,
  
  setDevice: function( device )
  {
	this.device = device;
  },
  
  getAddress: function() {
	return this.device.address;
  },
  
  doneUrl: "file:///share/index.htm",
  
  setDoneURL: function( url )
  {
  	this.doneUrl = url;
  },
  
  get: function(url)
  {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
		if ( req.readyState == 4 && req.status == 200 )
		{
			var returnValue = parseInt(req.responseXML.documentElement.getElementsByTagName('returnValue')[0].firstChild.nodeValue);
			if ( returnValue != 0 ) {
				alert( "Command failed!" );
			}
		}
	};
	req.onerror = function() {
		alert( 'There was an error sending the command to the player' );
	};
    req.open( "GET", url, true );
    req.send( null );
  },
  
  getShareInfo: function( fileUrl )
  {
	var pos = fileUrl.lastIndexOf( '/' );
	var path = fileUrl.substring( 0, pos );
	
	var url = "http://" + this.getAddress() + ':8008/file_operation?arg0=get_user_storage_file_info&arg1=' + path;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
		if ( req.readyState == 4 )
		{
			nmt.playShare( fileUrl );
		}
    };
	console.log( "Blindly requesting " + url );
    req.open( "GET", url, true );
    req.send( null );	
  },

  playShare: function( file )
  {
	file = this.fixFile( file );
	var title = this.getTitle( file );
	var url = 'http://' + this.getAddress() + ':8008/playback?arg0=start_vod&arg1=' + title + '&arg2=' + file + '&arg3=show&arg4=';

	this.get( url );
  },

  convert: function( cmd )
  {
    if ( cmd == "ok") return "enter";
    if ( cmd == "rew") return "rewind";
    if ( cmd == "timeseek") return "time%20seek";
    if ( cmd == "capsnum") return "caps/num";
	if ( cmd == "1" ) return "one";
	if ( cmd == "2" ) return "two";
	if ( cmd == "3" ) return "three";
	if ( cmd == "4" ) return "four";
	if ( cmd == "5" ) return "five";
	if ( cmd == "6" ) return "six";
	if ( cmd == "7" ) return "seven";
	if ( cmd == "8" ) return "eight";
	if ( cmd == "9" ) return "nine";
	if ( cmd == "0" ) return "zero";
	return cmd;
  },
  
  command: function( cmd )
  {
    if ( this.device == null )
    {
      alert( "nmt.setDevice hasn't been called." );
	  return;
    }
	
	var url = null;
	if ( this.device.series == 1 )
    {
      url = 'http://' + this.getAddress() + ':9999/PLoNK_web/plonk_nmt.php?func=' + cmd;
    }
	else
	{
	  url = 'http://' + this.getAddress() + ':8008/system?arg0=send_key&arg1=' + this.convert( cmd );
	}
	
	this.get( url );
  },
  
  fixFile: function( file )
  {
	var slash = file.lastIndexOf( '/' );
	var name = file.substring( slash + 1 ).toUpperCase();
	if ( name == "VIDEO_TS" || name == "" ) {
		return file.substring( 0, file.length - name.length - 1 );
	}

	return file;
  },  
  
  getTitle: function( file )
  {
	var pos = file.lastIndexOf( '/' );
	if ( pos != -1 )
	{
	  var dot = file.lastIndexOf( '.' );
	  if ( dot > pos )
	  {
		file = file.substring( pos + 1, dot );
	  }
	  else
	  {
		file = file.substring( pos + 1 );
	  }
	}

	return file;
  },
  
  playAll: function( jspFile, files )
  {
	if ( this.device == null )
	{
		alert( "nmt.setDevice hasn't been called" );
		return;
	}
	
	if ( this.device.series == 1 )
	{
		this.play( jspFile );
	}
	else 
	{
		this.play( files[ 0 ]);
	    nmt.fileIndex = 1;
		nmt.files = files;
		window.setTimeout( 'processQueue()', 200 );
	}
  },
  
  files: null,
  
  fileIndex: 1,
  
  processQueue: function()
  {
	var file = this.files[ this.fileIndex ];
	this.fileIndex++;

    var cmd = 'http://' + this.getAddress() + ':8008/playback?arg0=insert_vod_queue&arg1=' + encodeURI(this.getTitle( file )) + '&arg2=' + encodeURI(file) + '&arg3=show&arg4=';
    this.get( cmd );
	
	if ( this.fileIndex < this.files.length )
	{
		window.setTimeout( 'processQueue()', 200 );
	}
  },
  
  zeroConfigPrefixes: [ "smb:", "nfs:", "nfs-tcp:" ],
  
  play: function( file )
  {
    if ( nmt.device == null )
    {
      alert( "nmt.setDevice hasn't been called." );
	  return false;
    }

	var url = null;
	if ( this.device.series == 1 )
	{
      url = 'http://' + this.getAddress() + ':9999/PLoNK_web/plonk_nmt.php?play=' + file.replace("%","%25%25");
      if ( this.doneUrl != null )
      {
        url = url + '&done=' + this.doneUrl;
      }
      this.get( url );
	}
	else
	{
		var slash = file.indexOf('/');
		if ( this.zeroConfigPrefixes.indexOf( file.substring( 0, slash )) == -1 )
		{
			file = this.fixFile( file );
			var title = this.getTitle( file );
			url = 'http://' + this.getAddress() + ':8008/playback?arg0=start_vod&arg1=' + title + '&arg2=' + file + '&arg3=show&arg4';
			this.get( url );
		}
		else
		{
			this.getShareInfo( file );
		}
	}
	
	iSkin.app.showRemote();
	
	return false;
  }
};

function processQueue()
{
	nmt.processQueue();
};
