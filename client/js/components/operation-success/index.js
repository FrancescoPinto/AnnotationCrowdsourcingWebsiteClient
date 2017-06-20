/**
 * Created by Utente on 03/06/2017.
 */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.proceed = function () {
        var temp = ctx.repositories.status.getSuccessNext();
        ctx.repositories.status.deleteSuccessNext();
        location.hash = temp;
    };
}

exports.register = function () {
    ko.components.register('operation-success', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};