var user = "tamoxin@codepen:~$ ";

var shareLink = "";

var command = "";

var tweet = "https://twitter.com/intent/tweet?text=";

var quote;

var author;

var insertText = function(){
  jQuery.support.cors = true;
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
      error: function(jqXHR, textStatus, errorThrown) {
        $(insertError);
      },
      cache: false
   });

}

var insertError = function(){
  quote = "<p style='text-align: left'>There was an error while retrieving your quote.<br>Please check your internet connection and try again.</p>";
  $("#quote").html(quote);
  tweet += $("#quote").text();
  shareLink = encodeURI(tweet);
}

var insertAbout = function(){
  quote = "<p style='text-align: left'>This random quote machine was made by "+
    "<a href='http://marcocarrizales.me/' target='_blank' class='links'>Marco Carrizales</a>."+
    "<br>Thanks to <a href='https://twitter.com/atmattb' target='_blank' class='links'>Matt Boldt"+
    "</a> for the <a href='http://www.mattboldt.com/demos/typed-js/' target='_blank' class='links'>"+
    "Typed plugin</a>.<br>The quotes showed on this site are from <a href='https://quotesondesign.com/' "+
    "target='_blank' class='links'>https://quotesondesign.com/</a></p>";
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

// cordova code beginning
var app = {
    // // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        // initialize jQuery methods
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
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};

app.initialize();

// $(document).ready(function(){
//     $(newQuote);
//     // new quote
//     $("#new-quote").on("click", newQuote);

//     //about
//     $("#about").on("click", about);

//     //share quote
//     $("#share-quote").on("click", function(){
//         $("#share-quote").attr("href", shareLink);
//     });
// });

