// ==UserScript==
// @name        TMD Tweaks
// @description Tweaks for TMD
// @include     *torrentsmd.com/*
// @include     *torrentsmd.eu/*
// @include     *torrentsmd.me/*
// @include     *torrentsmoldova.com/*
// @include     *torrentsmoldova.org/*
// @include     *torrentsmoldova.net/*
// @version     1.1.0
// ==/UserScript==

$j(document).ready(function(){
  if($j('#user_box').length!=0){
    var msg    = {};
    msg.sf_t   = ['Torente', 'Раздачи'];
    msg.sf_u   = ['Utilizatori', 'Пользователи'];
    msg.sf_f   = ['Forum', 'Форум'];
    msg.topic  = ['Denumirea temei', 'Название темы']

    if(!message.lang) message.lang = 'ro';
    var l      = (message.lang == 'ro') ? 0 : 1;

    var html   = {};
    html.sf    = {}; // search form
    html.sf.t  = '<form id="search-torrents" action="search.php" method="get"><input class="searchness" type="text" name="search_str" placeholder="' + msg.sf_t[l] + '..."></form>';
    html.sf.u  = '<form id="search-users" action="users.php" method="get"><input class="searchness" type="text" name="search" placeholder="' + msg.sf_u[l] + '..."></form>';
    html.sf.f  = '<form id="search-forum" action="forum.php" method="get"><input type="hidden" name="action" value="search"><input class="searchness" type="text" name="keywords" placeholder="' + msg.sf_f[l] + '..."></form>';
    html.cnt   = '<div id="search-cntnr">' + html.sf.t + html.sf.u + html.sf.f + '</div>';
    var style  = '\
#search-cntnr{ margin: 0 auto; width: 880px; overflow: hidden; padding: 10px 0 20px; }\
#search-cntnr>*{ float: left; margin-left: 122px; }\
#search-cntnr>:first-child{ margin-left: 0; }\
#search-cntnr .searchness{ border: 1px solid #ccc; padding: 2px 5px; width: 200px; }\
.searchness:focus{ outline: none; }\
';
    $j('#main_search_text').parent().remove();
    $j('head').append('<style>' + style + '</style>');
    $j('#no_td_border').after(html.cnt);
  }

// topic title block (as is - to be optimized)
if(location.search.match(/viewtopic/))
{
  var topic = $j('title').text().replace(/(^(Vezi tema - )|^(Просмотр темы - )|( ::(.+)$))/g, '');
  var topichtml = '<div id="topic-title">' + msg.topic[l] + ': ' + topic + '</div>';
  var topicstyle = '<style>\
  #topic-title{\
    background-color: #ECE9D8;\
    border: 1px solid #A79F72;\
    padding: 10px;\
    position: fixed; right: 10px; bottom: 10px;\
    transition: all .5s ease;\
  }\
  #topic-title:hover{\
    opacity: 0;\
  }\
</style>';
  $j('head').append(topicstyle);
  $j('body').append(topichtml);
}
});
