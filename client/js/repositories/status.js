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
    self.task = undefined;
};

Repository.prototype.setCurrentImageStatistics = function(imageStatistics){
    var self = this;
    self.imageStatistics = imageStatistics;
};

Repository.prototype.getCurrentImageStatistics = function(){
    var self = this;
    return self.imageStatistics;
};

Repository.prototype.getUserInfo = function () {
    var self = this;
    return self.userInfo;
};
Repository.prototype.deleteUserInfo = function () {
    var self = this;
    self.userInfo = undefined;
};
Repository.prototype.setUserInfo = function (userInfo) {
    var self = this;
    self.userInfo = userInfo;
};

Repository.prototype.getTasksInfo = function () {
    var self = this;
    return self.tasksInfo;
};
Repository.prototype.deleteTasksInfo = function () {
    var self = this;
    self.tasksInfo = undefined;
};
Repository.prototype.setTasksInfo = function (tasksInfo) {
    var self = this;
    self.tasksInfo = tasksInfo;
};

Repository.prototype.getUserCampaigns = function () {
    var self = this;
    return self.userCampaigns;
};
Repository.prototype.deleteUserCampaigns = function () {
    var self = this;
    self.userCampaigns = undefined;
};
Repository.prototype.setUserCampaigns = function (userCampaigns) {
    var self = this;
    self.userCampaigns = userCampaigns;
};

Repository.prototype.getCurrentCampaignStatistics = function () {
    var self = this;
    return self.currentCampaignStatistics;
};
Repository.prototype.deleteCurrentCampaignStatistics = function () {
    var self = this;
    self.currentCampaignStatistics = undefined;
};
Repository.prototype.setCurrentCampaignStatistics = function (currentCampaignStatistics) {
    var self = this;
    self.currentCampaignStatistics = currentCampaignStatistics;
};

Repository.prototype.setCurrentCampaignStatisticsImages = function(imgs){
    var self = this;
    self.currentCampaignStatisticsImages = imgs;
}

Repository.prototype.getCurrentCampaignStatisticsImages = function () {
    var self = this;
    return self.currentCampaignStatisticsImages;
};


Repository.prototype.setCurrentCampaignImages = function(imgs){
    var self = this;
    self.currentCampaignImages = imgs;
};

Repository.prototype.getCurrentCampaignImages = function(){
    var self = this;
    return self.currentCampaignImages;
};

Repository.prototype.deleteCurrentCampaignImages = function(){
    var self = this;
    self.currentCampaignImages = undefined;
};

Repository.prototype.setOldImagesUrl = function(old){
    var self = this;
    self.oldImagesUrl;
};
Repository.prototype.getOldImagesUrl = function(){
    var self = this;
    return self.oldImagesUrl;
};
Repository.prototype.deleteOldImagesUrl = function(){
    var self = this;
    self.oldImagesUrl = undefined;
};


Repository.prototype.clearCache = function(){
    var self = this;
    self.deleteCurrentImage();
    self.deleteCurrentCampaignStatistics();
    self.deleteCurrentCampaign();
    self.deleteApiToken();
    self.deleteCurrentTask();
    self.deleteUserInfo();
    self.deleteTasksInfo();
    self.deleteUserCampaigns();
    self.deleteCurrentCampaignImages();
    self.deleteOldImagesUrl();
};

exports.Repository = Repository;
exports.createRepository = Repository;
