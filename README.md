### Project Description
This is an app that shows the use of Corticon in an AngularJS healthcare app. Currently Corticon is only called for the gender question. 

### Directory Descriptions

    app.js                      --> main app for running server
    LICENSE.txt                 --> MIT License
    package.json                --> for npm
    README.md                   --> this file
    public/                     --> files for webpage
      css/                      --> css files
        app.css                 --> css file for making the HTML pretty
      img/                      --> images
        corticon.gif            --> corticon image
        logo.png                --> progress logo
      js/                       --> javascript files
        app.js                  --> declare top-level app module
        controllers.js          --> application controllers
        daterpickermin.js       --> MIT licensed code for the date picker
        directives.js           --> custom angular directives
        filters.js              --> custom angular filters
        services.js             --> custom angular services
    routes/                   
      api.js                    --> calls corticon and returns results 
    views/                      --> jade views
      main.jade                 --> jade that contains the rendered view of the app

### License
MIT