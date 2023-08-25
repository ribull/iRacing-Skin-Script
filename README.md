# iRacing Skin Script
Are you tired of saving targa files in order to be able to view your skin in the iRacing client? Did you come from making skins in AC and got super frustrated by the process to view skins in iRacing? This is a script for you!

### Requirements
For now I've only written this for Photoshop and it's only been tested in Photoshop 2023, though I'm sure it would work in older versions as well. If I get enough requests I'll modify for gimp as well

### Usage
Two files are included as a part of this repo:
1. `iracing_skins_script_config.json`: The configuration file for the script.
2. `Export iRacing Targa.jsx`: The script itself.

The script relies on a file structure in order to prevent it from running _every_ time you save a psd in Photoshop. The file structure is as follows:
```
└── <parent_folder>
    ├── iracing_skins_script_config.json
    └── <iracing_car_specific_folder_name>
        └── any_skin.psd
    └── dallarap217
        ├── epic_skin.psd
        ├── epic_skin_spec.psd
        └── epic_skin_decal.psd
    └── ferrari488gt3
        └── coolest_ever.psd
    └── ...
        └── ....psd
```
The script will not run if there is not an `iracing_skins_script_config.json` in the folder above the folder that the PSD file is in. This prevents the script from running for _every_ photoshop file you're working on, even if it has nothing to do with iRacing skins.

Firstly, set up your file structure. Place the `iracing_skins_script_config.json` file in a folder, then create a new folder in that same directory with the name of the car that iRacing uses. You can find a list of those names on [Trading Paints](https://www.tradingpaints.com/cartemplates) or in your own Documents/iRacing/paints folder:

![Screenshot iRacing Trading Paints Car ID Example](https://github.com/ribull/iRacing-Skin-Script/assets/28760805/09f4c68a-cf1e-49c6-adfa-c222a2114d6e)
You will create the photoshop file in this car specific folder.

Secondly, modify the config file (`iracing_skins_script_config.json`). You can do this using any file editor, I usually use notepad. It only has two values:
- `iRacingId`: this is your iRacing customer ID that trading paints and iRacing use to ID all the skins. You can find the customer ID using [this guide](https://help.tradingpaints.com/kb/guide/en/how-do-i-find-my-iracing-customer-id-number-tpmha6PFJu/Steps/2458380) from trading paints, or going to trading paints, clicking the avatar in the top right, selecting `View profile`, then checking the URL. The number that appears before your name should be your iRacing customer ID.

![iRacing Customer ID Example](https://github.com/ribull/iRacing-Skin-Script/assets/28760805/5c2b25b6-d029-4e81-a858-c7504d95976f)
- `overwriteDialog`: this can either be `true` or `false` and directs whether or not photoshop will prompt you to overwrite an existing tga file if one exists. If it's `true`, photoshop will ask you if you want to overwrite. If it's `false`, it will overwrite without prompting.

Thirdly, set up the script. You can actually run the script in an ad-hoc fashion by, in Photoshop, going to `File > Scripts... > Browse` and selecting the script, but I highly recommend adding to the Event Manager. To do this
1. In photoshop, go to `File > Scripts > Scripts Event Manager...`
2. In the `Photoshop Event` dropdown select `Save document`
3. In the `Script` dropdown select `Browse...`, find wherever you downloaded `Export iRacing Targa.jsx`, select it
4. Click Add, then Done

![Script Events Manager Image](https://github.com/ribull/iRacing-Skin-Script/assets/28760805/efa834a7-951b-4d66-8235-07368a064fd8)

And that's it! The script should run and export a tga file every time you save.

### Notes
- As noted above, the script will only run if a document is open and there is an `iracing_skins_script_config.json` in the folder above the folder the psd resides in
- It will save a 32 bit tga if there is any alpha channels, otherwise a 24 bit tga
- If the file name contains `spec`, `decal`, or `num`, the script will save the tga with the correct file name for `spec`, `decal`, or `num` files
- If the file name contains `team`, it will save the file with `team` in the name as is the correct file name for team skins. Note: it will still use the `iRacingId` specified in the config, and your team ID will be different than your own iRacing customer ID.
- Whatever is the last psd saved in a given folder will be the tga that's in the iRacing folder. In other words, you can have multiple skins, multiple psds in a given folder, but only the latest one saved will exist as a real skin.
