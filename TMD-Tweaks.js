// ==UserScript==
// @name        TMD Tweaks
// @description Tweaks for TMD
// @include     *torrentsmd.com/*
// @include     *torrentsmd.eu/*
// @include     *torrentsmd.me/*
// @include     *torrentsmoldova.com/*
// @include     *torrentsmoldova.org/*
// @include     *torrentsmoldova.net/*
// @version     1.3.0
// ==/UserScript==



TMDTweaks(); //run


function TMDTweaks()
{
	var _window = unsafeWindow || window;//'cause chrome security policy
	(!_window.jQuery) && window.setTimeout(TMDTweaks, 500) || init(_window.jQuery, _window);
}

function init($, _window) //all code goes here
{
	_window = _window || window;

	var
		_message = _window.message || {'lang':'ro'},
		User = {
			loggedIn: ($('#user_box').length>0),
			lang: _message.lang
		},
		__ = function() //arguments=> (Ro, Ru)
		{
			var currentLang = {
				'ro':0,
				'ru':1
			}[User.lang];

			return arguments[currentLang];
		},
		msg = {
			sf_t : __('Torente', 'Раздачи'),
			sf_u : __('Utilizatori', 'Пользователи'),
			sf_f : __('Forum', 'Форум'),
			topic : __('Denumirea temei', 'Название темы')
		},

		$style = $('<style>').appendTo('head');


	//Search form
	if(User.loggedIn)
	{
		var html   = {};
		html.sf    = {}; // search form
		html.sf.t  = '<form id="search-torrents" action="search.php" method="get"><input class="searchness" type="text" name="search_str" placeholder="' + msg.sf_t + '..."></form>';
		html.sf.u  = '<form id="search-users" action="users.php" method="get"><input class="searchness" type="text" name="search" placeholder="' + msg.sf_u + '..."></form>';
		html.sf.f  = '<form id="search-forum" action="forum.php" method="get"><input type="hidden" name="action" value="search"><input class="searchness" type="text" name="keywords" placeholder="' + msg.sf_f + '..."></form>';
		html.cnt   = '<div id="search-cntnr">' + html.sf.t + html.sf.u + html.sf.f + '</div>';
		var style  =
			'#search-cntnr{ margin: 0 auto; width: 880px; overflow: hidden; padding: 10px 0 20px; }'+
			'#search-cntnr>*{ float: left; margin-left: 122px; }'+
			'#search-cntnr>:first-child{ margin-left: 0; }'+
			'#search-cntnr .searchness{ border: 1px solid #ccc; padding: 2px 5px; width: 200px; }'+
			'.searchness:focus{ outline: none; }';

		$('#main_search_text').parent().remove();
		$style.append(style);
		$('#no_td_border').after(html.cnt);
	}


	// topic title block (as is - to be optimized)
	if(location.search.match(/viewtopic/))
	{
		var topic = $('title').text().replace(/(^(Vezi tema - )|^(Просмотр темы - )|( ::(.+)$))/g, '');
		var topichtml = '<div id="topic-title">' + msg.topic + ': ' + topic + '</div>';
		var topicstyle =
			  '#topic-title{ background-color: #ECE9D8; border: 1px solid #A79F72; padding: 10px; position: fixed; right: 10px; bottom: 10px; transition: all .5s ease; }'+
			  '#topic-title:hover{opacity: 0;}';

		$style.append(topicstyle);
		$('body').append(topichtml);
	}

}

