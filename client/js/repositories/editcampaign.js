/**
 * Created by Utente on 25/06/2017.
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

Repository.prototype.editCampaign = function (apiToken,id,campaignName,selectionReplica,threshold,annotationReplica,annotationSize) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + id,
            type: 'PUT',
            headers:{
                'Authorization': apiToken,
                'Content-Type':'application/json'
            },
            data: JSON.stringify({
                name:campaignName,
                selection_replica: parseInt(selectionReplica),
                threshold: parseInt(threshold),
                annotation_replica:parseInt(annotationReplica),
                annotation_size: parseInt(annotationSize)
            })
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            //alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            //alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            /*for(var x in temp){
                alert(x +" "+ temp[x]);
            }*/
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;
