/**
 * Created by Utente on 17/05/2017.
 */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    //QUESTI ERROR IN REALTA' SONO BINDATI A DEI COSI HTML!!! VEDI L'ESEMPIO KO
    self.username = ko.observable();
    self.usernameError = ko.observable();
    self.username.subscribe(function(){
        self.usernameError(undefined);
    });

    self.password = ko.observable();
    self.passwordError = ko.observable();

    self.shouldShowMessage = ko.observable(false);
    self.errorMessage = ko.observable();

    self.login = function () {
        ctx.repositories.login.login(
            self.username(),
            self.password()
        ).then(function (result) {
            //alert("Success");
            ctx.repositories.status.setApiToken(result.token);
            //alert("HO SETTATO API TOKEN");
            /*for(var x in ctx){
                alert(x + " " +ctx[x]);
            }
            ctx.updateStatusLogged();
            ctx.updateStatusLogged();*/
            //alert(ctx.repositories.status.getApiToken());
            location.hash = '/UserHome';
        }).catch(function (e) {
           // alert("Error");
            self.shouldShowMessage(true);
            self.errorMessage(" " +e.errors.error);
        });
    };
}


exports.register = function () {
    ko.components.register('log-in', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
