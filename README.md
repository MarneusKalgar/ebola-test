#interact
Markup and coding for Interact.Agency Studio

##Quick start

* Install dev-dependencies `npm i`
* Install dependencies `bower i`
* Launch `gulp` to run watchers, server and compilers
* Launch `gulp production` to minify files for production

##Directory Layout

	interact                    # Project root
	├── /blocks/                # Source files
	├── /app/                   # Compiled files for developing
	├── /acc/                   # Minified files for production
	├── bower.json              # List of 3rd party libraries and utilities
	├── package.json            # Dependencies for node.js
	├── gulpfile.js             # gulp.js config
	├── LICENSE                 # License file
	├── README.md               # File you read
	└── smartgrid.js            # config for preprocessor grid