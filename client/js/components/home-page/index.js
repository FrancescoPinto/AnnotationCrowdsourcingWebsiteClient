/**
 * Created by Utente on 22/05/2017.
 */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
}

exports.register = function () {
    ko.components.register('home-page', {
        template: require('./template.html'),
        viewModel: ViewModel,
    });
};