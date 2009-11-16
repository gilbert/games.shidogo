/**
 * EidoGo -- Web-based SGF Editor
 * Copyright (c) 2007, Justin Kramer <jkkramer@gmail.com>
 * Code licensed under AGPLv3:
 * http://www.fsf.org/licensing/licenses/agpl-3.0.html
 *
 * Initialize things for EidoGo to function: stylesheets, etc
 */

/**
 * Search for DIV elements with the class 'eidogo-player-auto' and insert a
 * Player into each. Also handle problem-mode Players with
 * 'eidogo-player-problem'
**/

(function() {
    
    var autoCfg = window.eidogoConfig || {};
    var problemCfg = {
        theme:          "problem",
        problemMode:    true,
        markVariations: false,
        markNext:       false,
        shrinkToFit:    true};
    var scriptPath = eidogo.util.getPlayerPath();    
    var path = eidogo.playerPath = (autoCfg.playerPath || scriptPath || 'player').replace(/\/$/, "");
    
    if (!autoCfg.skipCss) {
        eidogo.util.addStyleSheet(path + '/css/player.css');
        if (eidogo.browser.ie && parseInt(eidogo.browser.ver, 10) <= 6) {
            eidogo.util.addStyleSheet(path + '/css/player-ie6.css');
        }
    }
    
    eidogo.util.addEvent(window, "load", function() {
        eidogo.autoPlayers = [];
        var els = [];
        var divs = document.getElementsByTagName('a');
        var len = divs.length;
        for (var i = 0; i < len; i++) {
            if (divs[i].getAttribute('title')
		&& divs[i].getAttribute('title').substring(0,18) == "eidogo-player-auto") {
                els.push(divs[i]);
            }
        };

        var el;
        for (var i = 0; el = els[i]; i++) {
            var cfg = {enableShortcuts: false, theme: "compact"};
            for (var key in autoCfg){
                cfg[key] = autoCfg[key];
	    }
	    var href = el.getAttribute('href');
	    var colonIndex = href.lastIndexOf(':');
	    var rawname = href.substring(href.lastIndexOf('#')+1,colonIndex);
	    var sgfname = rawname + '.sgf';
	    var iPath = strToIntList(href.substring(colonIndex+1));
	    cfg.loadPath = iPath;

	    var newEl = document.createElement('div');
	    jQuery(el).replaceWith(newEl);
	    cfg.container = newEl;
	    var permalink = document.createElement('a');
	    permalink.setAttribute('href',href);
	    permalink.innerHTML = 'Permalink';
	    permalink.setAttribute('target', '_blank');
	    jQuery(newEl).after(permalink);
	    var sfun = function(data){
		window.console.log('callback');
		window.console.log(data);
		cfg.sgf = data.sgf;

		newEl.innerHTML = '';
		eidogo.util.show(newEl);
		
		var player = new eidogo.Player(cfg);
		eidogo.autoPlayers.push(player);
	    };

	    if(document.domain == "www.shidogo.com"){
		jQuery.getJSON('http://games.shidogo.com/get_sgf.php?jsonpf='+sgfname+'&callback=?', sfun);
	    }
	    else{
		console.log('fail');
		if (sgfUrl){
		    cfg.sgfUrl = sgfUrl;
		}
		else if (el.innerHTML){
		    cfg.sgf = el.innerHTML;
		}
		var shrink = el.getAttribute('shrink');
		if (shrink){
		    cfg.shrinkToFit = (shrink == "no" ? false : true);
		}
		el.innerHTML = "";
		eidogo.util.show(el);
		
		var player = new eidogo.Player(cfg);
		eidogo.autoPlayers.push(player);
	    }
        
	}});
    
})();

function strToIntList(str){
    var strs = str.split(',');
    var ints = [];
    for(var i=0;i<strs.length;i++){
	ints[i] = strs[i];
    }
    return ints;
}
