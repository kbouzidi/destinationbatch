#!/usr/bin/env bash
echo "Do you wish to run test compain?"

#Run batch manually
run (){
echo "Please enter taxonomy XML: "
read taxonomyFile
echo "Please enter destination XML: "
read destinationFile
echo "Please enter output destination "
read outputdestination

installOption

break
}

#Run tests
test (){
testOption
break
}

#Run batch without installation of libs
runOnly(){
echo 'Batch is now running'
node app $taxonomyFile $destinationFile $outputdestination
break
}

#Run install libs and run batch
installRun (){
npm install -g mocha
npm install
node app $taxonomyFile $destinationFile $outputdestination
break
}


#Run install libs and run test
installTest (){
npm install -g mocha
npm install
mocha test/tests.js
break
}


#Run test without installation of libs
testOnly (){
mocha test/tests.js
break
}


#Run options 
installOption (){
echo "Did you installed NodeJS libs before running ?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) runOnly;;
        No ) installRun;;
    esac
done

}

#Test options 
testOption (){
echo "Did you installed NodeJS libs before testing ?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) testOnly;;
        No ) installTest;;
    esac
done

}


select yn in "Yes" "No"; do
    case $yn in
        Yes ) test;;
        No ) run;;
    esac
done


