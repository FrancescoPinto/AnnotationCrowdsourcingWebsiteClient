/**
 * Created by Utente on 12/06/2017.
 */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.numAvailable = ko.observable();
    self.numAccepted = ko.observable();
    self.numRejected = ko.observable();
    self.numAnnotated = ko.observable();
    self.isSelect = ko.observable(false);
    self.isAnnotate = ko.observable(false);

    self.getTaskStatistics = function () {
        alert(ctx.repositories.status.getCurrentTask().statistics);
        ctx.repositories.taskstatistics.getTaskStatistics(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().statistics
        ).then(function (result) {
            alert("Success");
            self.numAvailable(result.available);
            self.numAccepted(result.accepted);
            self.numRejected(result.rejected);
            self.numAnnotated(result.annotated);
            (result.annotated === undefined)?self.isSelect(true):self.isAnnotate(true);
        }).catch(function (e) {
            alert("Error");
           alert(e);
        });
    };

    self.getTaskStatistics();

}


exports.register = function () {
    ko.components.register('task-statistics', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
