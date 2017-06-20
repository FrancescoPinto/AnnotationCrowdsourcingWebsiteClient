/**
 * Created by Utente on 24/05/2017.
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

Repository.prototype.logout = function (apitoken) {
    var self = this;
    var auth = 'APIToken '+apitoken;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/auth',
            type: 'DELETE',
            headers:{
                'Authorization': auth
            }
        }).done(function (result) {
            resolve(result.result);
        }).fail(function (jqXHR, textStatus, errorThrown) {

            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON.errors;
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;

