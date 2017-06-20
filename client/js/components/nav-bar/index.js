/**
 * Created by Utente on 17/06/2017.
 */
"use strict";

var ko = require('knockout'), $ = require('jquery');// router = require('ko-component-router');


function ViewModel(param) {
    var self = this;
    self.repositories = param.repositories;
    self.statusLogged = param.repositories.status.getApiToken();
    /*
    self.statusLogged = ko.computed(function()
        { return param.repositories.status.getApiToken();});*/
    //self.statusLogged = param.statusLogged;
    //ko.computed(function(){return param.statusLogged;});
}

/*
ko.bindingHandlers.repositories = {
    update: function (element, valueAccessor, allBindings,viewModel,bindingContext) {
        var value = valueAccessor(),
            $element = $(element);
        $element.data('repositories', value);
    }
};
*/

exports.register = function () {
    ko.components.register('nav-bar', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
