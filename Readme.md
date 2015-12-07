# Welcome to Lonely Planet XML -> HTML

[![Build Status](https://api.travis-ci.org/kbouzidi/destinationbatch.svg?branch=master)](https://travis-ci.org/kbouzidi/destinationbatch/branches)


## Overall directory structure
```
destinationbatch/
  |- lib/
  |- screenshot/
  |- template/
  |- test/
  |- .gitignore
  |- app.js
  |- package.json
  |- run.sh
```

## Description 
The project parse pair file Taxonomy and destinations and produces an .html folder for each destination 

```
  |- lib/ The Javascript libraries and utils used to parse XML files and the html producer
```

```
  |- template/ The template for each destination
```

```
  |- test/  Contains test uses cases
```

```
  |- app.js  The main Javascript library
```

```
  |- run.sh Run script
```

```
  |- package.json List of packages
```

```
  |- screenshot/ Some screenshots
```

## Environment setup
Download and setup the following applications:

- [NodeJS](https://nodejs.org/)  
- [Git](http://git-scm.com/) 

For Windows users please install `Cygwin`

- [Cygwin](https://www.cygwin.com/)


## Application server
 - `NodeJs v4.2.2`

## Version control
 - `Github`

## Continuous integration
 - [![Build Status](https://api.travis-ci.org/kbouzidi/destinationbatch.svg?branch=master)](https://travis-ci.org/kbouzidi/destinationbatch/branches)

## Server installation 
Go to the server folder and execute the following commands

- `npm install`
- `npm install -g mocha`

## Run Batch
 - `sh run.sh`

## Run options
  - `node app.js [taxonomy.xml] [destination.xml] [destination-repo]`
  - `mocha test/test.js`
 
## Results screen shot
![alt tag](https://github.com/kbouzidi/destinationbatch/blob/develop/screenshot/Example.png)

