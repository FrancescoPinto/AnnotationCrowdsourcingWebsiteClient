/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var ko = require('knockout');
exports.register = function () {
    ko.components.register('sign-up-outcome-p', {
        template: require('./template.html'),
    });
};
