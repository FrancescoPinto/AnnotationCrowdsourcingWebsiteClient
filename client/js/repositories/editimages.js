/**
 * Created by Utente on 04/06/2017.
 */

"use strict";

var $ = require('jquery'),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.uploadCampaignPhotos = function (apiToken,files, imageUrl) { //forse dovresti crare upload file con un parametro URL che usi per riciclare lo stesso metodo per diverse ufnzionalità
    var self = this;
    //return ctx.repositories.uploadfile(apiToken, files, imageUrl ); @TODO vedi se è più elegante fare uploadfile o come hai deciso di fare ora (in tal caso passa ctx in uploadCampaignPhotos se lo usi)
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: self._server + imageUrl,
            headers:{
                'Authorization': apiToken,
            },
            data: files,
            cache: false,
            processData: false,
            contentType: false,
            success: function(files){
                alert("Caricamento avvenuto con successo!");
            }
        }).done(function (result) {
            for(var x in result){
                alert(x + " " + result[x]);
            }
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON.error;
            reject(error);
        });
    });
};

Repository.prototype.getCampaignImages = function (apiToken, imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            },
        }).done(function (result) {
            /*for(var x in Object.keys(result)){
                alert(Object.keys(result)[x]);
            }

            for(var x in result){
                alert(result[x]);
            }*/
            for(var x in result.images){
                result.images[x].canonical = "http://awt.ifmledit.org"+result.images[x].canonical;
            }
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};

Repository.prototype.getImageInfo = function(apiToken,imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            },
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};

Repository.prototype.getImageStatistics = function(apiToken,imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            },
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};

Repository.prototype.removeImage = function(apiToken,imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'DELETE',
            headers:{
                'Authorization': apiToken,
            },
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {

            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};
exports.Repository = Repository;
exports.createRepository = Repository;
