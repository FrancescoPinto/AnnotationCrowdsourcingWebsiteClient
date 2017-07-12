/**
 * Created by Utente on 10/06/2017.
 */
"use strict";

var ko = require('knockout');

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.campaignName = ko.observable(ctx.repositories.status.getCurrentCampaign().name);
    var tempStat = ctx.repositories.status.getCurrentCampaignStatistics();
    self.imagesC = ko.observable(tempStat.images);
    self.accepted = ko.observable(tempStat.accepted);
    self.rejected = ko.observable(tempStat.rejected);
    self.annotation = ko.observable(tempStat.annotation);
    self.images = ko.observableArray(ctx.repositories.status.getCurrentCampaignStatisticsImages());


//    self.setCampaignStatistics = function(result){

  //  };
    //self.getCampaignStatistics = function () {
        /*var cachedResult = ctx.repositories.status.getCurrentCampaignStatistics();
         if(cachedResult){
         self.setCampaignStatistics(cachedResult);
         }else {*/
       /* ctx.repositories.endedcampaignstatistics.getCampaignStatistics(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentCampaign().statistics
        ).then(function (result) {
            //alert("Success");
            self.imagesC(result.images);
            self.accepted(result.accepted);
            self.rejected(result.rejected);
            self.annotation(result.annotation);
            //ctx.repositories.status.setCurrentCampaignStatistics(result);
        }).catch(function (e) {
            //alert("Error");
            self.shouldShowMessage(true);
            var temp = '';
            for (var x in e.errors) {
                temp += x + ": " + e.errors[x];
            }
            self.errorMessage(" " + temp);
        });
        //}
    };

        self.loaded = function(){
        ctx.repositories.editimages.getCampaignImages(
        ctx.repositories.status.getAuthApiToken(),
        ctx.repositories.status.getCurrentCampaign().image
        ).
        then(function (result) {
        self.images(result.images);
        }).catch(function (e) {
        alert("Error loaded");
        alert(e);
        });
        };
*/

    //RACCOGLIE STATISTIC URL, POI LO USA PER ALTRO SCOPO
    self.getImageInfo = function(image){
        ctx.repositories.endedcampaignstatistics.getImageInfo(
            ctx.repositories.status.getAuthApiToken(),
            image.id
        ).then(function (result) {
            ctx.repositories.endedcampaignstatistics.getImageStatistics(
                ctx.repositories.status.getAuthApiToken(),
                result.statistics
            ).then(function(result){
                ctx.repositories.status.setCurrentImageStatistics(result);
                ctx.repositories.status.setCurrentImage(image.canonical);
                location.hash = "/ImageStatistics";
            }).catch(function (e){
                alert("Error getImageStatistics");
                alert(e);
            });
        }).catch(function (e) {
            alert("Error getImageInfo");
            alert(e);
        });

    };

   // self.loaded();
    // self.getCampaignStatistics();
}

exports.register = function () {
    ko.components.register('ended-campaign-statistics', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
