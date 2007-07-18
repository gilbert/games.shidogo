/**
 * Copyright (c) 2006, Justin Kramer <jkkramer@gmail.com>
 * Code licensed under the BSD license:
 * http://www.opensource.org/licenses/bsd-license.php
 *
 * General-purpose utility functions. All references to external libraries are
 * in this file. Pretty much any modern JS library could be used (YUI, jQuery,
 * Dojo, Prototype, Mootools).
 */
 
jQuery.noConflict();

eidogo.util = {

    byId: function(id) {
        return jQuery("#" + id)[0];
    },
    
    ajax: function(method, url, params, successFn, failureFn, scope, timeout) {
        scope = scope || window;
        jQuery.ajax({
            type: method.toUpperCase(),
            url: url,
            data: params,
            success: function(text) { successFn.call(scope, {responseText: text}) },
            error: failureFn.bind(scope),
            timeout: timeout
        });
    },
    
    addEvent: function(el, eventType, handler, arg, override) {
        if (override) {
            handler = handler.bind(arg);
        } else if (arg) {
            // use a closure to pass an extra argument
            var oldHandler = handler;
            handler = function(e) {
                oldHandler(e, arg);
            }
        }
        jQuery(el).bind(eventType, {}, handler);
    },
    
    onClick: function(el, handler, scope) {
        eidogo.util.addEvent(el, "click", handler, scope, true);
    },
    
    getElClickXY: function(e, el) {
        // for IE
	    if(!e.pageX) {
            e.pageX = e.clientX + (document.documentElement.scrollLeft ||
                document.body.scrollLeft);
            e.pageY = e.clientY + (document.documentElement.scrollTop ||
                document.body.scrollTop);
        }
        var elX = eidogo.util.getElX(el);
        var elY = eidogo.util.getElY(el);
		return [e.pageX - elX, e.pageY - elY];
    },
    
    stopEvent: function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    
    addClass: function(el, cls) {
        jQuery(el).addClass(cls);
    },
    
    removeClass: function(el, cls) {
        jQuery(el).removeClass(cls);
    },
    
    getElX: function(el) {
        return jQuery(el).offset({scroll:false}).left;
    },
    
    getElY: function(el) {
        return jQuery(el).offset({scroll:false}).top;
    }
    
};