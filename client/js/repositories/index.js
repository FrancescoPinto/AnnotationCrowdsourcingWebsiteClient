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
