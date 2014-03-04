yamj-iSkn2
==========

iSkin2, the HTML skin for YAMJ

For developers:

Use a git client to clone https://github.com/gfb107/yamj-iSkin2.git to a directory on your computer

Download and install Sencha Cmd 3.0.0.250 from:
	http://cdn.sencha.com/cmd/3.0.0.250/SenchaCmd-3.0.0.250-windows.exe.zip
	http://cdn.sencha.com/cmd/3.0.0.250/SenchaCmd-3.0.0.250-osx.app.zip
	http://cdn.sencha.com/cmd/3.0.0.250/SenchaCmd-3.0.0.250-linux-x64.run.zip
	http://cdn.sencha.com/cmd/3.0.0.250/SenchaCmd-3.0.0.250-linux.run.zip

Open a command-line window, and switch into the directory containing the cloned git repo, for example
	cd \Users\<user>\Docments\GitHub\yamj-iSkin2

Run the following command:
	sencha app build package
	
Create a distribution .zip file:
	xcopy /s builds\iSkin\package\* iSkin2\html
	zip -r iSkin2.zip iSkin2
