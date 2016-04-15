# Getting started

Before getting this project and the build tools that come with it working on your machine you will need to install [Git](http://git-scm.com) and [NodeJS](http://nodejs.org). Once these are installed, you can open the "Git Bash" command line interface and follow the instructions below:

Use the "cd" command to "change directory" to where you want the project to be saved (eg: your Desktop).

```
$ cd Desktop/
```

Use the git clone command to copy the repository from GitHub into the choosen directory on your machine.

```
$ git clone https://github.com/EdwardMowleCTM/CtmTechTasks.AlexMason.git
```

This will create a new folder with the project files inside. Navigate into the new directory (with the "cd" command again).

```
$ cd CtmTechTasks.AlexMason
```

Install all of required build tools and dependencies using the node package manager.

```
$ npm install
```

The packages that this command will install are defined in the package.json. For this project I've included:

* gulp (a build tool).
* gulp-sass (for compiling SASS to CSS).
* browser-sync (for running a local server and auto-refreshing your CSS).

I've configured Gulp for you (to get you started) by defining a "serve" task in gulpfile.js.

```
$ gulp serve
```

Running the "gulp serve" command will create a local server (using browser-sync) which serves the project.
