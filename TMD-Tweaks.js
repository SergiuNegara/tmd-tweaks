// ==UserScript==
// @name        TMD Tweaks
// @description Tweaks for TMD
// @include	    *torrentsmd.com/*
// @include	    *torrentsmd.eu/*
// @include     *torrentsmd.me/*
// @include     *torrentsmoldova.com/*
// @include	    *torrentsmoldova.org/*
// @include     *torrentsmoldova.net/*
// @version     1.0.3
// ==/UserScript==

jQuery(document).ready(function(){
	if(jQuery('#user_box').length!=0){
		var ph 			= {};
		ph.torrents = ['Torente', 'Раздачи'];
		ph.users 		= ['Utilizatori', 'Пользователи'];
		ph.forum 		= ['Forum', 'Форум'];

		if(!message.lang) message.lang = 'ro';
		var l = (message.lang == 'ro') ? 0 : 1;

		var html       = {};
		html.torrents  = '<form id="search-torrents" action="search.php" method="get"><input class="searchness" type="text" name="search_str" placeholder="' + ph.torrents[l] + '..."></form>';
		html.users     = '<form id="search-users" action="users.php" method="get"><input class="searchness" type="text" name="search" placeholder="' + ph.users[l] + '..."></form>';
		html.forum     = '<form id="search-forum" action="forum.php" method="get"><input type="hidden" name="action" value="search"><input class="searchness" type="text" name="keywords" placeholder="' + ph.forum[l] + '..."></form>';
		html.stylize   = '\
#search-cntnr{ margin: 0 auto; width: 880px; overflow: hidden; padding: 10px 0 20px; }\
#search-cntnr>*{ float: left; margin-left: 122px; }\
#search-cntnr>:first-child{ margin-left: 0; }\
#search-cntnr .searchness{ border: 1px solid #ccc; padding: 2px 5px; width: 200px; }\
.searchness:focus{ outline: none; }\
';
		html.container = '<div id="search-cntnr">' + html.torrents + html.users + html.forum + '</div>';
		jQuery('#main_search_text').parent().remove();
		jQuery('head').append('<style>' + html.stylize + '</style>');
		jQuery('#no_td_border').after(html.container);
	}
});
