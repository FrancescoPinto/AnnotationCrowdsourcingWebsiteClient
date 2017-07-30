/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.shouldShowMessage = ko.observable(false);
    self.errorMessage = ko.observable();

    self.logout = function () {
       // alert("STo per eliminare: "+ctx.repositories.status.getApiToken());
        ctx.repositories.logout.logout(
            ctx.repositories.status.getApiToken()
        ).then(function (result) {
           // alert("Successo");
            ctx.repositories.status.clearCache();
            location.hash = "/";
        }).catch(function (e) {
            alert("Errore");
            for( var x in e.jqXHR)
            {
                alert(e.jqXHR[x]);
            }
            self.shouldShowMessage(true);
        });

    };
}

exports.register = function () {
    ko.components.register('log-out', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
