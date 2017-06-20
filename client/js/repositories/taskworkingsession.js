/**
 * Created by Utente on 13/06/2017.
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

Repository.prototype.startWorkingSession = function (apiToken,sessionUrl) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + sessionUrl,
            type: 'POST',
            headers:{
                'Authorization': apiToken
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};


Repository.prototype.getNextTaskInstance = function (apiToken,sessionUrl) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + sessionUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken
            }
        }).done(function (result) {
            alert(result.image);
            result.image = "http://awt.ifmledit.org"+result.image;
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            /*for (var x in jqXHR)
            {
                alert(jqXHR[x]);
            }*/
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.submitAnnotation = function(apiToken,sessionUrl,skyline){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + sessionUrl,
            type: 'PUT',
            headers:{
                'Authorization': apiToken,
                'Content-Type':"application/json"
            },
            data:JSON.stringify({"skyline":skyline})
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            for (var x in jqXHR)
            {
                alert(jqXHR[x]);
            }
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.submitSelection = function(apiToken,sessionUrl,accepted) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + sessionUrl,
            type: 'PUT',
            headers: {
                'Authorization': apiToken,
                'Content-Type': "application/json"
            },
            data: JSON.stringify({"accepted": accepted})
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            /*for (var x in jqXHR) {
                alert(jqXHR[x]);
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
