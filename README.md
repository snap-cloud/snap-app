# Snap<em>!</em>-App

A desktop application for [Snap<em>!</em>][snap]

[snap]: https://github.com/jmoenig/Snap--Build-Your-Own-Blocks

## Download & Use
To download the application for your own use, visit the [releases page][releases].

[releases]: https://github.com/cycomachead/snap-app/releases/latest

(Sorry for the cryptic file names. We'll work on cleaning those up!)

Supported platforms:

* macOS & OS X
	* The file name should have "drawin" in it - you probably want the `.zip` version.
	* Minimum OS required: OS X 10.tbd
* Windows
	* Minimum OS required: I have no idea. (yet)
* Linux (?)
	* Minimum OS required: I have no idea. (yet.)
	* I don't think auto-update will work.

## Overview

This app is built using Electron, a node.JS-based framework for building desktop applications using Javascript and other web technologies (such as the way Snap<em>!</em> is built. :smile:)

#### Cloning
**NOTE:** This project uses submodules! You must clone with `--recursive`

```sh
git clone --recursive git@github.com:cycomachead/snap-app
```
(or you can manually setup the submodules yourself, if you're into that thing.)

#### Quick Start
Before you install the app, you'll need:

* `git` (probably already installed)
* `node` (nodeJS >6.0)
* `electron` (TODO)

```
git clone --recursive git@github.com:cycomachead/snap-app
cd snap-app
npm install -g electron
npm install
npm run start
```
#### Code
* `app/`
   * `snap/` - don't touch this. It's a direct copy of the latest Snap<em>!</em> source code.
   * `snap-app/` - the modifications that make this app work.
   * `snap.html` - the main file that serves the app
   * `main.js` - the entry point for starting the app.

#### Building The App

##### Dependencies
This section is TODO.

* Code Signing
* Publishing to GitHub

```
brew install wine --without-x11 # windows
brew install mono
brew install gnu-tar graphicsmagick xz #linux
```
[More info][deps]

[deps]: https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build

#### License [AGPL](LICENSE.md)
