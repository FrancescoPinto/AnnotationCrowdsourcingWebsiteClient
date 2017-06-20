/**
 * Created by Utente on 05/06/2017.
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

Repository.prototype.uploadImages = function (apitoken, files, imageUrl) {
    var self = this;
    //reference: https://stackoverflow.com/questions/2320069/jquery-ajax-file-upload
    //reference prof.: https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
    //var formData = new FormData();
    // add assoc key values, this will be posts values
    //formData.append("file", file, file.name);
    //formData.append("upload_file", true);

    return new Promise(function (resolve, reject) {
    $.ajax({
        type: "POST",
        url: self._server + imageUrl,
        headers:{
            'Authorization': apitoken,
            'Content-Type':'multipart/form-data'
        },
        data: files,
        cache: false,
        processData: false,
        success: function(files){
            alert("Caricamento avvenuto con successo!");
        }
    }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

//la creazione di una nuova campagna la sposterei in un'altra component/repository

exports.Repository = Repository;
exports.createRepository = Repository;


