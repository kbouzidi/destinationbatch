#!/usr/bin/env bash
echo "Do you wish to run test compain?"

run (){

echo "Please enter taxonomy XML: "
read taxonomyFile
echo "Please enter destination XML: "
read destinationFile
echo "Please enter output destination "
read outputdestination

echo 'Batch is now running'
node app $taxonomyFile $destinationFile $outputdestination
break
}

test (){
mocha test/tests.js
break
}
select yn in "Yes" "No"; do
    case $yn in
        Yes ) test;;
        No ) run;;
    esac
done


