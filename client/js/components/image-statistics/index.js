/**
 * Created by Utente on 09/06/2017.
 */
"use strict";
var ko = require('knockout'), $ = require("jquery");



function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;

    var statistics = ctx.repositories.status.getCurrentImageStatistics();
    self.accepted = ko.observable(statistics.selection.accepted);
    self.rejected = ko.observable(statistics.selection.rejected);
    self.annotation = ko.observableArray(statistics.annotation);
    for(var x in statistics.annotation){
        alert(x + " " + statistics.annotation[x]);
    }
    self.annotationAvailable = ko.observable(self.annotation().length);


    //alert(ctx.repositories.status.getCurrentImage());
    self.src = ko.observable(ctx.repositories.status.getCurrentImage()); //canonical URL

    //alert(ctx.repositories.status.getCurrentCampaign().annotation_size);
    self.size = ko.observable(ctx.repositories.status.getCurrentCampaign().annotation_size);

    $("#canvas").on("load", function(){
        ctx = $("#canvas").getContext('2d');
        var image = new Image();
        image.addEventListener("load", function () {
            ctx.drawImage(img, 0, 0);
        });
        image.src = value;
    });

}

exports.register = function () {
    ko.components.register('image-statistics', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
/*
 self.getImageInfo = function(image){
 ctx.repositories.editimages.getImageInfo(
 ctx.repositories.status.getAuthApiToken(),
 //self.images(this).id
 image.id
 ).
 then(function (result) {
 alert("Success imageInfo");
 self.imageInfo(result);
 ctx.repositories.status.setCurrentImage(self.imageInfo().id);
 self.getImageStatistics();
 }).catch(function (e) {
 alert("Error imageInfo");
 alert(e);
 });
 }
 ;
 self.getImageStatistics = function(){
 ctx.repositories.editimages.getImageStatistics(
 ctx.repositories.status.getAuthApiToken(),
 ctx.repositories.status.getCurrentImage()
 ).
 then(function (result) {
 alert("Success imageStatistics");
 //self.imageStatistics(result);
 //alert("acc" +result.selection.accepted);
 //self.accepted(result.selection.accepted);
 alert("rej"+result.selection.rejected);
 self.rejected(result.selection.rejected);
 alert(result.annotation.length);
 self.annotation(result.annotation);
 }).catch(function (e) {
 alert("Error imageStatistics");
 alert(e);
 });
 */