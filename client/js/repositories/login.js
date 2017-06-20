/**
 * Created by Utente on 23/05/2017.
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

Repository.prototype.login = function (username,pwd) {
    var self = this;
    //per i test dada, dada, legiliments  (role master) -> registrato con successo
    //anche dada1,dada1,legiliments (role worker) -> registrato con successo
    alert("Sto per fare il Promise con dati" + username + pwd);
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/auth',
            type: 'POST',
            headers:{
                'Authorization': 'APIKey de20596e-ea23-4bf8-89f9-0b7f8928d435',
                'Content-Type':'application/json'
            },
            data: JSON.stringify({
                username: username,
                password: pwd,
            })
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;

