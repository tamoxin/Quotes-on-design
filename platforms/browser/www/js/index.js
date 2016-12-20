/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var user = "tamoxin@codepen:~$ ";

var shareLink = "";

var command = "";

var tweet = "https://twitter.com/intent/tweet?text=";

var quote;

var author;

var insertText = function(){
  $.ajax({
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(a) {
        quote = a[0].content;
        author = a[0].title;
        $("#quote").html(quote);
        $("#author").html(author);
        tweet += $("#quote").text()+ "\n" + $("#author").text();
        shareLink = encodeURI(tweet);
      },
      cache: false
   });

}

var insertAbout = function(){
  quote = "<p style='text-align: left'>This random quote machine was made by <a href='http://marcocarrizales.me/' target='_blank' class='links'>Marco Carrizales</a>.<br>Thanks to <a href='https://twitter.com/atmattb' target='_blank' class='links'>Matt Boldt</a> for the <a href='http://www.mattboldt.com/demos/typed-js/' target='_blank' class='links'>Typed plugin</a>.<br>The quotes showed on this site are from <a href='https://quotesondesign.com/' target='_blank' class='links'>https://quotesondesign.com/</a></p>";
  author = "Thanks for passing by :)"
  $("#quote").html(quote);
  $("#author").html(author);
  tweet += $("#quote").text()+ "\n" + $("#author").text();
  shareLink = encodeURI(tweet);
}

var newQuote = function(){
  $(clr);
  command = "sudo ./randomQuote.py^400..^100..^100.^100.^300";
  $("#user").typed({
    strings: [command],
    typeSpeed: -900,
    onStringTyped: insertText
  });
};

var about = function(){
  $(clr);
  command = "about.txt^500";
  $("#user").typed({
    strings: [command],
    typeSpeed: -900,
    onStringTyped: insertAbout
  });
}

var clr = function(){
  quote = "";
  author = "";
  tweet = "https://twitter.com/intent/tweet?text=";
  shareLink = "";
  $("#quote").text(quote);
  $("#author").text(author);
}

$(document).ready(function(){
  $(newQuote);
  // new quote
  $("#new-quote").on("click", newQuote);

  //about
  $("#about").on("click", about);

  //share quote
  $("#share-quote").on("click", function(){
    $("#share-quote").attr("href", shareLink);
  });
});