/*!
 * Pikaday jQuery plugin.
 *
 * Copyright © 2013 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

(function (root, factory)
{
    'use strict';

    if (typeof exports === 'object') {
        // CommonJS module
        factory(require('moment'), require('pikaday'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['moment', 'pikaday'], factory);
    } else {
        // Browser globals
        factory(root.moment, root.Pikaday);
    }
}(this, function (moment, Pikaday)
{
    'use strict';

    var originalConfig = Pikaday.prototype.config;
    Pikaday.prototype.config = function(options)
    {
        var opts = originalConfig.call(this, options);

        // the default flag for moment's strict date parsing
        if (opts.formatStrict === undefined) {
            opts.formatStrict = false;
        }
        if (!opts.parse) {
            opts.parse = parse;
        }
        if (!opts.toString) {
            opts.toString = toString;
        }

        return opts;
    };

    /**
     * return a Moment.js object of the current selection (if available)
     */
    Pikaday.prototype.getMoment = function()
    {
        return moment(this._d);
    };

    /**
     * set the current selection from a Moment.js object (if available)
     */
    Pikaday.prototype.setMoment = function(date, preventOnSelect)
    {
        if (moment.isMoment(date)) {
            this.setDate(date.toDate(), preventOnSelect);
        }
    };

    function parse(date, format)
    {
        var opts = this;
        var date = moment(date, format, opts.formatStrict);
        return (date && date.isValid()) ? date.toDate() : null;
    }

    function toString(date, format)
    {
        return moment(date).format(format);
    }

}));
