(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 02/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.campaignName = ko.observable();
    self.selectionReplica = ko.observable();
    self.threshold = ko.observable();
    self.annotationReplica = ko.observable();
    self.annotationSize = ko.observable();

    self.shouldShowMessage = ko.observable(false);
    self.errorMessage = ko.observable();

    self.createCampaign = function () {
        ctx.repositories.createcampaign.createCampaign(
            ctx.repositories.status.getAuthApiToken(),
            self.campaignName(),
            self.selectionReplica(),
            self.threshold(),
            self.annotationReplica(),
            self.annotationSize()
        ).then(function (result) {
            alert("Success");
            ctx.repositories.status.setSuccessNext('/UserHome');
            location.hash = '/OperationSuccess';
        }).catch(function (e) {
            alert("Error");
            self.shouldShowMessage(true);
            var temp = ''
            for(var x in e.errors){
                temp += x + ": " + e.errors[x];
            }
            self.errorMessage(" " +temp);
        });
    };

}

exports.register = function () {
    ko.components.register('create-campaign', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":2}],2:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">New Campaign Creation </div>\r\n                <div class=\"panel-body\">\r\n                    <form class=\"form-horizontal\">\r\n                        <div class=\"alert alert-danger alert-dismissable fade in\" data-bind = \"visible: shouldShowMessage\">\r\n                            <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                            <strong>Warning!</strong><span data-bind = \"text:errorMessage\"></span>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"campaignname\">Name:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"text\" class=\"form-control\" id=\"campaignname\" placeholder=\"Campaign Name\" data-bind = \"textInput: campaignName\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"selectionreplica\">Selection Replica:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"selectionreplica\" placeholder=\"Selection Replica\" data-bind = \"textInput: selectionReplica\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"threshold\">Threshold:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"threshold\" placeholder=\"Threshold\" data-bind = \"textInput: threshold\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"annotationreplica\">Annotation Replica:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"annotationreplica\" placeholder=\"Annotation Replica\" data-bind = \"textInput: annotationReplica\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"annotationsize\">Annotation Size:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"annotationsize\" placeholder=\"Annotation Size (px)\" data-bind = \"textInput: annotationSize\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"col-sm-offset-2 col-sm-10\">\r\n                                <button type=\"submit\" class=\"btn btn-default\" data-bind = \"click: createCampaign\">Create Campaign</button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],3:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 03/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);



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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":4}],4:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-1\"></div>\r\n\r\n        <div class = \"col-sm-7\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">Add images to the Campaign</div>\r\n                <div class=\"panel-body\">\r\n                    <form class=\"form-horizontal\">\r\n                        <input id = \"images\"  type=\"file\" accept = \"image/jpeg\" class=\"btn btn-default\"></input>\r\n                        <input type = \"submit\" value = \"Add Images\" data-bind = \"click: addImages\"/>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">Edit images of Campaign</div>\r\n                <div class=\"panel-body\">\r\n                        <p> Press the X button to remove an image from the campaign</p>\r\n                    <ul data-bind=\"foreach: images\" style = \"list-style-type:none\">\r\n                        <li>\r\n                        <div class=\"panel panel-primary\">\r\n                            <div class=\"panel-heading\">\r\n                                <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\" data-bind = \"click: $parent.removeImage\">&times;</a>\r\n                            </div>\r\n                            <div class=\"panel-body\">\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-md-4\">\r\n                                        <div class=\"thumbnail\">\r\n                                            <!--<a href = \"#\" data-bind = \"click: $parent.getImageInfo\">-->\r\n                                                <img data-bind = \"attr: {src: canonical}\"/>\r\n                                            <!--</a>-->\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                     </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-1\"></div>\r\n    </div>\r\n</div>";

},{}],5:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 03/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);



function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.workers = ko.observableArray();
    self.currentWorker = ko.observable();

    self.getWorkers = function(){
        alert("sto per fare workers");
        ctx.repositories.editworkers.getWorkers(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentCampaign().worker
        ).
        then(function (result) {
            alert("successo workers");
            alert(Object.keys(result).length);
            /*for(var x in Object.getOwnPropertyNames(result))
            {
                alert(x + " " +result[x]);
            }*/
            for(var x in result.workers){
                alert(result.workers[x].id);
            }
            self.workers(result.workers);
        }).catch(function (e) {
            alert("Error workers");
            alert(e);
        });
    };
    self.getWorkers();

    self.submitWorker = function(worker){
        alert("sto per fare submitWorker");
        ctx.repositories.editworkers.getWorkerInfo(
            ctx.repositories.status.getAuthApiToken(),
            worker.id
        ).
        then(function (result) {
            alert("successo submitWorker");
            /*for(var x in Object.getOwnPropertyNames(result))
             {
             alert(x + " " +result[x]);
             }*/
            self.currentWorker(result);
            self.setSelector(worker);
            self.setAnnotator(worker);
        }).catch(function (e) {
            alert("Error submitWorker");
            alert(e);
        });
    };


    self.setSelector = function(worker){
        alert("Sto per fare setSelector");
        ctx.repositories.editworkers.setSelector(
            ctx.repositories.status.getAuthApiToken(),
            worker.selector,
            self.currentWorker().selection
        ).
        then(function (result) {
            alert("successo selectionEdit");
        }).catch(function (e) {
            alert("Error SelectionEdit");
            alert(e);
        });
    };
    self.setAnnotator = function(worker){

        ctx.repositories.editworkers.setSelector(
            ctx.repositories.status.getAuthApiToken(),
            worker.annotator,
            self.currentWorker().annotation
        ).
        then(function (result) {
            alert("successo annotationEdit");
        }).catch(function (e) {
            alert("Error annotationEdit");
            alert(e);
        });
    };
}

exports.register = function () {
    ko.components.register('edit-workers-campaign', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":6}],6:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">Workers for the campaign</div>\r\n                <div class=\"panel-body\">\r\n                    <h4>Assign one or more roles to the desired workers, then click submit: </h4>\r\n                    <table>\r\n                        <thead>\r\n                        <tr><th>Worker Name</th><th>Selector</th><th>Annotator</th></tr>\r\n                        </thead>\r\n                        <tbody data-bind=\"foreach: workers\">\r\n                        <tr>\r\n                            <td><a href = \"#\"><span data-bind=\"text: fullname\"></span></a></td>\r\n                            <td> <input type=\"checkbox\" data-bind=\"checked: selector\" /></td>\r\n                            <td> <input type=\"checkbox\" data-bind=\"checked: annotator\" /></td>\r\n                            <td><button data-bind = \"click: $parent.submitWorker\">Submit</button></td>\r\n                        </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n    <div>\r\n        <p><span data-bind = \"currentWorker.selection\"></span></br><span data-bind = \"currentWorker.annotation\"></span></p>\r\n    </div>\r\n</div>";

},{}],7:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 10/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.campaignName = ko.observable(ctx.repositories.status.getCurrentCampaign().name);
    self.imagesC = ko.observable();
    self.accepted = ko.observable();
    self.rejected = ko.observable();
    self.annotation = ko.observable();
    self.images = ko.observableArray();


    self.getCampaignStatistics = function () {
        ctx.repositories.endedcampaignstatistics.getCampaignStatistics(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentCampaign().statistics
        ).then(function (result) {
            alert("Success");
            self.imagesC(result.images);
            self.accepted(result.accepted);
            self.rejected(result.rejected);
            self.annotation(result.annotation);
        }).catch(function (e) {
            alert("Error");
            self.shouldShowMessage(true);
            var temp = '';
            for(var x in e.errors){
                temp += x + ": " + e.errors[x];
            }
            self.errorMessage(" " +temp);
        });
    };

    self.loaded = function(){
        ctx.repositories.editimages.getCampaignImages(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentCampaign().image
        ).
        then(function (result) {
            self.images(result.images);

            /*if(!(result[images] === undefined)) {
                if (result[images].length > 0) {
                    self.images(result);
                }
            }*/
        }).catch(function (e) {
            alert("Error loaded");
            alert(e);
        });
    };


    //RACCOGLIE STATISTIC URL, POI LO USA PER ALTRO SCOPO
    self.getImageInfo = function(image){
        ctx.repositories.endedcampaignstatistics.getImageInfo(
            ctx.repositories.status.getAuthApiToken(),
            image.id
        ).then(function (result) {
            ctx.repositories.endedcampaignstatistics.getImageStatistics(
                ctx.repositories.status.getAuthApiToken(),
                result.statistics
            ).then(function(result){
                ctx.repositories.status.setCurrentImageStatistics(result);
                ctx.repositories.status.setCurrentImage(image.canonical);
                location.hash = "/ImageStatistics";
            }).catch(function (e){
                alert("Error getImageStatistics");
                alert(e);
            });
        }).catch(function (e) {
            alert("Error getImageInfo");
            alert(e);
        });

    };

    self.loaded();
    self.getCampaignStatistics();
}

exports.register = function () {
    ko.components.register('ended-campaign-statistics', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":8}],8:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n                <div class=\"panel panel-primary\">\r\n                    <div class=\"panel-heading\">Campaign statistics</div>\r\n                    <div class=\"panel-body\">\r\n                        <p>\r\n                            Number of images: <span data-bind = \"text:imagesC\"></span><br/>\r\n                            Number of accepted images: <span data-bind = \"text:accepted\"></span><br/>\r\n                            Number of rejected images: <span data-bind = \"text:rejected\"></span><br/>\r\n                            Number of annotations: <span data-bind = \"text:annotation\"></span>\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n    <div class = \"row\">\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\"> Images of the Campaign</div>\r\n                <div class=\"panel-body\">\r\n                    <ul data-bind=\"foreach: images\" style = \"list-style-type:none\">\r\n                        <li>\r\n                            <div class=\"panel-body\">\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-md-4\">\r\n                                        <div class=\"thumbnail\">\r\n                                            <a href = \"#\" data-bind = \"click: $parent.getImageInfo\">\r\n                                                <img class=\"img-thumbnail img-responsive\" data-bind = \"attr: {src: canonical}\"/>\r\n                                            </a>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],9:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 22/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
}

exports.register = function () {
    ko.components.register('home-page', {
        template: require('./template.html'),
        viewModel: ViewModel,
    });
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":10}],10:[function(require,module,exports){
module.exports = "\r\n<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Your Crowdsourcing Campaign Starts Now</h1>\r\n            <div class = \"row\">\r\n                <div class = \"col-sm-3\"></div>\r\n                <div class = \"col-sm-3\">\r\n                    <a data-bind = \"path: '/SignUp'\" class=\"btn btn-primary\" role=\"button\"><span class=\"glyphicon glyphicon-user\"></span> SignUp</a>\r\n                </div>\r\n                <div class = \"col-sm-3\">\r\n                    <a data-bind = \"path: '/LogIn'\" class=\"btn btn-primary\" role=\"button\"><span class=\"glyphicon glyphicon-log-in\"></span> LogIn</a>\r\n                </div>\r\n                <div class = \"col-sm-3\"></div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>\r\n";

},{}],11:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 09/06/2017.
 */
"use strict";
var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null), $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);



function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;

    var statistics = ctx.repositories.status.getCurrentImageStatistics();
    self.accepted = ko.observable(statistics.selection.accepted);
    self.rejected = ko.observable(statistics.selection.rejected);
    self.annotation = ko.observableArray(statistics.annotation);
    for(var x in statistics.annotation){
        alert(x + " " + statistics.annotation[x]);
    }
    self.annotationAvailable = ko.observable(self.annotation().length);


    //alert(ctx.repositories.status.getCurrentImage());
    self.src = ko.observable(ctx.repositories.status.getCurrentImage()); //canonical URL

    //alert(ctx.repositories.status.getCurrentCampaign().annotation_size);
    self.size = ko.observable(ctx.repositories.status.getCurrentCampaign().annotation_size);

    $("#canvas").on("load", function(){
        ctx = $("#canvas").getContext('2d');
        var image = new Image();
        image.addEventListener("load", function () {
            ctx.drawImage(img, 0, 0);
        });
        image.src = value;
    });

}

exports.register = function () {
    ko.components.register('image-statistics', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
/*
 self.getImageInfo = function(image){
 ctx.repositories.editimages.getImageInfo(
 ctx.repositories.status.getAuthApiToken(),
 //self.images(this).id
 image.id
 ).
 then(function (result) {
 alert("Success imageInfo");
 self.imageInfo(result);
 ctx.repositories.status.setCurrentImage(self.imageInfo().id);
 self.getImageStatistics();
 }).catch(function (e) {
 alert("Error imageInfo");
 alert(e);
 });
 }
 ;
 self.getImageStatistics = function(){
 ctx.repositories.editimages.getImageStatistics(
 ctx.repositories.status.getAuthApiToken(),
 ctx.repositories.status.getCurrentImage()
 ).
 then(function (result) {
 alert("Success imageStatistics");
 //self.imageStatistics(result);
 //alert("acc" +result.selection.accepted);
 //self.accepted(result.selection.accepted);
 alert("rej"+result.selection.rejected);
 self.rejected(result.selection.rejected);
 alert(result.annotation.length);
 self.annotation(result.annotation);
 }).catch(function (e) {
 alert("Error imageStatistics");
 alert(e);
 });
 */
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":12}],12:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n<div class = \"col-sm-2\">\r\n</div>\r\n    <div class = \"col-sm-4\">\r\n        <div class=\"panel panel-primary\">\r\n            <div class=\"panel-heading\">Selection Statistics</div>\r\n            <div class=\"panel-body\">\r\n                <p>\r\n                    Selection:<br/>\r\n                    Accepted: <span data-bind = \"text:accepted\"></span><br/>\r\n                    Rejected: <span  data-bind = \"text:rejected\"></span><br/>\r\n                </p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class = \"col-sm-6\">\r\n        <div class=\"panel panel-primary\">\r\n            <div class=\"panel-heading\">Annotation Statistics</div>\r\n            <div class=\"panel-body\">\r\n                <div data-bind = \"ifnot: annotationAvailable\">\r\n                    No annotations are avilable for this campaign.\r\n                </div>\r\n                <div data-bind = \"if:annotationAvailable\">\r\n                    <!--TEMPORANEO-->\r\n                    <ol data-bind = \"foreach: {data: annotation, as: 'myAnnotation'}\">\r\n                        <li class = \"linedrawer\">\r\n                            <line-displayer params=\"src: $parent.src, data: myAnnotation\"></line-displayer>\r\n                            <!--<img data-bind=\"attr: { src: $parent.src }\" class=\"background\" draggable=\"false\">\r\n                            <canvas id = \"canvas\"></canvas>\r\n                            <span data-bind = \"text: annotation\"></span>-->\r\n                        </li>\r\n                    </ol>\r\n                    <!--\r\n                <div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\" >\r\n\r\n                    <ol class=\"carousel-indicators\" data-bind = \"foreach: annotation\">\r\n                        <div data-bind = \"ifnot:$index\">\r\n                            <li data-target=\"#myCarousel\" data-slide-to=\"$index\" class=\"active\"></li>\r\n                        </div>\r\n                        <div data-bind = \"if:$index\">\r\n                            <li data-target=\"#myCarousel\" data-slide-to=\"$index\"></li>\r\n                        </div>\r\n                    </ol>\r\n\r\n                    <div class=\"carousel-inner\" data-bind = \"foreach: annotation\">\r\n                        <div data-bind = \"ifnot:$index\" class=\"item active\">\r\n                            <line-displayer params=\"src: image, pen: size, line: $data\"></line-displayer>\r\n                        </div>\r\n\r\n                        <div class=\"item\" data-bind = \"if:$index\">\r\n                            <line-displayer params=\"src: image, pen: size, line: $data\"></line-displayer>\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n\r\n                    <a class=\"left carousel-control\" href=\"#myCarousel\" data-slide=\"prev\">\r\n                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                        <span class=\"sr-only\">Previous</span>\r\n                    </a>\r\n                    <a class=\"right carousel-control\" href=\"#myCarousel\" data-slide=\"next\">\r\n                        <span class=\"glyphicon glyphicon-chevron-right\"></span>\r\n                        <span class=\"sr-only\">Next</span>\r\n                    </a>\r\n                    -->\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class = \"col-sm-2\"></div>\r\n</div>\r\n<div class = \"row\">\r\n    <div class = \"col-sm-2\"></div>\r\n    <div class = \"col-sm-2\">\r\n        <a data-bind = \"path: '/CampaignStatistics'\" class=\"btn btn-primary\" role=\"button\"><span class=\"glyphicon glyphicon-backward\"></span>Back</a>\r\n    </div>\r\n    <div class = \"col-sm-8\"></div>\r\n</div>\r\n<!--\r\n    <div class=\"panel panel-primary\">\r\n        <div class=\"panel-heading\">Campaign Images</div>\r\n        <div class=\"panel-body\">\r\n            <!--<button type=\"button\" class=\"btn btn-primary\" data-toggle=\"collapse\" data-target=\"#statistics\" data-bind = \"click: getImageStatistics\" style = \"margin-bottom: 0.5em;\" >Statistics</button>\r\n    -->\r\n           <!-- <div id=\"statistics\" >--><!--class=\"collapse\"-->\r\n               <!-- <h4>Selection</h4>\r\n                <p data-bind = \"text: accepted\"></p>\r\n                <p data-bind = \"text: rejected\"></p>\r\n                <h4>Annotation</h4>\r\n                <ul data-bind = \"foreach: annotation\">\r\n                    <li data-bind = \"text: $data\"></li>\r\n                </ul>\r\n            </div>\r\n\r\n            <img data-bind = \"attr: {src: imageInfo.canonical}\">\r\n        </div>\r\n    </div>\r\n</div>-->\r\n<!-- nella lista di imagini, ricopiala da edit-images campaign, metti <a href = \"#\" data-bind = \"click: $parent.getImageInfo\">-->";

},{}],13:[function(require,module,exports){
/*jslint node:true */
"use strict";

exports.register = function (options) {
    require('./home-page').register(options);
    require('./sign-up').register(options);
    require('./log-in').register(options);
    require('./sign-up-outcome-p').register(options);
    require('./user-home').register(options);
    require('./log-out').register(options);
    require('./create-campaign').register(options);
    require('./edit-images-campaign').register(options);
    require('./edit-workers-campaign').register(options);
    require('./operation-success').register(options);
    require('./ended-campaign-statistics').register(options);
    require('./task-statistics').register(options);
    require('./task-working-session').register(options);
    require('./line-drawer').register(options);
    require('./nav-bar').register(options);
    require('./image-statistics').register(options);
    require('./line-displayer').register(options);
};

},{"./create-campaign":1,"./edit-images-campaign":3,"./edit-workers-campaign":5,"./ended-campaign-statistics":7,"./home-page":9,"./image-statistics":11,"./line-displayer":14,"./line-drawer":16,"./log-in":18,"./log-out":20,"./nav-bar":22,"./operation-success":24,"./sign-up":28,"./sign-up-outcome-p":26,"./task-statistics":30,"./task-working-session":32,"./user-home":34}],14:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 14/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null), $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);


ko.bindingHandlers.InitCanvas = {
    init: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor()),
            ctx = element.getContext('2d');
        var image = new Image();
        image.addEventListener("load", function () {
            ctx.drawImage(image, 0, 0);
        });
        image.src = value;
    }
};/*,
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor()),
            ctx = element.getContext('2d');


        }
};*/


function ViewModel(params) {
    var self = this;
    self.src = params.src;
    self.data = params.data;


    self.naturalSize = ko.observable();
}


exports.register = function () {
    ko.components.register('line-displayer', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};


/*
"use strict";

var ko = require('knockout'), $ = require('jquery');

ko.bindingHandlers.LineDrawSetSize = {
    update: function (element, valueAccessor) {
        var value = valueAccessor()();
        if (!value) { return; }
        element.height = value.height;
        element.width = value.width;
    }
};

ko.bindingHandlers.LineDrawNaturalSize = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        function update() {
            value({
                width: element.naturalWidth,
                height: element.naturalHeight
            });
        }
        update();
        $(element).on('load', update);
    }
};

ko.bindingHandlers.LineDraw = {
    init: function (element, valueAccessor) {
        var value = valueAccessor(),
            ctx = element.getContext('2d'),
            $element = $(element);
        $element.on('mousedown', function (e) {
            var x = (e.pageX - $element.offset().left) / $element.width() * element.width,
                y = (e.pageY - $element.offset().top) / $element.height() * element.height;
            ctx.beginPath();
            ctx.moveTo(x, y);
            function draw(e) {
                var pen = parseInt($element.data('pen'), 10) || 1,
                    tx = (e.pageX - $element.offset().left) / $element.width() * element.width,
                    ty = (e.pageY - $element.offset().top) / $element.height() * element.height;
                ctx.lineTo(tx, ty);
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.lineWidth = pen;
                ctx.lineCap = 'round';
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(tx, ty);
            }
            function end() {
                $element.off('mousemove', draw);
                $element.off('mouseup', end);
                value(element.toDataURL('image/png'));
            }
            $element.on('mousemove', draw);
            $element.on('mouseup', end);
        });
        //var $resetButton = $($element.prev()).prev();
        $element.on('contextmenu',function(e){
            e.preventDefault();
            ctx.clearRect(0, 0, element.width, element.height);
            value(undefined);
        });
    }
};

ko.bindingHandlers.LineDrawPen = {
    update: function (element, valueAccessor) {
        var value = valueAccessor(),
            $element = $(element);
        $element.data('pen', value);
    }
};

function ViewModel(params) {
    var self = this;
    self.src = params.src;
    self.pen = params.pen;
    self.line = params.line;

    self.naturalSize = ko.observable();
}


exports.register = function () {
    ko.components.register('line-drawer', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
*/
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":15}],15:[function(require,module,exports){
module.exports = "<img data-bind=\"attr: { src: src }\" class=\"background\" draggable=\"false\">\r\n<canvas id = \"canvas\" data-bind=\"InitCanvas: data\"></canvas>\r\n\r\n";

},{}],16:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 14/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null), $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
ko.bindingHandlers.LineDrawSetSize = {
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        if (!value) { return; }
        element.height = value.height;
        element.width = value.width;
    }
};

ko.bindingHandlers.LineDrawNaturalSize = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        function update() {
            value({
                width: element.naturalWidth,
                height: element.naturalHeight
            });
        }
        update();
        $(element).on('load', update);
    }
};

ko.bindingHandlers.LineDraw = {
    init: function (element, valueAccessor) {
        var value = valueAccessor(),
            ctx = element.getContext('2d'),
            $element = $(element);
        $element.on('mousedown', function (e) {
            var x = (e.pageX - $element.offset().left) / $element.width() * element.width,
                y = (e.pageY - $element.offset().top) / $element.height() * element.height;
            ctx.beginPath();
            ctx.moveTo(x, y);
            function draw(e) {
                var pen = parseInt($element.data('pen'), 10) || 1,
                    tx = (e.pageX - $element.offset().left) / $element.width() * element.width,
                    ty = (e.pageY - $element.offset().top) / $element.height() * element.height;
                ctx.lineTo(tx, ty);
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.lineWidth = pen;
                ctx.lineCap = 'round';
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(tx, ty);
            }
            function end() {
                $element.off('mousemove', draw);
                $element.off('mouseup', end);
                value(element.toDataURL('image/png'));
            }
            $element.on('mousemove', draw);
            $element.on('mouseup', end);
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor()),
            ctx = element.getContext('2d');
        if (!value || value === '') {
            ctx.clearRect(0, 0, element.width, element.height);
        }
    }
};

ko.bindingHandlers.LineDrawPen = {
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor()),
            $element = $(element);
        $element.data('pen', value);
    }
};

function ViewModel(params) {
    var self = this;
    self.src = params.src;
    self.pen = params.pen;
    self.line = params.line;

    self.naturalSize = ko.observable();
}


exports.register = function () {
    ko.components.register('line-drawer', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};


/*
"use strict";

var ko = require('knockout'), $ = require('jquery');

ko.bindingHandlers.LineDrawSetSize = {
    update: function (element, valueAccessor) {
        var value = valueAccessor()();
        if (!value) { return; }
        element.height = value.height;
        element.width = value.width;
    }
};

ko.bindingHandlers.LineDrawNaturalSize = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        function update() {
            value({
                width: element.naturalWidth,
                height: element.naturalHeight
            });
        }
        update();
        $(element).on('load', update);
    }
};

ko.bindingHandlers.LineDraw = {
    init: function (element, valueAccessor) {
        var value = valueAccessor(),
            ctx = element.getContext('2d'),
            $element = $(element);
        $element.on('mousedown', function (e) {
            var x = (e.pageX - $element.offset().left) / $element.width() * element.width,
                y = (e.pageY - $element.offset().top) / $element.height() * element.height;
            ctx.beginPath();
            ctx.moveTo(x, y);
            function draw(e) {
                var pen = parseInt($element.data('pen'), 10) || 1,
                    tx = (e.pageX - $element.offset().left) / $element.width() * element.width,
                    ty = (e.pageY - $element.offset().top) / $element.height() * element.height;
                ctx.lineTo(tx, ty);
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.lineWidth = pen;
                ctx.lineCap = 'round';
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(tx, ty);
            }
            function end() {
                $element.off('mousemove', draw);
                $element.off('mouseup', end);
                value(element.toDataURL('image/png'));
            }
            $element.on('mousemove', draw);
            $element.on('mouseup', end);
        });
        //var $resetButton = $($element.prev()).prev();
        $element.on('contextmenu',function(e){
            e.preventDefault();
            ctx.clearRect(0, 0, element.width, element.height);
            value(undefined);
        });
    }
};

ko.bindingHandlers.LineDrawPen = {
    update: function (element, valueAccessor) {
        var value = valueAccessor(),
            $element = $(element);
        $element.data('pen', value);
    }
};

function ViewModel(params) {
    var self = this;
    self.src = params.src;
    self.pen = params.pen;
    self.line = params.line;

    self.naturalSize = ko.observable();
}


exports.register = function () {
    ko.components.register('line-drawer', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
*/
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":17}],17:[function(require,module,exports){
module.exports = "<img data-bind=\"attr: { src: src }, LineDrawNaturalSize: naturalSize\" class=\"background\" draggable=\"false\">\r\n<canvas id = \"canvas\" data-bind=\"LineDraw: line, LineDrawSetSize: naturalSize, LineDrawPen: pen\"></canvas>\r\n\r\n";

},{}],18:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 17/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    //QUESTI ERROR IN REALTA' SONO BINDATI A DEI COSI HTML!!! VEDI L'ESEMPIO KO
    self.username = ko.observable();
    self.usernameError = ko.observable();
    self.username.subscribe(function(){
        self.usernameError(undefined);
    });

    self.password = ko.observable();
    self.passwordError = ko.observable();

    self.shouldShowMessage = ko.observable(false);
    self.errorMessage = ko.observable();

    self.login = function () {
        ctx.repositories.login.login(
            self.username(),
            self.password()
        ).then(function (result) {
            //alert("Success");
            ctx.repositories.status.setApiToken(result.token);
            alert("HO SETTATO API TOKEN");
            /*for(var x in ctx){
                alert(x + " " +ctx[x]);
            }
            ctx.updateStatusLogged();
            ctx.updateStatusLogged();*/
            //alert(ctx.repositories.status.getApiToken());
            location.hash = '/UserHome';
        }).catch(function (e) {
            alert("Error");
            self.shouldShowMessage(true);
            self.errorMessage(" " +e.errors.error);
        });
    };
}


exports.register = function () {
    ko.components.register('log-in', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":19}],19:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Fill in Your Credentials to Log-in</h1>\r\n            <div class=\"alert alert-danger alert-dismissable fade in\" data-bind = \"visible: shouldShowMessage\">\r\n                <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                <strong>Warning!</strong><span data-bind = \"text:errorMessage\"></span>\r\n            </div>\r\n            <form class=\"form-horizontal\">\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for = \"username\">Username:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id = \"username\" placeholder=\"Enter your Username\" required data-bind = \"textInput: username\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for=\"pwd1\">Password:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"password\" class=\"form-control\" id=\"pwd1\" placeholder=\"Enter password\" required data-bind = \"textInput: password\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-offset-2 col-sm-10\">\r\n                        <button type=\"button\" class=\"btn btn-primary\" data-bind = \"click: login\">Login</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>\r\n<h1>MANCA GESTIONE DEL SUCCESSO</h1>";

},{}],20:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.shouldShowMessage = ko.observable(false);
    self.errorMessage = ko.observable();

    self.logout = function () {
        alert("STo per eliminare: "+ctx.repositories.status.getApiToken());
        ctx.repositories.logout.logout(
            ctx.repositories.status.getApiToken()
        ).then(function (result) {
            alert("Successo");
            ctx.repositories.status.deleteApiToken();
            location.hash = "/";
        }).catch(function (e) {
            alert("Errore");
            for( var x in e.jqXHR)
            {
                alert(e.jqXHR[x]);
            }
            self.shouldShowMessage(true);
        });

    };
}

exports.register = function () {
    ko.components.register('log-out', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":21}],21:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Are you sure you want to logout?</h1>\r\n            <div class=\"alert alert-danger alert-dismissable fade in\" data-bind = \"visible: shouldShowMessage\">\r\n                <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                <strong>Warning!</strong><span data-bind = \"text:errorMessage\"></span>\r\n            </div>\r\n            <div class = \"row\">\r\n                <div class = \"col-sm-3\"></div>\r\n                <div class = \"col-sm-3\">\r\n                    <a data-bind = \"click: logout\" class=\"btn btn-primary\" role=\"button\" style = \"text-align:center;\"> Yes </a>\r\n                </div>\r\n                <div class = \"col-sm-3\">\r\n                    <a data-bind = \"path: '/UserHome'\" class=\"btn btn-primary\" role=\"button\" style = \"text-align:center;\"> No </a>\r\n                </div>\r\n                <div class = \"col-sm-3\"></div>\r\n            </div>\r\n            </form>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],22:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 17/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null), $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);// router = require('ko-component-router');


function ViewModel(param) {
    var self = this;
    self.repositories = param.repositories;
    self.statusLogged = param.repositories.status.getApiToken();
    /*
    self.statusLogged = ko.computed(function()
        { return param.repositories.status.getApiToken();});*/
    //self.statusLogged = param.statusLogged;
    //ko.computed(function(){return param.statusLogged;});
}

/*
ko.bindingHandlers.repositories = {
    update: function (element, valueAccessor, allBindings,viewModel,bindingContext) {
        var value = valueAccessor(),
            $element = $(element);
        $element.data('repositories', value);
    }
};
*/

exports.register = function () {
    ko.components.register('nav-bar', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":23}],23:[function(require,module,exports){
module.exports = "<nav class=\"navbar navbar-inverse\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <a class=\"navbar-brand\" href = \"#\" >Crowdsourcing Campaigns</a> <!--data-bind = \"path: '/'\"-->\r\n        </div>\r\n        <ul class = \"nav navbar-nav navbar-left\">\r\n            <li data-bind = \"path:'/UserHome', if: statusLogged\">\r\n                <a data-bind = \"path: '/UserHome'\">\r\n                    <span class = \"glyphicon glyphicon-home\">\r\n                        Home\r\n                    </span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n        <ul class=\"nav navbar-nav navbar-right\">\r\n\r\n            <li data-bind=\"path: '/SignUp', ifnot: statusLogged\">\r\n                <a data-bind=\"path: '/SignUp'\">\r\n                      <span class=\"glyphicon glyphicon-user\">\r\n                      </span>Sign Up\r\n                </a>\r\n            </li>\r\n\r\n            <li data-bind =\"path: '/LogIn', ifnot: statusLogged\">\r\n                <a data-bind=\"path: '/LogIn'\">\r\n                      <span class=\"glyphicon glyphicon-log-in\">\r\n                      </span> Login\r\n                </a>\r\n            </li>\r\n\r\n            <li data-bind =\"path: '/LogOut', if: statusLogged\">\r\n                <a data-bind=\"path: '/LogOut'\">\r\n                      <span class=\"glyphicon glyphicon-log-out\">\r\n                      </span> Logout\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</nav>";

},{}],24:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 03/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.proceed = function () {
        var temp = ctx.repositories.status.getSuccessNext();
        ctx.repositories.status.deleteSuccessNext();
        location.hash = temp;
    };
}

exports.register = function () {
    ko.components.register('operation-success', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":25}],25:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Success! The operation has been correctly carried out</h1>\r\n            <div class = \"row\">\r\n                <div class = \"col-sm-6\"></div>\r\n                <div class = \"col-sm-2\">\r\n                    <button data-bind = \"click: proceed\" class=\"btn btn-primary\">Proceed</button>\r\n                </div>\r\n                <div class = \"col-sm-4\"></div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],26:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);
exports.register = function () {
    ko.components.register('sign-up-outcome-p', {
        template: require('./template.html'),
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":27}],27:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Congratulations, the sign-up procedure succeded!</h1>\r\n            <p style = \"text-align:center; padding-bottom:0.5em\">Now you can Login</p>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],28:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 17/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;


    self.fullname = ko.observable();
    self.fullnameError = ko.observable();
    self.fullname.subscribe(function(){
        self.fullnameError(undefined);
    });
    //QUESTI ERROR IN REALTA' SONO BINDATI A DEI COSI HTML!!! VEDI L'ESEMPIO KO
    self.username = ko.observable();
    self.usernameError = ko.observable();

    self.password1 = ko.observable();
    self.password1Error = ko.observable();

    /*self.password2 = ko.observable();
    self.password2Error = ko.observable();*/

    self.role = ko.observable("master");
    self.roleError = ko.observable();

    self.shouldShowMessage = ko.observable(false);
    self.errorMessage = ko.observableArray();

    self.validateAndSend = function () {
            ctx.repositories.signup.validateAndSend(
                self.fullname(),
                self.username(),
                self.password1(),
                self.role()
            ).then(function (result) {
                alert("Messaggio inviato, risposta ricevuta");
                alert(result);//undefined???
                location.hash = "/SignUpOutcomeP";
            }).catch(function (e) {
                self.shouldShowMessage(true);
                self.errorMessage.removeAll();
                for(var i in e.errors.error) {
                    self.errorMessage.push(" "+i +": " +e.errors.error[i]);
                }
                /*
                if (e.errors) {
                    alert("Errore");
                    /*self.usernameError(e.errors.username);
                    self.fullnameError(e.errors.fullname);
                    self.roleError(e.errors.role);*/
                /*} else {
                    alert("Errore");
                    alert(e.message);
                }*/
            });
        //}
    };
}

exports.register = function () {
    ko.components.register('sign-up', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":29}],29:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Fill These Forms to Get Started</h1>\r\n            <form data-bind=\"submit: validateAndSend\" class=\"form-horizontal\">\r\n                <div class=\"alert alert-danger alert-dismissable fade in\" data-bind = \"visible: shouldShowMessage\">\r\n                    <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                    <ul data-bind = \"foreach: errorMessage\" style = \"list-style-type:none\">\r\n                        <li>\r\n                            <strong>Warning!</strong><span data-bind = \"text:$data\"></span>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for = \"fullname\">Full Name:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id = \"fullname\" placeholder=\"Enter your Full Name\" required data-bind = \"textInput:fullname\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for = \"username\">Username:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id = \"username\" placeholder=\"Enter your Username\" required data-bind = \"textInput:username\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for=\"pwd1\">Password:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"password\" class=\"form-control\" id=\"pwd1\" placeholder=\"Enter password\" required data-bind = \"textInput:password1\" minlength = \"6\">\r\n                    </div>\r\n                </div>\r\n                <!-- PER ORA NON COMPLICARTI LA VITA <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for=\"pwd2\">Confirm your Password:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"password\" class=\"form-control\" id=\"pwd2\" placeholder=\"Enter password\" required>\r\n                    </div>\r\n                </div>-->\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\">Role:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <label class=\"radio-inline\">\r\n                            <input type=\"radio\" name=\"role\" value = \"master\" data-bind = \"checked: role\" >Master\r\n                        </label>\r\n                        <label class=\"radio-inline\">\r\n                            <input type=\"radio\" name=\"role\"  value = \"worker\" data-bind = \"checked: role\">Worker\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-offset-2 col-sm-10\">\r\n                        <button type=\"submit\" class=\"btn btn-primary\" id = \"submit\" data-bind = \"click:\">Submit</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>\r\n";

},{}],30:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 12/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.numAvailable = ko.observable();
    self.numAccepted = ko.observable();
    self.numRejected = ko.observable();
    self.numAnnotated = ko.observable();
    self.isSelect = ko.observable(false);
    self.isAnnotate = ko.observable(false);

    self.getTaskStatistics = function () {
        alert(ctx.repositories.status.getCurrentTask().statistics);
        ctx.repositories.taskstatistics.getTaskStatistics(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().statistics
        ).then(function (result) {
            alert("Success");
            self.numAvailable(result.available);
            self.numAccepted(result.accepted);
            self.numRejected(result.rejected);
            self.numAnnotated(result.annotated);
            (result.annotated === undefined)?self.isSelect(true):self.isAnnotate(true);
        }).catch(function (e) {
            alert("Error");
           alert(e);
        });
    };

    self.getTaskStatistics();

}


exports.register = function () {
    ko.components.register('task-statistics', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":31}],31:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">Task statistics</div>\r\n                <div class=\"panel-body\">\r\n                    <p>\r\n                        Number of images: <span data-bind = \"text:numAvailable\"></span><br/>\r\n                        <span data-bind  =\"if:isSelect\">\r\n                        Number of accepted images: <span data-bind = \"text:numAccepted\"></span><br/>\r\n                        Number of rejected images: <span data-bind = \"text:numRejected\"></span><br/>\r\n                        </span>\r\n                        <span data-bind = \"if:isAnnotate\">\r\n                        Number of annotations: <span data-bind = \"text:numAnnotated\"></span>\r\n                        </span>\r\n                    </p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],32:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 13/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.type = ko.observable();
    self.image = ko.observable();
    self.size = ko.observable();
    self.nextTaskAvailable = ko.observable(true);

    self.line = ko.observable();
    self.line.subscribe(function () {
        //alert(self.line());
    });

    self.clearAnnotation = function(){
        self.line('');
        /*$("#annotation").remove("#line-drawer");
        self.line = ko.observable();
        $("#annotation").append("<line-drawer id = 'line-drawer' params='src: image, pen: size, line: line'></line-drawer>");*/
    };

    self.startWorkingSession = function (isNext) {
        ctx.repositories.taskworkingsession.startWorkingSession(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session
        ).then(function (result) {
            alert("Success");
            if(isNext){
                self.getNextTaskInstance();
            }
        }).catch(function (e) {
            if(e == "Error: Not Found"){
                self.nextTaskAvailable(false);
            }
            alert("session" + e.textStatus);
            alert("Error");
            alert(e);
        });
    };

    self.startWorkingSession();

    self.getNextTaskInstance = function(){
        ctx.repositories.taskworkingsession.getNextTaskInstance(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session
        ).then(function (result) {
            alert("Success");
            self.type(result.type);
            self.image(result.image);
            self.size(result.size);
        }).catch(function (e) {
            if(e == "Error: Gone"){
                self.nextTaskAvailable(false);
            }
            alert("getNextTask" + e.textStatus);
            alert("Error");
            alert(e);
        });
    };
    self.getNextTaskInstance();


    self.submitAnnotation = function(){
        if(self.line()) {
            ctx.repositories.taskworkingsession.submitAnnotation(
                ctx.repositories.status.getAuthApiToken(),
                ctx.repositories.status.getCurrentTask().session,
                self.line()
            ).then(function (result) {
                alert("Submitted");
                self.getNextTaskInstance();
                //self.startWorkingSession(true);
            }).catch(function (e) {
                alert("Error");
                alert(e);
            });
        }else{
            alert("You cannot submit an empty annotation!");
        }
    };

    self.rejectSelection = function(){
        ctx.repositories.taskworkingsession.submitSelection(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session,
            false
        ).then(function (result) {
            alert("Submitted");
            self.getNextTaskInstance();
            //self.startWorkingSession(true);
        }).catch(function (e) {
            alert("Error");
            alert(e);
        });
    };

    self.acceptSelection = function(){
        ctx.repositories.taskworkingsession.submitSelection(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session,
            true
        ).then(function (result) {
            alert("Submitted");
            self.getNextTaskInstance();
            //self.startWorkingSession(true);
        }).catch(function (e) {
            alert("Error");
            alert(e);
        });
    };
}


exports.register = function () {
    ko.components.register('task-working-session', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":33}],33:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\" data-bind = \"if:nextTaskAvailable\">\r\n            <div class=\"panel panel-primary\" >\r\n                <div class=\"panel-heading\" data-bind = \"text:type\"></div>\r\n                <div class=\"panel-body\">\r\n\r\n                    <div data-bind = \"ifnot:size\">\r\n                        <img data-bind = \"attr : {src : image}\">\r\n                        <button class = \"btn btn-primary\" data-bind = \"click: rejectSelection\">Reject</button>\r\n                        <button class = \"btn btn-primary\" data-bind = \"click: acceptSelection\">Accept</button>\r\n                    </div>\r\n                    <div id = \"annotation\" data-bind = \"if:size\">\r\n                        <line-drawer id = \"line-drawer\" params=\"src: image, pen: size, line: line\"></line-drawer>\r\n                        <button class=\"pull-right btn btn-primary\" data-bind = \"click: submitAnnotation\">Submit</button>\r\n                        <button class=\"pull-right btn btn-primary\" data-bind = \"click: clearAnnotation\">Clear</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-8\" data-bind = \"ifnot:nextTaskAvailable\">\r\n        <div class=\"panel panel-primary\" >\r\n            <div class=\"panel-heading\">You completed your task!</div>\r\n            <div class=\"panel-body\">\r\n                Congratulations! You completed your task, no more images are available for this task! Return to <a data-bind = \"path:'/UserHome'\"> your personal homepage</a>.\r\n            </div>\r\n        </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],34:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.visible = false;
    self.editUserString = ko.observable("Edit User Info");
    //QUESTI ERROR IN REALTA' SONO BINDATI A DEI COSI HTML!!! VEDI L'ESEMPIO KO
    self.username = ko.observable();
    self.fullname = ko.observable();
    self.role = ko.observable();
    self.isUserMaster = ko.observable();

    self.readyCampaignsAvailable = ko.observable(false);
    self.readyCampaigns = ko.observableArray();
    self.startedCampaignsAvailable = ko.observable(false);
    self.startedCampaigns = ko.observableArray();
    self.endedCampaignsAvailable = ko.observable(false);
    self.endedCampaigns = ko.observableArray();

    self.newpassword = ko.observable();
    self.newfullname = ko.observable();

    self.shouldShowErrorMessage = ko.observable(false);
    self.errorMessage = ko.observable();

    self.shouldShowSuccessMessage = ko.observable(false);
    self.successMessage = ko.observable();


    self.tasksAvailable = ko.observable(false);
    self.tasks = ko.observableArray();

    self.getUserInfo = function() {
        ctx.repositories.userhome.getUserInfo(
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            self.username(result.username);
            self.role(result.type);
            self.fullname(result.fullname);
            self.isUserMaster((result.type == "master")?true:false);
            (result.type == "master")?self.getUserCampaigns() : self.getTasksInfo();
        }).catch(function (e) {
            alert("Errore");
        });
    };
    self.getUserInfo();

    self.getTasksInfo = function(){
        ctx.repositories.userhome.getTasksInfo(
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            alert("successo tasksInfo");
            self.tasks(result.tasks);
            self.tasksAvailable((self.tasks().length > 0)?true:false);
        }).catch(function (e) {
            alert("Errore");
        });
    };

    self.workTask = function(task){
        ctx.repositories.userhome.getTaskInfo(
            ctx.repositories.status.getAuthApiToken(),
            task.id
        ).then(function (result) {
            ctx.repositories.status.setCurrentTask(result);
            location.hash = "/WorkingSessionTask";
        }).catch(function (e) {
            alert("Errore");
        });
    };

    self.getTaskStatistics = function(task){
        ctx.repositories.userhome.getTaskInfo(
            ctx.repositories.status.getAuthApiToken(),
            task.id
        ).then(function (result) {
            ctx.repositories.status.setCurrentTask(result);
            location.hash = "/TaskStatistics";
        }).catch(function (e) {
            alert("Errore");
        });
    };


    self.editUserInfo = function () {
        alert("Chiamo editUserInfo");
        alert(self.newpassword());
        alert(self.newfullname());
        ctx.repositories.userhome.editUserInfo(
            self.newfullname(),
            self.newpassword(),
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            alert("Successo Edit Dati utente");
            self.shouldShowSuccessMessage(true);
            alert(result);
            self.successMessage();
            //successMessage(); //@todo, capito cosa è result vedi come scrivi il messaggio
        }).catch(function (e) {
            alert("Fallito Edit ");
            self.shouldShowErrorMessage(true);
            var tempString = '';
            for(var x in e.errors.error){
                tempString += x + ": "+e.errors.error[x] + ". ";
            }
            self.errorMessage(tempString);
        });
    };

    self.getUserCampaigns = function(){
        ctx.repositories.userhome.getUserCampaigns(
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            //alert("Successo Campagna");
            //var temp = JSON.parse(result);
            /*alert("Successo Parse");
            alert(result);//ritorna undefined
            for(var x in result.campaigns){
                alert(x+""+result.campaigns[x]);
            }
            self.endedCampaigns([]);
            self.startedCampaigns([]);
            self.readyCampaigns([]);*/
            alert(result);
            if(!(result === undefined)) {
                for (var x in Object.getOwnPropertyNames(result.campaigns)) {
                    if (!(result.campaigns[x] == undefined)) {
                        switch (result.campaigns[x].status) {
                            case "ended":
                                self.endedCampaigns().push(result.campaigns[x]);
                                alert("ended available");
                                break;
                            case "started":
                                self.startedCampaigns().push(result.campaigns[x]);
                                alert("started available");
                                break;
                            case "ready":
                               // alert(result.campaigns[x]);
                                self.readyCampaigns().push(result.campaigns[x]);
                                //alert('The length of the array is ' + self.readyCampaigns().length);
                                alert("ready available");
                                break;
                            default:
                                alert("Errore switch campagna");
                        }
                    }
                }
            }
            alert(self.endedCampaigns().length + "ended");
            alert(self.startedCampaigns().length + "started");
            alert(self.readyCampaigns().length + "ready");
                self.endedCampaignsAvailable(self.endedCampaigns().length>0?true:false);
                self.startedCampaignsAvailable(self.startedCampaigns().length>0?true:false);
                self.readyCampaignsAvailable(self.readyCampaigns().length>0?true:false);
        }).catch(function (e) {
            alert("Fallito");
            alert(e);
        });
    };
    //self.getUserCampaigns(); //important: calls it

    self.addCampaign = function(){
        location.hash = "/AddCampaign";
    };
    self.editImages = function(campaign){
        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            alert("Successo GetCampaignInfo");
            ctx.repositories.status.setCurrentCampaign(result);
            location.hash = "/EditImagesCampaign";
        }).catch(function (e) {
            alert("Fallito GetCampaignInfo ");
            alert(e);
        });

    };
    self.editWorkers = function(campaign){

        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            alert("Successo GetCampaignInfo");
            ctx.repositories.status.setCurrentCampaign(result);
            location.hash = "/EditWorkersCampaign";
        }).catch(function (e) {
            alert("Fallito GetCampaignInfo ");
            alert(e);
        });
    };
    self.campaignStatistics = function(campaign){
        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            alert("Successo GetCampaignInfo");
            ctx.repositories.status.setCurrentCampaign(result);
            location.hash = "/CampaignStatistics";
        }).catch(function (e) {
            alert("Fallito GetCampaignInfo ");
            alert(e);
        });
    };
    //$("#editButton").addEventListener("click",
    self.setEditUserForm = function(){

        if(self.visible) {
            self.shouldShowSuccessMessage(false);
            self.shouldShowErrorMessage(false);
            self.newpassword('');
            self.newfullname('');

            self.visible = !self.visible;
            self.editUserString("Edit User Info");
        }else{
            self.visible = !self.visible;
            self.editUserString("Undo Edit User Info");
        }
    }//);
    self.startCampaign = function(campaign){

        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            alert("Successo GetCampaignInfoForStart");
            alert("execution should be "+result.execution);
            ctx.repositories.userhome.startCampaign(
                result.execution,
                ctx.repositories.status.getAuthApiToken())
                .then(function (result1) {
                    alert("Successo startCampaign");
                    self.readyCampaigns.remove(function(campaignTemp){
                        if(campaignTemp == campaign)
                        {
                            if(self.startedCampaigns().length ==0)
                                self.startedCampaignsAvailable(true);

                            self.startedCampaigns.push(campaign);

                            if(self.readyCampaigns().length ==1)
                                self.readyCampaignsAvailable(false);
                        }
                        return campaignTemp == campaign;});
                    //self.getUserCampaigns();
                }).catch(function (e1) {
                alert("Fallito startCampaign ");
                alert(e1);
            });
        }).catch(function (e) {
            alert("Fallito GetCampaignInfoForStart ");
            alert(e);
        });

    }

    self.terminateCampaign = function(campaign){

        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            alert("Successo GetCampaignInfoForTermination");
            alert("execution should be "+result.execution);
            ctx.repositories.userhome.terminateCampaign(
                result.execution,
                ctx.repositories.status.getAuthApiToken())
                .then(function (result1) {
                    alert("Successo terminateCampaign");
                    location.hash = "/UserHome";
                    //self.getUserCampaigns();
                    self.startedCampaigns.remove(function(campaignTemp){
                        if(campaignTemp == campaign)
                        {
                            if(self.endedCampaigns().length ==0)
                                self.endedCampaignsAvailable(true);

                            self.endedCampaigns.push(campaign);

                            if(self.startedCampaigns().length ==1)
                                self.startedCampaignsAvailable(false);
                        }
                        return campaignTemp == campaign;});
                }).catch(function (e1) {
                alert("Fallito terminateCampaign ");
                alert(e1);
            });
        }).catch(function (e) {
            alert("Fallito GetCampaignInfoForStart ");
            alert(e);
        });

    }
}


exports.register = function () {
    ko.components.register('user-home', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":35}],35:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <!--SHARED USER PROFILE MANAGEMENT -->\r\n        <div class = \"col-sm-4\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">User Profile</div>\r\n                <div class=\"panel-body\">\r\n                    <p>\r\n                        User data:<br/>\r\n                        Fullname: <span data-bind = \"text:fullname\"></span><br/>\r\n                        Username: <span  data-bind = \"text:username\"></span><br/>\r\n                        Role: <span data-bind = \"text:role\"></span>\r\n                    </p>\r\n                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"collapse\" data-target=\"#edit\" data-bind = \"click: setEditUserForm\" style = \"margin-bottom: 0.5em;\" ><span data-bind = \"text: editUserString\"></span></button>\r\n\r\n                    <div id=\"edit\" class=\"collapse\">\r\n                        <form class=\"form-horizontal\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label col-sm-4\" for=\"fullname\">New Full Name:</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input type=\"text\" class=\"form-control\" id=\"fullname\" placeholder=\"New Full Name\" data-bind = \"value: newfullname\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label col-sm-4\" for=\"newpwd\">New Password:</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input type=\"password\" class=\"form-control\" id=\"newpwd\" placeholder=\"New Password\" data-bind = \"value: newpassword\" minlength = \"8\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <div class=\"col-sm-offset-2 col-sm-10\">\r\n                                    <button type=\"submit\" class=\"btn btn-default\" data-bind = \"click: editUserInfo\">Apply</button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n\r\n                    <div class=\"alert alert-danger alert-dismissable fade in\" data-bind = \"visible: shouldShowErrorMessage\">\r\n                        <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                        <strong>Warning!</strong><span data-bind = \"text:errorMessage\"></span>\r\n                    </div>\r\n                    <div class=\"alert alert-success alert-dismissable fade in\" data-bind = \"visible: shouldShowSuccessMessage\">\r\n                        <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                        <strong>Success!</strong><span data-bind = \"text:successMessage\"></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-1\"></div>\r\n        <!--MASTER-->\r\n        <div class = \"col-sm-6\" data-bind = \"if:isUserMaster\">\r\n            <div class=\"panel-group\">\r\n                <div class=\"panel panel-default\">\r\n                    <div class=\"panel-heading\">\r\n                        Started Campaigns\r\n                        <button type=\"button\" class=\"btn btn-primary pull-right\" data-bind = \"click: addCampaign\" style = \"margin-bottom:0.5em;\"><span class = \"glyphicon glyphicon-plus\"></span>Add Campaign</button>\r\n                    </div>\r\n                    <div class=\"panel-body\">\r\n                        <p data-bind = \"ifnot:startedCampaignsAvailable\"> No Started Campaigns available, add one.</p>\r\n                        <table data-bind = \"if:startedCampaignsAvailable\">\r\n                            <thead>\r\n                            <tr><th>Campaign Name</th><th>Actions</th></tr>\r\n                            </thead>\r\n                            <tbody data-bind=\"foreach: startedCampaigns\">\r\n                            <tr>\r\n                                <td><span data-bind = \"text: name\"></span></td>\r\n                                <td><button data-bind = \"click:$parent.terminateCampaign\">Terminate</button></td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel panel-default\">\r\n                    <div class=\"panel-heading\">\r\n                        Ready Campaigns\r\n                    </div>\r\n                    <div class=\"panel-body\">\r\n                        <p data-bind = \"ifnot:readyCampaignsAvailable\"> No Ready Campaigns available, add one.</p>\r\n                        <table data-bind = \"if:readyCampaignsAvailable\">\r\n                            <thead>\r\n                            <tr><th>Campaign Name</th><th>Actions</th></tr>\r\n                            </thead>\r\n                            <tbody data-bind=\"foreach: readyCampaigns\">\r\n                            <tr>\r\n                                <td><span data-bind = \"text: name\"></span></td>\r\n                                <td><button data-bind = \"click: $parent.editImages\">Edit Images</button></td>\r\n                                <td><button data-bind = \"click: $parent.editWorkers\">Edit Workers</button></td>\r\n                                <td><button data-bind =\"click: $parent.startCampaign\">Start!</button></td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel panel-default\">\r\n                    <div class=\"panel-heading\">\r\n                        Ended Campaigns\r\n                    </div>\r\n                    <div class=\"panel-body\">\r\n                        <p data-bind = \"ifnot:endedCampaignsAvailable\"> No Ended Campaigns available, add one.</p>\r\n                        <table data-bind = \"if:endedCampaignsAvailable\">\r\n                            <thead>\r\n                            <tr><th>Campaign Name</th><th>Actions</th></tr>\r\n                            </thead>\r\n                            <tbody data-bind=\"foreach: endedCampaigns\">\r\n                            <tr>\r\n                                <td><span data-bind = \"text: name\"></span></td>\r\n                                <td><button data-bind = \"click: $parent.campaignStatistics\">Statistics</button></td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n        </div>\r\n        <div class = \"col-sm-1\"></div>\r\n    </div>\r\n        <!--WORKER-->\r\n        <div class = \"col-sm-6\" data-bind = \"ifnot:isUserMaster\">\r\n            <div class=\"panel-group\">\r\n                <div class=\"panel panel-default\">\r\n                    <div class=\"panel-heading\">\r\n                        User Tasks\r\n                    </div>\r\n                    <div class=\"panel-body\">\r\n                        <p data-bind = \"ifnot:tasksAvailable\"> No Tasks available for the user.</p>\r\n                        <table data-bind = \"if:tasksAvailable\">\r\n                            <thead>\r\n                            <tr><th>Task</th><th>Actions</th></tr>\r\n                            </thead>\r\n                            <tbody data-bind=\"foreach: tasks\">\r\n                            <tr>\r\n                                <td><span data-bind = \"text: type\"></span></td>\r\n                                <td><button data-bind = \"click:$parent.workTask\">Start Working</button></td>\r\n                                <td><button data-bind = \"click:$parent.getTaskStatistics\">Statistics</button></td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

},{}],36:[function(require,module,exports){
(function (global){
/*jslint node:true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    components = require('./components'),
    createRepositories = require('./repositories').createRepositories;

components.register();
var repositories = createRepositories('http://awt.ifmledit.org');

function App() {
    this.routes = {
        '/': 'home-page',
        '/SignUp':'sign-up',
        '/LogIn':'log-in',
        '/SignUpOutcomeP': 'sign-up-outcome-p',
        '/UserHome':'user-home',
        '/Logout':'log-out',
        '/AddCampaign':'create-campaign',
        '/EditImagesCampaign':'edit-images-campaign',
        '/EditWorkersCampaign':'edit-workers-campaign',
        '/OperationSuccess':'operation-success',
        '/CampaignStatistics':'ended-campaign-statistics',
        '/TaskStatistics':'task-statistics',
        '/WorkingSessionTask':'task-working-session',
        '/ImageStatistics':'image-statistics'
    };
    this.repositories = repositories;
    $("#su").on("click",function(){$("#home").css("display","none");});
    $("#li").on("click",function(){$("#home").css("display","none");});
    $("#suN").on("click",function(){$("#home").css("display","none");});
    $("#liN").on("click",function(){$("#home").css("display","none");});
   /* this.firstPage = true;
    this.notFirstPage = function(data){
        this.firstPage = false;
        if(data == "SU"){
            location.hash = "/SignUp";
        }else if(data == "LI"){
            location.hash = "/LogIn";
        }
    };
    /*this.statusLogged = ko.observable(false);

    this.updateStatusLogged = function(){
        alert("STO PER AGGIORNARE LO STATO");
        this.statusLogged(repositories.status.getApiToken());
    };*/
}

ko.applyBindings(new App());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./components":13,"./repositories":41}],37:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 03/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.createCampaign = function (apiToken,campaignName,selectionReplica,threshold,annotationReplica,annotationSize) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/campaign',
            type: 'POST',
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
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],38:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 04/06/2017.
 */

"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.uploadCampaignPhotos = function (apiToken,files, imageUrl) { //forse dovresti crare upload file con un parametro URL che usi per riciclare lo stesso metodo per diverse ufnzionalità
    var self = this;
    //return ctx.repositories.uploadfile(apiToken, files, imageUrl ); @TODO vedi se è più elegante fare uploadfile o come hai deciso di fare ora (in tal caso passa ctx in uploadCampaignPhotos se lo usi)
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: self._server + imageUrl,
            headers:{
                'Authorization': apiToken,
            },
            data: files,
            cache: false,
            processData: false,
            contentType: false,
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

Repository.prototype.getCampaignImages = function (apiToken, imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            },
        }).done(function (result) {
            /*for(var x in Object.keys(result)){
                alert(Object.keys(result)[x]);
            }

            for(var x in result){
                alert(result[x]);
            }*/
            for(var x in result.images){
                result.images[x].canonical = "http://awt.ifmledit.org"+result.images[x].canonical;
            }
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};

Repository.prototype.getImageInfo = function(apiToken,imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            },
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};

Repository.prototype.getImageStatistics = function(apiToken,imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            },
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};

Repository.prototype.removeImage = function(apiToken,imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'DELETE',
            headers:{
                'Authorization': apiToken,
            },
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {

            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};
exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],39:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 11/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.getWorkers = function (apiToken, workerUrl) {
    var self = this;
    alert("Promise");
    return new Promise(function (resolve, reject) {
        alert(self._server + workerUrl);
        alert(apiToken);
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
            alert("successoAjaxWorkers");
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
        alert("Promise");
        return new Promise(function (resolve, reject) {
            alert(self._server + workerUrl);
            alert(apiToken);
            $.ajax({
                url: self._server + workerUrl,
                type: 'GET',
                dataType: "json",
                headers: {
                    'Authorization': apiToken,
                }
            }).done(function (result) {
                for(var x in Object.keys(result)){
                 alert(Object.keys(result)[x]);
                 }

                 for(var x in result){
                 alert(result[x]);
                 }
                alert("successoAjaxWorkerInfo");
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
    alert("Promise");
    return new Promise(function (resolve, reject) {
        alert(self._server + workerUrl);
        alert(apiToken);
        $.ajax({
            url: self._server + workerUrl,
            type: isSelector?'POST':'DELETE',
            headers: {
                'Authorization': apiToken,
            }
        }).done(function (result) {
            alert("successoAjaxSelector");
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
    alert("Promise");
    return new Promise(function (resolve, reject) {
        alert(self._server + workerUrl);
        alert(apiToken);
        $.ajax({
            url: self._server + workerUrl,
            type: isAnnotator?'POST':'DELETE',
            headers: {
                'Authorization': apiToken,
            }
        }).done(function (result) {
            alert("successoAjaxAnnotator");
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],40:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 10/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.getCampaignStatistics = function (apiToken,statisticsUrl) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + statisticsUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.getImageInfo = function (apiToken,imageId) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageId,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.getImageStatistics = function (apiToken,imageStatisticsUrl) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageStatisticsUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],41:[function(require,module,exports){
/*jslint node:true */
"use strict";

exports.createRepositories = function (options) {
    return {
        signup: require('./signup').createRepository(options),
        login: require('./login').createRepository(options),
        userhome: require('./userhome').createRepository(options),
        logout : require('./logout').createRepository(options),
        status: require('./status').createRepository(options),
        createcampaign : require("./createcampaign").createRepository(options),
        editimages: require("./editimages").createRepository(options),
        uploadfile: require("./uploadfile").createRepository(options),
        endedcampaignstatistics: require("./endedcampaignstatistics").createRepository(options),
        editworkers: require("./editworkers").createRepository(options),
        taskstatistics:require("./taskstatistics").createRepository(options),
        taskworkingsession:require("./taskworkingsession").createRepository(options)
    };
};

},{"./createcampaign":37,"./editimages":38,"./editworkers":39,"./endedcampaignstatistics":40,"./login":42,"./logout":43,"./signup":44,"./status":45,"./taskstatistics":46,"./taskworkingsession":47,"./uploadfile":48,"./userhome":49}],42:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 23/05/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],43:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],44:[function(require,module,exports){
(function (global){
/*jslint node:true, nomen: true */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],45:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 25/05/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository();
    }
    this._server = server || '';
}

Repository.prototype.setApiToken = function (apiToken) {
    var self = this;
    //per i test dada, dada, legiliments  (role master) -> registrato con successo
    //anche dada1,dada1,legiliments (role worker) -> registrato con successo
    self.apiToken = apiToken;
    self.authApiToken = 'APIToken '+apiToken;
};

Repository.prototype.deleteApiToken = function () {
    var self = this;
    //per i test dada, dada, legiliments  (role master) -> registrato con successo
    //anche dada1,dada1,legiliments (role worker) -> registrato con successo
    self.apiToken = undefined;
    self.authApiToken = undefined;
};
Repository.prototype.getApiToken = function () {
    var self = this;
    return self.apiToken;
};

Repository.prototype.getAuthApiToken = function () {
    var self = this;
    return self.authApiToken;
};

Repository.prototype.setSuccessNext = function (next){
    var self = this;
    self.next = next;
};

Repository.prototype.getSuccessNext = function (){
    var self = this;
    return self.next;
};

Repository.prototype.deleteSuccessNext = function(){
    var self = this;
    delete self.next;
};

Repository.prototype.setCurrentCampaign = function(campaign){
    var self = this;
    self.campaign = campaign;
};

Repository.prototype.getCurrentCampaign = function(){
    var self = this;
    return self.campaign;
};

Repository.prototype.deleteCurrentCampaign = function(){
    var self = this;
    delete self.campaign;
};

Repository.prototype.setCurrentImage = function(image){
    var self = this;
    self.image = image;
};

Repository.prototype.getCurrentImage = function(){
    var self = this;
    return self.image;
};
Repository.prototype.deleteCurrentImage = function(){
    var self = this;
    delete self.image;
};

Repository.prototype.setCurrentTask = function(task){
    var self = this;
    self.task = task;
};

Repository.prototype.getCurrentTask = function(){
    var self = this;
    return self.task;
};
Repository.prototype.deleteCurrentTask = function(){
    var self = this;
    delete self.task;
};

Repository.prototype.setCurrentImageStatistics = function(imageStatistics){
    var self = this;
    self.imageStatistics = imageStatistics;
};

Repository.prototype.getCurrentImageStatistics = function(){
    var self = this;
    return self.imageStatistics;
};

exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],46:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 12/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],47:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 13/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],48:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 05/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],49:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
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
            alert("successo getCampaignAjax");
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
            dataType : 'json',
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
            alert("SuccessoAjaxCampaigns");
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
        alert("SuccessoAjaxStartCampaign");
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
            alert("SuccessoAjaxTerminateCampaign");
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



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":50}],50:[function(require,module,exports){
(function (process,global){
/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2017 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.5.0
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var SomePromiseArray = Promise._SomePromiseArray;
function any(promises) {
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(1);
    ret.setUnwrap();
    ret.init();
    return promise;
}

Promise.any = function (promises) {
    return any(promises);
};

Promise.prototype.any = function () {
    return any(this);
};

};

},{}],2:[function(_dereq_,module,exports){
"use strict";
var firstLineError;
try {throw new Error(); } catch (e) {firstLineError = e;}
var schedule = _dereq_("./schedule");
var Queue = _dereq_("./queue");
var util = _dereq_("./util");

function Async() {
    this._customScheduler = false;
    this._isTickUsed = false;
    this._lateQueue = new Queue(16);
    this._normalQueue = new Queue(16);
    this._haveDrainedQueues = false;
    this._trampolineEnabled = true;
    var self = this;
    this.drainQueues = function () {
        self._drainQueues();
    };
    this._schedule = schedule;
}

Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    this._schedule = fn;
    this._customScheduler = true;
    return prev;
};

Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
};

Async.prototype.enableTrampoline = function() {
    this._trampolineEnabled = true;
};

Async.prototype.disableTrampolineIfNecessary = function() {
    if (util.hasDevTools) {
        this._trampolineEnabled = false;
    }
};

Async.prototype.haveItemsQueued = function () {
    return this._isTickUsed || this._haveDrainedQueues;
};


Async.prototype.fatalError = function(e, isNode) {
    if (isNode) {
        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
            "\n");
        process.exit(2);
    } else {
        this.throwLater(e);
    }
};

Async.prototype.throwLater = function(fn, arg) {
    if (arguments.length === 1) {
        arg = fn;
        fn = function () { throw arg; };
    }
    if (typeof setTimeout !== "undefined") {
        setTimeout(function() {
            fn(arg);
        }, 0);
    } else try {
        this._schedule(function() {
            fn(arg);
        });
    } catch (e) {
        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
};

function AsyncInvokeLater(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncInvoke(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncSettlePromises(promise) {
    this._normalQueue._pushOne(promise);
    this._queueTick();
}

if (!util.hasDevTools) {
    Async.prototype.invokeLater = AsyncInvokeLater;
    Async.prototype.invoke = AsyncInvoke;
    Async.prototype.settlePromises = AsyncSettlePromises;
} else {
    Async.prototype.invokeLater = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvokeLater.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                setTimeout(function() {
                    fn.call(receiver, arg);
                }, 100);
            });
        }
    };

    Async.prototype.invoke = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvoke.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                fn.call(receiver, arg);
            });
        }
    };

    Async.prototype.settlePromises = function(promise) {
        if (this._trampolineEnabled) {
            AsyncSettlePromises.call(this, promise);
        } else {
            this._schedule(function() {
                promise._settlePromises();
            });
        }
    };
}

Async.prototype._drainQueue = function(queue) {
    while (queue.length() > 0) {
        var fn = queue.shift();
        if (typeof fn !== "function") {
            fn._settlePromises();
            continue;
        }
        var receiver = queue.shift();
        var arg = queue.shift();
        fn.call(receiver, arg);
    }
};

Async.prototype._drainQueues = function () {
    this._drainQueue(this._normalQueue);
    this._reset();
    this._haveDrainedQueues = true;
    this._drainQueue(this._lateQueue);
};

Async.prototype._queueTick = function () {
    if (!this._isTickUsed) {
        this._isTickUsed = true;
        this._schedule(this.drainQueues);
    }
};

Async.prototype._reset = function () {
    this._isTickUsed = false;
};

module.exports = Async;
module.exports.firstLineError = firstLineError;

},{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
var calledBind = false;
var rejectThis = function(_, e) {
    this._reject(e);
};

var targetRejected = function(e, context) {
    context.promiseRejectionQueued = true;
    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
};

var bindingResolved = function(thisArg, context) {
    if (((this._bitField & 50397184) === 0)) {
        this._resolveCallback(context.target);
    }
};

var bindingRejected = function(e, context) {
    if (!context.promiseRejectionQueued) this._reject(e);
};

Promise.prototype.bind = function (thisArg) {
    if (!calledBind) {
        calledBind = true;
        Promise.prototype._propagateFrom = debug.propagateFromFunction();
        Promise.prototype._boundValue = debug.boundValueFunction();
    }
    var maybePromise = tryConvertToPromise(thisArg);
    var ret = new Promise(INTERNAL);
    ret._propagateFrom(this, 1);
    var target = this._target();
    ret._setBoundTo(maybePromise);
    if (maybePromise instanceof Promise) {
        var context = {
            promiseRejectionQueued: false,
            promise: ret,
            target: target,
            bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, undefined, ret, context);
        maybePromise._then(
            bindingResolved, bindingRejected, undefined, ret, context);
        ret._setOnCancel(maybePromise);
    } else {
        ret._resolveCallback(target);
    }
    return ret;
};

Promise.prototype._setBoundTo = function (obj) {
    if (obj !== undefined) {
        this._bitField = this._bitField | 2097152;
        this._boundTo = obj;
    } else {
        this._bitField = this._bitField & (~2097152);
    }
};

Promise.prototype._isBound = function () {
    return (this._bitField & 2097152) === 2097152;
};

Promise.bind = function (thisArg, value) {
    return Promise.resolve(value).bind(thisArg);
};
};

},{}],4:[function(_dereq_,module,exports){
"use strict";
var old;
if (typeof Promise !== "undefined") old = Promise;
function noConflict() {
    try { if (Promise === bluebird) Promise = old; }
    catch (e) {}
    return bluebird;
}
var bluebird = _dereq_("./promise")();
bluebird.noConflict = noConflict;
module.exports = bluebird;

},{"./promise":22}],5:[function(_dereq_,module,exports){
"use strict";
var cr = Object.create;
if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
}

module.exports = function(Promise) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var isIdentifier = util.isIdentifier;

var getMethodCaller;
var getGetter;
if (!true) {
var makeMethodCaller = function (methodName) {
    return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
};

var makeGetter = function (propertyName) {
    return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
};

var getCompiled = function(name, compiler, cache) {
    var ret = cache[name];
    if (typeof ret !== "function") {
        if (!isIdentifier(name)) {
            return null;
        }
        ret = compiler(name);
        cache[name] = ret;
        cache[" size"]++;
        if (cache[" size"] > 512) {
            var keys = Object.keys(cache);
            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
            cache[" size"] = keys.length - 256;
        }
    }
    return ret;
};

getMethodCaller = function(name) {
    return getCompiled(name, makeMethodCaller, callerCache);
};

getGetter = function(name) {
    return getCompiled(name, makeGetter, getterCache);
};
}

function ensureMethod(obj, methodName) {
    var fn;
    if (obj != null) fn = obj[methodName];
    if (typeof fn !== "function") {
        var message = "Object " + util.classString(obj) + " has no method '" +
            util.toString(methodName) + "'";
        throw new Promise.TypeError(message);
    }
    return fn;
}

function caller(obj) {
    var methodName = this.pop();
    var fn = ensureMethod(obj, methodName);
    return fn.apply(obj, this);
}
Promise.prototype.call = function (methodName) {
    var args = [].slice.call(arguments, 1);;
    if (!true) {
        if (canEvaluate) {
            var maybeCaller = getMethodCaller(methodName);
            if (maybeCaller !== null) {
                return this._then(
                    maybeCaller, undefined, undefined, args, undefined);
            }
        }
    }
    args.push(methodName);
    return this._then(caller, undefined, undefined, args, undefined);
};

function namedGetter(obj) {
    return obj[this];
}
function indexedGetter(obj) {
    var index = +this;
    if (index < 0) index = Math.max(0, index + obj.length);
    return obj[index];
}
Promise.prototype.get = function (propertyName) {
    var isIndex = (typeof propertyName === "number");
    var getter;
    if (!isIndex) {
        if (canEvaluate) {
            var maybeGetter = getGetter(propertyName);
            getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
            getter = namedGetter;
        }
    } else {
        getter = indexedGetter;
    }
    return this._then(getter, undefined, undefined, propertyName, undefined);
};
};

},{"./util":36}],6:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, PromiseArray, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

Promise.prototype["break"] = Promise.prototype.cancel = function() {
    if (!debug.cancellation()) return this._warn("cancellation is disabled");

    var promise = this;
    var child = promise;
    while (promise._isCancellable()) {
        if (!promise._cancelBy(child)) {
            if (child._isFollowing()) {
                child._followee().cancel();
            } else {
                child._cancelBranched();
            }
            break;
        }

        var parent = promise._cancellationParent;
        if (parent == null || !parent._isCancellable()) {
            if (promise._isFollowing()) {
                promise._followee().cancel();
            } else {
                promise._cancelBranched();
            }
            break;
        } else {
            if (promise._isFollowing()) promise._followee().cancel();
            promise._setWillBeCancelled();
            child = promise;
            promise = parent;
        }
    }
};

Promise.prototype._branchHasCancelled = function() {
    this._branchesRemainingToCancel--;
};

Promise.prototype._enoughBranchesHaveCancelled = function() {
    return this._branchesRemainingToCancel === undefined ||
           this._branchesRemainingToCancel <= 0;
};

Promise.prototype._cancelBy = function(canceller) {
    if (canceller === this) {
        this._branchesRemainingToCancel = 0;
        this._invokeOnCancel();
        return true;
    } else {
        this._branchHasCancelled();
        if (this._enoughBranchesHaveCancelled()) {
            this._invokeOnCancel();
            return true;
        }
    }
    return false;
};

Promise.prototype._cancelBranched = function() {
    if (this._enoughBranchesHaveCancelled()) {
        this._cancel();
    }
};

Promise.prototype._cancel = function() {
    if (!this._isCancellable()) return;
    this._setCancelled();
    async.invoke(this._cancelPromises, this, undefined);
};

Promise.prototype._cancelPromises = function() {
    if (this._length() > 0) this._settlePromises();
};

Promise.prototype._unsetOnCancel = function() {
    this._onCancelField = undefined;
};

Promise.prototype._isCancellable = function() {
    return this.isPending() && !this._isCancelled();
};

Promise.prototype.isCancellable = function() {
    return this.isPending() && !this.isCancelled();
};

Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
    if (util.isArray(onCancelCallback)) {
        for (var i = 0; i < onCancelCallback.length; ++i) {
            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
        }
    } else if (onCancelCallback !== undefined) {
        if (typeof onCancelCallback === "function") {
            if (!internalOnly) {
                var e = tryCatch(onCancelCallback).call(this._boundValue());
                if (e === errorObj) {
                    this._attachExtraTrace(e.e);
                    async.throwLater(e.e);
                }
            }
        } else {
            onCancelCallback._resultCancelled(this);
        }
    }
};

Promise.prototype._invokeOnCancel = function() {
    var onCancelCallback = this._onCancel();
    this._unsetOnCancel();
    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
};

Promise.prototype._invokeInternalOnCancel = function() {
    if (this._isCancellable()) {
        this._doInvokeOnCancel(this._onCancel(), true);
        this._unsetOnCancel();
    }
};

Promise.prototype._resultCancelled = function() {
    this.cancel();
};

};

},{"./util":36}],7:[function(_dereq_,module,exports){
"use strict";
module.exports = function(NEXT_FILTER) {
var util = _dereq_("./util");
var getKeys = _dereq_("./es5").keys;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function catchFilter(instances, cb, promise) {
    return function(e) {
        var boundTo = promise._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
            var item = instances[i];

            if (item === Error ||
                (item != null && item.prototype instanceof Error)) {
                if (e instanceof item) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (typeof item === "function") {
                var matchesPredicate = tryCatch(item).call(boundTo, e);
                if (matchesPredicate === errorObj) {
                    return matchesPredicate;
                } else if (matchesPredicate) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (util.isObject(e)) {
                var keys = getKeys(item);
                for (var j = 0; j < keys.length; ++j) {
                    var key = keys[j];
                    if (item[key] != e[key]) {
                        continue predicateLoop;
                    }
                }
                return tryCatch(cb).call(boundTo, e);
            }
        }
        return NEXT_FILTER;
    };
}

return catchFilter;
};

},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var longStackTraces = false;
var contextStack = [];

Promise.prototype._promiseCreated = function() {};
Promise.prototype._pushContext = function() {};
Promise.prototype._popContext = function() {return null;};
Promise._peekContext = Promise.prototype._peekContext = function() {};

function Context() {
    this._trace = new Context.CapturedTrace(peekContext());
}
Context.prototype._pushContext = function () {
    if (this._trace !== undefined) {
        this._trace._promiseCreated = null;
        contextStack.push(this._trace);
    }
};

Context.prototype._popContext = function () {
    if (this._trace !== undefined) {
        var trace = contextStack.pop();
        var ret = trace._promiseCreated;
        trace._promiseCreated = null;
        return ret;
    }
    return null;
};

function createContext() {
    if (longStackTraces) return new Context();
}

function peekContext() {
    var lastIndex = contextStack.length - 1;
    if (lastIndex >= 0) {
        return contextStack[lastIndex];
    }
    return undefined;
}
Context.CapturedTrace = null;
Context.create = createContext;
Context.deactivateLongStackTraces = function() {};
Context.activateLongStackTraces = function() {
    var Promise_pushContext = Promise.prototype._pushContext;
    var Promise_popContext = Promise.prototype._popContext;
    var Promise_PeekContext = Promise._peekContext;
    var Promise_peekContext = Promise.prototype._peekContext;
    var Promise_promiseCreated = Promise.prototype._promiseCreated;
    Context.deactivateLongStackTraces = function() {
        Promise.prototype._pushContext = Promise_pushContext;
        Promise.prototype._popContext = Promise_popContext;
        Promise._peekContext = Promise_PeekContext;
        Promise.prototype._peekContext = Promise_peekContext;
        Promise.prototype._promiseCreated = Promise_promiseCreated;
        longStackTraces = false;
    };
    longStackTraces = true;
    Promise.prototype._pushContext = Context.prototype._pushContext;
    Promise.prototype._popContext = Context.prototype._popContext;
    Promise._peekContext = Promise.prototype._peekContext = peekContext;
    Promise.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
    };
};
return Context;
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, Context) {
var getDomain = Promise._getDomain;
var async = Promise._async;
var Warning = _dereq_("./errors").Warning;
var util = _dereq_("./util");
var canAttachTrace = util.canAttachTrace;
var unhandledRejectionHandled;
var possiblyUnhandledRejection;
var bluebirdFramePattern =
    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
var stackFramePattern = null;
var formatStack = null;
var indentStackFrames = false;
var printWarning;
var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
                        (true ||
                         util.env("BLUEBIRD_DEBUG") ||
                         util.env("NODE_ENV") === "development"));

var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
    (debugging || util.env("BLUEBIRD_WARNINGS")));

var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

Promise.prototype.suppressUnhandledRejections = function() {
    var target = this._target();
    target._bitField = ((target._bitField & (~1048576)) |
                      524288);
};

Promise.prototype._ensurePossibleRejectionHandled = function () {
    if ((this._bitField & 524288) !== 0) return;
    this._setRejectionIsUnhandled();
    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
};

Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
    fireRejectionEvent("rejectionHandled",
                                  unhandledRejectionHandled, undefined, this);
};

Promise.prototype._setReturnedNonUndefined = function() {
    this._bitField = this._bitField | 268435456;
};

Promise.prototype._returnedNonUndefined = function() {
    return (this._bitField & 268435456) !== 0;
};

Promise.prototype._notifyUnhandledRejection = function () {
    if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified();
        fireRejectionEvent("unhandledRejection",
                                      possiblyUnhandledRejection, reason, this);
    }
};

Promise.prototype._setUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField | 262144;
};

Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField & (~262144);
};

Promise.prototype._isUnhandledRejectionNotified = function () {
    return (this._bitField & 262144) > 0;
};

Promise.prototype._setRejectionIsUnhandled = function () {
    this._bitField = this._bitField | 1048576;
};

Promise.prototype._unsetRejectionIsUnhandled = function () {
    this._bitField = this._bitField & (~1048576);
    if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
    }
};

Promise.prototype._isRejectionUnhandled = function () {
    return (this._bitField & 1048576) > 0;
};

Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
    return warn(message, shouldUseOwnTrace, promise || this);
};

Promise.onPossiblyUnhandledRejection = function (fn) {
    var domain = getDomain();
    possiblyUnhandledRejection =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

Promise.onUnhandledRejectionHandled = function (fn) {
    var domain = getDomain();
    unhandledRejectionHandled =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

var disableLongStackTraces = function() {};
Promise.longStackTraces = function () {
    if (async.haveItemsQueued() && !config.longStackTraces) {
        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
        config.longStackTraces = true;
        disableLongStackTraces = function() {
            if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
            }
            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
            Context.deactivateLongStackTraces();
            async.enableTrampoline();
            config.longStackTraces = false;
        };
        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
        Context.activateLongStackTraces();
        async.disableTrampolineIfNecessary();
    }
};

Promise.hasLongStackTraces = function () {
    return config.longStackTraces && longStackTracesIsSupported();
};

var fireDomEvent = (function() {
    try {
        if (typeof CustomEvent === "function") {
            var event = new CustomEvent("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new CustomEvent(name.toLowerCase(), {
                    detail: event,
                    cancelable: true
                });
                return !util.global.dispatchEvent(domEvent);
            };
        } else if (typeof Event === "function") {
            var event = new Event("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new Event(name.toLowerCase(), {
                    cancelable: true
                });
                domEvent.detail = event;
                return !util.global.dispatchEvent(domEvent);
            };
        } else {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent("testingtheevent", false, true, {});
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = document.createEvent("CustomEvent");
                domEvent.initCustomEvent(name.toLowerCase(), false, true,
                    event);
                return !util.global.dispatchEvent(domEvent);
            };
        }
    } catch (e) {}
    return function() {
        return false;
    };
})();

var fireGlobalEvent = (function() {
    if (util.isNode) {
        return function() {
            return process.emit.apply(process, arguments);
        };
    } else {
        if (!util.global) {
            return function() {
                return false;
            };
        }
        return function(name) {
            var methodName = "on" + name.toLowerCase();
            var method = util.global[methodName];
            if (!method) return false;
            method.apply(util.global, [].slice.call(arguments, 1));
            return true;
        };
    }
})();

function generatePromiseLifecycleEventObject(name, promise) {
    return {promise: promise};
}

var eventToObjectGenerator = {
    promiseCreated: generatePromiseLifecycleEventObject,
    promiseFulfilled: generatePromiseLifecycleEventObject,
    promiseRejected: generatePromiseLifecycleEventObject,
    promiseResolved: generatePromiseLifecycleEventObject,
    promiseCancelled: generatePromiseLifecycleEventObject,
    promiseChained: function(name, promise, child) {
        return {promise: promise, child: child};
    },
    warning: function(name, warning) {
        return {warning: warning};
    },
    unhandledRejection: function (name, reason, promise) {
        return {reason: reason, promise: promise};
    },
    rejectionHandled: generatePromiseLifecycleEventObject
};

var activeFireEvent = function (name) {
    var globalEventFired = false;
    try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
    } catch (e) {
        async.throwLater(e);
        globalEventFired = true;
    }

    var domEventFired = false;
    try {
        domEventFired = fireDomEvent(name,
                    eventToObjectGenerator[name].apply(null, arguments));
    } catch (e) {
        async.throwLater(e);
        domEventFired = true;
    }

    return domEventFired || globalEventFired;
};

Promise.config = function(opts) {
    opts = Object(opts);
    if ("longStackTraces" in opts) {
        if (opts.longStackTraces) {
            Promise.longStackTraces();
        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
            disableLongStackTraces();
        }
    }
    if ("warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption;
        wForgottenReturn = config.warnings;

        if (util.isObject(warningsOption)) {
            if ("wForgottenReturn" in warningsOption) {
                wForgottenReturn = !!warningsOption.wForgottenReturn;
            }
        }
    }
    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async.haveItemsQueued()) {
            throw new Error(
                "cannot enable cancellation after promises are in use");
        }
        Promise.prototype._clearCancellationData =
            cancellationClearCancellationData;
        Promise.prototype._propagateFrom = cancellationPropagateFrom;
        Promise.prototype._onCancel = cancellationOnCancel;
        Promise.prototype._setOnCancel = cancellationSetOnCancel;
        Promise.prototype._attachCancellationCallback =
            cancellationAttachCancellationCallback;
        Promise.prototype._execute = cancellationExecute;
        propagateFromFunction = cancellationPropagateFrom;
        config.cancellation = true;
    }
    if ("monitoring" in opts) {
        if (opts.monitoring && !config.monitoring) {
            config.monitoring = true;
            Promise.prototype._fireEvent = activeFireEvent;
        } else if (!opts.monitoring && config.monitoring) {
            config.monitoring = false;
            Promise.prototype._fireEvent = defaultFireEvent;
        }
    }
    return Promise;
};

function defaultFireEvent() { return false; }

Promise.prototype._fireEvent = defaultFireEvent;
Promise.prototype._execute = function(executor, resolve, reject) {
    try {
        executor(resolve, reject);
    } catch (e) {
        return e;
    }
};
Promise.prototype._onCancel = function () {};
Promise.prototype._setOnCancel = function (handler) { ; };
Promise.prototype._attachCancellationCallback = function(onCancel) {
    ;
};
Promise.prototype._captureStackTrace = function () {};
Promise.prototype._attachExtraTrace = function () {};
Promise.prototype._clearCancellationData = function() {};
Promise.prototype._propagateFrom = function (parent, flags) {
    ;
    ;
};

function cancellationExecute(executor, resolve, reject) {
    var promise = this;
    try {
        executor(resolve, reject, function(onCancel) {
            if (typeof onCancel !== "function") {
                throw new TypeError("onCancel must be a function, got: " +
                                    util.toString(onCancel));
            }
            promise._attachCancellationCallback(onCancel);
        });
    } catch (e) {
        return e;
    }
}

function cancellationAttachCancellationCallback(onCancel) {
    if (!this._isCancellable()) return this;

    var previousOnCancel = this._onCancel();
    if (previousOnCancel !== undefined) {
        if (util.isArray(previousOnCancel)) {
            previousOnCancel.push(onCancel);
        } else {
            this._setOnCancel([previousOnCancel, onCancel]);
        }
    } else {
        this._setOnCancel(onCancel);
    }
}

function cancellationOnCancel() {
    return this._onCancelField;
}

function cancellationSetOnCancel(onCancel) {
    this._onCancelField = onCancel;
}

function cancellationClearCancellationData() {
    this._cancellationParent = undefined;
    this._onCancelField = undefined;
}

function cancellationPropagateFrom(parent, flags) {
    if ((flags & 1) !== 0) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        if (branchesRemainingToCancel === undefined) {
            branchesRemainingToCancel = 0;
        }
        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
    }
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}

function bindingPropagateFrom(parent, flags) {
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}
var propagateFromFunction = bindingPropagateFrom;

function boundValueFunction() {
    var ret = this._boundTo;
    if (ret !== undefined) {
        if (ret instanceof Promise) {
            if (ret.isFulfilled()) {
                return ret.value();
            } else {
                return undefined;
            }
        }
    }
    return ret;
}

function longStackTracesCaptureStackTrace() {
    this._trace = new CapturedTrace(this._peekContext());
}

function longStackTracesAttachExtraTrace(error, ignoreSelf) {
    if (canAttachTrace(error)) {
        var trace = this._trace;
        if (trace !== undefined) {
            if (ignoreSelf) trace = trace._parent;
        }
        if (trace !== undefined) {
            trace.attachExtraTrace(error);
        } else if (!error.__stackCleaned__) {
            var parsed = parseStackAndMessage(error);
            util.notEnumerableProp(error, "stack",
                parsed.message + "\n" + parsed.stack.join("\n"));
            util.notEnumerableProp(error, "__stackCleaned__", true);
        }
    }
}

function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                               parent) {
    if (returnValue === undefined && promiseCreated !== null &&
        wForgottenReturn) {
        if (parent !== undefined && parent._returnedNonUndefined()) return;
        if ((promise._bitField & 65535) === 0) return;

        if (name) name = name + " ";
        var handlerLine = "";
        var creatorLine = "";
        if (promiseCreated._trace) {
            var traceLines = promiseCreated._trace.stack.split("\n");
            var stack = cleanStack(traceLines);
            for (var i = stack.length - 1; i >= 0; --i) {
                var line = stack[i];
                if (!nodeFramePattern.test(line)) {
                    var lineMatches = line.match(parseLinePattern);
                    if (lineMatches) {
                        handlerLine  = "at " + lineMatches[1] +
                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                    }
                    break;
                }
            }

            if (stack.length > 0) {
                var firstUserLine = stack[0];
                for (var i = 0; i < traceLines.length; ++i) {

                    if (traceLines[i] === firstUserLine) {
                        if (i > 0) {
                            creatorLine = "\n" + traceLines[i - 1];
                        }
                        break;
                    }
                }

            }
        }
        var msg = "a promise was created in a " + name +
            "handler " + handlerLine + "but was not returned from it, " +
            "see http://goo.gl/rRqMUw" +
            creatorLine;
        promise._warn(msg, true, promiseCreated);
    }
}

function deprecated(name, replacement) {
    var message = name +
        " is deprecated and will be removed in a future version.";
    if (replacement) message += " Use " + replacement + " instead.";
    return warn(message);
}

function warn(message, shouldUseOwnTrace, promise) {
    if (!config.warnings) return;
    var warning = new Warning(message);
    var ctx;
    if (shouldUseOwnTrace) {
        promise._attachExtraTrace(warning);
    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
        ctx.attachExtraTrace(warning);
    } else {
        var parsed = parseStackAndMessage(warning);
        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
    }

    if (!activeFireEvent("warning", warning)) {
        formatAndLogError(warning, "", true);
    }
}

function reconstructStack(message, stacks) {
    for (var i = 0; i < stacks.length - 1; ++i) {
        stacks[i].push("From previous event:");
        stacks[i] = stacks[i].join("\n");
    }
    if (i < stacks.length) {
        stacks[i] = stacks[i].join("\n");
    }
    return message + "\n" + stacks.join("\n");
}

function removeDuplicateOrEmptyJumps(stacks) {
    for (var i = 0; i < stacks.length; ++i) {
        if (stacks[i].length === 0 ||
            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
            stacks.splice(i, 1);
            i--;
        }
    }
}

function removeCommonRoots(stacks) {
    var current = stacks[0];
    for (var i = 1; i < stacks.length; ++i) {
        var prev = stacks[i];
        var currentLastIndex = current.length - 1;
        var currentLastLine = current[currentLastIndex];
        var commonRootMeetPoint = -1;

        for (var j = prev.length - 1; j >= 0; --j) {
            if (prev[j] === currentLastLine) {
                commonRootMeetPoint = j;
                break;
            }
        }

        for (var j = commonRootMeetPoint; j >= 0; --j) {
            var line = prev[j];
            if (current[currentLastIndex] === line) {
                current.pop();
                currentLastIndex--;
            } else {
                break;
            }
        }
        current = prev;
    }
}

function cleanStack(stack) {
    var ret = [];
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        var isTraceLine = "    (No stack trace)" === line ||
            stackFramePattern.test(line);
        var isInternalFrame = isTraceLine && shouldIgnore(line);
        if (isTraceLine && !isInternalFrame) {
            if (indentStackFrames && line.charAt(0) !== " ") {
                line = "    " + line;
            }
            ret.push(line);
        }
    }
    return ret;
}

function stackFramesAsArray(error) {
    var stack = error.stack.replace(/\s+$/g, "").split("\n");
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
            break;
        }
    }
    if (i > 0 && error.name != "SyntaxError") {
        stack = stack.slice(i);
    }
    return stack;
}

function parseStackAndMessage(error) {
    var stack = error.stack;
    var message = error.toString();
    stack = typeof stack === "string" && stack.length > 0
                ? stackFramesAsArray(error) : ["    (No stack trace)"];
    return {
        message: message,
        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
    };
}

function formatAndLogError(error, title, isSoft) {
    if (typeof console !== "undefined") {
        var message;
        if (util.isObject(error)) {
            var stack = error.stack;
            message = title + formatStack(stack, error);
        } else {
            message = title + String(error);
        }
        if (typeof printWarning === "function") {
            printWarning(message, isSoft);
        } else if (typeof console.log === "function" ||
            typeof console.log === "object") {
            console.log(message);
        }
    }
}

function fireRejectionEvent(name, localHandler, reason, promise) {
    var localEventFired = false;
    try {
        if (typeof localHandler === "function") {
            localEventFired = true;
            if (name === "rejectionHandled") {
                localHandler(promise);
            } else {
                localHandler(reason, promise);
            }
        }
    } catch (e) {
        async.throwLater(e);
    }

    if (name === "unhandledRejection") {
        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
            formatAndLogError(reason, "Unhandled rejection ");
        }
    } else {
        activeFireEvent(name, promise);
    }
}

function formatNonError(obj) {
    var str;
    if (typeof obj === "function") {
        str = "[function " +
            (obj.name || "anonymous") +
            "]";
    } else {
        str = obj && typeof obj.toString === "function"
            ? obj.toString() : util.toString(obj);
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
            try {
                var newStr = JSON.stringify(obj);
                str = newStr;
            }
            catch(e) {

            }
        }
        if (str.length === 0) {
            str = "(empty array)";
        }
    }
    return ("(<" + snip(str) + ">, no stack trace)");
}

function snip(str) {
    var maxChars = 41;
    if (str.length < maxChars) {
        return str;
    }
    return str.substr(0, maxChars - 3) + "...";
}

function longStackTracesIsSupported() {
    return typeof captureStackTrace === "function";
}

var shouldIgnore = function() { return false; };
var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
function parseLineInfo(line) {
    var matches = line.match(parseLineInfoRegex);
    if (matches) {
        return {
            fileName: matches[1],
            line: parseInt(matches[2], 10)
        };
    }
}

function setBounds(firstLineError, lastLineError) {
    if (!longStackTracesIsSupported()) return;
    var firstStackLines = firstLineError.stack.split("\n");
    var lastStackLines = lastLineError.stack.split("\n");
    var firstIndex = -1;
    var lastIndex = -1;
    var firstFileName;
    var lastFileName;
    for (var i = 0; i < firstStackLines.length; ++i) {
        var result = parseLineInfo(firstStackLines[i]);
        if (result) {
            firstFileName = result.fileName;
            firstIndex = result.line;
            break;
        }
    }
    for (var i = 0; i < lastStackLines.length; ++i) {
        var result = parseLineInfo(lastStackLines[i]);
        if (result) {
            lastFileName = result.fileName;
            lastIndex = result.line;
            break;
        }
    }
    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
        firstFileName !== lastFileName || firstIndex >= lastIndex) {
        return;
    }

    shouldIgnore = function(line) {
        if (bluebirdFramePattern.test(line)) return true;
        var info = parseLineInfo(line);
        if (info) {
            if (info.fileName === firstFileName &&
                (firstIndex <= info.line && info.line <= lastIndex)) {
                return true;
            }
        }
        return false;
    };
}

function CapturedTrace(parent) {
    this._parent = parent;
    this._promisesCreated = 0;
    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
    captureStackTrace(this, CapturedTrace);
    if (length > 32) this.uncycle();
}
util.inherits(CapturedTrace, Error);
Context.CapturedTrace = CapturedTrace;

CapturedTrace.prototype.uncycle = function() {
    var length = this._length;
    if (length < 2) return;
    var nodes = [];
    var stackToIndex = {};

    for (var i = 0, node = this; node !== undefined; ++i) {
        nodes.push(node);
        node = node._parent;
    }
    length = this._length = i;
    for (var i = length - 1; i >= 0; --i) {
        var stack = nodes[i].stack;
        if (stackToIndex[stack] === undefined) {
            stackToIndex[stack] = i;
        }
    }
    for (var i = 0; i < length; ++i) {
        var currentStack = nodes[i].stack;
        var index = stackToIndex[currentStack];
        if (index !== undefined && index !== i) {
            if (index > 0) {
                nodes[index - 1]._parent = undefined;
                nodes[index - 1]._length = 1;
            }
            nodes[i]._parent = undefined;
            nodes[i]._length = 1;
            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

            if (index < length - 1) {
                cycleEdgeNode._parent = nodes[index + 1];
                cycleEdgeNode._parent.uncycle();
                cycleEdgeNode._length =
                    cycleEdgeNode._parent._length + 1;
            } else {
                cycleEdgeNode._parent = undefined;
                cycleEdgeNode._length = 1;
            }
            var currentChildLength = cycleEdgeNode._length + 1;
            for (var j = i - 2; j >= 0; --j) {
                nodes[j]._length = currentChildLength;
                currentChildLength++;
            }
            return;
        }
    }
};

CapturedTrace.prototype.attachExtraTrace = function(error) {
    if (error.__stackCleaned__) return;
    this.uncycle();
    var parsed = parseStackAndMessage(error);
    var message = parsed.message;
    var stacks = [parsed.stack];

    var trace = this;
    while (trace !== undefined) {
        stacks.push(cleanStack(trace.stack.split("\n")));
        trace = trace._parent;
    }
    removeCommonRoots(stacks);
    removeDuplicateOrEmptyJumps(stacks);
    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
    util.notEnumerableProp(error, "__stackCleaned__", true);
};

var captureStackTrace = (function stackDetection() {
    var v8stackFramePattern = /^\s*at\s*/;
    var v8stackFormatter = function(stack, error) {
        if (typeof stack === "string") return stack;

        if (error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    if (typeof Error.stackTraceLimit === "number" &&
        typeof Error.captureStackTrace === "function") {
        Error.stackTraceLimit += 6;
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        var captureStackTrace = Error.captureStackTrace;

        shouldIgnore = function(line) {
            return bluebirdFramePattern.test(line);
        };
        return function(receiver, ignoreUntil) {
            Error.stackTraceLimit += 6;
            captureStackTrace(receiver, ignoreUntil);
            Error.stackTraceLimit -= 6;
        };
    }
    var err = new Error();

    if (typeof err.stack === "string" &&
        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
        stackFramePattern = /@/;
        formatStack = v8stackFormatter;
        indentStackFrames = true;
        return function captureStackTrace(o) {
            o.stack = new Error().stack;
        };
    }

    var hasStackAfterThrow;
    try { throw new Error(); }
    catch(e) {
        hasStackAfterThrow = ("stack" in e);
    }
    if (!("stack" in err) && hasStackAfterThrow &&
        typeof Error.stackTraceLimit === "number") {
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        return function captureStackTrace(o) {
            Error.stackTraceLimit += 6;
            try { throw new Error(); }
            catch(e) { o.stack = e.stack; }
            Error.stackTraceLimit -= 6;
        };
    }

    formatStack = function(stack, error) {
        if (typeof stack === "string") return stack;

        if ((typeof error === "object" ||
            typeof error === "function") &&
            error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    return null;

})([]);

if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
    printWarning = function (message) {
        console.warn(message);
    };
    if (util.isNode && process.stderr.isTTY) {
        printWarning = function(message, isSoft) {
            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
            console.warn(color + message + "\u001b[0m\n");
        };
    } else if (!util.isNode && typeof (new Error().stack) === "string") {
        printWarning = function(message, isSoft) {
            console.warn("%c" + message,
                        isSoft ? "color: darkorange" : "color: red");
        };
    }
}

var config = {
    warnings: warnings,
    longStackTraces: false,
    cancellation: false,
    monitoring: false
};

if (longStackTraces) Promise.longStackTraces();

return {
    longStackTraces: function() {
        return config.longStackTraces;
    },
    warnings: function() {
        return config.warnings;
    },
    cancellation: function() {
        return config.cancellation;
    },
    monitoring: function() {
        return config.monitoring;
    },
    propagateFromFunction: function() {
        return propagateFromFunction;
    },
    boundValueFunction: function() {
        return boundValueFunction;
    },
    checkForgottenReturns: checkForgottenReturns,
    setBounds: setBounds,
    warn: warn,
    deprecated: deprecated,
    CapturedTrace: CapturedTrace,
    fireDomEvent: fireDomEvent,
    fireGlobalEvent: fireGlobalEvent
};
};

},{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function returner() {
    return this.value;
}
function thrower() {
    throw this.reason;
}

Promise.prototype["return"] =
Promise.prototype.thenReturn = function (value) {
    if (value instanceof Promise) value.suppressUnhandledRejections();
    return this._then(
        returner, undefined, undefined, {value: value}, undefined);
};

Promise.prototype["throw"] =
Promise.prototype.thenThrow = function (reason) {
    return this._then(
        thrower, undefined, undefined, {reason: reason}, undefined);
};

Promise.prototype.catchThrow = function (reason) {
    if (arguments.length <= 1) {
        return this._then(
            undefined, thrower, undefined, {reason: reason}, undefined);
    } else {
        var _reason = arguments[1];
        var handler = function() {throw _reason;};
        return this.caught(reason, handler);
    }
};

Promise.prototype.catchReturn = function (value) {
    if (arguments.length <= 1) {
        if (value instanceof Promise) value.suppressUnhandledRejections();
        return this._then(
            undefined, returner, undefined, {value: value}, undefined);
    } else {
        var _value = arguments[1];
        if (_value instanceof Promise) _value.suppressUnhandledRejections();
        var handler = function() {return _value;};
        return this.caught(value, handler);
    }
};
};

},{}],11:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseReduce = Promise.reduce;
var PromiseAll = Promise.all;

function promiseAllThis() {
    return PromiseAll(this);
}

function PromiseMapSeries(promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
}

Promise.prototype.each = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, this, undefined);
};

Promise.prototype.mapSeries = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
};

Promise.each = function (promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, promises, undefined);
};

Promise.mapSeries = PromiseMapSeries;
};


},{}],12:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var Objectfreeze = es5.freeze;
var util = _dereq_("./util");
var inherits = util.inherits;
var notEnumerableProp = util.notEnumerableProp;

function subError(nameProperty, defaultMessage) {
    function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        notEnumerableProp(this, "message",
            typeof message === "string" ? message : defaultMessage);
        notEnumerableProp(this, "name", nameProperty);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Error.call(this);
        }
    }
    inherits(SubError, Error);
    return SubError;
}

var _TypeError, _RangeError;
var Warning = subError("Warning", "warning");
var CancellationError = subError("CancellationError", "cancellation error");
var TimeoutError = subError("TimeoutError", "timeout error");
var AggregateError = subError("AggregateError", "aggregate error");
try {
    _TypeError = TypeError;
    _RangeError = RangeError;
} catch(e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
}

var methods = ("join pop push shift unshift slice filter forEach some " +
    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

for (var i = 0; i < methods.length; ++i) {
    if (typeof Array.prototype[methods[i]] === "function") {
        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
    }
}

es5.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: false,
    writable: true,
    enumerable: true
});
AggregateError.prototype["isOperational"] = true;
var level = 0;
AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:" + "\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i = 0; i < this.length; ++i) {
        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
        var lines = str.split("\n");
        for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
        }
        str = lines.join("\n");
        ret += str + "\n";
    }
    level--;
    return ret;
};

function OperationalError(message) {
    if (!(this instanceof OperationalError))
        return new OperationalError(message);
    notEnumerableProp(this, "name", "OperationalError");
    notEnumerableProp(this, "message", message);
    this.cause = message;
    this["isOperational"] = true;

    if (message instanceof Error) {
        notEnumerableProp(this, "message", message.message);
        notEnumerableProp(this, "stack", message.stack);
    } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }

}
inherits(OperationalError, Error);

var errorTypes = Error["__BluebirdErrorTypes__"];
if (!errorTypes) {
    errorTypes = Objectfreeze({
        CancellationError: CancellationError,
        TimeoutError: TimeoutError,
        OperationalError: OperationalError,
        RejectionError: OperationalError,
        AggregateError: AggregateError
    });
    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: errorTypes,
        writable: false,
        enumerable: false,
        configurable: false
    });
}

module.exports = {
    Error: Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning: Warning
};

},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
var isES5 = (function(){
    "use strict";
    return this === undefined;
})();

if (isES5) {
    module.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: isES5,
        propertyIsWritable: function(obj, prop) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            return !!(!descriptor || descriptor.writable || descriptor.set);
        }
    };
} else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;

    var ObjectKeys = function (o) {
        var ret = [];
        for (var key in o) {
            if (has.call(o, key)) {
                ret.push(key);
            }
        }
        return ret;
    };

    var ObjectGetDescriptor = function(o, key) {
        return {value: o[key]};
    };

    var ObjectDefineProperty = function (o, key, desc) {
        o[key] = desc.value;
        return o;
    };

    var ObjectFreeze = function (obj) {
        return obj;
    };

    var ObjectGetPrototypeOf = function (obj) {
        try {
            return Object(obj).constructor.prototype;
        }
        catch (e) {
            return proto;
        }
    };

    var ArrayIsArray = function (obj) {
        try {
            return str.call(obj) === "[object Array]";
        }
        catch(e) {
            return false;
        }
    };

    module.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        names: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        getDescriptor: ObjectGetDescriptor,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5: isES5,
        propertyIsWritable: function() {
            return true;
        }
    };
}

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseMap = Promise.map;

Promise.prototype.filter = function (fn, options) {
    return PromiseMap(this, fn, options, INTERNAL);
};

Promise.filter = function (promises, fn, options) {
    return PromiseMap(promises, fn, options, INTERNAL);
};
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, tryConvertToPromise, NEXT_FILTER) {
var util = _dereq_("./util");
var CancellationError = Promise.CancellationError;
var errorObj = util.errorObj;
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);

function PassThroughHandlerContext(promise, type, handler) {
    this.promise = promise;
    this.type = type;
    this.handler = handler;
    this.called = false;
    this.cancelPromise = null;
}

PassThroughHandlerContext.prototype.isFinallyHandler = function() {
    return this.type === 0;
};

function FinallyHandlerCancelReaction(finallyHandler) {
    this.finallyHandler = finallyHandler;
}

FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
    checkCancel(this.finallyHandler);
};

function checkCancel(ctx, reason) {
    if (ctx.cancelPromise != null) {
        if (arguments.length > 1) {
            ctx.cancelPromise._reject(reason);
        } else {
            ctx.cancelPromise._cancel();
        }
        ctx.cancelPromise = null;
        return true;
    }
    return false;
}

function succeed() {
    return finallyHandler.call(this, this.promise._target()._settledValue());
}
function fail(reason) {
    if (checkCancel(this, reason)) return;
    errorObj.e = reason;
    return errorObj;
}
function finallyHandler(reasonOrValue) {
    var promise = this.promise;
    var handler = this.handler;

    if (!this.called) {
        this.called = true;
        var ret = this.isFinallyHandler()
            ? handler.call(promise._boundValue())
            : handler.call(promise._boundValue(), reasonOrValue);
        if (ret === NEXT_FILTER) {
            return ret;
        } else if (ret !== undefined) {
            promise._setReturnedNonUndefined();
            var maybePromise = tryConvertToPromise(ret, promise);
            if (maybePromise instanceof Promise) {
                if (this.cancelPromise != null) {
                    if (maybePromise._isCancelled()) {
                        var reason =
                            new CancellationError("late cancellation observer");
                        promise._attachExtraTrace(reason);
                        errorObj.e = reason;
                        return errorObj;
                    } else if (maybePromise.isPending()) {
                        maybePromise._attachCancellationCallback(
                            new FinallyHandlerCancelReaction(this));
                    }
                }
                return maybePromise._then(
                    succeed, fail, undefined, this, undefined);
            }
        }
    }

    if (promise.isRejected()) {
        checkCancel(this);
        errorObj.e = reasonOrValue;
        return errorObj;
    } else {
        checkCancel(this);
        return reasonOrValue;
    }
}

Promise.prototype._passThrough = function(handler, type, success, fail) {
    if (typeof handler !== "function") return this.then();
    return this._then(success,
                      fail,
                      undefined,
                      new PassThroughHandlerContext(this, type, handler),
                      undefined);
};

Promise.prototype.lastly =
Promise.prototype["finally"] = function (handler) {
    return this._passThrough(handler,
                             0,
                             finallyHandler,
                             finallyHandler);
};


Promise.prototype.tap = function (handler) {
    return this._passThrough(handler, 1, finallyHandler);
};

Promise.prototype.tapCatch = function (handlerOrPredicate) {
    var len = arguments.length;
    if(len === 1) {
        return this._passThrough(handlerOrPredicate,
                                 1,
                                 undefined,
                                 finallyHandler);
    } else {
         var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return Promise.reject(new TypeError(
                    "tapCatch statement predicate: "
                    + "expecting an object but got " + util.classString(item)
                ));
            }
        }
        catchInstances.length = j;
        var handler = arguments[i];
        return this._passThrough(catchFilter(catchInstances, handler, this),
                                 1,
                                 undefined,
                                 finallyHandler);
    }

};

return PassThroughHandlerContext;
};

},{"./catch_filter":7,"./util":36}],16:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          apiRejection,
                          INTERNAL,
                          tryConvertToPromise,
                          Proxyable,
                          debug) {
var errors = _dereq_("./errors");
var TypeError = errors.TypeError;
var util = _dereq_("./util");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
var yieldHandlers = [];

function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
    for (var i = 0; i < yieldHandlers.length; ++i) {
        traceParent._pushContext();
        var result = tryCatch(yieldHandlers[i])(value);
        traceParent._popContext();
        if (result === errorObj) {
            traceParent._pushContext();
            var ret = Promise.reject(errorObj.e);
            traceParent._popContext();
            return ret;
        }
        var maybePromise = tryConvertToPromise(result, traceParent);
        if (maybePromise instanceof Promise) return maybePromise;
    }
    return null;
}

function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
    if (debug.cancellation()) {
        var internal = new Promise(INTERNAL);
        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
        this._promise = internal.lastly(function() {
            return _finallyPromise;
        });
        internal._captureStackTrace();
        internal._setOnCancel(this);
    } else {
        var promise = this._promise = new Promise(INTERNAL);
        promise._captureStackTrace();
    }
    this._stack = stack;
    this._generatorFunction = generatorFunction;
    this._receiver = receiver;
    this._generator = undefined;
    this._yieldHandlers = typeof yieldHandler === "function"
        ? [yieldHandler].concat(yieldHandlers)
        : yieldHandlers;
    this._yieldedPromise = null;
    this._cancellationPhase = false;
}
util.inherits(PromiseSpawn, Proxyable);

PromiseSpawn.prototype._isResolved = function() {
    return this._promise === null;
};

PromiseSpawn.prototype._cleanup = function() {
    this._promise = this._generator = null;
    if (debug.cancellation() && this._finallyPromise !== null) {
        this._finallyPromise._fulfill();
        this._finallyPromise = null;
    }
};

PromiseSpawn.prototype._promiseCancelled = function() {
    if (this._isResolved()) return;
    var implementsReturn = typeof this._generator["return"] !== "undefined";

    var result;
    if (!implementsReturn) {
        var reason = new Promise.CancellationError(
            "generator .return() sentinel");
        Promise.coroutine.returnSentinel = reason;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        result = tryCatch(this._generator["throw"]).call(this._generator,
                                                         reason);
        this._promise._popContext();
    } else {
        this._promise._pushContext();
        result = tryCatch(this._generator["return"]).call(this._generator,
                                                          undefined);
        this._promise._popContext();
    }
    this._cancellationPhase = true;
    this._yieldedPromise = null;
    this._continue(result);
};

PromiseSpawn.prototype._promiseFulfilled = function(value) {
    this._yieldedPromise = null;
    this._promise._pushContext();
    var result = tryCatch(this._generator.next).call(this._generator, value);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._promiseRejected = function(reason) {
    this._yieldedPromise = null;
    this._promise._attachExtraTrace(reason);
    this._promise._pushContext();
    var result = tryCatch(this._generator["throw"])
        .call(this._generator, reason);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._resultCancelled = function() {
    if (this._yieldedPromise instanceof Promise) {
        var promise = this._yieldedPromise;
        this._yieldedPromise = null;
        promise.cancel();
    }
};

PromiseSpawn.prototype.promise = function () {
    return this._promise;
};

PromiseSpawn.prototype._run = function () {
    this._generator = this._generatorFunction.call(this._receiver);
    this._receiver =
        this._generatorFunction = undefined;
    this._promiseFulfilled(undefined);
};

PromiseSpawn.prototype._continue = function (result) {
    var promise = this._promise;
    if (result === errorObj) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._rejectCallback(result.e, false);
        }
    }

    var value = result.value;
    if (result.done === true) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._resolveCallback(value);
        }
    } else {
        var maybePromise = tryConvertToPromise(value, this._promise);
        if (!(maybePromise instanceof Promise)) {
            maybePromise =
                promiseFromYieldHandler(maybePromise,
                                        this._yieldHandlers,
                                        this._promise);
            if (maybePromise === null) {
                this._promiseRejected(
                    new TypeError(
                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) +
                        "From coroutine:\u000a" +
                        this._stack.split("\n").slice(1, -7).join("\n")
                    )
                );
                return;
            }
        }
        maybePromise = maybePromise._target();
        var bitField = maybePromise._bitField;
        ;
        if (((bitField & 50397184) === 0)) {
            this._yieldedPromise = maybePromise;
            maybePromise._proxy(this, null);
        } else if (((bitField & 33554432) !== 0)) {
            Promise._async.invoke(
                this._promiseFulfilled, this, maybePromise._value()
            );
        } else if (((bitField & 16777216) !== 0)) {
            Promise._async.invoke(
                this._promiseRejected, this, maybePromise._reason()
            );
        } else {
            this._promiseCancelled();
        }
    }
};

Promise.coroutine = function (generatorFunction, options) {
    if (typeof generatorFunction !== "function") {
        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var yieldHandler = Object(options).yieldHandler;
    var PromiseSpawn$ = PromiseSpawn;
    var stack = new Error().stack;
    return function () {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                      stack);
        var ret = spawn.promise();
        spawn._generator = generator;
        spawn._promiseFulfilled(undefined);
        return ret;
    };
};

Promise.coroutine.addYieldHandler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    yieldHandlers.push(fn);
};

Promise.spawn = function (generatorFunction) {
    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
    if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var spawn = new PromiseSpawn(generatorFunction, this);
    var ret = spawn.promise();
    spawn._run(Promise.spawn);
    return ret;
};
};

},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
         getDomain) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var reject;

if (!true) {
if (canEvaluate) {
    var thenCallback = function(i) {
        return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
    };

    var promiseSetter = function(i) {
        return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
    };

    var generateHolderClass = function(total) {
        var props = new Array(total);
        for (var i = 0; i < props.length; ++i) {
            props[i] = "this.p" + (i+1);
        }
        var assignment = props.join(" = ") + " = null;";
        var cancellationCode= "var promise;\n" + props.map(function(prop) {
            return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
        }).join("\n");
        var passedArguments = props.join(", ");
        var name = "Holder$" + total;


        var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

        code = code.replace(/\[TheName\]/g, name)
            .replace(/\[TheTotal\]/g, total)
            .replace(/\[ThePassedArguments\]/g, passedArguments)
            .replace(/\[TheProperties\]/g, assignment)
            .replace(/\[CancellationCode\]/g, cancellationCode);

        return new Function("tryCatch", "errorObj", "Promise", "async", code)
                           (tryCatch, errorObj, Promise, async);
    };

    var holderClasses = [];
    var thenCallbacks = [];
    var promiseSetters = [];

    for (var i = 0; i < 8; ++i) {
        holderClasses.push(generateHolderClass(i + 1));
        thenCallbacks.push(thenCallback(i + 1));
        promiseSetters.push(promiseSetter(i + 1));
    }

    reject = function (reason) {
        this._reject(reason);
    };
}}

Promise.join = function () {
    var last = arguments.length - 1;
    var fn;
    if (last > 0 && typeof arguments[last] === "function") {
        fn = arguments[last];
        if (!true) {
            if (last <= 8 && canEvaluate) {
                var ret = new Promise(INTERNAL);
                ret._captureStackTrace();
                var HolderClass = holderClasses[last - 1];
                var holder = new HolderClass(fn);
                var callbacks = thenCallbacks;

                for (var i = 0; i < last; ++i) {
                    var maybePromise = tryConvertToPromise(arguments[i], ret);
                    if (maybePromise instanceof Promise) {
                        maybePromise = maybePromise._target();
                        var bitField = maybePromise._bitField;
                        ;
                        if (((bitField & 50397184) === 0)) {
                            maybePromise._then(callbacks[i], reject,
                                               undefined, ret, holder);
                            promiseSetters[i](maybePromise, holder);
                            holder.asyncNeeded = false;
                        } else if (((bitField & 33554432) !== 0)) {
                            callbacks[i].call(ret,
                                              maybePromise._value(), holder);
                        } else if (((bitField & 16777216) !== 0)) {
                            ret._reject(maybePromise._reason());
                        } else {
                            ret._cancel();
                        }
                    } else {
                        callbacks[i].call(ret, maybePromise, holder);
                    }
                }

                if (!ret._isFateSealed()) {
                    if (holder.asyncNeeded) {
                        var domain = getDomain();
                        if (domain !== null) {
                            holder.fn = util.domainBind(domain, holder.fn);
                        }
                    }
                    ret._setAsyncGuaranteed();
                    ret._setOnCancel(holder);
                }
                return ret;
            }
        }
    }
    var args = [].slice.call(arguments);;
    if (fn) args.pop();
    var ret = new PromiseArray(args).promise();
    return fn !== undefined ? ret.spread(fn) : ret;
};

};

},{"./util":36}],18:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

function MappingPromiseArray(promises, fn, limit, _filter) {
    this.constructor$(promises);
    this._promise._captureStackTrace();
    var domain = getDomain();
    this._callback = domain === null ? fn : util.domainBind(domain, fn);
    this._preservedValues = _filter === INTERNAL
        ? new Array(this.length())
        : null;
    this._limit = limit;
    this._inFlight = 0;
    this._queue = [];
    async.invoke(this._asyncInit, this, undefined);
}
util.inherits(MappingPromiseArray, PromiseArray);

MappingPromiseArray.prototype._asyncInit = function() {
    this._init$(undefined, -2);
};

MappingPromiseArray.prototype._init = function () {};

MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var values = this._values;
    var length = this.length();
    var preservedValues = this._preservedValues;
    var limit = this._limit;

    if (index < 0) {
        index = (index * -1) - 1;
        values[index] = value;
        if (limit >= 1) {
            this._inFlight--;
            this._drainQueue();
            if (this._isResolved()) return true;
        }
    } else {
        if (limit >= 1 && this._inFlight >= limit) {
            values[index] = value;
            this._queue.push(index);
            return false;
        }
        if (preservedValues !== null) preservedValues[index] = value;

        var promise = this._promise;
        var callback = this._callback;
        var receiver = promise._boundValue();
        promise._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index, length);
        var promiseCreated = promise._popContext();
        debug.checkForgottenReturns(
            ret,
            promiseCreated,
            preservedValues !== null ? "Promise.filter" : "Promise.map",
            promise
        );
        if (ret === errorObj) {
            this._reject(ret.e);
            return true;
        }

        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            var bitField = maybePromise._bitField;
            ;
            if (((bitField & 50397184) === 0)) {
                if (limit >= 1) this._inFlight++;
                values[index] = maybePromise;
                maybePromise._proxy(this, (index + 1) * -1);
                return false;
            } else if (((bitField & 33554432) !== 0)) {
                ret = maybePromise._value();
            } else if (((bitField & 16777216) !== 0)) {
                this._reject(maybePromise._reason());
                return true;
            } else {
                this._cancel();
                return true;
            }
        }
        values[index] = ret;
    }
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= length) {
        if (preservedValues !== null) {
            this._filter(values, preservedValues);
        } else {
            this._resolve(values);
        }
        return true;
    }
    return false;
};

MappingPromiseArray.prototype._drainQueue = function () {
    var queue = this._queue;
    var limit = this._limit;
    var values = this._values;
    while (queue.length > 0 && this._inFlight < limit) {
        if (this._isResolved()) return;
        var index = queue.pop();
        this._promiseFulfilled(values[index], index);
    }
};

MappingPromiseArray.prototype._filter = function (booleans, values) {
    var len = values.length;
    var ret = new Array(len);
    var j = 0;
    for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values[i];
    }
    ret.length = j;
    this._resolve(ret);
};

MappingPromiseArray.prototype.preservedValues = function () {
    return this._preservedValues;
};

function map(promises, fn, options, _filter) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }

    var limit = 0;
    if (options !== undefined) {
        if (typeof options === "object" && options !== null) {
            if (typeof options.concurrency !== "number") {
                return Promise.reject(
                    new TypeError("'concurrency' must be a number but it is " +
                                    util.classString(options.concurrency)));
            }
            limit = options.concurrency;
        } else {
            return Promise.reject(new TypeError(
                            "options argument must be an object but it is " +
                             util.classString(options)));
        }
    }
    limit = typeof limit === "number" &&
        isFinite(limit) && limit >= 1 ? limit : 0;
    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
}

Promise.prototype.map = function (fn, options) {
    return map(this, fn, options, null);
};

Promise.map = function (promises, fn, options, _filter) {
    return map(promises, fn, options, _filter);
};


};

},{"./util":36}],19:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

Promise.method = function (fn) {
    if (typeof fn !== "function") {
        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
    }
    return function () {
        var ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments);
        var promiseCreated = ret._popContext();
        debug.checkForgottenReturns(
            value, promiseCreated, "Promise.method", ret);
        ret._resolveFromSyncValue(value);
        return ret;
    };
};

Promise.attempt = Promise["try"] = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._pushContext();
    var value;
    if (arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1];
        var ctx = arguments[2];
        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                  : tryCatch(fn).call(ctx, arg);
    } else {
        value = tryCatch(fn)();
    }
    var promiseCreated = ret._popContext();
    debug.checkForgottenReturns(
        value, promiseCreated, "Promise.try", ret);
    ret._resolveFromSyncValue(value);
    return ret;
};

Promise.prototype._resolveFromSyncValue = function (value) {
    if (value === util.errorObj) {
        this._rejectCallback(value.e, false);
    } else {
        this._resolveCallback(value, true);
    }
};
};

},{"./util":36}],20:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var maybeWrapAsError = util.maybeWrapAsError;
var errors = _dereq_("./errors");
var OperationalError = errors.OperationalError;
var es5 = _dereq_("./es5");

function isUntypedError(obj) {
    return obj instanceof Error &&
        es5.getPrototypeOf(obj) === Error.prototype;
}

var rErrorKey = /^(?:name|message|stack|cause)$/;
function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
        ret = new OperationalError(obj);
        ret.name = obj.name;
        ret.message = obj.message;
        ret.stack = obj.stack;
        var keys = es5.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!rErrorKey.test(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    util.markAsOriginatingFromRejection(obj);
    return obj;
}

function nodebackForPromise(promise, multiArgs) {
    return function(err, value) {
        if (promise === null) return;
        if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        } else if (!multiArgs) {
            promise._fulfill(value);
        } else {
            var args = [].slice.call(arguments, 1);;
            promise._fulfill(args);
        }
        promise = null;
    };
}

module.exports = nodebackForPromise;

},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var util = _dereq_("./util");
var async = Promise._async;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function spreadAdapter(val, nodeback) {
    var promise = this;
    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
    var ret =
        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

function successAdapter(val, nodeback) {
    var promise = this;
    var receiver = promise._boundValue();
    var ret = val === undefined
        ? tryCatch(nodeback).call(receiver, null)
        : tryCatch(nodeback).call(receiver, null, val);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}
function errorAdapter(reason, nodeback) {
    var promise = this;
    if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason;
        reason = newReason;
    }
    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                     options) {
    if (typeof nodeback == "function") {
        var adapter = successAdapter;
        if (options !== undefined && Object(options).spread) {
            adapter = spreadAdapter;
        }
        this._then(
            adapter,
            errorAdapter,
            undefined,
            this,
            nodeback
        );
    }
    return this;
};
};

},{"./util":36}],22:[function(_dereq_,module,exports){
"use strict";
module.exports = function() {
var makeSelfResolutionError = function () {
    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var reflectHandler = function() {
    return new Promise.PromiseInspection(this._target());
};
var apiRejection = function(msg) {
    return Promise.reject(new TypeError(msg));
};
function Proxyable() {}
var UNDEFINED_BINDING = {};
var util = _dereq_("./util");

var getDomain;
if (util.isNode) {
    getDomain = function() {
        var ret = process.domain;
        if (ret === undefined) ret = null;
        return ret;
    };
} else {
    getDomain = function() {
        return null;
    };
}
util.notEnumerableProp(Promise, "_getDomain", getDomain);

var es5 = _dereq_("./es5");
var Async = _dereq_("./async");
var async = new Async();
es5.defineProperty(Promise, "_async", {value: async});
var errors = _dereq_("./errors");
var TypeError = Promise.TypeError = errors.TypeError;
Promise.RangeError = errors.RangeError;
var CancellationError = Promise.CancellationError = errors.CancellationError;
Promise.TimeoutError = errors.TimeoutError;
Promise.OperationalError = errors.OperationalError;
Promise.RejectionError = errors.OperationalError;
Promise.AggregateError = errors.AggregateError;
var INTERNAL = function(){};
var APPLY = {};
var NEXT_FILTER = {};
var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
var PromiseArray =
    _dereq_("./promise_array")(Promise, INTERNAL,
                               tryConvertToPromise, apiRejection, Proxyable);
var Context = _dereq_("./context")(Promise);
 /*jshint unused:false*/
var createContext = Context.create;
var debug = _dereq_("./debuggability")(Promise, Context);
var CapturedTrace = debug.CapturedTrace;
var PassThroughHandlerContext =
    _dereq_("./finally")(Promise, tryConvertToPromise, NEXT_FILTER);
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
var nodebackForPromise = _dereq_("./nodeback");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
function check(self, executor) {
    if (self == null || self.constructor !== Promise) {
        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (typeof executor !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(executor));
    }

}

function Promise(executor) {
    if (executor !== INTERNAL) {
        check(this, executor);
    }
    this._bitField = 0;
    this._fulfillmentHandler0 = undefined;
    this._rejectionHandler0 = undefined;
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._resolveFromExecutor(executor);
    this._promiseCreated();
    this._fireEvent("promiseCreated", this);
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
    var len = arguments.length;
    if (len > 1) {
        var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return apiRejection("Catch statement predicate: " +
                    "expecting an object but got " + util.classString(item));
            }
        }
        catchInstances.length = j;
        fn = arguments[i];
        return this.then(undefined, catchFilter(catchInstances, fn, this));
    }
    return this.then(undefined, fn);
};

Promise.prototype.reflect = function () {
    return this._then(reflectHandler,
        reflectHandler, undefined, this, undefined);
};

Promise.prototype.then = function (didFulfill, didReject) {
    if (debug.warnings() && arguments.length > 0 &&
        typeof didFulfill !== "function" &&
        typeof didReject !== "function") {
        var msg = ".then() only accepts functions but was passed: " +
                util.classString(didFulfill);
        if (arguments.length > 1) {
            msg += ", " + util.classString(didReject);
        }
        this._warn(msg);
    }
    return this._then(didFulfill, didReject, undefined, undefined, undefined);
};

Promise.prototype.done = function (didFulfill, didReject) {
    var promise =
        this._then(didFulfill, didReject, undefined, undefined, undefined);
    promise._setIsFinal();
};

Promise.prototype.spread = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
};

Promise.prototype.toJSON = function () {
    var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: undefined,
        rejectionReason: undefined
    };
    if (this.isFulfilled()) {
        ret.fulfillmentValue = this.value();
        ret.isFulfilled = true;
    } else if (this.isRejected()) {
        ret.rejectionReason = this.reason();
        ret.isRejected = true;
    }
    return ret;
};

Promise.prototype.all = function () {
    if (arguments.length > 0) {
        this._warn(".all() was passed arguments but it does not take any");
    }
    return new PromiseArray(this).promise();
};

Promise.prototype.error = function (fn) {
    return this.caught(util.originatesFromRejection, fn);
};

Promise.getNewLibraryCopy = module.exports;

Promise.is = function (val) {
    return val instanceof Promise;
};

Promise.fromNode = Promise.fromCallback = function(fn) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                                         : false;
    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
    if (result === errorObj) {
        ret._rejectCallback(result.e, true);
    }
    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
    return ret;
};

Promise.all = function (promises) {
    return new PromiseArray(promises).promise();
};

Promise.cast = function (obj) {
    var ret = tryConvertToPromise(obj);
    if (!(ret instanceof Promise)) {
        ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._setFulfilled();
        ret._rejectionHandler0 = obj;
    }
    return ret;
};

Promise.resolve = Promise.fulfilled = Promise.cast;

Promise.reject = Promise.rejected = function (reason) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._rejectCallback(reason, true);
    return ret;
};

Promise.setScheduler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    return async.setScheduler(fn);
};

Promise.prototype._then = function (
    didFulfill,
    didReject,
    _,    receiver,
    internalData
) {
    var haveInternalData = internalData !== undefined;
    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
    var target = this._target();
    var bitField = target._bitField;

    if (!haveInternalData) {
        promise._propagateFrom(this, 3);
        promise._captureStackTrace();
        if (receiver === undefined &&
            ((this._bitField & 2097152) !== 0)) {
            if (!((bitField & 50397184) === 0)) {
                receiver = this._boundValue();
            } else {
                receiver = target === this ? undefined : this._boundTo;
            }
        }
        this._fireEvent("promiseChained", this, promise);
    }

    var domain = getDomain();
    if (!((bitField & 50397184) === 0)) {
        var handler, value, settler = target._settlePromiseCtx;
        if (((bitField & 33554432) !== 0)) {
            value = target._rejectionHandler0;
            handler = didFulfill;
        } else if (((bitField & 16777216) !== 0)) {
            value = target._fulfillmentHandler0;
            handler = didReject;
            target._unsetRejectionIsUnhandled();
        } else {
            settler = target._settlePromiseLateCancellationObserver;
            value = new CancellationError("late cancellation observer");
            target._attachExtraTrace(value);
            handler = didReject;
        }

        async.invoke(settler, target, {
            handler: domain === null ? handler
                : (typeof handler === "function" &&
                    util.domainBind(domain, handler)),
            promise: promise,
            receiver: receiver,
            value: value
        });
    } else {
        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
    }

    return promise;
};

Promise.prototype._length = function () {
    return this._bitField & 65535;
};

Promise.prototype._isFateSealed = function () {
    return (this._bitField & 117506048) !== 0;
};

Promise.prototype._isFollowing = function () {
    return (this._bitField & 67108864) === 67108864;
};

Promise.prototype._setLength = function (len) {
    this._bitField = (this._bitField & -65536) |
        (len & 65535);
};

Promise.prototype._setFulfilled = function () {
    this._bitField = this._bitField | 33554432;
    this._fireEvent("promiseFulfilled", this);
};

Promise.prototype._setRejected = function () {
    this._bitField = this._bitField | 16777216;
    this._fireEvent("promiseRejected", this);
};

Promise.prototype._setFollowing = function () {
    this._bitField = this._bitField | 67108864;
    this._fireEvent("promiseResolved", this);
};

Promise.prototype._setIsFinal = function () {
    this._bitField = this._bitField | 4194304;
};

Promise.prototype._isFinal = function () {
    return (this._bitField & 4194304) > 0;
};

Promise.prototype._unsetCancelled = function() {
    this._bitField = this._bitField & (~65536);
};

Promise.prototype._setCancelled = function() {
    this._bitField = this._bitField | 65536;
    this._fireEvent("promiseCancelled", this);
};

Promise.prototype._setWillBeCancelled = function() {
    this._bitField = this._bitField | 8388608;
};

Promise.prototype._setAsyncGuaranteed = function() {
    if (async.hasCustomScheduler()) return;
    this._bitField = this._bitField | 134217728;
};

Promise.prototype._receiverAt = function (index) {
    var ret = index === 0 ? this._receiver0 : this[
            index * 4 - 4 + 3];
    if (ret === UNDEFINED_BINDING) {
        return undefined;
    } else if (ret === undefined && this._isBound()) {
        return this._boundValue();
    }
    return ret;
};

Promise.prototype._promiseAt = function (index) {
    return this[
            index * 4 - 4 + 2];
};

Promise.prototype._fulfillmentHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 0];
};

Promise.prototype._rejectionHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 1];
};

Promise.prototype._boundValue = function() {};

Promise.prototype._migrateCallback0 = function (follower) {
    var bitField = follower._bitField;
    var fulfill = follower._fulfillmentHandler0;
    var reject = follower._rejectionHandler0;
    var promise = follower._promise0;
    var receiver = follower._receiverAt(0);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._migrateCallbackAt = function (follower, index) {
    var fulfill = follower._fulfillmentHandlerAt(index);
    var reject = follower._rejectionHandlerAt(index);
    var promise = follower._promiseAt(index);
    var receiver = follower._receiverAt(index);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._addCallbacks = function (
    fulfill,
    reject,
    promise,
    receiver,
    domain
) {
    var index = this._length();

    if (index >= 65535 - 4) {
        index = 0;
        this._setLength(0);
    }

    if (index === 0) {
        this._promise0 = promise;
        this._receiver0 = receiver;
        if (typeof fulfill === "function") {
            this._fulfillmentHandler0 =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this._rejectionHandler0 =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    } else {
        var base = index * 4 - 4;
        this[base + 2] = promise;
        this[base + 3] = receiver;
        if (typeof fulfill === "function") {
            this[base + 0] =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this[base + 1] =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    }
    this._setLength(index + 1);
    return index;
};

Promise.prototype._proxy = function (proxyable, arg) {
    this._addCallbacks(undefined, undefined, arg, proxyable, null);
};

Promise.prototype._resolveCallback = function(value, shouldBind) {
    if (((this._bitField & 117506048) !== 0)) return;
    if (value === this)
        return this._rejectCallback(makeSelfResolutionError(), false);
    var maybePromise = tryConvertToPromise(value, this);
    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

    if (shouldBind) this._propagateFrom(maybePromise, 2);

    var promise = maybePromise._target();

    if (promise === this) {
        this._reject(makeSelfResolutionError());
        return;
    }

    var bitField = promise._bitField;
    if (((bitField & 50397184) === 0)) {
        var len = this._length();
        if (len > 0) promise._migrateCallback0(this);
        for (var i = 1; i < len; ++i) {
            promise._migrateCallbackAt(this, i);
        }
        this._setFollowing();
        this._setLength(0);
        this._setFollowee(promise);
    } else if (((bitField & 33554432) !== 0)) {
        this._fulfill(promise._value());
    } else if (((bitField & 16777216) !== 0)) {
        this._reject(promise._reason());
    } else {
        var reason = new CancellationError("late cancellation observer");
        promise._attachExtraTrace(reason);
        this._reject(reason);
    }
};

Promise.prototype._rejectCallback =
function(reason, synchronous, ignoreNonErrorWarnings) {
    var trace = util.ensureErrorObject(reason);
    var hasStack = trace === reason;
    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
        var message = "a promise was rejected with a non-error: " +
            util.classString(reason);
        this._warn(message, true);
    }
    this._attachExtraTrace(trace, synchronous ? hasStack : false);
    this._reject(reason);
};

Promise.prototype._resolveFromExecutor = function (executor) {
    if (executor === INTERNAL) return;
    var promise = this;
    this._captureStackTrace();
    this._pushContext();
    var synchronous = true;
    var r = this._execute(executor, function(value) {
        promise._resolveCallback(value);
    }, function (reason) {
        promise._rejectCallback(reason, synchronous);
    });
    synchronous = false;
    this._popContext();

    if (r !== undefined) {
        promise._rejectCallback(r, true);
    }
};

Promise.prototype._settlePromiseFromHandler = function (
    handler, receiver, value, promise
) {
    var bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;
    promise._pushContext();
    var x;
    if (receiver === APPLY) {
        if (!value || typeof value.length !== "number") {
            x = errorObj;
            x.e = new TypeError("cannot .spread() a non-array: " +
                                    util.classString(value));
        } else {
            x = tryCatch(handler).apply(this._boundValue(), value);
        }
    } else {
        x = tryCatch(handler).call(receiver, value);
    }
    var promiseCreated = promise._popContext();
    bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;

    if (x === NEXT_FILTER) {
        promise._reject(value);
    } else if (x === errorObj) {
        promise._rejectCallback(x.e, false);
    } else {
        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
        promise._resolveCallback(x);
    }
};

Promise.prototype._target = function() {
    var ret = this;
    while (ret._isFollowing()) ret = ret._followee();
    return ret;
};

Promise.prototype._followee = function() {
    return this._rejectionHandler0;
};

Promise.prototype._setFollowee = function(promise) {
    this._rejectionHandler0 = promise;
};

Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
    var isPromise = promise instanceof Promise;
    var bitField = this._bitField;
    var asyncGuaranteed = ((bitField & 134217728) !== 0);
    if (((bitField & 65536) !== 0)) {
        if (isPromise) promise._invokeInternalOnCancel();

        if (receiver instanceof PassThroughHandlerContext &&
            receiver.isFinallyHandler()) {
            receiver.cancelPromise = promise;
            if (tryCatch(handler).call(receiver, value) === errorObj) {
                promise._reject(errorObj.e);
            }
        } else if (handler === reflectHandler) {
            promise._fulfill(reflectHandler.call(receiver));
        } else if (receiver instanceof Proxyable) {
            receiver._promiseCancelled(promise);
        } else if (isPromise || promise instanceof PromiseArray) {
            promise._cancel();
        } else {
            receiver.cancel();
        }
    } else if (typeof handler === "function") {
        if (!isPromise) {
            handler.call(receiver, value, promise);
        } else {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (receiver instanceof Proxyable) {
        if (!receiver._isResolved()) {
            if (((bitField & 33554432) !== 0)) {
                receiver._promiseFulfilled(value, promise);
            } else {
                receiver._promiseRejected(value, promise);
            }
        }
    } else if (isPromise) {
        if (asyncGuaranteed) promise._setAsyncGuaranteed();
        if (((bitField & 33554432) !== 0)) {
            promise._fulfill(value);
        } else {
            promise._reject(value);
        }
    }
};

Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
    var handler = ctx.handler;
    var promise = ctx.promise;
    var receiver = ctx.receiver;
    var value = ctx.value;
    if (typeof handler === "function") {
        if (!(promise instanceof Promise)) {
            handler.call(receiver, value, promise);
        } else {
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (promise instanceof Promise) {
        promise._reject(value);
    }
};

Promise.prototype._settlePromiseCtx = function(ctx) {
    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
};

Promise.prototype._settlePromise0 = function(handler, value, bitField) {
    var promise = this._promise0;
    var receiver = this._receiverAt(0);
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._settlePromise(promise, handler, receiver, value);
};

Promise.prototype._clearCallbackDataAtIndex = function(index) {
    var base = index * 4 - 4;
    this[base + 2] =
    this[base + 3] =
    this[base + 0] =
    this[base + 1] = undefined;
};

Promise.prototype._fulfill = function (value) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._reject(err);
    }
    this._setFulfilled();
    this._rejectionHandler0 = value;

    if ((bitField & 65535) > 0) {
        if (((bitField & 134217728) !== 0)) {
            this._settlePromises();
        } else {
            async.settlePromises(this);
        }
    }
};

Promise.prototype._reject = function (reason) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    this._setRejected();
    this._fulfillmentHandler0 = reason;

    if (this._isFinal()) {
        return async.fatalError(reason, util.isNode);
    }

    if ((bitField & 65535) > 0) {
        async.settlePromises(this);
    } else {
        this._ensurePossibleRejectionHandled();
    }
};

Promise.prototype._fulfillPromises = function (len, value) {
    for (var i = 1; i < len; i++) {
        var handler = this._fulfillmentHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, value);
    }
};

Promise.prototype._rejectPromises = function (len, reason) {
    for (var i = 1; i < len; i++) {
        var handler = this._rejectionHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, reason);
    }
};

Promise.prototype._settlePromises = function () {
    var bitField = this._bitField;
    var len = (bitField & 65535);

    if (len > 0) {
        if (((bitField & 16842752) !== 0)) {
            var reason = this._fulfillmentHandler0;
            this._settlePromise0(this._rejectionHandler0, reason, bitField);
            this._rejectPromises(len, reason);
        } else {
            var value = this._rejectionHandler0;
            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
            this._fulfillPromises(len, value);
        }
        this._setLength(0);
    }
    this._clearCancellationData();
};

Promise.prototype._settledValue = function() {
    var bitField = this._bitField;
    if (((bitField & 33554432) !== 0)) {
        return this._rejectionHandler0;
    } else if (((bitField & 16777216) !== 0)) {
        return this._fulfillmentHandler0;
    }
};

function deferResolve(v) {this.promise._resolveCallback(v);}
function deferReject(v) {this.promise._rejectCallback(v, false);}

Promise.defer = Promise.pending = function() {
    debug.deprecated("Promise.defer", "new Promise");
    var promise = new Promise(INTERNAL);
    return {
        promise: promise,
        resolve: deferResolve,
        reject: deferReject
    };
};

util.notEnumerableProp(Promise,
                       "_makeSelfResolutionError",
                       makeSelfResolutionError);

_dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
    debug);
_dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
_dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
_dereq_("./direct_resolve")(Promise);
_dereq_("./synchronous_inspection")(Promise);
_dereq_("./join")(
    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
Promise.Promise = Promise;
Promise.version = "3.5.0";
_dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./call_get.js')(Promise);
_dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
_dereq_('./timers.js')(Promise, INTERNAL, debug);
_dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
_dereq_('./nodeify.js')(Promise);
_dereq_('./promisify.js')(Promise, INTERNAL);
_dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
_dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
_dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./settle.js')(Promise, PromiseArray, debug);
_dereq_('./some.js')(Promise, PromiseArray, apiRejection);
_dereq_('./filter.js')(Promise, INTERNAL);
_dereq_('./each.js')(Promise, INTERNAL);
_dereq_('./any.js')(Promise);
                                                         
    util.toFastProperties(Promise);                                          
    util.toFastProperties(Promise.prototype);                                
    function fillTypes(value) {                                              
        var p = new Promise(INTERNAL);                                       
        p._fulfillmentHandler0 = value;                                      
        p._rejectionHandler0 = value;                                        
        p._promise0 = value;                                                 
        p._receiver0 = value;                                                
    }                                                                        
    // Complete slack tracking, opt out of field-type tracking and           
    // stabilize map                                                         
    fillTypes({a: 1});                                                       
    fillTypes({b: 2});                                                       
    fillTypes({c: 3});                                                       
    fillTypes(1);                                                            
    fillTypes(function(){});                                                 
    fillTypes(undefined);                                                    
    fillTypes(false);                                                        
    fillTypes(new Promise(INTERNAL));                                        
    debug.setBounds(Async.firstLineError, util.lastLineError);               
    return Promise;                                                          

};

},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise,
    apiRejection, Proxyable) {
var util = _dereq_("./util");
var isArray = util.isArray;

function toResolutionValue(val) {
    switch(val) {
    case -2: return [];
    case -3: return {};
    case -6: return new Map();
    }
}

function PromiseArray(values) {
    var promise = this._promise = new Promise(INTERNAL);
    if (values instanceof Promise) {
        promise._propagateFrom(values, 3);
    }
    promise._setOnCancel(this);
    this._values = values;
    this._length = 0;
    this._totalResolved = 0;
    this._init(undefined, -2);
}
util.inherits(PromiseArray, Proxyable);

PromiseArray.prototype.length = function () {
    return this._length;
};

PromiseArray.prototype.promise = function () {
    return this._promise;
};

PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
    var values = tryConvertToPromise(this._values, this._promise);
    if (values instanceof Promise) {
        values = values._target();
        var bitField = values._bitField;
        ;
        this._values = values;

        if (((bitField & 50397184) === 0)) {
            this._promise._setAsyncGuaranteed();
            return values._then(
                init,
                this._reject,
                undefined,
                this,
                resolveValueIfEmpty
           );
        } else if (((bitField & 33554432) !== 0)) {
            values = values._value();
        } else if (((bitField & 16777216) !== 0)) {
            return this._reject(values._reason());
        } else {
            return this._cancel();
        }
    }
    values = util.asArray(values);
    if (values === null) {
        var err = apiRejection(
            "expecting an array or an iterable object but got " + util.classString(values)).reason();
        this._promise._rejectCallback(err, false);
        return;
    }

    if (values.length === 0) {
        if (resolveValueIfEmpty === -5) {
            this._resolveEmptyArray();
        }
        else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
    }
    this._iterate(values);
};

PromiseArray.prototype._iterate = function(values) {
    var len = this.getActualLength(values.length);
    this._length = len;
    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
    var result = this._promise;
    var isResolved = false;
    var bitField = null;
    for (var i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values[i], result);

        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            bitField = maybePromise._bitField;
        } else {
            bitField = null;
        }

        if (isResolved) {
            if (bitField !== null) {
                maybePromise.suppressUnhandledRejections();
            }
        } else if (bitField !== null) {
            if (((bitField & 50397184) === 0)) {
                maybePromise._proxy(this, i);
                this._values[i] = maybePromise;
            } else if (((bitField & 33554432) !== 0)) {
                isResolved = this._promiseFulfilled(maybePromise._value(), i);
            } else if (((bitField & 16777216) !== 0)) {
                isResolved = this._promiseRejected(maybePromise._reason(), i);
            } else {
                isResolved = this._promiseCancelled(i);
            }
        } else {
            isResolved = this._promiseFulfilled(maybePromise, i);
        }
    }
    if (!isResolved) result._setAsyncGuaranteed();
};

PromiseArray.prototype._isResolved = function () {
    return this._values === null;
};

PromiseArray.prototype._resolve = function (value) {
    this._values = null;
    this._promise._fulfill(value);
};

PromiseArray.prototype._cancel = function() {
    if (this._isResolved() || !this._promise._isCancellable()) return;
    this._values = null;
    this._promise._cancel();
};

PromiseArray.prototype._reject = function (reason) {
    this._values = null;
    this._promise._rejectCallback(reason, false);
};

PromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

PromiseArray.prototype._promiseCancelled = function() {
    this._cancel();
    return true;
};

PromiseArray.prototype._promiseRejected = function (reason) {
    this._totalResolved++;
    this._reject(reason);
    return true;
};

PromiseArray.prototype._resultCancelled = function() {
    if (this._isResolved()) return;
    var values = this._values;
    this._cancel();
    if (values instanceof Promise) {
        values.cancel();
    } else {
        for (var i = 0; i < values.length; ++i) {
            if (values[i] instanceof Promise) {
                values[i].cancel();
            }
        }
    }
};

PromiseArray.prototype.shouldCopyValues = function () {
    return true;
};

PromiseArray.prototype.getActualLength = function (len) {
    return len;
};

return PromiseArray;
};

},{"./util":36}],24:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var THIS = {};
var util = _dereq_("./util");
var nodebackForPromise = _dereq_("./nodeback");
var withAppended = util.withAppended;
var maybeWrapAsError = util.maybeWrapAsError;
var canEvaluate = util.canEvaluate;
var TypeError = _dereq_("./errors").TypeError;
var defaultSuffix = "Async";
var defaultPromisified = {__isPromisified__: true};
var noCopyProps = [
    "arity",    "length",
    "name",
    "arguments",
    "caller",
    "callee",
    "prototype",
    "__isPromisified__"
];
var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

var defaultFilter = function(name) {
    return util.isIdentifier(name) &&
        name.charAt(0) !== "_" &&
        name !== "constructor";
};

function propsFilter(key) {
    return !noCopyPropsPattern.test(key);
}

function isPromisified(fn) {
    try {
        return fn.__isPromisified__ === true;
    }
    catch (e) {
        return false;
    }
}

function hasPromisified(obj, key, suffix) {
    var val = util.getDataPropertyOrDefault(obj, key + suffix,
                                            defaultPromisified);
    return val ? isPromisified(val) : false;
}
function checkValid(ret, suffix, suffixRegexp) {
    for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
            for (var j = 0; j < ret.length; j += 2) {
                if (ret[j] === keyWithoutAsyncSuffix) {
                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                        .replace("%s", suffix));
                }
            }
        }
    }
}

function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
    var keys = util.inheritedDataKeys(obj);
    var ret = [];
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        var passesDefaultFilter = filter === defaultFilter
            ? true : defaultFilter(key, value, obj);
        if (typeof value === "function" &&
            !isPromisified(value) &&
            !hasPromisified(obj, key, suffix) &&
            filter(key, value, obj, passesDefaultFilter)) {
            ret.push(key, value);
        }
    }
    checkValid(ret, suffix, suffixRegexp);
    return ret;
}

var escapeIdentRegex = function(str) {
    return str.replace(/([$])/, "\\$");
};

var makeNodePromisifiedEval;
if (!true) {
var switchCaseArgumentOrder = function(likelyArgumentCount) {
    var ret = [likelyArgumentCount];
    var min = Math.max(0, likelyArgumentCount - 1 - 3);
    for(var i = likelyArgumentCount - 1; i >= min; --i) {
        ret.push(i);
    }
    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
        ret.push(i);
    }
    return ret;
};

var argumentSequence = function(argumentCount) {
    return util.filledRange(argumentCount, "_arg", "");
};

var parameterDeclaration = function(parameterCount) {
    return util.filledRange(
        Math.max(parameterCount, 3), "_arg", "");
};

var parameterCount = function(fn) {
    if (typeof fn.length === "number") {
        return Math.max(Math.min(fn.length, 1023 + 1), 0);
    }
    return 0;
};

makeNodePromisifiedEval =
function(callback, receiver, originalName, fn, _, multiArgs) {
    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
    var shouldProxyThis = typeof callback === "string" || receiver === THIS;

    function generateCallForArgumentCount(count) {
        var args = argumentSequence(count).join(", ");
        var comma = count > 0 ? ", " : "";
        var ret;
        if (shouldProxyThis) {
            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
        } else {
            ret = receiver === undefined
                ? "ret = callback({{args}}, nodeback); break;\n"
                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
        }
        return ret.replace("{{args}}", args).replace(", ", comma);
    }

    function generateArgumentSwitchCase() {
        var ret = "";
        for (var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] +":" +
                generateCallForArgumentCount(argumentOrder[i]);
        }

        ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis
                                ? "ret = callback.apply(this, args);\n"
                                : "ret = callback.apply(receiver, args);\n"));
        return ret;
    }

    var getFunctionCode = typeof callback === "string"
                                ? ("this != null ? this['"+callback+"'] : fn")
                                : "fn";
    var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
        .replace("[GetFunctionCode]", getFunctionCode);
    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
    return new Function("Promise",
                        "fn",
                        "receiver",
                        "withAppended",
                        "maybeWrapAsError",
                        "nodebackForPromise",
                        "tryCatch",
                        "errorObj",
                        "notEnumerableProp",
                        "INTERNAL",
                        body)(
                    Promise,
                    fn,
                    receiver,
                    withAppended,
                    maybeWrapAsError,
                    nodebackForPromise,
                    util.tryCatch,
                    util.errorObj,
                    util.notEnumerableProp,
                    INTERNAL);
};
}

function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
    var defaultThis = (function() {return this;})();
    var method = callback;
    if (typeof method === "string") {
        callback = fn;
    }
    function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        var promise = new Promise(INTERNAL);
        promise._captureStackTrace();
        var cb = typeof method === "string" && this !== defaultThis
            ? this[method] : callback;
        var fn = nodebackForPromise(promise, multiArgs);
        try {
            cb.apply(_receiver, withAppended(arguments, fn));
        } catch(e) {
            promise._rejectCallback(maybeWrapAsError(e), true, true);
        }
        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
        return promise;
    }
    util.notEnumerableProp(promisified, "__isPromisified__", true);
    return promisified;
}

var makeNodePromisified = canEvaluate
    ? makeNodePromisifiedEval
    : makeNodePromisifiedClosure;

function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
    var methods =
        promisifiableMethods(obj, suffix, suffixRegexp, filter);

    for (var i = 0, len = methods.length; i < len; i+= 2) {
        var key = methods[i];
        var fn = methods[i+1];
        var promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) {
            obj[promisifiedKey] =
                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
        } else {
            var promisified = promisifier(fn, function() {
                return makeNodePromisified(key, THIS, key,
                                           fn, suffix, multiArgs);
            });
            util.notEnumerableProp(promisified, "__isPromisified__", true);
            obj[promisifiedKey] = promisified;
        }
    }
    util.toFastProperties(obj);
    return obj;
}

function promisify(callback, receiver, multiArgs) {
    return makeNodePromisified(callback, receiver, undefined,
                                callback, null, multiArgs);
}

Promise.promisify = function (fn, options) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    if (isPromisified(fn)) {
        return fn;
    }
    options = Object(options);
    var receiver = options.context === undefined ? THIS : options.context;
    var multiArgs = !!options.multiArgs;
    var ret = promisify(fn, receiver, multiArgs);
    util.copyDescriptors(fn, ret, propsFilter);
    return ret;
};

Promise.promisifyAll = function (target, options) {
    if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    options = Object(options);
    var multiArgs = !!options.multiArgs;
    var suffix = options.suffix;
    if (typeof suffix !== "string") suffix = defaultSuffix;
    var filter = options.filter;
    if (typeof filter !== "function") filter = defaultFilter;
    var promisifier = options.promisifier;
    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

    if (!util.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }

    var keys = util.inheritedDataKeys(target);
    for (var i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        if (keys[i] !== "constructor" &&
            util.isClass(value)) {
            promisifyAll(value.prototype, suffix, filter, promisifier,
                multiArgs);
            promisifyAll(value, suffix, filter, promisifier, multiArgs);
        }
    }

    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
};
};


},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");
var isObject = util.isObject;
var es5 = _dereq_("./es5");
var Es6Map;
if (typeof Map === "function") Es6Map = Map;

var mapToEntries = (function() {
    var index = 0;
    var size = 0;

    function extractEntry(value, key) {
        this[index] = value;
        this[index + size] = key;
        index++;
    }

    return function mapToEntries(map) {
        size = map.size;
        index = 0;
        var ret = new Array(map.size * 2);
        map.forEach(extractEntry, ret);
        return ret;
    };
})();

var entriesToMap = function(entries) {
    var ret = new Es6Map();
    var length = entries.length / 2 | 0;
    for (var i = 0; i < length; ++i) {
        var key = entries[length + i];
        var value = entries[i];
        ret.set(key, value);
    }
    return ret;
};

function PropertiesPromiseArray(obj) {
    var isMap = false;
    var entries;
    if (Es6Map !== undefined && obj instanceof Es6Map) {
        entries = mapToEntries(obj);
        isMap = true;
    } else {
        var keys = es5.keys(obj);
        var len = keys.length;
        entries = new Array(len * 2);
        for (var i = 0; i < len; ++i) {
            var key = keys[i];
            entries[i] = obj[key];
            entries[i + len] = key;
        }
    }
    this.constructor$(entries);
    this._isMap = isMap;
    this._init$(undefined, isMap ? -6 : -3);
}
util.inherits(PropertiesPromiseArray, PromiseArray);

PropertiesPromiseArray.prototype._init = function () {};

PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        var val;
        if (this._isMap) {
            val = entriesToMap(this._values);
        } else {
            val = {};
            var keyOffset = this.length();
            for (var i = 0, len = this.length(); i < len; ++i) {
                val[this._values[i + keyOffset]] = this._values[i];
            }
        }
        this._resolve(val);
        return true;
    }
    return false;
};

PropertiesPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

PropertiesPromiseArray.prototype.getActualLength = function (len) {
    return len >> 1;
};

function props(promises) {
    var ret;
    var castValue = tryConvertToPromise(promises);

    if (!isObject(castValue)) {
        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    } else if (castValue instanceof Promise) {
        ret = castValue._then(
            Promise.props, undefined, undefined, undefined, undefined);
    } else {
        ret = new PropertiesPromiseArray(castValue).promise();
    }

    if (castValue instanceof Promise) {
        ret._propagateFrom(castValue, 2);
    }
    return ret;
}

Promise.prototype.props = function () {
    return props(this);
};

Promise.props = function (promises) {
    return props(promises);
};
};

},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
"use strict";
function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = void 0;
    }
}

function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
}

Queue.prototype._willBeOverCapacity = function (size) {
    return this._capacity < size;
};

Queue.prototype._pushOne = function (arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = arg;
    this._length = length + 1;
};

Queue.prototype.push = function (fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver);
        this._pushOne(arg);
        return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[(j + 0) & wrapMask] = fn;
    this[(j + 1) & wrapMask] = receiver;
    this[(j + 2) & wrapMask] = arg;
    this._length = length;
};

Queue.prototype.shift = function () {
    var front = this._front,
        ret = this[front];

    this[front] = undefined;
    this._front = (front + 1) & (this._capacity - 1);
    this._length--;
    return ret;
};

Queue.prototype.length = function () {
    return this._length;
};

Queue.prototype._checkCapacity = function (size) {
    if (this._capacity < size) {
        this._resizeTo(this._capacity << 1);
    }
};

Queue.prototype._resizeTo = function (capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    var moveItemsCount = (front + length) & (oldCapacity - 1);
    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
};

module.exports = Queue;

},{}],27:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");

var raceLater = function (promise) {
    return promise.then(function(array) {
        return race(array, promise);
    });
};

function race(promises, parent) {
    var maybePromise = tryConvertToPromise(promises);

    if (maybePromise instanceof Promise) {
        return raceLater(maybePromise);
    } else {
        promises = util.asArray(promises);
        if (promises === null)
            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
    }

    var ret = new Promise(INTERNAL);
    if (parent !== undefined) {
        ret._propagateFrom(parent, 3);
    }
    var fulfill = ret._fulfill;
    var reject = ret._reject;
    for (var i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];

        if (val === undefined && !(i in promises)) {
            continue;
        }

        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
    }
    return ret;
}

Promise.race = function (promises) {
    return race(promises, undefined);
};

Promise.prototype.race = function () {
    return race(this, undefined);
};

};

},{"./util":36}],28:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

function ReductionPromiseArray(promises, fn, initialValue, _each) {
    this.constructor$(promises);
    var domain = getDomain();
    this._fn = domain === null ? fn : util.domainBind(domain, fn);
    if (initialValue !== undefined) {
        initialValue = Promise.resolve(initialValue);
        initialValue._attachCancellationCallback(this);
    }
    this._initialValue = initialValue;
    this._currentCancellable = null;
    if(_each === INTERNAL) {
        this._eachValues = Array(this._length);
    } else if (_each === 0) {
        this._eachValues = null;
    } else {
        this._eachValues = undefined;
    }
    this._promise._captureStackTrace();
    this._init$(undefined, -5);
}
util.inherits(ReductionPromiseArray, PromiseArray);

ReductionPromiseArray.prototype._gotAccum = function(accum) {
    if (this._eachValues !== undefined && 
        this._eachValues !== null && 
        accum !== INTERNAL) {
        this._eachValues.push(accum);
    }
};

ReductionPromiseArray.prototype._eachComplete = function(value) {
    if (this._eachValues !== null) {
        this._eachValues.push(value);
    }
    return this._eachValues;
};

ReductionPromiseArray.prototype._init = function() {};

ReductionPromiseArray.prototype._resolveEmptyArray = function() {
    this._resolve(this._eachValues !== undefined ? this._eachValues
                                                 : this._initialValue);
};

ReductionPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

ReductionPromiseArray.prototype._resolve = function(value) {
    this._promise._resolveCallback(value);
    this._values = null;
};

ReductionPromiseArray.prototype._resultCancelled = function(sender) {
    if (sender === this._initialValue) return this._cancel();
    if (this._isResolved()) return;
    this._resultCancelled$();
    if (this._currentCancellable instanceof Promise) {
        this._currentCancellable.cancel();
    }
    if (this._initialValue instanceof Promise) {
        this._initialValue.cancel();
    }
};

ReductionPromiseArray.prototype._iterate = function (values) {
    this._values = values;
    var value;
    var i;
    var length = values.length;
    if (this._initialValue !== undefined) {
        value = this._initialValue;
        i = 0;
    } else {
        value = Promise.resolve(values[0]);
        i = 1;
    }

    this._currentCancellable = value;

    if (!value.isRejected()) {
        for (; i < length; ++i) {
            var ctx = {
                accum: null,
                value: values[i],
                index: i,
                length: length,
                array: this
            };
            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
        }
    }

    if (this._eachValues !== undefined) {
        value = value
            ._then(this._eachComplete, undefined, undefined, this, undefined);
    }
    value._then(completed, completed, undefined, value, this);
};

Promise.prototype.reduce = function (fn, initialValue) {
    return reduce(this, fn, initialValue, null);
};

Promise.reduce = function (promises, fn, initialValue, _each) {
    return reduce(promises, fn, initialValue, _each);
};

function completed(valueOrReason, array) {
    if (this.isFulfilled()) {
        array._resolve(valueOrReason);
    } else {
        array._reject(valueOrReason);
    }
}

function reduce(promises, fn, initialValue, _each) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
    return array.promise();
}

function gotAccum(accum) {
    this.accum = accum;
    this.array._gotAccum(accum);
    var value = tryConvertToPromise(this.value, this.array._promise);
    if (value instanceof Promise) {
        this.array._currentCancellable = value;
        return value._then(gotValue, undefined, undefined, this, undefined);
    } else {
        return gotValue.call(this, value);
    }
}

function gotValue(value) {
    var array = this.array;
    var promise = array._promise;
    var fn = tryCatch(array._fn);
    promise._pushContext();
    var ret;
    if (array._eachValues !== undefined) {
        ret = fn.call(promise._boundValue(), value, this.index, this.length);
    } else {
        ret = fn.call(promise._boundValue(),
                              this.accum, value, this.index, this.length);
    }
    if (ret instanceof Promise) {
        array._currentCancellable = ret;
    }
    var promiseCreated = promise._popContext();
    debug.checkForgottenReturns(
        ret,
        promiseCreated,
        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
        promise
    );
    return ret;
}
};

},{"./util":36}],29:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var schedule;
var noAsyncScheduler = function() {
    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var NativePromise = util.getNativePromise();
if (util.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = global.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util.isRecentNode
                ? function(fn) { GlobalSetImmediate.call(global, fn); }
                : function(fn) { ProcessNextTick.call(process, fn); };
} else if (typeof NativePromise === "function" &&
           typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
        nativePromise.then(fn);
    };
} else if ((typeof MutationObserver !== "undefined") &&
          !(typeof window !== "undefined" &&
            window.navigator &&
            (window.navigator.standalone || window.cordova))) {
    schedule = (function() {
        var div = document.createElement("div");
        var opts = {attributes: true};
        var toggleScheduled = false;
        var div2 = document.createElement("div");
        var o2 = new MutationObserver(function() {
            div.classList.toggle("foo");
            toggleScheduled = false;
        });
        o2.observe(div2, opts);

        var scheduleToggle = function() {
            if (toggleScheduled) return;
            toggleScheduled = true;
            div2.classList.toggle("foo");
        };

        return function schedule(fn) {
            var o = new MutationObserver(function() {
                o.disconnect();
                fn();
            });
            o.observe(div, opts);
            scheduleToggle();
        };
    })();
} else if (typeof setImmediate !== "undefined") {
    schedule = function (fn) {
        setImmediate(fn);
    };
} else if (typeof setTimeout !== "undefined") {
    schedule = function (fn) {
        setTimeout(fn, 0);
    };
} else {
    schedule = noAsyncScheduler;
}
module.exports = schedule;

},{"./util":36}],30:[function(_dereq_,module,exports){
"use strict";
module.exports =
    function(Promise, PromiseArray, debug) {
var PromiseInspection = Promise.PromiseInspection;
var util = _dereq_("./util");

function SettledPromiseArray(values) {
    this.constructor$(values);
}
util.inherits(SettledPromiseArray, PromiseArray);

SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
    this._values[index] = inspection;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var ret = new PromiseInspection();
    ret._bitField = 33554432;
    ret._settledValueField = value;
    return this._promiseResolved(index, ret);
};
SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
    var ret = new PromiseInspection();
    ret._bitField = 16777216;
    ret._settledValueField = reason;
    return this._promiseResolved(index, ret);
};

Promise.settle = function (promises) {
    debug.deprecated(".settle()", ".reflect()");
    return new SettledPromiseArray(promises).promise();
};

Promise.prototype.settle = function () {
    return Promise.settle(this);
};
};

},{"./util":36}],31:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, apiRejection) {
var util = _dereq_("./util");
var RangeError = _dereq_("./errors").RangeError;
var AggregateError = _dereq_("./errors").AggregateError;
var isArray = util.isArray;
var CANCELLATION = {};


function SomePromiseArray(values) {
    this.constructor$(values);
    this._howMany = 0;
    this._unwrap = false;
    this._initialized = false;
}
util.inherits(SomePromiseArray, PromiseArray);

SomePromiseArray.prototype._init = function () {
    if (!this._initialized) {
        return;
    }
    if (this._howMany === 0) {
        this._resolve([]);
        return;
    }
    this._init$(undefined, -5);
    var isArrayResolved = isArray(this._values);
    if (!this._isResolved() &&
        isArrayResolved &&
        this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
    }
};

SomePromiseArray.prototype.init = function () {
    this._initialized = true;
    this._init();
};

SomePromiseArray.prototype.setUnwrap = function () {
    this._unwrap = true;
};

SomePromiseArray.prototype.howMany = function () {
    return this._howMany;
};

SomePromiseArray.prototype.setHowMany = function (count) {
    this._howMany = count;
};

SomePromiseArray.prototype._promiseFulfilled = function (value) {
    this._addFulfilled(value);
    if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
        } else {
            this._resolve(this._values);
        }
        return true;
    }
    return false;

};
SomePromiseArray.prototype._promiseRejected = function (reason) {
    this._addRejected(reason);
    return this._checkOutcome();
};

SomePromiseArray.prototype._promiseCancelled = function () {
    if (this._values instanceof Promise || this._values == null) {
        return this._cancel();
    }
    this._addRejected(CANCELLATION);
    return this._checkOutcome();
};

SomePromiseArray.prototype._checkOutcome = function() {
    if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
            if (this._values[i] !== CANCELLATION) {
                e.push(this._values[i]);
            }
        }
        if (e.length > 0) {
            this._reject(e);
        } else {
            this._cancel();
        }
        return true;
    }
    return false;
};

SomePromiseArray.prototype._fulfilled = function () {
    return this._totalResolved;
};

SomePromiseArray.prototype._rejected = function () {
    return this._values.length - this.length();
};

SomePromiseArray.prototype._addRejected = function (reason) {
    this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled = function (value) {
    this._values[this._totalResolved++] = value;
};

SomePromiseArray.prototype._canPossiblyFulfill = function () {
    return this.length() - this._rejected();
};

SomePromiseArray.prototype._getRangeError = function (count) {
    var message = "Input array must contain at least " +
            this._howMany + " items but contains only " + count + " items";
    return new RangeError(message);
};

SomePromiseArray.prototype._resolveEmptyArray = function () {
    this._reject(this._getRangeError(0));
};

function some(promises, howMany) {
    if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(howMany);
    ret.init();
    return promise;
}

Promise.some = function (promises, howMany) {
    return some(promises, howMany);
};

Promise.prototype.some = function (howMany) {
    return some(this, howMany);
};

Promise._SomePromiseArray = SomePromiseArray;
};

},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function PromiseInspection(promise) {
    if (promise !== undefined) {
        promise = promise._target();
        this._bitField = promise._bitField;
        this._settledValueField = promise._isFateSealed()
            ? promise._settledValue() : undefined;
    }
    else {
        this._bitField = 0;
        this._settledValueField = undefined;
    }
}

PromiseInspection.prototype._settledValue = function() {
    return this._settledValueField;
};

var value = PromiseInspection.prototype.value = function () {
    if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var reason = PromiseInspection.prototype.error =
PromiseInspection.prototype.reason = function () {
    if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
    return (this._bitField & 33554432) !== 0;
};

var isRejected = PromiseInspection.prototype.isRejected = function () {
    return (this._bitField & 16777216) !== 0;
};

var isPending = PromiseInspection.prototype.isPending = function () {
    return (this._bitField & 50397184) === 0;
};

var isResolved = PromiseInspection.prototype.isResolved = function () {
    return (this._bitField & 50331648) !== 0;
};

PromiseInspection.prototype.isCancelled = function() {
    return (this._bitField & 8454144) !== 0;
};

Promise.prototype.__isCancelled = function() {
    return (this._bitField & 65536) === 65536;
};

Promise.prototype._isCancelled = function() {
    return this._target().__isCancelled();
};

Promise.prototype.isCancelled = function() {
    return (this._target()._bitField & 8454144) !== 0;
};

Promise.prototype.isPending = function() {
    return isPending.call(this._target());
};

Promise.prototype.isRejected = function() {
    return isRejected.call(this._target());
};

Promise.prototype.isFulfilled = function() {
    return isFulfilled.call(this._target());
};

Promise.prototype.isResolved = function() {
    return isResolved.call(this._target());
};

Promise.prototype.value = function() {
    return value.call(this._target());
};

Promise.prototype.reason = function() {
    var target = this._target();
    target._unsetRejectionIsUnhandled();
    return reason.call(target);
};

Promise.prototype._value = function() {
    return this._settledValue();
};

Promise.prototype._reason = function() {
    this._unsetRejectionIsUnhandled();
    return this._settledValue();
};

Promise.PromiseInspection = PromiseInspection;
};

},{}],33:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var util = _dereq_("./util");
var errorObj = util.errorObj;
var isObject = util.isObject;

function tryConvertToPromise(obj, context) {
    if (isObject(obj)) {
        if (obj instanceof Promise) return obj;
        var then = getThen(obj);
        if (then === errorObj) {
            if (context) context._pushContext();
            var ret = Promise.reject(then.e);
            if (context) context._popContext();
            return ret;
        } else if (typeof then === "function") {
            if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);
                obj._then(
                    ret._fulfill,
                    ret._reject,
                    undefined,
                    ret,
                    null
                );
                return ret;
            }
            return doThenable(obj, then, context);
        }
    }
    return obj;
}

function doGetThen(obj) {
    return obj.then;
}

function getThen(obj) {
    try {
        return doGetThen(obj);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

var hasProp = {}.hasOwnProperty;
function isAnyBluebirdPromise(obj) {
    try {
        return hasProp.call(obj, "_promise0");
    } catch (e) {
        return false;
    }
}

function doThenable(x, then, context) {
    var promise = new Promise(INTERNAL);
    var ret = promise;
    if (context) context._pushContext();
    promise._captureStackTrace();
    if (context) context._popContext();
    var synchronous = true;
    var result = util.tryCatch(then).call(x, resolve, reject);
    synchronous = false;

    if (promise && result === errorObj) {
        promise._rejectCallback(result.e, true, true);
        promise = null;
    }

    function resolve(value) {
        if (!promise) return;
        promise._resolveCallback(value);
        promise = null;
    }

    function reject(reason) {
        if (!promise) return;
        promise._rejectCallback(reason, synchronous, true);
        promise = null;
    }
    return ret;
}

return tryConvertToPromise;
};

},{"./util":36}],34:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, debug) {
var util = _dereq_("./util");
var TimeoutError = Promise.TimeoutError;

function HandleWrapper(handle)  {
    this.handle = handle;
}

HandleWrapper.prototype._resultCancelled = function() {
    clearTimeout(this.handle);
};

var afterValue = function(value) { return delay(+this).thenReturn(value); };
var delay = Promise.delay = function (ms, value) {
    var ret;
    var handle;
    if (value !== undefined) {
        ret = Promise.resolve(value)
                ._then(afterValue, null, null, ms, undefined);
        if (debug.cancellation() && value instanceof Promise) {
            ret._setOnCancel(value);
        }
    } else {
        ret = new Promise(INTERNAL);
        handle = setTimeout(function() { ret._fulfill(); }, +ms);
        if (debug.cancellation()) {
            ret._setOnCancel(new HandleWrapper(handle));
        }
        ret._captureStackTrace();
    }
    ret._setAsyncGuaranteed();
    return ret;
};

Promise.prototype.delay = function (ms) {
    return delay(ms, this);
};

var afterTimeout = function (promise, message, parent) {
    var err;
    if (typeof message !== "string") {
        if (message instanceof Error) {
            err = message;
        } else {
            err = new TimeoutError("operation timed out");
        }
    } else {
        err = new TimeoutError(message);
    }
    util.markAsOriginatingFromRejection(err);
    promise._attachExtraTrace(err);
    promise._reject(err);

    if (parent != null) {
        parent.cancel();
    }
};

function successClear(value) {
    clearTimeout(this.handle);
    return value;
}

function failureClear(reason) {
    clearTimeout(this.handle);
    throw reason;
}

Promise.prototype.timeout = function (ms, message) {
    ms = +ms;
    var ret, parent;

    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
        if (ret.isPending()) {
            afterTimeout(ret, message, parent);
        }
    }, ms));

    if (debug.cancellation()) {
        parent = this.then();
        ret = parent._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
        ret._setOnCancel(handleWrapper);
    } else {
        ret = this._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
    }

    return ret;
};

};

},{"./util":36}],35:[function(_dereq_,module,exports){
"use strict";
module.exports = function (Promise, apiRejection, tryConvertToPromise,
    createContext, INTERNAL, debug) {
    var util = _dereq_("./util");
    var TypeError = _dereq_("./errors").TypeError;
    var inherits = _dereq_("./util").inherits;
    var errorObj = util.errorObj;
    var tryCatch = util.tryCatch;
    var NULL = {};

    function thrower(e) {
        setTimeout(function(){throw e;}, 0);
    }

    function castPreservingDisposable(thenable) {
        var maybePromise = tryConvertToPromise(thenable);
        if (maybePromise !== thenable &&
            typeof thenable._isDisposable === "function" &&
            typeof thenable._getDisposer === "function" &&
            thenable._isDisposable()) {
            maybePromise._setDisposable(thenable._getDisposer());
        }
        return maybePromise;
    }
    function dispose(resources, inspection) {
        var i = 0;
        var len = resources.length;
        var ret = new Promise(INTERNAL);
        function iterator() {
            if (i >= len) return ret._fulfill();
            var maybePromise = castPreservingDisposable(resources[i++]);
            if (maybePromise instanceof Promise &&
                maybePromise._isDisposable()) {
                try {
                    maybePromise = tryConvertToPromise(
                        maybePromise._getDisposer().tryDispose(inspection),
                        resources.promise);
                } catch (e) {
                    return thrower(e);
                }
                if (maybePromise instanceof Promise) {
                    return maybePromise._then(iterator, thrower,
                                              null, null, null);
                }
            }
            iterator();
        }
        iterator();
        return ret;
    }

    function Disposer(data, promise, context) {
        this._data = data;
        this._promise = promise;
        this._context = context;
    }

    Disposer.prototype.data = function () {
        return this._data;
    };

    Disposer.prototype.promise = function () {
        return this._promise;
    };

    Disposer.prototype.resource = function () {
        if (this.promise().isFulfilled()) {
            return this.promise().value();
        }
        return NULL;
    };

    Disposer.prototype.tryDispose = function(inspection) {
        var resource = this.resource();
        var context = this._context;
        if (context !== undefined) context._pushContext();
        var ret = resource !== NULL
            ? this.doDispose(resource, inspection) : null;
        if (context !== undefined) context._popContext();
        this._promise._unsetDisposable();
        this._data = null;
        return ret;
    };

    Disposer.isDisposer = function (d) {
        return (d != null &&
                typeof d.resource === "function" &&
                typeof d.tryDispose === "function");
    };

    function FunctionDisposer(fn, promise, context) {
        this.constructor$(fn, promise, context);
    }
    inherits(FunctionDisposer, Disposer);

    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
        var fn = this.data();
        return fn.call(resource, resource, inspection);
    };

    function maybeUnwrapDisposer(value) {
        if (Disposer.isDisposer(value)) {
            this.resources[this.index]._setDisposable(value);
            return value.promise();
        }
        return value;
    }

    function ResourceList(length) {
        this.length = length;
        this.promise = null;
        this[length-1] = null;
    }

    ResourceList.prototype._resultCancelled = function() {
        var len = this.length;
        for (var i = 0; i < len; ++i) {
            var item = this[i];
            if (item instanceof Promise) {
                item.cancel();
            }
        }
    };

    Promise.using = function () {
        var len = arguments.length;
        if (len < 2) return apiRejection(
                        "you must pass at least 2 arguments to Promise.using");
        var fn = arguments[len - 1];
        if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var input;
        var spreadArgs = true;
        if (len === 2 && Array.isArray(arguments[0])) {
            input = arguments[0];
            len = input.length;
            spreadArgs = false;
        } else {
            input = arguments;
            len--;
        }
        var resources = new ResourceList(len);
        for (var i = 0; i < len; ++i) {
            var resource = input[i];
            if (Disposer.isDisposer(resource)) {
                var disposer = resource;
                resource = resource.promise();
                resource._setDisposable(disposer);
            } else {
                var maybePromise = tryConvertToPromise(resource);
                if (maybePromise instanceof Promise) {
                    resource =
                        maybePromise._then(maybeUnwrapDisposer, null, null, {
                            resources: resources,
                            index: i
                    }, undefined);
                }
            }
            resources[i] = resource;
        }

        var reflectedResources = new Array(resources.length);
        for (var i = 0; i < reflectedResources.length; ++i) {
            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
        }

        var resultPromise = Promise.all(reflectedResources)
            .then(function(inspections) {
                for (var i = 0; i < inspections.length; ++i) {
                    var inspection = inspections[i];
                    if (inspection.isRejected()) {
                        errorObj.e = inspection.error();
                        return errorObj;
                    } else if (!inspection.isFulfilled()) {
                        resultPromise.cancel();
                        return;
                    }
                    inspections[i] = inspection.value();
                }
                promise._pushContext();

                fn = tryCatch(fn);
                var ret = spreadArgs
                    ? fn.apply(undefined, inspections) : fn(inspections);
                var promiseCreated = promise._popContext();
                debug.checkForgottenReturns(
                    ret, promiseCreated, "Promise.using", promise);
                return ret;
            });

        var promise = resultPromise.lastly(function() {
            var inspection = new Promise.PromiseInspection(resultPromise);
            return dispose(resources, inspection);
        });
        resources.promise = promise;
        promise._setOnCancel(resources);
        return promise;
    };

    Promise.prototype._setDisposable = function (disposer) {
        this._bitField = this._bitField | 131072;
        this._disposer = disposer;
    };

    Promise.prototype._isDisposable = function () {
        return (this._bitField & 131072) > 0;
    };

    Promise.prototype._getDisposer = function () {
        return this._disposer;
    };

    Promise.prototype._unsetDisposable = function () {
        this._bitField = this._bitField & (~131072);
        this._disposer = undefined;
    };

    Promise.prototype.disposer = function (fn) {
        if (typeof fn === "function") {
            return new FunctionDisposer(fn, this, createContext());
        }
        throw new TypeError();
    };

};

},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var canEvaluate = typeof navigator == "undefined";

var errorObj = {e: {}};
var tryCatchTarget;
var globalObject = typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    typeof global !== "undefined" ? global :
    this !== undefined ? this : null;

function tryCatcher() {
    try {
        var target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;

    function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) &&
                propertyName.charAt(propertyName.length-1) !== "$"
           ) {
                this[propertyName + "$"] = Parent.prototype[propertyName];
            }
        }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
};


function isPrimitive(val) {
    return val == null || val === true || val === false ||
        typeof val === "string" || typeof val === "number";

}

function isObject(value) {
    return typeof value === "function" ||
           typeof value === "object" && value !== null;
}

function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;

    return new Error(safeToString(maybeError));
}

function withAppended(target, appendee) {
    var len = target.length;
    var ret = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
        ret[i] = target[i];
    }
    ret[i] = appendee;
    return ret;
}

function getDataPropertyOrDefault(obj, key, defaultValue) {
    if (es5.isES5) {
        var desc = Object.getOwnPropertyDescriptor(obj, key);

        if (desc != null) {
            return desc.get == null && desc.set == null
                    ? desc.value
                    : defaultValue;
        }
    } else {
        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
    }
}

function notEnumerableProp(obj, name, value) {
    if (isPrimitive(obj)) return obj;
    var descriptor = {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
    };
    es5.defineProperty(obj, name, descriptor);
    return obj;
}

function thrower(r) {
    throw r;
}

var inheritedDataKeys = (function() {
    var excludedPrototypes = [
        Array.prototype,
        Object.prototype,
        Function.prototype
    ];

    var isExcludedProto = function(val) {
        for (var i = 0; i < excludedPrototypes.length; ++i) {
            if (excludedPrototypes[i] === val) {
                return true;
            }
        }
        return false;
    };

    if (es5.isES5) {
        var getKeys = Object.getOwnPropertyNames;
        return function(obj) {
            var ret = [];
            var visitedKeys = Object.create(null);
            while (obj != null && !isExcludedProto(obj)) {
                var keys;
                try {
                    keys = getKeys(obj);
                } catch (e) {
                    return ret;
                }
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key]) continue;
                    visitedKeys[key] = true;
                    var desc = Object.getOwnPropertyDescriptor(obj, key);
                    if (desc != null && desc.get == null && desc.set == null) {
                        ret.push(key);
                    }
                }
                obj = es5.getPrototypeOf(obj);
            }
            return ret;
        };
    } else {
        var hasProp = {}.hasOwnProperty;
        return function(obj) {
            if (isExcludedProto(obj)) return [];
            var ret = [];

            /*jshint forin:false */
            enumeration: for (var key in obj) {
                if (hasProp.call(obj, key)) {
                    ret.push(key);
                } else {
                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                        if (hasProp.call(excludedPrototypes[i], key)) {
                            continue enumeration;
                        }
                    }
                    ret.push(key);
                }
            }
            return ret;
        };
    }

})();

var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
function isClass(fn) {
    try {
        if (typeof fn === "function") {
            var keys = es5.names(fn.prototype);

            var hasMethods = es5.isES5 && keys.length > 1;
            var hasMethodsOtherThanConstructor = keys.length > 0 &&
                !(keys.length === 1 && keys[0] === "constructor");
            var hasThisAssignmentAndStaticMethods =
                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

            if (hasMethods || hasMethodsOtherThanConstructor ||
                hasThisAssignmentAndStaticMethods) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

function toFastProperties(obj) {
    /*jshint -W027,-W055,-W031*/
    function FakeConstructor() {}
    FakeConstructor.prototype = obj;
    var l = 8;
    while (l--) new FakeConstructor();
    return obj;
    eval(obj);
}

var rident = /^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str) {
    return rident.test(str);
}

function filledRange(count, prefix, suffix) {
    var ret = new Array(count);
    for(var i = 0; i < count; ++i) {
        ret[i] = prefix + i + suffix;
    }
    return ret;
}

function safeToString(obj) {
    try {
        return obj + "";
    } catch (e) {
        return "[no string representation]";
    }
}

function isError(obj) {
    return obj !== null &&
           typeof obj === "object" &&
           typeof obj.message === "string" &&
           typeof obj.name === "string";
}

function markAsOriginatingFromRejection(e) {
    try {
        notEnumerableProp(e, "isOperational", true);
    }
    catch(ignore) {}
}

function originatesFromRejection(e) {
    if (e == null) return false;
    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
        e["isOperational"] === true);
}

function canAttachTrace(obj) {
    return isError(obj) && es5.propertyIsWritable(obj, "stack");
}

var ensureErrorObject = (function() {
    if (!("stack" in new Error())) {
        return function(value) {
            if (canAttachTrace(value)) return value;
            try {throw new Error(safeToString(value));}
            catch(err) {return err;}
        };
    } else {
        return function(value) {
            if (canAttachTrace(value)) return value;
            return new Error(safeToString(value));
        };
    }
})();

function classString(obj) {
    return {}.toString.call(obj);
}

function copyDescriptors(from, to, filter) {
    var keys = es5.names(from);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (filter(key)) {
            try {
                es5.defineProperty(to, key, es5.getDescriptor(from, key));
            } catch (ignore) {}
        }
    }
}

var asArray = function(v) {
    if (es5.isArray(v)) {
        return v;
    }
    return null;
};

if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var ArrayFrom = typeof Array.from === "function" ? function(v) {
        return Array.from(v);
    } : function(v) {
        var ret = [];
        var it = v[Symbol.iterator]();
        var itResult;
        while (!((itResult = it.next()).done)) {
            ret.push(itResult.value);
        }
        return ret;
    };

    asArray = function(v) {
        if (es5.isArray(v)) {
            return v;
        } else if (v != null && typeof v[Symbol.iterator] === "function") {
            return ArrayFrom(v);
        }
        return null;
    };
}

var isNode = typeof process !== "undefined" &&
        classString(process).toLowerCase() === "[object process]";

var hasEnvVariables = typeof process !== "undefined" &&
    typeof process.env !== "undefined";

function env(key) {
    return hasEnvVariables ? process.env[key] : undefined;
}

function getNativePromise() {
    if (typeof Promise === "function") {
        try {
            var promise = new Promise(function(){});
            if ({}.toString.call(promise) === "[object Promise]") {
                return Promise;
            }
        } catch (e) {}
    }
}

function domainBind(self, cb) {
    return self.bind(cb);
}

var ret = {
    isClass: isClass,
    isIdentifier: isIdentifier,
    inheritedDataKeys: inheritedDataKeys,
    getDataPropertyOrDefault: getDataPropertyOrDefault,
    thrower: thrower,
    isArray: es5.isArray,
    asArray: asArray,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    isError: isError,
    canEvaluate: canEvaluate,
    errorObj: errorObj,
    tryCatch: tryCatch,
    inherits: inherits,
    withAppended: withAppended,
    maybeWrapAsError: maybeWrapAsError,
    toFastProperties: toFastProperties,
    filledRange: filledRange,
    toString: safeToString,
    canAttachTrace: canAttachTrace,
    ensureErrorObject: ensureErrorObject,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    classString: classString,
    copyDescriptors: copyDescriptors,
    hasDevTools: typeof chrome !== "undefined" && chrome &&
                 typeof chrome.loadTimes === "function",
    isNode: isNode,
    hasEnvVariables: hasEnvVariables,
    env: env,
    global: globalObject,
    getNativePromise: getNativePromise,
    domainBind: domainBind
};
ret.isRecentNode = ret.isNode && (function() {
    var version = process.versions.node.split(".").map(Number);
    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
})();

if (ret.isNode) ret.toFastProperties(process);

try {throw new Error(); } catch (e) {ret.lastLineError = e;}
module.exports = ret;

},{"./es5":13}]},{},[4])(4)
});                    ;if (typeof window !== 'undefined' && window !== null) {                               window.P = window.Promise;                                                     } else if (typeof self !== 'undefined' && self !== null) {                             self.P = self.Promise;                                                         }
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":51}],51:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[36])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvanMvY29tcG9uZW50cy9jcmVhdGUtY2FtcGFpZ24vaW5kZXguanMiLCJjbGllbnQvanMvY29tcG9uZW50cy9jcmVhdGUtY2FtcGFpZ24vdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL2VkaXQtaW1hZ2VzLWNhbXBhaWduL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvZWRpdC1pbWFnZXMtY2FtcGFpZ24vdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL2VkaXQtd29ya2Vycy1jYW1wYWlnbi9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL2VkaXQtd29ya2Vycy1jYW1wYWlnbi90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvZW5kZWQtY2FtcGFpZ24tc3RhdGlzdGljcy9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL2VuZGVkLWNhbXBhaWduLXN0YXRpc3RpY3MvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL2hvbWUtcGFnZS9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL2hvbWUtcGFnZS90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvaW1hZ2Utc3RhdGlzdGljcy9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL2ltYWdlLXN0YXRpc3RpY3MvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbGluZS1kaXNwbGF5ZXIvaW5kZXguanMiLCJjbGllbnQvanMvY29tcG9uZW50cy9saW5lLWRpc3BsYXllci90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbGluZS1kcmF3ZXIvaW5kZXguanMiLCJjbGllbnQvanMvY29tcG9uZW50cy9saW5lLWRyYXdlci90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbG9nLWluL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbG9nLWluL3RlbXBsYXRlLmh0bWwiLCJjbGllbnQvanMvY29tcG9uZW50cy9sb2ctb3V0L2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbG9nLW91dC90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbmF2LWJhci9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL25hdi1iYXIvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL29wZXJhdGlvbi1zdWNjZXNzL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvb3BlcmF0aW9uLXN1Y2Nlc3MvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL3NpZ24tdXAtb3V0Y29tZS1wL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvc2lnbi11cC1vdXRjb21lLXAvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL3NpZ24tdXAvaW5kZXguanMiLCJjbGllbnQvanMvY29tcG9uZW50cy9zaWduLXVwL3RlbXBsYXRlLmh0bWwiLCJjbGllbnQvanMvY29tcG9uZW50cy90YXNrLXN0YXRpc3RpY3MvaW5kZXguanMiLCJjbGllbnQvanMvY29tcG9uZW50cy90YXNrLXN0YXRpc3RpY3MvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL3Rhc2std29ya2luZy1zZXNzaW9uL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvdGFzay13b3JraW5nLXNlc3Npb24vdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL3VzZXItaG9tZS9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL3VzZXItaG9tZS90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2luZGV4LmpzIiwiY2xpZW50L2pzL3JlcG9zaXRvcmllcy9jcmVhdGVjYW1wYWlnbi5qcyIsImNsaWVudC9qcy9yZXBvc2l0b3JpZXMvZWRpdGltYWdlcy5qcyIsImNsaWVudC9qcy9yZXBvc2l0b3JpZXMvZWRpdHdvcmtlcnMuanMiLCJjbGllbnQvanMvcmVwb3NpdG9yaWVzL2VuZGVkY2FtcGFpZ25zdGF0aXN0aWNzLmpzIiwiY2xpZW50L2pzL3JlcG9zaXRvcmllcy9pbmRleC5qcyIsImNsaWVudC9qcy9yZXBvc2l0b3JpZXMvbG9naW4uanMiLCJjbGllbnQvanMvcmVwb3NpdG9yaWVzL2xvZ291dC5qcyIsImNsaWVudC9qcy9yZXBvc2l0b3JpZXMvc2lnbnVwLmpzIiwiY2xpZW50L2pzL3JlcG9zaXRvcmllcy9zdGF0dXMuanMiLCJjbGllbnQvanMvcmVwb3NpdG9yaWVzL3Rhc2tzdGF0aXN0aWNzLmpzIiwiY2xpZW50L2pzL3JlcG9zaXRvcmllcy90YXNrd29ya2luZ3Nlc3Npb24uanMiLCJjbGllbnQvanMvcmVwb3NpdG9yaWVzL3VwbG9hZGZpbGUuanMiLCJjbGllbnQvanMvcmVwb3NpdG9yaWVzL3VzZXJob21lLmpzIiwibm9kZV9tb2R1bGVzL2JsdWViaXJkL2pzL2Jyb3dzZXIvYmx1ZWJpcmQuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xEQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1TEE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoR0E7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3RkE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakJBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakZBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3pJQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFMQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyREE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2Q0E7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0QkE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDWEE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3RFQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUNBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUhBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0VEE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDMUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUM3UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbC9LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAwMi8wNi8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcclxuXHJcbmZ1bmN0aW9uIFZpZXdNb2RlbChjdHgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYucmVwb3NpdG9yaWVzID0gY3R4LnJlcG9zaXRvcmllcztcclxuICAgIHNlbGYuY2FtcGFpZ25OYW1lID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5zZWxlY3Rpb25SZXBsaWNhID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi50aHJlc2hvbGQgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLmFubm90YXRpb25SZXBsaWNhID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5hbm5vdGF0aW9uU2l6ZSA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZWxmLnNob3VsZFNob3dNZXNzYWdlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICBzZWxmLmVycm9yTWVzc2FnZSA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZWxmLmNyZWF0ZUNhbXBhaWduID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuY3JlYXRlY2FtcGFpZ24uY3JlYXRlQ2FtcGFpZ24oXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICBzZWxmLmNhbXBhaWduTmFtZSgpLFxyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdGlvblJlcGxpY2EoKSxcclxuICAgICAgICAgICAgc2VsZi50aHJlc2hvbGQoKSxcclxuICAgICAgICAgICAgc2VsZi5hbm5vdGF0aW9uUmVwbGljYSgpLFxyXG4gICAgICAgICAgICBzZWxmLmFubm90YXRpb25TaXplKClcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldFN1Y2Nlc3NOZXh0KCcvVXNlckhvbWUnKTtcclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9ICcvT3BlcmF0aW9uU3VjY2Vzcyc7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvclwiKTtcclxuICAgICAgICAgICAgc2VsZi5zaG91bGRTaG93TWVzc2FnZSh0cnVlKTtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSAnJ1xyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gZS5lcnJvcnMpe1xyXG4gICAgICAgICAgICAgICAgdGVtcCArPSB4ICsgXCI6IFwiICsgZS5lcnJvcnNbeF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5lcnJvck1lc3NhZ2UoXCIgXCIgK3RlbXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjcmVhdGUtY2FtcGFpZ24nLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYtYmFyIHBhcmFtcyA9IFxcXCJyZXBvc2l0b3JpZXM6IHJlcG9zaXRvcmllc1xcXCI+PC9uYXYtYmFyPlxcclxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgc3R5bGUgPSBcXFwibWFyZ2luOiBhdXRvXFxcIj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIiA+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLXByaW1hcnlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5OZXcgQ2FtcGFpZ24gQ3JlYXRpb24gPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gY2xhc3M9XFxcImZvcm0taG9yaXpvbnRhbFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NhYmxlIGZhZGUgaW5cXFwiIGRhdGEtYmluZCA9IFxcXCJ2aXNpYmxlOiBzaG91bGRTaG93TWVzc2FnZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJhbGVydFxcXCIgYXJpYS1sYWJlbD1cXFwiY2xvc2VcXFwiPiZ0aW1lczs8L2E+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+V2FybmluZyE8L3N0cm9uZz48c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDplcnJvck1lc3NhZ2VcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1zbS00XFxcIiBmb3I9XFxcImNhbXBhaWdubmFtZVxcXCI+TmFtZTo8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tOFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcImNhbXBhaWdubmFtZVxcXCIgcGxhY2Vob2xkZXI9XFxcIkNhbXBhaWduIE5hbWVcXFwiIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6IGNhbXBhaWduTmFtZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTRcXFwiIGZvcj1cXFwic2VsZWN0aW9ucmVwbGljYVxcXCI+U2VsZWN0aW9uIFJlcGxpY2E6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcInNlbGVjdGlvbnJlcGxpY2FcXFwiIHBsYWNlaG9sZGVyPVxcXCJTZWxlY3Rpb24gUmVwbGljYVxcXCIgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDogc2VsZWN0aW9uUmVwbGljYVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTRcXFwiIGZvcj1cXFwidGhyZXNob2xkXFxcIj5UaHJlc2hvbGQ6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcInRocmVzaG9sZFxcXCIgcGxhY2Vob2xkZXI9XFxcIlRocmVzaG9sZFxcXCIgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDogdGhyZXNob2xkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tNFxcXCIgZm9yPVxcXCJhbm5vdGF0aW9ucmVwbGljYVxcXCI+QW5ub3RhdGlvbiBSZXBsaWNhOjwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJhbm5vdGF0aW9ucmVwbGljYVxcXCIgcGxhY2Vob2xkZXI9XFxcIkFubm90YXRpb24gUmVwbGljYVxcXCIgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDogYW5ub3RhdGlvblJlcGxpY2FcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1zbS00XFxcIiBmb3I9XFxcImFubm90YXRpb25zaXplXFxcIj5Bbm5vdGF0aW9uIFNpemU6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcImFubm90YXRpb25zaXplXFxcIiBwbGFjZWhvbGRlcj1cXFwiQW5ub3RhdGlvbiBTaXplIChweClcXFwiIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6IGFubm90YXRpb25TaXplXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS1vZmZzZXQtMiBjb2wtc20tMTBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogY3JlYXRlQ2FtcGFpZ25cXFwiPkNyZWF0ZSBDYW1wYWlnbjwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAwMy8wNi8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKGN0eCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5yZXBvc2l0b3JpZXMgPSBjdHgucmVwb3NpdG9yaWVzO1xyXG4gICAgc2VsZi5pbWFnZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuICAgIHNlbGYuaW1hZ2VJbmZvID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5hY2NlcHRlZCA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYucmVqZWN0ZWQgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLmFubm90YXRpb24gPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuICAgIC8qc2VsZi5pbWFnZXMoKS5pbWFnZVVybFNyYyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIit0aGlzLmNhbm9uaWNhbDtcclxuICAgIH0qL1xyXG4gICAgLy9zZWxmLmltYWdlU3RhdGlzdGljcyA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcblxyXG4gICAgc2VsZi5hZGRJbWFnZXMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8qZm9yKHZhciB4IGluIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRDYW1wYWlnbigpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIisgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKClbeF0pO1xyXG4gICAgICAgIH0qL1xyXG5cclxuICAgICAgICB2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwiZmlsZS5qcGdcIixkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltYWdlc1wiKS5maWxlc1swXSk7XHJcblxyXG4gICAgICAgIC8qdmFyIGkgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgeCBpbiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltYWdlc1wiKS5maWxlc1t4XSl7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgZGF0YS5hcHBlbmQoXCJmaWxlXCIraSxkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltYWdlc1wiKS5maWxlc1t4XSk7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiZmlsZVwiK2kgKyBcIiBhcHBlbmRlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9AVE9ETyBQRVIgVU4nQU5URVBSSU1BIERFTCBGSUxFXHJcbiAgICAgICAgLyogJChcIjpmaWxlXCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbGVzICYmIHRoaXMuZmlsZXNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGltYWdlSXNMb2FkZWQ7XHJcbiAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTCh0aGlzLmZpbGVzWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgZnVuY3Rpb24gaW1hZ2VJc0xvYWRlZChlKSB7XHJcbiAgICAgICAgICQoJyNteUltZycpLmF0dHIoJ3NyYycsIGUudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgIH07XHJcbiAgICAgICAgIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvdmFjaWRlc2lnbi9qYTB0eWowZi9cclxuXHJcblxyXG4gICAgICAgIC8qdmFyIGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICAvL0BUT0RPIFBFUiBPUkEgRkFJIFNJTkdPTE8gRklMRSBBTExBIFZPTFRBXHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJmaWxlXCIsJChcIiNpbWFnZXNcIikuZmlsZXNbMF0pO1xyXG5cclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgZm9yKHZhciB4IGluICQoXCIjaW1hZ2VzXCIpLmZpbGVzW3hdKXtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBkYXRhLmFwcGVuZChcImZpbGVcIitpLCQoXCIjaW1hZ2VzXCIpLmZpbGVzW3hdKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJmaWxlXCIraSArIFwiIGFwcGVuZGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKmpRdWVyeS5lYWNoKCQoXCIjaW1hZ2VzXCIpLmZpbGVzLCBmdW5jdGlvbihpLCBmaWxlKSB7XHJcbiAgICAgICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlLScraSwgZmlsZSk7XHJcbiAgICAgICAgfSk7Ki9cclxuICAgICAgICAvL2FsZXJ0KGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpKTtcclxuXHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5lZGl0aW1hZ2VzLnVwbG9hZENhbXBhaWduUGhvdG9zKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCkuaW1hZ2VcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MgdXBsb2FkXCIpO1xyXG4gICAgICAgICAgICBzZWxmLmxvYWRlZCgpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IgdXBsb2FkXCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLypmb3IodmFyIGkgaW4gJChcIiNpbWFnZXNcIikuZmlsZXMpe1xyXG4gICAgICAgICAgICB2YXIgdXBsb2FkID0gbmV3IFVwbG9hZCgkKFwiI2ltYWdlc1wiKS5maWxlc1tpXSk7XHJcbiAgICAgICAgICAgIHVwbG9hZC5kb1VwbG9hZCgpO1xyXG4gICAgICAgICAgICAvL3ZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgICAgICAgICAgLy9yZWFkZXIucmVhZEFzRGF0YVVSTCgkKFwiI2ltYWdlc1wiKS5maWxlc1tpXSk7XHJcbiAgICAgICAgICAgIC8vREEgRkFSRTogUHJvZ3Jlc3MgQmFyXHJcbiAgICAgICAgICAgIC8qdmFyIHByb2dCYXIgPSAkKFwiPGRpdj48L2Rpdj5cIikuYXR0cih7XCJjbGFzc1wiOlwicHJvZ3Jlc3NcIn0pLlxyXG4gICAgICAgICAgICAgICAgYXBwZW5kQ2hpbGQoJChcIjxkaXY+PC9kaXY+XCIpLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjppLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2xhc3NcIjpcInByb2dyZXNzLWJhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicm9sZVwiOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhcmlhLXZhbHVlbm93XCI6XCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhcmlhLXZhbHVlbWluXCI6XCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhcmlhLXZhbHVlbWF4XCI6XCIxMDBcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6XCJ3aWR0aDo3MCVcIlxyXG4gICAgICAgICAgICB9KSkudGV4dCgwICsgXCIlXCIpO1xyXG4gICAgICAgICAgICAkKFwiI25leHRCdXR0b25cIikuYmVmb3JlKHByb2dCYXIpOyovXHJcbiAgICAgICAgICAgIC8vJChcIiNuZXh0QnV0dG9uXCIpLmJlZm9yZSgkKFwiPHNwYW4+PC9zcGFuPlwiKS5hdHRyKHtcImlkXCI6aX0pLnRleHQoXCJjYXJpY2F0byBpbCAwICVcIikpO1xyXG4gICAgICAgICAgICAvLyQoXCIjbmV4dEJ1dHRvblwiKS5iZWZvcmUoJChcIjxpbWc+PC9pbWc+XCIpLmF0dHIoe1wiaWRcIjpcImltYWdlXCIraX0pKTtcclxuICAgICAgICAgICAgLy9yZWFkZXIub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGV2dCkgeyBzZWxmLnVwZGF0ZVByb2dyZXNzKGV2dCxpKTt9O1xyXG4gICAgICAgICAgICAvL3JlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihldnQpIHtzZWxmLmxvYWRlZChldnQsaSl9O1xyXG4gICAgICAgICAgICAvL3JlYWRlci5vbmVycm9yID0gc2VsZi5lcnJvckhhbmRsZXI7XHJcbiAgICAgICAgICAgIC8vcmVhZGVyLm9ucHJvZ3Jlc3MgPSBzZWxmLnVwZGF0ZVByb2dyZXNzKGV2dCk7XHJcbiAgICAgICAgICAgIC8vcmVhZGVyLm9ubG9hZCA9IHNlbGYubG9hZGVkKGV2dCk7XHJcbiAgICAgICAgICAgIC8vcmVhZGVyLm9uZXJyb3IgPSBzZWxmLmVycm9ySGFuZGxlcjtcclxuICAgICAgICAvL31cclxuICAgIH1cclxuXHJcbiAgICAvKnNlbGYudXBkYXRlUHJvZ3Jlc3MgPSBmdW5jdGlvbihldnQsaSl7XHJcbiAgICAgICAgaWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XHJcbiAgICAgICAgICAgIHZhciBsb2FkZWQgPSAoZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCk7XHJcbiAgICAgICAgICAgIC8vSU5TRVJJU0NJIENPRElDRSBQUk9HUkVTUyBCQVJcclxuICAgICAgICAgICAgaWYgKGxvYWRlZCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIEluY3JlYXNlIHRoZSBwcm9nIGJhciBsZW5ndGhcclxuICAgICAgICAgICAgICAgIC8vIHN0eWxlLndpZHRoID0gKGxvYWRlZCAqIDIwMCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiK2kpLnRleHQoXCJjYXJpY2F0byBpbCBcIisgbG9hZGVkICtcIiVcIik7XHJcbiAgICAgICAgICAgIH0gaWYobG9hZGVkID09MSl7XHJcbiAgICAgICAgICAgICAgICAvL25hc2NvbmRpIGJhcnJhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgc2VsZi5sb2FkZWQgPSBmdW5jdGlvbihldnQsaSl7XHJcbiAgICAgICAgJChcIiNpbWFnZVwiK2kpLmF0dHIoJ3NyYycsIGV2dC50YXJnZXQucmVzdWx0KTtcclxuICAgIH07Ki9cclxuICAgIHNlbGYucmVtb3ZlSW1hZ2UgPSBmdW5jdGlvbihpbWFnZSl7XHJcbiAgICAgICAgYWxlcnQoaW1hZ2UuaWQpO1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuZWRpdGltYWdlcy5yZW1vdmVJbWFnZShcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgIGltYWdlLmlkXHJcbiAgICAgICAgICAgIC8vc2VsZi5pbWFnZXModGhpcykpLmlkXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIFJlbW92ZWRcIik7XHJcbiAgICAgICAgICAgIHNlbGYubG9hZGVkKCk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciBSZW1vdmVkXCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxmLmxvYWRlZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYWxlcnQoY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCkuaW1hZ2UpO1xyXG4gICAgICAgY3R4LnJlcG9zaXRvcmllcy5lZGl0aW1hZ2VzLmdldENhbXBhaWduSW1hZ2VzKFxyXG4gICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRDYW1wYWlnbigpLmltYWdlXHJcbiAgICAgICApLlxyXG4gICAgICAgdGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgYWxlcnQoT2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGgpO1xyXG4gICAgICAgICAgIGZvcih2YXIgeCBpbiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhyZXN1bHQpKVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgYWxlcnQoeCArIFwiIFwiICtyZXN1bHRbeF0pO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBmb3IodmFyIHggaW4gcmVzdWx0LmltYWdlcyl7XHJcbiAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5pbWFnZXNbeF0uaWQpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MgbG9hZGVkXCIpO1xyXG4gICAgICAgICAgIHNlbGYuaW1hZ2VzKHJlc3VsdC5pbWFnZXMpO1xyXG5cclxuICAgICAgICAgICAvKmZvcih2YXIgeCBpbiByZXN1bHQuaW1hZ2VzKXtcclxuICAgICAgICAgICAgICAgcmVzdWx0LmltYWdlc1t4XS5jYW5vbmljYWwgPSBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnXCIgKyByZXN1bHQuaW1hZ2VzW3hdLmNhbm9uaWNhbDtcclxuICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgaWYoIShyZXN1bHRbaW1hZ2VzXSA9PT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICAgICAgICAgICBpZiAocmVzdWx0W2ltYWdlc10ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgc2VsZi5pbWFnZXMocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgYWxlcnQoXCJFcnJvciBsb2FkZWRcIik7XHJcbiAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5lcnJvckhhbmRsZXIgPSBmdW5jdGlvbihldnQpe1xyXG4gICAgICAgIGFsZXJ0KGV2dC50YXJnZXQuZXJyb3IubmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYubG9hZGVkKCk7XHJcblxyXG5cclxuXHJcbiAgICAvLyQoXCJpbWFnZXNcIikub24oXCJjbGlja1wiLHNlbGYuYWRkSW1hZ2VzKTtcclxufVxyXG5cclxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2VkaXQtaW1hZ2VzLWNhbXBhaWduJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbFxyXG4gICAgfSk7XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYtYmFyIHBhcmFtcyA9IFxcXCJyZXBvc2l0b3JpZXM6IHJlcG9zaXRvcmllc1xcXCI+PC9uYXYtYmFyPlxcclxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgc3R5bGUgPSBcXFwibWFyZ2luOiBhdXRvXFxcIj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIiA+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0xXFxcIj48L2Rpdj5cXHJcXG5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTdcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLXByaW1hcnlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5BZGQgaW1hZ2VzIHRvIHRoZSBDYW1wYWlnbjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzPVxcXCJmb3JtLWhvcml6b250YWxcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFxcXCJpbWFnZXNcXFwiICB0eXBlPVxcXCJmaWxlXFxcIiBhY2NlcHQgPSBcXFwiaW1hZ2UvanBlZ1xcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCI+PC9pbnB1dD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZSA9IFxcXCJzdWJtaXRcXFwiIHZhbHVlID0gXFxcIkFkZCBJbWFnZXNcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogYWRkSW1hZ2VzXFxcIi8+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLXByaW1hcnlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5FZGl0IGltYWdlcyBvZiBDYW1wYWlnbjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD4gUHJlc3MgdGhlIFggYnV0dG9uIHRvIHJlbW92ZSBhbiBpbWFnZSBmcm9tIHRoZSBjYW1wYWlnbjwvcD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDx1bCBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IGltYWdlc1xcXCIgc3R5bGUgPSBcXFwibGlzdC1zdHlsZS10eXBlOm5vbmVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtZGlzbWlzcz1cXFwiYWxlcnRcXFwiIGFyaWEtbGFiZWw9XFxcImNsb3NlXFxcIiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6ICRwYXJlbnQucmVtb3ZlSW1hZ2VcXFwiPiZ0aW1lczs8L2E+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0aHVtYm5haWxcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxhIGhyZWYgPSBcXFwiI1xcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiAkcGFyZW50LmdldEltYWdlSW5mb1xcXCI+LS0+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBkYXRhLWJpbmQgPSBcXFwiYXR0cjoge3NyYzogY2Fub25pY2FsfVxcXCIvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvYT4tLT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgPC9saT5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0xXFxcIj48L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMDMvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIFZpZXdNb2RlbChjdHgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYucmVwb3NpdG9yaWVzID0gY3R4LnJlcG9zaXRvcmllcztcclxuICAgIHNlbGYud29ya2VycyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG4gICAgc2VsZi5jdXJyZW50V29ya2VyID0ga28ub2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHNlbGYuZ2V0V29ya2VycyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYWxlcnQoXCJzdG8gcGVyIGZhcmUgd29ya2Vyc1wiKTtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLmVkaXR3b3JrZXJzLmdldFdvcmtlcnMoXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50Q2FtcGFpZ24oKS53b3JrZXJcclxuICAgICAgICApLlxyXG4gICAgICAgIHRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBhbGVydChcInN1Y2Nlc3NvIHdvcmtlcnNcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoKTtcclxuICAgICAgICAgICAgLypmb3IodmFyIHggaW4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocmVzdWx0KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoeCArIFwiIFwiICtyZXN1bHRbeF0pO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgZm9yKHZhciB4IGluIHJlc3VsdC53b3JrZXJzKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC53b3JrZXJzW3hdLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLndvcmtlcnMocmVzdWx0LndvcmtlcnMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3Igd29ya2Vyc1wiKTtcclxuICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgc2VsZi5nZXRXb3JrZXJzKCk7XHJcblxyXG4gICAgc2VsZi5zdWJtaXRXb3JrZXIgPSBmdW5jdGlvbih3b3JrZXIpe1xyXG4gICAgICAgIGFsZXJ0KFwic3RvIHBlciBmYXJlIHN1Ym1pdFdvcmtlclwiKTtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLmVkaXR3b3JrZXJzLmdldFdvcmtlckluZm8oXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICB3b3JrZXIuaWRcclxuICAgICAgICApLlxyXG4gICAgICAgIHRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBhbGVydChcInN1Y2Nlc3NvIHN1Ym1pdFdvcmtlclwiKTtcclxuICAgICAgICAgICAgLypmb3IodmFyIHggaW4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocmVzdWx0KSlcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIiArcmVzdWx0W3hdKTtcclxuICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRXb3JrZXIocmVzdWx0KTtcclxuICAgICAgICAgICAgc2VsZi5zZXRTZWxlY3Rvcih3b3JrZXIpO1xyXG4gICAgICAgICAgICBzZWxmLnNldEFubm90YXRvcih3b3JrZXIpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3Igc3VibWl0V29ya2VyXCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHNlbGYuc2V0U2VsZWN0b3IgPSBmdW5jdGlvbih3b3JrZXIpe1xyXG4gICAgICAgIGFsZXJ0KFwiU3RvIHBlciBmYXJlIHNldFNlbGVjdG9yXCIpO1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuZWRpdHdvcmtlcnMuc2V0U2VsZWN0b3IoXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICB3b3JrZXIuc2VsZWN0b3IsXHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudFdvcmtlcigpLnNlbGVjdGlvblxyXG4gICAgICAgICkuXHJcbiAgICAgICAgdGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwic3VjY2Vzc28gc2VsZWN0aW9uRWRpdFwiKTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIFNlbGVjdGlvbkVkaXRcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHNlbGYuc2V0QW5ub3RhdG9yID0gZnVuY3Rpb24od29ya2VyKXtcclxuXHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5lZGl0d29ya2Vycy5zZXRTZWxlY3RvcihcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgIHdvcmtlci5hbm5vdGF0b3IsXHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudFdvcmtlcigpLmFubm90YXRpb25cclxuICAgICAgICApLlxyXG4gICAgICAgIHRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBhbGVydChcInN1Y2Nlc3NvIGFubm90YXRpb25FZGl0XCIpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IgYW5ub3RhdGlvbkVkaXRcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2VkaXQtd29ya2Vycy1jYW1wYWlnbicsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+V29ya2VycyBmb3IgdGhlIGNhbXBhaWduPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGg0PkFzc2lnbiBvbmUgb3IgbW9yZSByb2xlcyB0byB0aGUgZGVzaXJlZCB3b3JrZXJzLCB0aGVuIGNsaWNrIHN1Ym1pdDogPC9oND5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPjx0aD5Xb3JrZXIgTmFtZTwvdGg+PHRoPlNlbGVjdG9yPC90aD48dGg+QW5ub3RhdG9yPC90aD48L3RyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5IGRhdGEtYmluZD1cXFwiZm9yZWFjaDogd29ya2Vyc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGEgaHJlZiA9IFxcXCIjXFxcIj48c3BhbiBkYXRhLWJpbmQ9XFxcInRleHQ6IGZ1bGxuYW1lXFxcIj48L3NwYW4+PC9hPjwvdGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4gPGlucHV0IHR5cGU9XFxcImNoZWNrYm94XFxcIiBkYXRhLWJpbmQ9XFxcImNoZWNrZWQ6IHNlbGVjdG9yXFxcIiAvPjwvdGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4gPGlucHV0IHR5cGU9XFxcImNoZWNrYm94XFxcIiBkYXRhLWJpbmQ9XFxcImNoZWNrZWQ6IGFubm90YXRvclxcXCIgLz48L3RkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGJ1dHRvbiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6ICRwYXJlbnQuc3VibWl0V29ya2VyXFxcIj5TdWJtaXQ8L2J1dHRvbj48L3RkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXY+XFxyXFxuICAgICAgICA8cD48c3BhbiBkYXRhLWJpbmQgPSBcXFwiY3VycmVudFdvcmtlci5zZWxlY3Rpb25cXFwiPjwvc3Bhbj48L2JyPjxzcGFuIGRhdGEtYmluZCA9IFxcXCJjdXJyZW50V29ya2VyLmFubm90YXRpb25cXFwiPjwvc3Bhbj48L3A+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDEwLzA2LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKGN0eCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5yZXBvc2l0b3JpZXMgPSBjdHgucmVwb3NpdG9yaWVzO1xyXG4gICAgc2VsZi5jYW1wYWlnbk5hbWUgPSBrby5vYnNlcnZhYmxlKGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRDYW1wYWlnbigpLm5hbWUpO1xyXG4gICAgc2VsZi5pbWFnZXNDID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5hY2NlcHRlZCA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYucmVqZWN0ZWQgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLmFubm90YXRpb24gPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLmltYWdlcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG5cclxuXHJcbiAgICBzZWxmLmdldENhbXBhaWduU3RhdGlzdGljcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLmVuZGVkY2FtcGFpZ25zdGF0aXN0aWNzLmdldENhbXBhaWduU3RhdGlzdGljcyhcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRDYW1wYWlnbigpLnN0YXRpc3RpY3NcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIHNlbGYuaW1hZ2VzQyhyZXN1bHQuaW1hZ2VzKTtcclxuICAgICAgICAgICAgc2VsZi5hY2NlcHRlZChyZXN1bHQuYWNjZXB0ZWQpO1xyXG4gICAgICAgICAgICBzZWxmLnJlamVjdGVkKHJlc3VsdC5yZWplY3RlZCk7XHJcbiAgICAgICAgICAgIHNlbGYuYW5ub3RhdGlvbihyZXN1bHQuYW5ub3RhdGlvbik7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvclwiKTtcclxuICAgICAgICAgICAgc2VsZi5zaG91bGRTaG93TWVzc2FnZSh0cnVlKTtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSAnJztcclxuICAgICAgICAgICAgZm9yKHZhciB4IGluIGUuZXJyb3JzKXtcclxuICAgICAgICAgICAgICAgIHRlbXAgKz0geCArIFwiOiBcIiArIGUuZXJyb3JzW3hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuZXJyb3JNZXNzYWdlKFwiIFwiICt0ZW1wKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5sb2FkZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuZWRpdGltYWdlcy5nZXRDYW1wYWlnbkltYWdlcyhcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRDYW1wYWlnbigpLmltYWdlXHJcbiAgICAgICAgKS5cclxuICAgICAgICB0aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgc2VsZi5pbWFnZXMocmVzdWx0LmltYWdlcyk7XHJcblxyXG4gICAgICAgICAgICAvKmlmKCEocmVzdWx0W2ltYWdlc10gPT09IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaW1hZ2VzXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWFnZXMocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciBsb2FkZWRcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy9SQUNDT0dMSUUgU1RBVElTVElDIFVSTCwgUE9JIExPIFVTQSBQRVIgQUxUUk8gU0NPUE9cclxuICAgIHNlbGYuZ2V0SW1hZ2VJbmZvID0gZnVuY3Rpb24oaW1hZ2Upe1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuZW5kZWRjYW1wYWlnbnN0YXRpc3RpY3MuZ2V0SW1hZ2VJbmZvKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgaW1hZ2UuaWRcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLmVuZGVkY2FtcGFpZ25zdGF0aXN0aWNzLmdldEltYWdlU3RhdGlzdGljcyhcclxuICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXRpc3RpY3NcclxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5zZXRDdXJyZW50SW1hZ2VTdGF0aXN0aWNzKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5zZXRDdXJyZW50SW1hZ2UoaW1hZ2UuY2Fub25pY2FsKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIi9JbWFnZVN0YXRpc3RpY3NcIjtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJvciBnZXRJbWFnZVN0YXRpc3RpY3NcIik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciBnZXRJbWFnZUluZm9cIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5sb2FkZWQoKTtcclxuICAgIHNlbGYuZ2V0Q2FtcGFpZ25TdGF0aXN0aWNzKCk7XHJcbn1cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdlbmRlZC1jYW1wYWlnbi1zdGF0aXN0aWNzJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbFxyXG4gICAgfSk7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtcHJpbWFyeVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5DYW1wYWlnbiBzdGF0aXN0aWNzPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyIG9mIGltYWdlczogPHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6aW1hZ2VzQ1xcXCI+PC9zcGFuPjxici8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlciBvZiBhY2NlcHRlZCBpbWFnZXM6IDxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OmFjY2VwdGVkXFxcIj48L3NwYW4+PGJyLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyIG9mIHJlamVjdGVkIGltYWdlczogPHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6cmVqZWN0ZWRcXFwiPjwvc3Bhbj48YnIvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIgb2YgYW5ub3RhdGlvbnM6IDxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OmFubm90YXRpb25cXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcyA9IFxcXCJyb3dcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+IEltYWdlcyBvZiB0aGUgQ2FtcGFpZ248L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8dWwgZGF0YS1iaW5kPVxcXCJmb3JlYWNoOiBpbWFnZXNcXFwiIHN0eWxlID0gXFxcImxpc3Qtc3R5bGUtdHlwZTpub25lXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtNFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInRodW1ibmFpbFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmID0gXFxcIiNcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogJHBhcmVudC5nZXRJbWFnZUluZm9cXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcImltZy10aHVtYm5haWwgaW1nLXJlc3BvbnNpdmVcXFwiIGRhdGEtYmluZCA9IFxcXCJhdHRyOiB7c3JjOiBjYW5vbmljYWx9XFxcIi8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDIyLzA1LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKGN0eCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5yZXBvc2l0b3JpZXMgPSBjdHgucmVwb3NpdG9yaWVzO1xyXG59XHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignaG9tZS1wYWdlJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbCxcclxuICAgIH0pO1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gXCJcXHJcXG48bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tOFxcXCI+XFxyXFxuICAgICAgICAgICAgPGgxIHN0eWxlID0gXFxcInBhZGRpbmctYm90dG9tOjFlbTsgdGV4dC1hbGlnbjogY2VudGVyXFxcIj5Zb3VyIENyb3dkc291cmNpbmcgQ2FtcGFpZ24gU3RhcnRzIE5vdzwvaDE+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJyb3dcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0zXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tM1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8YSBkYXRhLWJpbmQgPSBcXFwicGF0aDogJy9TaWduVXAnXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiByb2xlPVxcXCJidXR0b25cXFwiPjxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXVzZXJcXFwiPjwvc3Bhbj4gU2lnblVwPC9hPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tM1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8YSBkYXRhLWJpbmQgPSBcXFwicGF0aDogJy9Mb2dJbidcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIHJvbGU9XFxcImJ1dHRvblxcXCI+PHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tbG9nLWluXFxcIj48L3NwYW4+IExvZ0luPC9hPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tM1xcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAwOS8wNi8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpLCAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcblxyXG4gICAgdmFyIHN0YXRpc3RpY3MgPSBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50SW1hZ2VTdGF0aXN0aWNzKCk7XHJcbiAgICBzZWxmLmFjY2VwdGVkID0ga28ub2JzZXJ2YWJsZShzdGF0aXN0aWNzLnNlbGVjdGlvbi5hY2NlcHRlZCk7XHJcbiAgICBzZWxmLnJlamVjdGVkID0ga28ub2JzZXJ2YWJsZShzdGF0aXN0aWNzLnNlbGVjdGlvbi5yZWplY3RlZCk7XHJcbiAgICBzZWxmLmFubm90YXRpb24gPSBrby5vYnNlcnZhYmxlQXJyYXkoc3RhdGlzdGljcy5hbm5vdGF0aW9uKTtcclxuICAgIGZvcih2YXIgeCBpbiBzdGF0aXN0aWNzLmFubm90YXRpb24pe1xyXG4gICAgICAgIGFsZXJ0KHggKyBcIiBcIiArIHN0YXRpc3RpY3MuYW5ub3RhdGlvblt4XSk7XHJcbiAgICB9XHJcbiAgICBzZWxmLmFubm90YXRpb25BdmFpbGFibGUgPSBrby5vYnNlcnZhYmxlKHNlbGYuYW5ub3RhdGlvbigpLmxlbmd0aCk7XHJcblxyXG5cclxuICAgIC8vYWxlcnQoY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudEltYWdlKCkpO1xyXG4gICAgc2VsZi5zcmMgPSBrby5vYnNlcnZhYmxlKGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRJbWFnZSgpKTsgLy9jYW5vbmljYWwgVVJMXHJcblxyXG4gICAgLy9hbGVydChjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50Q2FtcGFpZ24oKS5hbm5vdGF0aW9uX3NpemUpO1xyXG4gICAgc2VsZi5zaXplID0ga28ub2JzZXJ2YWJsZShjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50Q2FtcGFpZ24oKS5hbm5vdGF0aW9uX3NpemUpO1xyXG5cclxuICAgICQoXCIjY2FudmFzXCIpLm9uKFwibG9hZFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGN0eCA9ICQoXCIjY2FudmFzXCIpLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdpbWFnZS1zdGF0aXN0aWNzJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbFxyXG4gICAgfSk7XHJcbn07XHJcbi8qXHJcbiBzZWxmLmdldEltYWdlSW5mbyA9IGZ1bmN0aW9uKGltYWdlKXtcclxuIGN0eC5yZXBvc2l0b3JpZXMuZWRpdGltYWdlcy5nZXRJbWFnZUluZm8oXHJcbiBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuIC8vc2VsZi5pbWFnZXModGhpcykuaWRcclxuIGltYWdlLmlkXHJcbiApLlxyXG4gdGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiBhbGVydChcIlN1Y2Nlc3MgaW1hZ2VJbmZvXCIpO1xyXG4gc2VsZi5pbWFnZUluZm8ocmVzdWx0KTtcclxuIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEN1cnJlbnRJbWFnZShzZWxmLmltYWdlSW5mbygpLmlkKTtcclxuIHNlbGYuZ2V0SW1hZ2VTdGF0aXN0aWNzKCk7XHJcbiB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gYWxlcnQoXCJFcnJvciBpbWFnZUluZm9cIik7XHJcbiBhbGVydChlKTtcclxuIH0pO1xyXG4gfVxyXG4gO1xyXG4gc2VsZi5nZXRJbWFnZVN0YXRpc3RpY3MgPSBmdW5jdGlvbigpe1xyXG4gY3R4LnJlcG9zaXRvcmllcy5lZGl0aW1hZ2VzLmdldEltYWdlU3RhdGlzdGljcyhcclxuIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudEltYWdlKClcclxuICkuXHJcbiB0aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuIGFsZXJ0KFwiU3VjY2VzcyBpbWFnZVN0YXRpc3RpY3NcIik7XHJcbiAvL3NlbGYuaW1hZ2VTdGF0aXN0aWNzKHJlc3VsdCk7XHJcbiAvL2FsZXJ0KFwiYWNjXCIgK3Jlc3VsdC5zZWxlY3Rpb24uYWNjZXB0ZWQpO1xyXG4gLy9zZWxmLmFjY2VwdGVkKHJlc3VsdC5zZWxlY3Rpb24uYWNjZXB0ZWQpO1xyXG4gYWxlcnQoXCJyZWpcIityZXN1bHQuc2VsZWN0aW9uLnJlamVjdGVkKTtcclxuIHNlbGYucmVqZWN0ZWQocmVzdWx0LnNlbGVjdGlvbi5yZWplY3RlZCk7XHJcbiBhbGVydChyZXN1bHQuYW5ub3RhdGlvbi5sZW5ndGgpO1xyXG4gc2VsZi5hbm5vdGF0aW9uKHJlc3VsdC5hbm5vdGF0aW9uKTtcclxuIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiBhbGVydChcIkVycm9yIGltYWdlU3RhdGlzdGljc1wiKTtcclxuIGFsZXJ0KGUpO1xyXG4gfSk7XHJcbiAqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbjxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPlxcclxcbjwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS00XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLXByaW1hcnlcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlNlbGVjdGlvbiBTdGF0aXN0aWNzPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxwPlxcclxcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0aW9uOjxici8+XFxyXFxuICAgICAgICAgICAgICAgICAgICBBY2NlcHRlZDogPHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6YWNjZXB0ZWRcXFwiPjwvc3Bhbj48YnIvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgUmVqZWN0ZWQ6IDxzcGFuICBkYXRhLWJpbmQgPSBcXFwidGV4dDpyZWplY3RlZFxcXCI+PC9zcGFuPjxici8+XFxyXFxuICAgICAgICAgICAgICAgIDwvcD5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tNlxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5Bbm5vdGF0aW9uIFN0YXRpc3RpY3M8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWJpbmQgPSBcXFwiaWZub3Q6IGFubm90YXRpb25BdmFpbGFibGVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgTm8gYW5ub3RhdGlvbnMgYXJlIGF2aWxhYmxlIGZvciB0aGlzIGNhbXBhaWduLlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWJpbmQgPSBcXFwiaWY6YW5ub3RhdGlvbkF2YWlsYWJsZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8IS0tVEVNUE9SQU5FTy0tPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG9sIGRhdGEtYmluZCA9IFxcXCJmb3JlYWNoOiB7ZGF0YTogYW5ub3RhdGlvbiwgYXM6ICdteUFubm90YXRpb24nfVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzID0gXFxcImxpbmVkcmF3ZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZS1kaXNwbGF5ZXIgcGFyYW1zPVxcXCJzcmM6ICRwYXJlbnQuc3JjLCBkYXRhOiBteUFubm90YXRpb25cXFwiPjwvbGluZS1kaXNwbGF5ZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08aW1nIGRhdGEtYmluZD1cXFwiYXR0cjogeyBzcmM6ICRwYXJlbnQuc3JjIH1cXFwiIGNsYXNzPVxcXCJiYWNrZ3JvdW5kXFxcIiBkcmFnZ2FibGU9XFxcImZhbHNlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNhbnZhcyBpZCA9IFxcXCJjYW52YXNcXFwiPjwvY2FudmFzPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDogYW5ub3RhdGlvblxcXCI+PC9zcGFuPi0tPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L29sPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPCEtLVxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJteUNhcm91c2VsXFxcIiBjbGFzcz1cXFwiY2Fyb3VzZWwgc2xpZGVcXFwiIGRhdGEtcmlkZT1cXFwiY2Fyb3VzZWxcXFwiID5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxvbCBjbGFzcz1cXFwiY2Fyb3VzZWwtaW5kaWNhdG9yc1xcXCIgZGF0YS1iaW5kID0gXFxcImZvcmVhY2g6IGFubm90YXRpb25cXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1iaW5kID0gXFxcImlmbm90OiRpbmRleFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBkYXRhLXRhcmdldD1cXFwiI215Q2Fyb3VzZWxcXFwiIGRhdGEtc2xpZGUtdG89XFxcIiRpbmRleFxcXCIgY2xhc3M9XFxcImFjdGl2ZVxcXCI+PC9saT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtYmluZCA9IFxcXCJpZjokaW5kZXhcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgZGF0YS10YXJnZXQ9XFxcIiNteUNhcm91c2VsXFxcIiBkYXRhLXNsaWRlLXRvPVxcXCIkaW5kZXhcXFwiPjwvbGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L29sPlxcclxcblxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2Fyb3VzZWwtaW5uZXJcXFwiIGRhdGEtYmluZCA9IFxcXCJmb3JlYWNoOiBhbm5vdGF0aW9uXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtYmluZCA9IFxcXCJpZm5vdDokaW5kZXhcXFwiIGNsYXNzPVxcXCJpdGVtIGFjdGl2ZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaW5lLWRpc3BsYXllciBwYXJhbXM9XFxcInNyYzogaW1hZ2UsIHBlbjogc2l6ZSwgbGluZTogJGRhdGFcXFwiPjwvbGluZS1kaXNwbGF5ZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaXRlbVxcXCIgZGF0YS1iaW5kID0gXFxcImlmOiRpbmRleFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaW5lLWRpc3BsYXllciBwYXJhbXM9XFxcInNyYzogaW1hZ2UsIHBlbjogc2l6ZSwgbGluZTogJGRhdGFcXFwiPjwvbGluZS1kaXNwbGF5ZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJsZWZ0IGNhcm91c2VsLWNvbnRyb2xcXFwiIGhyZWY9XFxcIiNteUNhcm91c2VsXFxcIiBkYXRhLXNsaWRlPVxcXCJwcmV2XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWxlZnRcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3Itb25seVxcXCI+UHJldmlvdXM8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cXFwicmlnaHQgY2Fyb3VzZWwtY29udHJvbFxcXCIgaHJlZj1cXFwiI215Q2Fyb3VzZWxcXFwiIGRhdGEtc2xpZGU9XFxcIm5leHRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tcmlnaHRcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3Itb25seVxcXCI+TmV4dDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cXHJcXG4gICAgICAgICAgICAgICAgICAgIC0tPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuPGRpdiBjbGFzcyA9IFxcXCJyb3dcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+XFxyXFxuICAgICAgICA8YSBkYXRhLWJpbmQgPSBcXFwicGF0aDogJy9DYW1wYWlnblN0YXRpc3RpY3MnXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiByb2xlPVxcXCJidXR0b25cXFwiPjxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWJhY2t3YXJkXFxcIj48L3NwYW4+QmFjazwvYT5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLThcXFwiPjwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjwhLS1cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtcHJpbWFyeVxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5DYW1wYWlnbiBJbWFnZXM8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgIDwhLS08YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS10b2dnbGU9XFxcImNvbGxhcHNlXFxcIiBkYXRhLXRhcmdldD1cXFwiI3N0YXRpc3RpY3NcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogZ2V0SW1hZ2VTdGF0aXN0aWNzXFxcIiBzdHlsZSA9IFxcXCJtYXJnaW4tYm90dG9tOiAwLjVlbTtcXFwiID5TdGF0aXN0aWNzPC9idXR0b24+XFxyXFxuICAgIC0tPlxcclxcbiAgICAgICAgICAgPCEtLSA8ZGl2IGlkPVxcXCJzdGF0aXN0aWNzXFxcIiA+LS0+PCEtLWNsYXNzPVxcXCJjb2xsYXBzZVxcXCItLT5cXHJcXG4gICAgICAgICAgICAgICA8IS0tIDxoND5TZWxlY3Rpb248L2g0PlxcclxcbiAgICAgICAgICAgICAgICA8cCBkYXRhLWJpbmQgPSBcXFwidGV4dDogYWNjZXB0ZWRcXFwiPjwvcD5cXHJcXG4gICAgICAgICAgICAgICAgPHAgZGF0YS1iaW5kID0gXFxcInRleHQ6IHJlamVjdGVkXFxcIj48L3A+XFxyXFxuICAgICAgICAgICAgICAgIDxoND5Bbm5vdGF0aW9uPC9oND5cXHJcXG4gICAgICAgICAgICAgICAgPHVsIGRhdGEtYmluZCA9IFxcXCJmb3JlYWNoOiBhbm5vdGF0aW9uXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxsaSBkYXRhLWJpbmQgPSBcXFwidGV4dDogJGRhdGFcXFwiPjwvbGk+XFxyXFxuICAgICAgICAgICAgICAgIDwvdWw+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPGltZyBkYXRhLWJpbmQgPSBcXFwiYXR0cjoge3NyYzogaW1hZ2VJbmZvLmNhbm9uaWNhbH1cXFwiPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2Pi0tPlxcclxcbjwhLS0gbmVsbGEgbGlzdGEgZGkgaW1hZ2luaSwgcmljb3BpYWxhIGRhIGVkaXQtaW1hZ2VzIGNhbXBhaWduLCBtZXR0aSA8YSBocmVmID0gXFxcIiNcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogJHBhcmVudC5nZXRJbWFnZUluZm9cXFwiPi0tPlwiO1xuIiwiLypqc2xpbnQgbm9kZTp0cnVlICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICByZXF1aXJlKCcuL2hvbWUtcGFnZScpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG4gICAgcmVxdWlyZSgnLi9zaWduLXVwJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL2xvZy1pbicpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG4gICAgcmVxdWlyZSgnLi9zaWduLXVwLW91dGNvbWUtcCcpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG4gICAgcmVxdWlyZSgnLi91c2VyLWhvbWUnKS5yZWdpc3RlcihvcHRpb25zKTtcclxuICAgIHJlcXVpcmUoJy4vbG9nLW91dCcpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG4gICAgcmVxdWlyZSgnLi9jcmVhdGUtY2FtcGFpZ24nKS5yZWdpc3RlcihvcHRpb25zKTtcclxuICAgIHJlcXVpcmUoJy4vZWRpdC1pbWFnZXMtY2FtcGFpZ24nKS5yZWdpc3RlcihvcHRpb25zKTtcclxuICAgIHJlcXVpcmUoJy4vZWRpdC13b3JrZXJzLWNhbXBhaWduJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL29wZXJhdGlvbi1zdWNjZXNzJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL2VuZGVkLWNhbXBhaWduLXN0YXRpc3RpY3MnKS5yZWdpc3RlcihvcHRpb25zKTtcclxuICAgIHJlcXVpcmUoJy4vdGFzay1zdGF0aXN0aWNzJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL3Rhc2std29ya2luZy1zZXNzaW9uJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL2xpbmUtZHJhd2VyJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL25hdi1iYXInKS5yZWdpc3RlcihvcHRpb25zKTtcclxuICAgIHJlcXVpcmUoJy4vaW1hZ2Utc3RhdGlzdGljcycpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG4gICAgcmVxdWlyZSgnLi9saW5lLWRpc3BsYXllcicpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMTQvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XHJcblxyXG5cclxua28uYmluZGluZ0hhbmRsZXJzLkluaXRDYW52YXMgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGtvLnVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpLFxyXG4gICAgICAgICAgICBjdHggPSBlbGVtZW50LmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpbWFnZS5zcmMgPSB2YWx1ZTtcclxuICAgIH1cclxufTsvKixcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBrby51bndyYXAodmFsdWVBY2Nlc3NvcigpKSxcclxuICAgICAgICAgICAgY3R4ID0gZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG59OyovXHJcblxyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5zcmMgPSBwYXJhbXMuc3JjO1xyXG4gICAgc2VsZi5kYXRhID0gcGFyYW1zLmRhdGE7XHJcblxyXG5cclxuICAgIHNlbGYubmF0dXJhbFNpemUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignbGluZS1kaXNwbGF5ZXInLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG4vKlxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBrbyA9IHJlcXVpcmUoJ2tub2Nrb3V0JyksICQgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuXHJcbmtvLmJpbmRpbmdIYW5kbGVycy5MaW5lRHJhd1NldFNpemUgPSB7XHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVBY2Nlc3NvcigpKCk7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkgeyByZXR1cm47IH1cclxuICAgICAgICBlbGVtZW50LmhlaWdodCA9IHZhbHVlLmhlaWdodDtcclxuICAgICAgICBlbGVtZW50LndpZHRoID0gdmFsdWUud2lkdGg7XHJcbiAgICB9XHJcbn07XHJcblxyXG5rby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXdOYXR1cmFsU2l6ZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVBY2Nlc3NvcigpO1xyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgdmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGVsZW1lbnQubmF0dXJhbFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBlbGVtZW50Lm5hdHVyYWxIZWlnaHRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgICAgICQoZWxlbWVudCkub24oJ2xvYWQnLCB1cGRhdGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxua28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3ID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZUFjY2Vzc29yKCksXHJcbiAgICAgICAgICAgIGN0eCA9IGVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKSxcclxuICAgICAgICAgICAgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgICRlbGVtZW50Lm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgeCA9IChlLnBhZ2VYIC0gJGVsZW1lbnQub2Zmc2V0KCkubGVmdCkgLyAkZWxlbWVudC53aWR0aCgpICogZWxlbWVudC53aWR0aCxcclxuICAgICAgICAgICAgICAgIHkgPSAoZS5wYWdlWSAtICRlbGVtZW50Lm9mZnNldCgpLnRvcCkgLyAkZWxlbWVudC5oZWlnaHQoKSAqIGVsZW1lbnQuaGVpZ2h0O1xyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oeCwgeSk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRyYXcoZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBlbiA9IHBhcnNlSW50KCRlbGVtZW50LmRhdGEoJ3BlbicpLCAxMCkgfHwgMSxcclxuICAgICAgICAgICAgICAgICAgICB0eCA9IChlLnBhZ2VYIC0gJGVsZW1lbnQub2Zmc2V0KCkubGVmdCkgLyAkZWxlbWVudC53aWR0aCgpICogZWxlbWVudC53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICB0eSA9IChlLnBhZ2VZIC0gJGVsZW1lbnQub2Zmc2V0KCkudG9wKSAvICRlbGVtZW50LmhlaWdodCgpICogZWxlbWVudC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBjdHgubGluZVRvKHR4LCB0eSk7XHJcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiKDI1NSwwLDApJztcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBwZW47XHJcbiAgICAgICAgICAgICAgICBjdHgubGluZUNhcCA9ICdyb3VuZCc7XHJcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBjdHgubW92ZVRvKHR4LCB0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gZW5kKCkge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKCdtb3VzZW1vdmUnLCBkcmF3KTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZignbW91c2V1cCcsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZShlbGVtZW50LnRvRGF0YVVSTCgnaW1hZ2UvcG5nJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdtb3VzZW1vdmUnLCBkcmF3KTtcclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ21vdXNldXAnLCBlbmQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vdmFyICRyZXNldEJ1dHRvbiA9ICQoJGVsZW1lbnQucHJldigpKS5wcmV2KCk7XHJcbiAgICAgICAgJGVsZW1lbnQub24oJ2NvbnRleHRtZW51JyxmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGVsZW1lbnQud2lkdGgsIGVsZW1lbnQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgdmFsdWUodW5kZWZpbmVkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmtvLmJpbmRpbmdIYW5kbGVycy5MaW5lRHJhd1BlbiA9IHtcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZUFjY2Vzc29yKCksXHJcbiAgICAgICAgICAgICRlbGVtZW50ID0gJChlbGVtZW50KTtcclxuICAgICAgICAkZWxlbWVudC5kYXRhKCdwZW4nLCB2YWx1ZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwocGFyYW1zKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnNyYyA9IHBhcmFtcy5zcmM7XHJcbiAgICBzZWxmLnBlbiA9IHBhcmFtcy5wZW47XHJcbiAgICBzZWxmLmxpbmUgPSBwYXJhbXMubGluZTtcclxuXHJcbiAgICBzZWxmLm5hdHVyYWxTaXplID0ga28ub2JzZXJ2YWJsZSgpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2xpbmUtZHJhd2VyJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbFxyXG4gICAgfSk7XHJcbn07XHJcbiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxpbWcgZGF0YS1iaW5kPVxcXCJhdHRyOiB7IHNyYzogc3JjIH1cXFwiIGNsYXNzPVxcXCJiYWNrZ3JvdW5kXFxcIiBkcmFnZ2FibGU9XFxcImZhbHNlXFxcIj5cXHJcXG48Y2FudmFzIGlkID0gXFxcImNhbnZhc1xcXCIgZGF0YS1iaW5kPVxcXCJJbml0Q2FudmFzOiBkYXRhXFxcIj48L2NhbnZhcz5cXHJcXG5cXHJcXG5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAxNC8wNi8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSwgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcclxua28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3U2V0U2l6ZSA9IHtcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBrby51bndyYXAodmFsdWVBY2Nlc3NvcigpKTtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGVsZW1lbnQuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0O1xyXG4gICAgICAgIGVsZW1lbnQud2lkdGggPSB2YWx1ZS53aWR0aDtcclxuICAgIH1cclxufTtcclxuXHJcbmtvLmJpbmRpbmdIYW5kbGVycy5MaW5lRHJhd05hdHVyYWxTaXplID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZUFjY2Vzc29yKCk7XHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICAgICAgICB2YWx1ZSh7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogZWxlbWVudC5uYXR1cmFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGVsZW1lbnQubmF0dXJhbEhlaWdodFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgJChlbGVtZW50KS5vbignbG9hZCcsIHVwZGF0ZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5rby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXcgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKSxcclxuICAgICAgICAgICAgY3R4ID0gZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpLFxyXG4gICAgICAgICAgICAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgJGVsZW1lbnQub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gKGUucGFnZVggLSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0KSAvICRlbGVtZW50LndpZHRoKCkgKiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgICAgICAgICAgeSA9IChlLnBhZ2VZIC0gJGVsZW1lbnQub2Zmc2V0KCkudG9wKSAvICRlbGVtZW50LmhlaWdodCgpICogZWxlbWVudC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZHJhdyhlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGVuID0gcGFyc2VJbnQoJGVsZW1lbnQuZGF0YSgncGVuJyksIDEwKSB8fCAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHR4ID0gKGUucGFnZVggLSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0KSAvICRlbGVtZW50LndpZHRoKCkgKiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5ID0gKGUucGFnZVkgLSAkZWxlbWVudC5vZmZzZXQoKS50b3ApIC8gJGVsZW1lbnQuaGVpZ2h0KCkgKiBlbGVtZW50LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8odHgsIHR5KTtcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoMjU1LDAsMCknO1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHBlbjtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lQ2FwID0gJ3JvdW5kJztcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8odHgsIHR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoJ21vdXNlbW92ZScsIGRyYXcpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKCdtb3VzZXVwJywgZW5kKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlKGVsZW1lbnQudG9EYXRhVVJMKCdpbWFnZS9wbmcnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ21vdXNlbW92ZScsIGRyYXcpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vbignbW91c2V1cCcsIGVuZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGtvLnVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpLFxyXG4gICAgICAgICAgICBjdHggPSBlbGVtZW50LmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBlbGVtZW50LndpZHRoLCBlbGVtZW50LmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxua28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3UGVuID0ge1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGtvLnVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpLFxyXG4gICAgICAgICAgICAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgJGVsZW1lbnQuZGF0YSgncGVuJywgdmFsdWUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5zcmMgPSBwYXJhbXMuc3JjO1xyXG4gICAgc2VsZi5wZW4gPSBwYXJhbXMucGVuO1xyXG4gICAgc2VsZi5saW5lID0gcGFyYW1zLmxpbmU7XHJcblxyXG4gICAgc2VsZi5uYXR1cmFsU2l6ZSA9IGtvLm9ic2VydmFibGUoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdsaW5lLWRyYXdlcicsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gcmVxdWlyZSgna25vY2tvdXQnKSwgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxua28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3U2V0U2l6ZSA9IHtcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZUFjY2Vzc29yKCkoKTtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGVsZW1lbnQuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0O1xyXG4gICAgICAgIGVsZW1lbnQud2lkdGggPSB2YWx1ZS53aWR0aDtcclxuICAgIH1cclxufTtcclxuXHJcbmtvLmJpbmRpbmdIYW5kbGVycy5MaW5lRHJhd05hdHVyYWxTaXplID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZUFjY2Vzc29yKCk7XHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICAgICAgICB2YWx1ZSh7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogZWxlbWVudC5uYXR1cmFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGVsZW1lbnQubmF0dXJhbEhlaWdodFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgJChlbGVtZW50KS5vbignbG9hZCcsIHVwZGF0ZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5rby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXcgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKSxcclxuICAgICAgICAgICAgY3R4ID0gZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpLFxyXG4gICAgICAgICAgICAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgJGVsZW1lbnQub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gKGUucGFnZVggLSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0KSAvICRlbGVtZW50LndpZHRoKCkgKiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgICAgICAgICAgeSA9IChlLnBhZ2VZIC0gJGVsZW1lbnQub2Zmc2V0KCkudG9wKSAvICRlbGVtZW50LmhlaWdodCgpICogZWxlbWVudC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZHJhdyhlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGVuID0gcGFyc2VJbnQoJGVsZW1lbnQuZGF0YSgncGVuJyksIDEwKSB8fCAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHR4ID0gKGUucGFnZVggLSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0KSAvICRlbGVtZW50LndpZHRoKCkgKiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5ID0gKGUucGFnZVkgLSAkZWxlbWVudC5vZmZzZXQoKS50b3ApIC8gJGVsZW1lbnQuaGVpZ2h0KCkgKiBlbGVtZW50LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8odHgsIHR5KTtcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoMjU1LDAsMCknO1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHBlbjtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lQ2FwID0gJ3JvdW5kJztcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8odHgsIHR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoJ21vdXNlbW92ZScsIGRyYXcpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKCdtb3VzZXVwJywgZW5kKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlKGVsZW1lbnQudG9EYXRhVVJMKCdpbWFnZS9wbmcnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ21vdXNlbW92ZScsIGRyYXcpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vbignbW91c2V1cCcsIGVuZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy92YXIgJHJlc2V0QnV0dG9uID0gJCgkZWxlbWVudC5wcmV2KCkpLnByZXYoKTtcclxuICAgICAgICAkZWxlbWVudC5vbignY29udGV4dG1lbnUnLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgZWxlbWVudC53aWR0aCwgZWxlbWVudC5oZWlnaHQpO1xyXG4gICAgICAgICAgICB2YWx1ZSh1bmRlZmluZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxua28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3UGVuID0ge1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKSxcclxuICAgICAgICAgICAgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgICRlbGVtZW50LmRhdGEoJ3BlbicsIHZhbHVlKTtcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYuc3JjID0gcGFyYW1zLnNyYztcclxuICAgIHNlbGYucGVuID0gcGFyYW1zLnBlbjtcclxuICAgIHNlbGYubGluZSA9IHBhcmFtcy5saW5lO1xyXG5cclxuICAgIHNlbGYubmF0dXJhbFNpemUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignbGluZS1kcmF3ZXInLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTtcclxuKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGltZyBkYXRhLWJpbmQ9XFxcImF0dHI6IHsgc3JjOiBzcmMgfSwgTGluZURyYXdOYXR1cmFsU2l6ZTogbmF0dXJhbFNpemVcXFwiIGNsYXNzPVxcXCJiYWNrZ3JvdW5kXFxcIiBkcmFnZ2FibGU9XFxcImZhbHNlXFxcIj5cXHJcXG48Y2FudmFzIGlkID0gXFxcImNhbnZhc1xcXCIgZGF0YS1iaW5kPVxcXCJMaW5lRHJhdzogbGluZSwgTGluZURyYXdTZXRTaXplOiBuYXR1cmFsU2l6ZSwgTGluZURyYXdQZW46IHBlblxcXCI+PC9jYW52YXM+XFxyXFxuXFxyXFxuXCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMTcvMDUvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcbiAgICAvL1FVRVNUSSBFUlJPUiBJTiBSRUFMVEEnIFNPTk8gQklOREFUSSBBIERFSSBDT1NJIEhUTUwhISEgVkVESSBMJ0VTRU1QSU8gS09cclxuICAgIHNlbGYudXNlcm5hbWUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLnVzZXJuYW1lRXJyb3IgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLnVzZXJuYW1lLnN1YnNjcmliZShmdW5jdGlvbigpe1xyXG4gICAgICAgIHNlbGYudXNlcm5hbWVFcnJvcih1bmRlZmluZWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZi5wYXNzd29yZCA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYucGFzc3dvcmRFcnJvciA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZWxmLnNob3VsZFNob3dNZXNzYWdlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICBzZWxmLmVycm9yTWVzc2FnZSA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZWxmLmxvZ2luID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMubG9naW4ubG9naW4oXHJcbiAgICAgICAgICAgIHNlbGYudXNlcm5hbWUoKSxcclxuICAgICAgICAgICAgc2VsZi5wYXNzd29yZCgpXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy9hbGVydChcIlN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEFwaVRva2VuKHJlc3VsdC50b2tlbik7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiSE8gU0VUVEFUTyBBUEkgVE9LRU5cIik7XHJcbiAgICAgICAgICAgIC8qZm9yKHZhciB4IGluIGN0eCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4ICsgXCIgXCIgK2N0eFt4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3R4LnVwZGF0ZVN0YXR1c0xvZ2dlZCgpO1xyXG4gICAgICAgICAgICBjdHgudXBkYXRlU3RhdHVzTG9nZ2VkKCk7Ki9cclxuICAgICAgICAgICAgLy9hbGVydChjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBcGlUb2tlbigpKTtcclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9ICcvVXNlckhvbWUnO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JcIik7XHJcbiAgICAgICAgICAgIHNlbGYuc2hvdWxkU2hvd01lc3NhZ2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNlbGYuZXJyb3JNZXNzYWdlKFwiIFwiICtlLmVycm9ycy5lcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5cclxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2xvZy1pbicsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdi1iYXIgcGFyYW1zID0gXFxcInJlcG9zaXRvcmllczogcmVwb3NpdG9yaWVzXFxcIj48L25hdi1iYXI+XFxyXFxuPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBzdHlsZSA9IFxcXCJtYXJnaW46IGF1dG9cXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiID5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgIDxoMSBzdHlsZSA9IFxcXCJwYWRkaW5nLWJvdHRvbToxZW07IHRleHQtYWxpZ246IGNlbnRlclxcXCI+RmlsbCBpbiBZb3VyIENyZWRlbnRpYWxzIHRvIExvZy1pbjwvaDE+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NhYmxlIGZhZGUgaW5cXFwiIGRhdGEtYmluZCA9IFxcXCJ2aXNpYmxlOiBzaG91bGRTaG93TWVzc2FnZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJhbGVydFxcXCIgYXJpYS1sYWJlbD1cXFwiY2xvc2VcXFwiPiZ0aW1lczs8L2E+XFxyXFxuICAgICAgICAgICAgICAgIDxzdHJvbmc+V2FybmluZyE8L3N0cm9uZz48c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDplcnJvck1lc3NhZ2VcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8Zm9ybSBjbGFzcz1cXFwiZm9ybS1ob3Jpem9udGFsXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTJcXFwiIGZvciA9IFxcXCJ1c2VybmFtZVxcXCI+VXNlcm5hbWU6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkID0gXFxcInVzZXJuYW1lXFxcIiBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgeW91ciBVc2VybmFtZVxcXCIgcmVxdWlyZWQgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDogdXNlcm5hbWVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tMlxcXCIgZm9yPVxcXCJwd2QxXFxcIj5QYXNzd29yZDo8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJwd2QxXFxcIiBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgcGFzc3dvcmRcXFwiIHJlcXVpcmVkIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6IHBhc3N3b3JkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tb2Zmc2V0LTIgY29sLXNtLTEwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiBsb2dpblxcXCI+TG9naW48L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Zvcm0+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG48aDE+TUFOQ0EgR0VTVElPTkUgREVMIFNVQ0NFU1NPPC9oMT5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAyNC8wNS8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcclxuXHJcbmZ1bmN0aW9uIFZpZXdNb2RlbChjdHgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYucmVwb3NpdG9yaWVzID0gY3R4LnJlcG9zaXRvcmllcztcclxuICAgIHNlbGYuc2hvdWxkU2hvd01lc3NhZ2UgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICAgIHNlbGYuZXJyb3JNZXNzYWdlID0ga28ub2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHNlbGYubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFsZXJ0KFwiU1RvIHBlciBlbGltaW5hcmU6IFwiK2N0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEFwaVRva2VuKCkpO1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMubG9nb3V0LmxvZ291dChcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXBpVG9rZW4oKVxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2Vzc29cIik7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmRlbGV0ZUFwaVRva2VuKCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIi9cIjtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yZVwiKTtcclxuICAgICAgICAgICAgZm9yKCB2YXIgeCBpbiBlLmpxWEhSKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlLmpxWEhSW3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnNob3VsZFNob3dNZXNzYWdlKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdsb2ctb3V0Jywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbFxyXG4gICAgfSk7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tOFxcXCI+XFxyXFxuICAgICAgICAgICAgPGgxIHN0eWxlID0gXFxcInBhZGRpbmctYm90dG9tOjFlbTsgdGV4dC1hbGlnbjogY2VudGVyXFxcIj5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gbG9nb3V0PzwvaDE+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NhYmxlIGZhZGUgaW5cXFwiIGRhdGEtYmluZCA9IFxcXCJ2aXNpYmxlOiBzaG91bGRTaG93TWVzc2FnZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJhbGVydFxcXCIgYXJpYS1sYWJlbD1cXFwiY2xvc2VcXFwiPiZ0aW1lczs8L2E+XFxyXFxuICAgICAgICAgICAgICAgIDxzdHJvbmc+V2FybmluZyE8L3N0cm9uZz48c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDplcnJvck1lc3NhZ2VcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzID0gXFxcInJvd1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTNcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtYmluZCA9IFxcXCJjbGljazogbG9nb3V0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiByb2xlPVxcXCJidXR0b25cXFwiIHN0eWxlID0gXFxcInRleHQtYWxpZ246Y2VudGVyO1xcXCI+IFllcyA8L2E+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtYmluZCA9IFxcXCJwYXRoOiAnL1VzZXJIb21lJ1xcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgcm9sZT1cXFwiYnV0dG9uXFxcIiBzdHlsZSA9IFxcXCJ0ZXh0LWFsaWduOmNlbnRlcjtcXFwiPiBObyA8L2E+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0zXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Zvcm0+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAxNy8wNi8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSwgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTsvLyByb3V0ZXIgPSByZXF1aXJlKCdrby1jb21wb25lbnQtcm91dGVyJyk7XHJcblxyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IHBhcmFtLnJlcG9zaXRvcmllcztcclxuICAgIHNlbGYuc3RhdHVzTG9nZ2VkID0gcGFyYW0ucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBcGlUb2tlbigpO1xyXG4gICAgLypcclxuICAgIHNlbGYuc3RhdHVzTG9nZ2VkID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKVxyXG4gICAgICAgIHsgcmV0dXJuIHBhcmFtLnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXBpVG9rZW4oKTt9KTsqL1xyXG4gICAgLy9zZWxmLnN0YXR1c0xvZ2dlZCA9IHBhcmFtLnN0YXR1c0xvZ2dlZDtcclxuICAgIC8va28uY29tcHV0ZWQoZnVuY3Rpb24oKXtyZXR1cm4gcGFyYW0uc3RhdHVzTG9nZ2VkO30pO1xyXG59XHJcblxyXG4vKlxyXG5rby5iaW5kaW5nSGFuZGxlcnMucmVwb3NpdG9yaWVzID0ge1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3Msdmlld01vZGVsLGJpbmRpbmdDb250ZXh0KSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVBY2Nlc3NvcigpLFxyXG4gICAgICAgICAgICAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgJGVsZW1lbnQuZGF0YSgncmVwb3NpdG9yaWVzJywgdmFsdWUpO1xyXG4gICAgfVxyXG59O1xyXG4qL1xyXG5cclxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ25hdi1iYXInLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYgY2xhc3M9XFxcIm5hdmJhciBuYXZiYXItaW52ZXJzZVxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbnRhaW5lci1mbHVpZFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJuYXZiYXItaGVhZGVyXFxcIj5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwibmF2YmFyLWJyYW5kXFxcIiBocmVmID0gXFxcIiNcXFwiID5Dcm93ZHNvdXJjaW5nIENhbXBhaWduczwvYT4gPCEtLWRhdGEtYmluZCA9IFxcXCJwYXRoOiAnLydcXFwiLS0+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDx1bCBjbGFzcyA9IFxcXCJuYXYgbmF2YmFyLW5hdiBuYXZiYXItbGVmdFxcXCI+XFxyXFxuICAgICAgICAgICAgPGxpIGRhdGEtYmluZCA9IFxcXCJwYXRoOicvVXNlckhvbWUnLCBpZjogc3RhdHVzTG9nZ2VkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1iaW5kID0gXFxcInBhdGg6ICcvVXNlckhvbWUnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzID0gXFxcImdseXBoaWNvbiBnbHlwaGljb24taG9tZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgSG9tZVxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICAgICAgPC9saT5cXHJcXG4gICAgICAgIDwvdWw+XFxyXFxuICAgICAgICA8dWwgY2xhc3M9XFxcIm5hdiBuYXZiYXItbmF2IG5hdmJhci1yaWdodFxcXCI+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPGxpIGRhdGEtYmluZD1cXFwicGF0aDogJy9TaWduVXAnLCBpZm5vdDogc3RhdHVzTG9nZ2VkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1iaW5kPVxcXCJwYXRoOiAnL1NpZ25VcCdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi11c2VyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlNpZ24gVXBcXHJcXG4gICAgICAgICAgICAgICAgPC9hPlxcclxcbiAgICAgICAgICAgIDwvbGk+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPGxpIGRhdGEtYmluZCA9XFxcInBhdGg6ICcvTG9nSW4nLCBpZm5vdDogc3RhdHVzTG9nZ2VkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1iaW5kPVxcXCJwYXRoOiAnL0xvZ0luJ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWxvZy1pblxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4gTG9naW5cXHJcXG4gICAgICAgICAgICAgICAgPC9hPlxcclxcbiAgICAgICAgICAgIDwvbGk+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPGxpIGRhdGEtYmluZCA9XFxcInBhdGg6ICcvTG9nT3V0JywgaWY6IHN0YXR1c0xvZ2dlZFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYmluZD1cXFwicGF0aDogJy9Mb2dPdXQnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tbG9nLW91dFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4gTG9nb3V0XFxyXFxuICAgICAgICAgICAgICAgIDwvYT5cXHJcXG4gICAgICAgICAgICA8L2xpPlxcclxcbiAgICAgICAgPC91bD5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9uYXY+XCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMDMvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcbiAgICBzZWxmLnByb2NlZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRTdWNjZXNzTmV4dCgpO1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmRlbGV0ZVN1Y2Nlc3NOZXh0KCk7XHJcbiAgICAgICAgbG9jYXRpb24uaGFzaCA9IHRlbXA7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3Rlcignb3BlcmF0aW9uLXN1Y2Nlc3MnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdi1iYXIgcGFyYW1zID0gXFxcInJlcG9zaXRvcmllczogcmVwb3NpdG9yaWVzXFxcIj48L25hdi1iYXI+XFxyXFxuPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBzdHlsZSA9IFxcXCJtYXJnaW46IGF1dG9cXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiID5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgIDxoMSBzdHlsZSA9IFxcXCJwYWRkaW5nLWJvdHRvbToxZW07IHRleHQtYWxpZ246IGNlbnRlclxcXCI+U3VjY2VzcyEgVGhlIG9wZXJhdGlvbiBoYXMgYmVlbiBjb3JyZWN0bHkgY2FycmllZCBvdXQ8L2gxPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwicm93XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tNlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6IHByb2NlZWRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlByb2NlZWQ8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTRcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMjQvMDUvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdzaWduLXVwLW91dGNvbWUtcCcsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYtYmFyIHBhcmFtcyA9IFxcXCJyZXBvc2l0b3JpZXM6IHJlcG9zaXRvcmllc1xcXCI+PC9uYXYtYmFyPlxcclxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgc3R5bGUgPSBcXFwibWFyZ2luOiBhdXRvXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIiA+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICA8aDEgc3R5bGUgPSBcXFwicGFkZGluZy1ib3R0b206MWVtOyB0ZXh0LWFsaWduOiBjZW50ZXJcXFwiPkNvbmdyYXR1bGF0aW9ucywgdGhlIHNpZ24tdXAgcHJvY2VkdXJlIHN1Y2NlZGVkITwvaDE+XFxyXFxuICAgICAgICAgICAgPHAgc3R5bGUgPSBcXFwidGV4dC1hbGlnbjpjZW50ZXI7IHBhZGRpbmctYm90dG9tOjAuNWVtXFxcIj5Ob3cgeW91IGNhbiBMb2dpbjwvcD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDE3LzA1LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKGN0eCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5yZXBvc2l0b3JpZXMgPSBjdHgucmVwb3NpdG9yaWVzO1xyXG5cclxuXHJcbiAgICBzZWxmLmZ1bGxuYW1lID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5mdWxsbmFtZUVycm9yID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5mdWxsbmFtZS5zdWJzY3JpYmUoZnVuY3Rpb24oKXtcclxuICAgICAgICBzZWxmLmZ1bGxuYW1lRXJyb3IodW5kZWZpbmVkKTtcclxuICAgIH0pO1xyXG4gICAgLy9RVUVTVEkgRVJST1IgSU4gUkVBTFRBJyBTT05PIEJJTkRBVEkgQSBERUkgQ09TSSBIVE1MISEhIFZFREkgTCdFU0VNUElPIEtPXHJcbiAgICBzZWxmLnVzZXJuYW1lID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi51c2VybmFtZUVycm9yID0ga28ub2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHNlbGYucGFzc3dvcmQxID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5wYXNzd29yZDFFcnJvciA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICAvKnNlbGYucGFzc3dvcmQyID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5wYXNzd29yZDJFcnJvciA9IGtvLm9ic2VydmFibGUoKTsqL1xyXG5cclxuICAgIHNlbGYucm9sZSA9IGtvLm9ic2VydmFibGUoXCJtYXN0ZXJcIik7XHJcbiAgICBzZWxmLnJvbGVFcnJvciA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZWxmLnNob3VsZFNob3dNZXNzYWdlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICBzZWxmLmVycm9yTWVzc2FnZSA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG5cclxuICAgIHNlbGYudmFsaWRhdGVBbmRTZW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnNpZ251cC52YWxpZGF0ZUFuZFNlbmQoXHJcbiAgICAgICAgICAgICAgICBzZWxmLmZ1bGxuYW1lKCksXHJcbiAgICAgICAgICAgICAgICBzZWxmLnVzZXJuYW1lKCksXHJcbiAgICAgICAgICAgICAgICBzZWxmLnBhc3N3b3JkMSgpLFxyXG4gICAgICAgICAgICAgICAgc2VsZi5yb2xlKClcclxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiTWVzc2FnZ2lvIGludmlhdG8sIHJpc3Bvc3RhIHJpY2V2dXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzdWx0KTsvL3VuZGVmaW5lZD8/P1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiL1NpZ25VcE91dGNvbWVQXCI7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNob3VsZFNob3dNZXNzYWdlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5lcnJvck1lc3NhZ2UucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgaW4gZS5lcnJvcnMuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmVycm9yTWVzc2FnZS5wdXNoKFwiIFwiK2kgK1wiOiBcIiArZS5lcnJvcnMuZXJyb3JbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgIGlmIChlLmVycm9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qc2VsZi51c2VybmFtZUVycm9yKGUuZXJyb3JzLnVzZXJuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGxuYW1lRXJyb3IoZS5lcnJvcnMuZnVsbG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucm9sZUVycm9yKGUuZXJyb3JzLnJvbGUpOyovXHJcbiAgICAgICAgICAgICAgICAvKn0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJvcmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvL31cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdzaWduLXVwJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbFxyXG4gICAgfSk7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tOFxcXCI+XFxyXFxuICAgICAgICAgICAgPGgxIHN0eWxlID0gXFxcInBhZGRpbmctYm90dG9tOjFlbTsgdGV4dC1hbGlnbjogY2VudGVyXFxcIj5GaWxsIFRoZXNlIEZvcm1zIHRvIEdldCBTdGFydGVkPC9oMT5cXHJcXG4gICAgICAgICAgICA8Zm9ybSBkYXRhLWJpbmQ9XFxcInN1Ym1pdDogdmFsaWRhdGVBbmRTZW5kXFxcIiBjbGFzcz1cXFwiZm9ybS1ob3Jpem9udGFsXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NhYmxlIGZhZGUgaW5cXFwiIGRhdGEtYmluZCA9IFxcXCJ2aXNpYmxlOiBzaG91bGRTaG93TWVzc2FnZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtZGlzbWlzcz1cXFwiYWxlcnRcXFwiIGFyaWEtbGFiZWw9XFxcImNsb3NlXFxcIj4mdGltZXM7PC9hPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHVsIGRhdGEtYmluZCA9IFxcXCJmb3JlYWNoOiBlcnJvck1lc3NhZ2VcXFwiIHN0eWxlID0gXFxcImxpc3Qtc3R5bGUtdHlwZTpub25lXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+V2FybmluZyE8L3N0cm9uZz48c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDokZGF0YVxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTJcXFwiIGZvciA9IFxcXCJmdWxsbmFtZVxcXCI+RnVsbCBOYW1lOjwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBpZCA9IFxcXCJmdWxsbmFtZVxcXCIgcGxhY2Vob2xkZXI9XFxcIkVudGVyIHlvdXIgRnVsbCBOYW1lXFxcIiByZXF1aXJlZCBkYXRhLWJpbmQgPSBcXFwidGV4dElucHV0OmZ1bGxuYW1lXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTJcXFwiIGZvciA9IFxcXCJ1c2VybmFtZVxcXCI+VXNlcm5hbWU6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkID0gXFxcInVzZXJuYW1lXFxcIiBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgeW91ciBVc2VybmFtZVxcXCIgcmVxdWlyZWQgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDp1c2VybmFtZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1zbS0yXFxcIiBmb3I9XFxcInB3ZDFcXFwiPlBhc3N3b3JkOjwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJwYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcInB3ZDFcXFwiIHBsYWNlaG9sZGVyPVxcXCJFbnRlciBwYXNzd29yZFxcXCIgcmVxdWlyZWQgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDpwYXNzd29yZDFcXFwiIG1pbmxlbmd0aCA9IFxcXCI2XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPCEtLSBQRVIgT1JBIE5PTiBDT01QTElDQVJUSSBMQSBWSVRBIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1zbS0yXFxcIiBmb3I9XFxcInB3ZDJcXFwiPkNvbmZpcm0geW91ciBQYXNzd29yZDo8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJwd2QyXFxcIiBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgcGFzc3dvcmRcXFwiIHJlcXVpcmVkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tMlxcXCI+Um9sZTo8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcInJhZGlvLWlubGluZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJyYWRpb1xcXCIgbmFtZT1cXFwicm9sZVxcXCIgdmFsdWUgPSBcXFwibWFzdGVyXFxcIiBkYXRhLWJpbmQgPSBcXFwiY2hlY2tlZDogcm9sZVxcXCIgPk1hc3RlclxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJyYWRpby1pbmxpbmVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwicmFkaW9cXFwiIG5hbWU9XFxcInJvbGVcXFwiICB2YWx1ZSA9IFxcXCJ3b3JrZXJcXFwiIGRhdGEtYmluZCA9IFxcXCJjaGVja2VkOiByb2xlXFxcIj5Xb3JrZXJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS1vZmZzZXQtMiBjb2wtc20tMTBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBpZCA9IFxcXCJzdWJtaXRcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazpcXFwiPlN1Ym1pdDwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZm9ybT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcblwiO1xuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDEyLzA2LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKGN0eCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5yZXBvc2l0b3JpZXMgPSBjdHgucmVwb3NpdG9yaWVzO1xyXG4gICAgc2VsZi5udW1BdmFpbGFibGUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLm51bUFjY2VwdGVkID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5udW1SZWplY3RlZCA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYubnVtQW5ub3RhdGVkID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5pc1NlbGVjdCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xyXG4gICAgc2VsZi5pc0Fubm90YXRlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcblxyXG4gICAgc2VsZi5nZXRUYXNrU3RhdGlzdGljcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhbGVydChjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50VGFzaygpLnN0YXRpc3RpY3MpO1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudGFza3N0YXRpc3RpY3MuZ2V0VGFza1N0YXRpc3RpY3MoXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50VGFzaygpLnN0YXRpc3RpY3NcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIHNlbGYubnVtQXZhaWxhYmxlKHJlc3VsdC5hdmFpbGFibGUpO1xyXG4gICAgICAgICAgICBzZWxmLm51bUFjY2VwdGVkKHJlc3VsdC5hY2NlcHRlZCk7XHJcbiAgICAgICAgICAgIHNlbGYubnVtUmVqZWN0ZWQocmVzdWx0LnJlamVjdGVkKTtcclxuICAgICAgICAgICAgc2VsZi5udW1Bbm5vdGF0ZWQocmVzdWx0LmFubm90YXRlZCk7XHJcbiAgICAgICAgICAgIChyZXN1bHQuYW5ub3RhdGVkID09PSB1bmRlZmluZWQpP3NlbGYuaXNTZWxlY3QodHJ1ZSk6c2VsZi5pc0Fubm90YXRlKHRydWUpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JcIik7XHJcbiAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuZ2V0VGFza1N0YXRpc3RpY3MoKTtcclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcigndGFzay1zdGF0aXN0aWNzJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbFxyXG4gICAgfSk7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+VGFzayBzdGF0aXN0aWNzPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHA+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyIG9mIGltYWdlczogPHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6bnVtQXZhaWxhYmxlXFxcIj48L3NwYW4+PGJyLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmQgID1cXFwiaWY6aXNTZWxlY3RcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlciBvZiBhY2NlcHRlZCBpbWFnZXM6IDxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0Om51bUFjY2VwdGVkXFxcIj48L3NwYW4+PGJyLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIgb2YgcmVqZWN0ZWQgaW1hZ2VzOiA8c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDpudW1SZWplY3RlZFxcXCI+PC9zcGFuPjxici8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZCA9IFxcXCJpZjppc0Fubm90YXRlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIgb2YgYW5ub3RhdGlvbnM6IDxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0Om51bUFubm90YXRlZFxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAxMy8wNi8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcclxuXHJcbmZ1bmN0aW9uIFZpZXdNb2RlbChjdHgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYucmVwb3NpdG9yaWVzID0gY3R4LnJlcG9zaXRvcmllcztcclxuICAgIHNlbGYudHlwZSA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYuaW1hZ2UgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLnNpemUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLm5leHRUYXNrQXZhaWxhYmxlID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcclxuXHJcbiAgICBzZWxmLmxpbmUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLmxpbmUuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2FsZXJ0KHNlbGYubGluZSgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNlbGYuY2xlYXJBbm5vdGF0aW9uID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBzZWxmLmxpbmUoJycpO1xyXG4gICAgICAgIC8qJChcIiNhbm5vdGF0aW9uXCIpLnJlbW92ZShcIiNsaW5lLWRyYXdlclwiKTtcclxuICAgICAgICBzZWxmLmxpbmUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgJChcIiNhbm5vdGF0aW9uXCIpLmFwcGVuZChcIjxsaW5lLWRyYXdlciBpZCA9ICdsaW5lLWRyYXdlcicgcGFyYW1zPSdzcmM6IGltYWdlLCBwZW46IHNpemUsIGxpbmU6IGxpbmUnPjwvbGluZS1kcmF3ZXI+XCIpOyovXHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuc3RhcnRXb3JraW5nU2Vzc2lvbiA9IGZ1bmN0aW9uIChpc05leHQpIHtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnRhc2t3b3JraW5nc2Vzc2lvbi5zdGFydFdvcmtpbmdTZXNzaW9uKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudFRhc2soKS5zZXNzaW9uXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICBpZihpc05leHQpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5nZXROZXh0VGFza0luc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZihlID09IFwiRXJyb3I6IE5vdCBGb3VuZFwiKXtcclxuICAgICAgICAgICAgICAgIHNlbGYubmV4dFRhc2tBdmFpbGFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFsZXJ0KFwic2Vzc2lvblwiICsgZS50ZXh0U3RhdHVzKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvclwiKTtcclxuICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuc3RhcnRXb3JraW5nU2Vzc2lvbigpO1xyXG5cclxuICAgIHNlbGYuZ2V0TmV4dFRhc2tJbnN0YW5jZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy50YXNrd29ya2luZ3Nlc3Npb24uZ2V0TmV4dFRhc2tJbnN0YW5jZShcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRUYXNrKCkuc2Vzc2lvblxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgc2VsZi50eXBlKHJlc3VsdC50eXBlKTtcclxuICAgICAgICAgICAgc2VsZi5pbWFnZShyZXN1bHQuaW1hZ2UpO1xyXG4gICAgICAgICAgICBzZWxmLnNpemUocmVzdWx0LnNpemUpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmKGUgPT0gXCJFcnJvcjogR29uZVwiKXtcclxuICAgICAgICAgICAgICAgIHNlbGYubmV4dFRhc2tBdmFpbGFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiZ2V0TmV4dFRhc2tcIiArIGUudGV4dFN0YXR1cyk7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHNlbGYuZ2V0TmV4dFRhc2tJbnN0YW5jZSgpO1xyXG5cclxuXHJcbiAgICBzZWxmLnN1Ym1pdEFubm90YXRpb24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHNlbGYubGluZSgpKSB7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudGFza3dvcmtpbmdzZXNzaW9uLnN1Ym1pdEFubm90YXRpb24oXHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRUYXNrKCkuc2Vzc2lvbixcclxuICAgICAgICAgICAgICAgIHNlbGYubGluZSgpXHJcbiAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Ym1pdHRlZFwiKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0TmV4dFRhc2tJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICAgICAgLy9zZWxmLnN0YXJ0V29ya2luZ1Nlc3Npb24odHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbGVydChcIllvdSBjYW5ub3Qgc3VibWl0IGFuIGVtcHR5IGFubm90YXRpb24hXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5yZWplY3RTZWxlY3Rpb24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudGFza3dvcmtpbmdzZXNzaW9uLnN1Ym1pdFNlbGVjdGlvbihcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRUYXNrKCkuc2Vzc2lvbixcclxuICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBhbGVydChcIlN1Ym1pdHRlZFwiKTtcclxuICAgICAgICAgICAgc2VsZi5nZXROZXh0VGFza0luc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIC8vc2VsZi5zdGFydFdvcmtpbmdTZXNzaW9uKHRydWUpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLmFjY2VwdFNlbGVjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy50YXNrd29ya2luZ3Nlc3Npb24uc3VibWl0U2VsZWN0aW9uKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudFRhc2soKS5zZXNzaW9uLFxyXG4gICAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTdWJtaXR0ZWRcIik7XHJcbiAgICAgICAgICAgIHNlbGYuZ2V0TmV4dFRhc2tJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICAvL3NlbGYuc3RhcnRXb3JraW5nU2Vzc2lvbih0cnVlKTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yXCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcigndGFzay13b3JraW5nLXNlc3Npb24nLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYtYmFyIHBhcmFtcyA9IFxcXCJyZXBvc2l0b3JpZXM6IHJlcG9zaXRvcmllc1xcXCI+PC9uYXYtYmFyPlxcclxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgc3R5bGUgPSBcXFwibWFyZ2luOiBhdXRvXFxcIj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIiA+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLThcXFwiIGRhdGEtYmluZCA9IFxcXCJpZjpuZXh0VGFza0F2YWlsYWJsZVxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtcHJpbWFyeVxcXCIgPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIiBkYXRhLWJpbmQgPSBcXFwidGV4dDp0eXBlXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtYmluZCA9IFxcXCJpZm5vdDpzaXplXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGRhdGEtYmluZCA9IFxcXCJhdHRyIDoge3NyYyA6IGltYWdlfVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcyA9IFxcXCJidG4gYnRuLXByaW1hcnlcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogcmVqZWN0U2VsZWN0aW9uXFxcIj5SZWplY3Q8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzID0gXFxcImJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiBhY2NlcHRTZWxlY3Rpb25cXFwiPkFjY2VwdDwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkID0gXFxcImFubm90YXRpb25cXFwiIGRhdGEtYmluZCA9IFxcXCJpZjpzaXplXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGluZS1kcmF3ZXIgaWQgPSBcXFwibGluZS1kcmF3ZXJcXFwiIHBhcmFtcz1cXFwic3JjOiBpbWFnZSwgcGVuOiBzaXplLCBsaW5lOiBsaW5lXFxcIj48L2xpbmUtZHJhd2VyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcInB1bGwtcmlnaHQgYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6IHN1Ym1pdEFubm90YXRpb25cXFwiPlN1Ym1pdDwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcInB1bGwtcmlnaHQgYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6IGNsZWFyQW5ub3RhdGlvblxcXCI+Q2xlYXI8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tOFxcXCIgZGF0YS1iaW5kID0gXFxcImlmbm90Om5leHRUYXNrQXZhaWxhYmxlXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLXByaW1hcnlcXFwiID5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5Zb3UgY29tcGxldGVkIHlvdXIgdGFzayE8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgQ29uZ3JhdHVsYXRpb25zISBZb3UgY29tcGxldGVkIHlvdXIgdGFzaywgbm8gbW9yZSBpbWFnZXMgYXJlIGF2YWlsYWJsZSBmb3IgdGhpcyB0YXNrISBSZXR1cm4gdG8gPGEgZGF0YS1iaW5kID0gXFxcInBhdGg6Jy9Vc2VySG9tZSdcXFwiPiB5b3VyIHBlcnNvbmFsIGhvbWVwYWdlPC9hPi5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMjQvMDUvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcbiAgICBzZWxmLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHNlbGYuZWRpdFVzZXJTdHJpbmcgPSBrby5vYnNlcnZhYmxlKFwiRWRpdCBVc2VyIEluZm9cIik7XHJcbiAgICAvL1FVRVNUSSBFUlJPUiBJTiBSRUFMVEEnIFNPTk8gQklOREFUSSBBIERFSSBDT1NJIEhUTUwhISEgVkVESSBMJ0VTRU1QSU8gS09cclxuICAgIHNlbGYudXNlcm5hbWUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLmZ1bGxuYW1lID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5yb2xlID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5pc1VzZXJNYXN0ZXIgPSBrby5vYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgc2VsZi5yZWFkeUNhbXBhaWduc0F2YWlsYWJsZSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xyXG4gICAgc2VsZi5yZWFkeUNhbXBhaWducyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG4gICAgc2VsZi5zdGFydGVkQ2FtcGFpZ25zQXZhaWxhYmxlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICBzZWxmLnN0YXJ0ZWRDYW1wYWlnbnMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuICAgIHNlbGYuZW5kZWRDYW1wYWlnbnNBdmFpbGFibGUgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICAgIHNlbGYuZW5kZWRDYW1wYWlnbnMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuXHJcbiAgICBzZWxmLm5ld3Bhc3N3b3JkID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5uZXdmdWxsbmFtZSA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZWxmLnNob3VsZFNob3dFcnJvck1lc3NhZ2UgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICAgIHNlbGYuZXJyb3JNZXNzYWdlID0ga28ub2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHNlbGYuc2hvdWxkU2hvd1N1Y2Nlc3NNZXNzYWdlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICBzZWxmLnN1Y2Nlc3NNZXNzYWdlID0ga28ub2JzZXJ2YWJsZSgpO1xyXG5cclxuXHJcbiAgICBzZWxmLnRhc2tzQXZhaWxhYmxlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICBzZWxmLnRhc2tzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XHJcblxyXG4gICAgc2VsZi5nZXRVc2VySW5mbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUuZ2V0VXNlckluZm8oXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgc2VsZi51c2VybmFtZShyZXN1bHQudXNlcm5hbWUpO1xyXG4gICAgICAgICAgICBzZWxmLnJvbGUocmVzdWx0LnR5cGUpO1xyXG4gICAgICAgICAgICBzZWxmLmZ1bGxuYW1lKHJlc3VsdC5mdWxsbmFtZSk7XHJcbiAgICAgICAgICAgIHNlbGYuaXNVc2VyTWFzdGVyKChyZXN1bHQudHlwZSA9PSBcIm1hc3RlclwiKT90cnVlOmZhbHNlKTtcclxuICAgICAgICAgICAgKHJlc3VsdC50eXBlID09IFwibWFzdGVyXCIpP3NlbGYuZ2V0VXNlckNhbXBhaWducygpIDogc2VsZi5nZXRUYXNrc0luZm8oKTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBzZWxmLmdldFVzZXJJbmZvKCk7XHJcblxyXG4gICAgc2VsZi5nZXRUYXNrc0luZm8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUuZ2V0VGFza3NJbmZvKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKVxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwic3VjY2Vzc28gdGFza3NJbmZvXCIpO1xyXG4gICAgICAgICAgICBzZWxmLnRhc2tzKHJlc3VsdC50YXNrcyk7XHJcbiAgICAgICAgICAgIHNlbGYudGFza3NBdmFpbGFibGUoKHNlbGYudGFza3MoKS5sZW5ndGggPiAwKT90cnVlOmZhbHNlKTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi53b3JrVGFzayA9IGZ1bmN0aW9uKHRhc2spe1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUuZ2V0VGFza0luZm8oXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICB0YXNrLmlkXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuc2V0Q3VycmVudFRhc2socmVzdWx0KTtcclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiL1dvcmtpbmdTZXNzaW9uVGFza1wiO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLmdldFRhc2tTdGF0aXN0aWNzID0gZnVuY3Rpb24odGFzayl7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy51c2VyaG9tZS5nZXRUYXNrSW5mbyhcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgIHRhc2suaWRcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5zZXRDdXJyZW50VGFzayhyZXN1bHQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvVGFza1N0YXRpc3RpY3NcIjtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHNlbGYuZWRpdFVzZXJJbmZvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFsZXJ0KFwiQ2hpYW1vIGVkaXRVc2VySW5mb1wiKTtcclxuICAgICAgICBhbGVydChzZWxmLm5ld3Bhc3N3b3JkKCkpO1xyXG4gICAgICAgIGFsZXJ0KHNlbGYubmV3ZnVsbG5hbWUoKSk7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy51c2VyaG9tZS5lZGl0VXNlckluZm8oXHJcbiAgICAgICAgICAgIHNlbGYubmV3ZnVsbG5hbWUoKSxcclxuICAgICAgICAgICAgc2VsZi5uZXdwYXNzd29yZCgpLFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKVxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2Vzc28gRWRpdCBEYXRpIHV0ZW50ZVwiKTtcclxuICAgICAgICAgICAgc2VsZi5zaG91bGRTaG93U3VjY2Vzc01lc3NhZ2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIGFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHNlbGYuc3VjY2Vzc01lc3NhZ2UoKTtcclxuICAgICAgICAgICAgLy9zdWNjZXNzTWVzc2FnZSgpOyAvL0B0b2RvLCBjYXBpdG8gY29zYSDDqCByZXN1bHQgdmVkaSBjb21lIHNjcml2aSBpbCBtZXNzYWdnaW9cclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkZhbGxpdG8gRWRpdCBcIik7XHJcbiAgICAgICAgICAgIHNlbGYuc2hvdWxkU2hvd0Vycm9yTWVzc2FnZSh0cnVlKTtcclxuICAgICAgICAgICAgdmFyIHRlbXBTdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgZm9yKHZhciB4IGluIGUuZXJyb3JzLmVycm9yKXtcclxuICAgICAgICAgICAgICAgIHRlbXBTdHJpbmcgKz0geCArIFwiOiBcIitlLmVycm9ycy5lcnJvclt4XSArIFwiLiBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmVycm9yTWVzc2FnZSh0ZW1wU3RyaW5nKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5nZXRVc2VyQ2FtcGFpZ25zID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnVzZXJob21lLmdldFVzZXJDYW1wYWlnbnMoXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy9hbGVydChcIlN1Y2Nlc3NvIENhbXBhZ25hXCIpO1xyXG4gICAgICAgICAgICAvL3ZhciB0ZW1wID0gSlNPTi5wYXJzZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAvKmFsZXJ0KFwiU3VjY2Vzc28gUGFyc2VcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KHJlc3VsdCk7Ly9yaXRvcm5hIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gcmVzdWx0LmNhbXBhaWducyl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4K1wiXCIrcmVzdWx0LmNhbXBhaWduc1t4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5lbmRlZENhbXBhaWducyhbXSk7XHJcbiAgICAgICAgICAgIHNlbGYuc3RhcnRlZENhbXBhaWducyhbXSk7XHJcbiAgICAgICAgICAgIHNlbGYucmVhZHlDYW1wYWlnbnMoW10pOyovXHJcbiAgICAgICAgICAgIGFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIGlmKCEocmVzdWx0ID09PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4IGluIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHJlc3VsdC5jYW1wYWlnbnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEocmVzdWx0LmNhbXBhaWduc1t4XSA9PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzdWx0LmNhbXBhaWduc1t4XS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRlZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW5kZWRDYW1wYWlnbnMoKS5wdXNoKHJlc3VsdC5jYW1wYWlnbnNbeF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiZW5kZWQgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInN0YXJ0ZWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0ZWRDYW1wYWlnbnMoKS5wdXNoKHJlc3VsdC5jYW1wYWlnbnNbeF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwic3RhcnRlZCBhdmFpbGFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVhZHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsZXJ0KHJlc3VsdC5jYW1wYWlnbnNbeF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVhZHlDYW1wYWlnbnMoKS5wdXNoKHJlc3VsdC5jYW1wYWlnbnNbeF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxlcnQoJ1RoZSBsZW5ndGggb2YgdGhlIGFycmF5IGlzICcgKyBzZWxmLnJlYWR5Q2FtcGFpZ25zKCkubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcInJlYWR5IGF2YWlsYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJvcmUgc3dpdGNoIGNhbXBhZ25hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFsZXJ0KHNlbGYuZW5kZWRDYW1wYWlnbnMoKS5sZW5ndGggKyBcImVuZGVkXCIpO1xyXG4gICAgICAgICAgICBhbGVydChzZWxmLnN0YXJ0ZWRDYW1wYWlnbnMoKS5sZW5ndGggKyBcInN0YXJ0ZWRcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KHNlbGYucmVhZHlDYW1wYWlnbnMoKS5sZW5ndGggKyBcInJlYWR5XCIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5lbmRlZENhbXBhaWduc0F2YWlsYWJsZShzZWxmLmVuZGVkQ2FtcGFpZ25zKCkubGVuZ3RoPjA/dHJ1ZTpmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0ZWRDYW1wYWlnbnNBdmFpbGFibGUoc2VsZi5zdGFydGVkQ2FtcGFpZ25zKCkubGVuZ3RoPjA/dHJ1ZTpmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlYWR5Q2FtcGFpZ25zQXZhaWxhYmxlKHNlbGYucmVhZHlDYW1wYWlnbnMoKS5sZW5ndGg+MD90cnVlOmZhbHNlKTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkZhbGxpdG9cIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8vc2VsZi5nZXRVc2VyQ2FtcGFpZ25zKCk7IC8vaW1wb3J0YW50OiBjYWxscyBpdFxyXG5cclxuICAgIHNlbGYuYWRkQ2FtcGFpZ24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIi9BZGRDYW1wYWlnblwiO1xyXG4gICAgfTtcclxuICAgIHNlbGYuZWRpdEltYWdlcyA9IGZ1bmN0aW9uKGNhbXBhaWduKXtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnVzZXJob21lLmdldENhbXBhaWduSW5mbyhcclxuICAgICAgICAgICAgY2FtcGFpZ24uaWQsXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzbyBHZXRDYW1wYWlnbkluZm9cIik7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEN1cnJlbnRDYW1wYWlnbihyZXN1bHQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvRWRpdEltYWdlc0NhbXBhaWduXCI7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvIEdldENhbXBhaWduSW5mbyBcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcbiAgICBzZWxmLmVkaXRXb3JrZXJzID0gZnVuY3Rpb24oY2FtcGFpZ24pe1xyXG5cclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnVzZXJob21lLmdldENhbXBhaWduSW5mbyhcclxuICAgICAgICAgICAgY2FtcGFpZ24uaWQsXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzbyBHZXRDYW1wYWlnbkluZm9cIik7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEN1cnJlbnRDYW1wYWlnbihyZXN1bHQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvRWRpdFdvcmtlcnNDYW1wYWlnblwiO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRmFsbGl0byBHZXRDYW1wYWlnbkluZm8gXCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBzZWxmLmNhbXBhaWduU3RhdGlzdGljcyA9IGZ1bmN0aW9uKGNhbXBhaWduKXtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnVzZXJob21lLmdldENhbXBhaWduSW5mbyhcclxuICAgICAgICAgICAgY2FtcGFpZ24uaWQsXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzbyBHZXRDYW1wYWlnbkluZm9cIik7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEN1cnJlbnRDYW1wYWlnbihyZXN1bHQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvQ2FtcGFpZ25TdGF0aXN0aWNzXCI7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvIEdldENhbXBhaWduSW5mbyBcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8vJChcIiNlZGl0QnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLFxyXG4gICAgc2VsZi5zZXRFZGl0VXNlckZvcm0gPSBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBpZihzZWxmLnZpc2libGUpIHtcclxuICAgICAgICAgICAgc2VsZi5zaG91bGRTaG93U3VjY2Vzc01lc3NhZ2UoZmFsc2UpO1xyXG4gICAgICAgICAgICBzZWxmLnNob3VsZFNob3dFcnJvck1lc3NhZ2UoZmFsc2UpO1xyXG4gICAgICAgICAgICBzZWxmLm5ld3Bhc3N3b3JkKCcnKTtcclxuICAgICAgICAgICAgc2VsZi5uZXdmdWxsbmFtZSgnJyk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnZpc2libGUgPSAhc2VsZi52aXNpYmxlO1xyXG4gICAgICAgICAgICBzZWxmLmVkaXRVc2VyU3RyaW5nKFwiRWRpdCBVc2VyIEluZm9cIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNlbGYudmlzaWJsZSA9ICFzZWxmLnZpc2libGU7XHJcbiAgICAgICAgICAgIHNlbGYuZWRpdFVzZXJTdHJpbmcoXCJVbmRvIEVkaXQgVXNlciBJbmZvXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0vLyk7XHJcbiAgICBzZWxmLnN0YXJ0Q2FtcGFpZ24gPSBmdW5jdGlvbihjYW1wYWlnbil7XHJcblxyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUuZ2V0Q2FtcGFpZ25JbmZvKFxyXG4gICAgICAgICAgICBjYW1wYWlnbi5pZCxcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKClcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3NvIEdldENhbXBhaWduSW5mb0ZvclN0YXJ0XCIpO1xyXG4gICAgICAgICAgICBhbGVydChcImV4ZWN1dGlvbiBzaG91bGQgYmUgXCIrcmVzdWx0LmV4ZWN1dGlvbik7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUuc3RhcnRDYW1wYWlnbihcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5leGVjdXRpb24sXHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzbyBzdGFydENhbXBhaWduXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVhZHlDYW1wYWlnbnMucmVtb3ZlKGZ1bmN0aW9uKGNhbXBhaWduVGVtcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNhbXBhaWduVGVtcCA9PSBjYW1wYWlnbilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5zdGFydGVkQ2FtcGFpZ25zKCkubGVuZ3RoID09MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0ZWRDYW1wYWlnbnNBdmFpbGFibGUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGFydGVkQ2FtcGFpZ25zLnB1c2goY2FtcGFpZ24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYucmVhZHlDYW1wYWlnbnMoKS5sZW5ndGggPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVhZHlDYW1wYWlnbnNBdmFpbGFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYW1wYWlnblRlbXAgPT0gY2FtcGFpZ247fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLmdldFVzZXJDYW1wYWlnbnMoKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlMSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvIHN0YXJ0Q2FtcGFpZ24gXCIpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZTEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkZhbGxpdG8gR2V0Q2FtcGFpZ25JbmZvRm9yU3RhcnQgXCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZi50ZXJtaW5hdGVDYW1wYWlnbiA9IGZ1bmN0aW9uKGNhbXBhaWduKXtcclxuXHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy51c2VyaG9tZS5nZXRDYW1wYWlnbkluZm8oXHJcbiAgICAgICAgICAgIGNhbXBhaWduLmlkLFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKVxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2Vzc28gR2V0Q2FtcGFpZ25JbmZvRm9yVGVybWluYXRpb25cIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiZXhlY3V0aW9uIHNob3VsZCBiZSBcIityZXN1bHQuZXhlY3V0aW9uKTtcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy51c2VyaG9tZS50ZXJtaW5hdGVDYW1wYWlnbihcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5leGVjdXRpb24sXHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzbyB0ZXJtaW5hdGVDYW1wYWlnblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvVXNlckhvbWVcIjtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGYuZ2V0VXNlckNhbXBhaWducygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRlZENhbXBhaWducy5yZW1vdmUoZnVuY3Rpb24oY2FtcGFpZ25UZW1wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2FtcGFpZ25UZW1wID09IGNhbXBhaWduKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmVuZGVkQ2FtcGFpZ25zKCkubGVuZ3RoID09MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVuZGVkQ2FtcGFpZ25zQXZhaWxhYmxlKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW5kZWRDYW1wYWlnbnMucHVzaChjYW1wYWlnbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5zdGFydGVkQ2FtcGFpZ25zKCkubGVuZ3RoID09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0ZWRDYW1wYWlnbnNBdmFpbGFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYW1wYWlnblRlbXAgPT0gY2FtcGFpZ247fSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZTEpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFsbGl0byB0ZXJtaW5hdGVDYW1wYWlnbiBcIik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRmFsbGl0byBHZXRDYW1wYWlnbkluZm9Gb3JTdGFydCBcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCd1c2VyLWhvbWUnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYtYmFyIHBhcmFtcyA9IFxcXCJyZXBvc2l0b3JpZXM6IHJlcG9zaXRvcmllc1xcXCI+PC9uYXYtYmFyPlxcclxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgc3R5bGUgPSBcXFwibWFyZ2luOiBhdXRvXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIiA+XFxyXFxuICAgICAgICA8IS0tU0hBUkVEIFVTRVIgUFJPRklMRSBNQU5BR0VNRU5UIC0tPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tNFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtcHJpbWFyeVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlVzZXIgUHJvZmlsZTwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxwPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVzZXIgZGF0YTo8YnIvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIEZ1bGxuYW1lOiA8c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDpmdWxsbmFtZVxcXCI+PC9zcGFuPjxici8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgVXNlcm5hbWU6IDxzcGFuICBkYXRhLWJpbmQgPSBcXFwidGV4dDp1c2VybmFtZVxcXCI+PC9zcGFuPjxici8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgUm9sZTogPHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6cm9sZVxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIGRhdGEtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCIgZGF0YS10YXJnZXQ9XFxcIiNlZGl0XFxcIiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6IHNldEVkaXRVc2VyRm9ybVxcXCIgc3R5bGUgPSBcXFwibWFyZ2luLWJvdHRvbTogMC41ZW07XFxcIiA+PHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6IGVkaXRVc2VyU3RyaW5nXFxcIj48L3NwYW4+PC9idXR0b24+XFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJlZGl0XFxcIiBjbGFzcz1cXFwiY29sbGFwc2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzPVxcXCJmb3JtLWhvcml6b250YWxcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tNFxcXCIgZm9yPVxcXCJmdWxsbmFtZVxcXCI+TmV3IEZ1bGwgTmFtZTo8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBpZD1cXFwiZnVsbG5hbWVcXFwiIHBsYWNlaG9sZGVyPVxcXCJOZXcgRnVsbCBOYW1lXFxcIiBkYXRhLWJpbmQgPSBcXFwidmFsdWU6IG5ld2Z1bGxuYW1lXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTRcXFwiIGZvcj1cXFwibmV3cHdkXFxcIj5OZXcgUGFzc3dvcmQ6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJuZXdwd2RcXFwiIHBsYWNlaG9sZGVyPVxcXCJOZXcgUGFzc3dvcmRcXFwiIGRhdGEtYmluZCA9IFxcXCJ2YWx1ZTogbmV3cGFzc3dvcmRcXFwiIG1pbmxlbmd0aCA9IFxcXCI4XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tb2Zmc2V0LTIgY29sLXNtLTEwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiBlZGl0VXNlckluZm9cXFwiPkFwcGx5PC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2FibGUgZmFkZSBpblxcXCIgZGF0YS1iaW5kID0gXFxcInZpc2libGU6IHNob3VsZFNob3dFcnJvck1lc3NhZ2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJhbGVydFxcXCIgYXJpYS1sYWJlbD1cXFwiY2xvc2VcXFwiPiZ0aW1lczs8L2E+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5XYXJuaW5nITwvc3Ryb25nPjxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OmVycm9yTWVzc2FnZVxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NhYmxlIGZhZGUgaW5cXFwiIGRhdGEtYmluZCA9IFxcXCJ2aXNpYmxlOiBzaG91bGRTaG93U3VjY2Vzc01lc3NhZ2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJhbGVydFxcXCIgYXJpYS1sYWJlbD1cXFwiY2xvc2VcXFwiPiZ0aW1lczs8L2E+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5TdWNjZXNzITwvc3Ryb25nPjxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OnN1Y2Nlc3NNZXNzYWdlXFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTFcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPCEtLU1BU1RFUi0tPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tNlxcXCIgZGF0YS1iaW5kID0gXFxcImlmOmlzVXNlck1hc3RlclxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1kZWZhdWx0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIFN0YXJ0ZWQgQ2FtcGFpZ25zXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFxcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiBhZGRDYW1wYWlnblxcXCIgc3R5bGUgPSBcXFwibWFyZ2luLWJvdHRvbTowLjVlbTtcXFwiPjxzcGFuIGNsYXNzID0gXFxcImdseXBoaWNvbiBnbHlwaGljb24tcGx1c1xcXCI+PC9zcGFuPkFkZCBDYW1wYWlnbjwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLWJpbmQgPSBcXFwiaWZub3Q6c3RhcnRlZENhbXBhaWduc0F2YWlsYWJsZVxcXCI+IE5vIFN0YXJ0ZWQgQ2FtcGFpZ25zIGF2YWlsYWJsZSwgYWRkIG9uZS48L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGRhdGEtYmluZCA9IFxcXCJpZjpzdGFydGVkQ2FtcGFpZ25zQXZhaWxhYmxlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+PHRoPkNhbXBhaWduIE5hbWU8L3RoPjx0aD5BY3Rpb25zPC90aD48L3RyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHkgZGF0YS1iaW5kPVxcXCJmb3JlYWNoOiBzdGFydGVkQ2FtcGFpZ25zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OiBuYW1lXFxcIj48L3NwYW4+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGRhdGEtYmluZCA9IFxcXCJjbGljazokcGFyZW50LnRlcm1pbmF0ZUNhbXBhaWduXFxcIj5UZXJtaW5hdGU8L2J1dHRvbj48L3RkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhZHkgQ2FtcGFpZ25zXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGRhdGEtYmluZCA9IFxcXCJpZm5vdDpyZWFkeUNhbXBhaWduc0F2YWlsYWJsZVxcXCI+IE5vIFJlYWR5IENhbXBhaWducyBhdmFpbGFibGUsIGFkZCBvbmUuPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBkYXRhLWJpbmQgPSBcXFwiaWY6cmVhZHlDYW1wYWlnbnNBdmFpbGFibGVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGg+Q2FtcGFpZ24gTmFtZTwvdGg+PHRoPkFjdGlvbnM8L3RoPjwvdHI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IHJlYWR5Q2FtcGFpZ25zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OiBuYW1lXFxcIj48L3NwYW4+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGRhdGEtYmluZCA9IFxcXCJjbGljazogJHBhcmVudC5lZGl0SW1hZ2VzXFxcIj5FZGl0IEltYWdlczwvYnV0dG9uPjwvdGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGJ1dHRvbiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6ICRwYXJlbnQuZWRpdFdvcmtlcnNcXFwiPkVkaXQgV29ya2VyczwvYnV0dG9uPjwvdGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGJ1dHRvbiBkYXRhLWJpbmQgPVxcXCJjbGljazogJHBhcmVudC5zdGFydENhbXBhaWduXFxcIj5TdGFydCE8L2J1dHRvbj48L3RkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgRW5kZWQgQ2FtcGFpZ25zXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGRhdGEtYmluZCA9IFxcXCJpZm5vdDplbmRlZENhbXBhaWduc0F2YWlsYWJsZVxcXCI+IE5vIEVuZGVkIENhbXBhaWducyBhdmFpbGFibGUsIGFkZCBvbmUuPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBkYXRhLWJpbmQgPSBcXFwiaWY6ZW5kZWRDYW1wYWlnbnNBdmFpbGFibGVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGg+Q2FtcGFpZ24gTmFtZTwvdGg+PHRoPkFjdGlvbnM8L3RoPjwvdHI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IGVuZGVkQ2FtcGFpZ25zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OiBuYW1lXFxcIj48L3NwYW4+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGRhdGEtYmluZCA9IFxcXCJjbGljazogJHBhcmVudC5jYW1wYWlnblN0YXRpc3RpY3NcXFwiPlN0YXRpc3RpY3M8L2J1dHRvbj48L3RkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTFcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwhLS1XT1JLRVItLT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTZcXFwiIGRhdGEtYmluZCA9IFxcXCJpZm5vdDppc1VzZXJNYXN0ZXJcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtZGVmYXVsdFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBVc2VyIFRhc2tzXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGRhdGEtYmluZCA9IFxcXCJpZm5vdDp0YXNrc0F2YWlsYWJsZVxcXCI+IE5vIFRhc2tzIGF2YWlsYWJsZSBmb3IgdGhlIHVzZXIuPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBkYXRhLWJpbmQgPSBcXFwiaWY6dGFza3NBdmFpbGFibGVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGg+VGFzazwvdGg+PHRoPkFjdGlvbnM8L3RoPjwvdHI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IHRhc2tzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OiB0eXBlXFxcIj48L3NwYW4+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGRhdGEtYmluZCA9IFxcXCJjbGljazokcGFyZW50LndvcmtUYXNrXFxcIj5TdGFydCBXb3JraW5nPC9idXR0b24+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGRhdGEtYmluZCA9IFxcXCJjbGljazokcGFyZW50LmdldFRhc2tTdGF0aXN0aWNzXFxcIj5TdGF0aXN0aWNzPC9idXR0b24+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xuIiwiLypqc2xpbnQgbm9kZTp0cnVlICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksXHJcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxyXG4gICAgY29tcG9uZW50cyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cycpLFxyXG4gICAgY3JlYXRlUmVwb3NpdG9yaWVzID0gcmVxdWlyZSgnLi9yZXBvc2l0b3JpZXMnKS5jcmVhdGVSZXBvc2l0b3JpZXM7XHJcblxyXG5jb21wb25lbnRzLnJlZ2lzdGVyKCk7XHJcbnZhciByZXBvc2l0b3JpZXMgPSBjcmVhdGVSZXBvc2l0b3JpZXMoJ2h0dHA6Ly9hd3QuaWZtbGVkaXQub3JnJyk7XHJcblxyXG5mdW5jdGlvbiBBcHAoKSB7XHJcbiAgICB0aGlzLnJvdXRlcyA9IHtcclxuICAgICAgICAnLyc6ICdob21lLXBhZ2UnLFxyXG4gICAgICAgICcvU2lnblVwJzonc2lnbi11cCcsXHJcbiAgICAgICAgJy9Mb2dJbic6J2xvZy1pbicsXHJcbiAgICAgICAgJy9TaWduVXBPdXRjb21lUCc6ICdzaWduLXVwLW91dGNvbWUtcCcsXHJcbiAgICAgICAgJy9Vc2VySG9tZSc6J3VzZXItaG9tZScsXHJcbiAgICAgICAgJy9Mb2dvdXQnOidsb2ctb3V0JyxcclxuICAgICAgICAnL0FkZENhbXBhaWduJzonY3JlYXRlLWNhbXBhaWduJyxcclxuICAgICAgICAnL0VkaXRJbWFnZXNDYW1wYWlnbic6J2VkaXQtaW1hZ2VzLWNhbXBhaWduJyxcclxuICAgICAgICAnL0VkaXRXb3JrZXJzQ2FtcGFpZ24nOidlZGl0LXdvcmtlcnMtY2FtcGFpZ24nLFxyXG4gICAgICAgICcvT3BlcmF0aW9uU3VjY2Vzcyc6J29wZXJhdGlvbi1zdWNjZXNzJyxcclxuICAgICAgICAnL0NhbXBhaWduU3RhdGlzdGljcyc6J2VuZGVkLWNhbXBhaWduLXN0YXRpc3RpY3MnLFxyXG4gICAgICAgICcvVGFza1N0YXRpc3RpY3MnOid0YXNrLXN0YXRpc3RpY3MnLFxyXG4gICAgICAgICcvV29ya2luZ1Nlc3Npb25UYXNrJzondGFzay13b3JraW5nLXNlc3Npb24nLFxyXG4gICAgICAgICcvSW1hZ2VTdGF0aXN0aWNzJzonaW1hZ2Utc3RhdGlzdGljcydcclxuICAgIH07XHJcbiAgICB0aGlzLnJlcG9zaXRvcmllcyA9IHJlcG9zaXRvcmllcztcclxuICAgICQoXCIjc3VcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7JChcIiNob21lXCIpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7fSk7XHJcbiAgICAkKFwiI2xpXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpeyQoXCIjaG9tZVwiKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO30pO1xyXG4gICAgJChcIiNzdU5cIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7JChcIiNob21lXCIpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7fSk7XHJcbiAgICAkKFwiI2xpTlwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXskKFwiI2hvbWVcIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTt9KTtcclxuICAgLyogdGhpcy5maXJzdFBhZ2UgPSB0cnVlO1xyXG4gICAgdGhpcy5ub3RGaXJzdFBhZ2UgPSBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICB0aGlzLmZpcnN0UGFnZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmKGRhdGEgPT0gXCJTVVwiKXtcclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiL1NpZ25VcFwiO1xyXG4gICAgICAgIH1lbHNlIGlmKGRhdGEgPT0gXCJMSVwiKXtcclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiL0xvZ0luXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qdGhpcy5zdGF0dXNMb2dnZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN0YXR1c0xvZ2dlZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYWxlcnQoXCJTVE8gUEVSIEFHR0lPUk5BUkUgTE8gU1RBVE9cIik7XHJcbiAgICAgICAgdGhpcy5zdGF0dXNMb2dnZWQocmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBcGlUb2tlbigpKTtcclxuICAgIH07Ki9cclxufVxyXG5cclxua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwKCkpO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMDMvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuY3JlYXRlQ2FtcGFpZ24gPSBmdW5jdGlvbiAoYXBpVG9rZW4sY2FtcGFpZ25OYW1lLHNlbGVjdGlvblJlcGxpY2EsdGhyZXNob2xkLGFubm90YXRpb25SZXBsaWNhLGFubm90YXRpb25TaXplKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgJy9hcGkvY2FtcGFpZ24nLFxyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlbixcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOmNhbXBhaWduTmFtZSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbl9yZXBsaWNhOiBwYXJzZUludChzZWxlY3Rpb25SZXBsaWNhKSxcclxuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogcGFyc2VJbnQodGhyZXNob2xkKSxcclxuICAgICAgICAgICAgICAgIGFubm90YXRpb25fcmVwbGljYTpwYXJzZUludChhbm5vdGF0aW9uUmVwbGljYSksXHJcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uX3NpemU6IHBhcnNlSW50KGFubm90YXRpb25TaXplKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJIbyBmYWxsaXRvXCIpO1xyXG4gICAgICAgICAgICAvKmZvcih2YXIgeCBpbiBqcVhIUil7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4ICsgXCIgXCIgKyBqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBhbGVydChqcVhIUi5yZXNwb25zZUpTT04uZXJyb3IpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBKU09OLnBhcnNlKGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGZvcih2YXIgeCBpbiB0ZW1wKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHggK1wiIFwiKyB0ZW1wW3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydHMuUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbmV4cG9ydHMuY3JlYXRlUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAwNC8wNi8yMDE3LlxyXG4gKi9cclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUudXBsb2FkQ2FtcGFpZ25QaG90b3MgPSBmdW5jdGlvbiAoYXBpVG9rZW4sZmlsZXMsIGltYWdlVXJsKSB7IC8vZm9yc2UgZG92cmVzdGkgY3JhcmUgdXBsb2FkIGZpbGUgY29uIHVuIHBhcmFtZXRybyBVUkwgY2hlIHVzaSBwZXIgcmljaWNsYXJlIGxvIHN0ZXNzbyBtZXRvZG8gcGVyIGRpdmVyc2UgdWZuemlvbmFsaXTDoFxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgLy9yZXR1cm4gY3R4LnJlcG9zaXRvcmllcy51cGxvYWRmaWxlKGFwaVRva2VuLCBmaWxlcywgaW1hZ2VVcmwgKTsgQFRPRE8gdmVkaSBzZSDDqCBwacO5IGVsZWdhbnRlIGZhcmUgdXBsb2FkZmlsZSBvIGNvbWUgaGFpIGRlY2lzbyBkaSBmYXJlIG9yYSAoaW4gdGFsIGNhc28gcGFzc2EgY3R4IGluIHVwbG9hZENhbXBhaWduUGhvdG9zIHNlIGxvIHVzaSlcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgaW1hZ2VVcmwsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlbixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YTogZmlsZXMsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGZpbGVzKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiQ2FyaWNhbWVudG8gYXZ2ZW51dG8gY29uIHN1Y2Nlc3NvIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICBhbGVydChqcVhIUi5yZXNwb25zZUpTT04uZXJyb3IpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRDYW1wYWlnbkltYWdlcyA9IGZ1bmN0aW9uIChhcGlUb2tlbiwgaW1hZ2VVcmwpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIGltYWdlVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlbixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLypmb3IodmFyIHggaW4gT2JqZWN0LmtleXMocmVzdWx0KSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydChPYmplY3Qua2V5cyhyZXN1bHQpW3hdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yKHZhciB4IGluIHJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydChyZXN1bHRbeF0pO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgZm9yKHZhciB4IGluIHJlc3VsdC5pbWFnZXMpe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmltYWdlc1t4XS5jYW5vbmljYWwgPSBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnXCIrcmVzdWx0LmltYWdlc1t4XS5jYW5vbmljYWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwiSG8gZmFsbGl0b1wiKTtcclxuICAgICAgICAgICAgLypmb3IodmFyIHggaW4ganFYSFIpe1xyXG4gICAgICAgICAgICAgYWxlcnQoeCArIFwiIFwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlSlNPTi5lcnJvcik7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBhbGVydChqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgZm9yKHZhciB4IGluIHRlbXApe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoeCArXCIgXCIrIHRlbXBbeF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IGpxWEhSLnJlc3BvbnNlSlNPTjtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldEltYWdlSW5mbyA9IGZ1bmN0aW9uKGFwaVRva2VuLGltYWdlVXJsKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBpbWFnZVVybCxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpVG9rZW4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgLy9hbGVydChcIkhvIGZhbGxpdG9cIik7XHJcbiAgICAgICAgICAgIC8qZm9yKHZhciB4IGluIGpxWEhSKXtcclxuICAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIiArIGpxWEhSW3hdKTtcclxuICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBhbGVydChqcVhIUi5yZXNwb25zZUpTT04uZXJyb3IpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBKU09OLnBhcnNlKGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGZvcih2YXIgeCBpbiB0ZW1wKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHggK1wiIFwiKyB0ZW1wW3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRJbWFnZVN0YXRpc3RpY3MgPSBmdW5jdGlvbihhcGlUb2tlbixpbWFnZVVybCl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgaW1hZ2VVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTpcImpzb25cIixcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJIbyBmYWxsaXRvXCIpO1xyXG4gICAgICAgICAgICAvKmZvcih2YXIgeCBpbiBqcVhIUil7XHJcbiAgICAgICAgICAgICBhbGVydCh4ICsgXCIgXCIgKyBqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VKU09OLmVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gdGVtcCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4ICtcIiBcIisgdGVtcFt4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUucmVtb3ZlSW1hZ2UgPSBmdW5jdGlvbihhcGlUb2tlbixpbWFnZVVybCl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgaW1hZ2VVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpVG9rZW4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuXHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlSlNPTi5lcnJvcik7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBhbGVydChqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgZm9yKHZhciB4IGluIHRlbXApe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoeCArXCIgXCIrIHRlbXBbeF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IGpxWEhSLnJlc3BvbnNlSlNPTjtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufTtcclxuZXhwb3J0cy5SZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcclxuZXhwb3J0cy5jcmVhdGVSZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDExLzA2LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxyXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyk7XHJcblxyXG5mdW5jdGlvbiBSZXBvc2l0b3J5KHNlcnZlcikge1xyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcG9zaXRvcnkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KHNlcnZlcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zZXJ2ZXIgPSBzZXJ2ZXIgfHwgJyc7XHJcbn1cclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldFdvcmtlcnMgPSBmdW5jdGlvbiAoYXBpVG9rZW4sIHdvcmtlclVybCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgYWxlcnQoXCJQcm9taXNlXCIpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBhbGVydChzZWxmLl9zZXJ2ZXIgKyB3b3JrZXJVcmwpO1xyXG4gICAgICAgIGFsZXJ0KGFwaVRva2VuKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIHdvcmtlclVybCxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlbixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvKmZvcih2YXIgeCBpbiBPYmplY3Qua2V5cyhyZXN1bHQpKXtcclxuICAgICAgICAgICAgIGFsZXJ0KE9iamVjdC5rZXlzKHJlc3VsdClbeF0pO1xyXG4gICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGZvcih2YXIgeCBpbiByZXN1bHQpe1xyXG4gICAgICAgICAgICAgYWxlcnQocmVzdWx0W3hdKTtcclxuICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBhbGVydChcInN1Y2Nlc3NvQWpheFdvcmtlcnNcIik7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJIbyBmYWxsaXRvXCIpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIGpxWEhSKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4ICsgXCIgXCIgKyBqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IGpxWEhSLnJlc3BvbnNlSlNPTjtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0V29ya2VySW5mbyA9IGZ1bmN0aW9uIChhcGlUb2tlbiwgd29ya2VyVXJsKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGFsZXJ0KFwiUHJvbWlzZVwiKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBhbGVydChzZWxmLl9zZXJ2ZXIgKyB3b3JrZXJVcmwpO1xyXG4gICAgICAgICAgICBhbGVydChhcGlUb2tlbik7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIHdvcmtlclVybCxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpVG9rZW4sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciB4IGluIE9iamVjdC5rZXlzKHJlc3VsdCkpe1xyXG4gICAgICAgICAgICAgICAgIGFsZXJ0KE9iamVjdC5rZXlzKHJlc3VsdClbeF0pO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgZm9yKHZhciB4IGluIHJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICAgYWxlcnQocmVzdWx0W3hdKTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbGVydChcInN1Y2Nlc3NvQWpheFdvcmtlckluZm9cIik7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJmYWxsaXRvQWpheFdvcmtlckluZm9cIik7XHJcbiAgICAgICAgICAgICAgICAvKmZvciAodmFyIHggaW4ganFYSFIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCh4ICsgXCIgXCIgKyBqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnNldFNlbGVjdG9yID0gZnVuY3Rpb24gKGFwaVRva2VuLCBpc1NlbGVjdG9yLCB3b3JrZXJVcmwpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGFsZXJ0KFwiUHJvbWlzZVwiKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgYWxlcnQoc2VsZi5fc2VydmVyICsgd29ya2VyVXJsKTtcclxuICAgICAgICBhbGVydChhcGlUb2tlbik7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyB3b3JrZXJVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6IGlzU2VsZWN0b3I/J1BPU1QnOidERUxFVEUnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwic3VjY2Vzc29BamF4U2VsZWN0b3JcIik7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJmYWxsaXRvQWpheFNlbGVjdG9yXCIpO1xyXG4gICAgICAgICAgICAvKmZvciAodmFyIHggaW4ganFYSFIpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIiArIGpxWEhSW3hdKTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnNldEFubm90YXRvciA9IGZ1bmN0aW9uIChhcGlUb2tlbiwgaXNBbm5vdGF0b3IsIHdvcmtlclVybCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgYWxlcnQoXCJQcm9taXNlXCIpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBhbGVydChzZWxmLl9zZXJ2ZXIgKyB3b3JrZXJVcmwpO1xyXG4gICAgICAgIGFsZXJ0KGFwaVRva2VuKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIHdvcmtlclVybCxcclxuICAgICAgICAgICAgdHlwZTogaXNBbm5vdGF0b3I/J1BPU1QnOidERUxFVEUnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwic3VjY2Vzc29BamF4QW5ub3RhdG9yXCIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRmFsbGl0b0FqYXhBbm5vdGF0b3JcIik7XHJcbiAgICAgICAgICAgIC8qZm9yICh2YXIgeCBpbiBqcVhIUikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoeCArIFwiIFwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IGpxWEhSLnJlc3BvbnNlSlNPTjtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMTAvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0Q2FtcGFpZ25TdGF0aXN0aWNzID0gZnVuY3Rpb24gKGFwaVRva2VuLHN0YXRpc3RpY3NVcmwpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBzdGF0aXN0aWNzVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlbixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJIbyBmYWxsaXRvXCIpO1xyXG4gICAgICAgICAgICAvKmZvcih2YXIgeCBpbiBqcVhIUil7XHJcbiAgICAgICAgICAgICBhbGVydCh4ICsgXCIgXCIgKyBqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VKU09OLmVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gdGVtcCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4ICtcIiBcIisgdGVtcFt4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRJbWFnZUluZm8gPSBmdW5jdGlvbiAoYXBpVG9rZW4saW1hZ2VJZCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIGltYWdlSWQsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTpcImpzb25cIixcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VKU09OLmVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IGpxWEhSLnJlc3BvbnNlSlNPTjtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0SW1hZ2VTdGF0aXN0aWNzID0gZnVuY3Rpb24gKGFwaVRva2VuLGltYWdlU3RhdGlzdGljc1VybCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIGltYWdlU3RhdGlzdGljc1VybCxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpVG9rZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlSlNPTi5lcnJvcik7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydHMuUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbmV4cG9ydHMuY3JlYXRlUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbiIsIi8qanNsaW50IG5vZGU6dHJ1ZSAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbmV4cG9ydHMuY3JlYXRlUmVwb3NpdG9yaWVzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2lnbnVwOiByZXF1aXJlKCcuL3NpZ251cCcpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgbG9naW46IHJlcXVpcmUoJy4vbG9naW4nKS5jcmVhdGVSZXBvc2l0b3J5KG9wdGlvbnMpLFxyXG4gICAgICAgIHVzZXJob21lOiByZXF1aXJlKCcuL3VzZXJob21lJykuY3JlYXRlUmVwb3NpdG9yeShvcHRpb25zKSxcclxuICAgICAgICBsb2dvdXQgOiByZXF1aXJlKCcuL2xvZ291dCcpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgc3RhdHVzOiByZXF1aXJlKCcuL3N0YXR1cycpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgY3JlYXRlY2FtcGFpZ24gOiByZXF1aXJlKFwiLi9jcmVhdGVjYW1wYWlnblwiKS5jcmVhdGVSZXBvc2l0b3J5KG9wdGlvbnMpLFxyXG4gICAgICAgIGVkaXRpbWFnZXM6IHJlcXVpcmUoXCIuL2VkaXRpbWFnZXNcIikuY3JlYXRlUmVwb3NpdG9yeShvcHRpb25zKSxcclxuICAgICAgICB1cGxvYWRmaWxlOiByZXF1aXJlKFwiLi91cGxvYWRmaWxlXCIpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgZW5kZWRjYW1wYWlnbnN0YXRpc3RpY3M6IHJlcXVpcmUoXCIuL2VuZGVkY2FtcGFpZ25zdGF0aXN0aWNzXCIpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgZWRpdHdvcmtlcnM6IHJlcXVpcmUoXCIuL2VkaXR3b3JrZXJzXCIpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgdGFza3N0YXRpc3RpY3M6cmVxdWlyZShcIi4vdGFza3N0YXRpc3RpY3NcIikuY3JlYXRlUmVwb3NpdG9yeShvcHRpb25zKSxcclxuICAgICAgICB0YXNrd29ya2luZ3Nlc3Npb246cmVxdWlyZShcIi4vdGFza3dvcmtpbmdzZXNzaW9uXCIpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucylcclxuICAgIH07XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAyMy8wNS8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKSxcclxuICAgIFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xyXG5cclxuZnVuY3Rpb24gUmVwb3NpdG9yeShzZXJ2ZXIpIHtcclxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXBvc2l0b3J5KSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVwb3NpdG9yeShzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2VydmVyID0gc2VydmVyIHx8ICcnO1xyXG59XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5sb2dpbiA9IGZ1bmN0aW9uICh1c2VybmFtZSxwd2QpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vcGVyIGkgdGVzdCBkYWRhLCBkYWRhLCBsZWdpbGltZW50cyAgKHJvbGUgbWFzdGVyKSAtPiByZWdpc3RyYXRvIGNvbiBzdWNjZXNzb1xyXG4gICAgLy9hbmNoZSBkYWRhMSxkYWRhMSxsZWdpbGltZW50cyAocm9sZSB3b3JrZXIpIC0+IHJlZ2lzdHJhdG8gY29uIHN1Y2Nlc3NvXHJcbiAgICBhbGVydChcIlN0byBwZXIgZmFyZSBpbCBQcm9taXNlIGNvbiBkYXRpXCIgKyB1c2VybmFtZSArIHB3ZCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgJy9hcGkvYXV0aCcsXHJcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdBUElLZXkgZGUyMDU5NmUtZWEyMy00YmY4LTg5ZjktMGI3Zjg5MjhkNDM1JyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcHdkLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJIbyBmYWxsaXRvXCIpO1xyXG4gICAgICAgICAgICBhbGVydChqcVhIUi5yZXNwb25zZUpTT04uZXJyb3IpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDI0LzA1LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxyXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyk7XHJcblxyXG5mdW5jdGlvbiBSZXBvc2l0b3J5KHNlcnZlcikge1xyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcG9zaXRvcnkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KHNlcnZlcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zZXJ2ZXIgPSBzZXJ2ZXIgfHwgJyc7XHJcbn1cclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmxvZ291dCA9IGZ1bmN0aW9uIChhcGl0b2tlbikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIGF1dGggPSAnQVBJVG9rZW4gJythcGl0b2tlbjtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyAnL2FwaS9hdXRoJyxcclxuICAgICAgICAgICAgdHlwZTogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhdXRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQucmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT04uZXJyb3JzO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5cclxuIiwiLypqc2xpbnQgbm9kZTp0cnVlLCBub21lbjogdHJ1ZSAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxyXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyk7XHJcblxyXG5mdW5jdGlvbiBSZXBvc2l0b3J5KHNlcnZlcikge1xyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcG9zaXRvcnkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KHNlcnZlcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zZXJ2ZXIgPSBzZXJ2ZXIgfHwgJyc7XHJcbn1cclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnZhbGlkYXRlQW5kU2VuZCA9IGZ1bmN0aW9uIChmdWxsbmFtZSx1c2VybmFtZSxwd2QxLHJvbGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vcGVyIGkgdGVzdCBkYWRhLCBkYWRhLCBsZWdpbGltZW50cyAtPiByZWdpc3RyYXRvIGNvbiBzdWNjZXNzb1xyXG4gICAgLy9hbmNoZSBkYWRhMSxkYWRhMSxsZWdpbGltZW50c1xyXG4gICAgYWxlcnQoXCJTdG8gcGVyIGZhcmUgaWwgUHJvbWlzZSBjb24gZGF0aVwiICsgZnVsbG5hbWUgKyB1c2VybmFtZSArIHB3ZDEgKyByb2xlKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyAnL2FwaS91c2VyJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdBUElLZXkgZGUyMDU5NmUtZWEyMy00YmY4LTg5ZjktMGI3Zjg5MjhkNDM1JyxcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxuYW1lOiBmdWxsbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHB3ZDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogcm9sZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiSG8gaW52aWF0byBpbCBtZXNzYWdnaW9cIik7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xyXG4gICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJIbyBmYWxsaXRvXCIpO1xyXG4gICAgICAgICAgICAgICAgLyphbGVydCh0ZXh0U3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggaW4ganFYSFIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoanFYSFJbeF0pO1xyXG4gICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICAvLzQwNCwgTm90IEZvdW5kIC0+IGNyZWRvIGlsIHByb2JsZW1hIHNpYSBjaGUgbm9uIGFjY2hpYXBwaSBpbCBzaXRvXHJcbiAgICAgICAgICAgICAgICAvL1JJU09MVE8gaW5zZXJlbmRvIGNvbWUgcGFyYW1ldHJvIHNlcnZlciBodHRwOi8vYXd0IGVjYy5cclxuICAgICAgICAgICAgICAgIC8vNDAxIFVuYXV0aG9yaXplZFxyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIC8vZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OLmVycm9ycztcclxuICAgICAgICAgICAgICAgIC8qZm9yICh2YXIgeCBpbiBqcVhIUilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlBvc2l6aW9uZSBcIiArIHggKyBcIiAuLi4uIFwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydHMuUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbmV4cG9ydHMuY3JlYXRlUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAyNS8wNS8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKSxcclxuICAgIFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xyXG5cclxuZnVuY3Rpb24gUmVwb3NpdG9yeShzZXJ2ZXIpIHtcclxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXBvc2l0b3J5KSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVwb3NpdG9yeSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2VydmVyID0gc2VydmVyIHx8ICcnO1xyXG59XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zZXRBcGlUb2tlbiA9IGZ1bmN0aW9uIChhcGlUb2tlbikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgLy9wZXIgaSB0ZXN0IGRhZGEsIGRhZGEsIGxlZ2lsaW1lbnRzICAocm9sZSBtYXN0ZXIpIC0+IHJlZ2lzdHJhdG8gY29uIHN1Y2Nlc3NvXHJcbiAgICAvL2FuY2hlIGRhZGExLGRhZGExLGxlZ2lsaW1lbnRzIChyb2xlIHdvcmtlcikgLT4gcmVnaXN0cmF0byBjb24gc3VjY2Vzc29cclxuICAgIHNlbGYuYXBpVG9rZW4gPSBhcGlUb2tlbjtcclxuICAgIHNlbGYuYXV0aEFwaVRva2VuID0gJ0FQSVRva2VuICcrYXBpVG9rZW47XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5kZWxldGVBcGlUb2tlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vcGVyIGkgdGVzdCBkYWRhLCBkYWRhLCBsZWdpbGltZW50cyAgKHJvbGUgbWFzdGVyKSAtPiByZWdpc3RyYXRvIGNvbiBzdWNjZXNzb1xyXG4gICAgLy9hbmNoZSBkYWRhMSxkYWRhMSxsZWdpbGltZW50cyAocm9sZSB3b3JrZXIpIC0+IHJlZ2lzdHJhdG8gY29uIHN1Y2Nlc3NvXHJcbiAgICBzZWxmLmFwaVRva2VuID0gdW5kZWZpbmVkO1xyXG4gICAgc2VsZi5hdXRoQXBpVG9rZW4gPSB1bmRlZmluZWQ7XHJcbn07XHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldEFwaVRva2VuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYuYXBpVG9rZW47XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRBdXRoQXBpVG9rZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gc2VsZi5hdXRoQXBpVG9rZW47XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zZXRTdWNjZXNzTmV4dCA9IGZ1bmN0aW9uIChuZXh0KXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYubmV4dCA9IG5leHQ7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRTdWNjZXNzTmV4dCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYubmV4dDtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmRlbGV0ZVN1Y2Nlc3NOZXh0ID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGRlbGV0ZSBzZWxmLm5leHQ7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zZXRDdXJyZW50Q2FtcGFpZ24gPSBmdW5jdGlvbihjYW1wYWlnbil7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLmNhbXBhaWduID0gY2FtcGFpZ247XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRDdXJyZW50Q2FtcGFpZ24gPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYuY2FtcGFpZ247XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5kZWxldGVDdXJyZW50Q2FtcGFpZ24gPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgZGVsZXRlIHNlbGYuY2FtcGFpZ247XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zZXRDdXJyZW50SW1hZ2UgPSBmdW5jdGlvbihpbWFnZSl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLmltYWdlID0gaW1hZ2U7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRDdXJyZW50SW1hZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYuaW1hZ2U7XHJcbn07XHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmRlbGV0ZUN1cnJlbnRJbWFnZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBkZWxldGUgc2VsZi5pbWFnZTtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnNldEN1cnJlbnRUYXNrID0gZnVuY3Rpb24odGFzayl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnRhc2sgPSB0YXNrO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0Q3VycmVudFRhc2sgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYudGFzaztcclxufTtcclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZGVsZXRlQ3VycmVudFRhc2sgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgZGVsZXRlIHNlbGYudGFzaztcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnNldEN1cnJlbnRJbWFnZVN0YXRpc3RpY3MgPSBmdW5jdGlvbihpbWFnZVN0YXRpc3RpY3Mpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5pbWFnZVN0YXRpc3RpY3MgPSBpbWFnZVN0YXRpc3RpY3M7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRDdXJyZW50SW1hZ2VTdGF0aXN0aWNzID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBzZWxmLmltYWdlU3RhdGlzdGljcztcclxufTtcclxuXHJcbmV4cG9ydHMuUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbmV4cG9ydHMuY3JlYXRlUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAxMi8wNi8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKSxcclxuICAgIFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xyXG5cclxuZnVuY3Rpb24gUmVwb3NpdG9yeShzZXJ2ZXIpIHtcclxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXBvc2l0b3J5KSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVwb3NpdG9yeShzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2VydmVyID0gc2VydmVyIHx8ICcnO1xyXG59XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRUYXNrU3RhdGlzdGljcyA9IGZ1bmN0aW9uIChhcGlUb2tlbixzdGF0aXN0aWNzVXJsKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGFsZXJ0KGFwaVRva2VuKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIHN0YXRpc3RpY3NVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpVG9rZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gcmVzdWx0KXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHgrXCIgXCIrcmVzdWx0W3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHggaW4ganFYSFIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGpxWEhSW3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMTMvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuc3RhcnRXb3JraW5nU2Vzc2lvbiA9IGZ1bmN0aW9uIChhcGlUb2tlbixzZXNzaW9uVXJsKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgc2Vzc2lvblVybCxcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpVG9rZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXROZXh0VGFza0luc3RhbmNlID0gZnVuY3Rpb24gKGFwaVRva2VuLHNlc3Npb25VcmwpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBzZXNzaW9uVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5pbWFnZSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5pbWFnZSA9IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIityZXN1bHQuaW1hZ2U7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgLypmb3IgKHZhciB4IGluIGpxWEhSKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zdWJtaXRBbm5vdGF0aW9uID0gZnVuY3Rpb24oYXBpVG9rZW4sc2Vzc2lvblVybCxza3lsaW5lKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBzZXNzaW9uVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6XCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeSh7XCJza3lsaW5lXCI6c2t5bGluZX0pXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBqcVhIUilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoanFYSFJbeF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnN1Ym1pdFNlbGVjdGlvbiA9IGZ1bmN0aW9uKGFwaVRva2VuLHNlc3Npb25VcmwsYWNjZXB0ZWQpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBzZXNzaW9uVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlbixcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XCJhY2NlcHRlZFwiOiBhY2NlcHRlZH0pXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgLypmb3IgKHZhciB4IGluIGpxWEhSKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMDUvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUudXBsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGFwaXRva2VuLCBmaWxlcywgaW1hZ2VVcmwpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vcmVmZXJlbmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMzIwMDY5L2pxdWVyeS1hamF4LWZpbGUtdXBsb2FkXHJcbiAgICAvL3JlZmVyZW5jZSBwcm9mLjogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTM5MjM0NC9zZW5kaW5nLW11bHRpcGFydC1mb3JtZGF0YS13aXRoLWpxdWVyeS1hamF4XHJcbiAgICAvL3ZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgLy8gYWRkIGFzc29jIGtleSB2YWx1ZXMsIHRoaXMgd2lsbCBiZSBwb3N0cyB2YWx1ZXNcclxuICAgIC8vZm9ybURhdGEuYXBwZW5kKFwiZmlsZVwiLCBmaWxlLCBmaWxlLm5hbWUpO1xyXG4gICAgLy9mb3JtRGF0YS5hcHBlbmQoXCJ1cGxvYWRfZmlsZVwiLCB0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIGltYWdlVXJsLFxyXG4gICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaXRva2VuLFxyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzonbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IGZpbGVzLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZmlsZXMpe1xyXG4gICAgICAgICAgICBhbGVydChcIkNhcmljYW1lbnRvIGF2dmVudXRvIGNvbiBzdWNjZXNzbyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VKU09OLmVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy9sYSBjcmVhemlvbmUgZGkgdW5hIG51b3ZhIGNhbXBhZ25hIGxhIHNwb3N0ZXJlaSBpbiB1bidhbHRyYSBjb21wb25lbnQvcmVwb3NpdG9yeVxyXG5cclxuZXhwb3J0cy5SZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcclxuZXhwb3J0cy5jcmVhdGVSZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMjQvMDUvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0VXNlckluZm8gPSBmdW5jdGlvbiAoYXBpdG9rZW4pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgJy9hcGkvdXNlci9tZScsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpdG9rZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlSlNPTi5lcnJvcik7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBKU09OLnBhcnNlKGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldFRhc2tzSW5mbyA9IGZ1bmN0aW9uIChhcGl0b2tlbil7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArICcvYXBpL3Rhc2snLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaXRva2VuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICBhbGVydChqcVhIUi5yZXNwb25zZUpTT04uZXJyb3IpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRUYXNrSW5mbyA9IGZ1bmN0aW9uIChhcGl0b2tlbix0YXNrVXJsKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgdGFza1VybCxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGl0b2tlblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBqcVhIUikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJcIiArIHggKyBcIjpcIiArIGpxWEhSW3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRDYW1wYWlnbkluZm8gPSBmdW5jdGlvbiAoaWQsYXBpdG9rZW4pe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBpZCxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGl0b2tlblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwic3VjY2Vzc28gZ2V0Q2FtcGFpZ25BamF4XCIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlSlNPTi5lcnJvcik7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBKU09OLnBhcnNlKGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRmFsbGl0byBnZXRDYW1wYWlnbkFqYXhcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZWRpdFVzZXJJbmZvID0gZnVuY3Rpb24gKGZ1bGxuYW1lLCBwYXNzd29yZCwgYXBpdG9rZW4pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgJy9hcGkvdXNlci9tZScsXHJcbiAgICAgICAgICAgIHR5cGU6ICdQVVQnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZSA6ICdqc29uJyxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaXRva2VuLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBmdWxsbmFtZTogZnVsbG5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJTdWNjZXNzb0FqYXhcIik7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJGYWxsaXRvQWpheFwiKTtcclxuICAgICAgICAgICAgLypmb3IgKHZhciB4IGluIGpxWEhSKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlwiICsgeCArIFwiOlwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qZm9yKHZhciB4IGluIGpxWEhSLmVycm9yKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCBcIlwiK3grXCIgOlwiK2pxWEhSLmVycm9yW3hdKTtcclxuICAgICAgICAgICAgICAgIHRlbXBFcnJvcnMucHVzaCgoXCJcIit4K1wiIDpcIitqcVhIUi5lcnJvclt4XSkpO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0VXNlckNhbXBhaWducyA9IGZ1bmN0aW9uIChhcGl0b2tlbikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgJy9hcGkvY2FtcGFpZ24nLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGl0b2tlbixcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzb0FqYXhDYW1wYWlnbnNcIik7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvQWpheFwiKTtcclxuICAgICAgICAgICAgLypmb3IgKHZhciB4IGluIGpxWEhSKSB7XHJcbiAgICAgICAgICAgICBhbGVydChcIlwiICsgeCArIFwiOlwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgLypmb3IodmFyIHggaW4ganFYSFIuZXJyb3Ipe1xyXG4gICAgICAgICAgICAgYWxlcnQoIFwiXCIreCtcIiA6XCIranFYSFIuZXJyb3JbeF0pO1xyXG4gICAgICAgICAgICAgdGVtcEVycm9ycy5wdXNoKChcIlwiK3grXCIgOlwiK2pxWEhSLmVycm9yW3hdKSk7XHJcbiAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuc3RhcnRDYW1wYWlnbiA9IGZ1bmN0aW9uKGNhbXBhaWduLGFwaXRva2VuKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIGNhbXBhaWduLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpdG9rZW5cclxuICAgICAgICB9XHJcbiAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICBhbGVydChcIlN1Y2Nlc3NvQWpheFN0YXJ0Q2FtcGFpZ25cIik7XHJcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgYWxlcnQoXCJGYWxsaXRvQWpheFN0YXJ0Q2FtcGFpZ25cIik7XHJcbiAgICAgICAgYWxlcnQodGV4dFN0YXR1cyk7XHJcbiAgICAgICAgZm9yICh2YXIgeCBpbiBqcVhIUikge1xyXG4gICAgICAgICBhbGVydChcIlwiICsgeCArIFwiOlwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICB9LypcclxuICAgICAgICAgZm9yKHZhciB4IGluIGpxWEhSLmVycm9yKXtcclxuICAgICAgICAgYWxlcnQoIFwiXCIreCtcIiA6XCIranFYSFIuZXJyb3JbeF0pO1xyXG4gICAgICAgICB0ZW1wRXJyb3JzLnB1c2goKFwiXCIreCtcIiA6XCIranFYSFIuZXJyb3JbeF0pKTtcclxuICAgICAgICAgfSovXHJcblxyXG4gICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICBlcnJvci5lcnJvcnMgPSBKU09OLnBhcnNlKGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgIH0pO1xyXG59KX07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS50ZXJtaW5hdGVDYW1wYWlnbiA9IGZ1bmN0aW9uKGNhbXBhaWduLGFwaXRva2VuKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgY2FtcGFpZ24sXHJcbiAgICAgICAgICAgIHR5cGU6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaXRva2VuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzb0FqYXhUZXJtaW5hdGVDYW1wYWlnblwiKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICBhbGVydChcIkZhbGxpdG9BamF4VGVybWluYXRlQ2FtcGFpZ25cIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KHRleHRTdGF0dXMpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIGpxWEhSKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlwiICsgeCArIFwiOlwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICB9LypcclxuICAgICAgICAgICAgIGZvcih2YXIgeCBpbiBqcVhIUi5lcnJvcil7XHJcbiAgICAgICAgICAgICBhbGVydCggXCJcIit4K1wiIDpcIitqcVhIUi5lcnJvclt4XSk7XHJcbiAgICAgICAgICAgICB0ZW1wRXJyb3JzLnB1c2goKFwiXCIreCtcIiA6XCIranFYSFIuZXJyb3JbeF0pKTtcclxuICAgICAgICAgICAgIH0qL1xyXG5cclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pfTtcclxuXHJcbi8vbGEgY3JlYXppb25lIGRpIHVuYSBudW92YSBjYW1wYWduYSBsYSBzcG9zdGVyZWkgaW4gdW4nYWx0cmEgY29tcG9uZW50L3JlcG9zaXRvcnlcclxuXHJcbmV4cG9ydHMuUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbmV4cG9ydHMuY3JlYXRlUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcblxyXG5cclxuIiwiLyogQHByZXNlcnZlXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDEzLTIwMTcgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cbi8qKlxuICogYmx1ZWJpcmQgYnVpbGQgdmVyc2lvbiAzLjUuMFxuICogRmVhdHVyZXMgZW5hYmxlZDogY29yZSwgcmFjZSwgY2FsbF9nZXQsIGdlbmVyYXRvcnMsIG1hcCwgbm9kZWlmeSwgcHJvbWlzaWZ5LCBwcm9wcywgcmVkdWNlLCBzZXR0bGUsIHNvbWUsIHVzaW5nLCB0aW1lcnMsIGZpbHRlciwgYW55LCBlYWNoXG4qL1xuIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sZSk7ZWxzZXt2YXIgZjtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P2Y9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Zj1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJihmPXNlbGYpLGYuUHJvbWlzZT1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgX2RlcmVxXz09XCJmdW5jdGlvblwiJiZfZGVyZXFfO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiBfZGVyZXFfPT1cImZ1bmN0aW9uXCImJl9kZXJlcV87Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlKSB7XG52YXIgU29tZVByb21pc2VBcnJheSA9IFByb21pc2UuX1NvbWVQcm9taXNlQXJyYXk7XG5mdW5jdGlvbiBhbnkocHJvbWlzZXMpIHtcbiAgICB2YXIgcmV0ID0gbmV3IFNvbWVQcm9taXNlQXJyYXkocHJvbWlzZXMpO1xuICAgIHZhciBwcm9taXNlID0gcmV0LnByb21pc2UoKTtcbiAgICByZXQuc2V0SG93TWFueSgxKTtcbiAgICByZXQuc2V0VW53cmFwKCk7XG4gICAgcmV0LmluaXQoKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuUHJvbWlzZS5hbnkgPSBmdW5jdGlvbiAocHJvbWlzZXMpIHtcbiAgICByZXR1cm4gYW55KHByb21pc2VzKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmFueSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYW55KHRoaXMpO1xufTtcblxufTtcblxufSx7fV0sMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBmaXJzdExpbmVFcnJvcjtcbnRyeSB7dGhyb3cgbmV3IEVycm9yKCk7IH0gY2F0Y2ggKGUpIHtmaXJzdExpbmVFcnJvciA9IGU7fVxudmFyIHNjaGVkdWxlID0gX2RlcmVxXyhcIi4vc2NoZWR1bGVcIik7XG52YXIgUXVldWUgPSBfZGVyZXFfKFwiLi9xdWV1ZVwiKTtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcblxuZnVuY3Rpb24gQXN5bmMoKSB7XG4gICAgdGhpcy5fY3VzdG9tU2NoZWR1bGVyID0gZmFsc2U7XG4gICAgdGhpcy5faXNUaWNrVXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2xhdGVRdWV1ZSA9IG5ldyBRdWV1ZSgxNik7XG4gICAgdGhpcy5fbm9ybWFsUXVldWUgPSBuZXcgUXVldWUoMTYpO1xuICAgIHRoaXMuX2hhdmVEcmFpbmVkUXVldWVzID0gZmFsc2U7XG4gICAgdGhpcy5fdHJhbXBvbGluZUVuYWJsZWQgPSB0cnVlO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmRyYWluUXVldWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLl9kcmFpblF1ZXVlcygpO1xuICAgIH07XG4gICAgdGhpcy5fc2NoZWR1bGUgPSBzY2hlZHVsZTtcbn1cblxuQXN5bmMucHJvdG90eXBlLnNldFNjaGVkdWxlciA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgdmFyIHByZXYgPSB0aGlzLl9zY2hlZHVsZTtcbiAgICB0aGlzLl9zY2hlZHVsZSA9IGZuO1xuICAgIHRoaXMuX2N1c3RvbVNjaGVkdWxlciA9IHRydWU7XG4gICAgcmV0dXJuIHByZXY7XG59O1xuXG5Bc3luYy5wcm90b3R5cGUuaGFzQ3VzdG9tU2NoZWR1bGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbVNjaGVkdWxlcjtcbn07XG5cbkFzeW5jLnByb3RvdHlwZS5lbmFibGVUcmFtcG9saW5lID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fdHJhbXBvbGluZUVuYWJsZWQgPSB0cnVlO1xufTtcblxuQXN5bmMucHJvdG90eXBlLmRpc2FibGVUcmFtcG9saW5lSWZOZWNlc3NhcnkgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodXRpbC5oYXNEZXZUb29scykge1xuICAgICAgICB0aGlzLl90cmFtcG9saW5lRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cbn07XG5cbkFzeW5jLnByb3RvdHlwZS5oYXZlSXRlbXNRdWV1ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzVGlja1VzZWQgfHwgdGhpcy5faGF2ZURyYWluZWRRdWV1ZXM7XG59O1xuXG5cbkFzeW5jLnByb3RvdHlwZS5mYXRhbEVycm9yID0gZnVuY3Rpb24oZSwgaXNOb2RlKSB7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgICBwcm9jZXNzLnN0ZGVyci53cml0ZShcIkZhdGFsIFwiICsgKGUgaW5zdGFuY2VvZiBFcnJvciA/IGUuc3RhY2sgOiBlKSArXG4gICAgICAgICAgICBcIlxcblwiKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGhyb3dMYXRlcihlKTtcbiAgICB9XG59O1xuXG5Bc3luYy5wcm90b3R5cGUudGhyb3dMYXRlciA9IGZ1bmN0aW9uKGZuLCBhcmcpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBhcmcgPSBmbjtcbiAgICAgICAgZm4gPSBmdW5jdGlvbiAoKSB7IHRocm93IGFyZzsgfTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmbihhcmcpO1xuICAgICAgICB9LCAwKTtcbiAgICB9IGVsc2UgdHJ5IHtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmbihhcmcpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGFzeW5jIHNjaGVkdWxlciBhdmFpbGFibGVcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIEFzeW5jSW52b2tlTGF0ZXIoZm4sIHJlY2VpdmVyLCBhcmcpIHtcbiAgICB0aGlzLl9sYXRlUXVldWUucHVzaChmbiwgcmVjZWl2ZXIsIGFyZyk7XG4gICAgdGhpcy5fcXVldWVUaWNrKCk7XG59XG5cbmZ1bmN0aW9uIEFzeW5jSW52b2tlKGZuLCByZWNlaXZlciwgYXJnKSB7XG4gICAgdGhpcy5fbm9ybWFsUXVldWUucHVzaChmbiwgcmVjZWl2ZXIsIGFyZyk7XG4gICAgdGhpcy5fcXVldWVUaWNrKCk7XG59XG5cbmZ1bmN0aW9uIEFzeW5jU2V0dGxlUHJvbWlzZXMocHJvbWlzZSkge1xuICAgIHRoaXMuX25vcm1hbFF1ZXVlLl9wdXNoT25lKHByb21pc2UpO1xuICAgIHRoaXMuX3F1ZXVlVGljaygpO1xufVxuXG5pZiAoIXV0aWwuaGFzRGV2VG9vbHMpIHtcbiAgICBBc3luYy5wcm90b3R5cGUuaW52b2tlTGF0ZXIgPSBBc3luY0ludm9rZUxhdGVyO1xuICAgIEFzeW5jLnByb3RvdHlwZS5pbnZva2UgPSBBc3luY0ludm9rZTtcbiAgICBBc3luYy5wcm90b3R5cGUuc2V0dGxlUHJvbWlzZXMgPSBBc3luY1NldHRsZVByb21pc2VzO1xufSBlbHNlIHtcbiAgICBBc3luYy5wcm90b3R5cGUuaW52b2tlTGF0ZXIgPSBmdW5jdGlvbiAoZm4sIHJlY2VpdmVyLCBhcmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyYW1wb2xpbmVFbmFibGVkKSB7XG4gICAgICAgICAgICBBc3luY0ludm9rZUxhdGVyLmNhbGwodGhpcywgZm4sIHJlY2VpdmVyLCBhcmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZm4uY2FsbChyZWNlaXZlciwgYXJnKTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgQXN5bmMucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uIChmbiwgcmVjZWl2ZXIsIGFyZykge1xuICAgICAgICBpZiAodGhpcy5fdHJhbXBvbGluZUVuYWJsZWQpIHtcbiAgICAgICAgICAgIEFzeW5jSW52b2tlLmNhbGwodGhpcywgZm4sIHJlY2VpdmVyLCBhcmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChyZWNlaXZlciwgYXJnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEFzeW5jLnByb3RvdHlwZS5zZXR0bGVQcm9taXNlcyA9IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyYW1wb2xpbmVFbmFibGVkKSB7XG4gICAgICAgICAgICBBc3luY1NldHRsZVByb21pc2VzLmNhbGwodGhpcywgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9zZXR0bGVQcm9taXNlcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5Bc3luYy5wcm90b3R5cGUuX2RyYWluUXVldWUgPSBmdW5jdGlvbihxdWV1ZSkge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgoKSA+IDApIHtcbiAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBmbi5fc2V0dGxlUHJvbWlzZXMoKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZWNlaXZlciA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIHZhciBhcmcgPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICBmbi5jYWxsKHJlY2VpdmVyLCBhcmcpO1xuICAgIH1cbn07XG5cbkFzeW5jLnByb3RvdHlwZS5fZHJhaW5RdWV1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fZHJhaW5RdWV1ZSh0aGlzLl9ub3JtYWxRdWV1ZSk7XG4gICAgdGhpcy5fcmVzZXQoKTtcbiAgICB0aGlzLl9oYXZlRHJhaW5lZFF1ZXVlcyA9IHRydWU7XG4gICAgdGhpcy5fZHJhaW5RdWV1ZSh0aGlzLl9sYXRlUXVldWUpO1xufTtcblxuQXN5bmMucHJvdG90eXBlLl9xdWV1ZVRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1RpY2tVc2VkKSB7XG4gICAgICAgIHRoaXMuX2lzVGlja1VzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zY2hlZHVsZSh0aGlzLmRyYWluUXVldWVzKTtcbiAgICB9XG59O1xuXG5Bc3luYy5wcm90b3R5cGUuX3Jlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lzVGlja1VzZWQgPSBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXN5bmM7XG5tb2R1bGUuZXhwb3J0cy5maXJzdExpbmVFcnJvciA9IGZpcnN0TGluZUVycm9yO1xuXG59LHtcIi4vcXVldWVcIjoyNixcIi4vc2NoZWR1bGVcIjoyOSxcIi4vdXRpbFwiOjM2fV0sMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwsIHRyeUNvbnZlcnRUb1Byb21pc2UsIGRlYnVnKSB7XG52YXIgY2FsbGVkQmluZCA9IGZhbHNlO1xudmFyIHJlamVjdFRoaXMgPSBmdW5jdGlvbihfLCBlKSB7XG4gICAgdGhpcy5fcmVqZWN0KGUpO1xufTtcblxudmFyIHRhcmdldFJlamVjdGVkID0gZnVuY3Rpb24oZSwgY29udGV4dCkge1xuICAgIGNvbnRleHQucHJvbWlzZVJlamVjdGlvblF1ZXVlZCA9IHRydWU7XG4gICAgY29udGV4dC5iaW5kaW5nUHJvbWlzZS5fdGhlbihyZWplY3RUaGlzLCByZWplY3RUaGlzLCBudWxsLCB0aGlzLCBlKTtcbn07XG5cbnZhciBiaW5kaW5nUmVzb2x2ZWQgPSBmdW5jdGlvbih0aGlzQXJnLCBjb250ZXh0KSB7XG4gICAgaWYgKCgodGhpcy5fYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XG4gICAgICAgIHRoaXMuX3Jlc29sdmVDYWxsYmFjayhjb250ZXh0LnRhcmdldCk7XG4gICAgfVxufTtcblxudmFyIGJpbmRpbmdSZWplY3RlZCA9IGZ1bmN0aW9uKGUsIGNvbnRleHQpIHtcbiAgICBpZiAoIWNvbnRleHQucHJvbWlzZVJlamVjdGlvblF1ZXVlZCkgdGhpcy5fcmVqZWN0KGUpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uICh0aGlzQXJnKSB7XG4gICAgaWYgKCFjYWxsZWRCaW5kKSB7XG4gICAgICAgIGNhbGxlZEJpbmQgPSB0cnVlO1xuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fcHJvcGFnYXRlRnJvbSA9IGRlYnVnLnByb3BhZ2F0ZUZyb21GdW5jdGlvbigpO1xuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fYm91bmRWYWx1ZSA9IGRlYnVnLmJvdW5kVmFsdWVGdW5jdGlvbigpO1xuICAgIH1cbiAgICB2YXIgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZSh0aGlzQXJnKTtcbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIHJldC5fcHJvcGFnYXRlRnJvbSh0aGlzLCAxKTtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fdGFyZ2V0KCk7XG4gICAgcmV0Ll9zZXRCb3VuZFRvKG1heWJlUHJvbWlzZSk7XG4gICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7XG4gICAgICAgICAgICBwcm9taXNlUmVqZWN0aW9uUXVldWVkOiBmYWxzZSxcbiAgICAgICAgICAgIHByb21pc2U6IHJldCxcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgYmluZGluZ1Byb21pc2U6IG1heWJlUHJvbWlzZVxuICAgICAgICB9O1xuICAgICAgICB0YXJnZXQuX3RoZW4oSU5URVJOQUwsIHRhcmdldFJlamVjdGVkLCB1bmRlZmluZWQsIHJldCwgY29udGV4dCk7XG4gICAgICAgIG1heWJlUHJvbWlzZS5fdGhlbihcbiAgICAgICAgICAgIGJpbmRpbmdSZXNvbHZlZCwgYmluZGluZ1JlamVjdGVkLCB1bmRlZmluZWQsIHJldCwgY29udGV4dCk7XG4gICAgICAgIHJldC5fc2V0T25DYW5jZWwobWF5YmVQcm9taXNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXQuX3Jlc29sdmVDYWxsYmFjayh0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldEJvdW5kVG8gPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgaWYgKG9iaiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAyMDk3MTUyO1xuICAgICAgICB0aGlzLl9ib3VuZFRvID0gb2JqO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgJiAofjIwOTcxNTIpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc0JvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiAyMDk3MTUyKSA9PT0gMjA5NzE1Mjtcbn07XG5cblByb21pc2UuYmluZCA9IGZ1bmN0aW9uICh0aGlzQXJnLCB2YWx1ZSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLmJpbmQodGhpc0FyZyk7XG59O1xufTtcblxufSx7fV0sNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBvbGQ7XG5pZiAodHlwZW9mIFByb21pc2UgIT09IFwidW5kZWZpbmVkXCIpIG9sZCA9IFByb21pc2U7XG5mdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgIHRyeSB7IGlmIChQcm9taXNlID09PSBibHVlYmlyZCkgUHJvbWlzZSA9IG9sZDsgfVxuICAgIGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBibHVlYmlyZDtcbn1cbnZhciBibHVlYmlyZCA9IF9kZXJlcV8oXCIuL3Byb21pc2VcIikoKTtcbmJsdWViaXJkLm5vQ29uZmxpY3QgPSBub0NvbmZsaWN0O1xubW9kdWxlLmV4cG9ydHMgPSBibHVlYmlyZDtcblxufSx7XCIuL3Byb21pc2VcIjoyMn1dLDU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgY3IgPSBPYmplY3QuY3JlYXRlO1xuaWYgKGNyKSB7XG4gICAgdmFyIGNhbGxlckNhY2hlID0gY3IobnVsbCk7XG4gICAgdmFyIGdldHRlckNhY2hlID0gY3IobnVsbCk7XG4gICAgY2FsbGVyQ2FjaGVbXCIgc2l6ZVwiXSA9IGdldHRlckNhY2hlW1wiIHNpemVcIl0gPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UpIHtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciBjYW5FdmFsdWF0ZSA9IHV0aWwuY2FuRXZhbHVhdGU7XG52YXIgaXNJZGVudGlmaWVyID0gdXRpbC5pc0lkZW50aWZpZXI7XG5cbnZhciBnZXRNZXRob2RDYWxsZXI7XG52YXIgZ2V0R2V0dGVyO1xuaWYgKCF0cnVlKSB7XG52YXIgbWFrZU1ldGhvZENhbGxlciA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcImVuc3VyZU1ldGhvZFwiLCBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvYmopIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAndXNlIHN0cmljdCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5sZW5ndGg7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBlbnN1cmVNZXRob2Qob2JqLCAnbWV0aG9kTmFtZScpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBzd2l0Y2gobGVuKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUodGhpc1swXSk7ICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUodGhpc1swXSwgdGhpc1sxXSk7ICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUodGhpc1swXSwgdGhpc1sxXSwgdGhpc1syXSk7ICAgIFxcblxcXG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmoubWV0aG9kTmFtZS5hcHBseShvYmosIHRoaXMpOyAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIFwiLnJlcGxhY2UoL21ldGhvZE5hbWUvZywgbWV0aG9kTmFtZSkpKGVuc3VyZU1ldGhvZCk7XG59O1xuXG52YXIgbWFrZUdldHRlciA9IGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwib2JqXCIsIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgJ3VzZSBzdHJpY3QnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgcmV0dXJuIG9iai5wcm9wZXJ0eU5hbWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgXCIucmVwbGFjZShcInByb3BlcnR5TmFtZVwiLCBwcm9wZXJ0eU5hbWUpKTtcbn07XG5cbnZhciBnZXRDb21waWxlZCA9IGZ1bmN0aW9uKG5hbWUsIGNvbXBpbGVyLCBjYWNoZSkge1xuICAgIHZhciByZXQgPSBjYWNoZVtuYW1lXTtcbiAgICBpZiAodHlwZW9mIHJldCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGlmICghaXNJZGVudGlmaWVyKG5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXQgPSBjb21waWxlcihuYW1lKTtcbiAgICAgICAgY2FjaGVbbmFtZV0gPSByZXQ7XG4gICAgICAgIGNhY2hlW1wiIHNpemVcIl0rKztcbiAgICAgICAgaWYgKGNhY2hlW1wiIHNpemVcIl0gPiA1MTIpIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoY2FjaGUpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkgZGVsZXRlIGNhY2hlW2tleXNbaV1dO1xuICAgICAgICAgICAgY2FjaGVbXCIgc2l6ZVwiXSA9IGtleXMubGVuZ3RoIC0gMjU2O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5nZXRNZXRob2RDYWxsZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIGdldENvbXBpbGVkKG5hbWUsIG1ha2VNZXRob2RDYWxsZXIsIGNhbGxlckNhY2hlKTtcbn07XG5cbmdldEdldHRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gZ2V0Q29tcGlsZWQobmFtZSwgbWFrZUdldHRlciwgZ2V0dGVyQ2FjaGUpO1xufTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlTWV0aG9kKG9iaiwgbWV0aG9kTmFtZSkge1xuICAgIHZhciBmbjtcbiAgICBpZiAob2JqICE9IG51bGwpIGZuID0gb2JqW21ldGhvZE5hbWVdO1xuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IFwiT2JqZWN0IFwiICsgdXRpbC5jbGFzc1N0cmluZyhvYmopICsgXCIgaGFzIG5vIG1ldGhvZCAnXCIgK1xuICAgICAgICAgICAgdXRpbC50b1N0cmluZyhtZXRob2ROYW1lKSArIFwiJ1wiO1xuICAgICAgICB0aHJvdyBuZXcgUHJvbWlzZS5UeXBlRXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHJldHVybiBmbjtcbn1cblxuZnVuY3Rpb24gY2FsbGVyKG9iaikge1xuICAgIHZhciBtZXRob2ROYW1lID0gdGhpcy5wb3AoKTtcbiAgICB2YXIgZm4gPSBlbnN1cmVNZXRob2Qob2JqLCBtZXRob2ROYW1lKTtcbiAgICByZXR1cm4gZm4uYXBwbHkob2JqLCB0aGlzKTtcbn1cblByb21pc2UucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpOztcbiAgICBpZiAoIXRydWUpIHtcbiAgICAgICAgaWYgKGNhbkV2YWx1YXRlKSB7XG4gICAgICAgICAgICB2YXIgbWF5YmVDYWxsZXIgPSBnZXRNZXRob2RDYWxsZXIobWV0aG9kTmFtZSk7XG4gICAgICAgICAgICBpZiAobWF5YmVDYWxsZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGhlbihcbiAgICAgICAgICAgICAgICAgICAgbWF5YmVDYWxsZXIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBhcmdzLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGFyZ3MucHVzaChtZXRob2ROYW1lKTtcbiAgICByZXR1cm4gdGhpcy5fdGhlbihjYWxsZXIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBhcmdzLCB1bmRlZmluZWQpO1xufTtcblxuZnVuY3Rpb24gbmFtZWRHZXR0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9ialt0aGlzXTtcbn1cbmZ1bmN0aW9uIGluZGV4ZWRHZXR0ZXIob2JqKSB7XG4gICAgdmFyIGluZGV4ID0gK3RoaXM7XG4gICAgaWYgKGluZGV4IDwgMCkgaW5kZXggPSBNYXRoLm1heCgwLCBpbmRleCArIG9iai5sZW5ndGgpO1xuICAgIHJldHVybiBvYmpbaW5kZXhdO1xufVxuUHJvbWlzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xuICAgIHZhciBpc0luZGV4ID0gKHR5cGVvZiBwcm9wZXJ0eU5hbWUgPT09IFwibnVtYmVyXCIpO1xuICAgIHZhciBnZXR0ZXI7XG4gICAgaWYgKCFpc0luZGV4KSB7XG4gICAgICAgIGlmIChjYW5FdmFsdWF0ZSkge1xuICAgICAgICAgICAgdmFyIG1heWJlR2V0dGVyID0gZ2V0R2V0dGVyKHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICBnZXR0ZXIgPSBtYXliZUdldHRlciAhPT0gbnVsbCA/IG1heWJlR2V0dGVyIDogbmFtZWRHZXR0ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXR0ZXIgPSBuYW1lZEdldHRlcjtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldHRlciA9IGluZGV4ZWRHZXR0ZXI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl90aGVuKGdldHRlciwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHByb3BlcnR5TmFtZSwgdW5kZWZpbmVkKTtcbn07XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBhcGlSZWplY3Rpb24sIGRlYnVnKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciBhc3luYyA9IFByb21pc2UuX2FzeW5jO1xuXG5Qcm9taXNlLnByb3RvdHlwZVtcImJyZWFrXCJdID0gUHJvbWlzZS5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFkZWJ1Zy5jYW5jZWxsYXRpb24oKSkgcmV0dXJuIHRoaXMuX3dhcm4oXCJjYW5jZWxsYXRpb24gaXMgZGlzYWJsZWRcIik7XG5cbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgdmFyIGNoaWxkID0gcHJvbWlzZTtcbiAgICB3aGlsZSAocHJvbWlzZS5faXNDYW5jZWxsYWJsZSgpKSB7XG4gICAgICAgIGlmICghcHJvbWlzZS5fY2FuY2VsQnkoY2hpbGQpKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQuX2lzRm9sbG93aW5nKCkpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5fZm9sbG93ZWUoKS5jYW5jZWwoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuX2NhbmNlbEJyYW5jaGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJlbnQgPSBwcm9taXNlLl9jYW5jZWxsYXRpb25QYXJlbnQ7XG4gICAgICAgIGlmIChwYXJlbnQgPT0gbnVsbCB8fCAhcGFyZW50Ll9pc0NhbmNlbGxhYmxlKCkpIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9pc0ZvbGxvd2luZygpKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fZm9sbG93ZWUoKS5jYW5jZWwoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fY2FuY2VsQnJhbmNoZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHByb21pc2UuX2lzRm9sbG93aW5nKCkpIHByb21pc2UuX2ZvbGxvd2VlKCkuY2FuY2VsKCk7XG4gICAgICAgICAgICBwcm9taXNlLl9zZXRXaWxsQmVDYW5jZWxsZWQoKTtcbiAgICAgICAgICAgIGNoaWxkID0gcHJvbWlzZTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fYnJhbmNoSGFzQ2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbC0tO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2Vub3VnaEJyYW5jaGVzSGF2ZUNhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgdGhpcy5fYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbCA8PSAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2NhbmNlbEJ5ID0gZnVuY3Rpb24oY2FuY2VsbGVyKSB7XG4gICAgaWYgKGNhbmNlbGxlciA9PT0gdGhpcykge1xuICAgICAgICB0aGlzLl9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID0gMDtcbiAgICAgICAgdGhpcy5faW52b2tlT25DYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fYnJhbmNoSGFzQ2FuY2VsbGVkKCk7XG4gICAgICAgIGlmICh0aGlzLl9lbm91Z2hCcmFuY2hlc0hhdmVDYW5jZWxsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5faW52b2tlT25DYW5jZWwoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9jYW5jZWxCcmFuY2hlZCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9lbm91Z2hCcmFuY2hlc0hhdmVDYW5jZWxsZWQoKSkge1xuICAgICAgICB0aGlzLl9jYW5jZWwoKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLl9pc0NhbmNlbGxhYmxlKCkpIHJldHVybjtcbiAgICB0aGlzLl9zZXRDYW5jZWxsZWQoKTtcbiAgICBhc3luYy5pbnZva2UodGhpcy5fY2FuY2VsUHJvbWlzZXMsIHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fY2FuY2VsUHJvbWlzZXMgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fbGVuZ3RoKCkgPiAwKSB0aGlzLl9zZXR0bGVQcm9taXNlcygpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Vuc2V0T25DYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9vbkNhbmNlbEZpZWxkID0gdW5kZWZpbmVkO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2lzQ2FuY2VsbGFibGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pc1BlbmRpbmcoKSAmJiAhdGhpcy5faXNDYW5jZWxsZWQoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmlzQ2FuY2VsbGFibGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pc1BlbmRpbmcoKSAmJiAhdGhpcy5pc0NhbmNlbGxlZCgpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2RvSW52b2tlT25DYW5jZWwgPSBmdW5jdGlvbihvbkNhbmNlbENhbGxiYWNrLCBpbnRlcm5hbE9ubHkpIHtcbiAgICBpZiAodXRpbC5pc0FycmF5KG9uQ2FuY2VsQ2FsbGJhY2spKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb25DYW5jZWxDYWxsYmFjay5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5fZG9JbnZva2VPbkNhbmNlbChvbkNhbmNlbENhbGxiYWNrW2ldLCBpbnRlcm5hbE9ubHkpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvbkNhbmNlbENhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvbkNhbmNlbENhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGlmICghaW50ZXJuYWxPbmx5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGUgPSB0cnlDYXRjaChvbkNhbmNlbENhbGxiYWNrKS5jYWxsKHRoaXMuX2JvdW5kVmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IGVycm9yT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F0dGFjaEV4dHJhVHJhY2UoZS5lKTtcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMudGhyb3dMYXRlcihlLmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uQ2FuY2VsQ2FsbGJhY2suX3Jlc3VsdENhbmNlbGxlZCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pbnZva2VPbkNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvbkNhbmNlbENhbGxiYWNrID0gdGhpcy5fb25DYW5jZWwoKTtcbiAgICB0aGlzLl91bnNldE9uQ2FuY2VsKCk7XG4gICAgYXN5bmMuaW52b2tlKHRoaXMuX2RvSW52b2tlT25DYW5jZWwsIHRoaXMsIG9uQ2FuY2VsQ2FsbGJhY2spO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2ludm9rZUludGVybmFsT25DYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5faXNDYW5jZWxsYWJsZSgpKSB7XG4gICAgICAgIHRoaXMuX2RvSW52b2tlT25DYW5jZWwodGhpcy5fb25DYW5jZWwoKSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3Vuc2V0T25DYW5jZWwoKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jYW5jZWwoKTtcbn07XG5cbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSw3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihORVhUX0ZJTFRFUikge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGdldEtleXMgPSBfZGVyZXFfKFwiLi9lczVcIikua2V5cztcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG52YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xuXG5mdW5jdGlvbiBjYXRjaEZpbHRlcihpbnN0YW5jZXMsIGNiLCBwcm9taXNlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGJvdW5kVG8gPSBwcm9taXNlLl9ib3VuZFZhbHVlKCk7XG4gICAgICAgIHByZWRpY2F0ZUxvb3A6IGZvciAodmFyIGkgPSAwOyBpIDwgaW5zdGFuY2VzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGluc3RhbmNlc1tpXTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IEVycm9yIHx8XG4gICAgICAgICAgICAgICAgKGl0ZW0gIT0gbnVsbCAmJiBpdGVtLnByb3RvdHlwZSBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ5Q2F0Y2goY2IpLmNhbGwoYm91bmRUbywgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoZXNQcmVkaWNhdGUgPSB0cnlDYXRjaChpdGVtKS5jYWxsKGJvdW5kVG8sIGUpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzUHJlZGljYXRlID09PSBlcnJvck9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1ByZWRpY2F0ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZXNQcmVkaWNhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyeUNhdGNoKGNiKS5jYWxsKGJvdW5kVG8sIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXRpbC5pc09iamVjdChlKSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gZ2V0S2V5cyhpdGVtKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtW2tleV0gIT0gZVtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBwcmVkaWNhdGVMb29wO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnlDYXRjaChjYikuY2FsbChib3VuZFRvLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTkVYVF9GSUxURVI7XG4gICAgfTtcbn1cblxucmV0dXJuIGNhdGNoRmlsdGVyO1xufTtcblxufSx7XCIuL2VzNVwiOjEzLFwiLi91dGlsXCI6MzZ9XSw4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlKSB7XG52YXIgbG9uZ1N0YWNrVHJhY2VzID0gZmFsc2U7XG52YXIgY29udGV4dFN0YWNrID0gW107XG5cblByb21pc2UucHJvdG90eXBlLl9wcm9taXNlQ3JlYXRlZCA9IGZ1bmN0aW9uKCkge307XG5Qcm9taXNlLnByb3RvdHlwZS5fcHVzaENvbnRleHQgPSBmdW5jdGlvbigpIHt9O1xuUHJvbWlzZS5wcm90b3R5cGUuX3BvcENvbnRleHQgPSBmdW5jdGlvbigpIHtyZXR1cm4gbnVsbDt9O1xuUHJvbWlzZS5fcGVla0NvbnRleHQgPSBQcm9taXNlLnByb3RvdHlwZS5fcGVla0NvbnRleHQgPSBmdW5jdGlvbigpIHt9O1xuXG5mdW5jdGlvbiBDb250ZXh0KCkge1xuICAgIHRoaXMuX3RyYWNlID0gbmV3IENvbnRleHQuQ2FwdHVyZWRUcmFjZShwZWVrQ29udGV4dCgpKTtcbn1cbkNvbnRleHQucHJvdG90eXBlLl9wdXNoQ29udGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fdHJhY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl90cmFjZS5fcHJvbWlzZUNyZWF0ZWQgPSBudWxsO1xuICAgICAgICBjb250ZXh0U3RhY2sucHVzaCh0aGlzLl90cmFjZSk7XG4gICAgfVxufTtcblxuQ29udGV4dC5wcm90b3R5cGUuX3BvcENvbnRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX3RyYWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHRyYWNlID0gY29udGV4dFN0YWNrLnBvcCgpO1xuICAgICAgICB2YXIgcmV0ID0gdHJhY2UuX3Byb21pc2VDcmVhdGVkO1xuICAgICAgICB0cmFjZS5fcHJvbWlzZUNyZWF0ZWQgPSBudWxsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoKSB7XG4gICAgaWYgKGxvbmdTdGFja1RyYWNlcykgcmV0dXJuIG5ldyBDb250ZXh0KCk7XG59XG5cbmZ1bmN0aW9uIHBlZWtDb250ZXh0KCkge1xuICAgIHZhciBsYXN0SW5kZXggPSBjb250ZXh0U3RhY2subGVuZ3RoIC0gMTtcbiAgICBpZiAobGFzdEluZGV4ID49IDApIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHRTdGFja1tsYXN0SW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuQ29udGV4dC5DYXB0dXJlZFRyYWNlID0gbnVsbDtcbkNvbnRleHQuY3JlYXRlID0gY3JlYXRlQ29udGV4dDtcbkNvbnRleHQuZGVhY3RpdmF0ZUxvbmdTdGFja1RyYWNlcyA9IGZ1bmN0aW9uKCkge307XG5Db250ZXh0LmFjdGl2YXRlTG9uZ1N0YWNrVHJhY2VzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIFByb21pc2VfcHVzaENvbnRleHQgPSBQcm9taXNlLnByb3RvdHlwZS5fcHVzaENvbnRleHQ7XG4gICAgdmFyIFByb21pc2VfcG9wQ29udGV4dCA9IFByb21pc2UucHJvdG90eXBlLl9wb3BDb250ZXh0O1xuICAgIHZhciBQcm9taXNlX1BlZWtDb250ZXh0ID0gUHJvbWlzZS5fcGVla0NvbnRleHQ7XG4gICAgdmFyIFByb21pc2VfcGVla0NvbnRleHQgPSBQcm9taXNlLnByb3RvdHlwZS5fcGVla0NvbnRleHQ7XG4gICAgdmFyIFByb21pc2VfcHJvbWlzZUNyZWF0ZWQgPSBQcm9taXNlLnByb3RvdHlwZS5fcHJvbWlzZUNyZWF0ZWQ7XG4gICAgQ29udGV4dC5kZWFjdGl2YXRlTG9uZ1N0YWNrVHJhY2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9wdXNoQ29udGV4dCA9IFByb21pc2VfcHVzaENvbnRleHQ7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9wb3BDb250ZXh0ID0gUHJvbWlzZV9wb3BDb250ZXh0O1xuICAgICAgICBQcm9taXNlLl9wZWVrQ29udGV4dCA9IFByb21pc2VfUGVla0NvbnRleHQ7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9wZWVrQ29udGV4dCA9IFByb21pc2VfcGVla0NvbnRleHQ7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9wcm9taXNlQ3JlYXRlZCA9IFByb21pc2VfcHJvbWlzZUNyZWF0ZWQ7XG4gICAgICAgIGxvbmdTdGFja1RyYWNlcyA9IGZhbHNlO1xuICAgIH07XG4gICAgbG9uZ1N0YWNrVHJhY2VzID0gdHJ1ZTtcbiAgICBQcm9taXNlLnByb3RvdHlwZS5fcHVzaENvbnRleHQgPSBDb250ZXh0LnByb3RvdHlwZS5fcHVzaENvbnRleHQ7XG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX3BvcENvbnRleHQgPSBDb250ZXh0LnByb3RvdHlwZS5fcG9wQ29udGV4dDtcbiAgICBQcm9taXNlLl9wZWVrQ29udGV4dCA9IFByb21pc2UucHJvdG90eXBlLl9wZWVrQ29udGV4dCA9IHBlZWtDb250ZXh0O1xuICAgIFByb21pc2UucHJvdG90eXBlLl9wcm9taXNlQ3JlYXRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3R4ID0gdGhpcy5fcGVla0NvbnRleHQoKTtcbiAgICAgICAgaWYgKGN0eCAmJiBjdHguX3Byb21pc2VDcmVhdGVkID09IG51bGwpIGN0eC5fcHJvbWlzZUNyZWF0ZWQgPSB0aGlzO1xuICAgIH07XG59O1xucmV0dXJuIENvbnRleHQ7XG59O1xuXG59LHt9XSw5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBDb250ZXh0KSB7XG52YXIgZ2V0RG9tYWluID0gUHJvbWlzZS5fZ2V0RG9tYWluO1xudmFyIGFzeW5jID0gUHJvbWlzZS5fYXN5bmM7XG52YXIgV2FybmluZyA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKS5XYXJuaW5nO1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGNhbkF0dGFjaFRyYWNlID0gdXRpbC5jYW5BdHRhY2hUcmFjZTtcbnZhciB1bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVkO1xudmFyIHBvc3NpYmx5VW5oYW5kbGVkUmVqZWN0aW9uO1xudmFyIGJsdWViaXJkRnJhbWVQYXR0ZXJuID1cbiAgICAvW1xcXFxcXC9dYmx1ZWJpcmRbXFxcXFxcL11qc1tcXFxcXFwvXShyZWxlYXNlfGRlYnVnfGluc3RydW1lbnRlZCkvO1xudmFyIG5vZGVGcmFtZVBhdHRlcm4gPSAvXFwoKD86dGltZXJzXFwuanMpOlxcZCs6XFxkK1xcKS87XG52YXIgcGFyc2VMaW5lUGF0dGVybiA9IC9bXFwvPFxcKF0oLis/KTooXFxkKyk6KFxcZCspXFwpP1xccyokLztcbnZhciBzdGFja0ZyYW1lUGF0dGVybiA9IG51bGw7XG52YXIgZm9ybWF0U3RhY2sgPSBudWxsO1xudmFyIGluZGVudFN0YWNrRnJhbWVzID0gZmFsc2U7XG52YXIgcHJpbnRXYXJuaW5nO1xudmFyIGRlYnVnZ2luZyA9ICEhKHV0aWwuZW52KFwiQkxVRUJJUkRfREVCVUdcIikgIT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKHRydWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmVudihcIkJMVUVCSVJEX0RFQlVHXCIpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5lbnYoXCJOT0RFX0VOVlwiKSA9PT0gXCJkZXZlbG9wbWVudFwiKSk7XG5cbnZhciB3YXJuaW5ncyA9ICEhKHV0aWwuZW52KFwiQkxVRUJJUkRfV0FSTklOR1NcIikgIT0gMCAmJlxuICAgIChkZWJ1Z2dpbmcgfHwgdXRpbC5lbnYoXCJCTFVFQklSRF9XQVJOSU5HU1wiKSkpO1xuXG52YXIgbG9uZ1N0YWNrVHJhY2VzID0gISEodXRpbC5lbnYoXCJCTFVFQklSRF9MT05HX1NUQUNLX1RSQUNFU1wiKSAhPSAwICYmXG4gICAgKGRlYnVnZ2luZyB8fCB1dGlsLmVudihcIkJMVUVCSVJEX0xPTkdfU1RBQ0tfVFJBQ0VTXCIpKSk7XG5cbnZhciB3Rm9yZ290dGVuUmV0dXJuID0gdXRpbC5lbnYoXCJCTFVFQklSRF9XX0ZPUkdPVFRFTl9SRVRVUk5cIikgIT0gMCAmJlxuICAgICh3YXJuaW5ncyB8fCAhIXV0aWwuZW52KFwiQkxVRUJJUkRfV19GT1JHT1RURU5fUkVUVVJOXCIpKTtcblxuUHJvbWlzZS5wcm90b3R5cGUuc3VwcHJlc3NVbmhhbmRsZWRSZWplY3Rpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX3RhcmdldCgpO1xuICAgIHRhcmdldC5fYml0RmllbGQgPSAoKHRhcmdldC5fYml0RmllbGQgJiAofjEwNDg1NzYpKSB8XG4gICAgICAgICAgICAgICAgICAgICAgNTI0Mjg4KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9lbnN1cmVQb3NzaWJsZVJlamVjdGlvbkhhbmRsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCh0aGlzLl9iaXRGaWVsZCAmIDUyNDI4OCkgIT09IDApIHJldHVybjtcbiAgICB0aGlzLl9zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCgpO1xuICAgIGFzeW5jLmludm9rZUxhdGVyKHRoaXMuX25vdGlmeVVuaGFuZGxlZFJlamVjdGlvbiwgdGhpcywgdW5kZWZpbmVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9ub3RpZnlVbmhhbmRsZWRSZWplY3Rpb25Jc0hhbmRsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZmlyZVJlamVjdGlvbkV2ZW50KFwicmVqZWN0aW9uSGFuZGxlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQsIHVuZGVmaW5lZCwgdGhpcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0UmV0dXJuZWROb25VbmRlZmluZWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgMjY4NDM1NDU2O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3JldHVybmVkTm9uVW5kZWZpbmVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDI2ODQzNTQ1NikgIT09IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fbm90aWZ5VW5oYW5kbGVkUmVqZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9pc1JlamVjdGlvblVuaGFuZGxlZCgpKSB7XG4gICAgICAgIHZhciByZWFzb24gPSB0aGlzLl9zZXR0bGVkVmFsdWUoKTtcbiAgICAgICAgdGhpcy5fc2V0VW5oYW5kbGVkUmVqZWN0aW9uSXNOb3RpZmllZCgpO1xuICAgICAgICBmaXJlUmVqZWN0aW9uRXZlbnQoXCJ1bmhhbmRsZWRSZWplY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libHlVbmhhbmRsZWRSZWplY3Rpb24sIHJlYXNvbiwgdGhpcyk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldFVuaGFuZGxlZFJlamVjdGlvbklzTm90aWZpZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDI2MjE0NDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl91bnNldFVuaGFuZGxlZFJlamVjdGlvbklzTm90aWZpZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCAmICh+MjYyMTQ0KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc1VuaGFuZGxlZFJlamVjdGlvbk5vdGlmaWVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiAyNjIxNDQpID4gMDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgMTA0ODU3Njtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl91bnNldFJlamVjdGlvbklzVW5oYW5kbGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgJiAofjEwNDg1NzYpO1xuICAgIGlmICh0aGlzLl9pc1VuaGFuZGxlZFJlamVjdGlvbk5vdGlmaWVkKCkpIHtcbiAgICAgICAgdGhpcy5fdW5zZXRVbmhhbmRsZWRSZWplY3Rpb25Jc05vdGlmaWVkKCk7XG4gICAgICAgIHRoaXMuX25vdGlmeVVuaGFuZGxlZFJlamVjdGlvbklzSGFuZGxlZCgpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc1JlamVjdGlvblVuaGFuZGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgMTA0ODU3NikgPiAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3dhcm4gPSBmdW5jdGlvbihtZXNzYWdlLCBzaG91bGRVc2VPd25UcmFjZSwgcHJvbWlzZSkge1xuICAgIHJldHVybiB3YXJuKG1lc3NhZ2UsIHNob3VsZFVzZU93blRyYWNlLCBwcm9taXNlIHx8IHRoaXMpO1xufTtcblxuUHJvbWlzZS5vblBvc3NpYmx5VW5oYW5kbGVkUmVqZWN0aW9uID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIGRvbWFpbiA9IGdldERvbWFpbigpO1xuICAgIHBvc3NpYmx5VW5oYW5kbGVkUmVqZWN0aW9uID1cbiAgICAgICAgdHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIgPyAoZG9tYWluID09PSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4gOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBmbikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbn07XG5cblByb21pc2Uub25VbmhhbmRsZWRSZWplY3Rpb25IYW5kbGVkID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIGRvbWFpbiA9IGdldERvbWFpbigpO1xuICAgIHVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQgPVxuICAgICAgICB0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIiA/IChkb21haW4gPT09IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbiA6IHV0aWwuZG9tYWluQmluZChkb21haW4sIGZuKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xufTtcblxudmFyIGRpc2FibGVMb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbigpIHt9O1xuUHJvbWlzZS5sb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFzeW5jLmhhdmVJdGVtc1F1ZXVlZCgpICYmICFjb25maWcubG9uZ1N0YWNrVHJhY2VzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbm5vdCBlbmFibGUgbG9uZyBzdGFjayB0cmFjZXMgYWZ0ZXIgcHJvbWlzZXMgaGF2ZSBiZWVuIGNyZWF0ZWRcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cbiAgICBpZiAoIWNvbmZpZy5sb25nU3RhY2tUcmFjZXMgJiYgbG9uZ1N0YWNrVHJhY2VzSXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICB2YXIgUHJvbWlzZV9jYXB0dXJlU3RhY2tUcmFjZSA9IFByb21pc2UucHJvdG90eXBlLl9jYXB0dXJlU3RhY2tUcmFjZTtcbiAgICAgICAgdmFyIFByb21pc2VfYXR0YWNoRXh0cmFUcmFjZSA9IFByb21pc2UucHJvdG90eXBlLl9hdHRhY2hFeHRyYVRyYWNlO1xuICAgICAgICBjb25maWcubG9uZ1N0YWNrVHJhY2VzID0gdHJ1ZTtcbiAgICAgICAgZGlzYWJsZUxvbmdTdGFja1RyYWNlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGFzeW5jLmhhdmVJdGVtc1F1ZXVlZCgpICYmICFjb25maWcubG9uZ1N0YWNrVHJhY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGVuYWJsZSBsb25nIHN0YWNrIHRyYWNlcyBhZnRlciBwcm9taXNlcyBoYXZlIGJlZW4gY3JlYXRlZFxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fY2FwdHVyZVN0YWNrVHJhY2UgPSBQcm9taXNlX2NhcHR1cmVTdGFja1RyYWNlO1xuICAgICAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2F0dGFjaEV4dHJhVHJhY2UgPSBQcm9taXNlX2F0dGFjaEV4dHJhVHJhY2U7XG4gICAgICAgICAgICBDb250ZXh0LmRlYWN0aXZhdGVMb25nU3RhY2tUcmFjZXMoKTtcbiAgICAgICAgICAgIGFzeW5jLmVuYWJsZVRyYW1wb2xpbmUoKTtcbiAgICAgICAgICAgIGNvbmZpZy5sb25nU3RhY2tUcmFjZXMgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2NhcHR1cmVTdGFja1RyYWNlID0gbG9uZ1N0YWNrVHJhY2VzQ2FwdHVyZVN0YWNrVHJhY2U7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9hdHRhY2hFeHRyYVRyYWNlID0gbG9uZ1N0YWNrVHJhY2VzQXR0YWNoRXh0cmFUcmFjZTtcbiAgICAgICAgQ29udGV4dC5hY3RpdmF0ZUxvbmdTdGFja1RyYWNlcygpO1xuICAgICAgICBhc3luYy5kaXNhYmxlVHJhbXBvbGluZUlmTmVjZXNzYXJ5KCk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5oYXNMb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNvbmZpZy5sb25nU3RhY2tUcmFjZXMgJiYgbG9uZ1N0YWNrVHJhY2VzSXNTdXBwb3J0ZWQoKTtcbn07XG5cbnZhciBmaXJlRG9tRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICAgICAgICAgIHV0aWwuZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvbUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUudG9Mb3dlckNhc2UoKSwge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF1dGlsLmdsb2JhbC5kaXNwYXRjaEV2ZW50KGRvbUV2ZW50KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgICAgICAgdXRpbC5nbG9iYWwuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24obmFtZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9tRXZlbnQgPSBuZXcgRXZlbnQobmFtZS50b0xvd2VyQ2FzZSgpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkb21FdmVudC5kZXRhaWwgPSBldmVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXV0aWwuZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZG9tRXZlbnQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQoXCJ0ZXN0aW5ndGhlZXZlbnRcIiwgZmFsc2UsIHRydWUsIHt9KTtcbiAgICAgICAgICAgIHV0aWwuZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvbUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICAgICAgICAgICAgICBkb21FdmVudC5pbml0Q3VzdG9tRXZlbnQobmFtZS50b0xvd2VyQ2FzZSgpLCBmYWxzZSwgdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiAhdXRpbC5nbG9iYWwuZGlzcGF0Y2hFdmVudChkb21FdmVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufSkoKTtcblxudmFyIGZpcmVHbG9iYWxFdmVudCA9IChmdW5jdGlvbigpIHtcbiAgICBpZiAodXRpbC5pc05vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZW1pdC5hcHBseShwcm9jZXNzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdXRpbC5nbG9iYWwpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IFwib25cIiArIG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSB1dGlsLmdsb2JhbFttZXRob2ROYW1lXTtcbiAgICAgICAgICAgIGlmICghbWV0aG9kKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBtZXRob2QuYXBwbHkodXRpbC5nbG9iYWwsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9XG59KSgpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdChuYW1lLCBwcm9taXNlKSB7XG4gICAgcmV0dXJuIHtwcm9taXNlOiBwcm9taXNlfTtcbn1cblxudmFyIGV2ZW50VG9PYmplY3RHZW5lcmF0b3IgPSB7XG4gICAgcHJvbWlzZUNyZWF0ZWQ6IGdlbmVyYXRlUHJvbWlzZUxpZmVjeWNsZUV2ZW50T2JqZWN0LFxuICAgIHByb21pc2VGdWxmaWxsZWQ6IGdlbmVyYXRlUHJvbWlzZUxpZmVjeWNsZUV2ZW50T2JqZWN0LFxuICAgIHByb21pc2VSZWplY3RlZDogZ2VuZXJhdGVQcm9taXNlTGlmZWN5Y2xlRXZlbnRPYmplY3QsXG4gICAgcHJvbWlzZVJlc29sdmVkOiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdCxcbiAgICBwcm9taXNlQ2FuY2VsbGVkOiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdCxcbiAgICBwcm9taXNlQ2hhaW5lZDogZnVuY3Rpb24obmFtZSwgcHJvbWlzZSwgY2hpbGQpIHtcbiAgICAgICAgcmV0dXJuIHtwcm9taXNlOiBwcm9taXNlLCBjaGlsZDogY2hpbGR9O1xuICAgIH0sXG4gICAgd2FybmluZzogZnVuY3Rpb24obmFtZSwgd2FybmluZykge1xuICAgICAgICByZXR1cm4ge3dhcm5pbmc6IHdhcm5pbmd9O1xuICAgIH0sXG4gICAgdW5oYW5kbGVkUmVqZWN0aW9uOiBmdW5jdGlvbiAobmFtZSwgcmVhc29uLCBwcm9taXNlKSB7XG4gICAgICAgIHJldHVybiB7cmVhc29uOiByZWFzb24sIHByb21pc2U6IHByb21pc2V9O1xuICAgIH0sXG4gICAgcmVqZWN0aW9uSGFuZGxlZDogZ2VuZXJhdGVQcm9taXNlTGlmZWN5Y2xlRXZlbnRPYmplY3Rcbn07XG5cbnZhciBhY3RpdmVGaXJlRXZlbnQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBnbG9iYWxFdmVudEZpcmVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgZ2xvYmFsRXZlbnRGaXJlZCA9IGZpcmVHbG9iYWxFdmVudC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgYXN5bmMudGhyb3dMYXRlcihlKTtcbiAgICAgICAgZ2xvYmFsRXZlbnRGaXJlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGRvbUV2ZW50RmlyZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBkb21FdmVudEZpcmVkID0gZmlyZURvbUV2ZW50KG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VG9PYmplY3RHZW5lcmF0b3JbbmFtZV0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBhc3luYy50aHJvd0xhdGVyKGUpO1xuICAgICAgICBkb21FdmVudEZpcmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZG9tRXZlbnRGaXJlZCB8fCBnbG9iYWxFdmVudEZpcmVkO1xufTtcblxuUHJvbWlzZS5jb25maWcgPSBmdW5jdGlvbihvcHRzKSB7XG4gICAgb3B0cyA9IE9iamVjdChvcHRzKTtcbiAgICBpZiAoXCJsb25nU3RhY2tUcmFjZXNcIiBpbiBvcHRzKSB7XG4gICAgICAgIGlmIChvcHRzLmxvbmdTdGFja1RyYWNlcykge1xuICAgICAgICAgICAgUHJvbWlzZS5sb25nU3RhY2tUcmFjZXMoKTtcbiAgICAgICAgfSBlbHNlIGlmICghb3B0cy5sb25nU3RhY2tUcmFjZXMgJiYgUHJvbWlzZS5oYXNMb25nU3RhY2tUcmFjZXMoKSkge1xuICAgICAgICAgICAgZGlzYWJsZUxvbmdTdGFja1RyYWNlcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChcIndhcm5pbmdzXCIgaW4gb3B0cykge1xuICAgICAgICB2YXIgd2FybmluZ3NPcHRpb24gPSBvcHRzLndhcm5pbmdzO1xuICAgICAgICBjb25maWcud2FybmluZ3MgPSAhIXdhcm5pbmdzT3B0aW9uO1xuICAgICAgICB3Rm9yZ290dGVuUmV0dXJuID0gY29uZmlnLndhcm5pbmdzO1xuXG4gICAgICAgIGlmICh1dGlsLmlzT2JqZWN0KHdhcm5pbmdzT3B0aW9uKSkge1xuICAgICAgICAgICAgaWYgKFwid0ZvcmdvdHRlblJldHVyblwiIGluIHdhcm5pbmdzT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgd0ZvcmdvdHRlblJldHVybiA9ICEhd2FybmluZ3NPcHRpb24ud0ZvcmdvdHRlblJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoXCJjYW5jZWxsYXRpb25cIiBpbiBvcHRzICYmIG9wdHMuY2FuY2VsbGF0aW9uICYmICFjb25maWcuY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGlmIChhc3luYy5oYXZlSXRlbXNRdWV1ZWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIFwiY2Fubm90IGVuYWJsZSBjYW5jZWxsYXRpb24gYWZ0ZXIgcHJvbWlzZXMgYXJlIGluIHVzZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fY2xlYXJDYW5jZWxsYXRpb25EYXRhID1cbiAgICAgICAgICAgIGNhbmNlbGxhdGlvbkNsZWFyQ2FuY2VsbGF0aW9uRGF0YTtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX3Byb3BhZ2F0ZUZyb20gPSBjYW5jZWxsYXRpb25Qcm9wYWdhdGVGcm9tO1xuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fb25DYW5jZWwgPSBjYW5jZWxsYXRpb25PbkNhbmNlbDtcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX3NldE9uQ2FuY2VsID0gY2FuY2VsbGF0aW9uU2V0T25DYW5jZWw7XG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9hdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjayA9XG4gICAgICAgICAgICBjYW5jZWxsYXRpb25BdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjaztcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2V4ZWN1dGUgPSBjYW5jZWxsYXRpb25FeGVjdXRlO1xuICAgICAgICBwcm9wYWdhdGVGcm9tRnVuY3Rpb24gPSBjYW5jZWxsYXRpb25Qcm9wYWdhdGVGcm9tO1xuICAgICAgICBjb25maWcuY2FuY2VsbGF0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKFwibW9uaXRvcmluZ1wiIGluIG9wdHMpIHtcbiAgICAgICAgaWYgKG9wdHMubW9uaXRvcmluZyAmJiAhY29uZmlnLm1vbml0b3JpbmcpIHtcbiAgICAgICAgICAgIGNvbmZpZy5tb25pdG9yaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIFByb21pc2UucHJvdG90eXBlLl9maXJlRXZlbnQgPSBhY3RpdmVGaXJlRXZlbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIW9wdHMubW9uaXRvcmluZyAmJiBjb25maWcubW9uaXRvcmluZykge1xuICAgICAgICAgICAgY29uZmlnLm1vbml0b3JpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIFByb21pc2UucHJvdG90eXBlLl9maXJlRXZlbnQgPSBkZWZhdWx0RmlyZUV2ZW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlO1xufTtcblxuZnVuY3Rpb24gZGVmYXVsdEZpcmVFdmVudCgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblByb21pc2UucHJvdG90eXBlLl9maXJlRXZlbnQgPSBkZWZhdWx0RmlyZUV2ZW50O1xuUHJvbWlzZS5wcm90b3R5cGUuX2V4ZWN1dGUgPSBmdW5jdGlvbihleGVjdXRvciwgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cbn07XG5Qcm9taXNlLnByb3RvdHlwZS5fb25DYW5jZWwgPSBmdW5jdGlvbiAoKSB7fTtcblByb21pc2UucHJvdG90eXBlLl9zZXRPbkNhbmNlbCA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7IDsgfTtcblByb21pc2UucHJvdG90eXBlLl9hdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjayA9IGZ1bmN0aW9uKG9uQ2FuY2VsKSB7XG4gICAgO1xufTtcblByb21pc2UucHJvdG90eXBlLl9jYXB0dXJlU3RhY2tUcmFjZSA9IGZ1bmN0aW9uICgpIHt9O1xuUHJvbWlzZS5wcm90b3R5cGUuX2F0dGFjaEV4dHJhVHJhY2UgPSBmdW5jdGlvbiAoKSB7fTtcblByb21pc2UucHJvdG90eXBlLl9jbGVhckNhbmNlbGxhdGlvbkRhdGEgPSBmdW5jdGlvbigpIHt9O1xuUHJvbWlzZS5wcm90b3R5cGUuX3Byb3BhZ2F0ZUZyb20gPSBmdW5jdGlvbiAocGFyZW50LCBmbGFncykge1xuICAgIDtcbiAgICA7XG59O1xuXG5mdW5jdGlvbiBjYW5jZWxsYXRpb25FeGVjdXRlKGV4ZWN1dG9yLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgdHJ5IHtcbiAgICAgICAgZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0LCBmdW5jdGlvbihvbkNhbmNlbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvbkNhbmNlbCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9uQ2FuY2VsIG11c3QgYmUgYSBmdW5jdGlvbiwgZ290OiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnRvU3RyaW5nKG9uQ2FuY2VsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9taXNlLl9hdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjayhvbkNhbmNlbCk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYW5jZWxsYXRpb25BdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjayhvbkNhbmNlbCkge1xuICAgIGlmICghdGhpcy5faXNDYW5jZWxsYWJsZSgpKSByZXR1cm4gdGhpcztcblxuICAgIHZhciBwcmV2aW91c09uQ2FuY2VsID0gdGhpcy5fb25DYW5jZWwoKTtcbiAgICBpZiAocHJldmlvdXNPbkNhbmNlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh1dGlsLmlzQXJyYXkocHJldmlvdXNPbkNhbmNlbCkpIHtcbiAgICAgICAgICAgIHByZXZpb3VzT25DYW5jZWwucHVzaChvbkNhbmNlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRPbkNhbmNlbChbcHJldmlvdXNPbkNhbmNlbCwgb25DYW5jZWxdKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NldE9uQ2FuY2VsKG9uQ2FuY2VsKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbmNlbGxhdGlvbk9uQ2FuY2VsKCkge1xuICAgIHJldHVybiB0aGlzLl9vbkNhbmNlbEZpZWxkO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxsYXRpb25TZXRPbkNhbmNlbChvbkNhbmNlbCkge1xuICAgIHRoaXMuX29uQ2FuY2VsRmllbGQgPSBvbkNhbmNlbDtcbn1cblxuZnVuY3Rpb24gY2FuY2VsbGF0aW9uQ2xlYXJDYW5jZWxsYXRpb25EYXRhKCkge1xuICAgIHRoaXMuX2NhbmNlbGxhdGlvblBhcmVudCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9vbkNhbmNlbEZpZWxkID0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxsYXRpb25Qcm9wYWdhdGVGcm9tKHBhcmVudCwgZmxhZ3MpIHtcbiAgICBpZiAoKGZsYWdzICYgMSkgIT09IDApIHtcbiAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uUGFyZW50ID0gcGFyZW50O1xuICAgICAgICB2YXIgYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbCA9IHBhcmVudC5fYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbDtcbiAgICAgICAgaWYgKGJyYW5jaGVzUmVtYWluaW5nVG9DYW5jZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50Ll9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID0gYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbCArIDE7XG4gICAgfVxuICAgIGlmICgoZmxhZ3MgJiAyKSAhPT0gMCAmJiBwYXJlbnQuX2lzQm91bmQoKSkge1xuICAgICAgICB0aGlzLl9zZXRCb3VuZFRvKHBhcmVudC5fYm91bmRUbyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBiaW5kaW5nUHJvcGFnYXRlRnJvbShwYXJlbnQsIGZsYWdzKSB7XG4gICAgaWYgKChmbGFncyAmIDIpICE9PSAwICYmIHBhcmVudC5faXNCb3VuZCgpKSB7XG4gICAgICAgIHRoaXMuX3NldEJvdW5kVG8ocGFyZW50Ll9ib3VuZFRvKTtcbiAgICB9XG59XG52YXIgcHJvcGFnYXRlRnJvbUZ1bmN0aW9uID0gYmluZGluZ1Byb3BhZ2F0ZUZyb207XG5cbmZ1bmN0aW9uIGJvdW5kVmFsdWVGdW5jdGlvbigpIHtcbiAgICB2YXIgcmV0ID0gdGhpcy5fYm91bmRUbztcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIGlmIChyZXQuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQudmFsdWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBsb25nU3RhY2tUcmFjZXNDYXB0dXJlU3RhY2tUcmFjZSgpIHtcbiAgICB0aGlzLl90cmFjZSA9IG5ldyBDYXB0dXJlZFRyYWNlKHRoaXMuX3BlZWtDb250ZXh0KCkpO1xufVxuXG5mdW5jdGlvbiBsb25nU3RhY2tUcmFjZXNBdHRhY2hFeHRyYVRyYWNlKGVycm9yLCBpZ25vcmVTZWxmKSB7XG4gICAgaWYgKGNhbkF0dGFjaFRyYWNlKGVycm9yKSkge1xuICAgICAgICB2YXIgdHJhY2UgPSB0aGlzLl90cmFjZTtcbiAgICAgICAgaWYgKHRyYWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChpZ25vcmVTZWxmKSB0cmFjZSA9IHRyYWNlLl9wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYWNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRyYWNlLmF0dGFjaEV4dHJhVHJhY2UoZXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKCFlcnJvci5fX3N0YWNrQ2xlYW5lZF9fKSB7XG4gICAgICAgICAgICB2YXIgcGFyc2VkID0gcGFyc2VTdGFja0FuZE1lc3NhZ2UoZXJyb3IpO1xuICAgICAgICAgICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcChlcnJvciwgXCJzdGFja1wiLFxuICAgICAgICAgICAgICAgIHBhcnNlZC5tZXNzYWdlICsgXCJcXG5cIiArIHBhcnNlZC5zdGFjay5qb2luKFwiXFxuXCIpKTtcbiAgICAgICAgICAgIHV0aWwubm90RW51bWVyYWJsZVByb3AoZXJyb3IsIFwiX19zdGFja0NsZWFuZWRfX1wiLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zKHJldHVyblZhbHVlLCBwcm9taXNlQ3JlYXRlZCwgbmFtZSwgcHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQpIHtcbiAgICBpZiAocmV0dXJuVmFsdWUgPT09IHVuZGVmaW5lZCAmJiBwcm9taXNlQ3JlYXRlZCAhPT0gbnVsbCAmJlxuICAgICAgICB3Rm9yZ290dGVuUmV0dXJuKSB7XG4gICAgICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnQuX3JldHVybmVkTm9uVW5kZWZpbmVkKCkpIHJldHVybjtcbiAgICAgICAgaWYgKChwcm9taXNlLl9iaXRGaWVsZCAmIDY1NTM1KSA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChuYW1lKSBuYW1lID0gbmFtZSArIFwiIFwiO1xuICAgICAgICB2YXIgaGFuZGxlckxpbmUgPSBcIlwiO1xuICAgICAgICB2YXIgY3JlYXRvckxpbmUgPSBcIlwiO1xuICAgICAgICBpZiAocHJvbWlzZUNyZWF0ZWQuX3RyYWNlKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2VMaW5lcyA9IHByb21pc2VDcmVhdGVkLl90cmFjZS5zdGFjay5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgIHZhciBzdGFjayA9IGNsZWFuU3RhY2sodHJhY2VMaW5lcyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhY2subGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHN0YWNrW2ldO1xuICAgICAgICAgICAgICAgIGlmICghbm9kZUZyYW1lUGF0dGVybi50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lTWF0Y2hlcyA9IGxpbmUubWF0Y2gocGFyc2VMaW5lUGF0dGVybik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlckxpbmUgID0gXCJhdCBcIiArIGxpbmVNYXRjaGVzWzFdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjpcIiArIGxpbmVNYXRjaGVzWzJdICsgXCI6XCIgKyBsaW5lTWF0Y2hlc1szXSArIFwiIFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RVc2VyTGluZSA9IHN0YWNrWzBdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhY2VMaW5lcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFjZUxpbmVzW2ldID09PSBmaXJzdFVzZXJMaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdG9yTGluZSA9IFwiXFxuXCIgKyB0cmFjZUxpbmVzW2kgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1zZyA9IFwiYSBwcm9taXNlIHdhcyBjcmVhdGVkIGluIGEgXCIgKyBuYW1lICtcbiAgICAgICAgICAgIFwiaGFuZGxlciBcIiArIGhhbmRsZXJMaW5lICsgXCJidXQgd2FzIG5vdCByZXR1cm5lZCBmcm9tIGl0LCBcIiArXG4gICAgICAgICAgICBcInNlZSBodHRwOi8vZ29vLmdsL3JScU1Vd1wiICtcbiAgICAgICAgICAgIGNyZWF0b3JMaW5lO1xuICAgICAgICBwcm9taXNlLl93YXJuKG1zZywgdHJ1ZSwgcHJvbWlzZUNyZWF0ZWQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVwcmVjYXRlZChuYW1lLCByZXBsYWNlbWVudCkge1xuICAgIHZhciBtZXNzYWdlID0gbmFtZSArXG4gICAgICAgIFwiIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uLlwiO1xuICAgIGlmIChyZXBsYWNlbWVudCkgbWVzc2FnZSArPSBcIiBVc2UgXCIgKyByZXBsYWNlbWVudCArIFwiIGluc3RlYWQuXCI7XG4gICAgcmV0dXJuIHdhcm4obWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIHdhcm4obWVzc2FnZSwgc2hvdWxkVXNlT3duVHJhY2UsIHByb21pc2UpIHtcbiAgICBpZiAoIWNvbmZpZy53YXJuaW5ncykgcmV0dXJuO1xuICAgIHZhciB3YXJuaW5nID0gbmV3IFdhcm5pbmcobWVzc2FnZSk7XG4gICAgdmFyIGN0eDtcbiAgICBpZiAoc2hvdWxkVXNlT3duVHJhY2UpIHtcbiAgICAgICAgcHJvbWlzZS5fYXR0YWNoRXh0cmFUcmFjZSh3YXJuaW5nKTtcbiAgICB9IGVsc2UgaWYgKGNvbmZpZy5sb25nU3RhY2tUcmFjZXMgJiYgKGN0eCA9IFByb21pc2UuX3BlZWtDb250ZXh0KCkpKSB7XG4gICAgICAgIGN0eC5hdHRhY2hFeHRyYVRyYWNlKHdhcm5pbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSBwYXJzZVN0YWNrQW5kTWVzc2FnZSh3YXJuaW5nKTtcbiAgICAgICAgd2FybmluZy5zdGFjayA9IHBhcnNlZC5tZXNzYWdlICsgXCJcXG5cIiArIHBhcnNlZC5zdGFjay5qb2luKFwiXFxuXCIpO1xuICAgIH1cblxuICAgIGlmICghYWN0aXZlRmlyZUV2ZW50KFwid2FybmluZ1wiLCB3YXJuaW5nKSkge1xuICAgICAgICBmb3JtYXRBbmRMb2dFcnJvcih3YXJuaW5nLCBcIlwiLCB0cnVlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlY29uc3RydWN0U3RhY2sobWVzc2FnZSwgc3RhY2tzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFja3MubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgICAgIHN0YWNrc1tpXS5wdXNoKFwiRnJvbSBwcmV2aW91cyBldmVudDpcIik7XG4gICAgICAgIHN0YWNrc1tpXSA9IHN0YWNrc1tpXS5qb2luKFwiXFxuXCIpO1xuICAgIH1cbiAgICBpZiAoaSA8IHN0YWNrcy5sZW5ndGgpIHtcbiAgICAgICAgc3RhY2tzW2ldID0gc3RhY2tzW2ldLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuICAgIHJldHVybiBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrcy5qb2luKFwiXFxuXCIpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVEdXBsaWNhdGVPckVtcHR5SnVtcHMoc3RhY2tzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHN0YWNrc1tpXS5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICgoaSArIDEgPCBzdGFja3MubGVuZ3RoKSAmJiBzdGFja3NbaV1bMF0gPT09IHN0YWNrc1tpKzFdWzBdKSkge1xuICAgICAgICAgICAgc3RhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ29tbW9uUm9vdHMoc3RhY2tzKSB7XG4gICAgdmFyIGN1cnJlbnQgPSBzdGFja3NbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzdGFja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHByZXYgPSBzdGFja3NbaV07XG4gICAgICAgIHZhciBjdXJyZW50TGFzdEluZGV4ID0gY3VycmVudC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgY3VycmVudExhc3RMaW5lID0gY3VycmVudFtjdXJyZW50TGFzdEluZGV4XTtcbiAgICAgICAgdmFyIGNvbW1vblJvb3RNZWV0UG9pbnQgPSAtMTtcblxuICAgICAgICBmb3IgKHZhciBqID0gcHJldi5sZW5ndGggLSAxOyBqID49IDA7IC0taikge1xuICAgICAgICAgICAgaWYgKHByZXZbal0gPT09IGN1cnJlbnRMYXN0TGluZSkge1xuICAgICAgICAgICAgICAgIGNvbW1vblJvb3RNZWV0UG9pbnQgPSBqO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IGNvbW1vblJvb3RNZWV0UG9pbnQ7IGogPj0gMDsgLS1qKSB7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHByZXZbal07XG4gICAgICAgICAgICBpZiAoY3VycmVudFtjdXJyZW50TGFzdEluZGV4XSA9PT0gbGluZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQucG9wKCk7XG4gICAgICAgICAgICAgICAgY3VycmVudExhc3RJbmRleC0tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gcHJldjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFuU3RhY2soc3RhY2spIHtcbiAgICB2YXIgcmV0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgbGluZSA9IHN0YWNrW2ldO1xuICAgICAgICB2YXIgaXNUcmFjZUxpbmUgPSBcIiAgICAoTm8gc3RhY2sgdHJhY2UpXCIgPT09IGxpbmUgfHxcbiAgICAgICAgICAgIHN0YWNrRnJhbWVQYXR0ZXJuLnRlc3QobGluZSk7XG4gICAgICAgIHZhciBpc0ludGVybmFsRnJhbWUgPSBpc1RyYWNlTGluZSAmJiBzaG91bGRJZ25vcmUobGluZSk7XG4gICAgICAgIGlmIChpc1RyYWNlTGluZSAmJiAhaXNJbnRlcm5hbEZyYW1lKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50U3RhY2tGcmFtZXMgJiYgbGluZS5jaGFyQXQoMCkgIT09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgbGluZSA9IFwiICAgIFwiICsgbGluZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldC5wdXNoKGxpbmUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHN0YWNrRnJhbWVzQXNBcnJheShlcnJvcikge1xuICAgIHZhciBzdGFjayA9IGVycm9yLnN0YWNrLnJlcGxhY2UoL1xccyskL2csIFwiXCIpLnNwbGl0KFwiXFxuXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzdGFja1tpXTtcbiAgICAgICAgaWYgKFwiICAgIChObyBzdGFjayB0cmFjZSlcIiA9PT0gbGluZSB8fCBzdGFja0ZyYW1lUGF0dGVybi50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaSA+IDAgJiYgZXJyb3IubmFtZSAhPSBcIlN5bnRheEVycm9yXCIpIHtcbiAgICAgICAgc3RhY2sgPSBzdGFjay5zbGljZShpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YWNrO1xufVxuXG5mdW5jdGlvbiBwYXJzZVN0YWNrQW5kTWVzc2FnZShlcnJvcikge1xuICAgIHZhciBzdGFjayA9IGVycm9yLnN0YWNrO1xuICAgIHZhciBtZXNzYWdlID0gZXJyb3IudG9TdHJpbmcoKTtcbiAgICBzdGFjayA9IHR5cGVvZiBzdGFjayA9PT0gXCJzdHJpbmdcIiAmJiBzdGFjay5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgPyBzdGFja0ZyYW1lc0FzQXJyYXkoZXJyb3IpIDogW1wiICAgIChObyBzdGFjayB0cmFjZSlcIl07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgc3RhY2s6IGVycm9yLm5hbWUgPT0gXCJTeW50YXhFcnJvclwiID8gc3RhY2sgOiBjbGVhblN0YWNrKHN0YWNrKVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEFuZExvZ0Vycm9yKGVycm9yLCB0aXRsZSwgaXNTb2Z0KSB7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHZhciBtZXNzYWdlO1xuICAgICAgICBpZiAodXRpbC5pc09iamVjdChlcnJvcikpIHtcbiAgICAgICAgICAgIHZhciBzdGFjayA9IGVycm9yLnN0YWNrO1xuICAgICAgICAgICAgbWVzc2FnZSA9IHRpdGxlICsgZm9ybWF0U3RhY2soc3RhY2ssIGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSB0aXRsZSArIFN0cmluZyhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBwcmludFdhcm5pbmcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcHJpbnRXYXJuaW5nKG1lc3NhZ2UsIGlzU29mdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbnNvbGUubG9nID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgICAgICAgIHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpcmVSZWplY3Rpb25FdmVudChuYW1lLCBsb2NhbEhhbmRsZXIsIHJlYXNvbiwgcHJvbWlzZSkge1xuICAgIHZhciBsb2NhbEV2ZW50RmlyZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGxvY2FsSGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBsb2NhbEV2ZW50RmlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwicmVqZWN0aW9uSGFuZGxlZFwiKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxIYW5kbGVyKHByb21pc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2NhbEhhbmRsZXIocmVhc29uLCBwcm9taXNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgYXN5bmMudGhyb3dMYXRlcihlKTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PT0gXCJ1bmhhbmRsZWRSZWplY3Rpb25cIikge1xuICAgICAgICBpZiAoIWFjdGl2ZUZpcmVFdmVudChuYW1lLCByZWFzb24sIHByb21pc2UpICYmICFsb2NhbEV2ZW50RmlyZWQpIHtcbiAgICAgICAgICAgIGZvcm1hdEFuZExvZ0Vycm9yKHJlYXNvbiwgXCJVbmhhbmRsZWQgcmVqZWN0aW9uIFwiKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZUZpcmVFdmVudChuYW1lLCBwcm9taXNlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdE5vbkVycm9yKG9iaikge1xuICAgIHZhciBzdHI7XG4gICAgaWYgKHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBzdHIgPSBcIltmdW5jdGlvbiBcIiArXG4gICAgICAgICAgICAob2JqLm5hbWUgfHwgXCJhbm9ueW1vdXNcIikgK1xuICAgICAgICAgICAgXCJdXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gb2JqICYmIHR5cGVvZiBvYmoudG9TdHJpbmcgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgPyBvYmoudG9TdHJpbmcoKSA6IHV0aWwudG9TdHJpbmcob2JqKTtcbiAgICAgICAgdmFyIHJ1c2VsZXNzVG9TdHJpbmcgPSAvXFxbb2JqZWN0IFthLXpBLVowLTkkX10rXFxdLztcbiAgICAgICAgaWYgKHJ1c2VsZXNzVG9TdHJpbmcudGVzdChzdHIpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdTdHIgPSBKU09OLnN0cmluZ2lmeShvYmopO1xuICAgICAgICAgICAgICAgIHN0ciA9IG5ld1N0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoKGUpIHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzdHIgPSBcIihlbXB0eSBhcnJheSlcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFwiKDxcIiArIHNuaXAoc3RyKSArIFwiPiwgbm8gc3RhY2sgdHJhY2UpXCIpO1xufVxuXG5mdW5jdGlvbiBzbmlwKHN0cikge1xuICAgIHZhciBtYXhDaGFycyA9IDQxO1xuICAgIGlmIChzdHIubGVuZ3RoIDwgbWF4Q2hhcnMpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgbWF4Q2hhcnMgLSAzKSArIFwiLi4uXCI7XG59XG5cbmZ1bmN0aW9uIGxvbmdTdGFja1RyYWNlc0lzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiB0eXBlb2YgY2FwdHVyZVN0YWNrVHJhY2UgPT09IFwiZnVuY3Rpb25cIjtcbn1cblxudmFyIHNob3VsZElnbm9yZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH07XG52YXIgcGFyc2VMaW5lSW5mb1JlZ2V4ID0gL1tcXC88XFwoXShbXjpcXC9dKyk6KFxcZCspOig/OlxcZCspXFwpP1xccyokLztcbmZ1bmN0aW9uIHBhcnNlTGluZUluZm8obGluZSkge1xuICAgIHZhciBtYXRjaGVzID0gbGluZS5tYXRjaChwYXJzZUxpbmVJbmZvUmVnZXgpO1xuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaWxlTmFtZTogbWF0Y2hlc1sxXSxcbiAgICAgICAgICAgIGxpbmU6IHBhcnNlSW50KG1hdGNoZXNbMl0sIDEwKVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0Qm91bmRzKGZpcnN0TGluZUVycm9yLCBsYXN0TGluZUVycm9yKSB7XG4gICAgaWYgKCFsb25nU3RhY2tUcmFjZXNJc1N1cHBvcnRlZCgpKSByZXR1cm47XG4gICAgdmFyIGZpcnN0U3RhY2tMaW5lcyA9IGZpcnN0TGluZUVycm9yLnN0YWNrLnNwbGl0KFwiXFxuXCIpO1xuICAgIHZhciBsYXN0U3RhY2tMaW5lcyA9IGxhc3RMaW5lRXJyb3Iuc3RhY2suc3BsaXQoXCJcXG5cIik7XG4gICAgdmFyIGZpcnN0SW5kZXggPSAtMTtcbiAgICB2YXIgbGFzdEluZGV4ID0gLTE7XG4gICAgdmFyIGZpcnN0RmlsZU5hbWU7XG4gICAgdmFyIGxhc3RGaWxlTmFtZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpcnN0U3RhY2tMaW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcGFyc2VMaW5lSW5mbyhmaXJzdFN0YWNrTGluZXNbaV0pO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBmaXJzdEZpbGVOYW1lID0gcmVzdWx0LmZpbGVOYW1lO1xuICAgICAgICAgICAgZmlyc3RJbmRleCA9IHJlc3VsdC5saW5lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0U3RhY2tMaW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcGFyc2VMaW5lSW5mbyhsYXN0U3RhY2tMaW5lc1tpXSk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGxhc3RGaWxlTmFtZSA9IHJlc3VsdC5maWxlTmFtZTtcbiAgICAgICAgICAgIGxhc3RJbmRleCA9IHJlc3VsdC5saW5lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZpcnN0SW5kZXggPCAwIHx8IGxhc3RJbmRleCA8IDAgfHwgIWZpcnN0RmlsZU5hbWUgfHwgIWxhc3RGaWxlTmFtZSB8fFxuICAgICAgICBmaXJzdEZpbGVOYW1lICE9PSBsYXN0RmlsZU5hbWUgfHwgZmlyc3RJbmRleCA+PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNob3VsZElnbm9yZSA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgaWYgKGJsdWViaXJkRnJhbWVQYXR0ZXJuLnRlc3QobGluZSkpIHJldHVybiB0cnVlO1xuICAgICAgICB2YXIgaW5mbyA9IHBhcnNlTGluZUluZm8obGluZSk7XG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICBpZiAoaW5mby5maWxlTmFtZSA9PT0gZmlyc3RGaWxlTmFtZSAmJlxuICAgICAgICAgICAgICAgIChmaXJzdEluZGV4IDw9IGluZm8ubGluZSAmJiBpbmZvLmxpbmUgPD0gbGFzdEluZGV4KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBDYXB0dXJlZFRyYWNlKHBhcmVudCkge1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9wcm9taXNlc0NyZWF0ZWQgPSAwO1xuICAgIHZhciBsZW5ndGggPSB0aGlzLl9sZW5ndGggPSAxICsgKHBhcmVudCA9PT0gdW5kZWZpbmVkID8gMCA6IHBhcmVudC5fbGVuZ3RoKTtcbiAgICBjYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBDYXB0dXJlZFRyYWNlKTtcbiAgICBpZiAobGVuZ3RoID4gMzIpIHRoaXMudW5jeWNsZSgpO1xufVxudXRpbC5pbmhlcml0cyhDYXB0dXJlZFRyYWNlLCBFcnJvcik7XG5Db250ZXh0LkNhcHR1cmVkVHJhY2UgPSBDYXB0dXJlZFRyYWNlO1xuXG5DYXB0dXJlZFRyYWNlLnByb3RvdHlwZS51bmN5Y2xlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuX2xlbmd0aDtcbiAgICBpZiAobGVuZ3RoIDwgMikgcmV0dXJuO1xuICAgIHZhciBub2RlcyA9IFtdO1xuICAgIHZhciBzdGFja1RvSW5kZXggPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBub2RlID0gdGhpczsgbm9kZSAhPT0gdW5kZWZpbmVkOyArK2kpIHtcbiAgICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX3BhcmVudDtcbiAgICB9XG4gICAgbGVuZ3RoID0gdGhpcy5fbGVuZ3RoID0gaTtcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIHN0YWNrID0gbm9kZXNbaV0uc3RhY2s7XG4gICAgICAgIGlmIChzdGFja1RvSW5kZXhbc3RhY2tdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN0YWNrVG9JbmRleFtzdGFja10gPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRTdGFjayA9IG5vZGVzW2ldLnN0YWNrO1xuICAgICAgICB2YXIgaW5kZXggPSBzdGFja1RvSW5kZXhbY3VycmVudFN0YWNrXTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQgJiYgaW5kZXggIT09IGkpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICBub2Rlc1tpbmRleCAtIDFdLl9wYXJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgbm9kZXNbaW5kZXggLSAxXS5fbGVuZ3RoID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGVzW2ldLl9wYXJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBub2Rlc1tpXS5fbGVuZ3RoID0gMTtcbiAgICAgICAgICAgIHZhciBjeWNsZUVkZ2VOb2RlID0gaSA+IDAgPyBub2Rlc1tpIC0gMV0gOiB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPCBsZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgY3ljbGVFZGdlTm9kZS5fcGFyZW50ID0gbm9kZXNbaW5kZXggKyAxXTtcbiAgICAgICAgICAgICAgICBjeWNsZUVkZ2VOb2RlLl9wYXJlbnQudW5jeWNsZSgpO1xuICAgICAgICAgICAgICAgIGN5Y2xlRWRnZU5vZGUuX2xlbmd0aCA9XG4gICAgICAgICAgICAgICAgICAgIGN5Y2xlRWRnZU5vZGUuX3BhcmVudC5fbGVuZ3RoICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3ljbGVFZGdlTm9kZS5fcGFyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGN5Y2xlRWRnZU5vZGUuX2xlbmd0aCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY3VycmVudENoaWxkTGVuZ3RoID0gY3ljbGVFZGdlTm9kZS5fbGVuZ3RoICsgMTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSBpIC0gMjsgaiA+PSAwOyAtLWopIHtcbiAgICAgICAgICAgICAgICBub2Rlc1tqXS5fbGVuZ3RoID0gY3VycmVudENoaWxkTGVuZ3RoO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZExlbmd0aCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuQ2FwdHVyZWRUcmFjZS5wcm90b3R5cGUuYXR0YWNoRXh0cmFUcmFjZSA9IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLl9fc3RhY2tDbGVhbmVkX18pIHJldHVybjtcbiAgICB0aGlzLnVuY3ljbGUoKTtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VTdGFja0FuZE1lc3NhZ2UoZXJyb3IpO1xuICAgIHZhciBtZXNzYWdlID0gcGFyc2VkLm1lc3NhZ2U7XG4gICAgdmFyIHN0YWNrcyA9IFtwYXJzZWQuc3RhY2tdO1xuXG4gICAgdmFyIHRyYWNlID0gdGhpcztcbiAgICB3aGlsZSAodHJhY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdGFja3MucHVzaChjbGVhblN0YWNrKHRyYWNlLnN0YWNrLnNwbGl0KFwiXFxuXCIpKSk7XG4gICAgICAgIHRyYWNlID0gdHJhY2UuX3BhcmVudDtcbiAgICB9XG4gICAgcmVtb3ZlQ29tbW9uUm9vdHMoc3RhY2tzKTtcbiAgICByZW1vdmVEdXBsaWNhdGVPckVtcHR5SnVtcHMoc3RhY2tzKTtcbiAgICB1dGlsLm5vdEVudW1lcmFibGVQcm9wKGVycm9yLCBcInN0YWNrXCIsIHJlY29uc3RydWN0U3RhY2sobWVzc2FnZSwgc3RhY2tzKSk7XG4gICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcChlcnJvciwgXCJfX3N0YWNrQ2xlYW5lZF9fXCIsIHRydWUpO1xufTtcblxudmFyIGNhcHR1cmVTdGFja1RyYWNlID0gKGZ1bmN0aW9uIHN0YWNrRGV0ZWN0aW9uKCkge1xuICAgIHZhciB2OHN0YWNrRnJhbWVQYXR0ZXJuID0gL15cXHMqYXRcXHMqLztcbiAgICB2YXIgdjhzdGFja0Zvcm1hdHRlciA9IGZ1bmN0aW9uKHN0YWNrLCBlcnJvcikge1xuICAgICAgICBpZiAodHlwZW9mIHN0YWNrID09PSBcInN0cmluZ1wiKSByZXR1cm4gc3RhY2s7XG5cbiAgICAgICAgaWYgKGVycm9yLm5hbWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3IudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybWF0Tm9uRXJyb3IoZXJyb3IpO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgICB0eXBlb2YgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgKz0gNjtcbiAgICAgICAgc3RhY2tGcmFtZVBhdHRlcm4gPSB2OHN0YWNrRnJhbWVQYXR0ZXJuO1xuICAgICAgICBmb3JtYXRTdGFjayA9IHY4c3RhY2tGb3JtYXR0ZXI7XG4gICAgICAgIHZhciBjYXB0dXJlU3RhY2tUcmFjZSA9IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlO1xuXG4gICAgICAgIHNob3VsZElnbm9yZSA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiBibHVlYmlyZEZyYW1lUGF0dGVybi50ZXN0KGxpbmUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ocmVjZWl2ZXIsIGlnbm9yZVVudGlsKSB7XG4gICAgICAgICAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgKz0gNjtcbiAgICAgICAgICAgIGNhcHR1cmVTdGFja1RyYWNlKHJlY2VpdmVyLCBpZ25vcmVVbnRpbCk7XG4gICAgICAgICAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgLT0gNjtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcigpO1xuXG4gICAgaWYgKHR5cGVvZiBlcnIuc3RhY2sgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgZXJyLnN0YWNrLnNwbGl0KFwiXFxuXCIpWzBdLmluZGV4T2YoXCJzdGFja0RldGVjdGlvbkBcIikgPj0gMCkge1xuICAgICAgICBzdGFja0ZyYW1lUGF0dGVybiA9IC9ALztcbiAgICAgICAgZm9ybWF0U3RhY2sgPSB2OHN0YWNrRm9ybWF0dGVyO1xuICAgICAgICBpbmRlbnRTdGFja0ZyYW1lcyA9IHRydWU7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjYXB0dXJlU3RhY2tUcmFjZShvKSB7XG4gICAgICAgICAgICBvLnN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGhhc1N0YWNrQWZ0ZXJUaHJvdztcbiAgICB0cnkgeyB0aHJvdyBuZXcgRXJyb3IoKTsgfVxuICAgIGNhdGNoKGUpIHtcbiAgICAgICAgaGFzU3RhY2tBZnRlclRocm93ID0gKFwic3RhY2tcIiBpbiBlKTtcbiAgICB9XG4gICAgaWYgKCEoXCJzdGFja1wiIGluIGVycikgJiYgaGFzU3RhY2tBZnRlclRocm93ICYmXG4gICAgICAgIHR5cGVvZiBFcnJvci5zdGFja1RyYWNlTGltaXQgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgc3RhY2tGcmFtZVBhdHRlcm4gPSB2OHN0YWNrRnJhbWVQYXR0ZXJuO1xuICAgICAgICBmb3JtYXRTdGFjayA9IHY4c3RhY2tGb3JtYXR0ZXI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjYXB0dXJlU3RhY2tUcmFjZShvKSB7XG4gICAgICAgICAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgKz0gNjtcbiAgICAgICAgICAgIHRyeSB7IHRocm93IG5ldyBFcnJvcigpOyB9XG4gICAgICAgICAgICBjYXRjaChlKSB7IG8uc3RhY2sgPSBlLnN0YWNrOyB9XG4gICAgICAgICAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgLT0gNjtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmb3JtYXRTdGFjayA9IGZ1bmN0aW9uKHN0YWNrLCBlcnJvcikge1xuICAgICAgICBpZiAodHlwZW9mIHN0YWNrID09PSBcInN0cmluZ1wiKSByZXR1cm4gc3RhY2s7XG5cbiAgICAgICAgaWYgKCh0eXBlb2YgZXJyb3IgPT09IFwib2JqZWN0XCIgfHxcbiAgICAgICAgICAgIHR5cGVvZiBlcnJvciA9PT0gXCJmdW5jdGlvblwiKSAmJlxuICAgICAgICAgICAgZXJyb3IubmFtZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvci50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXROb25FcnJvcihlcnJvcik7XG4gICAgfTtcblxuICAgIHJldHVybiBudWxsO1xuXG59KShbXSk7XG5cbmlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS53YXJuICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIH07XG4gICAgaWYgKHV0aWwuaXNOb2RlICYmIHByb2Nlc3Muc3RkZXJyLmlzVFRZKSB7XG4gICAgICAgIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKG1lc3NhZ2UsIGlzU29mdCkge1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gaXNTb2Z0ID8gXCJcXHUwMDFiWzMzbVwiIDogXCJcXHUwMDFiWzMxbVwiO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGNvbG9yICsgbWVzc2FnZSArIFwiXFx1MDAxYlswbVxcblwiKTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCF1dGlsLmlzTm9kZSAmJiB0eXBlb2YgKG5ldyBFcnJvcigpLnN0YWNrKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbihtZXNzYWdlLCBpc1NvZnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIiVjXCIgKyBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTb2Z0ID8gXCJjb2xvcjogZGFya29yYW5nZVwiIDogXCJjb2xvcjogcmVkXCIpO1xuICAgICAgICB9O1xuICAgIH1cbn1cblxudmFyIGNvbmZpZyA9IHtcbiAgICB3YXJuaW5nczogd2FybmluZ3MsXG4gICAgbG9uZ1N0YWNrVHJhY2VzOiBmYWxzZSxcbiAgICBjYW5jZWxsYXRpb246IGZhbHNlLFxuICAgIG1vbml0b3Jpbmc6IGZhbHNlXG59O1xuXG5pZiAobG9uZ1N0YWNrVHJhY2VzKSBQcm9taXNlLmxvbmdTdGFja1RyYWNlcygpO1xuXG5yZXR1cm4ge1xuICAgIGxvbmdTdGFja1RyYWNlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjb25maWcubG9uZ1N0YWNrVHJhY2VzO1xuICAgIH0sXG4gICAgd2FybmluZ3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY29uZmlnLndhcm5pbmdzO1xuICAgIH0sXG4gICAgY2FuY2VsbGF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5jYW5jZWxsYXRpb247XG4gICAgfSxcbiAgICBtb25pdG9yaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5tb25pdG9yaW5nO1xuICAgIH0sXG4gICAgcHJvcGFnYXRlRnJvbUZ1bmN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHByb3BhZ2F0ZUZyb21GdW5jdGlvbjtcbiAgICB9LFxuICAgIGJvdW5kVmFsdWVGdW5jdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBib3VuZFZhbHVlRnVuY3Rpb247XG4gICAgfSxcbiAgICBjaGVja0ZvcmdvdHRlblJldHVybnM6IGNoZWNrRm9yZ290dGVuUmV0dXJucyxcbiAgICBzZXRCb3VuZHM6IHNldEJvdW5kcyxcbiAgICB3YXJuOiB3YXJuLFxuICAgIGRlcHJlY2F0ZWQ6IGRlcHJlY2F0ZWQsXG4gICAgQ2FwdHVyZWRUcmFjZTogQ2FwdHVyZWRUcmFjZSxcbiAgICBmaXJlRG9tRXZlbnQ6IGZpcmVEb21FdmVudCxcbiAgICBmaXJlR2xvYmFsRXZlbnQ6IGZpcmVHbG9iYWxFdmVudFxufTtcbn07XG5cbn0se1wiLi9lcnJvcnNcIjoxMixcIi4vdXRpbFwiOjM2fV0sMTA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UpIHtcbmZ1bmN0aW9uIHJldHVybmVyKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xufVxuZnVuY3Rpb24gdGhyb3dlcigpIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGVbXCJyZXR1cm5cIl0gPVxuUHJvbWlzZS5wcm90b3R5cGUudGhlblJldHVybiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHZhbHVlLnN1cHByZXNzVW5oYW5kbGVkUmVqZWN0aW9ucygpO1xuICAgIHJldHVybiB0aGlzLl90aGVuKFxuICAgICAgICByZXR1cm5lciwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHt2YWx1ZTogdmFsdWV9LCB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGVbXCJ0aHJvd1wiXSA9XG5Qcm9taXNlLnByb3RvdHlwZS50aGVuVGhyb3cgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RoZW4oXG4gICAgICAgIHRocm93ZXIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7cmVhc29uOiByZWFzb259LCB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2hUaHJvdyA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aGVuKFxuICAgICAgICAgICAgdW5kZWZpbmVkLCB0aHJvd2VyLCB1bmRlZmluZWQsIHtyZWFzb246IHJlYXNvbn0sIHVuZGVmaW5lZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF9yZWFzb24gPSBhcmd1bWVudHNbMV07XG4gICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oKSB7dGhyb3cgX3JlYXNvbjt9O1xuICAgICAgICByZXR1cm4gdGhpcy5jYXVnaHQocmVhc29uLCBoYW5kbGVyKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5jYXRjaFJldHVybiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkgdmFsdWUuc3VwcHJlc3NVbmhhbmRsZWRSZWplY3Rpb25zKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl90aGVuKFxuICAgICAgICAgICAgdW5kZWZpbmVkLCByZXR1cm5lciwgdW5kZWZpbmVkLCB7dmFsdWU6IHZhbHVlfSwgdW5kZWZpbmVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgX3ZhbHVlID0gYXJndW1lbnRzWzFdO1xuICAgICAgICBpZiAoX3ZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkgX3ZhbHVlLnN1cHByZXNzVW5oYW5kbGVkUmVqZWN0aW9ucygpO1xuICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKCkge3JldHVybiBfdmFsdWU7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2F1Z2h0KHZhbHVlLCBoYW5kbGVyKTtcbiAgICB9XG59O1xufTtcblxufSx7fV0sMTE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMKSB7XG52YXIgUHJvbWlzZVJlZHVjZSA9IFByb21pc2UucmVkdWNlO1xudmFyIFByb21pc2VBbGwgPSBQcm9taXNlLmFsbDtcblxuZnVuY3Rpb24gcHJvbWlzZUFsbFRoaXMoKSB7XG4gICAgcmV0dXJuIFByb21pc2VBbGwodGhpcyk7XG59XG5cbmZ1bmN0aW9uIFByb21pc2VNYXBTZXJpZXMocHJvbWlzZXMsIGZuKSB7XG4gICAgcmV0dXJuIFByb21pc2VSZWR1Y2UocHJvbWlzZXMsIGZuLCBJTlRFUk5BTCwgSU5URVJOQUwpO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5lYWNoID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgcmV0dXJuIFByb21pc2VSZWR1Y2UodGhpcywgZm4sIElOVEVSTkFMLCAwKVxuICAgICAgICAgICAgICAuX3RoZW4ocHJvbWlzZUFsbFRoaXMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzLCB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubWFwU2VyaWVzID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgcmV0dXJuIFByb21pc2VSZWR1Y2UodGhpcywgZm4sIElOVEVSTkFMLCBJTlRFUk5BTCk7XG59O1xuXG5Qcm9taXNlLmVhY2ggPSBmdW5jdGlvbiAocHJvbWlzZXMsIGZuKSB7XG4gICAgcmV0dXJuIFByb21pc2VSZWR1Y2UocHJvbWlzZXMsIGZuLCBJTlRFUk5BTCwgMClcbiAgICAgICAgICAgICAgLl90aGVuKHByb21pc2VBbGxUaGlzLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgcHJvbWlzZXMsIHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlLm1hcFNlcmllcyA9IFByb21pc2VNYXBTZXJpZXM7XG59O1xuXG5cbn0se31dLDEyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xudmFyIGVzNSA9IF9kZXJlcV8oXCIuL2VzNVwiKTtcbnZhciBPYmplY3RmcmVlemUgPSBlczUuZnJlZXplO1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGluaGVyaXRzID0gdXRpbC5pbmhlcml0cztcbnZhciBub3RFbnVtZXJhYmxlUHJvcCA9IHV0aWwubm90RW51bWVyYWJsZVByb3A7XG5cbmZ1bmN0aW9uIHN1YkVycm9yKG5hbWVQcm9wZXJ0eSwgZGVmYXVsdE1lc3NhZ2UpIHtcbiAgICBmdW5jdGlvbiBTdWJFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTdWJFcnJvcikpIHJldHVybiBuZXcgU3ViRXJyb3IobWVzc2FnZSk7XG4gICAgICAgIG5vdEVudW1lcmFibGVQcm9wKHRoaXMsIFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgdHlwZW9mIG1lc3NhZ2UgPT09IFwic3RyaW5nXCIgPyBtZXNzYWdlIDogZGVmYXVsdE1lc3NhZ2UpO1xuICAgICAgICBub3RFbnVtZXJhYmxlUHJvcCh0aGlzLCBcIm5hbWVcIiwgbmFtZVByb3BlcnR5KTtcbiAgICAgICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEVycm9yLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5oZXJpdHMoU3ViRXJyb3IsIEVycm9yKTtcbiAgICByZXR1cm4gU3ViRXJyb3I7XG59XG5cbnZhciBfVHlwZUVycm9yLCBfUmFuZ2VFcnJvcjtcbnZhciBXYXJuaW5nID0gc3ViRXJyb3IoXCJXYXJuaW5nXCIsIFwid2FybmluZ1wiKTtcbnZhciBDYW5jZWxsYXRpb25FcnJvciA9IHN1YkVycm9yKFwiQ2FuY2VsbGF0aW9uRXJyb3JcIiwgXCJjYW5jZWxsYXRpb24gZXJyb3JcIik7XG52YXIgVGltZW91dEVycm9yID0gc3ViRXJyb3IoXCJUaW1lb3V0RXJyb3JcIiwgXCJ0aW1lb3V0IGVycm9yXCIpO1xudmFyIEFnZ3JlZ2F0ZUVycm9yID0gc3ViRXJyb3IoXCJBZ2dyZWdhdGVFcnJvclwiLCBcImFnZ3JlZ2F0ZSBlcnJvclwiKTtcbnRyeSB7XG4gICAgX1R5cGVFcnJvciA9IFR5cGVFcnJvcjtcbiAgICBfUmFuZ2VFcnJvciA9IFJhbmdlRXJyb3I7XG59IGNhdGNoKGUpIHtcbiAgICBfVHlwZUVycm9yID0gc3ViRXJyb3IoXCJUeXBlRXJyb3JcIiwgXCJ0eXBlIGVycm9yXCIpO1xuICAgIF9SYW5nZUVycm9yID0gc3ViRXJyb3IoXCJSYW5nZUVycm9yXCIsIFwicmFuZ2UgZXJyb3JcIik7XG59XG5cbnZhciBtZXRob2RzID0gKFwiam9pbiBwb3AgcHVzaCBzaGlmdCB1bnNoaWZ0IHNsaWNlIGZpbHRlciBmb3JFYWNoIHNvbWUgXCIgK1xuICAgIFwiZXZlcnkgbWFwIGluZGV4T2YgbGFzdEluZGV4T2YgcmVkdWNlIHJlZHVjZVJpZ2h0IHNvcnQgcmV2ZXJzZVwiKS5zcGxpdChcIiBcIik7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgbWV0aG9kcy5sZW5ndGg7ICsraSkge1xuICAgIGlmICh0eXBlb2YgQXJyYXkucHJvdG90eXBlW21ldGhvZHNbaV1dID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgQWdncmVnYXRlRXJyb3IucHJvdG90eXBlW21ldGhvZHNbaV1dID0gQXJyYXkucHJvdG90eXBlW21ldGhvZHNbaV1dO1xuICAgIH1cbn1cblxuZXM1LmRlZmluZVByb3BlcnR5KEFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZSwgXCJsZW5ndGhcIiwge1xuICAgIHZhbHVlOiAwLFxuICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5BZ2dyZWdhdGVFcnJvci5wcm90b3R5cGVbXCJpc09wZXJhdGlvbmFsXCJdID0gdHJ1ZTtcbnZhciBsZXZlbCA9IDA7XG5BZ2dyZWdhdGVFcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5kZW50ID0gQXJyYXkobGV2ZWwgKiA0ICsgMSkuam9pbihcIiBcIik7XG4gICAgdmFyIHJldCA9IFwiXFxuXCIgKyBpbmRlbnQgKyBcIkFnZ3JlZ2F0ZUVycm9yIG9mOlwiICsgXCJcXG5cIjtcbiAgICBsZXZlbCsrO1xuICAgIGluZGVudCA9IEFycmF5KGxldmVsICogNCArIDEpLmpvaW4oXCIgXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgc3RyID0gdGhpc1tpXSA9PT0gdGhpcyA/IFwiW0NpcmN1bGFyIEFnZ3JlZ2F0ZUVycm9yXVwiIDogdGhpc1tpXSArIFwiXCI7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsaW5lcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgbGluZXNbal0gPSBpbmRlbnQgKyBsaW5lc1tqXTtcbiAgICAgICAgfVxuICAgICAgICBzdHIgPSBsaW5lcy5qb2luKFwiXFxuXCIpO1xuICAgICAgICByZXQgKz0gc3RyICsgXCJcXG5cIjtcbiAgICB9XG4gICAgbGV2ZWwtLTtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuZnVuY3Rpb24gT3BlcmF0aW9uYWxFcnJvcihtZXNzYWdlKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE9wZXJhdGlvbmFsRXJyb3IpKVxuICAgICAgICByZXR1cm4gbmV3IE9wZXJhdGlvbmFsRXJyb3IobWVzc2FnZSk7XG4gICAgbm90RW51bWVyYWJsZVByb3AodGhpcywgXCJuYW1lXCIsIFwiT3BlcmF0aW9uYWxFcnJvclwiKTtcbiAgICBub3RFbnVtZXJhYmxlUHJvcCh0aGlzLCBcIm1lc3NhZ2VcIiwgbWVzc2FnZSk7XG4gICAgdGhpcy5jYXVzZSA9IG1lc3NhZ2U7XG4gICAgdGhpc1tcImlzT3BlcmF0aW9uYWxcIl0gPSB0cnVlO1xuXG4gICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBub3RFbnVtZXJhYmxlUHJvcCh0aGlzLCBcIm1lc3NhZ2VcIiwgbWVzc2FnZS5tZXNzYWdlKTtcbiAgICAgICAgbm90RW51bWVyYWJsZVByb3AodGhpcywgXCJzdGFja1wiLCBtZXNzYWdlLnN0YWNrKTtcbiAgICB9IGVsc2UgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgIH1cblxufVxuaW5oZXJpdHMoT3BlcmF0aW9uYWxFcnJvciwgRXJyb3IpO1xuXG52YXIgZXJyb3JUeXBlcyA9IEVycm9yW1wiX19CbHVlYmlyZEVycm9yVHlwZXNfX1wiXTtcbmlmICghZXJyb3JUeXBlcykge1xuICAgIGVycm9yVHlwZXMgPSBPYmplY3RmcmVlemUoe1xuICAgICAgICBDYW5jZWxsYXRpb25FcnJvcjogQ2FuY2VsbGF0aW9uRXJyb3IsXG4gICAgICAgIFRpbWVvdXRFcnJvcjogVGltZW91dEVycm9yLFxuICAgICAgICBPcGVyYXRpb25hbEVycm9yOiBPcGVyYXRpb25hbEVycm9yLFxuICAgICAgICBSZWplY3Rpb25FcnJvcjogT3BlcmF0aW9uYWxFcnJvcixcbiAgICAgICAgQWdncmVnYXRlRXJyb3I6IEFnZ3JlZ2F0ZUVycm9yXG4gICAgfSk7XG4gICAgZXM1LmRlZmluZVByb3BlcnR5KEVycm9yLCBcIl9fQmx1ZWJpcmRFcnJvclR5cGVzX19cIiwge1xuICAgICAgICB2YWx1ZTogZXJyb3JUeXBlcyxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBFcnJvcjogRXJyb3IsXG4gICAgVHlwZUVycm9yOiBfVHlwZUVycm9yLFxuICAgIFJhbmdlRXJyb3I6IF9SYW5nZUVycm9yLFxuICAgIENhbmNlbGxhdGlvbkVycm9yOiBlcnJvclR5cGVzLkNhbmNlbGxhdGlvbkVycm9yLFxuICAgIE9wZXJhdGlvbmFsRXJyb3I6IGVycm9yVHlwZXMuT3BlcmF0aW9uYWxFcnJvcixcbiAgICBUaW1lb3V0RXJyb3I6IGVycm9yVHlwZXMuVGltZW91dEVycm9yLFxuICAgIEFnZ3JlZ2F0ZUVycm9yOiBlcnJvclR5cGVzLkFnZ3JlZ2F0ZUVycm9yLFxuICAgIFdhcm5pbmc6IFdhcm5pbmdcbn07XG5cbn0se1wiLi9lczVcIjoxMyxcIi4vdXRpbFwiOjM2fV0sMTM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIGlzRVM1ID0gKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIHRoaXMgPT09IHVuZGVmaW5lZDtcbn0pKCk7XG5cbmlmIChpc0VTNSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgICBmcmVlemU6IE9iamVjdC5mcmVlemUsXG4gICAgICAgIGRlZmluZVByb3BlcnR5OiBPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gICAgICAgIGdldERlc2NyaXB0b3I6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gICAgICAgIGtleXM6IE9iamVjdC5rZXlzLFxuICAgICAgICBuYW1lczogT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXG4gICAgICAgIGdldFByb3RvdHlwZU9mOiBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gICAgICAgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXksXG4gICAgICAgIGlzRVM1OiBpc0VTNSxcbiAgICAgICAgcHJvcGVydHlJc1dyaXRhYmxlOiBmdW5jdGlvbihvYmosIHByb3ApIHtcbiAgICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHByb3ApO1xuICAgICAgICAgICAgcmV0dXJuICEhKCFkZXNjcmlwdG9yIHx8IGRlc2NyaXB0b3Iud3JpdGFibGUgfHwgZGVzY3JpcHRvci5zZXQpO1xuICAgICAgICB9XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgdmFyIGhhcyA9IHt9Lmhhc093blByb3BlcnR5O1xuICAgIHZhciBzdHIgPSB7fS50b1N0cmluZztcbiAgICB2YXIgcHJvdG8gPSB7fS5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cbiAgICB2YXIgT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG8pIHtcbiAgICAgICAgICAgIGlmIChoYXMuY2FsbChvLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0LnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cbiAgICB2YXIgT2JqZWN0R2V0RGVzY3JpcHRvciA9IGZ1bmN0aW9uKG8sIGtleSkge1xuICAgICAgICByZXR1cm4ge3ZhbHVlOiBvW2tleV19O1xuICAgIH07XG5cbiAgICB2YXIgT2JqZWN0RGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAobywga2V5LCBkZXNjKSB7XG4gICAgICAgIG9ba2V5XSA9IGRlc2MudmFsdWU7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH07XG5cbiAgICB2YXIgT2JqZWN0RnJlZXplID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH07XG5cbiAgICB2YXIgT2JqZWN0R2V0UHJvdG90eXBlT2YgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0KG9iaikuY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvdG87XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIEFycmF5SXNBcnJheSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBzdHIuY2FsbChvYmopID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgICBpc0FycmF5OiBBcnJheUlzQXJyYXksXG4gICAgICAgIGtleXM6IE9iamVjdEtleXMsXG4gICAgICAgIG5hbWVzOiBPYmplY3RLZXlzLFxuICAgICAgICBkZWZpbmVQcm9wZXJ0eTogT2JqZWN0RGVmaW5lUHJvcGVydHksXG4gICAgICAgIGdldERlc2NyaXB0b3I6IE9iamVjdEdldERlc2NyaXB0b3IsXG4gICAgICAgIGZyZWV6ZTogT2JqZWN0RnJlZXplLFxuICAgICAgICBnZXRQcm90b3R5cGVPZjogT2JqZWN0R2V0UHJvdG90eXBlT2YsXG4gICAgICAgIGlzRVM1OiBpc0VTNSxcbiAgICAgICAgcHJvcGVydHlJc1dyaXRhYmxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxufSx7fV0sMTQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMKSB7XG52YXIgUHJvbWlzZU1hcCA9IFByb21pc2UubWFwO1xuXG5Qcm9taXNlLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAoZm4sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gUHJvbWlzZU1hcCh0aGlzLCBmbiwgb3B0aW9ucywgSU5URVJOQUwpO1xufTtcblxuUHJvbWlzZS5maWx0ZXIgPSBmdW5jdGlvbiAocHJvbWlzZXMsIGZuLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIFByb21pc2VNYXAocHJvbWlzZXMsIGZuLCBvcHRpb25zLCBJTlRFUk5BTCk7XG59O1xufTtcblxufSx7fV0sMTU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIHRyeUNvbnZlcnRUb1Byb21pc2UsIE5FWFRfRklMVEVSKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgQ2FuY2VsbGF0aW9uRXJyb3IgPSBQcm9taXNlLkNhbmNlbGxhdGlvbkVycm9yO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciBjYXRjaEZpbHRlciA9IF9kZXJlcV8oXCIuL2NhdGNoX2ZpbHRlclwiKShORVhUX0ZJTFRFUik7XG5cbmZ1bmN0aW9uIFBhc3NUaHJvdWdoSGFuZGxlckNvbnRleHQocHJvbWlzZSwgdHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIHRoaXMuY2FsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5jYW5jZWxQcm9taXNlID0gbnVsbDtcbn1cblxuUGFzc1Rocm91Z2hIYW5kbGVyQ29udGV4dC5wcm90b3R5cGUuaXNGaW5hbGx5SGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09IDA7XG59O1xuXG5mdW5jdGlvbiBGaW5hbGx5SGFuZGxlckNhbmNlbFJlYWN0aW9uKGZpbmFsbHlIYW5kbGVyKSB7XG4gICAgdGhpcy5maW5hbGx5SGFuZGxlciA9IGZpbmFsbHlIYW5kbGVyO1xufVxuXG5GaW5hbGx5SGFuZGxlckNhbmNlbFJlYWN0aW9uLnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgY2hlY2tDYW5jZWwodGhpcy5maW5hbGx5SGFuZGxlcik7XG59O1xuXG5mdW5jdGlvbiBjaGVja0NhbmNlbChjdHgsIHJlYXNvbikge1xuICAgIGlmIChjdHguY2FuY2VsUHJvbWlzZSAhPSBudWxsKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY3R4LmNhbmNlbFByb21pc2UuX3JlamVjdChyZWFzb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LmNhbmNlbFByb21pc2UuX2NhbmNlbCgpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5jYW5jZWxQcm9taXNlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc3VjY2VlZCgpIHtcbiAgICByZXR1cm4gZmluYWxseUhhbmRsZXIuY2FsbCh0aGlzLCB0aGlzLnByb21pc2UuX3RhcmdldCgpLl9zZXR0bGVkVmFsdWUoKSk7XG59XG5mdW5jdGlvbiBmYWlsKHJlYXNvbikge1xuICAgIGlmIChjaGVja0NhbmNlbCh0aGlzLCByZWFzb24pKSByZXR1cm47XG4gICAgZXJyb3JPYmouZSA9IHJlYXNvbjtcbiAgICByZXR1cm4gZXJyb3JPYmo7XG59XG5mdW5jdGlvbiBmaW5hbGx5SGFuZGxlcihyZWFzb25PclZhbHVlKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG4gICAgdmFyIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cbiAgICBpZiAoIXRoaXMuY2FsbGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHJldCA9IHRoaXMuaXNGaW5hbGx5SGFuZGxlcigpXG4gICAgICAgICAgICA/IGhhbmRsZXIuY2FsbChwcm9taXNlLl9ib3VuZFZhbHVlKCkpXG4gICAgICAgICAgICA6IGhhbmRsZXIuY2FsbChwcm9taXNlLl9ib3VuZFZhbHVlKCksIHJlYXNvbk9yVmFsdWUpO1xuICAgICAgICBpZiAocmV0ID09PSBORVhUX0ZJTFRFUikge1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSBlbHNlIGlmIChyZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcHJvbWlzZS5fc2V0UmV0dXJuZWROb25VbmRlZmluZWQoKTtcbiAgICAgICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHJldCwgcHJvbWlzZSk7XG4gICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbmNlbFByb21pc2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlLl9pc0NhbmNlbGxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVhc29uID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgQ2FuY2VsbGF0aW9uRXJyb3IoXCJsYXRlIGNhbmNlbGxhdGlvbiBvYnNlcnZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UocmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yT2JqLmUgPSByZWFzb247XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF5YmVQcm9taXNlLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX2F0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGaW5hbGx5SGFuZGxlckNhbmNlbFJlYWN0aW9uKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF5YmVQcm9taXNlLl90aGVuKFxuICAgICAgICAgICAgICAgICAgICBzdWNjZWVkLCBmYWlsLCB1bmRlZmluZWQsIHRoaXMsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZS5pc1JlamVjdGVkKCkpIHtcbiAgICAgICAgY2hlY2tDYW5jZWwodGhpcyk7XG4gICAgICAgIGVycm9yT2JqLmUgPSByZWFzb25PclZhbHVlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2hlY2tDYW5jZWwodGhpcyk7XG4gICAgICAgIHJldHVybiByZWFzb25PclZhbHVlO1xuICAgIH1cbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuX3Bhc3NUaHJvdWdoID0gZnVuY3Rpb24oaGFuZGxlciwgdHlwZSwgc3VjY2VzcywgZmFpbCkge1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdGhpcy50aGVuKCk7XG4gICAgcmV0dXJuIHRoaXMuX3RoZW4oc3VjY2VzcyxcbiAgICAgICAgICAgICAgICAgICAgICBmYWlsLFxuICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgUGFzc1Rocm91Z2hIYW5kbGVyQ29udGV4dCh0aGlzLCB0eXBlLCBoYW5kbGVyKSxcbiAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubGFzdGx5ID1cblByb21pc2UucHJvdG90eXBlW1wiZmluYWxseVwiXSA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bhc3NUaHJvdWdoKGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHlIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5SGFuZGxlcik7XG59O1xuXG5cblByb21pc2UucHJvdG90eXBlLnRhcCA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bhc3NUaHJvdWdoKGhhbmRsZXIsIDEsIGZpbmFsbHlIYW5kbGVyKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnRhcENhdGNoID0gZnVuY3Rpb24gKGhhbmRsZXJPclByZWRpY2F0ZSkge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmKGxlbiA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFzc1Rocm91Z2goaGFuZGxlck9yUHJlZGljYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHlIYW5kbGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAgdmFyIGNhdGNoSW5zdGFuY2VzID0gbmV3IEFycmF5KGxlbiAtIDEpLFxuICAgICAgICAgICAgaiA9IDAsIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW4gLSAxOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgaWYgKHV0aWwuaXNPYmplY3QoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBjYXRjaEluc3RhbmNlc1tqKytdID0gaXRlbTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwidGFwQ2F0Y2ggc3RhdGVtZW50IHByZWRpY2F0ZTogXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImV4cGVjdGluZyBhbiBvYmplY3QgYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoaXRlbSlcbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaEluc3RhbmNlcy5sZW5ndGggPSBqO1xuICAgICAgICB2YXIgaGFuZGxlciA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bhc3NUaHJvdWdoKGNhdGNoRmlsdGVyKGNhdGNoSW5zdGFuY2VzLCBoYW5kbGVyLCB0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5SGFuZGxlcik7XG4gICAgfVxuXG59O1xuXG5yZXR1cm4gUGFzc1Rocm91Z2hIYW5kbGVyQ29udGV4dDtcbn07XG5cbn0se1wiLi9jYXRjaF9maWx0ZXJcIjo3LFwiLi91dGlsXCI6MzZ9XSwxNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXBpUmVqZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBJTlRFUk5BTCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5Q29udmVydFRvUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgUHJveHlhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zykge1xudmFyIGVycm9ycyA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKTtcbnZhciBUeXBlRXJyb3IgPSBlcnJvcnMuVHlwZUVycm9yO1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG52YXIgeWllbGRIYW5kbGVycyA9IFtdO1xuXG5mdW5jdGlvbiBwcm9taXNlRnJvbVlpZWxkSGFuZGxlcih2YWx1ZSwgeWllbGRIYW5kbGVycywgdHJhY2VQYXJlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHlpZWxkSGFuZGxlcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdHJhY2VQYXJlbnQuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgIHZhciByZXN1bHQgPSB0cnlDYXRjaCh5aWVsZEhhbmRsZXJzW2ldKSh2YWx1ZSk7XG4gICAgICAgIHRyYWNlUGFyZW50Ll9wb3BDb250ZXh0KCk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqKSB7XG4gICAgICAgICAgICB0cmFjZVBhcmVudC5fcHVzaENvbnRleHQoKTtcbiAgICAgICAgICAgIHZhciByZXQgPSBQcm9taXNlLnJlamVjdChlcnJvck9iai5lKTtcbiAgICAgICAgICAgIHRyYWNlUGFyZW50Ll9wb3BDb250ZXh0KCk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHJlc3VsdCwgdHJhY2VQYXJlbnQpO1xuICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkgcmV0dXJuIG1heWJlUHJvbWlzZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIFByb21pc2VTcGF3bihnZW5lcmF0b3JGdW5jdGlvbiwgcmVjZWl2ZXIsIHlpZWxkSGFuZGxlciwgc3RhY2spIHtcbiAgICBpZiAoZGVidWcuY2FuY2VsbGF0aW9uKCkpIHtcbiAgICAgICAgdmFyIGludGVybmFsID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICB2YXIgX2ZpbmFsbHlQcm9taXNlID0gdGhpcy5fZmluYWxseVByb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBpbnRlcm5hbC5sYXN0bHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gX2ZpbmFsbHlQcm9taXNlO1xuICAgICAgICB9KTtcbiAgICAgICAgaW50ZXJuYWwuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgICAgIGludGVybmFsLl9zZXRPbkNhbmNlbCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgIHByb21pc2UuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgfVxuICAgIHRoaXMuX3N0YWNrID0gc3RhY2s7XG4gICAgdGhpcy5fZ2VuZXJhdG9yRnVuY3Rpb24gPSBnZW5lcmF0b3JGdW5jdGlvbjtcbiAgICB0aGlzLl9yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgIHRoaXMuX2dlbmVyYXRvciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl95aWVsZEhhbmRsZXJzID0gdHlwZW9mIHlpZWxkSGFuZGxlciA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgID8gW3lpZWxkSGFuZGxlcl0uY29uY2F0KHlpZWxkSGFuZGxlcnMpXG4gICAgICAgIDogeWllbGRIYW5kbGVycztcbiAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG51bGw7XG4gICAgdGhpcy5fY2FuY2VsbGF0aW9uUGhhc2UgPSBmYWxzZTtcbn1cbnV0aWwuaW5oZXJpdHMoUHJvbWlzZVNwYXduLCBQcm94eWFibGUpO1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9pc1Jlc29sdmVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb21pc2UgPT09IG51bGw7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX2dlbmVyYXRvciA9IG51bGw7XG4gICAgaWYgKGRlYnVnLmNhbmNlbGxhdGlvbigpICYmIHRoaXMuX2ZpbmFsbHlQcm9taXNlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2ZpbmFsbHlQcm9taXNlLl9mdWxmaWxsKCk7XG4gICAgICAgIHRoaXMuX2ZpbmFsbHlQcm9taXNlID0gbnVsbDtcbiAgICB9XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9wcm9taXNlQ2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2lzUmVzb2x2ZWQoKSkgcmV0dXJuO1xuICAgIHZhciBpbXBsZW1lbnRzUmV0dXJuID0gdHlwZW9mIHRoaXMuX2dlbmVyYXRvcltcInJldHVyblwiXSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKCFpbXBsZW1lbnRzUmV0dXJuKSB7XG4gICAgICAgIHZhciByZWFzb24gPSBuZXcgUHJvbWlzZS5DYW5jZWxsYXRpb25FcnJvcihcbiAgICAgICAgICAgIFwiZ2VuZXJhdG9yIC5yZXR1cm4oKSBzZW50aW5lbFwiKTtcbiAgICAgICAgUHJvbWlzZS5jb3JvdXRpbmUucmV0dXJuU2VudGluZWwgPSByZWFzb247XG4gICAgICAgIHRoaXMuX3Byb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UocmVhc29uKTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcbiAgICAgICAgcmVzdWx0ID0gdHJ5Q2F0Y2godGhpcy5fZ2VuZXJhdG9yW1widGhyb3dcIl0pLmNhbGwodGhpcy5fZ2VuZXJhdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhc29uKTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgIHJlc3VsdCA9IHRyeUNhdGNoKHRoaXMuX2dlbmVyYXRvcltcInJldHVyblwiXSkuY2FsbCh0aGlzLl9nZW5lcmF0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgIH1cbiAgICB0aGlzLl9jYW5jZWxsYXRpb25QaGFzZSA9IHRydWU7XG4gICAgdGhpcy5feWllbGRlZFByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuX2NvbnRpbnVlKHJlc3VsdCk7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9wcm9taXNlRnVsZmlsbGVkID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG51bGw7XG4gICAgdGhpcy5fcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcbiAgICB2YXIgcmVzdWx0ID0gdHJ5Q2F0Y2godGhpcy5fZ2VuZXJhdG9yLm5leHQpLmNhbGwodGhpcy5fZ2VuZXJhdG9yLCB2YWx1ZSk7XG4gICAgdGhpcy5fcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgIHRoaXMuX2NvbnRpbnVlKHJlc3VsdCk7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9wcm9taXNlUmVqZWN0ZWQgPSBmdW5jdGlvbihyZWFzb24pIHtcbiAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG51bGw7XG4gICAgdGhpcy5fcHJvbWlzZS5fYXR0YWNoRXh0cmFUcmFjZShyZWFzb24pO1xuICAgIHRoaXMuX3Byb21pc2UuX3B1c2hDb250ZXh0KCk7XG4gICAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoKHRoaXMuX2dlbmVyYXRvcltcInRocm93XCJdKVxuICAgICAgICAuY2FsbCh0aGlzLl9nZW5lcmF0b3IsIHJlYXNvbik7XG4gICAgdGhpcy5fcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgIHRoaXMuX2NvbnRpbnVlKHJlc3VsdCk7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5feWllbGRlZFByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5feWllbGRlZFByb21pc2U7XG4gICAgICAgIHRoaXMuX3lpZWxkZWRQcm9taXNlID0gbnVsbDtcbiAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLnByb21pc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fZ2VuZXJhdG9yID0gdGhpcy5fZ2VuZXJhdG9yRnVuY3Rpb24uY2FsbCh0aGlzLl9yZWNlaXZlcik7XG4gICAgdGhpcy5fcmVjZWl2ZXIgPVxuICAgICAgICB0aGlzLl9nZW5lcmF0b3JGdW5jdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcm9taXNlRnVsZmlsbGVkKHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9jb250aW51ZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2U7XG4gICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgICAgICBpZiAodGhpcy5fY2FuY2VsbGF0aW9uUGhhc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2UuX3JlamVjdENhbGxiYWNrKHJlc3VsdC5lLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgaWYgKHJlc3VsdC5kb25lID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgaWYgKHRoaXMuX2NhbmNlbGxhdGlvblBoYXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS5jYW5jZWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlLl9yZXNvbHZlQ2FsbGJhY2sodmFsdWUpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UodmFsdWUsIHRoaXMuX3Byb21pc2UpO1xuICAgICAgICBpZiAoIShtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgICAgICAgbWF5YmVQcm9taXNlID1cbiAgICAgICAgICAgICAgICBwcm9taXNlRnJvbVlpZWxkSGFuZGxlcihtYXliZVByb21pc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5feWllbGRIYW5kbGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlKTtcbiAgICAgICAgICAgIGlmIChtYXliZVByb21pc2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlUmVqZWN0ZWQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkEgdmFsdWUgJXMgd2FzIHlpZWxkZWQgdGhhdCBjb3VsZCBub3QgYmUgdHJlYXRlZCBhcyBhIHByb21pc2VcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXFx1MDAwYVwiLnJlcGxhY2UoXCIlc1wiLCBTdHJpbmcodmFsdWUpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkZyb20gY29yb3V0aW5lOlxcdTAwMGFcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFjay5zcGxpdChcIlxcblwiKS5zbGljZSgxLCAtNykuam9pbihcIlxcblwiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWF5YmVQcm9taXNlID0gbWF5YmVQcm9taXNlLl90YXJnZXQoKTtcbiAgICAgICAgdmFyIGJpdEZpZWxkID0gbWF5YmVQcm9taXNlLl9iaXRGaWVsZDtcbiAgICAgICAgO1xuICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3lpZWxkZWRQcm9taXNlID0gbWF5YmVQcm9taXNlO1xuICAgICAgICAgICAgbWF5YmVQcm9taXNlLl9wcm94eSh0aGlzLCBudWxsKTtcbiAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xuICAgICAgICAgICAgUHJvbWlzZS5fYXN5bmMuaW52b2tlKFxuICAgICAgICAgICAgICAgIHRoaXMuX3Byb21pc2VGdWxmaWxsZWQsIHRoaXMsIG1heWJlUHJvbWlzZS5fdmFsdWUoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMTY3NzcyMTYpICE9PSAwKSkge1xuICAgICAgICAgICAgUHJvbWlzZS5fYXN5bmMuaW52b2tlKFxuICAgICAgICAgICAgICAgIHRoaXMuX3Byb21pc2VSZWplY3RlZCwgdGhpcywgbWF5YmVQcm9taXNlLl9yZWFzb24oKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2VDYW5jZWxsZWQoKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblByb21pc2UuY29yb3V0aW5lID0gZnVuY3Rpb24gKGdlbmVyYXRvckZ1bmN0aW9uLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBnZW5lcmF0b3JGdW5jdGlvbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJnZW5lcmF0b3JGdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cbiAgICB2YXIgeWllbGRIYW5kbGVyID0gT2JqZWN0KG9wdGlvbnMpLnlpZWxkSGFuZGxlcjtcbiAgICB2YXIgUHJvbWlzZVNwYXduJCA9IFByb21pc2VTcGF3bjtcbiAgICB2YXIgc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yRnVuY3Rpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIHNwYXduID0gbmV3IFByb21pc2VTcGF3biQodW5kZWZpbmVkLCB1bmRlZmluZWQsIHlpZWxkSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2spO1xuICAgICAgICB2YXIgcmV0ID0gc3Bhd24ucHJvbWlzZSgpO1xuICAgICAgICBzcGF3bi5fZ2VuZXJhdG9yID0gZ2VuZXJhdG9yO1xuICAgICAgICBzcGF3bi5fcHJvbWlzZUZ1bGZpbGxlZCh1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG59O1xuXG5Qcm9taXNlLmNvcm91dGluZS5hZGRZaWVsZEhhbmRsZXIgPSBmdW5jdGlvbihmbikge1xuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcbiAgICB9XG4gICAgeWllbGRIYW5kbGVycy5wdXNoKGZuKTtcbn07XG5cblByb21pc2Uuc3Bhd24gPSBmdW5jdGlvbiAoZ2VuZXJhdG9yRnVuY3Rpb24pIHtcbiAgICBkZWJ1Zy5kZXByZWNhdGVkKFwiUHJvbWlzZS5zcGF3bigpXCIsIFwiUHJvbWlzZS5jb3JvdXRpbmUoKVwiKTtcbiAgICBpZiAodHlwZW9mIGdlbmVyYXRvckZ1bmN0aW9uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImdlbmVyYXRvckZ1bmN0aW9uIG11c3QgYmUgYSBmdW5jdGlvblxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG4gICAgfVxuICAgIHZhciBzcGF3biA9IG5ldyBQcm9taXNlU3Bhd24oZ2VuZXJhdG9yRnVuY3Rpb24sIHRoaXMpO1xuICAgIHZhciByZXQgPSBzcGF3bi5wcm9taXNlKCk7XG4gICAgc3Bhd24uX3J1bihQcm9taXNlLnNwYXduKTtcbiAgICByZXR1cm4gcmV0O1xufTtcbn07XG5cbn0se1wiLi9lcnJvcnNcIjoxMixcIi4vdXRpbFwiOjM2fV0sMTc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9XG5mdW5jdGlvbihQcm9taXNlLCBQcm9taXNlQXJyYXksIHRyeUNvbnZlcnRUb1Byb21pc2UsIElOVEVSTkFMLCBhc3luYyxcbiAgICAgICAgIGdldERvbWFpbikge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGNhbkV2YWx1YXRlID0gdXRpbC5jYW5FdmFsdWF0ZTtcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG52YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xudmFyIHJlamVjdDtcblxuaWYgKCF0cnVlKSB7XG5pZiAoY2FuRXZhbHVhdGUpIHtcbiAgICB2YXIgdGhlbkNhbGxiYWNrID0gZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwidmFsdWVcIiwgXCJob2xkZXJcIiwgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBob2xkZXIucEluZGV4ID0gdmFsdWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBob2xkZXIuY2hlY2tGdWxmaWxsbWVudCh0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBcIi5yZXBsYWNlKC9JbmRleC9nLCBpKSk7XG4gICAgfTtcblxuICAgIHZhciBwcm9taXNlU2V0dGVyID0gZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwicHJvbWlzZVwiLCBcImhvbGRlclwiLCBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBob2xkZXIucEluZGV4ID0gcHJvbWlzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBcIi5yZXBsYWNlKC9JbmRleC9nLCBpKSk7XG4gICAgfTtcblxuICAgIHZhciBnZW5lcmF0ZUhvbGRlckNsYXNzID0gZnVuY3Rpb24odG90YWwpIHtcbiAgICAgICAgdmFyIHByb3BzID0gbmV3IEFycmF5KHRvdGFsKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgcHJvcHNbaV0gPSBcInRoaXMucFwiICsgKGkrMSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBwcm9wcy5qb2luKFwiID0gXCIpICsgXCIgPSBudWxsO1wiO1xuICAgICAgICB2YXIgY2FuY2VsbGF0aW9uQ29kZT0gXCJ2YXIgcHJvbWlzZTtcXG5cIiArIHByb3BzLm1hcChmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBcIiArIHByb3AgKyBcIjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgaWYgKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UuY2FuY2VsKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBcIjtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgdmFyIHBhc3NlZEFyZ3VtZW50cyA9IHByb3BzLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgdmFyIG5hbWUgPSBcIkhvbGRlciRcIiArIHRvdGFsO1xuXG5cbiAgICAgICAgdmFyIGNvZGUgPSBcInJldHVybiBmdW5jdGlvbih0cnlDYXRjaCwgZXJyb3JPYmosIFByb21pc2UsIGFzeW5jKSB7ICAgIFxcblxcXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBmdW5jdGlvbiBbVGhlTmFtZV0oZm4pIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgW1RoZVByb3BlcnRpZXNdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgdGhpcy5mbiA9IGZuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgdGhpcy5hc3luY05lZWRlZCA9IHRydWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgdGhpcy5ub3cgPSAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBbVGhlTmFtZV0ucHJvdG90eXBlLl9jYWxsRnVuY3Rpb24gPSBmdW5jdGlvbihwcm9taXNlKSB7ICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fcHVzaENvbnRleHQoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IHRyeUNhdGNoKHRoaXMuZm4pKFtUaGVQYXNzZWRBcmd1bWVudHNdKTsgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fcG9wQ29udGV4dCgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UuX3JlamVjdENhbGxiYWNrKHJldC5lLCBmYWxzZSk7ICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UuX3Jlc29sdmVDYWxsYmFjayhyZXQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB9OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBbVGhlTmFtZV0ucHJvdG90eXBlLmNoZWNrRnVsZmlsbG1lbnQgPSBmdW5jdGlvbihwcm9taXNlKSB7ICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9ICsrdGhpcy5ub3c7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgaWYgKG5vdyA9PT0gW1RoZVRvdGFsXSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFzeW5jTmVlZGVkKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYy5pbnZva2UodGhpcy5fY2FsbEZ1bmN0aW9uLCB0aGlzLCBwcm9taXNlKTsgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWxsRnVuY3Rpb24ocHJvbWlzZSk7ICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB9OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBbVGhlTmFtZV0ucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHsgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgW0NhbmNlbGxhdGlvbkNvZGVdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB9OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICByZXR1cm4gW1RoZU5hbWVdOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIH0odHJ5Q2F0Y2gsIGVycm9yT2JqLCBQcm9taXNlLCBhc3luYyk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIFwiO1xuXG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcW1RoZU5hbWVcXF0vZywgbmFtZSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXFtUaGVUb3RhbFxcXS9nLCB0b3RhbClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXFtUaGVQYXNzZWRBcmd1bWVudHNcXF0vZywgcGFzc2VkQXJndW1lbnRzKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcW1RoZVByb3BlcnRpZXNcXF0vZywgYXNzaWdubWVudClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXFtDYW5jZWxsYXRpb25Db2RlXFxdL2csIGNhbmNlbGxhdGlvbkNvZGUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJ0cnlDYXRjaFwiLCBcImVycm9yT2JqXCIsIFwiUHJvbWlzZVwiLCBcImFzeW5jXCIsIGNvZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAodHJ5Q2F0Y2gsIGVycm9yT2JqLCBQcm9taXNlLCBhc3luYyk7XG4gICAgfTtcblxuICAgIHZhciBob2xkZXJDbGFzc2VzID0gW107XG4gICAgdmFyIHRoZW5DYWxsYmFja3MgPSBbXTtcbiAgICB2YXIgcHJvbWlzZVNldHRlcnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgKytpKSB7XG4gICAgICAgIGhvbGRlckNsYXNzZXMucHVzaChnZW5lcmF0ZUhvbGRlckNsYXNzKGkgKyAxKSk7XG4gICAgICAgIHRoZW5DYWxsYmFja3MucHVzaCh0aGVuQ2FsbGJhY2soaSArIDEpKTtcbiAgICAgICAgcHJvbWlzZVNldHRlcnMucHVzaChwcm9taXNlU2V0dGVyKGkgKyAxKSk7XG4gICAgfVxuXG4gICAgcmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICB0aGlzLl9yZWplY3QocmVhc29uKTtcbiAgICB9O1xufX1cblxuUHJvbWlzZS5qb2luID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYXN0ID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgdmFyIGZuO1xuICAgIGlmIChsYXN0ID4gMCAmJiB0eXBlb2YgYXJndW1lbnRzW2xhc3RdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZm4gPSBhcmd1bWVudHNbbGFzdF07XG4gICAgICAgIGlmICghdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKGxhc3QgPD0gOCAmJiBjYW5FdmFsdWF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgICAgICAgICAgcmV0Ll9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgICAgICAgICAgICAgIHZhciBIb2xkZXJDbGFzcyA9IGhvbGRlckNsYXNzZXNbbGFzdCAtIDFdO1xuICAgICAgICAgICAgICAgIHZhciBob2xkZXIgPSBuZXcgSG9sZGVyQ2xhc3MoZm4pO1xuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFja3MgPSB0aGVuQ2FsbGJhY2tzO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UoYXJndW1lbnRzW2ldLCByZXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlID0gbWF5YmVQcm9taXNlLl90YXJnZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiaXRGaWVsZCA9IG1heWJlUHJvbWlzZS5fYml0RmllbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX3RoZW4oY2FsbGJhY2tzW2ldLCByZWplY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwgcmV0LCBob2xkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VTZXR0ZXJzW2ldKG1heWJlUHJvbWlzZSwgaG9sZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xkZXIuYXN5bmNOZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0uY2FsbChyZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl92YWx1ZSgpLCBob2xkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMTY3NzcyMTYpICE9PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5fcmVqZWN0KG1heWJlUHJvbWlzZS5fcmVhc29uKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQuX2NhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldLmNhbGwocmV0LCBtYXliZVByb21pc2UsIGhvbGRlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXJldC5faXNGYXRlU2VhbGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvbGRlci5hc3luY05lZWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvbWFpbiA9IGdldERvbWFpbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvbWFpbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGRlci5mbiA9IHV0aWwuZG9tYWluQmluZChkb21haW4sIGhvbGRlci5mbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0Ll9zZXRBc3luY0d1YXJhbnRlZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0Ll9zZXRPbkNhbmNlbChob2xkZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpOztcbiAgICBpZiAoZm4pIGFyZ3MucG9wKCk7XG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlQXJyYXkoYXJncykucHJvbWlzZSgpO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkID8gcmV0LnNwcmVhZChmbikgOiByZXQ7XG59O1xuXG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMTg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2VBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXBpUmVqZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0cnlDb252ZXJ0VG9Qcm9taXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBJTlRFUk5BTCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcpIHtcbnZhciBnZXREb21haW4gPSBQcm9taXNlLl9nZXREb21haW47XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciBhc3luYyA9IFByb21pc2UuX2FzeW5jO1xuXG5mdW5jdGlvbiBNYXBwaW5nUHJvbWlzZUFycmF5KHByb21pc2VzLCBmbiwgbGltaXQsIF9maWx0ZXIpIHtcbiAgICB0aGlzLmNvbnN0cnVjdG9yJChwcm9taXNlcyk7XG4gICAgdGhpcy5fcHJvbWlzZS5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICB2YXIgZG9tYWluID0gZ2V0RG9tYWluKCk7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBkb21haW4gPT09IG51bGwgPyBmbiA6IHV0aWwuZG9tYWluQmluZChkb21haW4sIGZuKTtcbiAgICB0aGlzLl9wcmVzZXJ2ZWRWYWx1ZXMgPSBfZmlsdGVyID09PSBJTlRFUk5BTFxuICAgICAgICA/IG5ldyBBcnJheSh0aGlzLmxlbmd0aCgpKVxuICAgICAgICA6IG51bGw7XG4gICAgdGhpcy5fbGltaXQgPSBsaW1pdDtcbiAgICB0aGlzLl9pbkZsaWdodCA9IDA7XG4gICAgdGhpcy5fcXVldWUgPSBbXTtcbiAgICBhc3luYy5pbnZva2UodGhpcy5fYXN5bmNJbml0LCB0aGlzLCB1bmRlZmluZWQpO1xufVxudXRpbC5pbmhlcml0cyhNYXBwaW5nUHJvbWlzZUFycmF5LCBQcm9taXNlQXJyYXkpO1xuXG5NYXBwaW5nUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fYXN5bmNJbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5faW5pdCQodW5kZWZpbmVkLCAtMik7XG59O1xuXG5NYXBwaW5nUHJvbWlzZUFycmF5LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHt9O1xuXG5NYXBwaW5nUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUZ1bGZpbGxlZCA9IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICB2YXIgdmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCgpO1xuICAgIHZhciBwcmVzZXJ2ZWRWYWx1ZXMgPSB0aGlzLl9wcmVzZXJ2ZWRWYWx1ZXM7XG4gICAgdmFyIGxpbWl0ID0gdGhpcy5fbGltaXQ7XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGluZGV4ID0gKGluZGV4ICogLTEpIC0gMTtcbiAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICBpZiAobGltaXQgPj0gMSkge1xuICAgICAgICAgICAgdGhpcy5faW5GbGlnaHQtLTtcbiAgICAgICAgICAgIHRoaXMuX2RyYWluUXVldWUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxpbWl0ID49IDEgJiYgdGhpcy5faW5GbGlnaHQgPj0gbGltaXQpIHtcbiAgICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmVzZXJ2ZWRWYWx1ZXMgIT09IG51bGwpIHByZXNlcnZlZFZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcblxuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2U7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICB2YXIgcmVjZWl2ZXIgPSBwcm9taXNlLl9ib3VuZFZhbHVlKCk7XG4gICAgICAgIHByb21pc2UuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgIHZhciByZXQgPSB0cnlDYXRjaChjYWxsYmFjaykuY2FsbChyZWNlaXZlciwgdmFsdWUsIGluZGV4LCBsZW5ndGgpO1xuICAgICAgICB2YXIgcHJvbWlzZUNyZWF0ZWQgPSBwcm9taXNlLl9wb3BDb250ZXh0KCk7XG4gICAgICAgIGRlYnVnLmNoZWNrRm9yZ290dGVuUmV0dXJucyhcbiAgICAgICAgICAgIHJldCxcbiAgICAgICAgICAgIHByb21pc2VDcmVhdGVkLFxuICAgICAgICAgICAgcHJlc2VydmVkVmFsdWVzICE9PSBudWxsID8gXCJQcm9taXNlLmZpbHRlclwiIDogXCJQcm9taXNlLm1hcFwiLFxuICAgICAgICAgICAgcHJvbWlzZVxuICAgICAgICApO1xuICAgICAgICBpZiAocmV0ID09PSBlcnJvck9iaikge1xuICAgICAgICAgICAgdGhpcy5fcmVqZWN0KHJldC5lKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UocmV0LCB0aGlzLl9wcm9taXNlKTtcbiAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIG1heWJlUHJvbWlzZSA9IG1heWJlUHJvbWlzZS5fdGFyZ2V0KCk7XG4gICAgICAgICAgICB2YXIgYml0RmllbGQgPSBtYXliZVByb21pc2UuX2JpdEZpZWxkO1xuICAgICAgICAgICAgO1xuICAgICAgICAgICAgaWYgKCgoYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpbWl0ID49IDEpIHRoaXMuX2luRmxpZ2h0Kys7XG4gICAgICAgICAgICAgICAgdmFsdWVzW2luZGV4XSA9IG1heWJlUHJvbWlzZTtcbiAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX3Byb3h5KHRoaXMsIChpbmRleCArIDEpICogLTEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBtYXliZVByb21pc2UuX3ZhbHVlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVqZWN0KG1heWJlUHJvbWlzZS5fcmVhc29uKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNbaW5kZXhdID0gcmV0O1xuICAgIH1cbiAgICB2YXIgdG90YWxSZXNvbHZlZCA9ICsrdGhpcy5fdG90YWxSZXNvbHZlZDtcbiAgICBpZiAodG90YWxSZXNvbHZlZCA+PSBsZW5ndGgpIHtcbiAgICAgICAgaWYgKHByZXNlcnZlZFZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZmlsdGVyKHZhbHVlcywgcHJlc2VydmVkVmFsdWVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuTWFwcGluZ1Byb21pc2VBcnJheS5wcm90b3R5cGUuX2RyYWluUXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHF1ZXVlID0gdGhpcy5fcXVldWU7XG4gICAgdmFyIGxpbWl0ID0gdGhpcy5fbGltaXQ7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCAmJiB0aGlzLl9pbkZsaWdodCA8IGxpbWl0KSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybjtcbiAgICAgICAgdmFyIGluZGV4ID0gcXVldWUucG9wKCk7XG4gICAgICAgIHRoaXMuX3Byb21pc2VGdWxmaWxsZWQodmFsdWVzW2luZGV4XSwgaW5kZXgpO1xuICAgIH1cbn07XG5cbk1hcHBpbmdQcm9taXNlQXJyYXkucHJvdG90eXBlLl9maWx0ZXIgPSBmdW5jdGlvbiAoYm9vbGVhbnMsIHZhbHVlcykge1xuICAgIHZhciBsZW4gPSB2YWx1ZXMubGVuZ3RoO1xuICAgIHZhciByZXQgPSBuZXcgQXJyYXkobGVuKTtcbiAgICB2YXIgaiA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICBpZiAoYm9vbGVhbnNbaV0pIHJldFtqKytdID0gdmFsdWVzW2ldO1xuICAgIH1cbiAgICByZXQubGVuZ3RoID0gajtcbiAgICB0aGlzLl9yZXNvbHZlKHJldCk7XG59O1xuXG5NYXBwaW5nUHJvbWlzZUFycmF5LnByb3RvdHlwZS5wcmVzZXJ2ZWRWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZXNlcnZlZFZhbHVlcztcbn07XG5cbmZ1bmN0aW9uIG1hcChwcm9taXNlcywgZm4sIG9wdGlvbnMsIF9maWx0ZXIpIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGZuKSk7XG4gICAgfVxuXG4gICAgdmFyIGxpbWl0ID0gMDtcbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuY29uY3VycmVuY3kgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUeXBlRXJyb3IoXCInY29uY3VycmVuY3knIG11c3QgYmUgYSBudW1iZXIgYnV0IGl0IGlzIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuY2xhc3NTdHJpbmcob3B0aW9ucy5jb25jdXJyZW5jeSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbWl0ID0gb3B0aW9ucy5jb25jdXJyZW5jeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3B0aW9ucyBhcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdCBidXQgaXQgaXMgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmNsYXNzU3RyaW5nKG9wdGlvbnMpKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGltaXQgPSB0eXBlb2YgbGltaXQgPT09IFwibnVtYmVyXCIgJiZcbiAgICAgICAgaXNGaW5pdGUobGltaXQpICYmIGxpbWl0ID49IDEgPyBsaW1pdCA6IDA7XG4gICAgcmV0dXJuIG5ldyBNYXBwaW5nUHJvbWlzZUFycmF5KHByb21pc2VzLCBmbiwgbGltaXQsIF9maWx0ZXIpLnByb21pc2UoKTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKGZuLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG1hcCh0aGlzLCBmbiwgb3B0aW9ucywgbnVsbCk7XG59O1xuXG5Qcm9taXNlLm1hcCA9IGZ1bmN0aW9uIChwcm9taXNlcywgZm4sIG9wdGlvbnMsIF9maWx0ZXIpIHtcbiAgICByZXR1cm4gbWFwKHByb21pc2VzLCBmbiwgb3B0aW9ucywgX2ZpbHRlcik7XG59O1xuXG5cbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwxOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID1cbmZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBhcGlSZWplY3Rpb24sIGRlYnVnKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xuXG5Qcm9taXNlLm1ldGhvZCA9IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgUHJvbWlzZS5UeXBlRXJyb3IoXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgICAgIHJldC5fcHVzaENvbnRleHQoKTtcbiAgICAgICAgdmFyIHZhbHVlID0gdHJ5Q2F0Y2goZm4pLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBwcm9taXNlQ3JlYXRlZCA9IHJldC5fcG9wQ29udGV4dCgpO1xuICAgICAgICBkZWJ1Zy5jaGVja0ZvcmdvdHRlblJldHVybnMoXG4gICAgICAgICAgICB2YWx1ZSwgcHJvbWlzZUNyZWF0ZWQsIFwiUHJvbWlzZS5tZXRob2RcIiwgcmV0KTtcbiAgICAgICAgcmV0Ll9yZXNvbHZlRnJvbVN5bmNWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbn07XG5cblByb21pc2UuYXR0ZW1wdCA9IFByb21pc2VbXCJ0cnlcIl0gPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGZuKSk7XG4gICAgfVxuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgcmV0Ll9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgIHJldC5fcHVzaENvbnRleHQoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGRlYnVnLmRlcHJlY2F0ZWQoXCJjYWxsaW5nIFByb21pc2UudHJ5IHdpdGggbW9yZSB0aGFuIDEgYXJndW1lbnRcIik7XG4gICAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIHZhciBjdHggPSBhcmd1bWVudHNbMl07XG4gICAgICAgIHZhbHVlID0gdXRpbC5pc0FycmF5KGFyZykgPyB0cnlDYXRjaChmbikuYXBwbHkoY3R4LCBhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0cnlDYXRjaChmbikuY2FsbChjdHgsIGFyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSB0cnlDYXRjaChmbikoKTtcbiAgICB9XG4gICAgdmFyIHByb21pc2VDcmVhdGVkID0gcmV0Ll9wb3BDb250ZXh0KCk7XG4gICAgZGVidWcuY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zKFxuICAgICAgICB2YWx1ZSwgcHJvbWlzZUNyZWF0ZWQsIFwiUHJvbWlzZS50cnlcIiwgcmV0KTtcbiAgICByZXQuX3Jlc29sdmVGcm9tU3luY1ZhbHVlKHZhbHVlKTtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Jlc29sdmVGcm9tU3luY1ZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSB1dGlsLmVycm9yT2JqKSB7XG4gICAgICAgIHRoaXMuX3JlamVjdENhbGxiYWNrKHZhbHVlLmUsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZXNvbHZlQ2FsbGJhY2sodmFsdWUsIHRydWUpO1xuICAgIH1cbn07XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMjA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgbWF5YmVXcmFwQXNFcnJvciA9IHV0aWwubWF5YmVXcmFwQXNFcnJvcjtcbnZhciBlcnJvcnMgPSBfZGVyZXFfKFwiLi9lcnJvcnNcIik7XG52YXIgT3BlcmF0aW9uYWxFcnJvciA9IGVycm9ycy5PcGVyYXRpb25hbEVycm9yO1xudmFyIGVzNSA9IF9kZXJlcV8oXCIuL2VzNVwiKTtcblxuZnVuY3Rpb24gaXNVbnR5cGVkRXJyb3Iob2JqKSB7XG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEVycm9yICYmXG4gICAgICAgIGVzNS5nZXRQcm90b3R5cGVPZihvYmopID09PSBFcnJvci5wcm90b3R5cGU7XG59XG5cbnZhciByRXJyb3JLZXkgPSAvXig/Om5hbWV8bWVzc2FnZXxzdGFja3xjYXVzZSkkLztcbmZ1bmN0aW9uIHdyYXBBc09wZXJhdGlvbmFsRXJyb3Iob2JqKSB7XG4gICAgdmFyIHJldDtcbiAgICBpZiAoaXNVbnR5cGVkRXJyb3Iob2JqKSkge1xuICAgICAgICByZXQgPSBuZXcgT3BlcmF0aW9uYWxFcnJvcihvYmopO1xuICAgICAgICByZXQubmFtZSA9IG9iai5uYW1lO1xuICAgICAgICByZXQubWVzc2FnZSA9IG9iai5tZXNzYWdlO1xuICAgICAgICByZXQuc3RhY2sgPSBvYmouc3RhY2s7XG4gICAgICAgIHZhciBrZXlzID0gZXM1LmtleXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgIGlmICghckVycm9yS2V5LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgdXRpbC5tYXJrQXNPcmlnaW5hdGluZ0Zyb21SZWplY3Rpb24ob2JqKTtcbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBub2RlYmFja0ZvclByb21pc2UocHJvbWlzZSwgbXVsdGlBcmdzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVyciwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHByb21pc2UgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgdmFyIHdyYXBwZWQgPSB3cmFwQXNPcGVyYXRpb25hbEVycm9yKG1heWJlV3JhcEFzRXJyb3IoZXJyKSk7XG4gICAgICAgICAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHdyYXBwZWQpO1xuICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0KHdyYXBwZWQpO1xuICAgICAgICB9IGVsc2UgaWYgKCFtdWx0aUFyZ3MpIHtcbiAgICAgICAgICAgIHByb21pc2UuX2Z1bGZpbGwodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7O1xuICAgICAgICAgICAgcHJvbWlzZS5fZnVsZmlsbChhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vZGViYWNrRm9yUHJvbWlzZTtcblxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi9lczVcIjoxMyxcIi4vdXRpbFwiOjM2fV0sMjE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UpIHtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciBhc3luYyA9IFByb21pc2UuX2FzeW5jO1xudmFyIHRyeUNhdGNoID0gdXRpbC50cnlDYXRjaDtcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XG5cbmZ1bmN0aW9uIHNwcmVhZEFkYXB0ZXIodmFsLCBub2RlYmFjaykge1xuICAgIHZhciBwcm9taXNlID0gdGhpcztcbiAgICBpZiAoIXV0aWwuaXNBcnJheSh2YWwpKSByZXR1cm4gc3VjY2Vzc0FkYXB0ZXIuY2FsbChwcm9taXNlLCB2YWwsIG5vZGViYWNrKTtcbiAgICB2YXIgcmV0ID1cbiAgICAgICAgdHJ5Q2F0Y2gobm9kZWJhY2spLmFwcGx5KHByb21pc2UuX2JvdW5kVmFsdWUoKSwgW251bGxdLmNvbmNhdCh2YWwpKTtcbiAgICBpZiAocmV0ID09PSBlcnJvck9iaikge1xuICAgICAgICBhc3luYy50aHJvd0xhdGVyKHJldC5lKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN1Y2Nlc3NBZGFwdGVyKHZhbCwgbm9kZWJhY2spIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgdmFyIHJlY2VpdmVyID0gcHJvbWlzZS5fYm91bmRWYWx1ZSgpO1xuICAgIHZhciByZXQgPSB2YWwgPT09IHVuZGVmaW5lZFxuICAgICAgICA/IHRyeUNhdGNoKG5vZGViYWNrKS5jYWxsKHJlY2VpdmVyLCBudWxsKVxuICAgICAgICA6IHRyeUNhdGNoKG5vZGViYWNrKS5jYWxsKHJlY2VpdmVyLCBudWxsLCB2YWwpO1xuICAgIGlmIChyZXQgPT09IGVycm9yT2JqKSB7XG4gICAgICAgIGFzeW5jLnRocm93TGF0ZXIocmV0LmUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVycm9yQWRhcHRlcihyZWFzb24sIG5vZGViYWNrKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuICAgIGlmICghcmVhc29uKSB7XG4gICAgICAgIHZhciBuZXdSZWFzb24gPSBuZXcgRXJyb3IocmVhc29uICsgXCJcIik7XG4gICAgICAgIG5ld1JlYXNvbi5jYXVzZSA9IHJlYXNvbjtcbiAgICAgICAgcmVhc29uID0gbmV3UmVhc29uO1xuICAgIH1cbiAgICB2YXIgcmV0ID0gdHJ5Q2F0Y2gobm9kZWJhY2spLmNhbGwocHJvbWlzZS5fYm91bmRWYWx1ZSgpLCByZWFzb24pO1xuICAgIGlmIChyZXQgPT09IGVycm9yT2JqKSB7XG4gICAgICAgIGFzeW5jLnRocm93TGF0ZXIocmV0LmUpO1xuICAgIH1cbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuYXNDYWxsYmFjayA9IFByb21pc2UucHJvdG90eXBlLm5vZGVpZnkgPSBmdW5jdGlvbiAobm9kZWJhY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBub2RlYmFjayA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdmFyIGFkYXB0ZXIgPSBzdWNjZXNzQWRhcHRlcjtcbiAgICAgICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiBPYmplY3Qob3B0aW9ucykuc3ByZWFkKSB7XG4gICAgICAgICAgICBhZGFwdGVyID0gc3ByZWFkQWRhcHRlcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90aGVuKFxuICAgICAgICAgICAgYWRhcHRlcixcbiAgICAgICAgICAgIGVycm9yQWRhcHRlcixcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICBub2RlYmFja1xuICAgICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMjI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xudmFyIG1ha2VTZWxmUmVzb2x1dGlvbkVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKFwiY2lyY3VsYXIgcHJvbWlzZSByZXNvbHV0aW9uIGNoYWluXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbn07XG52YXIgcmVmbGVjdEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UuUHJvbWlzZUluc3BlY3Rpb24odGhpcy5fdGFyZ2V0KCkpO1xufTtcbnZhciBhcGlSZWplY3Rpb24gPSBmdW5jdGlvbihtc2cpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihtc2cpKTtcbn07XG5mdW5jdGlvbiBQcm94eWFibGUoKSB7fVxudmFyIFVOREVGSU5FRF9CSU5ESU5HID0ge307XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG5cbnZhciBnZXREb21haW47XG5pZiAodXRpbC5pc05vZGUpIHtcbiAgICBnZXREb21haW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJldCA9IHByb2Nlc3MuZG9tYWluO1xuICAgICAgICBpZiAocmV0ID09PSB1bmRlZmluZWQpIHJldCA9IG51bGw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgZ2V0RG9tYWluID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG59XG51dGlsLm5vdEVudW1lcmFibGVQcm9wKFByb21pc2UsIFwiX2dldERvbWFpblwiLCBnZXREb21haW4pO1xuXG52YXIgZXM1ID0gX2RlcmVxXyhcIi4vZXM1XCIpO1xudmFyIEFzeW5jID0gX2RlcmVxXyhcIi4vYXN5bmNcIik7XG52YXIgYXN5bmMgPSBuZXcgQXN5bmMoKTtcbmVzNS5kZWZpbmVQcm9wZXJ0eShQcm9taXNlLCBcIl9hc3luY1wiLCB7dmFsdWU6IGFzeW5jfSk7XG52YXIgZXJyb3JzID0gX2RlcmVxXyhcIi4vZXJyb3JzXCIpO1xudmFyIFR5cGVFcnJvciA9IFByb21pc2UuVHlwZUVycm9yID0gZXJyb3JzLlR5cGVFcnJvcjtcblByb21pc2UuUmFuZ2VFcnJvciA9IGVycm9ycy5SYW5nZUVycm9yO1xudmFyIENhbmNlbGxhdGlvbkVycm9yID0gUHJvbWlzZS5DYW5jZWxsYXRpb25FcnJvciA9IGVycm9ycy5DYW5jZWxsYXRpb25FcnJvcjtcblByb21pc2UuVGltZW91dEVycm9yID0gZXJyb3JzLlRpbWVvdXRFcnJvcjtcblByb21pc2UuT3BlcmF0aW9uYWxFcnJvciA9IGVycm9ycy5PcGVyYXRpb25hbEVycm9yO1xuUHJvbWlzZS5SZWplY3Rpb25FcnJvciA9IGVycm9ycy5PcGVyYXRpb25hbEVycm9yO1xuUHJvbWlzZS5BZ2dyZWdhdGVFcnJvciA9IGVycm9ycy5BZ2dyZWdhdGVFcnJvcjtcbnZhciBJTlRFUk5BTCA9IGZ1bmN0aW9uKCl7fTtcbnZhciBBUFBMWSA9IHt9O1xudmFyIE5FWFRfRklMVEVSID0ge307XG52YXIgdHJ5Q29udmVydFRvUHJvbWlzZSA9IF9kZXJlcV8oXCIuL3RoZW5hYmxlc1wiKShQcm9taXNlLCBJTlRFUk5BTCk7XG52YXIgUHJvbWlzZUFycmF5ID1cbiAgICBfZGVyZXFfKFwiLi9wcm9taXNlX2FycmF5XCIpKFByb21pc2UsIElOVEVSTkFMLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeUNvbnZlcnRUb1Byb21pc2UsIGFwaVJlamVjdGlvbiwgUHJveHlhYmxlKTtcbnZhciBDb250ZXh0ID0gX2RlcmVxXyhcIi4vY29udGV4dFwiKShQcm9taXNlKTtcbiAvKmpzaGludCB1bnVzZWQ6ZmFsc2UqL1xudmFyIGNyZWF0ZUNvbnRleHQgPSBDb250ZXh0LmNyZWF0ZTtcbnZhciBkZWJ1ZyA9IF9kZXJlcV8oXCIuL2RlYnVnZ2FiaWxpdHlcIikoUHJvbWlzZSwgQ29udGV4dCk7XG52YXIgQ2FwdHVyZWRUcmFjZSA9IGRlYnVnLkNhcHR1cmVkVHJhY2U7XG52YXIgUGFzc1Rocm91Z2hIYW5kbGVyQ29udGV4dCA9XG4gICAgX2RlcmVxXyhcIi4vZmluYWxseVwiKShQcm9taXNlLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBORVhUX0ZJTFRFUik7XG52YXIgY2F0Y2hGaWx0ZXIgPSBfZGVyZXFfKFwiLi9jYXRjaF9maWx0ZXJcIikoTkVYVF9GSUxURVIpO1xudmFyIG5vZGViYWNrRm9yUHJvbWlzZSA9IF9kZXJlcV8oXCIuL25vZGViYWNrXCIpO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG5mdW5jdGlvbiBjaGVjayhzZWxmLCBleGVjdXRvcikge1xuICAgIGlmIChzZWxmID09IG51bGwgfHwgc2VsZi5jb25zdHJ1Y3RvciAhPT0gUHJvbWlzZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidGhlIHByb21pc2UgY29uc3RydWN0b3IgY2Fubm90IGJlIGludm9rZWQgZGlyZWN0bHlcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGV4ZWN1dG9yKSk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBpZiAoZXhlY3V0b3IgIT09IElOVEVSTkFMKSB7XG4gICAgICAgIGNoZWNrKHRoaXMsIGV4ZWN1dG9yKTtcbiAgICB9XG4gICAgdGhpcy5fYml0RmllbGQgPSAwO1xuICAgIHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcjAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJvbWlzZTAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcmVjZWl2ZXIwID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3Jlc29sdmVGcm9tRXhlY3V0b3IoZXhlY3V0b3IpO1xuICAgIHRoaXMuX3Byb21pc2VDcmVhdGVkKCk7XG4gICAgdGhpcy5fZmlyZUV2ZW50KFwicHJvbWlzZUNyZWF0ZWRcIiwgdGhpcyk7XG59XG5cblByb21pc2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgUHJvbWlzZV1cIjtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmNhdWdodCA9IFByb21pc2UucHJvdG90eXBlW1wiY2F0Y2hcIl0gPSBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAobGVuID4gMSkge1xuICAgICAgICB2YXIgY2F0Y2hJbnN0YW5jZXMgPSBuZXcgQXJyYXkobGVuIC0gMSksXG4gICAgICAgICAgICBqID0gMCwgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbiAtIDE7ICsraSkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBpZiAodXRpbC5pc09iamVjdChpdGVtKSkge1xuICAgICAgICAgICAgICAgIGNhdGNoSW5zdGFuY2VzW2orK10gPSBpdGVtO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiQ2F0Y2ggc3RhdGVtZW50IHByZWRpY2F0ZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICBcImV4cGVjdGluZyBhbiBvYmplY3QgYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoaXRlbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoSW5zdGFuY2VzLmxlbmd0aCA9IGo7XG4gICAgICAgIGZuID0gYXJndW1lbnRzW2ldO1xuICAgICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgY2F0Y2hGaWx0ZXIoY2F0Y2hJbnN0YW5jZXMsIGZuLCB0aGlzKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBmbik7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5yZWZsZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl90aGVuKHJlZmxlY3RIYW5kbGVyLFxuICAgICAgICByZWZsZWN0SGFuZGxlciwgdW5kZWZpbmVkLCB0aGlzLCB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIChkaWRGdWxmaWxsLCBkaWRSZWplY3QpIHtcbiAgICBpZiAoZGVidWcud2FybmluZ3MoKSAmJiBhcmd1bWVudHMubGVuZ3RoID4gMCAmJlxuICAgICAgICB0eXBlb2YgZGlkRnVsZmlsbCAhPT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIHR5cGVvZiBkaWRSZWplY3QgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB2YXIgbXNnID0gXCIudGhlbigpIG9ubHkgYWNjZXB0cyBmdW5jdGlvbnMgYnV0IHdhcyBwYXNzZWQ6IFwiICtcbiAgICAgICAgICAgICAgICB1dGlsLmNsYXNzU3RyaW5nKGRpZEZ1bGZpbGwpO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIG1zZyArPSBcIiwgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGRpZFJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd2Fybihtc2cpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdGhlbihkaWRGdWxmaWxsLCBkaWRSZWplY3QsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uIChkaWRGdWxmaWxsLCBkaWRSZWplY3QpIHtcbiAgICB2YXIgcHJvbWlzZSA9XG4gICAgICAgIHRoaXMuX3RoZW4oZGlkRnVsZmlsbCwgZGlkUmVqZWN0LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgICBwcm9taXNlLl9zZXRJc0ZpbmFsKCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5zcHJlYWQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGZuKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFsbCgpLl90aGVuKGZuLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgQVBQTFksIHVuZGVmaW5lZCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJldCA9IHtcbiAgICAgICAgaXNGdWxmaWxsZWQ6IGZhbHNlLFxuICAgICAgICBpc1JlamVjdGVkOiBmYWxzZSxcbiAgICAgICAgZnVsZmlsbG1lbnRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICByZWplY3Rpb25SZWFzb246IHVuZGVmaW5lZFxuICAgIH07XG4gICAgaWYgKHRoaXMuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICByZXQuZnVsZmlsbG1lbnRWYWx1ZSA9IHRoaXMudmFsdWUoKTtcbiAgICAgICAgcmV0LmlzRnVsZmlsbGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNSZWplY3RlZCgpKSB7XG4gICAgICAgIHJldC5yZWplY3Rpb25SZWFzb24gPSB0aGlzLnJlYXNvbigpO1xuICAgICAgICByZXQuaXNSZWplY3RlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5hbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX3dhcm4oXCIuYWxsKCkgd2FzIHBhc3NlZCBhcmd1bWVudHMgYnV0IGl0IGRvZXMgbm90IHRha2UgYW55XCIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2VBcnJheSh0aGlzKS5wcm9taXNlKCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChmbikge1xuICAgIHJldHVybiB0aGlzLmNhdWdodCh1dGlsLm9yaWdpbmF0ZXNGcm9tUmVqZWN0aW9uLCBmbik7XG59O1xuXG5Qcm9taXNlLmdldE5ld0xpYnJhcnlDb3B5ID0gbW9kdWxlLmV4cG9ydHM7XG5cblByb21pc2UuaXMgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIFByb21pc2U7XG59O1xuXG5Qcm9taXNlLmZyb21Ob2RlID0gUHJvbWlzZS5mcm9tQ2FsbGJhY2sgPSBmdW5jdGlvbihmbikge1xuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgcmV0Ll9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgIHZhciBtdWx0aUFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/ICEhT2JqZWN0KGFyZ3VtZW50c1sxXSkubXVsdGlBcmdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoKGZuKShub2RlYmFja0ZvclByb21pc2UocmV0LCBtdWx0aUFyZ3MpKTtcbiAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iaikge1xuICAgICAgICByZXQuX3JlamVjdENhbGxiYWNrKHJlc3VsdC5lLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKCFyZXQuX2lzRmF0ZVNlYWxlZCgpKSByZXQuX3NldEFzeW5jR3VhcmFudGVlZCgpO1xuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLmFsbCA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZUFycmF5KHByb21pc2VzKS5wcm9taXNlKCk7XG59O1xuXG5Qcm9taXNlLmNhc3QgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHJldCA9IHRyeUNvbnZlcnRUb1Byb21pc2Uob2JqKTtcbiAgICBpZiAoIShyZXQgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgICByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgIHJldC5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICAgICAgcmV0Ll9zZXRGdWxmaWxsZWQoKTtcbiAgICAgICAgcmV0Ll9yZWplY3Rpb25IYW5kbGVyMCA9IG9iajtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucmVzb2x2ZSA9IFByb21pc2UuZnVsZmlsbGVkID0gUHJvbWlzZS5jYXN0O1xuXG5Qcm9taXNlLnJlamVjdCA9IFByb21pc2UucmVqZWN0ZWQgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgcmV0Ll9yZWplY3RDYWxsYmFjayhyZWFzb24sIHRydWUpO1xuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLnNldFNjaGVkdWxlciA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xuICAgIH1cbiAgICByZXR1cm4gYXN5bmMuc2V0U2NoZWR1bGVyKGZuKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl90aGVuID0gZnVuY3Rpb24gKFxuICAgIGRpZEZ1bGZpbGwsXG4gICAgZGlkUmVqZWN0LFxuICAgIF8sICAgIHJlY2VpdmVyLFxuICAgIGludGVybmFsRGF0YVxuKSB7XG4gICAgdmFyIGhhdmVJbnRlcm5hbERhdGEgPSBpbnRlcm5hbERhdGEgIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgcHJvbWlzZSA9IGhhdmVJbnRlcm5hbERhdGEgPyBpbnRlcm5hbERhdGEgOiBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX3RhcmdldCgpO1xuICAgIHZhciBiaXRGaWVsZCA9IHRhcmdldC5fYml0RmllbGQ7XG5cbiAgICBpZiAoIWhhdmVJbnRlcm5hbERhdGEpIHtcbiAgICAgICAgcHJvbWlzZS5fcHJvcGFnYXRlRnJvbSh0aGlzLCAzKTtcbiAgICAgICAgcHJvbWlzZS5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcbiAgICAgICAgaWYgKHJlY2VpdmVyID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICgodGhpcy5fYml0RmllbGQgJiAyMDk3MTUyKSAhPT0gMCkpIHtcbiAgICAgICAgICAgIGlmICghKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHRoaXMuX2JvdW5kVmFsdWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB0YXJnZXQgPT09IHRoaXMgPyB1bmRlZmluZWQgOiB0aGlzLl9ib3VuZFRvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmVFdmVudChcInByb21pc2VDaGFpbmVkXCIsIHRoaXMsIHByb21pc2UpO1xuICAgIH1cblxuICAgIHZhciBkb21haW4gPSBnZXREb21haW4oKTtcbiAgICBpZiAoISgoYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XG4gICAgICAgIHZhciBoYW5kbGVyLCB2YWx1ZSwgc2V0dGxlciA9IHRhcmdldC5fc2V0dGxlUHJvbWlzZUN0eDtcbiAgICAgICAgaWYgKCgoYml0RmllbGQgJiAzMzU1NDQzMikgIT09IDApKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRhcmdldC5fcmVqZWN0aW9uSGFuZGxlcjA7XG4gICAgICAgICAgICBoYW5kbGVyID0gZGlkRnVsZmlsbDtcbiAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMTY3NzcyMTYpICE9PSAwKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0YXJnZXQuX2Z1bGZpbGxtZW50SGFuZGxlcjA7XG4gICAgICAgICAgICBoYW5kbGVyID0gZGlkUmVqZWN0O1xuICAgICAgICAgICAgdGFyZ2V0Ll91bnNldFJlamVjdGlvbklzVW5oYW5kbGVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXR0bGVyID0gdGFyZ2V0Ll9zZXR0bGVQcm9taXNlTGF0ZUNhbmNlbGxhdGlvbk9ic2VydmVyO1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgQ2FuY2VsbGF0aW9uRXJyb3IoXCJsYXRlIGNhbmNlbGxhdGlvbiBvYnNlcnZlclwiKTtcbiAgICAgICAgICAgIHRhcmdldC5fYXR0YWNoRXh0cmFUcmFjZSh2YWx1ZSk7XG4gICAgICAgICAgICBoYW5kbGVyID0gZGlkUmVqZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgYXN5bmMuaW52b2tlKHNldHRsZXIsIHRhcmdldCwge1xuICAgICAgICAgICAgaGFuZGxlcjogZG9tYWluID09PSBudWxsID8gaGFuZGxlclxuICAgICAgICAgICAgICAgIDogKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgaGFuZGxlcikpLFxuICAgICAgICAgICAgcHJvbWlzZTogcHJvbWlzZSxcbiAgICAgICAgICAgIHJlY2VpdmVyOiByZWNlaXZlcixcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXQuX2FkZENhbGxiYWNrcyhkaWRGdWxmaWxsLCBkaWRSZWplY3QsIHByb21pc2UsIHJlY2VpdmVyLCBkb21haW4pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2xlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYml0RmllbGQgJiA2NTUzNTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc0ZhdGVTZWFsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDExNzUwNjA0OCkgIT09IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5faXNGb2xsb3dpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDY3MTA4ODY0KSA9PT0gNjcxMDg4NjQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0TGVuZ3RoID0gZnVuY3Rpb24gKGxlbikge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gKHRoaXMuX2JpdEZpZWxkICYgLTY1NTM2KSB8XG4gICAgICAgIChsZW4gJiA2NTUzNSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0RnVsZmlsbGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAzMzU1NDQzMjtcbiAgICB0aGlzLl9maXJlRXZlbnQoXCJwcm9taXNlRnVsZmlsbGVkXCIsIHRoaXMpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldFJlamVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAxNjc3NzIxNjtcbiAgICB0aGlzLl9maXJlRXZlbnQoXCJwcm9taXNlUmVqZWN0ZWRcIiwgdGhpcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0Rm9sbG93aW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCA2NzEwODg2NDtcbiAgICB0aGlzLl9maXJlRXZlbnQoXCJwcm9taXNlUmVzb2x2ZWRcIiwgdGhpcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0SXNGaW5hbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgNDE5NDMwNDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc0ZpbmFsID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA0MTk0MzA0KSA+IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fdW5zZXRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkICYgKH42NTUzNik7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDY1NTM2O1xuICAgIHRoaXMuX2ZpcmVFdmVudChcInByb21pc2VDYW5jZWxsZWRcIiwgdGhpcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0V2lsbEJlQ2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDgzODg2MDg7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0QXN5bmNHdWFyYW50ZWVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGFzeW5jLmhhc0N1c3RvbVNjaGVkdWxlcigpKSByZXR1cm47XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDEzNDIxNzcyODtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZWNlaXZlckF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgdmFyIHJldCA9IGluZGV4ID09PSAwID8gdGhpcy5fcmVjZWl2ZXIwIDogdGhpc1tcbiAgICAgICAgICAgIGluZGV4ICogNCAtIDQgKyAzXTtcbiAgICBpZiAocmV0ID09PSBVTkRFRklORURfQklORElORykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAocmV0ID09PSB1bmRlZmluZWQgJiYgdGhpcy5faXNCb3VuZCgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3VuZFZhbHVlKCk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcHJvbWlzZUF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXNbXG4gICAgICAgICAgICBpbmRleCAqIDQgLSA0ICsgMl07XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fZnVsZmlsbG1lbnRIYW5kbGVyQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpc1tcbiAgICAgICAgICAgIGluZGV4ICogNCAtIDQgKyAwXTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZWplY3Rpb25IYW5kbGVyQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpc1tcbiAgICAgICAgICAgIGluZGV4ICogNCAtIDQgKyAxXTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9ib3VuZFZhbHVlID0gZnVuY3Rpb24oKSB7fTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX21pZ3JhdGVDYWxsYmFjazAgPSBmdW5jdGlvbiAoZm9sbG93ZXIpIHtcbiAgICB2YXIgYml0RmllbGQgPSBmb2xsb3dlci5fYml0RmllbGQ7XG4gICAgdmFyIGZ1bGZpbGwgPSBmb2xsb3dlci5fZnVsZmlsbG1lbnRIYW5kbGVyMDtcbiAgICB2YXIgcmVqZWN0ID0gZm9sbG93ZXIuX3JlamVjdGlvbkhhbmRsZXIwO1xuICAgIHZhciBwcm9taXNlID0gZm9sbG93ZXIuX3Byb21pc2UwO1xuICAgIHZhciByZWNlaXZlciA9IGZvbGxvd2VyLl9yZWNlaXZlckF0KDApO1xuICAgIGlmIChyZWNlaXZlciA9PT0gdW5kZWZpbmVkKSByZWNlaXZlciA9IFVOREVGSU5FRF9CSU5ESU5HO1xuICAgIHRoaXMuX2FkZENhbGxiYWNrcyhmdWxmaWxsLCByZWplY3QsIHByb21pc2UsIHJlY2VpdmVyLCBudWxsKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9taWdyYXRlQ2FsbGJhY2tBdCA9IGZ1bmN0aW9uIChmb2xsb3dlciwgaW5kZXgpIHtcbiAgICB2YXIgZnVsZmlsbCA9IGZvbGxvd2VyLl9mdWxmaWxsbWVudEhhbmRsZXJBdChpbmRleCk7XG4gICAgdmFyIHJlamVjdCA9IGZvbGxvd2VyLl9yZWplY3Rpb25IYW5kbGVyQXQoaW5kZXgpO1xuICAgIHZhciBwcm9taXNlID0gZm9sbG93ZXIuX3Byb21pc2VBdChpbmRleCk7XG4gICAgdmFyIHJlY2VpdmVyID0gZm9sbG93ZXIuX3JlY2VpdmVyQXQoaW5kZXgpO1xuICAgIGlmIChyZWNlaXZlciA9PT0gdW5kZWZpbmVkKSByZWNlaXZlciA9IFVOREVGSU5FRF9CSU5ESU5HO1xuICAgIHRoaXMuX2FkZENhbGxiYWNrcyhmdWxmaWxsLCByZWplY3QsIHByb21pc2UsIHJlY2VpdmVyLCBudWxsKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9hZGRDYWxsYmFja3MgPSBmdW5jdGlvbiAoXG4gICAgZnVsZmlsbCxcbiAgICByZWplY3QsXG4gICAgcHJvbWlzZSxcbiAgICByZWNlaXZlcixcbiAgICBkb21haW5cbikge1xuICAgIHZhciBpbmRleCA9IHRoaXMuX2xlbmd0aCgpO1xuXG4gICAgaWYgKGluZGV4ID49IDY1NTM1IC0gNCkge1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX3NldExlbmd0aCgwKTtcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgdGhpcy5fcHJvbWlzZTAgPSBwcm9taXNlO1xuICAgICAgICB0aGlzLl9yZWNlaXZlcjAgPSByZWNlaXZlcjtcbiAgICAgICAgaWYgKHR5cGVvZiBmdWxmaWxsID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcjAgPVxuICAgICAgICAgICAgICAgIGRvbWFpbiA9PT0gbnVsbCA/IGZ1bGZpbGwgOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBmdWxmaWxsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJlamVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWplY3Rpb25IYW5kbGVyMCA9XG4gICAgICAgICAgICAgICAgZG9tYWluID09PSBudWxsID8gcmVqZWN0IDogdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBiYXNlID0gaW5kZXggKiA0IC0gNDtcbiAgICAgICAgdGhpc1tiYXNlICsgMl0gPSBwcm9taXNlO1xuICAgICAgICB0aGlzW2Jhc2UgKyAzXSA9IHJlY2VpdmVyO1xuICAgICAgICBpZiAodHlwZW9mIGZ1bGZpbGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpc1tiYXNlICsgMF0gPVxuICAgICAgICAgICAgICAgIGRvbWFpbiA9PT0gbnVsbCA/IGZ1bGZpbGwgOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBmdWxmaWxsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJlamVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzW2Jhc2UgKyAxXSA9XG4gICAgICAgICAgICAgICAgZG9tYWluID09PSBudWxsID8gcmVqZWN0IDogdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9zZXRMZW5ndGgoaW5kZXggKyAxKTtcbiAgICByZXR1cm4gaW5kZXg7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcHJveHkgPSBmdW5jdGlvbiAocHJveHlhYmxlLCBhcmcpIHtcbiAgICB0aGlzLl9hZGRDYWxsYmFja3ModW5kZWZpbmVkLCB1bmRlZmluZWQsIGFyZywgcHJveHlhYmxlLCBudWxsKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZXNvbHZlQ2FsbGJhY2sgPSBmdW5jdGlvbih2YWx1ZSwgc2hvdWxkQmluZCkge1xuICAgIGlmICgoKHRoaXMuX2JpdEZpZWxkICYgMTE3NTA2MDQ4KSAhPT0gMCkpIHJldHVybjtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMpXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWplY3RDYWxsYmFjayhtYWtlU2VsZlJlc29sdXRpb25FcnJvcigpLCBmYWxzZSk7XG4gICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UodmFsdWUsIHRoaXMpO1xuICAgIGlmICghKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpKSByZXR1cm4gdGhpcy5fZnVsZmlsbCh2YWx1ZSk7XG5cbiAgICBpZiAoc2hvdWxkQmluZCkgdGhpcy5fcHJvcGFnYXRlRnJvbShtYXliZVByb21pc2UsIDIpO1xuXG4gICAgdmFyIHByb21pc2UgPSBtYXliZVByb21pc2UuX3RhcmdldCgpO1xuXG4gICAgaWYgKHByb21pc2UgPT09IHRoaXMpIHtcbiAgICAgICAgdGhpcy5fcmVqZWN0KG1ha2VTZWxmUmVzb2x1dGlvbkVycm9yKCkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGJpdEZpZWxkID0gcHJvbWlzZS5fYml0RmllbGQ7XG4gICAgaWYgKCgoYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XG4gICAgICAgIHZhciBsZW4gPSB0aGlzLl9sZW5ndGgoKTtcbiAgICAgICAgaWYgKGxlbiA+IDApIHByb21pc2UuX21pZ3JhdGVDYWxsYmFjazAodGhpcyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHByb21pc2UuX21pZ3JhdGVDYWxsYmFja0F0KHRoaXMsIGkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldEZvbGxvd2luZygpO1xuICAgICAgICB0aGlzLl9zZXRMZW5ndGgoMCk7XG4gICAgICAgIHRoaXMuX3NldEZvbGxvd2VlKHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcbiAgICAgICAgdGhpcy5fZnVsZmlsbChwcm9taXNlLl92YWx1ZSgpKTtcbiAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XG4gICAgICAgIHRoaXMuX3JlamVjdChwcm9taXNlLl9yZWFzb24oKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlYXNvbiA9IG5ldyBDYW5jZWxsYXRpb25FcnJvcihcImxhdGUgY2FuY2VsbGF0aW9uIG9ic2VydmVyXCIpO1xuICAgICAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHJlYXNvbik7XG4gICAgICAgIHRoaXMuX3JlamVjdChyZWFzb24pO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZWplY3RDYWxsYmFjayA9XG5mdW5jdGlvbihyZWFzb24sIHN5bmNocm9ub3VzLCBpZ25vcmVOb25FcnJvcldhcm5pbmdzKSB7XG4gICAgdmFyIHRyYWNlID0gdXRpbC5lbnN1cmVFcnJvck9iamVjdChyZWFzb24pO1xuICAgIHZhciBoYXNTdGFjayA9IHRyYWNlID09PSByZWFzb247XG4gICAgaWYgKCFoYXNTdGFjayAmJiAhaWdub3JlTm9uRXJyb3JXYXJuaW5ncyAmJiBkZWJ1Zy53YXJuaW5ncygpKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gXCJhIHByb21pc2Ugd2FzIHJlamVjdGVkIHdpdGggYSBub24tZXJyb3I6IFwiICtcbiAgICAgICAgICAgIHV0aWwuY2xhc3NTdHJpbmcocmVhc29uKTtcbiAgICAgICAgdGhpcy5fd2FybihtZXNzYWdlLCB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5fYXR0YWNoRXh0cmFUcmFjZSh0cmFjZSwgc3luY2hyb25vdXMgPyBoYXNTdGFjayA6IGZhbHNlKTtcbiAgICB0aGlzLl9yZWplY3QocmVhc29uKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZXNvbHZlRnJvbUV4ZWN1dG9yID0gZnVuY3Rpb24gKGV4ZWN1dG9yKSB7XG4gICAgaWYgKGV4ZWN1dG9yID09PSBJTlRFUk5BTCkgcmV0dXJuO1xuICAgIHZhciBwcm9taXNlID0gdGhpcztcbiAgICB0aGlzLl9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgIHRoaXMuX3B1c2hDb250ZXh0KCk7XG4gICAgdmFyIHN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICB2YXIgciA9IHRoaXMuX2V4ZWN1dGUoZXhlY3V0b3IsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHByb21pc2UuX3Jlc29sdmVDYWxsYmFjayh2YWx1ZSk7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICBwcm9taXNlLl9yZWplY3RDYWxsYmFjayhyZWFzb24sIHN5bmNocm9ub3VzKTtcbiAgICB9KTtcbiAgICBzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgIHRoaXMuX3BvcENvbnRleHQoKTtcblxuICAgIGlmIChyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2sociwgdHJ1ZSk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldHRsZVByb21pc2VGcm9tSGFuZGxlciA9IGZ1bmN0aW9uIChcbiAgICBoYW5kbGVyLCByZWNlaXZlciwgdmFsdWUsIHByb21pc2Vcbikge1xuICAgIHZhciBiaXRGaWVsZCA9IHByb21pc2UuX2JpdEZpZWxkO1xuICAgIGlmICgoKGJpdEZpZWxkICYgNjU1MzYpICE9PSAwKSkgcmV0dXJuO1xuICAgIHByb21pc2UuX3B1c2hDb250ZXh0KCk7XG4gICAgdmFyIHg7XG4gICAgaWYgKHJlY2VpdmVyID09PSBBUFBMWSkge1xuICAgICAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZS5sZW5ndGggIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHggPSBlcnJvck9iajtcbiAgICAgICAgICAgIHguZSA9IG5ldyBUeXBlRXJyb3IoXCJjYW5ub3QgLnNwcmVhZCgpIGEgbm9uLWFycmF5OiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmNsYXNzU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4ID0gdHJ5Q2F0Y2goaGFuZGxlcikuYXBwbHkodGhpcy5fYm91bmRWYWx1ZSgpLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB4ID0gdHJ5Q2F0Y2goaGFuZGxlcikuY2FsbChyZWNlaXZlciwgdmFsdWUpO1xuICAgIH1cbiAgICB2YXIgcHJvbWlzZUNyZWF0ZWQgPSBwcm9taXNlLl9wb3BDb250ZXh0KCk7XG4gICAgYml0RmllbGQgPSBwcm9taXNlLl9iaXRGaWVsZDtcbiAgICBpZiAoKChiaXRGaWVsZCAmIDY1NTM2KSAhPT0gMCkpIHJldHVybjtcblxuICAgIGlmICh4ID09PSBORVhUX0ZJTFRFUikge1xuICAgICAgICBwcm9taXNlLl9yZWplY3QodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoeCA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2soeC5lLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGVidWcuY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zKHgsIHByb21pc2VDcmVhdGVkLCBcIlwiLCAgcHJvbWlzZSwgdGhpcyk7XG4gICAgICAgIHByb21pc2UuX3Jlc29sdmVDYWxsYmFjayh4KTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fdGFyZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJldCA9IHRoaXM7XG4gICAgd2hpbGUgKHJldC5faXNGb2xsb3dpbmcoKSkgcmV0ID0gcmV0Ll9mb2xsb3dlZSgpO1xuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fZm9sbG93ZWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0Rm9sbG93ZWUgPSBmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjAgPSBwcm9taXNlO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldHRsZVByb21pc2UgPSBmdW5jdGlvbihwcm9taXNlLCBoYW5kbGVyLCByZWNlaXZlciwgdmFsdWUpIHtcbiAgICB2YXIgaXNQcm9taXNlID0gcHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2U7XG4gICAgdmFyIGJpdEZpZWxkID0gdGhpcy5fYml0RmllbGQ7XG4gICAgdmFyIGFzeW5jR3VhcmFudGVlZCA9ICgoYml0RmllbGQgJiAxMzQyMTc3MjgpICE9PSAwKTtcbiAgICBpZiAoKChiaXRGaWVsZCAmIDY1NTM2KSAhPT0gMCkpIHtcbiAgICAgICAgaWYgKGlzUHJvbWlzZSkgcHJvbWlzZS5faW52b2tlSW50ZXJuYWxPbkNhbmNlbCgpO1xuXG4gICAgICAgIGlmIChyZWNlaXZlciBpbnN0YW5jZW9mIFBhc3NUaHJvdWdoSGFuZGxlckNvbnRleHQgJiZcbiAgICAgICAgICAgIHJlY2VpdmVyLmlzRmluYWxseUhhbmRsZXIoKSkge1xuICAgICAgICAgICAgcmVjZWl2ZXIuY2FuY2VsUHJvbWlzZSA9IHByb21pc2U7XG4gICAgICAgICAgICBpZiAodHJ5Q2F0Y2goaGFuZGxlcikuY2FsbChyZWNlaXZlciwgdmFsdWUpID09PSBlcnJvck9iaikge1xuICAgICAgICAgICAgICAgIHByb21pc2UuX3JlamVjdChlcnJvck9iai5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChoYW5kbGVyID09PSByZWZsZWN0SGFuZGxlcikge1xuICAgICAgICAgICAgcHJvbWlzZS5fZnVsZmlsbChyZWZsZWN0SGFuZGxlci5jYWxsKHJlY2VpdmVyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVjZWl2ZXIgaW5zdGFuY2VvZiBQcm94eWFibGUpIHtcbiAgICAgICAgICAgIHJlY2VpdmVyLl9wcm9taXNlQ2FuY2VsbGVkKHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUHJvbWlzZSB8fCBwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZUFycmF5KSB7XG4gICAgICAgICAgICBwcm9taXNlLl9jYW5jZWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlY2VpdmVyLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGlmICghaXNQcm9taXNlKSB7XG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwocmVjZWl2ZXIsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhc3luY0d1YXJhbnRlZWQpIHByb21pc2UuX3NldEFzeW5jR3VhcmFudGVlZCgpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGxlUHJvbWlzZUZyb21IYW5kbGVyKGhhbmRsZXIsIHJlY2VpdmVyLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlY2VpdmVyIGluc3RhbmNlb2YgUHJveHlhYmxlKSB7XG4gICAgICAgIGlmICghcmVjZWl2ZXIuX2lzUmVzb2x2ZWQoKSkge1xuICAgICAgICAgICAgaWYgKCgoYml0RmllbGQgJiAzMzU1NDQzMikgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIuX3Byb21pc2VGdWxmaWxsZWQodmFsdWUsIHByb21pc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlci5fcHJvbWlzZVJlamVjdGVkKHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNQcm9taXNlKSB7XG4gICAgICAgIGlmIChhc3luY0d1YXJhbnRlZWQpIHByb21pc2UuX3NldEFzeW5jR3VhcmFudGVlZCgpO1xuICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcbiAgICAgICAgICAgIHByb21pc2UuX2Z1bGZpbGwodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXR0bGVQcm9taXNlTGF0ZUNhbmNlbGxhdGlvbk9ic2VydmVyID0gZnVuY3Rpb24oY3R4KSB7XG4gICAgdmFyIGhhbmRsZXIgPSBjdHguaGFuZGxlcjtcbiAgICB2YXIgcHJvbWlzZSA9IGN0eC5wcm9taXNlO1xuICAgIHZhciByZWNlaXZlciA9IGN0eC5yZWNlaXZlcjtcbiAgICB2YXIgdmFsdWUgPSBjdHgudmFsdWU7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgaWYgKCEocHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpKSB7XG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwocmVjZWl2ZXIsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRsZVByb21pc2VGcm9tSGFuZGxlcihoYW5kbGVyLCByZWNlaXZlciwgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlLl9yZWplY3QodmFsdWUpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXR0bGVQcm9taXNlQ3R4ID0gZnVuY3Rpb24oY3R4KSB7XG4gICAgdGhpcy5fc2V0dGxlUHJvbWlzZShjdHgucHJvbWlzZSwgY3R4LmhhbmRsZXIsIGN0eC5yZWNlaXZlciwgY3R4LnZhbHVlKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXR0bGVQcm9taXNlMCA9IGZ1bmN0aW9uKGhhbmRsZXIsIHZhbHVlLCBiaXRGaWVsZCkge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZTA7XG4gICAgdmFyIHJlY2VpdmVyID0gdGhpcy5fcmVjZWl2ZXJBdCgwKTtcbiAgICB0aGlzLl9wcm9taXNlMCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9yZWNlaXZlcjAgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fc2V0dGxlUHJvbWlzZShwcm9taXNlLCBoYW5kbGVyLCByZWNlaXZlciwgdmFsdWUpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2NsZWFyQ2FsbGJhY2tEYXRhQXRJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgdmFyIGJhc2UgPSBpbmRleCAqIDQgLSA0O1xuICAgIHRoaXNbYmFzZSArIDJdID1cbiAgICB0aGlzW2Jhc2UgKyAzXSA9XG4gICAgdGhpc1tiYXNlICsgMF0gPVxuICAgIHRoaXNbYmFzZSArIDFdID0gdW5kZWZpbmVkO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2Z1bGZpbGwgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZDtcbiAgICBpZiAoKChiaXRGaWVsZCAmIDExNzUwNjA0OCkgPj4+IDE2KSkgcmV0dXJuO1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcykge1xuICAgICAgICB2YXIgZXJyID0gbWFrZVNlbGZSZXNvbHV0aW9uRXJyb3IoKTtcbiAgICAgICAgdGhpcy5fYXR0YWNoRXh0cmFUcmFjZShlcnIpO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVqZWN0KGVycik7XG4gICAgfVxuICAgIHRoaXMuX3NldEZ1bGZpbGxlZCgpO1xuICAgIHRoaXMuX3JlamVjdGlvbkhhbmRsZXIwID0gdmFsdWU7XG5cbiAgICBpZiAoKGJpdEZpZWxkICYgNjU1MzUpID4gMCkge1xuICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDEzNDIxNzcyOCkgIT09IDApKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0bGVQcm9taXNlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXN5bmMuc2V0dGxlUHJvbWlzZXModGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHZhciBiaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkO1xuICAgIGlmICgoKGJpdEZpZWxkICYgMTE3NTA2MDQ4KSA+Pj4gMTYpKSByZXR1cm47XG4gICAgdGhpcy5fc2V0UmVqZWN0ZWQoKTtcbiAgICB0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXIwID0gcmVhc29uO1xuXG4gICAgaWYgKHRoaXMuX2lzRmluYWwoKSkge1xuICAgICAgICByZXR1cm4gYXN5bmMuZmF0YWxFcnJvcihyZWFzb24sIHV0aWwuaXNOb2RlKTtcbiAgICB9XG5cbiAgICBpZiAoKGJpdEZpZWxkICYgNjU1MzUpID4gMCkge1xuICAgICAgICBhc3luYy5zZXR0bGVQcm9taXNlcyh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9lbnN1cmVQb3NzaWJsZVJlamVjdGlvbkhhbmRsZWQoKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fZnVsZmlsbFByb21pc2VzID0gZnVuY3Rpb24gKGxlbiwgdmFsdWUpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyQXQoaSk7XG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZUF0KGkpO1xuICAgICAgICB2YXIgcmVjZWl2ZXIgPSB0aGlzLl9yZWNlaXZlckF0KGkpO1xuICAgICAgICB0aGlzLl9jbGVhckNhbGxiYWNrRGF0YUF0SW5kZXgoaSk7XG4gICAgICAgIHRoaXMuX3NldHRsZVByb21pc2UocHJvbWlzZSwgaGFuZGxlciwgcmVjZWl2ZXIsIHZhbHVlKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVqZWN0UHJvbWlzZXMgPSBmdW5jdGlvbiAobGVuLCByZWFzb24pIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5fcmVqZWN0aW9uSGFuZGxlckF0KGkpO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2VBdChpKTtcbiAgICAgICAgdmFyIHJlY2VpdmVyID0gdGhpcy5fcmVjZWl2ZXJBdChpKTtcbiAgICAgICAgdGhpcy5fY2xlYXJDYWxsYmFja0RhdGFBdEluZGV4KGkpO1xuICAgICAgICB0aGlzLl9zZXR0bGVQcm9taXNlKHByb21pc2UsIGhhbmRsZXIsIHJlY2VpdmVyLCByZWFzb24pO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXR0bGVQcm9taXNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZDtcbiAgICB2YXIgbGVuID0gKGJpdEZpZWxkICYgNjU1MzUpO1xuXG4gICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgaWYgKCgoYml0RmllbGQgJiAxNjg0Mjc1MikgIT09IDApKSB7XG4gICAgICAgICAgICB2YXIgcmVhc29uID0gdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMDtcbiAgICAgICAgICAgIHRoaXMuX3NldHRsZVByb21pc2UwKHRoaXMuX3JlamVjdGlvbkhhbmRsZXIwLCByZWFzb24sIGJpdEZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdFByb21pc2VzKGxlbiwgcmVhc29uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX3JlamVjdGlvbkhhbmRsZXIwO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGxlUHJvbWlzZTAodGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMCwgdmFsdWUsIGJpdEZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMuX2Z1bGZpbGxQcm9taXNlcyhsZW4sIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRMZW5ndGgoMCk7XG4gICAgfVxuICAgIHRoaXMuX2NsZWFyQ2FuY2VsbGF0aW9uRGF0YSgpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldHRsZWRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBiaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkO1xuICAgIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjA7XG4gICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMTY3NzcyMTYpICE9PSAwKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMDtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBkZWZlclJlc29sdmUodikge3RoaXMucHJvbWlzZS5fcmVzb2x2ZUNhbGxiYWNrKHYpO31cbmZ1bmN0aW9uIGRlZmVyUmVqZWN0KHYpIHt0aGlzLnByb21pc2UuX3JlamVjdENhbGxiYWNrKHYsIGZhbHNlKTt9XG5cblByb21pc2UuZGVmZXIgPSBQcm9taXNlLnBlbmRpbmcgPSBmdW5jdGlvbigpIHtcbiAgICBkZWJ1Zy5kZXByZWNhdGVkKFwiUHJvbWlzZS5kZWZlclwiLCBcIm5ldyBQcm9taXNlXCIpO1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHByb21pc2U6IHByb21pc2UsXG4gICAgICAgIHJlc29sdmU6IGRlZmVyUmVzb2x2ZSxcbiAgICAgICAgcmVqZWN0OiBkZWZlclJlamVjdFxuICAgIH07XG59O1xuXG51dGlsLm5vdEVudW1lcmFibGVQcm9wKFByb21pc2UsXG4gICAgICAgICAgICAgICAgICAgICAgIFwiX21ha2VTZWxmUmVzb2x1dGlvbkVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgIG1ha2VTZWxmUmVzb2x1dGlvbkVycm9yKTtcblxuX2RlcmVxXyhcIi4vbWV0aG9kXCIpKFByb21pc2UsIElOVEVSTkFMLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBhcGlSZWplY3Rpb24sXG4gICAgZGVidWcpO1xuX2RlcmVxXyhcIi4vYmluZFwiKShQcm9taXNlLCBJTlRFUk5BTCwgdHJ5Q29udmVydFRvUHJvbWlzZSwgZGVidWcpO1xuX2RlcmVxXyhcIi4vY2FuY2VsXCIpKFByb21pc2UsIFByb21pc2VBcnJheSwgYXBpUmVqZWN0aW9uLCBkZWJ1Zyk7XG5fZGVyZXFfKFwiLi9kaXJlY3RfcmVzb2x2ZVwiKShQcm9taXNlKTtcbl9kZXJlcV8oXCIuL3N5bmNocm9ub3VzX2luc3BlY3Rpb25cIikoUHJvbWlzZSk7XG5fZGVyZXFfKFwiLi9qb2luXCIpKFxuICAgIFByb21pc2UsIFByb21pc2VBcnJheSwgdHJ5Q29udmVydFRvUHJvbWlzZSwgSU5URVJOQUwsIGFzeW5jLCBnZXREb21haW4pO1xuUHJvbWlzZS5Qcm9taXNlID0gUHJvbWlzZTtcblByb21pc2UudmVyc2lvbiA9IFwiMy41LjBcIjtcbl9kZXJlcV8oJy4vbWFwLmpzJykoUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBhcGlSZWplY3Rpb24sIHRyeUNvbnZlcnRUb1Byb21pc2UsIElOVEVSTkFMLCBkZWJ1Zyk7XG5fZGVyZXFfKCcuL2NhbGxfZ2V0LmpzJykoUHJvbWlzZSk7XG5fZGVyZXFfKCcuL3VzaW5nLmpzJykoUHJvbWlzZSwgYXBpUmVqZWN0aW9uLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBjcmVhdGVDb250ZXh0LCBJTlRFUk5BTCwgZGVidWcpO1xuX2RlcmVxXygnLi90aW1lcnMuanMnKShQcm9taXNlLCBJTlRFUk5BTCwgZGVidWcpO1xuX2RlcmVxXygnLi9nZW5lcmF0b3JzLmpzJykoUHJvbWlzZSwgYXBpUmVqZWN0aW9uLCBJTlRFUk5BTCwgdHJ5Q29udmVydFRvUHJvbWlzZSwgUHJveHlhYmxlLCBkZWJ1Zyk7XG5fZGVyZXFfKCcuL25vZGVpZnkuanMnKShQcm9taXNlKTtcbl9kZXJlcV8oJy4vcHJvbWlzaWZ5LmpzJykoUHJvbWlzZSwgSU5URVJOQUwpO1xuX2RlcmVxXygnLi9wcm9wcy5qcycpKFByb21pc2UsIFByb21pc2VBcnJheSwgdHJ5Q29udmVydFRvUHJvbWlzZSwgYXBpUmVqZWN0aW9uKTtcbl9kZXJlcV8oJy4vcmFjZS5qcycpKFByb21pc2UsIElOVEVSTkFMLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBhcGlSZWplY3Rpb24pO1xuX2RlcmVxXygnLi9yZWR1Y2UuanMnKShQcm9taXNlLCBQcm9taXNlQXJyYXksIGFwaVJlamVjdGlvbiwgdHJ5Q29udmVydFRvUHJvbWlzZSwgSU5URVJOQUwsIGRlYnVnKTtcbl9kZXJlcV8oJy4vc2V0dGxlLmpzJykoUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBkZWJ1Zyk7XG5fZGVyZXFfKCcuL3NvbWUuanMnKShQcm9taXNlLCBQcm9taXNlQXJyYXksIGFwaVJlamVjdGlvbik7XG5fZGVyZXFfKCcuL2ZpbHRlci5qcycpKFByb21pc2UsIElOVEVSTkFMKTtcbl9kZXJlcV8oJy4vZWFjaC5qcycpKFByb21pc2UsIElOVEVSTkFMKTtcbl9kZXJlcV8oJy4vYW55LmpzJykoUHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB1dGlsLnRvRmFzdFByb3BlcnRpZXMoUHJvbWlzZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgdXRpbC50b0Zhc3RQcm9wZXJ0aWVzKFByb21pc2UucHJvdG90eXBlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIGZ1bmN0aW9uIGZpbGxUeXBlcyh2YWx1ZSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgdmFyIHAgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIHAuX2Z1bGZpbGxtZW50SGFuZGxlcjAgPSB2YWx1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBwLl9yZWplY3Rpb25IYW5kbGVyMCA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgcC5fcHJvbWlzZTAgPSB2YWx1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIHAuX3JlY2VpdmVyMCA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAvLyBDb21wbGV0ZSBzbGFjayB0cmFja2luZywgb3B0IG91dCBvZiBmaWVsZC10eXBlIHRyYWNraW5nIGFuZCAgICAgICAgICAgXG4gICAgLy8gc3RhYmlsaXplIG1hcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIGZpbGxUeXBlcyh7YTogMX0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBmaWxsVHlwZXMoe2I6IDJ9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgZmlsbFR5cGVzKHtjOiAzfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIGZpbGxUeXBlcygxKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBmaWxsVHlwZXMoZnVuY3Rpb24oKXt9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgZmlsbFR5cGVzKHVuZGVmaW5lZCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIGZpbGxUeXBlcyhmYWxzZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBmaWxsVHlwZXMobmV3IFByb21pc2UoSU5URVJOQUwpKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgZGVidWcuc2V0Qm91bmRzKEFzeW5jLmZpcnN0TGluZUVycm9yLCB1dGlsLmxhc3RMaW5lRXJyb3IpOyAgICAgICAgICAgICAgIFxuICAgIHJldHVybiBQcm9taXNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxufTtcblxufSx7XCIuL2FueS5qc1wiOjEsXCIuL2FzeW5jXCI6MixcIi4vYmluZFwiOjMsXCIuL2NhbGxfZ2V0LmpzXCI6NSxcIi4vY2FuY2VsXCI6NixcIi4vY2F0Y2hfZmlsdGVyXCI6NyxcIi4vY29udGV4dFwiOjgsXCIuL2RlYnVnZ2FiaWxpdHlcIjo5LFwiLi9kaXJlY3RfcmVzb2x2ZVwiOjEwLFwiLi9lYWNoLmpzXCI6MTEsXCIuL2Vycm9yc1wiOjEyLFwiLi9lczVcIjoxMyxcIi4vZmlsdGVyLmpzXCI6MTQsXCIuL2ZpbmFsbHlcIjoxNSxcIi4vZ2VuZXJhdG9ycy5qc1wiOjE2LFwiLi9qb2luXCI6MTcsXCIuL21hcC5qc1wiOjE4LFwiLi9tZXRob2RcIjoxOSxcIi4vbm9kZWJhY2tcIjoyMCxcIi4vbm9kZWlmeS5qc1wiOjIxLFwiLi9wcm9taXNlX2FycmF5XCI6MjMsXCIuL3Byb21pc2lmeS5qc1wiOjI0LFwiLi9wcm9wcy5qc1wiOjI1LFwiLi9yYWNlLmpzXCI6MjcsXCIuL3JlZHVjZS5qc1wiOjI4LFwiLi9zZXR0bGUuanNcIjozMCxcIi4vc29tZS5qc1wiOjMxLFwiLi9zeW5jaHJvbm91c19pbnNwZWN0aW9uXCI6MzIsXCIuL3RoZW5hYmxlc1wiOjMzLFwiLi90aW1lcnMuanNcIjozNCxcIi4vdXNpbmcuanNcIjozNSxcIi4vdXRpbFwiOjM2fV0sMjM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMLCB0cnlDb252ZXJ0VG9Qcm9taXNlLFxuICAgIGFwaVJlamVjdGlvbiwgUHJveHlhYmxlKSB7XG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XG52YXIgaXNBcnJheSA9IHV0aWwuaXNBcnJheTtcblxuZnVuY3Rpb24gdG9SZXNvbHV0aW9uVmFsdWUodmFsKSB7XG4gICAgc3dpdGNoKHZhbCkge1xuICAgIGNhc2UgLTI6IHJldHVybiBbXTtcbiAgICBjYXNlIC0zOiByZXR1cm4ge307XG4gICAgY2FzZSAtNjogcmV0dXJuIG5ldyBNYXAoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIFByb21pc2VBcnJheSh2YWx1ZXMpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgaWYgKHZhbHVlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcHJvbWlzZS5fcHJvcGFnYXRlRnJvbSh2YWx1ZXMsIDMpO1xuICAgIH1cbiAgICBwcm9taXNlLl9zZXRPbkNhbmNlbCh0aGlzKTtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5fbGVuZ3RoID0gMDtcbiAgICB0aGlzLl90b3RhbFJlc29sdmVkID0gMDtcbiAgICB0aGlzLl9pbml0KHVuZGVmaW5lZCwgLTIpO1xufVxudXRpbC5pbmhlcml0cyhQcm9taXNlQXJyYXksIFByb3h5YWJsZSk7XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLnByb21pc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gaW5pdChfLCByZXNvbHZlVmFsdWVJZkVtcHR5KSB7XG4gICAgdmFyIHZhbHVlcyA9IHRyeUNvbnZlcnRUb1Byb21pc2UodGhpcy5fdmFsdWVzLCB0aGlzLl9wcm9taXNlKTtcbiAgICBpZiAodmFsdWVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuX3RhcmdldCgpO1xuICAgICAgICB2YXIgYml0RmllbGQgPSB2YWx1ZXMuX2JpdEZpZWxkO1xuICAgICAgICA7XG4gICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcblxuICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UuX3NldEFzeW5jR3VhcmFudGVlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcy5fdGhlbihcbiAgICAgICAgICAgICAgICBpbml0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3JlamVjdCxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICByZXNvbHZlVmFsdWVJZkVtcHR5XG4gICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5fdmFsdWUoKTtcbiAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMTY3NzcyMTYpICE9PSAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlamVjdCh2YWx1ZXMuX3JlYXNvbigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YWx1ZXMgPSB1dGlsLmFzQXJyYXkodmFsdWVzKTtcbiAgICBpZiAodmFsdWVzID09PSBudWxsKSB7XG4gICAgICAgIHZhciBlcnIgPSBhcGlSZWplY3Rpb24oXG4gICAgICAgICAgICBcImV4cGVjdGluZyBhbiBhcnJheSBvciBhbiBpdGVyYWJsZSBvYmplY3QgYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcodmFsdWVzKSkucmVhc29uKCk7XG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3JlamVjdENhbGxiYWNrKGVyciwgZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHJlc29sdmVWYWx1ZUlmRW1wdHkgPT09IC01KSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlRW1wdHlBcnJheSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSh0b1Jlc29sdXRpb25WYWx1ZShyZXNvbHZlVmFsdWVJZkVtcHR5KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pdGVyYXRlKHZhbHVlcyk7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9pdGVyYXRlID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMuZ2V0QWN0dWFsTGVuZ3RoKHZhbHVlcy5sZW5ndGgpO1xuICAgIHRoaXMuX2xlbmd0aCA9IGxlbjtcbiAgICB0aGlzLl92YWx1ZXMgPSB0aGlzLnNob3VsZENvcHlWYWx1ZXMoKSA/IG5ldyBBcnJheShsZW4pIDogdGhpcy5fdmFsdWVzO1xuICAgIHZhciByZXN1bHQgPSB0aGlzLl9wcm9taXNlO1xuICAgIHZhciBpc1Jlc29sdmVkID0gZmFsc2U7XG4gICAgdmFyIGJpdEZpZWxkID0gbnVsbDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHZhbHVlc1tpXSwgcmVzdWx0KTtcblxuICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgbWF5YmVQcm9taXNlID0gbWF5YmVQcm9taXNlLl90YXJnZXQoKTtcbiAgICAgICAgICAgIGJpdEZpZWxkID0gbWF5YmVQcm9taXNlLl9iaXRGaWVsZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJpdEZpZWxkID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1Jlc29sdmVkKSB7XG4gICAgICAgICAgICBpZiAoYml0RmllbGQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtYXliZVByb21pc2Uuc3VwcHJlc3NVbmhhbmRsZWRSZWplY3Rpb25zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYml0RmllbGQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICgoKGJpdEZpZWxkICYgNTAzOTcxODQpID09PSAwKSkge1xuICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fcHJveHkodGhpcywgaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzW2ldID0gbWF5YmVQcm9taXNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xuICAgICAgICAgICAgICAgIGlzUmVzb2x2ZWQgPSB0aGlzLl9wcm9taXNlRnVsZmlsbGVkKG1heWJlUHJvbWlzZS5fdmFsdWUoKSwgaSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XG4gICAgICAgICAgICAgICAgaXNSZXNvbHZlZCA9IHRoaXMuX3Byb21pc2VSZWplY3RlZChtYXliZVByb21pc2UuX3JlYXNvbigpLCBpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXNSZXNvbHZlZCA9IHRoaXMuX3Byb21pc2VDYW5jZWxsZWQoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpc1Jlc29sdmVkID0gdGhpcy5fcHJvbWlzZUZ1bGZpbGxlZChtYXliZVByb21pc2UsIGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghaXNSZXNvbHZlZCkgcmVzdWx0Ll9zZXRBc3luY0d1YXJhbnRlZWQoKTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX2lzUmVzb2x2ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlcyA9PT0gbnVsbDtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZXMgPSBudWxsO1xuICAgIHRoaXMuX3Byb21pc2UuX2Z1bGZpbGwodmFsdWUpO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2lzUmVzb2x2ZWQoKSB8fCAhdGhpcy5fcHJvbWlzZS5faXNDYW5jZWxsYWJsZSgpKSByZXR1cm47XG4gICAgdGhpcy5fdmFsdWVzID0gbnVsbDtcbiAgICB0aGlzLl9wcm9taXNlLl9jYW5jZWwoKTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3JlamVjdCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICB0aGlzLl92YWx1ZXMgPSBudWxsO1xuICAgIHRoaXMuX3Byb21pc2UuX3JlamVjdENhbGxiYWNrKHJlYXNvbiwgZmFsc2UpO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUZ1bGZpbGxlZCA9IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICB0aGlzLl92YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgdmFyIHRvdGFsUmVzb2x2ZWQgPSArK3RoaXMuX3RvdGFsUmVzb2x2ZWQ7XG4gICAgaWYgKHRvdGFsUmVzb2x2ZWQgPj0gdGhpcy5fbGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fdmFsdWVzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9jYW5jZWwoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VSZWplY3RlZCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICB0aGlzLl90b3RhbFJlc29sdmVkKys7XG4gICAgdGhpcy5fcmVqZWN0KHJlYXNvbik7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpKSByZXR1cm47XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICB0aGlzLl9jYW5jZWwoKTtcbiAgICBpZiAodmFsdWVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB2YWx1ZXMuY2FuY2VsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZXNbaV0gaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzW2ldLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5zaG91bGRDb3B5VmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5nZXRBY3R1YWxMZW5ndGggPSBmdW5jdGlvbiAobGVuKSB7XG4gICAgcmV0dXJuIGxlbjtcbn07XG5cbnJldHVybiBQcm9taXNlQXJyYXk7XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMjQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMKSB7XG52YXIgVEhJUyA9IHt9O1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIG5vZGViYWNrRm9yUHJvbWlzZSA9IF9kZXJlcV8oXCIuL25vZGViYWNrXCIpO1xudmFyIHdpdGhBcHBlbmRlZCA9IHV0aWwud2l0aEFwcGVuZGVkO1xudmFyIG1heWJlV3JhcEFzRXJyb3IgPSB1dGlsLm1heWJlV3JhcEFzRXJyb3I7XG52YXIgY2FuRXZhbHVhdGUgPSB1dGlsLmNhbkV2YWx1YXRlO1xudmFyIFR5cGVFcnJvciA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKS5UeXBlRXJyb3I7XG52YXIgZGVmYXVsdFN1ZmZpeCA9IFwiQXN5bmNcIjtcbnZhciBkZWZhdWx0UHJvbWlzaWZpZWQgPSB7X19pc1Byb21pc2lmaWVkX186IHRydWV9O1xudmFyIG5vQ29weVByb3BzID0gW1xuICAgIFwiYXJpdHlcIiwgICAgXCJsZW5ndGhcIixcbiAgICBcIm5hbWVcIixcbiAgICBcImFyZ3VtZW50c1wiLFxuICAgIFwiY2FsbGVyXCIsXG4gICAgXCJjYWxsZWVcIixcbiAgICBcInByb3RvdHlwZVwiLFxuICAgIFwiX19pc1Byb21pc2lmaWVkX19cIlxuXTtcbnZhciBub0NvcHlQcm9wc1BhdHRlcm4gPSBuZXcgUmVnRXhwKFwiXig/OlwiICsgbm9Db3B5UHJvcHMuam9pbihcInxcIikgKyBcIikkXCIpO1xuXG52YXIgZGVmYXVsdEZpbHRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdXRpbC5pc0lkZW50aWZpZXIobmFtZSkgJiZcbiAgICAgICAgbmFtZS5jaGFyQXQoMCkgIT09IFwiX1wiICYmXG4gICAgICAgIG5hbWUgIT09IFwiY29uc3RydWN0b3JcIjtcbn07XG5cbmZ1bmN0aW9uIHByb3BzRmlsdGVyKGtleSkge1xuICAgIHJldHVybiAhbm9Db3B5UHJvcHNQYXR0ZXJuLnRlc3Qoa2V5KTtcbn1cblxuZnVuY3Rpb24gaXNQcm9taXNpZmllZChmbikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmbi5fX2lzUHJvbWlzaWZpZWRfXyA9PT0gdHJ1ZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFzUHJvbWlzaWZpZWQob2JqLCBrZXksIHN1ZmZpeCkge1xuICAgIHZhciB2YWwgPSB1dGlsLmdldERhdGFQcm9wZXJ0eU9yRGVmYXVsdChvYmosIGtleSArIHN1ZmZpeCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb21pc2lmaWVkKTtcbiAgICByZXR1cm4gdmFsID8gaXNQcm9taXNpZmllZCh2YWwpIDogZmFsc2U7XG59XG5mdW5jdGlvbiBjaGVja1ZhbGlkKHJldCwgc3VmZml4LCBzdWZmaXhSZWdleHApIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICB2YXIga2V5ID0gcmV0W2ldO1xuICAgICAgICBpZiAoc3VmZml4UmVnZXhwLnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgdmFyIGtleVdpdGhvdXRBc3luY1N1ZmZpeCA9IGtleS5yZXBsYWNlKHN1ZmZpeFJlZ2V4cCwgXCJcIik7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJldC5sZW5ndGg7IGogKz0gMikge1xuICAgICAgICAgICAgICAgIGlmIChyZXRbal0gPT09IGtleVdpdGhvdXRBc3luY1N1ZmZpeCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHByb21pc2lmeSBhbiBBUEkgdGhhdCBoYXMgbm9ybWFsIG1ldGhvZHMgd2l0aCAnJXMnLXN1ZmZpeFxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCIlc1wiLCBzdWZmaXgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByb21pc2lmaWFibGVNZXRob2RzKG9iaiwgc3VmZml4LCBzdWZmaXhSZWdleHAsIGZpbHRlcikge1xuICAgIHZhciBrZXlzID0gdXRpbC5pbmhlcml0ZWREYXRhS2V5cyhvYmopO1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICB2YXIgcGFzc2VzRGVmYXVsdEZpbHRlciA9IGZpbHRlciA9PT0gZGVmYXVsdEZpbHRlclxuICAgICAgICAgICAgPyB0cnVlIDogZGVmYXVsdEZpbHRlcihrZXksIHZhbHVlLCBvYmopO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgICFpc1Byb21pc2lmaWVkKHZhbHVlKSAmJlxuICAgICAgICAgICAgIWhhc1Byb21pc2lmaWVkKG9iaiwga2V5LCBzdWZmaXgpICYmXG4gICAgICAgICAgICBmaWx0ZXIoa2V5LCB2YWx1ZSwgb2JqLCBwYXNzZXNEZWZhdWx0RmlsdGVyKSkge1xuICAgICAgICAgICAgcmV0LnB1c2goa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tWYWxpZChyZXQsIHN1ZmZpeCwgc3VmZml4UmVnZXhwKTtcbiAgICByZXR1cm4gcmV0O1xufVxuXG52YXIgZXNjYXBlSWRlbnRSZWdleCA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFskXSkvLCBcIlxcXFwkXCIpO1xufTtcblxudmFyIG1ha2VOb2RlUHJvbWlzaWZpZWRFdmFsO1xuaWYgKCF0cnVlKSB7XG52YXIgc3dpdGNoQ2FzZUFyZ3VtZW50T3JkZXIgPSBmdW5jdGlvbihsaWtlbHlBcmd1bWVudENvdW50KSB7XG4gICAgdmFyIHJldCA9IFtsaWtlbHlBcmd1bWVudENvdW50XTtcbiAgICB2YXIgbWluID0gTWF0aC5tYXgoMCwgbGlrZWx5QXJndW1lbnRDb3VudCAtIDEgLSAzKTtcbiAgICBmb3IodmFyIGkgPSBsaWtlbHlBcmd1bWVudENvdW50IC0gMTsgaSA+PSBtaW47IC0taSkge1xuICAgICAgICByZXQucHVzaChpKTtcbiAgICB9XG4gICAgZm9yKHZhciBpID0gbGlrZWx5QXJndW1lbnRDb3VudCArIDE7IGkgPD0gMzsgKytpKSB7XG4gICAgICAgIHJldC5wdXNoKGkpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcblxudmFyIGFyZ3VtZW50U2VxdWVuY2UgPSBmdW5jdGlvbihhcmd1bWVudENvdW50KSB7XG4gICAgcmV0dXJuIHV0aWwuZmlsbGVkUmFuZ2UoYXJndW1lbnRDb3VudCwgXCJfYXJnXCIsIFwiXCIpO1xufTtcblxudmFyIHBhcmFtZXRlckRlY2xhcmF0aW9uID0gZnVuY3Rpb24ocGFyYW1ldGVyQ291bnQpIHtcbiAgICByZXR1cm4gdXRpbC5maWxsZWRSYW5nZShcbiAgICAgICAgTWF0aC5tYXgocGFyYW1ldGVyQ291bnQsIDMpLCBcIl9hcmdcIiwgXCJcIik7XG59O1xuXG52YXIgcGFyYW1ldGVyQ291bnQgPSBmdW5jdGlvbihmbikge1xuICAgIGlmICh0eXBlb2YgZm4ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbihmbi5sZW5ndGgsIDEwMjMgKyAxKSwgMCk7XG4gICAgfVxuICAgIHJldHVybiAwO1xufTtcblxubWFrZU5vZGVQcm9taXNpZmllZEV2YWwgPVxuZnVuY3Rpb24oY2FsbGJhY2ssIHJlY2VpdmVyLCBvcmlnaW5hbE5hbWUsIGZuLCBfLCBtdWx0aUFyZ3MpIHtcbiAgICB2YXIgbmV3UGFyYW1ldGVyQ291bnQgPSBNYXRoLm1heCgwLCBwYXJhbWV0ZXJDb3VudChmbikgLSAxKTtcbiAgICB2YXIgYXJndW1lbnRPcmRlciA9IHN3aXRjaENhc2VBcmd1bWVudE9yZGVyKG5ld1BhcmFtZXRlckNvdW50KTtcbiAgICB2YXIgc2hvdWxkUHJveHlUaGlzID0gdHlwZW9mIGNhbGxiYWNrID09PSBcInN0cmluZ1wiIHx8IHJlY2VpdmVyID09PSBUSElTO1xuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVDYWxsRm9yQXJndW1lbnRDb3VudChjb3VudCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50U2VxdWVuY2UoY291bnQpLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgdmFyIGNvbW1hID0gY291bnQgPiAwID8gXCIsIFwiIDogXCJcIjtcbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgaWYgKHNob3VsZFByb3h5VGhpcykge1xuICAgICAgICAgICAgcmV0ID0gXCJyZXQgPSBjYWxsYmFjay5jYWxsKHRoaXMsIHt7YXJnc319LCBub2RlYmFjayk7IGJyZWFrO1xcblwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0ID0gcmVjZWl2ZXIgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgID8gXCJyZXQgPSBjYWxsYmFjayh7e2FyZ3N9fSwgbm9kZWJhY2spOyBicmVhaztcXG5cIlxuICAgICAgICAgICAgICAgIDogXCJyZXQgPSBjYWxsYmFjay5jYWxsKHJlY2VpdmVyLCB7e2FyZ3N9fSwgbm9kZWJhY2spOyBicmVhaztcXG5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0LnJlcGxhY2UoXCJ7e2FyZ3N9fVwiLCBhcmdzKS5yZXBsYWNlKFwiLCBcIiwgY29tbWEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlQXJndW1lbnRTd2l0Y2hDYXNlKCkge1xuICAgICAgICB2YXIgcmV0ID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudE9yZGVyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICByZXQgKz0gXCJjYXNlIFwiICsgYXJndW1lbnRPcmRlcltpXSArXCI6XCIgK1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlQ2FsbEZvckFyZ3VtZW50Q291bnQoYXJndW1lbnRPcmRlcltpXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXQgKz0gXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgZGVmYXVsdDogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGxlbiArIDEpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHZhciBpID0gMDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGFyZ3NbaV0gPSBub2RlYmFjazsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFtDb2RlRm9yQ2FsbF0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIGJyZWFrOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgXCIucmVwbGFjZShcIltDb2RlRm9yQ2FsbF1cIiwgKHNob3VsZFByb3h5VGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwicmV0ID0gY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInJldCA9IGNhbGxiYWNrLmFwcGx5KHJlY2VpdmVyLCBhcmdzKTtcXG5cIikpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIHZhciBnZXRGdW5jdGlvbkNvZGUgPSB0eXBlb2YgY2FsbGJhY2sgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoXCJ0aGlzICE9IG51bGwgPyB0aGlzWydcIitjYWxsYmFjaytcIiddIDogZm5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImZuXCI7XG4gICAgdmFyIGJvZHkgPSBcIid1c2Ugc3RyaWN0JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICB2YXIgcmV0ID0gZnVuY3Rpb24gKFBhcmFtZXRlcnMpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgcHJvbWlzZS5fY2FwdHVyZVN0YWNrVHJhY2UoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgdmFyIG5vZGViYWNrID0gbm9kZWJhY2tGb3JQcm9taXNlKHByb21pc2UsIFwiICsgbXVsdGlBcmdzICsgXCIpOyAgIFxcblxcXG4gICAgICAgICAgICB2YXIgcmV0OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSB0cnlDYXRjaChbR2V0RnVuY3Rpb25Db2RlXSk7ICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBzd2l0Y2gobGVuKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgW0NvZGVGb3JTd2l0Y2hDYXNlXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBpZiAocmV0ID09PSBlcnJvck9iaikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2sobWF5YmVXcmFwQXNFcnJvcihyZXQuZSksIHRydWUsIHRydWUpO1xcblxcXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBpZiAoIXByb21pc2UuX2lzRmF0ZVNlYWxlZCgpKSBwcm9taXNlLl9zZXRBc3luY0d1YXJhbnRlZWQoKTsgICAgIFxcblxcXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIG5vdEVudW1lcmFibGVQcm9wKHJldCwgJ19faXNQcm9taXNpZmllZF9fJywgdHJ1ZSk7ICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIHJldHVybiByZXQ7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgXCIucmVwbGFjZShcIltDb2RlRm9yU3dpdGNoQ2FzZV1cIiwgZ2VuZXJhdGVBcmd1bWVudFN3aXRjaENhc2UoKSlcbiAgICAgICAgLnJlcGxhY2UoXCJbR2V0RnVuY3Rpb25Db2RlXVwiLCBnZXRGdW5jdGlvbkNvZGUpO1xuICAgIGJvZHkgPSBib2R5LnJlcGxhY2UoXCJQYXJhbWV0ZXJzXCIsIHBhcmFtZXRlckRlY2xhcmF0aW9uKG5ld1BhcmFtZXRlckNvdW50KSk7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcIlByb21pc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVjZWl2ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2l0aEFwcGVuZGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1heWJlV3JhcEFzRXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm9kZWJhY2tGb3JQcm9taXNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRyeUNhdGNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVycm9yT2JqXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdEVudW1lcmFibGVQcm9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIklOVEVSTkFMXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5KShcbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgZm4sXG4gICAgICAgICAgICAgICAgICAgIHJlY2VpdmVyLFxuICAgICAgICAgICAgICAgICAgICB3aXRoQXBwZW5kZWQsXG4gICAgICAgICAgICAgICAgICAgIG1heWJlV3JhcEFzRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIG5vZGViYWNrRm9yUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgdXRpbC50cnlDYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5lcnJvck9iaixcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcCxcbiAgICAgICAgICAgICAgICAgICAgSU5URVJOQUwpO1xufTtcbn1cblxuZnVuY3Rpb24gbWFrZU5vZGVQcm9taXNpZmllZENsb3N1cmUoY2FsbGJhY2ssIHJlY2VpdmVyLCBfLCBmbiwgX18sIG11bHRpQXJncykge1xuICAgIHZhciBkZWZhdWx0VGhpcyA9IChmdW5jdGlvbigpIHtyZXR1cm4gdGhpczt9KSgpO1xuICAgIHZhciBtZXRob2QgPSBjYWxsYmFjaztcbiAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjYWxsYmFjayA9IGZuO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcm9taXNpZmllZCgpIHtcbiAgICAgICAgdmFyIF9yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICBpZiAocmVjZWl2ZXIgPT09IFRISVMpIF9yZWNlaXZlciA9IHRoaXM7XG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICBwcm9taXNlLl9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgICAgICB2YXIgY2IgPSB0eXBlb2YgbWV0aG9kID09PSBcInN0cmluZ1wiICYmIHRoaXMgIT09IGRlZmF1bHRUaGlzXG4gICAgICAgICAgICA/IHRoaXNbbWV0aG9kXSA6IGNhbGxiYWNrO1xuICAgICAgICB2YXIgZm4gPSBub2RlYmFja0ZvclByb21pc2UocHJvbWlzZSwgbXVsdGlBcmdzKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNiLmFwcGx5KF9yZWNlaXZlciwgd2l0aEFwcGVuZGVkKGFyZ3VtZW50cywgZm4pKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBwcm9taXNlLl9yZWplY3RDYWxsYmFjayhtYXliZVdyYXBBc0Vycm9yKGUpLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByb21pc2UuX2lzRmF0ZVNlYWxlZCgpKSBwcm9taXNlLl9zZXRBc3luY0d1YXJhbnRlZWQoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIHV0aWwubm90RW51bWVyYWJsZVByb3AocHJvbWlzaWZpZWQsIFwiX19pc1Byb21pc2lmaWVkX19cIiwgdHJ1ZSk7XG4gICAgcmV0dXJuIHByb21pc2lmaWVkO1xufVxuXG52YXIgbWFrZU5vZGVQcm9taXNpZmllZCA9IGNhbkV2YWx1YXRlXG4gICAgPyBtYWtlTm9kZVByb21pc2lmaWVkRXZhbFxuICAgIDogbWFrZU5vZGVQcm9taXNpZmllZENsb3N1cmU7XG5cbmZ1bmN0aW9uIHByb21pc2lmeUFsbChvYmosIHN1ZmZpeCwgZmlsdGVyLCBwcm9taXNpZmllciwgbXVsdGlBcmdzKSB7XG4gICAgdmFyIHN1ZmZpeFJlZ2V4cCA9IG5ldyBSZWdFeHAoZXNjYXBlSWRlbnRSZWdleChzdWZmaXgpICsgXCIkXCIpO1xuICAgIHZhciBtZXRob2RzID1cbiAgICAgICAgcHJvbWlzaWZpYWJsZU1ldGhvZHMob2JqLCBzdWZmaXgsIHN1ZmZpeFJlZ2V4cCwgZmlsdGVyKTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBtZXRob2RzLmxlbmd0aDsgaSA8IGxlbjsgaSs9IDIpIHtcbiAgICAgICAgdmFyIGtleSA9IG1ldGhvZHNbaV07XG4gICAgICAgIHZhciBmbiA9IG1ldGhvZHNbaSsxXTtcbiAgICAgICAgdmFyIHByb21pc2lmaWVkS2V5ID0ga2V5ICsgc3VmZml4O1xuICAgICAgICBpZiAocHJvbWlzaWZpZXIgPT09IG1ha2VOb2RlUHJvbWlzaWZpZWQpIHtcbiAgICAgICAgICAgIG9ialtwcm9taXNpZmllZEtleV0gPVxuICAgICAgICAgICAgICAgIG1ha2VOb2RlUHJvbWlzaWZpZWQoa2V5LCBUSElTLCBrZXksIGZuLCBzdWZmaXgsIG11bHRpQXJncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzaWZpZWQgPSBwcm9taXNpZmllcihmbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ha2VOb2RlUHJvbWlzaWZpZWQoa2V5LCBUSElTLCBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4sIHN1ZmZpeCwgbXVsdGlBcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcChwcm9taXNpZmllZCwgXCJfX2lzUHJvbWlzaWZpZWRfX1wiLCB0cnVlKTtcbiAgICAgICAgICAgIG9ialtwcm9taXNpZmllZEtleV0gPSBwcm9taXNpZmllZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1dGlsLnRvRmFzdFByb3BlcnRpZXMob2JqKTtcbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBwcm9taXNpZnkoY2FsbGJhY2ssIHJlY2VpdmVyLCBtdWx0aUFyZ3MpIHtcbiAgICByZXR1cm4gbWFrZU5vZGVQcm9taXNpZmllZChjYWxsYmFjaywgcmVjZWl2ZXIsIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2ssIG51bGwsIG11bHRpQXJncyk7XG59XG5cblByb21pc2UucHJvbWlzaWZ5ID0gZnVuY3Rpb24gKGZuLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xuICAgIH1cbiAgICBpZiAoaXNQcm9taXNpZmllZChmbikpIHtcbiAgICAgICAgcmV0dXJuIGZuO1xuICAgIH1cbiAgICBvcHRpb25zID0gT2JqZWN0KG9wdGlvbnMpO1xuICAgIHZhciByZWNlaXZlciA9IG9wdGlvbnMuY29udGV4dCA9PT0gdW5kZWZpbmVkID8gVEhJUyA6IG9wdGlvbnMuY29udGV4dDtcbiAgICB2YXIgbXVsdGlBcmdzID0gISFvcHRpb25zLm11bHRpQXJncztcbiAgICB2YXIgcmV0ID0gcHJvbWlzaWZ5KGZuLCByZWNlaXZlciwgbXVsdGlBcmdzKTtcbiAgICB1dGlsLmNvcHlEZXNjcmlwdG9ycyhmbiwgcmV0LCBwcm9wc0ZpbHRlcik7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvbWlzaWZ5QWxsID0gZnVuY3Rpb24gKHRhcmdldCwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidGhlIHRhcmdldCBvZiBwcm9taXNpZnlBbGwgbXVzdCBiZSBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvblxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBPYmplY3Qob3B0aW9ucyk7XG4gICAgdmFyIG11bHRpQXJncyA9ICEhb3B0aW9ucy5tdWx0aUFyZ3M7XG4gICAgdmFyIHN1ZmZpeCA9IG9wdGlvbnMuc3VmZml4O1xuICAgIGlmICh0eXBlb2Ygc3VmZml4ICE9PSBcInN0cmluZ1wiKSBzdWZmaXggPSBkZWZhdWx0U3VmZml4O1xuICAgIHZhciBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICBpZiAodHlwZW9mIGZpbHRlciAhPT0gXCJmdW5jdGlvblwiKSBmaWx0ZXIgPSBkZWZhdWx0RmlsdGVyO1xuICAgIHZhciBwcm9taXNpZmllciA9IG9wdGlvbnMucHJvbWlzaWZpZXI7XG4gICAgaWYgKHR5cGVvZiBwcm9taXNpZmllciAhPT0gXCJmdW5jdGlvblwiKSBwcm9taXNpZmllciA9IG1ha2VOb2RlUHJvbWlzaWZpZWQ7XG5cbiAgICBpZiAoIXV0aWwuaXNJZGVudGlmaWVyKHN1ZmZpeCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJzdWZmaXggbXVzdCBiZSBhIHZhbGlkIGlkZW50aWZpZXJcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gdXRpbC5pbmhlcml0ZWREYXRhS2V5cyh0YXJnZXQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0YXJnZXRba2V5c1tpXV07XG4gICAgICAgIGlmIChrZXlzW2ldICE9PSBcImNvbnN0cnVjdG9yXCIgJiZcbiAgICAgICAgICAgIHV0aWwuaXNDbGFzcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHByb21pc2lmeUFsbCh2YWx1ZS5wcm90b3R5cGUsIHN1ZmZpeCwgZmlsdGVyLCBwcm9taXNpZmllcixcbiAgICAgICAgICAgICAgICBtdWx0aUFyZ3MpO1xuICAgICAgICAgICAgcHJvbWlzaWZ5QWxsKHZhbHVlLCBzdWZmaXgsIGZpbHRlciwgcHJvbWlzaWZpZXIsIG11bHRpQXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzaWZ5QWxsKHRhcmdldCwgc3VmZml4LCBmaWx0ZXIsIHByb21pc2lmaWVyLCBtdWx0aUFyZ3MpO1xufTtcbn07XG5cblxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi9ub2RlYmFja1wiOjIwLFwiLi91dGlsXCI6MzZ9XSwyNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oXG4gICAgUHJvbWlzZSwgUHJvbWlzZUFycmF5LCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBhcGlSZWplY3Rpb24pIHtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciBpc09iamVjdCA9IHV0aWwuaXNPYmplY3Q7XG52YXIgZXM1ID0gX2RlcmVxXyhcIi4vZXM1XCIpO1xudmFyIEVzNk1hcDtcbmlmICh0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIpIEVzNk1hcCA9IE1hcDtcblxudmFyIG1hcFRvRW50cmllcyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzaXplID0gMDtcblxuICAgIGZ1bmN0aW9uIGV4dHJhY3RFbnRyeSh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHRoaXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIHRoaXNbaW5kZXggKyBzaXplXSA9IGtleTtcbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbWFwVG9FbnRyaWVzKG1hcCkge1xuICAgICAgICBzaXplID0gbWFwLnNpemU7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgdmFyIHJldCA9IG5ldyBBcnJheShtYXAuc2l6ZSAqIDIpO1xuICAgICAgICBtYXAuZm9yRWFjaChleHRyYWN0RW50cnksIHJldCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbn0pKCk7XG5cbnZhciBlbnRyaWVzVG9NYXAgPSBmdW5jdGlvbihlbnRyaWVzKSB7XG4gICAgdmFyIHJldCA9IG5ldyBFczZNYXAoKTtcbiAgICB2YXIgbGVuZ3RoID0gZW50cmllcy5sZW5ndGggLyAyIHwgMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBlbnRyaWVzW2xlbmd0aCArIGldO1xuICAgICAgICB2YXIgdmFsdWUgPSBlbnRyaWVzW2ldO1xuICAgICAgICByZXQuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcblxuZnVuY3Rpb24gUHJvcGVydGllc1Byb21pc2VBcnJheShvYmopIHtcbiAgICB2YXIgaXNNYXAgPSBmYWxzZTtcbiAgICB2YXIgZW50cmllcztcbiAgICBpZiAoRXM2TWFwICE9PSB1bmRlZmluZWQgJiYgb2JqIGluc3RhbmNlb2YgRXM2TWFwKSB7XG4gICAgICAgIGVudHJpZXMgPSBtYXBUb0VudHJpZXMob2JqKTtcbiAgICAgICAgaXNNYXAgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gZXM1LmtleXMob2JqKTtcbiAgICAgICAgdmFyIGxlbiA9IGtleXMubGVuZ3RoO1xuICAgICAgICBlbnRyaWVzID0gbmV3IEFycmF5KGxlbiAqIDIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgIGVudHJpZXNbaV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGVudHJpZXNbaSArIGxlbl0gPSBrZXk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb25zdHJ1Y3RvciQoZW50cmllcyk7XG4gICAgdGhpcy5faXNNYXAgPSBpc01hcDtcbiAgICB0aGlzLl9pbml0JCh1bmRlZmluZWQsIGlzTWFwID8gLTYgOiAtMyk7XG59XG51dGlsLmluaGVyaXRzKFByb3BlcnRpZXNQcm9taXNlQXJyYXksIFByb21pc2VBcnJheSk7XG5cblByb3BlcnRpZXNQcm9taXNlQXJyYXkucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge307XG5cblByb3BlcnRpZXNQcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlRnVsZmlsbGVkID0gZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xuICAgIHRoaXMuX3ZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICB2YXIgdG90YWxSZXNvbHZlZCA9ICsrdGhpcy5fdG90YWxSZXNvbHZlZDtcbiAgICBpZiAodG90YWxSZXNvbHZlZCA+PSB0aGlzLl9sZW5ndGgpIHtcbiAgICAgICAgdmFyIHZhbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzTWFwKSB7XG4gICAgICAgICAgICB2YWwgPSBlbnRyaWVzVG9NYXAodGhpcy5fdmFsdWVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbCA9IHt9O1xuICAgICAgICAgICAgdmFyIGtleU9mZnNldCA9IHRoaXMubGVuZ3RoKCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5sZW5ndGgoKTsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFsW3RoaXMuX3ZhbHVlc1tpICsga2V5T2Zmc2V0XV0gPSB0aGlzLl92YWx1ZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVzb2x2ZSh2YWwpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuUHJvcGVydGllc1Byb21pc2VBcnJheS5wcm90b3R5cGUuc2hvdWxkQ29weVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5Qcm9wZXJ0aWVzUHJvbWlzZUFycmF5LnByb3RvdHlwZS5nZXRBY3R1YWxMZW5ndGggPSBmdW5jdGlvbiAobGVuKSB7XG4gICAgcmV0dXJuIGxlbiA+PiAxO1xufTtcblxuZnVuY3Rpb24gcHJvcHMocHJvbWlzZXMpIHtcbiAgICB2YXIgcmV0O1xuICAgIHZhciBjYXN0VmFsdWUgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHByb21pc2VzKTtcblxuICAgIGlmICghaXNPYmplY3QoY2FzdFZhbHVlKSkge1xuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiY2Fubm90IGF3YWl0IHByb3BlcnRpZXMgb2YgYSBub24tb2JqZWN0XFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbiAgICB9IGVsc2UgaWYgKGNhc3RWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcmV0ID0gY2FzdFZhbHVlLl90aGVuKFxuICAgICAgICAgICAgUHJvbWlzZS5wcm9wcywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSBuZXcgUHJvcGVydGllc1Byb21pc2VBcnJheShjYXN0VmFsdWUpLnByb21pc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoY2FzdFZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICByZXQuX3Byb3BhZ2F0ZUZyb20oY2FzdFZhbHVlLCAyKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUucHJvcHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb3BzKHRoaXMpO1xufTtcblxuUHJvbWlzZS5wcm9wcyA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xuICAgIHJldHVybiBwcm9wcyhwcm9taXNlcyk7XG59O1xufTtcblxufSx7XCIuL2VzNVwiOjEzLFwiLi91dGlsXCI6MzZ9XSwyNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGFycmF5TW92ZShzcmMsIHNyY0luZGV4LCBkc3QsIGRzdEluZGV4LCBsZW4pIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxlbjsgKytqKSB7XG4gICAgICAgIGRzdFtqICsgZHN0SW5kZXhdID0gc3JjW2ogKyBzcmNJbmRleF07XG4gICAgICAgIHNyY1tqICsgc3JjSW5kZXhdID0gdm9pZCAwO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gUXVldWUoY2FwYWNpdHkpIHtcbiAgICB0aGlzLl9jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgIHRoaXMuX2xlbmd0aCA9IDA7XG4gICAgdGhpcy5fZnJvbnQgPSAwO1xufVxuXG5RdWV1ZS5wcm90b3R5cGUuX3dpbGxCZU92ZXJDYXBhY2l0eSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhcGFjaXR5IDwgc2l6ZTtcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5fcHVzaE9uZSA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGgoKTtcbiAgICB0aGlzLl9jaGVja0NhcGFjaXR5KGxlbmd0aCArIDEpO1xuICAgIHZhciBpID0gKHRoaXMuX2Zyb250ICsgbGVuZ3RoKSAmICh0aGlzLl9jYXBhY2l0eSAtIDEpO1xuICAgIHRoaXNbaV0gPSBhcmc7XG4gICAgdGhpcy5fbGVuZ3RoID0gbGVuZ3RoICsgMTtcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGZuLCByZWNlaXZlciwgYXJnKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCkgKyAzO1xuICAgIGlmICh0aGlzLl93aWxsQmVPdmVyQ2FwYWNpdHkobGVuZ3RoKSkge1xuICAgICAgICB0aGlzLl9wdXNoT25lKGZuKTtcbiAgICAgICAgdGhpcy5fcHVzaE9uZShyZWNlaXZlcik7XG4gICAgICAgIHRoaXMuX3B1c2hPbmUoYXJnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgaiA9IHRoaXMuX2Zyb250ICsgbGVuZ3RoIC0gMztcbiAgICB0aGlzLl9jaGVja0NhcGFjaXR5KGxlbmd0aCk7XG4gICAgdmFyIHdyYXBNYXNrID0gdGhpcy5fY2FwYWNpdHkgLSAxO1xuICAgIHRoaXNbKGogKyAwKSAmIHdyYXBNYXNrXSA9IGZuO1xuICAgIHRoaXNbKGogKyAxKSAmIHdyYXBNYXNrXSA9IHJlY2VpdmVyO1xuICAgIHRoaXNbKGogKyAyKSAmIHdyYXBNYXNrXSA9IGFyZztcbiAgICB0aGlzLl9sZW5ndGggPSBsZW5ndGg7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuc2hpZnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZyb250ID0gdGhpcy5fZnJvbnQsXG4gICAgICAgIHJldCA9IHRoaXNbZnJvbnRdO1xuXG4gICAgdGhpc1tmcm9udF0gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZnJvbnQgPSAoZnJvbnQgKyAxKSAmICh0aGlzLl9jYXBhY2l0eSAtIDEpO1xuICAgIHRoaXMuX2xlbmd0aC0tO1xuICAgIHJldHVybiByZXQ7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuX2NoZWNrQ2FwYWNpdHkgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICAgIGlmICh0aGlzLl9jYXBhY2l0eSA8IHNpemUpIHtcbiAgICAgICAgdGhpcy5fcmVzaXplVG8odGhpcy5fY2FwYWNpdHkgPDwgMSk7XG4gICAgfVxufTtcblxuUXVldWUucHJvdG90eXBlLl9yZXNpemVUbyA9IGZ1bmN0aW9uIChjYXBhY2l0eSkge1xuICAgIHZhciBvbGRDYXBhY2l0eSA9IHRoaXMuX2NhcGFjaXR5O1xuICAgIHRoaXMuX2NhcGFjaXR5ID0gY2FwYWNpdHk7XG4gICAgdmFyIGZyb250ID0gdGhpcy5fZnJvbnQ7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMuX2xlbmd0aDtcbiAgICB2YXIgbW92ZUl0ZW1zQ291bnQgPSAoZnJvbnQgKyBsZW5ndGgpICYgKG9sZENhcGFjaXR5IC0gMSk7XG4gICAgYXJyYXlNb3ZlKHRoaXMsIDAsIHRoaXMsIG9sZENhcGFjaXR5LCBtb3ZlSXRlbXNDb3VudCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXVlO1xuXG59LHt9XSwyNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oXG4gICAgUHJvbWlzZSwgSU5URVJOQUwsIHRyeUNvbnZlcnRUb1Byb21pc2UsIGFwaVJlamVjdGlvbikge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xuXG52YXIgcmFjZUxhdGVyID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgICAgIHJldHVybiByYWNlKGFycmF5LCBwcm9taXNlKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHJhY2UocHJvbWlzZXMsIHBhcmVudCkge1xuICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHByb21pc2VzKTtcblxuICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiByYWNlTGF0ZXIobWF5YmVQcm9taXNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlcyA9IHV0aWwuYXNBcnJheShwcm9taXNlcyk7XG4gICAgICAgIGlmIChwcm9taXNlcyA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJleHBlY3RpbmcgYW4gYXJyYXkgb3IgYW4gaXRlcmFibGUgb2JqZWN0IGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKHByb21pc2VzKSk7XG4gICAgfVxuXG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0Ll9wcm9wYWdhdGVGcm9tKHBhcmVudCwgMyk7XG4gICAgfVxuICAgIHZhciBmdWxmaWxsID0gcmV0Ll9mdWxmaWxsO1xuICAgIHZhciByZWplY3QgPSByZXQuX3JlamVjdDtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcHJvbWlzZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgdmFyIHZhbCA9IHByb21pc2VzW2ldO1xuXG4gICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCAmJiAhKGkgaW4gcHJvbWlzZXMpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIFByb21pc2UuY2FzdCh2YWwpLl90aGVuKGZ1bGZpbGwsIHJlamVjdCwgdW5kZWZpbmVkLCByZXQsIG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufVxuXG5Qcm9taXNlLnJhY2UgPSBmdW5jdGlvbiAocHJvbWlzZXMpIHtcbiAgICByZXR1cm4gcmFjZShwcm9taXNlcywgdW5kZWZpbmVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnJhY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJhY2UodGhpcywgdW5kZWZpbmVkKTtcbn07XG5cbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwyODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZUFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhcGlSZWplY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyeUNvbnZlcnRUb1Byb21pc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIElOVEVSTkFMLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zykge1xudmFyIGdldERvbWFpbiA9IFByb21pc2UuX2dldERvbWFpbjtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XG5cbmZ1bmN0aW9uIFJlZHVjdGlvblByb21pc2VBcnJheShwcm9taXNlcywgZm4sIGluaXRpYWxWYWx1ZSwgX2VhY2gpIHtcbiAgICB0aGlzLmNvbnN0cnVjdG9yJChwcm9taXNlcyk7XG4gICAgdmFyIGRvbWFpbiA9IGdldERvbWFpbigpO1xuICAgIHRoaXMuX2ZuID0gZG9tYWluID09PSBudWxsID8gZm4gOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBmbik7XG4gICAgaWYgKGluaXRpYWxWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGluaXRpYWxWYWx1ZSA9IFByb21pc2UucmVzb2x2ZShpbml0aWFsVmFsdWUpO1xuICAgICAgICBpbml0aWFsVmFsdWUuX2F0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLl9pbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gICAgdGhpcy5fY3VycmVudENhbmNlbGxhYmxlID0gbnVsbDtcbiAgICBpZihfZWFjaCA9PT0gSU5URVJOQUwpIHtcbiAgICAgICAgdGhpcy5fZWFjaFZhbHVlcyA9IEFycmF5KHRoaXMuX2xlbmd0aCk7XG4gICAgfSBlbHNlIGlmIChfZWFjaCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9lYWNoVmFsdWVzID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9lYWNoVmFsdWVzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLl9wcm9taXNlLl9jYXB0dXJlU3RhY2tUcmFjZSgpO1xuICAgIHRoaXMuX2luaXQkKHVuZGVmaW5lZCwgLTUpO1xufVxudXRpbC5pbmhlcml0cyhSZWR1Y3Rpb25Qcm9taXNlQXJyYXksIFByb21pc2VBcnJheSk7XG5cblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX2dvdEFjY3VtID0gZnVuY3Rpb24oYWNjdW0pIHtcbiAgICBpZiAodGhpcy5fZWFjaFZhbHVlcyAhPT0gdW5kZWZpbmVkICYmIFxuICAgICAgICB0aGlzLl9lYWNoVmFsdWVzICE9PSBudWxsICYmIFxuICAgICAgICBhY2N1bSAhPT0gSU5URVJOQUwpIHtcbiAgICAgICAgdGhpcy5fZWFjaFZhbHVlcy5wdXNoKGFjY3VtKTtcbiAgICB9XG59O1xuXG5SZWR1Y3Rpb25Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9lYWNoQ29tcGxldGUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9lYWNoVmFsdWVzICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2VhY2hWYWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9lYWNoVmFsdWVzO1xufTtcblxuUmVkdWN0aW9uUHJvbWlzZUFycmF5LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCkge307XG5cblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc29sdmVFbXB0eUFycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcmVzb2x2ZSh0aGlzLl9lYWNoVmFsdWVzICE9PSB1bmRlZmluZWQgPyB0aGlzLl9lYWNoVmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLl9pbml0aWFsVmFsdWUpO1xufTtcblxuUmVkdWN0aW9uUHJvbWlzZUFycmF5LnByb3RvdHlwZS5zaG91bGRDb3B5VmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHRoaXMuX3Byb21pc2UuX3Jlc29sdmVDYWxsYmFjayh2YWx1ZSk7XG4gICAgdGhpcy5fdmFsdWVzID0gbnVsbDtcbn07XG5cblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc3VsdENhbmNlbGxlZCA9IGZ1bmN0aW9uKHNlbmRlcikge1xuICAgIGlmIChzZW5kZXIgPT09IHRoaXMuX2luaXRpYWxWYWx1ZSkgcmV0dXJuIHRoaXMuX2NhbmNlbCgpO1xuICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybjtcbiAgICB0aGlzLl9yZXN1bHRDYW5jZWxsZWQkKCk7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRDYW5jZWxsYWJsZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudENhbmNlbGxhYmxlLmNhbmNlbCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5faW5pdGlhbFZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB0aGlzLl9pbml0aWFsVmFsdWUuY2FuY2VsKCk7XG4gICAgfVxufTtcblxuUmVkdWN0aW9uUHJvbWlzZUFycmF5LnByb3RvdHlwZS5faXRlcmF0ZSA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdmFyIHZhbHVlO1xuICAgIHZhciBpO1xuICAgIHZhciBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoO1xuICAgIGlmICh0aGlzLl9pbml0aWFsVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuX2luaXRpYWxWYWx1ZTtcbiAgICAgICAgaSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBQcm9taXNlLnJlc29sdmUodmFsdWVzWzBdKTtcbiAgICAgICAgaSA9IDE7XG4gICAgfVxuXG4gICAgdGhpcy5fY3VycmVudENhbmNlbGxhYmxlID0gdmFsdWU7XG5cbiAgICBpZiAoIXZhbHVlLmlzUmVqZWN0ZWQoKSkge1xuICAgICAgICBmb3IgKDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0ge1xuICAgICAgICAgICAgICAgIGFjY3VtOiBudWxsLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiBsZW5ndGgsXG4gICAgICAgICAgICAgICAgYXJyYXk6IHRoaXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLl90aGVuKGdvdEFjY3VtLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY3R4LCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2VhY2hWYWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlXG4gICAgICAgICAgICAuX3RoZW4odGhpcy5fZWFjaENvbXBsZXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcywgdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgdmFsdWUuX3RoZW4oY29tcGxldGVkLCBjb21wbGV0ZWQsIHVuZGVmaW5lZCwgdmFsdWUsIHRoaXMpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gKGZuLCBpbml0aWFsVmFsdWUpIHtcbiAgICByZXR1cm4gcmVkdWNlKHRoaXMsIGZuLCBpbml0aWFsVmFsdWUsIG51bGwpO1xufTtcblxuUHJvbWlzZS5yZWR1Y2UgPSBmdW5jdGlvbiAocHJvbWlzZXMsIGZuLCBpbml0aWFsVmFsdWUsIF9lYWNoKSB7XG4gICAgcmV0dXJuIHJlZHVjZShwcm9taXNlcywgZm4sIGluaXRpYWxWYWx1ZSwgX2VhY2gpO1xufTtcblxuZnVuY3Rpb24gY29tcGxldGVkKHZhbHVlT3JSZWFzb24sIGFycmF5KSB7XG4gICAgaWYgKHRoaXMuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICBhcnJheS5fcmVzb2x2ZSh2YWx1ZU9yUmVhc29uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheS5fcmVqZWN0KHZhbHVlT3JSZWFzb24pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVkdWNlKHByb21pc2VzLCBmbiwgaW5pdGlhbFZhbHVlLCBfZWFjaCkge1xuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcbiAgICB9XG4gICAgdmFyIGFycmF5ID0gbmV3IFJlZHVjdGlvblByb21pc2VBcnJheShwcm9taXNlcywgZm4sIGluaXRpYWxWYWx1ZSwgX2VhY2gpO1xuICAgIHJldHVybiBhcnJheS5wcm9taXNlKCk7XG59XG5cbmZ1bmN0aW9uIGdvdEFjY3VtKGFjY3VtKSB7XG4gICAgdGhpcy5hY2N1bSA9IGFjY3VtO1xuICAgIHRoaXMuYXJyYXkuX2dvdEFjY3VtKGFjY3VtKTtcbiAgICB2YXIgdmFsdWUgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHRoaXMudmFsdWUsIHRoaXMuYXJyYXkuX3Byb21pc2UpO1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgdGhpcy5hcnJheS5fY3VycmVudENhbmNlbGxhYmxlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZS5fdGhlbihnb3RWYWx1ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMsIHVuZGVmaW5lZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdvdFZhbHVlLmNhbGwodGhpcywgdmFsdWUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ290VmFsdWUodmFsdWUpIHtcbiAgICB2YXIgYXJyYXkgPSB0aGlzLmFycmF5O1xuICAgIHZhciBwcm9taXNlID0gYXJyYXkuX3Byb21pc2U7XG4gICAgdmFyIGZuID0gdHJ5Q2F0Y2goYXJyYXkuX2ZuKTtcbiAgICBwcm9taXNlLl9wdXNoQ29udGV4dCgpO1xuICAgIHZhciByZXQ7XG4gICAgaWYgKGFycmF5Ll9lYWNoVmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0ID0gZm4uY2FsbChwcm9taXNlLl9ib3VuZFZhbHVlKCksIHZhbHVlLCB0aGlzLmluZGV4LCB0aGlzLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gZm4uY2FsbChwcm9taXNlLl9ib3VuZFZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY3VtLCB2YWx1ZSwgdGhpcy5pbmRleCwgdGhpcy5sZW5ndGgpO1xuICAgIH1cbiAgICBpZiAocmV0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBhcnJheS5fY3VycmVudENhbmNlbGxhYmxlID0gcmV0O1xuICAgIH1cbiAgICB2YXIgcHJvbWlzZUNyZWF0ZWQgPSBwcm9taXNlLl9wb3BDb250ZXh0KCk7XG4gICAgZGVidWcuY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zKFxuICAgICAgICByZXQsXG4gICAgICAgIHByb21pc2VDcmVhdGVkLFxuICAgICAgICBhcnJheS5fZWFjaFZhbHVlcyAhPT0gdW5kZWZpbmVkID8gXCJQcm9taXNlLmVhY2hcIiA6IFwiUHJvbWlzZS5yZWR1Y2VcIixcbiAgICAgICAgcHJvbWlzZVxuICAgICk7XG4gICAgcmV0dXJuIHJldDtcbn1cbn07XG5cbn0se1wiLi91dGlsXCI6MzZ9XSwyOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcbnZhciBzY2hlZHVsZTtcbnZhciBub0FzeW5jU2NoZWR1bGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gYXN5bmMgc2NoZWR1bGVyIGF2YWlsYWJsZVxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XG59O1xudmFyIE5hdGl2ZVByb21pc2UgPSB1dGlsLmdldE5hdGl2ZVByb21pc2UoKTtcbmlmICh1dGlsLmlzTm9kZSAmJiB0eXBlb2YgTXV0YXRpb25PYnNlcnZlciA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBHbG9iYWxTZXRJbW1lZGlhdGUgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBQcm9jZXNzTmV4dFRpY2sgPSBwcm9jZXNzLm5leHRUaWNrO1xuICAgIHNjaGVkdWxlID0gdXRpbC5pc1JlY2VudE5vZGVcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uKGZuKSB7IEdsb2JhbFNldEltbWVkaWF0ZS5jYWxsKGdsb2JhbCwgZm4pOyB9XG4gICAgICAgICAgICAgICAgOiBmdW5jdGlvbihmbikgeyBQcm9jZXNzTmV4dFRpY2suY2FsbChwcm9jZXNzLCBmbik7IH07XG59IGVsc2UgaWYgKHR5cGVvZiBOYXRpdmVQcm9taXNlID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgdHlwZW9mIE5hdGl2ZVByb21pc2UucmVzb2x2ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIG5hdGl2ZVByb21pc2UgPSBOYXRpdmVQcm9taXNlLnJlc29sdmUoKTtcbiAgICBzY2hlZHVsZSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIG5hdGl2ZVByb21pc2UudGhlbihmbik7XG4gICAgfTtcbn0gZWxzZSBpZiAoKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSBcInVuZGVmaW5lZFwiKSAmJlxuICAgICAgICAgICEodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRvciAmJlxuICAgICAgICAgICAgKHdpbmRvdy5uYXZpZ2F0b3Iuc3RhbmRhbG9uZSB8fCB3aW5kb3cuY29yZG92YSkpKSB7XG4gICAgc2NoZWR1bGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgb3B0cyA9IHthdHRyaWJ1dGVzOiB0cnVlfTtcbiAgICAgICAgdmFyIHRvZ2dsZVNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBvMiA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC50b2dnbGUoXCJmb29cIik7XG4gICAgICAgICAgICB0b2dnbGVTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIG8yLm9ic2VydmUoZGl2Miwgb3B0cyk7XG5cbiAgICAgICAgdmFyIHNjaGVkdWxlVG9nZ2xlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodG9nZ2xlU2NoZWR1bGVkKSByZXR1cm47XG4gICAgICAgICAgICB0b2dnbGVTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZGl2Mi5jbGFzc0xpc3QudG9nZ2xlKFwiZm9vXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBzY2hlZHVsZShmbikge1xuICAgICAgICAgICAgdmFyIG8gPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBvLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvLm9ic2VydmUoZGl2LCBvcHRzKTtcbiAgICAgICAgICAgIHNjaGVkdWxlVG9nZ2xlKCk7XG4gICAgICAgIH07XG4gICAgfSkoKTtcbn0gZWxzZSBpZiAodHlwZW9mIHNldEltbWVkaWF0ZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNjaGVkdWxlID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZShmbik7XG4gICAgfTtcbn0gZWxzZSBpZiAodHlwZW9mIHNldFRpbWVvdXQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzY2hlZHVsZSA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBzY2hlZHVsZSA9IG5vQXN5bmNTY2hlZHVsZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNjaGVkdWxlO1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMzA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgZnVuY3Rpb24oUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBkZWJ1Zykge1xudmFyIFByb21pc2VJbnNwZWN0aW9uID0gUHJvbWlzZS5Qcm9taXNlSW5zcGVjdGlvbjtcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcblxuZnVuY3Rpb24gU2V0dGxlZFByb21pc2VBcnJheSh2YWx1ZXMpIHtcbiAgICB0aGlzLmNvbnN0cnVjdG9yJCh2YWx1ZXMpO1xufVxudXRpbC5pbmhlcml0cyhTZXR0bGVkUHJvbWlzZUFycmF5LCBQcm9taXNlQXJyYXkpO1xuXG5TZXR0bGVkUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZVJlc29sdmVkID0gZnVuY3Rpb24gKGluZGV4LCBpbnNwZWN0aW9uKSB7XG4gICAgdGhpcy5fdmFsdWVzW2luZGV4XSA9IGluc3BlY3Rpb247XG4gICAgdmFyIHRvdGFsUmVzb2x2ZWQgPSArK3RoaXMuX3RvdGFsUmVzb2x2ZWQ7XG4gICAgaWYgKHRvdGFsUmVzb2x2ZWQgPj0gdGhpcy5fbGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fdmFsdWVzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cblNldHRsZWRQcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlRnVsZmlsbGVkID0gZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZUluc3BlY3Rpb24oKTtcbiAgICByZXQuX2JpdEZpZWxkID0gMzM1NTQ0MzI7XG4gICAgcmV0Ll9zZXR0bGVkVmFsdWVGaWVsZCA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlUmVzb2x2ZWQoaW5kZXgsIHJldCk7XG59O1xuU2V0dGxlZFByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VSZWplY3RlZCA9IGZ1bmN0aW9uIChyZWFzb24sIGluZGV4KSB7XG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlSW5zcGVjdGlvbigpO1xuICAgIHJldC5fYml0RmllbGQgPSAxNjc3NzIxNjtcbiAgICByZXQuX3NldHRsZWRWYWx1ZUZpZWxkID0gcmVhc29uO1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlUmVzb2x2ZWQoaW5kZXgsIHJldCk7XG59O1xuXG5Qcm9taXNlLnNldHRsZSA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xuICAgIGRlYnVnLmRlcHJlY2F0ZWQoXCIuc2V0dGxlKClcIiwgXCIucmVmbGVjdCgpXCIpO1xuICAgIHJldHVybiBuZXcgU2V0dGxlZFByb21pc2VBcnJheShwcm9taXNlcykucHJvbWlzZSgpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuc2V0dGxlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBQcm9taXNlLnNldHRsZSh0aGlzKTtcbn07XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMzE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9XG5mdW5jdGlvbihQcm9taXNlLCBQcm9taXNlQXJyYXksIGFwaVJlamVjdGlvbikge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIFJhbmdlRXJyb3IgPSBfZGVyZXFfKFwiLi9lcnJvcnNcIikuUmFuZ2VFcnJvcjtcbnZhciBBZ2dyZWdhdGVFcnJvciA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKS5BZ2dyZWdhdGVFcnJvcjtcbnZhciBpc0FycmF5ID0gdXRpbC5pc0FycmF5O1xudmFyIENBTkNFTExBVElPTiA9IHt9O1xuXG5cbmZ1bmN0aW9uIFNvbWVQcm9taXNlQXJyYXkodmFsdWVzKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3RvciQodmFsdWVzKTtcbiAgICB0aGlzLl9ob3dNYW55ID0gMDtcbiAgICB0aGlzLl91bndyYXAgPSBmYWxzZTtcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xufVxudXRpbC5pbmhlcml0cyhTb21lUHJvbWlzZUFycmF5LCBQcm9taXNlQXJyYXkpO1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2hvd01hbnkgPT09IDApIHtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZShbXSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faW5pdCQodW5kZWZpbmVkLCAtNSk7XG4gICAgdmFyIGlzQXJyYXlSZXNvbHZlZCA9IGlzQXJyYXkodGhpcy5fdmFsdWVzKTtcbiAgICBpZiAoIXRoaXMuX2lzUmVzb2x2ZWQoKSAmJlxuICAgICAgICBpc0FycmF5UmVzb2x2ZWQgJiZcbiAgICAgICAgdGhpcy5faG93TWFueSA+IHRoaXMuX2NhblBvc3NpYmx5RnVsZmlsbCgpKSB7XG4gICAgICAgIHRoaXMuX3JlamVjdCh0aGlzLl9nZXRSYW5nZUVycm9yKHRoaXMubGVuZ3RoKCkpKTtcbiAgICB9XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9pbml0KCk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5zZXRVbndyYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fdW53cmFwID0gdHJ1ZTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLmhvd01hbnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hvd01hbnk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5zZXRIb3dNYW55ID0gZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgdGhpcy5faG93TWFueSA9IGNvdW50O1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB0aGlzLl9hZGRGdWxmaWxsZWQodmFsdWUpO1xuICAgIGlmICh0aGlzLl9mdWxmaWxsZWQoKSA9PT0gdGhpcy5ob3dNYW55KCkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWVzLmxlbmd0aCA9IHRoaXMuaG93TWFueSgpO1xuICAgICAgICBpZiAodGhpcy5ob3dNYW55KCkgPT09IDEgJiYgdGhpcy5fdW53cmFwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlKHRoaXMuX3ZhbHVlc1swXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlKHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcblxufTtcblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlUmVqZWN0ZWQgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgdGhpcy5fYWRkUmVqZWN0ZWQocmVhc29uKTtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tPdXRjb21lKCk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUNhbmNlbGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fdmFsdWVzIGluc3RhbmNlb2YgUHJvbWlzZSB8fCB0aGlzLl92YWx1ZXMgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FuY2VsKCk7XG4gICAgfVxuICAgIHRoaXMuX2FkZFJlamVjdGVkKENBTkNFTExBVElPTik7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrT3V0Y29tZSgpO1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX2NoZWNrT3V0Y29tZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmhvd01hbnkoKSA+IHRoaXMuX2NhblBvc3NpYmx5RnVsZmlsbCgpKSB7XG4gICAgICAgIHZhciBlID0gbmV3IEFnZ3JlZ2F0ZUVycm9yKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmxlbmd0aCgpOyBpIDwgdGhpcy5fdmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVzW2ldICE9PSBDQU5DRUxMQVRJT04pIHtcbiAgICAgICAgICAgICAgICBlLnB1c2godGhpcy5fdmFsdWVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWplY3QoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX2Z1bGZpbGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxSZXNvbHZlZDtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZWplY3RlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVzLmxlbmd0aCAtIHRoaXMubGVuZ3RoKCk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fYWRkUmVqZWN0ZWQgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgdGhpcy5fdmFsdWVzLnB1c2gocmVhc29uKTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9hZGRGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZXNbdGhpcy5fdG90YWxSZXNvbHZlZCsrXSA9IHZhbHVlO1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX2NhblBvc3NpYmx5RnVsZmlsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGgoKSAtIHRoaXMuX3JlamVjdGVkKCk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fZ2V0UmFuZ2VFcnJvciA9IGZ1bmN0aW9uIChjb3VudCkge1xuICAgIHZhciBtZXNzYWdlID0gXCJJbnB1dCBhcnJheSBtdXN0IGNvbnRhaW4gYXQgbGVhc3QgXCIgK1xuICAgICAgICAgICAgdGhpcy5faG93TWFueSArIFwiIGl0ZW1zIGJ1dCBjb250YWlucyBvbmx5IFwiICsgY291bnQgKyBcIiBpdGVtc1wiO1xuICAgIHJldHVybiBuZXcgUmFuZ2VFcnJvcihtZXNzYWdlKTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZXNvbHZlRW1wdHlBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9yZWplY3QodGhpcy5fZ2V0UmFuZ2VFcnJvcigwKSk7XG59O1xuXG5mdW5jdGlvbiBzb21lKHByb21pc2VzLCBob3dNYW55KSB7XG4gICAgaWYgKChob3dNYW55IHwgMCkgIT09IGhvd01hbnkgfHwgaG93TWFueSA8IDApIHtcbiAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImV4cGVjdGluZyBhIHBvc2l0aXZlIGludGVnZXJcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xuICAgIH1cbiAgICB2YXIgcmV0ID0gbmV3IFNvbWVQcm9taXNlQXJyYXkocHJvbWlzZXMpO1xuICAgIHZhciBwcm9taXNlID0gcmV0LnByb21pc2UoKTtcbiAgICByZXQuc2V0SG93TWFueShob3dNYW55KTtcbiAgICByZXQuaW5pdCgpO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5Qcm9taXNlLnNvbWUgPSBmdW5jdGlvbiAocHJvbWlzZXMsIGhvd01hbnkpIHtcbiAgICByZXR1cm4gc29tZShwcm9taXNlcywgaG93TWFueSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5zb21lID0gZnVuY3Rpb24gKGhvd01hbnkpIHtcbiAgICByZXR1cm4gc29tZSh0aGlzLCBob3dNYW55KTtcbn07XG5cblByb21pc2UuX1NvbWVQcm9taXNlQXJyYXkgPSBTb21lUHJvbWlzZUFycmF5O1xufTtcblxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi91dGlsXCI6MzZ9XSwzMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSkge1xuZnVuY3Rpb24gUHJvbWlzZUluc3BlY3Rpb24ocHJvbWlzZSkge1xuICAgIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UuX3RhcmdldCgpO1xuICAgICAgICB0aGlzLl9iaXRGaWVsZCA9IHByb21pc2UuX2JpdEZpZWxkO1xuICAgICAgICB0aGlzLl9zZXR0bGVkVmFsdWVGaWVsZCA9IHByb21pc2UuX2lzRmF0ZVNlYWxlZCgpXG4gICAgICAgICAgICA/IHByb21pc2UuX3NldHRsZWRWYWx1ZSgpIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fYml0RmllbGQgPSAwO1xuICAgICAgICB0aGlzLl9zZXR0bGVkVmFsdWVGaWVsZCA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG5cblByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5fc2V0dGxlZFZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRsZWRWYWx1ZUZpZWxkO1xufTtcblxudmFyIHZhbHVlID0gUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5pc0Z1bGZpbGxlZCgpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjYW5ub3QgZ2V0IGZ1bGZpbGxtZW50IHZhbHVlIG9mIGEgbm9uLWZ1bGZpbGxlZCBwcm9taXNlXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NldHRsZWRWYWx1ZSgpO1xufTtcblxudmFyIHJlYXNvbiA9IFByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5lcnJvciA9XG5Qcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUucmVhc29uID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5pc1JlamVjdGVkKCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbm5vdCBnZXQgcmVqZWN0aW9uIHJlYXNvbiBvZiBhIG5vbi1yZWplY3RlZCBwcm9taXNlXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NldHRsZWRWYWx1ZSgpO1xufTtcblxudmFyIGlzRnVsZmlsbGVkID0gUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLmlzRnVsZmlsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMDtcbn07XG5cbnZhciBpc1JlamVjdGVkID0gUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMDtcbn07XG5cbnZhciBpc1BlbmRpbmcgPSBQcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUuaXNQZW5kaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDA7XG59O1xuXG52YXIgaXNSZXNvbHZlZCA9IFByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5pc1Jlc29sdmVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA1MDMzMTY0OCkgIT09IDA7XG59O1xuXG5Qcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUuaXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgODQ1NDE0NCkgIT09IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fX2lzQ2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDY1NTM2KSA9PT0gNjU1MzY7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5faXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0KCkuX19pc0NhbmNlbGxlZCgpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuaXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuX3RhcmdldCgpLl9iaXRGaWVsZCAmIDg0NTQxNDQpICE9PSAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuaXNQZW5kaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGlzUGVuZGluZy5jYWxsKHRoaXMuX3RhcmdldCgpKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gaXNSZWplY3RlZC5jYWxsKHRoaXMuX3RhcmdldCgpKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmlzRnVsZmlsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGlzRnVsZmlsbGVkLmNhbGwodGhpcy5fdGFyZ2V0KCkpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuaXNSZXNvbHZlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBpc1Jlc29sdmVkLmNhbGwodGhpcy5fdGFyZ2V0KCkpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWUuY2FsbCh0aGlzLl90YXJnZXQoKSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5yZWFzb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fdGFyZ2V0KCk7XG4gICAgdGFyZ2V0Ll91bnNldFJlamVjdGlvbklzVW5oYW5kbGVkKCk7XG4gICAgcmV0dXJuIHJlYXNvbi5jYWxsKHRhcmdldCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fdmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGxlZFZhbHVlKCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVhc29uID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fdW5zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCgpO1xuICAgIHJldHVybiB0aGlzLl9zZXR0bGVkVmFsdWUoKTtcbn07XG5cblByb21pc2UuUHJvbWlzZUluc3BlY3Rpb24gPSBQcm9taXNlSW5zcGVjdGlvbjtcbn07XG5cbn0se31dLDMzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCkge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciBpc09iamVjdCA9IHV0aWwuaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIHRyeUNvbnZlcnRUb1Byb21pc2Uob2JqLCBjb250ZXh0KSB7XG4gICAgaWYgKGlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFByb21pc2UpIHJldHVybiBvYmo7XG4gICAgICAgIHZhciB0aGVuID0gZ2V0VGhlbihvYmopO1xuICAgICAgICBpZiAodGhlbiA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0KSBjb250ZXh0Ll9wdXNoQ29udGV4dCgpO1xuICAgICAgICAgICAgdmFyIHJldCA9IFByb21pc2UucmVqZWN0KHRoZW4uZSk7XG4gICAgICAgICAgICBpZiAoY29udGV4dCkgY29udGV4dC5fcG9wQ29udGV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBpZiAoaXNBbnlCbHVlYmlyZFByb21pc2Uob2JqKSkge1xuICAgICAgICAgICAgICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgICAgICAgICAgb2JqLl90aGVuKFxuICAgICAgICAgICAgICAgICAgICByZXQuX2Z1bGZpbGwsXG4gICAgICAgICAgICAgICAgICAgIHJldC5fcmVqZWN0LFxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIHJldCxcbiAgICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkb1RoZW5hYmxlKG9iaiwgdGhlbiwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gZG9HZXRUaGVuKG9iaikge1xuICAgIHJldHVybiBvYmoudGhlbjtcbn1cblxuZnVuY3Rpb24gZ2V0VGhlbihvYmopIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZG9HZXRUaGVuKG9iaik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlcnJvck9iai5lID0gZTtcbiAgICAgICAgcmV0dXJuIGVycm9yT2JqO1xuICAgIH1cbn1cblxudmFyIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbmZ1bmN0aW9uIGlzQW55Qmx1ZWJpcmRQcm9taXNlKG9iaikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBoYXNQcm9wLmNhbGwob2JqLCBcIl9wcm9taXNlMFwiKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRvVGhlbmFibGUoeCwgdGhlbiwgY29udGV4dCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIHZhciByZXQgPSBwcm9taXNlO1xuICAgIGlmIChjb250ZXh0KSBjb250ZXh0Ll9wdXNoQ29udGV4dCgpO1xuICAgIHByb21pc2UuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgaWYgKGNvbnRleHQpIGNvbnRleHQuX3BvcENvbnRleHQoKTtcbiAgICB2YXIgc3luY2hyb25vdXMgPSB0cnVlO1xuICAgIHZhciByZXN1bHQgPSB1dGlsLnRyeUNhdGNoKHRoZW4pLmNhbGwoeCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICBzeW5jaHJvbm91cyA9IGZhbHNlO1xuXG4gICAgaWYgKHByb21pc2UgJiYgcmVzdWx0ID09PSBlcnJvck9iaikge1xuICAgICAgICBwcm9taXNlLl9yZWplY3RDYWxsYmFjayhyZXN1bHQuZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHByb21pc2UgPSBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmUodmFsdWUpIHtcbiAgICAgICAgaWYgKCFwcm9taXNlKSByZXR1cm47XG4gICAgICAgIHByb21pc2UuX3Jlc29sdmVDYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgIHByb21pc2UgPSBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlamVjdChyZWFzb24pIHtcbiAgICAgICAgaWYgKCFwcm9taXNlKSByZXR1cm47XG4gICAgICAgIHByb21pc2UuX3JlamVjdENhbGxiYWNrKHJlYXNvbiwgc3luY2hyb25vdXMsIHRydWUpO1xuICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cblxucmV0dXJuIHRyeUNvbnZlcnRUb1Byb21pc2U7XG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMzQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMLCBkZWJ1Zykge1xudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xudmFyIFRpbWVvdXRFcnJvciA9IFByb21pc2UuVGltZW91dEVycm9yO1xuXG5mdW5jdGlvbiBIYW5kbGVXcmFwcGVyKGhhbmRsZSkgIHtcbiAgICB0aGlzLmhhbmRsZSA9IGhhbmRsZTtcbn1cblxuSGFuZGxlV3JhcHBlci5wcm90b3R5cGUuX3Jlc3VsdENhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmhhbmRsZSk7XG59O1xuXG52YXIgYWZ0ZXJWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiBkZWxheSgrdGhpcykudGhlblJldHVybih2YWx1ZSk7IH07XG52YXIgZGVsYXkgPSBQcm9taXNlLmRlbGF5ID0gZnVuY3Rpb24gKG1zLCB2YWx1ZSkge1xuICAgIHZhciByZXQ7XG4gICAgdmFyIGhhbmRsZTtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXQgPSBQcm9taXNlLnJlc29sdmUodmFsdWUpXG4gICAgICAgICAgICAgICAgLl90aGVuKGFmdGVyVmFsdWUsIG51bGwsIG51bGwsIG1zLCB1bmRlZmluZWQpO1xuICAgICAgICBpZiAoZGVidWcuY2FuY2VsbGF0aW9uKCkgJiYgdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXQuX3NldE9uQ2FuY2VsKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICAgICAgaGFuZGxlID0gc2V0VGltZW91dChmdW5jdGlvbigpIHsgcmV0Ll9mdWxmaWxsKCk7IH0sICttcyk7XG4gICAgICAgIGlmIChkZWJ1Zy5jYW5jZWxsYXRpb24oKSkge1xuICAgICAgICAgICAgcmV0Ll9zZXRPbkNhbmNlbChuZXcgSGFuZGxlV3JhcHBlcihoYW5kbGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XG4gICAgfVxuICAgIHJldC5fc2V0QXN5bmNHdWFyYW50ZWVkKCk7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gKG1zKSB7XG4gICAgcmV0dXJuIGRlbGF5KG1zLCB0aGlzKTtcbn07XG5cbnZhciBhZnRlclRpbWVvdXQgPSBmdW5jdGlvbiAocHJvbWlzZSwgbWVzc2FnZSwgcGFyZW50KSB7XG4gICAgdmFyIGVycjtcbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgZXJyID0gbWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVyciA9IG5ldyBUaW1lb3V0RXJyb3IoXCJvcGVyYXRpb24gdGltZWQgb3V0XCIpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZXJyID0gbmV3IFRpbWVvdXRFcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdXRpbC5tYXJrQXNPcmlnaW5hdGluZ0Zyb21SZWplY3Rpb24oZXJyKTtcbiAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKGVycik7XG4gICAgcHJvbWlzZS5fcmVqZWN0KGVycik7XG5cbiAgICBpZiAocGFyZW50ICE9IG51bGwpIHtcbiAgICAgICAgcGFyZW50LmNhbmNlbCgpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHN1Y2Nlc3NDbGVhcih2YWx1ZSkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmhhbmRsZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBmYWlsdXJlQ2xlYXIocmVhc29uKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGFuZGxlKTtcbiAgICB0aHJvdyByZWFzb247XG59XG5cblByb21pc2UucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbiAobXMsIG1lc3NhZ2UpIHtcbiAgICBtcyA9ICttcztcbiAgICB2YXIgcmV0LCBwYXJlbnQ7XG5cbiAgICB2YXIgaGFuZGxlV3JhcHBlciA9IG5ldyBIYW5kbGVXcmFwcGVyKHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dFRpbWVvdXQoKSB7XG4gICAgICAgIGlmIChyZXQuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgICAgIGFmdGVyVGltZW91dChyZXQsIG1lc3NhZ2UsIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9LCBtcykpO1xuXG4gICAgaWYgKGRlYnVnLmNhbmNlbGxhdGlvbigpKSB7XG4gICAgICAgIHBhcmVudCA9IHRoaXMudGhlbigpO1xuICAgICAgICByZXQgPSBwYXJlbnQuX3RoZW4oc3VjY2Vzc0NsZWFyLCBmYWlsdXJlQ2xlYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCBoYW5kbGVXcmFwcGVyLCB1bmRlZmluZWQpO1xuICAgICAgICByZXQuX3NldE9uQ2FuY2VsKGhhbmRsZVdyYXBwZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IHRoaXMuX3RoZW4oc3VjY2Vzc0NsZWFyLCBmYWlsdXJlQ2xlYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCBoYW5kbGVXcmFwcGVyLCB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG59O1xuXG59O1xuXG59LHtcIi4vdXRpbFwiOjM2fV0sMzU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChQcm9taXNlLCBhcGlSZWplY3Rpb24sIHRyeUNvbnZlcnRUb1Byb21pc2UsXG4gICAgY3JlYXRlQ29udGV4dCwgSU5URVJOQUwsIGRlYnVnKSB7XG4gICAgdmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xuICAgIHZhciBUeXBlRXJyb3IgPSBfZGVyZXFfKFwiLi9lcnJvcnNcIikuVHlwZUVycm9yO1xuICAgIHZhciBpbmhlcml0cyA9IF9kZXJlcV8oXCIuL3V0aWxcIikuaW5oZXJpdHM7XG4gICAgdmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbiAgICB2YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xuICAgIHZhciBOVUxMID0ge307XG5cbiAgICBmdW5jdGlvbiB0aHJvd2VyKGUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3Rocm93IGU7fSwgMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FzdFByZXNlcnZpbmdEaXNwb3NhYmxlKHRoZW5hYmxlKSB7XG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHRoZW5hYmxlKTtcbiAgICAgICAgaWYgKG1heWJlUHJvbWlzZSAhPT0gdGhlbmFibGUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGVuYWJsZS5faXNEaXNwb3NhYmxlID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGVuYWJsZS5fZ2V0RGlzcG9zZXIgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgdGhlbmFibGUuX2lzRGlzcG9zYWJsZSgpKSB7XG4gICAgICAgICAgICBtYXliZVByb21pc2UuX3NldERpc3Bvc2FibGUodGhlbmFibGUuX2dldERpc3Bvc2VyKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXliZVByb21pc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc3Bvc2UocmVzb3VyY2VzLCBpbnNwZWN0aW9uKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIGxlbiA9IHJlc291cmNlcy5sZW5ndGg7XG4gICAgICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgIGZ1bmN0aW9uIGl0ZXJhdG9yKCkge1xuICAgICAgICAgICAgaWYgKGkgPj0gbGVuKSByZXR1cm4gcmV0Ll9mdWxmaWxsKCk7XG4gICAgICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gY2FzdFByZXNlcnZpbmdEaXNwb3NhYmxlKHJlc291cmNlc1tpKytdKTtcbiAgICAgICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlICYmXG4gICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl9pc0Rpc3Bvc2FibGUoKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX2dldERpc3Bvc2VyKCkudHJ5RGlzcG9zZShpbnNwZWN0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlcy5wcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd2VyKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF5YmVQcm9taXNlLl90aGVuKGl0ZXJhdG9yLCB0aHJvd2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZXJhdG9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlcmF0b3IoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBEaXNwb3NlcihkYXRhLCBwcm9taXNlLCBjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLl9wcm9taXNlID0gcHJvbWlzZTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuXG4gICAgRGlzcG9zZXIucHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH07XG5cbiAgICBEaXNwb3Nlci5wcm90b3R5cGUucHJvbWlzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfTtcblxuICAgIERpc3Bvc2VyLnByb3RvdHlwZS5yZXNvdXJjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvbWlzZSgpLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21pc2UoKS52YWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOVUxMO1xuICAgIH07XG5cbiAgICBEaXNwb3Nlci5wcm90b3R5cGUudHJ5RGlzcG9zZSA9IGZ1bmN0aW9uKGluc3BlY3Rpb24pIHtcbiAgICAgICAgdmFyIHJlc291cmNlID0gdGhpcy5yZXNvdXJjZSgpO1xuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIGlmIChjb250ZXh0ICE9PSB1bmRlZmluZWQpIGNvbnRleHQuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgIHZhciByZXQgPSByZXNvdXJjZSAhPT0gTlVMTFxuICAgICAgICAgICAgPyB0aGlzLmRvRGlzcG9zZShyZXNvdXJjZSwgaW5zcGVjdGlvbikgOiBudWxsO1xuICAgICAgICBpZiAoY29udGV4dCAhPT0gdW5kZWZpbmVkKSBjb250ZXh0Ll9wb3BDb250ZXh0KCk7XG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3Vuc2V0RGlzcG9zYWJsZSgpO1xuICAgICAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuXG4gICAgRGlzcG9zZXIuaXNEaXNwb3NlciA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiAoZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGQucmVzb3VyY2UgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBkLnRyeURpc3Bvc2UgPT09IFwiZnVuY3Rpb25cIik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIEZ1bmN0aW9uRGlzcG9zZXIoZm4sIHByb21pc2UsIGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RvciQoZm4sIHByb21pc2UsIGNvbnRleHQpO1xuICAgIH1cbiAgICBpbmhlcml0cyhGdW5jdGlvbkRpc3Bvc2VyLCBEaXNwb3Nlcik7XG5cbiAgICBGdW5jdGlvbkRpc3Bvc2VyLnByb3RvdHlwZS5kb0Rpc3Bvc2UgPSBmdW5jdGlvbiAocmVzb3VyY2UsIGluc3BlY3Rpb24pIHtcbiAgICAgICAgdmFyIGZuID0gdGhpcy5kYXRhKCk7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHJlc291cmNlLCByZXNvdXJjZSwgaW5zcGVjdGlvbik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1heWJlVW53cmFwRGlzcG9zZXIodmFsdWUpIHtcbiAgICAgICAgaWYgKERpc3Bvc2VyLmlzRGlzcG9zZXIodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlc1t0aGlzLmluZGV4XS5fc2V0RGlzcG9zYWJsZSh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBSZXNvdXJjZUxpc3QobGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLnByb21pc2UgPSBudWxsO1xuICAgICAgICB0aGlzW2xlbmd0aC0xXSA9IG51bGw7XG4gICAgfVxuXG4gICAgUmVzb3VyY2VMaXN0LnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBQcm9taXNlLnVzaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA8IDIpIHJldHVybiBhcGlSZWplY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcInlvdSBtdXN0IHBhc3MgYXQgbGVhc3QgMiBhcmd1bWVudHMgdG8gUHJvbWlzZS51c2luZ1wiKTtcbiAgICAgICAgdmFyIGZuID0gYXJndW1lbnRzW2xlbiAtIDFdO1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbnB1dDtcbiAgICAgICAgdmFyIHNwcmVhZEFyZ3MgPSB0cnVlO1xuICAgICAgICBpZiAobGVuID09PSAyICYmIEFycmF5LmlzQXJyYXkoYXJndW1lbnRzWzBdKSkge1xuICAgICAgICAgICAgaW5wdXQgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICBsZW4gPSBpbnB1dC5sZW5ndGg7XG4gICAgICAgICAgICBzcHJlYWRBcmdzID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnB1dCA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIGxlbi0tO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXNvdXJjZXMgPSBuZXcgUmVzb3VyY2VMaXN0KGxlbik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGlucHV0W2ldO1xuICAgICAgICAgICAgaWYgKERpc3Bvc2VyLmlzRGlzcG9zZXIocmVzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpc3Bvc2VyID0gcmVzb3VyY2U7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2UgPSByZXNvdXJjZS5wcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2UuX3NldERpc3Bvc2FibGUoZGlzcG9zZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZShyZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UgPVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl90aGVuKG1heWJlVW53cmFwRGlzcG9zZXIsIG51bGwsIG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaVxuICAgICAgICAgICAgICAgICAgICB9LCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc291cmNlc1tpXSA9IHJlc291cmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlZmxlY3RlZFJlc291cmNlcyA9IG5ldyBBcnJheShyZXNvdXJjZXMubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWZsZWN0ZWRSZXNvdXJjZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHJlZmxlY3RlZFJlc291cmNlc1tpXSA9IFByb21pc2UucmVzb2x2ZShyZXNvdXJjZXNbaV0pLnJlZmxlY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHRQcm9taXNlID0gUHJvbWlzZS5hbGwocmVmbGVjdGVkUmVzb3VyY2VzKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oaW5zcGVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluc3BlY3Rpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnNwZWN0aW9uID0gaW5zcGVjdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnNwZWN0aW9uLmlzUmVqZWN0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JPYmouZSA9IGluc3BlY3Rpb24uZXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvck9iajtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaW5zcGVjdGlvbi5pc0Z1bGZpbGxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRQcm9taXNlLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGluc3BlY3Rpb25zW2ldID0gaW5zcGVjdGlvbi52YWx1ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9taXNlLl9wdXNoQ29udGV4dCgpO1xuXG4gICAgICAgICAgICAgICAgZm4gPSB0cnlDYXRjaChmbik7XG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IHNwcmVhZEFyZ3NcbiAgICAgICAgICAgICAgICAgICAgPyBmbi5hcHBseSh1bmRlZmluZWQsIGluc3BlY3Rpb25zKSA6IGZuKGluc3BlY3Rpb25zKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZUNyZWF0ZWQgPSBwcm9taXNlLl9wb3BDb250ZXh0KCk7XG4gICAgICAgICAgICAgICAgZGVidWcuY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zKFxuICAgICAgICAgICAgICAgICAgICByZXQsIHByb21pc2VDcmVhdGVkLCBcIlByb21pc2UudXNpbmdcIiwgcHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBwcm9taXNlID0gcmVzdWx0UHJvbWlzZS5sYXN0bHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5zcGVjdGlvbiA9IG5ldyBQcm9taXNlLlByb21pc2VJbnNwZWN0aW9uKHJlc3VsdFByb21pc2UpO1xuICAgICAgICAgICAgcmV0dXJuIGRpc3Bvc2UocmVzb3VyY2VzLCBpbnNwZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc291cmNlcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICAgICAgcHJvbWlzZS5fc2V0T25DYW5jZWwocmVzb3VyY2VzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIFByb21pc2UucHJvdG90eXBlLl9zZXREaXNwb3NhYmxlID0gZnVuY3Rpb24gKGRpc3Bvc2VyKSB7XG4gICAgICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAxMzEwNzI7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VyID0gZGlzcG9zZXI7XG4gICAgfTtcblxuICAgIFByb21pc2UucHJvdG90eXBlLl9pc0Rpc3Bvc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiAxMzEwNzIpID4gMDtcbiAgICB9O1xuXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX2dldERpc3Bvc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcG9zZXI7XG4gICAgfTtcblxuICAgIFByb21pc2UucHJvdG90eXBlLl91bnNldERpc3Bvc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgJiAofjEzMTA3Mik7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VyID0gdW5kZWZpbmVkO1xuICAgIH07XG5cbiAgICBQcm9taXNlLnByb3RvdHlwZS5kaXNwb3NlciA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb25EaXNwb3NlcihmbiwgdGhpcywgY3JlYXRlQ29udGV4dCgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgfTtcblxufTtcblxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi91dGlsXCI6MzZ9XSwzNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBlczUgPSBfZGVyZXFfKFwiLi9lczVcIik7XG52YXIgY2FuRXZhbHVhdGUgPSB0eXBlb2YgbmF2aWdhdG9yID09IFwidW5kZWZpbmVkXCI7XG5cbnZhciBlcnJvck9iaiA9IHtlOiB7fX07XG52YXIgdHJ5Q2F0Y2hUYXJnZXQ7XG52YXIgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDpcbiAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDpcbiAgICB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDpcbiAgICB0aGlzICE9PSB1bmRlZmluZWQgPyB0aGlzIDogbnVsbDtcblxuZnVuY3Rpb24gdHJ5Q2F0Y2hlcigpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdHJ5Q2F0Y2hUYXJnZXQ7XG4gICAgICAgIHRyeUNhdGNoVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyb3JPYmouZSA9IGU7XG4gICAgICAgIHJldHVybiBlcnJvck9iajtcbiAgICB9XG59XG5mdW5jdGlvbiB0cnlDYXRjaChmbikge1xuICAgIHRyeUNhdGNoVGFyZ2V0ID0gZm47XG4gICAgcmV0dXJuIHRyeUNhdGNoZXI7XG59XG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uKENoaWxkLCBQYXJlbnQpIHtcbiAgICB2YXIgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gICAgZnVuY3Rpb24gVCgpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RvciA9IENoaWxkO1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yJCA9IFBhcmVudDtcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIFBhcmVudC5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgIGlmIChoYXNQcm9wLmNhbGwoUGFyZW50LnByb3RvdHlwZSwgcHJvcGVydHlOYW1lKSAmJlxuICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZS5jaGFyQXQocHJvcGVydHlOYW1lLmxlbmd0aC0xKSAhPT0gXCIkXCJcbiAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWUgKyBcIiRcIl0gPSBQYXJlbnQucHJvdG90eXBlW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgVC5wcm90b3R5cGUgPSBQYXJlbnQucHJvdG90eXBlO1xuICAgIENoaWxkLnByb3RvdHlwZSA9IG5ldyBUKCk7XG4gICAgcmV0dXJuIENoaWxkLnByb3RvdHlwZTtcbn07XG5cblxuZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsKSB7XG4gICAgcmV0dXJuIHZhbCA9PSBudWxsIHx8IHZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09IGZhbHNlIHx8XG4gICAgICAgIHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIjtcblxufVxuXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIG1heWJlV3JhcEFzRXJyb3IobWF5YmVFcnJvcikge1xuICAgIGlmICghaXNQcmltaXRpdmUobWF5YmVFcnJvcikpIHJldHVybiBtYXliZUVycm9yO1xuXG4gICAgcmV0dXJuIG5ldyBFcnJvcihzYWZlVG9TdHJpbmcobWF5YmVFcnJvcikpO1xufVxuXG5mdW5jdGlvbiB3aXRoQXBwZW5kZWQodGFyZ2V0LCBhcHBlbmRlZSkge1xuICAgIHZhciBsZW4gPSB0YXJnZXQubGVuZ3RoO1xuICAgIHZhciByZXQgPSBuZXcgQXJyYXkobGVuICsgMSk7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHJldFtpXSA9IHRhcmdldFtpXTtcbiAgICB9XG4gICAgcmV0W2ldID0gYXBwZW5kZWU7XG4gICAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gZ2V0RGF0YVByb3BlcnR5T3JEZWZhdWx0KG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZiAoZXM1LmlzRVM1KSB7XG4gICAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG5cbiAgICAgICAgaWYgKGRlc2MgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlc2MuZ2V0ID09IG51bGwgJiYgZGVzYy5zZXQgPT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICA/IGRlc2MudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge30uaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgPyBvYmpba2V5XSA6IHVuZGVmaW5lZDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vdEVudW1lcmFibGVQcm9wKG9iaiwgbmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoaXNQcmltaXRpdmUob2JqKSkgcmV0dXJuIG9iajtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH07XG4gICAgZXM1LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gdGhyb3dlcihyKSB7XG4gICAgdGhyb3cgcjtcbn1cblxudmFyIGluaGVyaXRlZERhdGFLZXlzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBleGNsdWRlZFByb3RvdHlwZXMgPSBbXG4gICAgICAgIEFycmF5LnByb3RvdHlwZSxcbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZSxcbiAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlXG4gICAgXTtcblxuICAgIHZhciBpc0V4Y2x1ZGVkUHJvdG8gPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleGNsdWRlZFByb3RvdHlwZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChleGNsdWRlZFByb3RvdHlwZXNbaV0gPT09IHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgaWYgKGVzNS5pc0VTNSkge1xuICAgICAgICB2YXIgZ2V0S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gW107XG4gICAgICAgICAgICB2YXIgdmlzaXRlZEtleXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgICAgd2hpbGUgKG9iaiAhPSBudWxsICYmICFpc0V4Y2x1ZGVkUHJvdG8ob2JqKSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXlzO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMgPSBnZXRLZXlzKG9iaik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdGVkS2V5c1trZXldKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgdmlzaXRlZEtleXNba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXNjICE9IG51bGwgJiYgZGVzYy5nZXQgPT0gbnVsbCAmJiBkZXNjLnNldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iaiA9IGVzNS5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICBpZiAoaXNFeGNsdWRlZFByb3RvKG9iaikpIHJldHVybiBbXTtcbiAgICAgICAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgICAgICAgLypqc2hpbnQgZm9yaW46ZmFsc2UgKi9cbiAgICAgICAgICAgIGVudW1lcmF0aW9uOiBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc1Byb3AuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0LnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4Y2x1ZGVkUHJvdG90eXBlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1Byb3AuY2FsbChleGNsdWRlZFByb3RvdHlwZXNbaV0sIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBlbnVtZXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH07XG4gICAgfVxuXG59KSgpO1xuXG52YXIgdGhpc0Fzc2lnbm1lbnRQYXR0ZXJuID0gL3RoaXNcXHMqXFwuXFxzKlxcUytcXHMqPS87XG5mdW5jdGlvbiBpc0NsYXNzKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB2YXIga2V5cyA9IGVzNS5uYW1lcyhmbi5wcm90b3R5cGUpO1xuXG4gICAgICAgICAgICB2YXIgaGFzTWV0aG9kcyA9IGVzNS5pc0VTNSAmJiBrZXlzLmxlbmd0aCA+IDE7XG4gICAgICAgICAgICB2YXIgaGFzTWV0aG9kc090aGVyVGhhbkNvbnN0cnVjdG9yID0ga2V5cy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgIShrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSBcImNvbnN0cnVjdG9yXCIpO1xuICAgICAgICAgICAgdmFyIGhhc1RoaXNBc3NpZ25tZW50QW5kU3RhdGljTWV0aG9kcyA9XG4gICAgICAgICAgICAgICAgdGhpc0Fzc2lnbm1lbnRQYXR0ZXJuLnRlc3QoZm4gKyBcIlwiKSAmJiBlczUubmFtZXMoZm4pLmxlbmd0aCA+IDA7XG5cbiAgICAgICAgICAgIGlmIChoYXNNZXRob2RzIHx8IGhhc01ldGhvZHNPdGhlclRoYW5Db25zdHJ1Y3RvciB8fFxuICAgICAgICAgICAgICAgIGhhc1RoaXNBc3NpZ25tZW50QW5kU3RhdGljTWV0aG9kcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRvRmFzdFByb3BlcnRpZXMob2JqKSB7XG4gICAgLypqc2hpbnQgLVcwMjcsLVcwNTUsLVcwMzEqL1xuICAgIGZ1bmN0aW9uIEZha2VDb25zdHJ1Y3RvcigpIHt9XG4gICAgRmFrZUNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IG9iajtcbiAgICB2YXIgbCA9IDg7XG4gICAgd2hpbGUgKGwtLSkgbmV3IEZha2VDb25zdHJ1Y3RvcigpO1xuICAgIHJldHVybiBvYmo7XG4gICAgZXZhbChvYmopO1xufVxuXG52YXIgcmlkZW50ID0gL15bYS16JF9dW2EteiRfMC05XSokL2k7XG5mdW5jdGlvbiBpc0lkZW50aWZpZXIoc3RyKSB7XG4gICAgcmV0dXJuIHJpZGVudC50ZXN0KHN0cik7XG59XG5cbmZ1bmN0aW9uIGZpbGxlZFJhbmdlKGNvdW50LCBwcmVmaXgsIHN1ZmZpeCkge1xuICAgIHZhciByZXQgPSBuZXcgQXJyYXkoY291bnQpO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjb3VudDsgKytpKSB7XG4gICAgICAgIHJldFtpXSA9IHByZWZpeCArIGkgKyBzdWZmaXg7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHNhZmVUb1N0cmluZyhvYmopIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gb2JqICsgXCJcIjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBcIltubyBzdHJpbmcgcmVwcmVzZW50YXRpb25dXCI7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0Vycm9yKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IG51bGwgJiZcbiAgICAgICAgICAgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICB0eXBlb2Ygb2JqLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgdHlwZW9mIG9iai5uYW1lID09PSBcInN0cmluZ1wiO1xufVxuXG5mdW5jdGlvbiBtYXJrQXNPcmlnaW5hdGluZ0Zyb21SZWplY3Rpb24oZSkge1xuICAgIHRyeSB7XG4gICAgICAgIG5vdEVudW1lcmFibGVQcm9wKGUsIFwiaXNPcGVyYXRpb25hbFwiLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2goaWdub3JlKSB7fVxufVxuXG5mdW5jdGlvbiBvcmlnaW5hdGVzRnJvbVJlamVjdGlvbihlKSB7XG4gICAgaWYgKGUgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAoKGUgaW5zdGFuY2VvZiBFcnJvcltcIl9fQmx1ZWJpcmRFcnJvclR5cGVzX19cIl0uT3BlcmF0aW9uYWxFcnJvcikgfHxcbiAgICAgICAgZVtcImlzT3BlcmF0aW9uYWxcIl0gPT09IHRydWUpO1xufVxuXG5mdW5jdGlvbiBjYW5BdHRhY2hUcmFjZShvYmopIHtcbiAgICByZXR1cm4gaXNFcnJvcihvYmopICYmIGVzNS5wcm9wZXJ0eUlzV3JpdGFibGUob2JqLCBcInN0YWNrXCIpO1xufVxuXG52YXIgZW5zdXJlRXJyb3JPYmplY3QgPSAoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCEoXCJzdGFja1wiIGluIG5ldyBFcnJvcigpKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChjYW5BdHRhY2hUcmFjZSh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIHRyeSB7dGhyb3cgbmV3IEVycm9yKHNhZmVUb1N0cmluZyh2YWx1ZSkpO31cbiAgICAgICAgICAgIGNhdGNoKGVycikge3JldHVybiBlcnI7fVxuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGNhbkF0dGFjaFRyYWNlKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihzYWZlVG9TdHJpbmcodmFsdWUpKTtcbiAgICAgICAgfTtcbiAgICB9XG59KSgpO1xuXG5mdW5jdGlvbiBjbGFzc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4ge30udG9TdHJpbmcuY2FsbChvYmopO1xufVxuXG5mdW5jdGlvbiBjb3B5RGVzY3JpcHRvcnMoZnJvbSwgdG8sIGZpbHRlcikge1xuICAgIHZhciBrZXlzID0gZXM1Lm5hbWVzKGZyb20pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgaWYgKGZpbHRlcihrZXkpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGVzNS5kZWZpbmVQcm9wZXJ0eSh0bywga2V5LCBlczUuZ2V0RGVzY3JpcHRvcihmcm9tLCBrZXkpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIGFzQXJyYXkgPSBmdW5jdGlvbih2KSB7XG4gICAgaWYgKGVzNS5pc0FycmF5KHYpKSB7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbmlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIFN5bWJvbC5pdGVyYXRvcikge1xuICAgIHZhciBBcnJheUZyb20gPSB0eXBlb2YgQXJyYXkuZnJvbSA9PT0gXCJmdW5jdGlvblwiID8gZnVuY3Rpb24odikge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh2KTtcbiAgICB9IDogZnVuY3Rpb24odikge1xuICAgICAgICB2YXIgcmV0ID0gW107XG4gICAgICAgIHZhciBpdCA9IHZbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgICAgICB2YXIgaXRSZXN1bHQ7XG4gICAgICAgIHdoaWxlICghKChpdFJlc3VsdCA9IGl0Lm5leHQoKSkuZG9uZSkpIHtcbiAgICAgICAgICAgIHJldC5wdXNoKGl0UmVzdWx0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cbiAgICBhc0FycmF5ID0gZnVuY3Rpb24odikge1xuICAgICAgICBpZiAoZXM1LmlzQXJyYXkodikpIHtcbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9IGVsc2UgaWYgKHYgIT0gbnVsbCAmJiB0eXBlb2YgdltTeW1ib2wuaXRlcmF0b3JdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheUZyb20odik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbn1cblxudmFyIGlzTm9kZSA9IHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIGNsYXNzU3RyaW5nKHByb2Nlc3MpLnRvTG93ZXJDYXNlKCkgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiO1xuXG52YXIgaGFzRW52VmFyaWFibGVzID0gdHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICB0eXBlb2YgcHJvY2Vzcy5lbnYgIT09IFwidW5kZWZpbmVkXCI7XG5cbmZ1bmN0aW9uIGVudihrZXkpIHtcbiAgICByZXR1cm4gaGFzRW52VmFyaWFibGVzID8gcHJvY2Vzcy5lbnZba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0TmF0aXZlUHJvbWlzZSgpIHtcbiAgICBpZiAodHlwZW9mIFByb21pc2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbigpe30pO1xuICAgICAgICAgICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwocHJvbWlzZSkgPT09IFwiW29iamVjdCBQcm9taXNlXVwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkb21haW5CaW5kKHNlbGYsIGNiKSB7XG4gICAgcmV0dXJuIHNlbGYuYmluZChjYik7XG59XG5cbnZhciByZXQgPSB7XG4gICAgaXNDbGFzczogaXNDbGFzcyxcbiAgICBpc0lkZW50aWZpZXI6IGlzSWRlbnRpZmllcixcbiAgICBpbmhlcml0ZWREYXRhS2V5czogaW5oZXJpdGVkRGF0YUtleXMsXG4gICAgZ2V0RGF0YVByb3BlcnR5T3JEZWZhdWx0OiBnZXREYXRhUHJvcGVydHlPckRlZmF1bHQsXG4gICAgdGhyb3dlcjogdGhyb3dlcixcbiAgICBpc0FycmF5OiBlczUuaXNBcnJheSxcbiAgICBhc0FycmF5OiBhc0FycmF5LFxuICAgIG5vdEVudW1lcmFibGVQcm9wOiBub3RFbnVtZXJhYmxlUHJvcCxcbiAgICBpc1ByaW1pdGl2ZTogaXNQcmltaXRpdmUsXG4gICAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICAgIGlzRXJyb3I6IGlzRXJyb3IsXG4gICAgY2FuRXZhbHVhdGU6IGNhbkV2YWx1YXRlLFxuICAgIGVycm9yT2JqOiBlcnJvck9iaixcbiAgICB0cnlDYXRjaDogdHJ5Q2F0Y2gsXG4gICAgaW5oZXJpdHM6IGluaGVyaXRzLFxuICAgIHdpdGhBcHBlbmRlZDogd2l0aEFwcGVuZGVkLFxuICAgIG1heWJlV3JhcEFzRXJyb3I6IG1heWJlV3JhcEFzRXJyb3IsXG4gICAgdG9GYXN0UHJvcGVydGllczogdG9GYXN0UHJvcGVydGllcyxcbiAgICBmaWxsZWRSYW5nZTogZmlsbGVkUmFuZ2UsXG4gICAgdG9TdHJpbmc6IHNhZmVUb1N0cmluZyxcbiAgICBjYW5BdHRhY2hUcmFjZTogY2FuQXR0YWNoVHJhY2UsXG4gICAgZW5zdXJlRXJyb3JPYmplY3Q6IGVuc3VyZUVycm9yT2JqZWN0LFxuICAgIG9yaWdpbmF0ZXNGcm9tUmVqZWN0aW9uOiBvcmlnaW5hdGVzRnJvbVJlamVjdGlvbixcbiAgICBtYXJrQXNPcmlnaW5hdGluZ0Zyb21SZWplY3Rpb246IG1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbixcbiAgICBjbGFzc1N0cmluZzogY2xhc3NTdHJpbmcsXG4gICAgY29weURlc2NyaXB0b3JzOiBjb3B5RGVzY3JpcHRvcnMsXG4gICAgaGFzRGV2VG9vbHM6IHR5cGVvZiBjaHJvbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgY2hyb21lICYmXG4gICAgICAgICAgICAgICAgIHR5cGVvZiBjaHJvbWUubG9hZFRpbWVzID09PSBcImZ1bmN0aW9uXCIsXG4gICAgaXNOb2RlOiBpc05vZGUsXG4gICAgaGFzRW52VmFyaWFibGVzOiBoYXNFbnZWYXJpYWJsZXMsXG4gICAgZW52OiBlbnYsXG4gICAgZ2xvYmFsOiBnbG9iYWxPYmplY3QsXG4gICAgZ2V0TmF0aXZlUHJvbWlzZTogZ2V0TmF0aXZlUHJvbWlzZSxcbiAgICBkb21haW5CaW5kOiBkb21haW5CaW5kXG59O1xucmV0LmlzUmVjZW50Tm9kZSA9IHJldC5pc05vZGUgJiYgKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZXJzaW9uID0gcHJvY2Vzcy52ZXJzaW9ucy5ub2RlLnNwbGl0KFwiLlwiKS5tYXAoTnVtYmVyKTtcbiAgICByZXR1cm4gKHZlcnNpb25bMF0gPT09IDAgJiYgdmVyc2lvblsxXSA+IDEwKSB8fCAodmVyc2lvblswXSA+IDApO1xufSkoKTtcblxuaWYgKHJldC5pc05vZGUpIHJldC50b0Zhc3RQcm9wZXJ0aWVzKHByb2Nlc3MpO1xuXG50cnkge3Rocm93IG5ldyBFcnJvcigpOyB9IGNhdGNoIChlKSB7cmV0Lmxhc3RMaW5lRXJyb3IgPSBlO31cbm1vZHVsZS5leHBvcnRzID0gcmV0O1xuXG59LHtcIi4vZXM1XCI6MTN9XX0se30sWzRdKSg0KVxufSk7ICAgICAgICAgICAgICAgICAgICA7aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyAhPT0gbnVsbCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuUCA9IHdpbmRvdy5Qcm9taXNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiAhPT0gbnVsbCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5QID0gc2VsZi5Qcm9taXNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIl19
