/**
 * Created by Utente on 03/06/2017.
 */
"use strict";

var ko = require('knockout');



function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.workers = ko.observableArray();
    self.currentWorker = ko.observable();

    self.getWorkers = function(){
        //alert("sto per fare workers");
        ctx.repositories.editworkers.getWorkers(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentCampaign().worker
        ).
        then(function (result) {
           // alert("successo workers");
           // alert(Object.keys(result).length);
            /*for(var x in Object.getOwnPropertyNames(result))
            {
                alert(x + " " +result[x]);
            }*/
           /* for(var x in result.workers){
                alert(result.workers[x].id);
            }*/
            self.workers(result.workers);
        }).catch(function (e) {
            alert("Error workers");
            alert(e);
        });
    };
    self.getWorkers();

    self.submitWorker = function(worker){
        //alert("sto per fare submitWorker");
        ctx.repositories.editworkers.getWorkerInfo(
            ctx.repositories.status.getAuthApiToken(),
            worker.id
        ).
        then(function (result) {
           // alert("successo submitWorker");
            /*for(var x in Object.getOwnPropertyNames(result))
             {
             alert(x + " " +result[x]);
             }*/
            self.currentWorker(result);
            self.setSelector(worker);
            self.setAnnotator(worker);
        }).catch(function (e) {
            alert("Error submitWorker");
            alert(e);
        });
    };


    self.setSelector = function(worker){
        //alert("Sto per fare setSelector");
        ctx.repositories.editworkers.setSelector(
            ctx.repositories.status.getAuthApiToken(),
            worker.selector,
            self.currentWorker().selection
        ).
        then(function (result) {
            //alert("successo selectionEdit");
        }).catch(function (e) {
            //alert("Successo");
            alert(e);
        });
    };
    self.setAnnotator = function(worker){

        ctx.repositories.editworkers.setSelector(
            ctx.repositories.status.getAuthApiToken(),
            worker.annotator,
            self.currentWorker().annotation
        ).
        then(function (result) {
            alert("Successo");
        }).catch(function (e) {
            alert("Error annotationEdit");
            alert(e);
        });
    };
}

exports.register = function () {
    ko.components.register('edit-workers-campaign', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};