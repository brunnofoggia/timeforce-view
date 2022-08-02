import timeforce from 'timeforce';
import View from '../src/view';

// setup
var sync = timeforce.sync;
var persist = timeforce.persist;
var env = {};

// We never want to actually call these during tests.
typeof history !== "undefined" && (history.pushState = history.replaceState = function () { });

// Capture axios settings for comparison.
timeforce.persist = function (settings) {
    env.persistSettings = settings;
};

// Capture the arguments to timeforce.sync for comparison.
timeforce.sync = function (method, model, options) {
    env.syncArgs = {
        method: method,
        model: model,
        options: options
    };

    return sync.apply(this, arguments);
};

export { env, timeforce, View };