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
};
