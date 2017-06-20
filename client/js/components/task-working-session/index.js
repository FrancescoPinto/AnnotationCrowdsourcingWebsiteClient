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

    self.startWorkingSession = function (isNext) {
        ctx.repositories.taskworkingsession.startWorkingSession(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session
        ).then(function (result) {
            alert("Success");
            if(isNext){
                self.getNextTaskInstance();
            }
        }).catch(function (e) {
            if(e == "Error: Not Found"){
                self.nextTaskAvailable(false);
            }
            alert("session" + e.textStatus);
            alert("Error");
            alert(e);
        });
    };

    self.startWorkingSession();

    self.getNextTaskInstance = function(){
        ctx.repositories.taskworkingsession.getNextTaskInstance(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session
        ).then(function (result) {
            alert("Success");
            self.type(result.type);
            self.image(result.image);
            self.size(result.size);
        }).catch(function (e) {
            if(e == "Error: Gone"){
                self.nextTaskAvailable(false);
            }
            alert("getNextTask" + e.textStatus);
            alert("Error");
            alert(e);
        });
    };
    self.getNextTaskInstance();


    self.submitAnnotation = function(){
        if(self.line()) {
            ctx.repositories.taskworkingsession.submitAnnotation(
                ctx.repositories.status.getAuthApiToken(),
                ctx.repositories.status.getCurrentTask().session,
                self.line()
            ).then(function (result) {
                alert("Submitted");
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
