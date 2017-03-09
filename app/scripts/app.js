'use strict';

var app = angular.module('application', ['ui.bootstrap']);


// service to generate data
app.filter('from',function(){
    return function(participants,start){
        return participants.slice(start);
    };
});
app.factory('GenerateDataService',function(){

    // generate one participant
    var participant= function()
    {
        var firstname =["Alain","John","Henry", "Tom","Bob"];
        var lastname=["Smith","Murphy","Lam","Martin","Brown","Roy"];
        var email=["@gmail.com","@metropolia.com","@apple.com","@samsung.com","@yahoo.com"];
        var pos= Math.floor(Math.random() * email.length);
        var possible = "0123456789";
        var text ="0";
        for( var i=0; i < 10; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }



        return {
            fullname: firstname[pos]+" "+lastname[pos],
            email:  firstname[pos].toLowerCase()+"."+lastname[pos].toLowerCase()+email[pos],
            phone: text,

        };
    };

    var participants=[];

    // generate 20 participants
    for(var i=1;i<21;i++){
        participants.push(participant());
    }

    return participants;
});

app.controller('AppController',['GenerateDataService','$scope',function(GenerataDataService,$scope){
    $scope.participants= GenerataDataService;
    $scope.new ={
        fullname:"",
        email:"",
        phone:""
    };


    $scope.currentPage = 1;
    $scope.itemsPerPage = 20;
    $scope.setPagingData = function(page) {
        var pagedData = $scope.participants.slice(
            (page - 1) * $scope.itemsPerPage,
            page * $scope.itemsPerPage
        );
        $scope.PageParticipants = pagedData;

    };

    $scope.setPagingData($scope.currentPage);
    console.log($scope.PageParticipants);

    $scope.sorted= false;

    $scope.reversed= false;

    $scope.normalSort= function(){
        $scope.participants.sort(function(a,b){
            if(a.fullname < b.fullname){
                return -1;
            } 
            else if(a.fullname > b.fullname) {
                return 1;
            }
            return 0;
        });
    };

    $scope.reversedSort= function(){
        $scope.participants.sort(function(a,b){
            if(a.fullname < b.fullname){
                return 1;
            } 
            else if(a.fullname > b.fullname) {
                return -1;
            }
            return 0;
        });
    };

    $scope.sortParticipants = function(){

        if(!$scope.reversed){
            $scope.normalSort();
        }
        else{
            $scope.reversedSort(); 
        }
        $scope.setPagingData($scope.currentPage);
        $scope.reversed=!$scope.reversed;
        $scope.sorted=true;


    };

    $scope.addParticipant = function(){
        if($scope.new.fullname===""||$scope.new.email===""||$scope.new.phone===""){
            window.alert("please fill in the form");
        }
        else{
            $scope.participants.push({
                fullname : $scope.new.fullname,
                email : $scope.new.email,
                phone : $scope.new.phone,

            });
            $scope.new.fullname="";
            $scope.new.phone="";
            $scope.new.email="";
            if($scope.sorted){
                if($scope.reversed){
                    $scope.normalSort();
                }
                else{
                    $scope.reversedSort(); 
                }
                $scope.setPagingData($scope.currentPage);
            }
        }
    };



    console.log($scope.participants);
    $scope.editParticipant = function (participant) {
        console.log($scope.participants.indexOf(participant));
        participant.edit=true;
        $scope.selected = angular.copy(participant);
        console.log(participant);
    };
    /*$scope.addParticipant = function(){
        //console.log($scope.participants[$scope.participants.length-1].id+1);,id: $scope.participants[$scope.participants.length-1].id+1
        $scope.participants.push({fullname:$scope.new.fullname,email:$scope.new.email,phone:$scope.new.phone});
        $scope.new.fullname="";
        $scope.new.phone="";
        $scope.new.email="";
    };*/
    $scope.saveUpdate = function(participant){
        participant.edit=false;
        $scope.setPagingData($scope.currentPage);
    };

    $scope.cancelUpdate = function(participant){

        participant.fullname= $scope.selected.fullname ;
        participant.email= $scope.selected.email ;
        participant.phone= $scope.selected.phone ;
        participant.edit=false;
    };

    $scope.deleteParticipant = function(participant){
        var i = $scope.participants.indexOf(participant);
        console.log(i);
        $scope.participants.splice(i,1);
        $scope.setPagingData($scope.currentPage);
    };
}]);
