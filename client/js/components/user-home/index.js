/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var ko = require('knockout');
var $ = require("jquery");

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.visible = false;
    self.editUserString = ko.observable("Edit User Info");
    //QUESTI ERROR IN REALTA' SONO BINDATI A DEI COSI HTML!!! VEDI L'ESEMPIO KO
    self.username = ko.observable();
    self.fullname = ko.observable();
    self.role = ko.observable();
    self.isUserMaster = ko.observable();

    self.readyCampaignsAvailable = ko.observable(false);
    self.readyCampaigns = ko.observableArray();
    self.startedCampaignsAvailable = ko.observable(false);
    self.startedCampaigns = ko.observableArray();
    self.endedCampaignsAvailable = ko.observable(false);
    self.endedCampaigns = ko.observableArray();

    self.newpassword = ko.observable("");
    self.newfullname = ko.observable("");

    //self.shouldShowErrorMessage = ko.observable(false);
    //self.errorMessage = ko.observable();

    //self.shouldShowSuccessMessage = ko.observable(false);
    //self.successMessage = ko.observable();


    self.tasksAvailable = ko.observable(false);
    self.tasks = ko.observableArray();

    self.alertMessages = ko.observableArray();

    self.setUserCampaigns = function(result){
        if (!(result === undefined)) {
            for (var x in Object.getOwnPropertyNames(result.campaigns)) {
                if (!(result.campaigns[x] == undefined)) {
                    switch (result.campaigns[x].status) {
                        case "ended":
                            self.endedCampaigns().push(result.campaigns[x]);
                            //alert("ended available");
                            break;
                        case "started":
                            self.startedCampaigns().push(result.campaigns[x]);
                            //alert("started available");
                            break;
                        case "ready":
                            // alert(result.campaigns[x]);
                            self.readyCampaigns().push(result.campaigns[x]);
                            //alert('The length of the array is ' + self.readyCampaigns().length);
                            //alert("ready available");
                            break;
                        default:
                            //alert("Errore switch campagna");
                    }
                }
            }
        }
        //alert(self.endedCampaigns().length + "ended");
        //alert(self.startedCampaigns().length + "started");
        //alert(self.readyCampaigns().length + "ready");
        self.endedCampaignsAvailable(self.endedCampaigns().length > 0 ? true : false);
        self.startedCampaignsAvailable(self.startedCampaigns().length > 0 ? true : false);
        self.readyCampaignsAvailable(self.readyCampaigns().length > 0 ? true : false);
    };
    self.getUserCampaigns = function(){
        /*var result = ctx.repositories.status.getUserCampaigns();
        if (result) {
            self.setUserCampaigns(result);
        }else { @TODO NO CACHING: lo stato della campagna lato server può essere cambiato! bisogna ripetere il fetch!*/
            ctx.repositories.userhome.getUserCampaigns(
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
                //alert("Successo Campagna");
                //var temp = JSON.parse(result);
                /*alert("Successo Parse");
                 alert(result);//ritorna undefined
                 for(var x in result.campaigns){
                 alert(x+""+result.campaigns[x]);
                 }
                 self.endedCampaigns([]);
                 self.startedCampaigns([]);
                 self.readyCampaigns([]);*/
                //alert(result);
                self.setUserCampaigns(result);
            }).catch(function (e) {
                alert("Fallito");
                alert(e);
            });
        };

    self.setTasksInfo = function(result){
        /*var temp = result.tasks;

        self.tasksAvailable((temp.length > 0) ? true : false);
        if(temp.length >0){
            for(var x in temp)
            ctx.repositories.userhome.getTaskInfo(
                ctx.repositories.status.getAuthApiToken(),
                temp[x].id
            ).then(function (result) {
                for(var y in result){
                    alert(""+y+""+result[y]);
                }
                temp[x].campaignName = result.campaign;
                alert(temp[x].type);
                alert(temp[x].campaignName);
                self.tasks(temp);
            }).catch(function (e) {
                alert("Errore");
                alert(e);
            });
        }*/
        var temp = result.tasks;
        self.tasksAvailable((temp.length > 0) ? true : false);
        if(temp.length >0) {
            for (var x in temp) {
                ctx.repositories.userhome.getTaskInfo(
                    ctx.repositories.status.getAuthApiToken(),
                    temp[x].id
                ).then(function (result) {
                    //alert(result.id)
                   // alert(result.type);
                    self.tasks.push({
                        id: result.id,
                        type: result.type,
                        campaignName: result.campaign,
                        session: result.session,
                        statistics: result.statistics
                    });
                }).catch(function (e) {
                    alert("Errore");
                    alert(e);
                });
            }
        }
    };

    self.getTasksInfo = function(){
      /*  var result = ctx.repositories.status.getTasksInfo();
        if (result) {
            self.setTasksInfo(result);
        }else {*/
            ctx.repositories.userhome.getTasksInfo(
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
                //alert("successo tasksInfo");
                ctx.repositories.status.setTasksInfo(result);
                self.setTasksInfo(result);
            }).catch(function (e) {
                alert("Errore");
            });
        //}
    };

    self.setUserInfo = function(result){
        self.username(result.username);
        self.role(result.type);
        self.fullname(result.fullname);
        self.isUserMaster((result.type == "master") ? true : false);
        (result.type == "master") ? self.getUserCampaigns() : self.getTasksInfo();
    };

    self.getUserInfo = function() {
        var result = ctx.repositories.status.getUserInfo();
        if (result) {
            self.setUserInfo(result);
        } else {
            ctx.repositories.userhome.getUserInfo(
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
                ctx.repositories.status.setUserInfo(result);
                self.setUserInfo(result);
            }).catch(function (e) {
                alert("Errore");
            });
        }
    };
    self.getUserInfo();




    self.workTask = function(task){
        /*ctx.repositories.status.setCurrentTask(task);
        location.hash = "/WorkingSessionTask";*/

        ctx.repositories.userhome.getTaskInfo(
            ctx.repositories.status.getAuthApiToken(),
            task.id
        ).then(function (result) {
            ctx.repositories.status.setCurrentTask(result);
            location.hash = "/WorkingSessionTask";
        }).catch(function (e) {
            alert("Errore");
        });
    };

    self.getTaskStatistics = function(task){
        ctx.repositories.status.setCurrentTask(task);
        location.hash = "/TaskStatistics";/*
        ctx.repositories.userhome.getTaskInfo(
            ctx.repositories.status.getAuthApiToken(),
            task.id
        ).then(function (result) {
            ctx.repositories.status.setCurrentTask(result);
            location.hash = "/TaskStatistics";
        }).catch(function (e) {
            alert("Errore");
        });*/
    };


    self.editUserInfo = function () {
        //alert("Chiamo editUserInfo");
        //alert(self.newpassword());
        //alert(self.newfullname());
        var fullname = self.newfullname();
        var tempErr = "";
        if(self.newfullname().toString().length < 3 )
            tempErr += "Fullname should be at least 3 chars.";
        if(self.newpassword().toString().length < 8)
            tempErr += "Password should be at least 8 chars."
        if(self.newfullname().toString().length < 3 || self.newpassword().toString().length < 8){
            self.alertMessages.removeAll();
            self.alertMessages.push({shouldShowSuccessMessage:false, shouldShowErrorMessage:true, errorMessage:tempErr});
        }else {
            ctx.repositories.userhome.editUserInfo(
                self.newfullname(),
                self.newpassword(),
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
                //alert("Successo Edit Dati utente");
                self.alertMessages.removeAll();
                self.alertMessages.push({shouldShowSuccessMessage:true, shouldShowErrorMessage:false, errorMessage: null});
                //self.shouldShowSuccessMessage(true);
                //alert(result);
                //self.successMessage();
                var result1 = ctx.repositories.status.getUserInfo();
                result1.fullname = fullname;
                ctx.repositories.status.setUserInfo(result1);
                self.fullname(result1.fullname);

                //successMessage(); //@todo, capito cosa è result vedi come scrivi il messaggio
            }).catch(function (e) {
                alert("Fallito Edit ");
                //self.shouldShowErrorMessage(true);
                var tempString = '';
                for (var x in e.errors.error) {
                    tempString += x + ": " + e.errors.error[x] + ". ";
                }
                //self.errorMessage(tempString);
                self.alertMessages.removeAll();
                self.alertMessages().push({shouldShowSuccessMessage:false, shouldShowErrorMessage:true, errorMessage:tempString});
            });
        }
    };



    //self.getUserCampaigns(); //important: calls it

    self.addCampaign = function(){
        location.hash = "/AddCampaign";
    };
    self.editImages = function(campaign){
        /*if(ctx.repositories.status.getCurrentCampaign() !== undefined &&
            ctx.repositories.status.getCurrentCampaign().id === campaign.id
            && ctx.repositories.status.getOldImagesUrl() === ctx.repositories.status.getCurrentCampaign().image ) {
            location.hash = "/EditImagesCampaign";
        }else{*/
            ctx.repositories.userhome.getCampaignInfo(
                campaign.id,
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
                //alert("Successo GetCampaignInfo");
                ctx.repositories.status.setCurrentCampaign(result);
                ctx.repositories.status.setOldImagesUrl(result.image);

                ctx.repositories.editimages.getCampaignImages(
                    ctx.repositories.status.getAuthApiToken(),
                    ctx.repositories.status.getCurrentCampaign().image
                ).then(function (result) {

                    ctx.repositories.status.setCurrentCampaignImages(result);
                    //alert("Success loaded");

                }).catch(function (e) {
                    alert("Error loaded");
                    alert(e);
                });
                location.hash = "/EditImagesCampaign";
            }).catch(function (e) {
                alert("Fallito GetCampaignInfo ");
                alert(e);
            });
        //}

    };
    self.editCampaign = function(campaign){
        //NO CACHE QUI, PERCHE' SE FAI EDIT E POI NON AGGIORNI PRELOADI I DATI PRIMA DELL'EDIT!
            ctx.repositories.userhome.getCampaignInfo(
                campaign.id,
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
               // alert("Successo GetCampaignInfo");
                ctx.repositories.status.setCurrentCampaign(result);
                location.hash = "/EditCampaign";
            }).catch(function (e) {
                alert("Fallito GetCampaignInfo ");
                alert(e);
            });

    };
    self.getCampaignInformation = function(campaign){
        //NO CACHE QUI, PERCHE' SE FAI EDIT E POI NON AGGIORNI PRELOADI I DATI PRIMA DELL'EDIT!
        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            // alert("Successo GetCampaignInfo");
            ctx.repositories.status.setCurrentCampaign(result);
            location.hash = "/CampaignInfo";
        }).catch(function (e) {
            alert("Fallito GetCampaignInfo ");
            alert(e);
        });

    };
    self.editWorkers = function(campaign){

        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            //alert("Successo GetCampaignInfo");
            ctx.repositories.status.setCurrentCampaign(result);
            location.hash = "/EditWorkersCampaign";
        }).catch(function (e) {
            alert("Fallito GetCampaignInfo ");
            alert(e);
        });
    };
    self.campaignStatistics = function(campaign){
        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            //alert("Successo GetCampaignInfo");
            ctx.repositories.status.setCurrentCampaign(result);

            ctx.repositories.endedcampaignstatistics.getCampaignStatistics(
                ctx.repositories.status.getAuthApiToken(),
                ctx.repositories.status.getCurrentCampaign().statistics
            ).then(function (result) {
                //alert("Success");
                ctx.repositories.status.setCurrentCampaignStatistics(result);

                ctx.repositories.editimages.getCampaignImages(
                    ctx.repositories.status.getAuthApiToken(),
                    ctx.repositories.status.getCurrentCampaign().image
                ).
                then(function (result) {
                    ctx.repositories.status.setCurrentCampaignStatisticsImages(result.images);
                    location.hash = "/CampaignStatistics";
                }).catch(function (e) {
                    alert("Error loaded");
                    alert(e);
                });

            }).catch(function (e) {
                //alert("Error");
                self.shouldShowMessage(true);
                var temp = '';
                for (var x in e.errors) {
                    temp += x + ": " + e.errors[x];
                }
                self.errorMessage(" " + temp);
            });

        }).catch(function (e) {
            alert("Fallito GetCampaignInfo ");
            alert(e);
        });
    };


    //$("#editButton").addEventListener("click",
    self.setEditUserForm = function(){

        if(self.visible) {
            //self.shouldShowSuccessMessage(false);
            //self.shouldShowErrorMessage(false);
            self.newpassword('');
            self.newfullname('');

            self.visible = !self.visible;
            self.editUserString("Edit User Info");
        }else{
            self.visible = !self.visible;
            self.editUserString("Close Edit Box");
        }
    }//);
    self.startCampaign = function(campaign){

        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
           // alert("Successo GetCampaignInfoForStart");
           // alert("execution should be "+result.execution);
            ctx.repositories.userhome.startCampaign(
                result.execution,
                ctx.repositories.status.getAuthApiToken())
                .then(function (result1) {
                   // alert("Successo startCampaign");
                    self.readyCampaigns.remove(function(campaignTemp){
                        if(campaignTemp == campaign)
                        {
                            if(self.startedCampaigns().length ==0)
                                self.startedCampaignsAvailable(true);

                            self.startedCampaigns.push(campaign);

                            if(self.readyCampaigns().length ==1)
                                self.readyCampaignsAvailable(false);
                        }
                        return campaignTemp == campaign;});
                    //self.getUserCampaigns();
                }).catch(function (e1) {
                alert("Fallito startCampaign ");
                alert(e1);
            });
        }).catch(function (e) {
            alert("Fallito GetCampaignInfoForStart ");
            alert(e);
        });

    }

    self.terminateCampaign = function(campaign){

        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
         //   alert("Successo GetCampaignInfoForTermination");
         //   alert("execution should be "+result.execution);
            ctx.repositories.userhome.terminateCampaign(
                result.execution,
                ctx.repositories.status.getAuthApiToken())
                .then(function (result1) {
                 //   alert("Successo terminateCampaign");
                    location.hash = "/UserHome";
                    //self.getUserCampaigns();
                    self.startedCampaigns.remove(function(campaignTemp){
                        if(campaignTemp == campaign)
                        {
                            if(self.endedCampaigns().length ==0)
                                self.endedCampaignsAvailable(true);

                            self.endedCampaigns.push(campaign);

                            if(self.startedCampaigns().length ==1)
                                self.startedCampaignsAvailable(false);
                        }
                        return campaignTemp == campaign;});
                }).catch(function (e1) {
                alert("Fallito terminateCampaign ");
                alert(e1);
            });
        }).catch(function (e) {
            alert("Fallito GetCampaignInfoForStart ");
            alert(e);
        });

    }
}


exports.register = function () {
    ko.components.register('user-home', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
