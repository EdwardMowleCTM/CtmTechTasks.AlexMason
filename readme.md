SimpleGulp is the simplest possible starting point for prototyping front end features where you intend to write your own styles (with sass) and JavaScript from scratch. The only dependencies that this project uses are the build tools (gulp) required to compile sass (gulp-sass) and auto-update your changes in the browser (browser-sync).

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

If all you want to do is compile the scss files then you can use the gulp 'sass' task.

```
$ gulp sass
```

If you intend to make changes and want to see the affects in your browser immediate, then you can serve the project with browser-sync and watch sass compile and update in the browser automatically.

```
$ gulp serve
```
