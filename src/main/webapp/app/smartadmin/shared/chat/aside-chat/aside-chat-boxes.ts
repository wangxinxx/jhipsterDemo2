'use strict';

declare var $: any;

/*
 * SMARTCHAT PLUGIN ARRAYS & CONFIG
 * Dependency: js/plugin/moment/moment.min.js
 *             js/plugin/cssemotions/jquery.cssemoticons.min.js
 *             js/smart-chat-ui/smart.chat.ui.js
 * (DO NOT CHANGE)
 */
let boxList = [],
  showList = [],
  nameList = [],
  idList = [];
/*
 * Width of the chat boxes, and the gap inbetween in pixel (minus padding)
 */
let chatbox_config = {
  width: 200,
  gap: 35,
  offset: 0
};

/*
 * SMART CHAT ENGINE
 * Copyright (c) 2013 Wen Pu
 * Modified by MyOrange
 * All modifications made are hereby copyright (c) 2014-2015 MyOrange
 */

// TODO: implement destroy()

$.widget('ui.chatbox', {
  options: {
    id: null, // id for the DOM element
    title: null, // title of the chatbox
    user: null, // can be anything associated with this chatbox
    hidden: false,
    offset: 0, // relative to right edge of the browser window
    width: 300, // width of the chatbox
    status: 'online', //
    alertmsg: null,
    alertshow: null,
    messageSent(id, user, msg) {
      // override this
      this.boxManager.addMsg(user.first_name, msg);
    },
    boxClosed(id) {
    }, // called when the close icon is clicked
    boxManager: {
      // thanks to the widget factory facility
      // similar to http://alexsexton.com/?p=51
      init(elem) {
        this.elem = elem;
      },
      addMsg(peer, msg) {
        let self = this;
        let box = self.elem.uiChatboxLog;
        let e = document.createElement('div');
        box.append(e);
        $(e).hide();

        let systemMessage = false;

        if (peer) {
          let peerName = document.createElement('b');
          $(peerName).text(peer + ': ');
          e.appendChild(peerName);
        } else {
          systemMessage = true;
        }

        let msgElement = document.createElement(
          systemMessage ? 'i' : 'span');
        $(msgElement).text(msg);
        e.appendChild(msgElement);
        $(e).addClass('ui-chatbox-msg');
        $(e).css('maxWidth', $(box).width());
        $(e).fadeIn();
        // $(e).prop( 'title', moment().calendar() ); // add dep: moment.js
        $(e).find('span').emoticonize(); // add dep: jquery.cssemoticons.js
        self._scrollToBottom();

        if (!self.elem.uiChatboxTitlebar.hasClass('ui-state-focus')
          && !self.highlightLock) {
          self.highlightLock = true;
          self.highlightBox();
        }
      },
      highlightBox() {
        let self = this;
        self.elem.uiChatboxTitlebar.effect('highlight', {}, 300);
        self.elem.uiChatbox.effect('bounce', {times: 2}, 300, function() {
          self.highlightLock = false;
          self._scrollToBottom();
        });
      },
      toggleBox() {
        this.elem.uiChatbox.toggle();
      },
      _scrollToBottom() {
        let box = this.elem.uiChatboxLog;
        box.scrollTop(box.get(0).scrollHeight);
      }
    }
  },
  toggleContent(event) {
    this.uiChatboxContent.toggle();
    if (this.uiChatboxContent.is(':visible')) {
      this.uiChatboxInputBox.focus();
    }
  },
  widget() {
    return this.uiChatbox;
  },
  _create() {
    let self = this,
      options = self.options,
      title = options.title || 'No Title',
      // chatbox
      uiChatbox = (self.uiChatbox = $('<div></div>'))
        .appendTo(document.body)
        .addClass('ui-widget ' +
          // 'ui-corner-top ' +
          'ui-chatbox'
        )
        .attr('outline', 0)
        .focusin(function() {
          // ui-state-highlight is not really helpful here
          // self.uiChatbox.removeClass('ui-state-highlight');
          self.uiChatboxTitlebar.addClass('ui-state-focus');
        })
        .focusout(function() {
          self.uiChatboxTitlebar.removeClass('ui-state-focus');
        }),
      // titlebar
      uiChatboxTitlebar = (self.uiChatboxTitlebar = $('<div></div>'))
        .addClass('ui-widget-header ' +
          // 'ui-corner-top ' +
          'ui-chatbox-titlebar ' +
          self.options.status +
          ' ui-dialog-header' // take advantage of dialog header style
        )
        .click(function(event) {
          self.toggleContent(event);
        })
        .appendTo(uiChatbox),
      uiChatboxTitle = (self.uiChatboxTitle = $('<span></span>'))
        .html(title)
        .appendTo(uiChatboxTitlebar),
      uiChatboxTitlebarClose = (self.uiChatboxTitlebarClose = $('<a href="#" rel="tooltip" data-placement="top" data-original-title="Hide"></a>'))
        .addClass(// 'ui-corner-all ' +
          'ui-chatbox-icon '
        )
        .attr('role', 'button')
        .hover(function() {
            uiChatboxTitlebarClose.addClass('ui-state-hover');
          },
          function() {
            uiChatboxTitlebarClose.removeClass('ui-state-hover');
          })
        .click(function(event) {
          uiChatbox.hide();
          self.options.boxClosed(self.options.id);
          return false;
        })
        .appendTo(uiChatboxTitlebar),
      uiChatboxTitlebarCloseText = $('<i></i>')
        .addClass('fa ' +
          'fa-times')
        .appendTo(uiChatboxTitlebarClose),
      uiChatboxTitlebarMinimize = (self.uiChatboxTitlebarMinimize = $('<a href="#" rel="tooltip" data-placement="top" data-original-title="Minimize"></a>'))
        .addClass(// 'ui-corner-all ' +
          'ui-chatbox-icon'
        )
        .attr('role', 'button')
        .hover(function() {
            uiChatboxTitlebarMinimize.addClass('ui-state-hover');
          },
          function() {
            uiChatboxTitlebarMinimize.removeClass('ui-state-hover');
          })
        .click(function(event) {
          self.toggleContent(event);
          return false;
        })
        .appendTo(uiChatboxTitlebar),
      uiChatboxTitlebarMinimizeText = $('<i></i>')
        .addClass('fa ' +
          'fa-minus')
        .appendTo(uiChatboxTitlebarMinimize),
      // content
      uiChatboxContent = (self.uiChatboxContent = $('<div class="' + self.options.alertshow + '"><span class="alert-msg">' + self.options.alertmsg + '</span></div>'))
        .addClass('ui-widget-content ' +
          'ui-chatbox-content '
        )
        .appendTo(uiChatbox),
      uiChatboxLog = (self.uiChatboxLog = self.element)
        .addClass('ui-widget-content ' +
          'ui-chatbox-log ' +
          'custom-scroll'
        )
        .appendTo(uiChatboxContent),
      uiChatboxInput = (self.uiChatboxInput = $('<div></div>'))
        .addClass('ui-widget-content ' +
          'ui-chatbox-input'
        )
        .click(function(event) {
          // anything?
        })
        .appendTo(uiChatboxContent),
      uiChatboxInputBox = (self.uiChatboxInputBox = $('<textarea></textarea>'))
        .addClass('ui-widget-content ' +
          'ui-chatbox-input-box '
        )
        .appendTo(uiChatboxInput)
        .keydown(function(event) {
          if (event.keyCode && event.keyCode === $.ui.keyCode.ENTER) {
            let msg = $.trim($(this).val());
            if (msg.length > 0) {
              self.options.messageSent(self.options.id, self.options.user, msg);
            }
            $(this).val('');
            return false;
          }
        })
        .focusin(function() {
          uiChatboxInputBox.addClass('ui-chatbox-input-focus');
          let box = $(this).parent().prev();
          box.scrollTop(box.get(0).scrollHeight);
        })
        .focusout(function() {
          uiChatboxInputBox.removeClass('ui-chatbox-input-focus');
        });

    // disable selection
    uiChatboxTitlebar.find('*').add(uiChatboxTitlebar).disableSelection();

    // switch focus to input box when whatever clicked
    uiChatboxContent.children().click(function() {
      // click on any children, set focus on input box
      self.uiChatboxInputBox.focus();
    });

    self._setWidth(self.options.width);
    self._position(self.options.offset);

    self.options.boxManager.init(self);

    if (!self.options.hidden) {
      uiChatbox.show();
    }

    $('.ui-chatbox [rel=tooltip]').tooltip();
    // console.log("tooltip created");
  },
  _setOption(option, value) {
    if (value != null) {
      switch (option) {
        case 'hidden':
            if (!value) {
                this.uiChatbox.show();
            } else {
                this.uiChatbox.hide();
            }
            break;
        case 'offset':
          this._position(value);
          break;
        case 'width':
          this._setWidth(value);
          break;
      }
    }
    $.Widget.prototype._setOption.apply(this, arguments);
  },
  _setWidth(width) {
    this.uiChatbox.width((width + 28) + 'px');
    // this.uiChatboxTitlebar.width((width + 28) + "px");
    // this.uiChatboxLog.width(width + "px");
    // this.uiChatboxInput.css("maxWidth", width + "px");
    // padding:2, boarder:2, margin:5
    this.uiChatboxInputBox.css('width', (width + 18) + 'px');
  },
  _position(offset) {
    this.uiChatbox.css('right', offset);
  }
});

/*
 * jQuery CSSEmoticons plugin 0.2.9
 *
 * Copyright (c) 2010 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Sun Oct 22 1:00:00 2010 -0500
 */

$.fn.emoticonize = function(options) {

  let opts = $.extend({}, $.fn.emoticonize.defaults, options);

  let escapeCharacters = [')', '(', '*', '[', ']', '{', '}', '|', '^', '<', '>', '\\', '?', '+', '=', '.'];

  let threeCharacterEmoticons = [
    // really weird bug if you have :{ and then have :{) in the same container anywhere *after* :{ then :{ doesn't get matched, e.g. :] :{ :) :{) :) :-)// will match everything except :{
    //  But if you take out the :{) or even just move :{ to the right of :{) then everything works fine. This has something to do with the preMatch string below I think, because
    //  it'll work again if you set preMatch equal to '()'
    //  So for now, we'll just remove :{) from the emoticons, because who actually uses this mustache man anyway?
    // ":{)",
    ':-)', ':o)', ':c)', ':^)', ':-D', ':-(', ':-9', ';-)', ':-P', ':-p', ':-Þ', ':-b', ':-O', ':-/', ':-X', ':-#', ':\'(', 'B-)', '8-)', ';*(', ':-*', ':-\\',
    '?-)', // <== This is my own invention, it's a smiling pirate (with an eye-patch)!
    // and the twoCharacterEmoticons from below, but with a space inserted
    ': )', ': ]', '= ]', '= )', '8 )', ': }', ': D', '8 D', 'X D', 'x D', '= D', ': (', ': [', ': {', '= (', '; )', '; ]', '; D', ': P', ': p', '= P', '= p', ': b', ': Þ', ': O', '8 O', ': /', '= /', ': S', ': #', ': X', 'B )', ': |', ': \\', '= \\', ': *', ': &gt;', ': &lt;'//, "* )"
  ];

  let twoCharacterEmoticons = [ // separate these out so that we can add a letter-spacing between the characters for better proportions
    ':)', ':]', '=]', '=)', '8)', ':}', ':D', ':(', ':[', ':{', '=(', ';)', ';]', ';D', ':P', ':p', '=P', '=p', ':b', ':Þ', ':O', ':/', '=/', ':S', ':#', ':X', 'B)', ':|', ':\\', '=\\', ':*', ':&gt;', ':&lt;'//, "*)"
  ];

  let specialEmoticons = { // emoticons to be treated with a special class, hash specifies the additional class to add, along with standard css-emoticon class
    '&gt;:)': {cssClass: 'red-emoticon small-emoticon spaced-emoticon'},
    '&gt;;)': {cssClass: 'red-emoticon small-emoticon spaced-emoticon'},
    '&gt;:(': {cssClass: 'red-emoticon small-emoticon spaced-emoticon'},
    '&gt;: )': {cssClass: 'red-emoticon small-emoticon'},
    '&gt;; )': {cssClass: 'red-emoticon small-emoticon'},
    '&gt;: (': {cssClass: 'red-emoticon small-emoticon'},
    ';(': {cssClass: 'red-emoticon spaced-emoticon'},
    '&lt;3': {cssClass: 'pink-emoticon counter-rotated'},
    'O_O': {cssClass: 'no-rotate'},
    'o_o': {cssClass: 'no-rotate'},
    '0_o': {cssClass: 'no-rotate'},
    'O_o': {cssClass: 'no-rotate'},
    'T_T': {cssClass: 'no-rotate'},
    '^_^': {cssClass: 'no-rotate'},
    'O:)': {cssClass: 'small-emoticon spaced-emoticon'},
    'O: )': {cssClass: 'small-emoticon'},
    '8D': {cssClass: 'small-emoticon spaced-emoticon'},
    'XD': {cssClass: 'small-emoticon spaced-emoticon'},
    'xD': {cssClass: 'small-emoticon spaced-emoticon'},
    '=D': {cssClass: 'small-emoticon spaced-emoticon'},
    '8O': {cssClass: 'small-emoticon spaced-emoticon'},
    '[+=..]': {cssClass: 'no-rotate nintendo-controller'}
    // "OwO":  { cssClass: "no-rotate" }, // these emoticons overflow and look weird even if they're made even smaller, could probably fix this with some more css trickery
    // "O-O":  { cssClass: "no-rotate" },
    // "O=)":    { cssClass: "small-emoticon" }
  };

  let specialRegex = new RegExp('(\\' + escapeCharacters.join('|\\') + ')', 'g');
  // One of these characters must be present before the matched emoticon, or the matched emoticon must be the first character in the container HTML
  //  This is to ensure that the characters in the middle of HTML properties or URLs are not matched as emoticons
  //  Below matches ^ (first character in container HTML), \s (whitespace like space or tab), or \0 (NULL character)
  // (<\\S+.*>) matches <\\S+.*> (matches an HTML tag like <span> or <div>), but haven't quite gotten it working yet, need to push this fix now
  let preMatch = '(^|[\\s\\0])';

  for (let i = threeCharacterEmoticons.length - 1; i >= 0; --i) {
    threeCharacterEmoticons[i] = threeCharacterEmoticons[i].replace(specialRegex, '\\$1');

    // threeCharacterEmoticons[i] = new RegExp((preMatch + '(' + threeCharacterEmoticons[i] + ')'), 'g');
  }

  for (let i = twoCharacterEmoticons.length - 1; i >= 0; --i) {
    twoCharacterEmoticons[i] = twoCharacterEmoticons[i].replace(specialRegex, '\\$1');

    // twoCharacterEmoticons[i] = new RegExp(preMatch + '(' + twoCharacterEmoticons[i] + ')', 'g');
  }

  for (let emoticon in specialEmoticons) {
    specialEmoticons[emoticon].regexp = emoticon.replace(specialRegex, '\\$1');
    specialEmoticons[emoticon].regexp = new RegExp(preMatch + '(' + specialEmoticons[emoticon].regexp + ')', 'g');
  }

  let exclude = 'span.css-emoticon';
  if (opts.exclude) {
    exclude += ',' + opts.exclude;
  }
  let excludeArray = exclude.split(',');

  return this.not(exclude).each(function() {
    let container = $(this);
    let cssClass = 'css-emoticon';
    if (opts.animate) {
      cssClass += ' un-transformed-emoticon animated-emoticon';
    }

    for (let emoticon in specialEmoticons) {
      let specialCssClass = cssClass + ' ' + specialEmoticons[emoticon].cssClass;
      container.html(container.html().replace(specialEmoticons[emoticon].regexp, '$1<span class=\'' + specialCssClass + '\'>$2</span>'));
    }
    $(threeCharacterEmoticons).each(function() {
      container.html(container.html().replace(this, '$1<span class=\'' + cssClass + '\'>$2</span>'));
    });
    $(twoCharacterEmoticons).each(function() {
      container.html(container.html().replace(this, '$1<span class=\'' + cssClass + ' spaced-emoticon\'>$2</span>'));
    });
    // fix emoticons that got matched more then once (where one emoticon is a subset of another emoticon), and thus got nested spans
    $.each(excludeArray, function(index, item) {
      container.find($.trim(item) + ' span.css-emoticon').each(function() {
        $(this).replaceWith($(this).text());
      });
    });
    if (opts.animate) {
      setTimeout(function() {
        $('.un-transformed-emoticon').removeClass('un-transformed-emoticon');
      }, opts.delay);
    }
  });
};

$.fn.unemoticonize = function(options) {
  let opts = $.extend({}, $.fn.emoticonize.defaults, options);
  return this.each(function() {
    let container = $(this);
    container.find('span.css-emoticon').each(function() {
      // add delay equal to animate speed if animate is not false
      let span = $(this);
      if (opts.animate) {
        span.addClass('un-transformed-emoticon');
        setTimeout(function() {
          span.replaceWith(span.text());
        }, opts.delay);
      } else {
        span.replaceWith(span.text());
      }
    });
  });
};

$.fn.emoticonize.defaults = {animate: true, delay: 500, exclude: 'pre,code,.no-emoticons'};

let init = function(options) {
  $.extend(chatbox_config, options);
};

let delBox = function(id) {
  // TODO
};

let getNextOffset = function() {
  return (chatbox_config.width + chatbox_config.gap) * showList.length;
};

let boxClosedCallback = function(id) {
  // close button in the titlebar is clicked
  let idx = showList.indexOf(id);
  if (idx !== -1) {
    showList.splice(idx, 1);
    let diff = chatbox_config.width + chatbox_config.gap;
    for (let i = idx; i < showList.length; i++) {
      chatbox_config.offset = $('#' + showList[i]).chatbox('option', 'offset');
      $('#' + showList[i]).chatbox('option', 'offset', chatbox_config.offset - diff);
    }
  } else {
    alert('NOTE: Id missing from array: ' + id);
  }
};

// caller should guarantee the uniqueness of id
let addBox = function(id, user, name?) {
  let idx1 = showList.indexOf(id);
  let idx2 = boxList.indexOf(id);
  if (idx1 !== -1) {
    // found one in show box, do nothing
  } else if (idx2 !== -1) {
    // exists, but hidden
    // show it and put it back to showList
    $('#' + id).chatbox('option', 'offset', getNextOffset());
    let manager = $('#' + id).chatbox('option', 'boxManager');
    manager.toggleBox();
    showList.push(id);
  } else {
    let el = document.createElement('div');
    el.setAttribute('id', id);
    $(el).chatbox({
      id,
      user,
      title: '<i title="' + user.status + '"></i>' + user.first_name + ' ' + user.last_name,
      hidden: false,
      offset: getNextOffset(),
      width: chatbox_config.width,
      status: user.status,
      alertmsg: user.alertmsg,
      alertshow: user.alertshow,
      messageSent: dispatch,
      boxClosed: boxClosedCallback
    });
    boxList.push(id);
    showList.push(id);
    nameList.push(user.first_name);
  }
};

let messageSentCallback = function(id, user, msg) {
  let idx = boxList.indexOf(id);
  // chatbox_config.messageSent(nameList[idx], msg);
};

// not used in demo
let dispatch = function(id, user, msg) {
  // $("#log").append("<i>" + moment().calendar() + "</i> you said to <b>" + user.first_name + " " + user.last_name + ":</b> " + msg + "<br/>");
  if ($('#chatlog').length) {
    $('#chatlog').append('You said to <b>' + user.first_name + ' ' + user.last_name + ':</b> ' + msg + '<br/>').effect('highlight', {}, 500);

  }
  $('#' + id).chatbox('option', 'boxManager').addMsg('Me', msg);
};

export const chatboxManager = {
  init,
  addBox,
  delBox,
  dispatch
};
