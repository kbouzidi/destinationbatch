#!/usr/bin/env bash
echo "Do you wish to run test campaign?"

#Run batch manually
run (){
echo "Please enter taxonomy XML: "
read taxonomyFile
echo "Please enter destinations XML: "
read destinationFile
echo "Please enter output directory "
read outputDir

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
node app $taxonomyFile $destinationFile $outputDir
break
}

#Run install libs and run batch
installRun (){
npm install -g mocha
npm install
node app $taxonomyFile $destinationFile $outputDir
break
}


#Run install libs and run test
installTest (){
npm install -g mocha
npm install
mocha test/tests.js
echo 'Test Finished'
echo 'Data ara available at '${PWD}'/testdata/output/'
break
}


#Run test without installation of libs
testOnly (){
mocha test/tests.js
echo 'Test Finished'
echo 'Data ara available at '${PWD}'/testdata/output/'
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


