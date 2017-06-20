/*jslint node:true */
"use strict";

var ko = require('knockout'),
    $ = require('jquery'),
    components = require('./components'),
    createRepositories = require('./repositories').createRepositories;

components.register();
var repositories = createRepositories('http://awt.ifmledit.org');

function App() {
    this.routes = {
        '/': 'home-page',
        '/SignUp':'sign-up',
        '/LogIn':'log-in',
        '/SignUpOutcomeP': 'sign-up-outcome-p',
        '/UserHome':'user-home',
        '/Logout':'log-out',
        '/AddCampaign':'create-campaign',
        '/EditImagesCampaign':'edit-images-campaign',
        '/EditWorkersCampaign':'edit-workers-campaign',
        '/OperationSuccess':'operation-success',
        '/CampaignStatistics':'ended-campaign-statistics',
        '/TaskStatistics':'task-statistics',
        '/WorkingSessionTask':'task-working-session',
        '/ImageStatistics':'image-statistics'
    };
    this.repositories = repositories;
    $("#su").on("click",function(){$("#home").css("display","none");});
    $("#li").on("click",function(){$("#home").css("display","none");});
    $("#suN").on("click",function(){$("#home").css("display","none");});
    $("#liN").on("click",function(){$("#home").css("display","none");});
   /* this.firstPage = true;
    this.notFirstPage = function(data){
        this.firstPage = false;
        if(data == "SU"){
            location.hash = "/SignUp";
        }else if(data == "LI"){
            location.hash = "/LogIn";
        }
    };
    /*this.statusLogged = ko.observable(false);

    this.updateStatusLogged = function(){
        alert("STO PER AGGIORNARE LO STATO");
        this.statusLogged(repositories.status.getApiToken());
    };*/
}

ko.applyBindings(new App());
