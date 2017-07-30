/**
 * Created by Utente on 11/06/2017.
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

Repository.prototype.getWorkers = function (apiToken, workerUrl) {
    var self = this;
    //alert("Promise");
    return new Promise(function (resolve, reject) {
        //alert(self._server + workerUrl);
        //alert(apiToken);
        $.ajax({
            url: self._server + workerUrl,
            type: 'GET',
            dataType: "json",
            headers: {
                'Authorization': apiToken,
            }
        }).done(function (result) {
            /*for(var x in Object.keys(result)){
             alert(Object.keys(result)[x]);
             }

             for(var x in result){
             alert(result[x]);
             }*/
            //alert("successoAjaxWorkers");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("Ho fallito");
            for (var x in jqXHR) {
                alert(x + " " + jqXHR[x]);
            }
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.getWorkerInfo = function (apiToken, workerUrl) {
        var self = this;
       // alert("Promise");
        return new Promise(function (resolve, reject) {
            //alert(self._server + workerUrl);
            //alert(apiToken);
            $.ajax({
                url: self._server + workerUrl,
                type: 'GET',
                dataType: "json",
                headers: {
                    'Authorization': apiToken,
                }
            }).done(function (result) {
               /* for(var x in Object.keys(result)){
                 alert(Object.keys(result)[x]);
                 }

                 for(var x in result){
                 alert(result[x]);
                 }
                alert("successoAjaxWorkerInfo");*/
                resolve(result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert("fallitoAjaxWorkerInfo");
                /*for (var x in jqXHR) {
                    alert(x + " " + jqXHR[x]);
                }*/
                var error = new Error(errorThrown);
                error.textStatus = textStatus;
                error.jqXHR = jqXHR;
                error.errors = jqXHR.responseJSON;
                reject(error);
            });
        });
};

Repository.prototype.setSelector = function (apiToken, isSelector, workerUrl) {
    var self = this;
   // alert("Promise");
    return new Promise(function (resolve, reject) {
        /*alert(self._server + workerUrl);
        alert(apiToken);*/
        $.ajax({
            url: self._server + workerUrl,
            type: isSelector?'POST':'DELETE',
            headers: {
                'Authorization': apiToken,
            }
        }).done(function (result) {
            //alert("successoAjaxSelector");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("fallitoAjaxSelector");
            /*for (var x in jqXHR) {
                alert(x + " " + jqXHR[x]);
            }*/
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.setAnnotator = function (apiToken, isAnnotator, workerUrl) {
    var self = this;
    //alert("Promise");
    return new Promise(function (resolve, reject) {
      //  alert(self._server + workerUrl);
       // alert(apiToken);
        $.ajax({
            url: self._server + workerUrl,
            type: isAnnotator?'POST':'DELETE',
            headers: {
                'Authorization': apiToken,
            }
        }).done(function (result) {
            //alert("successoAjaxAnnotator");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("FallitoAjaxAnnotator");
            /*for (var x in jqXHR) {
                alert(x + " " + jqXHR[x]);
            }*/
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};
exports.Repository = Repository;
exports.createRepository = Repository;
