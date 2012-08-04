# Mmxii Earth Tweet Visualizer

This application visualizes tweets on a 3D globe surface.

As an example, it uses tweets related to a certain famous sport event happening in summer 2012 in the UK.

It uses the following technologies:

- [WebGL Earth](http://www.webglearth.org/) to render and manipulate a 3D webgl globe
- [DataSift](http://datasift.com/) to provide real time social data (tweets with a geolocation value)

The application runs on a very simple Express and Socket.io stack and can be easily deployed on [Nodejitsu](http://nodejitsu.com/).

## Development

Assuming you have Node (with npm) and Coffescript installed. After cloning the repository, cd into the project directory:

    npm install

To run the app server, just type:

    make devserver

All client side code is container inside `client/src`. The bundle gruntfile will take card of compiling, concatenating and minifying them in the right location.
All you need to do is run

    grunt

It will keep watching `client/src` for changes and regenerate all files.
