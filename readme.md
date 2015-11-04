SimpleGulp is the simplest possible starting point for prototyping front end features where you intend to write your own Sass and JavaScript from scratch. The npm dev dependencies are the build tools required to compile sass and auto-update your changes in the browser. They are:

* gulp
* gulp-sass
* browser-sync

# Getting setup

Clone this repository into a directory on your machine.

```
$ git clone https://github.com/SevenInitiative/SimpleGulp.git
```

Navigate into the new directory.

```
$ cd SimpleGulp
```

Install all required dev tools and dependencies with the node package manager.

```
$ npm install
```

If all you want to do is compile the Sass files then you can use the gulp 'sass' task.

```
$ gulp sass
```

If you intend to make changes and want to see the affects in your browser immediately then you can serve the project with browser-sync and watch as your sass compiles and update automatically.

```
$ gulp serve
```
