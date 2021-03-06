/**
 * Created by Utente on 02/06/2017.
 */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.campaignName = ko.observable();
    self.selectionReplica = ko.observable();
    self.threshold = ko.observable();
    self.annotationReplica = ko.observable();
    self.annotationSize = ko.observable();

    //self.shouldShowMessage = ko.observable(false);
    //self.errorMessage = ko.observable();
    self.alertMessages = ko.observableArray();

    self.createCampaign = function () {
        ctx.repositories.createcampaign.createCampaign(
            ctx.repositories.status.getAuthApiToken(),
            self.campaignName(),
            self.selectionReplica(),
            self.threshold(),
            self.annotationReplica(),
            self.annotationSize()
        ).then(function (result) {
            alert("Success");
            ctx.repositories.status.setSuccessNext('/UserHome');
            location.hash = '/OperationSuccess';
        }).catch(function (e) {
            alert("Error");
            /*self.shouldShowMessage(true);
            var temp = ''
            for(var x in e.error){
                temp += x + ": " + e.error[x];
            }
            self.errorMessage(" " +temp);*/
            self.alertMessages.removeAll();
            var tempErr = "";
            for(var i in e.errors.error) {
                tempErr += " "+i +": " +e.errors.error[i] + ".";
            }
            self.alertMessages.push({shouldShowMessage:true, errorMessage:tempErr});
        });
    };

}

exports.register = function () {
    ko.components.register('create-campaign', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
