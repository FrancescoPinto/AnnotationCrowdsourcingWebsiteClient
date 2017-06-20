/**
 * Created by Utente on 03/06/2017.
 */
"use strict";

var ko = require('knockout');



function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.images = ko.observableArray();
    self.imageInfo = ko.observable();
    self.accepted = ko.observable();
    self.rejected = ko.observable();
    self.annotation = ko.observableArray();
    /*self.images().imageUrlSrc = function(){
        return "http://awt.ifmledit.org"+this.canonical;
    }*/
    //self.imageStatistics = ko.observable();


    self.addImages = function(){
        /*for(var x in ctx.repositories.status.getCurrentCampaign()) {
            alert(x + " "+ ctx.repositories.status.getCurrentCampaign()[x]);
        }*/

        var data = new FormData();
        data.append("file.jpg",document.getElementById("images").files[0]);

        /*var i = 0;
        for(var x in document.getElementById("images").files[x]){
            i++;
            data.append("file"+i,document.getElementById("images").files[x]);
            alert("file"+i + " appended");
        }
        //@TODO PER UN'ANTEPRIMA DEL FILE
        /* $(":file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });

         function imageIsLoaded(e) {
         $('#myImg').attr('src', e.target.result);
         };
         http://jsfiddle.net/vacidesign/ja0tyj0f/


        /*var data = new FormData();
        //@TODO PER ORA FAI SINGOLO FILE ALLA VOLTA
        data.append("file",$("#images").files[0]);

        var i = 0;
        for(var x in $("#images").files[x]){
            i++;
            data.append("file"+i,$("#images").files[x]);
            alert("file"+i + " appended");
        }
        /*jQuery.each($("#images").files, function(i, file) {
            data.append('file-'+i, file);
        });*/
        //alert(ctx.repositories.status.getAuthApiToken());

        ctx.repositories.editimages.uploadCampaignPhotos(
            ctx.repositories.status.getAuthApiToken(),
            data,
            ctx.repositories.status.getCurrentCampaign().image
        ).then(function (result) {
            alert("Success upload");
            self.loaded();
        }).catch(function (e) {
            alert("Error upload");
            alert(e);
        });

        /*for(var i in $("#images").files){
            var upload = new Upload($("#images").files[i]);
            upload.doUpload();
            //var reader = new FileReader();

            //reader.readAsDataURL($("#images").files[i]);
            //DA FARE: Progress Bar
            /*var progBar = $("<div></div>").attr({"class":"progress"}).
                appendChild($("<div></div>").attr({
                    "id":i,
                    "class":"progress-bar",
                    "role": "progressbar",
                    "aria-valuenow":"0",
                    "aria-valuemin":"0",
                    "aria-valuemax":"100",
                    "style":"width:70%"
            })).text(0 + "%");
            $("#nextButton").before(progBar);*/
            //$("#nextButton").before($("<span></span>").attr({"id":i}).text("caricato il 0 %"));
            //$("#nextButton").before($("<img></img>").attr({"id":"image"+i}));
            //reader.onprogress = function(evt) { self.updateProgress(evt,i);};
            //reader.onload = function(evt) {self.loaded(evt,i)};
            //reader.onerror = self.errorHandler;
            //reader.onprogress = self.updateProgress(evt);
            //reader.onload = self.loaded(evt);
            //reader.onerror = self.errorHandler;
        //}
    }

    /*self.updateProgress = function(evt,i){
        if (evt.lengthComputable) {
            var loaded = (evt.loaded / evt.total);
            //INSERISCI CODICE PROGRESS BAR
            if (loaded < 1) {
                // Increase the prog bar length
                // style.width = (loaded * 200) + "px";
                $("#"+i).text("caricato il "+ loaded +"%");
            } if(loaded ==1){
                //nascondi barra
            }
        }
    };
    self.loaded = function(evt,i){
        $("#image"+i).attr('src', evt.target.result);
    };*/
    self.removeImage = function(image){
        alert(image.id);
        ctx.repositories.editimages.removeImage(
            ctx.repositories.status.getAuthApiToken(),
            image.id
            //self.images(this)).id
        ).then(function (result) {
            alert("Success Removed");
            self.loaded();
        }).catch(function (e) {
            alert("Error Removed");
            alert(e);
        });
    }

    self.loaded = function(){
        alert(ctx.repositories.status.getCurrentCampaign().image);
       ctx.repositories.editimages.getCampaignImages(
           ctx.repositories.status.getAuthApiToken(),
           ctx.repositories.status.getCurrentCampaign().image
       ).
       then(function (result) {
           alert(Object.keys(result).length);
           for(var x in Object.getOwnPropertyNames(result))
           {
               alert(x + " " +result[x]);
           }
           for(var x in result.images){
               alert(result.images[x].id);
           }
           alert("Success loaded");
           self.images(result.images);

           /*for(var x in result.images){
               result.images[x].canonical = "http://awt.ifmledit.org" + result.images[x].canonical;
           }*/

           if(!(result[images] === undefined)) {
               if (result[images].length > 0) {
                   self.images(result);
               }
           }
       }).catch(function (e) {
           alert("Error loaded");
           alert(e);
       });
    };

    self.errorHandler = function(evt){
        alert(evt.target.error.name);
    };

    self.loaded();



    //$("images").on("click",self.addImages);
}

exports.register = function () {
    ko.components.register('edit-images-campaign', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};