/**
 * Created by Utente on 10/06/2017.
 */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.campaignName = ko.observable(ctx.repositories.status.getCurrentCampaign().name);
    self.images = ko.observable();
    self.accepted = ko.observable();
    self.rejected = ko.observable();
    self.annotation = ko.observable();


    self.getCampaignStatistics = function () {
        ctx.repositories.endedcampaignstatistics.getCampaignStatistics(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentCampaign().statistics
        ).then(function (result) {
            alert("Success");
            self.images(result.images);
            self.accepted(result.accepted);
            self.rejected(result.rejected);
            self.annotation(result.annotation);
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

    self.getCampaignStatistics();
}

exports.register = function () {
    ko.components.register('ended-campaign-statistics', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
