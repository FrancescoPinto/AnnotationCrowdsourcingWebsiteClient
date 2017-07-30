/**
 * Created by Utente on 17/05/2017.
 */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;


    self.fullname = ko.observable();
    self.fullnameError = ko.observable();
    self.fullname.subscribe(function(){
        self.fullnameError(undefined);
    });
    //QUESTI ERROR IN REALTA' SONO BINDATI A DEI COSI HTML!!! VEDI L'ESEMPIO KO
    self.username = ko.observable();
    //     self.usernameError = ko.observable();

    self.password1 = ko.observable();
    //self.password1Error = ko.observable();

    /*self.password2 = ko.observable();
    self.password2Error = ko.observable();*/

    self.role = ko.observable("master");
    //  self.roleError = ko.observable();

    self.shouldShowMessage = ko.observable(false);
    self.errorMessage = ko.observableArray();
    self.alertMessages = ko.observableArray();

    self.validateAndSend = function () {
            ctx.repositories.signup.validateAndSend(
                self.fullname(),
                self.username(),
                self.password1(),
                self.role()
            ).then(function (result) {
               // alert("Messaggio inviato, risposta ricevuta");
                //alert(result);//undefined???
                location.hash = "/SignUpOutcomeP";
            }).catch(function (e) {
                self.alertMessages.removeAll();
                var tempErr = [];
                for(var i in e.errors.error) {
                    tempErr.push(" "+i +": " +e.errors.error[i]);
                }
                self.alertMessages.push({shouldShowMessage:true, errorMessage:tempErr})
                /*self.shouldShowMessage(true);
                self.errorMessage.removeAll();
                for(var i in e.errors.error) {
                    self.errorMessage.push(" "+i +": " +e.errors.error[i]);
                }*/
                /*
                if (e.errors) {
                    alert("Errore");
                    /*self.usernameError(e.errors.username);
                    self.fullnameError(e.errors.fullname);
                    self.roleError(e.errors.role);*/
                /*} else {
                    alert("Errore");
                    alert(e.message);
                }*/
            });
        //}
    };
}

exports.register = function () {
    ko.components.register('sign-up', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
