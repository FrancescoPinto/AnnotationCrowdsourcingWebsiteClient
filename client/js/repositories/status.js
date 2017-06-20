/**
 * Created by Utente on 25/05/2017.
 */
"use strict";

var $ = require('jquery'),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository();
    }
    this._server = server || '';
}

Repository.prototype.setApiToken = function (apiToken) {
    var self = this;
    //per i test dada, dada, legiliments  (role master) -> registrato con successo
    //anche dada1,dada1,legiliments (role worker) -> registrato con successo
    self.apiToken = apiToken;
    self.authApiToken = 'APIToken '+apiToken;
};

Repository.prototype.deleteApiToken = function () {
    var self = this;
    //per i test dada, dada, legiliments  (role master) -> registrato con successo
    //anche dada1,dada1,legiliments (role worker) -> registrato con successo
    self.apiToken = undefined;
    self.authApiToken = undefined;
};
Repository.prototype.getApiToken = function () {
    var self = this;
    return self.apiToken;
};

Repository.prototype.getAuthApiToken = function () {
    var self = this;
    return self.authApiToken;
};

Repository.prototype.setSuccessNext = function (next){
    var self = this;
    self.next = next;
};

Repository.prototype.getSuccessNext = function (){
    var self = this;
    return self.next;
};

Repository.prototype.deleteSuccessNext = function(){
    var self = this;
    delete self.next;
};

Repository.prototype.setCurrentCampaign = function(campaign){
    var self = this;
    self.campaign = campaign;
};

Repository.prototype.getCurrentCampaign = function(){
    var self = this;
    return self.campaign;
};

Repository.prototype.deleteCurrentCampaign = function(){
    var self = this;
    delete self.campaign;
};

Repository.prototype.setCurrentImage = function(image){
    var self = this;
    self.image = image;
};

Repository.prototype.getCurrentImage = function(){
    var self = this;
    return self.image;
};
Repository.prototype.deleteCurrentImage = function(){
    var self = this;
    delete self.image;
};

Repository.prototype.setCurrentTask = function(task){
    var self = this;
    self.task = task;
};

Repository.prototype.getCurrentTask = function(){
    var self = this;
    return self.task;
};
Repository.prototype.deleteCurrentTask = function(){
    var self = this;
    delete self.task;
};

exports.Repository = Repository;
exports.createRepository = Repository;
