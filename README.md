# DynamicAfrica
Study project to implement a web mapping application for the visualisation of time dependent statistical data. The development of "percentage of population using the internet", "human development index" and "population size" between 2000 and 2016 are shown. Additionally types (classes) of similar internet usage developments have been calculated and are visualized, while the number of types can be selected by the user.   

![Alt Text](https://github.com/lukasalexanderweber/DynamicAfrica/blob/master/gif/ezgif.com-video-to-gif.gif)

This website was developed using Mozilla Firefox which is capable of dynamicly loading local JSON files as done in the D3 and leaflet parts. Other browsers like Google Crome prohibit such an asynchronous call of such local files. To test or change the application in browsers like Chrome you need to run a testserver. An example for setting up a testserver using Python is discribed in the following (adapted from https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server):


  1. Open your command prompt. Check if Python is installed (python -V). If not install (IMPORTANT: check the "Add Python xxx to PATH" checkbox)
  2. Navigate to the downloaded DynamicAfrica folder (cd ./DynamicAfrica)
  3. Enter the command to start up the server in that directory: 
  If Python version returned above is 3.X\npython -m http.server\nIf Python version returned above is 2.X\npython -m SimpleHTTPServer
  4. By default, this will run the contents of the directory on a local web server, on port 8000. You can go to this server by going to the URL localhost:8000
