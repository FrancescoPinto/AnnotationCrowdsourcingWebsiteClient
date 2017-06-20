/*jslint node:true, nomen: true */
"use strict";

var $ = require('jquery'),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.validateAndSend = function (fullname,username,pwd1,role) {
    var self = this;
    //per i test dada, dada, legiliments -> registrato con successo
    //anche dada1,dada1,legiliments
    alert("Sto per fare il Promise con dati" + fullname + username + pwd1 + role);
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: self._server + '/api/user',
                type: 'POST',
                headers:{
                  'Authorization': 'APIKey de20596e-ea23-4bf8-89f9-0b7f8928d435',
                    'Content-Type':'application/json',
                },
                data: JSON.stringify({
                    fullname: fullname,
                    username: username,
                    password: pwd1,
                    type: role
                })
            }).done(function (result) {
                //alert("Ho inviato il messaggio");
                resolve(result.result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                //alert("Ho fallito");
                /*alert(textStatus);
                for (var x in jqXHR)
                {
                    alert(jqXHR[x]);
                }*/
                //404, Not Found -> credo il problema sia che non acchiappi il sito
                //RISOLTO inserendo come parametro server http://awt ecc.
                //401 Unauthorized
                var error = new Error(errorThrown);
                error.textStatus = textStatus;
                error.jqXHR = jqXHR;
                error.errors = JSON.parse(jqXHR.responseText);
                //error.errors = jqXHR.responseJSON.errors;
                /*for (var x in jqXHR)
                {
                    alert("Posizione " + x + " .... " + jqXHR[x]);
                }*/
                reject(error);
            });
        });
};

exports.Repository = Repository;
exports.createRepository = Repository;
