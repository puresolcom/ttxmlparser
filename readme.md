# Tradetracker Live XML Parser

Displaying live big XML feeds processing using Laravel5.2, Angular2, XMLParser and Pusher

  - Enter Valid XML File URL prod
  - Press "Process"
  - Magic Happens :)
  
### Installation

- Docker and Docker-compose should be already installed
- Clone this repository into any directory
- Point your terminal to the [project_dir]/laradock
- Run Command "docker-compose up -d nginx"
- After docker containers get installed and boot up successfully
- Run Command "docker exec -it laradock_workspace_1 /bin/bash
- Inside the laradock_workspace_1 bash Run Command "cd /var/www/laravel"
- Inside the laravel dir Run Command "composer install" to install laravel and required composer packages"
- Point your browser to http://127.0.0.1/angular 
- That's It :)

### Notes
1 - Package Directory Location (packages/tradetracker/xml-parser/src)
2 - Unit testing configuration file (phpunit.xml) - 95% Code Coverage
3 - Angular Source files are located at "resources/assets/typescript"
4 - Sass file "resources/assets/sass"

### URGENT NOTE :
Current parser will parse only maximum of 1000 record, However to change this limitation behavior we could modify the constant value of "MAX_COUNT" located at the HomeControler.php file "ttxmlparser/app/Http/Controllers/HomeController.php"


### Real-world situation

In real work situation I'd fire events to push real-time data and workers to process the data feed,
So please consider both front-end and back-end solutions as A proof of concept and not a production code (It's just a few hours task)

Thanks for your understanding

### Tech

TTXMLParser uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Gulp] - the streaming build system
* [Pusher] - For real-time data streaming
