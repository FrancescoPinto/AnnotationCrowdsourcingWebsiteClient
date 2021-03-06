/**
 * Created by Utente on 13/06/2017.
 */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.type = ko.observable();
    self.image = ko.observable();
    self.size = ko.observable();
    self.nextTaskAvailable = ko.observable(true);
    self.annotationEnabled = ko.observable(true);
    self.shouldShow = ko.computed(function(){return self.nextTaskAvailable() && self.annotationEnabled();});

    self.line = ko.observable();
    self.line.subscribe(function () {
        //alert(self.line());
    });

    self.clearAnnotation = function(){
        self.line('');
        /*$("#annotation").remove("#line-drawer");
        self.line = ko.observable();
        $("#annotation").append("<line-drawer id = 'line-drawer' params='src: image, pen: size, line: line'></line-drawer>");*/
    };

    self.startWorkingSession = function (/*isNext*/) {
        ctx.repositories.taskworkingsession.startWorkingSession(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session
        ).then(function (result) {
            //alert("Success start working sessione");
           // if(isNext){
                self.getNextTaskInstance();
           // }
        }).catch(function (e) {
            if(e == "Error: Not Found" && ctx.repositories.status.getCurrentTask().type == "selection"){
                self.nextTaskAvailable(false);
            }else if(e == "Error: Not Found" && ctx.repositories.status.getCurrentTask().type == "annotation"){
                self.annotationEnabled(false);
            }
            //alert("session" + e.textStatus);
            //alert("Error");
            //alert(e);
        });
    };

    self.startWorkingSession();

    self.getNextTaskInstance = function(){
        ctx.repositories.taskworkingsession.getNextTaskInstance(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session
        ).then(function (result) {
           // alert("Success next task instance");
            self.type(result.type);
            self.image(result.image);
            self.size(result.size);
            }).catch(function (e) {
            if(e == "Error: Gone" && ctx.repositories.status.getCurrentTask().type == "selection"){
                self.nextTaskAvailable(false);
            }else if ( ctx.repositories.status.getCurrentTask().type == "annotation"){
                self.annotationEnabled(false);
            }
            //alert("getNextTask" + e);
            //alert("Error");
           // alert(e);//GONE = Già fatto
        });
    };
    //self.getNextTaskInstance();


    self.submitAnnotation = function(){
        if(self.line()) {
            ctx.repositories.taskworkingsession.submitAnnotation(
                ctx.repositories.status.getAuthApiToken(),
                ctx.repositories.status.getCurrentTask().session,
                self.line()
            ).then(function (result) {
                alert("Submitted");
                self.line('');
                self.getNextTaskInstance();
                //self.startWorkingSession(true);
            }).catch(function (e) {
                alert("Error");
                alert(e);
            });
        }else{
            alert("You cannot submit an empty annotation!");
        }
    };

    self.rejectSelection = function(){
        ctx.repositories.taskworkingsession.submitSelection(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session,
            false
        ).then(function (result) {
            alert("Submitted");
            self.getNextTaskInstance();
            //self.startWorkingSession(true);
        }).catch(function (e) {
            alert("Error");
            alert(e);
        });
    };

    self.acceptSelection = function(){
        ctx.repositories.taskworkingsession.submitSelection(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session,
            true
        ).then(function (result) {
            alert("Submitted");
            self.getNextTaskInstance();
            //self.startWorkingSession(true);
        }).catch(function (e) {
            alert("Error");
            alert(e);
        });
    };
}


exports.register = function () {
    ko.components.register('task-working-session', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
