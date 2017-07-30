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

Repository.prototype.getUserInfo = function (apitoken) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/user/me',
            type: 'GET',
            dataType: 'json',
            headers:{
                'Authorization': apitoken
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

Repository.prototype.getTasksInfo = function (apitoken){
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/task',
            type: 'GET',
            dataType: 'json',
            headers:{
                'Authorization': apitoken
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

Repository.prototype.getTaskInfo = function (apitoken,taskUrl){
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + taskUrl,
            type: 'GET',
            dataType: 'json',
            headers:{
                'Authorization': apitoken
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            for (var x in jqXHR) {
                alert("" + x + ":" + jqXHR[x]);
            }
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

Repository.prototype.getCampaignInfo = function (id,apitoken){
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + id,
            type: 'GET',
            headers:{
                'Authorization': apitoken
            }
        }).done(function (result) {
            //alert("successo getCampaignAjax");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
            alert("Fallito getCampaignAjax");
        });
    });
}

Repository.prototype.editUserInfo = function (fullname, password, apitoken) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/user/me',
            type: 'PUT',
            //dataType : 'json',
            headers:{
                'Authorization': apitoken,
                'Content-Type':'application/json',
            },
            data: JSON.stringify({
                fullname: fullname,
                password: password,
            })
        }).done(function (result) {
            //alert("SuccessoAjax");
            resolve(result.result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("FallitoAjax");
            /*for (var x in jqXHR) {
                alert("" + x + ":" + jqXHR[x]);
            }
            /*for(var x in jqXHR.error){
                alert( ""+x+" :"+jqXHR.error[x]);
                tempErrors.push((""+x+" :"+jqXHR.error[x]));
            }*/
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

Repository.prototype.getUserCampaigns = function (apitoken) {
    var self = this;

    return new Promise(function (resolve, reject) {

        $.ajax({
            url: self._server + '/api/campaign',
            type: 'GET',
            dataType : 'json',
            headers:{
                'Authorization': apitoken,
                'Content-Type':'application/json',
            },
        }).done(function (result) {
            //alert("SuccessoAjaxCampaigns");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("FallitoAjax");
            /*for (var x in jqXHR) {
             alert("" + x + ":" + jqXHR[x]);
             }
             /*for(var x in jqXHR.error){
             alert( ""+x+" :"+jqXHR.error[x]);
             tempErrors.push((""+x+" :"+jqXHR.error[x]));
             }*/
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

Repository.prototype.startCampaign = function(campaign,apitoken) {
    var self = this;
    return new Promise(function (resolve, reject) {
    $.ajax({
        url: self._server + campaign,
        type: 'POST',
        headers: {
            'Authorization': apitoken
        }
    }).done(function (result) {
       // alert("SuccessoAjaxStartCampaign");
        resolve(result);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("FallitoAjaxStartCampaign");
        alert(textStatus);
        for (var x in jqXHR) {
         alert("" + x + ":" + jqXHR[x]);
         }/*
         for(var x in jqXHR.error){
         alert( ""+x+" :"+jqXHR.error[x]);
         tempErrors.push((""+x+" :"+jqXHR.error[x]));
         }*/

        var error = new Error(errorThrown);
        error.textStatus = textStatus;
        error.jqXHR = jqXHR;
        error.errors = JSON.parse(jqXHR.responseText);
        reject(error);
    });
})};

Repository.prototype.terminateCampaign = function(campaign,apitoken) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + campaign,
            type: 'DELETE',
            headers: {
                'Authorization': apitoken
            }
        }).done(function (result) {
           // alert("SuccessoAjaxTerminateCampaign");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("FallitoAjaxTerminateCampaign");
            alert(textStatus);
            for (var x in jqXHR) {
                alert("" + x + ":" + jqXHR[x]);
            }/*
             for(var x in jqXHR.error){
             alert( ""+x+" :"+jqXHR.error[x]);
             tempErrors.push((""+x+" :"+jqXHR.error[x]));
             }*/

            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    })};

//la creazione di una nuova campagna la sposterei in un'altra component/repository

exports.Repository = Repository;
exports.createRepository = Repository;


