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

}

exports.register = function () {
    ko.components.register('campaign-info', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};