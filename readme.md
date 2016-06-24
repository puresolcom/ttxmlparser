# Tradetracker Live XML Parser

Displaying live big XML feeds processing using Laravel5.2, Angular2, XMLParser and Pusher

  - Enter Valid XML File URL prod
  - Press "Process"
  - Magic Happens :)
  - 
  
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

### Tech

TTXMLParser uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Gulp] - the streaming build system
* [Pusher] - For real-time data streaming
