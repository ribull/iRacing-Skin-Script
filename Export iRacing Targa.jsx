/*
Save a targa to the iRacing skins folder for quick in game viewing
*/

#target photoshop

// Need to make sure that a document is open and we're in the iRacing skins folder before we generate
if (app.documents.length > 0)
{
	// Now we'll check to see the config file exists
	var configFile = new File(app.activeDocument.path.parent + '/iracing_skins_script_config.json');
	if (configFile.exists)
	{
		// Then we read the config in
		configFile.open('r');
		var fileString = configFile.read();
		configFile.close();

		var config = eval('(' + fileString + ')');

		// Get the folder we'll save the targa in
		var iRacingSkinsFolder = Folder.myDocuments;
		iRacingSkinsFolder.changePath('./iRacing/paint');
	
		var carName = app.activeDocument.path.displayName;
		iRacingSkinsFolder.changePath(carName);
	
		// Are there any alpha channels?
		var alphaChannels = false;
		for (var channelIndex = 0; channelIndex < app.activeDocument.channels.length; channelIndex++)
		{
			var channel = app.activeDocument.channels[channelIndex];
			if (channel.kind == ChannelType.MASKEDAREA
				|| channel.kind == ChannelType.SELECTEDAREA
				|| channel.kind == ChannelType.SPOTCOLOR)
			{
				alphaChannels = true;
			}
		}
		
		// Set the save options and file names
		var saveOptions = new TargaSaveOptions();
		saveOptions.alphaChannels = alphaChannels;
		saveOptions.resolution = alphaChannels ? TargaBitsPerPixels.THIRTYTWO : TargaBitsPerPixels.TWENTYFOUR;
		saveOptions.rleCompression = true;
	
		var fileName = 'car_';
		if (app.activeDocument.name.indexOf('spec') != -1)
		{
			fileName += 'spec_';
		}
		else if (app.activeDocument.name.indexOf('num') != -1)
		{
			fileName += 'num_';
		}
		else if (app.activeDocument.name.indexOf('decal') != -1)
		{
			fileName += 'decal_';
		}
	
		if (app.activeDocument.name.indexOf('team') != -1)
		{
			fileName += 'team_'		
		}
	
		fileName += config.iRacingId + '.tga';
	
		var fullFile = new File(iRacingSkinsFolder + '/' + fileName);

		var shouldSave = true;
		if (fullFile.exists && config.overwriteDialog)
		{
			if (!confirm("'" + fullFile.name + "' exists, overwrite: Yes or No?", true))
			{
				shouldSave = false;
			}
		}
	
		if (shouldSave)
		{
			app.activeDocument.saveAs(fullFile, saveOptions, true, Extension.LOWERCASE);
		}
	}
}
