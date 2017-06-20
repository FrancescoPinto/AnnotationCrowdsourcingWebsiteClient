/**
 * Created by Utente on 12/06/2017.
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

Repository.prototype.getTaskStatistics = function (apiToken,statisticsUrl) {
    var self = this;
    return new Promise(function (resolve, reject) {
        alert(apiToken);
        $.ajax({
            url: self._server + statisticsUrl,
            type: 'GET',
            headers:{
                'Authorization': apiToken
            }
        }).done(function (result) {
            for(var x in result){
                alert(x+" "+result[x]);
            }
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

exports.Repository = Repository;
exports.createRepository = Repository;
