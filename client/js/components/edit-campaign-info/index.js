/**
 * Created by Utente on 25/06/2017.
 */

"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    var currCampaign = ctx.repositories.status.getCurrentCampaign();
    self.campaignName = ko.observable(currCampaign.name);
    self.selectionReplica = ko.observable(currCampaign.selection_replica);
    self.threshold = ko.observable(currCampaign.threshold);
    self.annotationReplica = ko.observable(currCampaign.annotation_replica);
    self.annotationSize = ko.observable(currCampaign.annotation_size);

    self.shouldShowMessage = ko.observable(false);
    self.errorMessage = ko.observable();

    self.editCampaign = function () {
        ctx.repositories.editcampaign.editCampaign(
            ctx.repositories.status.getAuthApiToken(),
            currCampaign.id,
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
            self.shouldShowMessage(true);
            var temp = ''
            for(var x in e.errors){
                temp += x + ": " + e.errors[x];
            }
            self.errorMessage(" " +temp);
        });
    };

}

exports.register = function () {
    ko.components.register('edit-campaign-info', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};