/**
 * Created by Utente on 14/06/2017.
 */
"use strict";

var ko = require('knockout'), $ = require('jquery');
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