 $(document).ready(function(){
        var $tweetBody = $('#tweets');
        var $userList = $('#users');
        
        
        for (var i = 0; i < users.length; i++) {
          var $user = $('<button class="user"></button>');
          $user.text(users[i]);
          $userList.prepend($user);
        }
        $userList.prepend($('<button class="home">Home</button>'))
      
        streams.lastRead = 0;
        var updateTweets = function() {
          var index = streams.lastRead;

          streams.lastRead = streams.home.length;
          while(index < streams.home.length){
            var tweet = streams.home[index];
            var $tweet = $('<div></div>');
            var now = moment(tweet.created_at).fromNow();
            
            if (tweet !== undefined) {
              $tweet.text('@' + tweet.user + ': ' + tweet.message + '  --' + now);
              $tweetBody.prepend($tweet);
              index += 1;
            }
          }
         
        }
        updateTweets();
       
        $('.refresh').on('click', function() {
          updateTweets();
        });
        $('.user').on('click', function() {
          var name = $(this).text();
          $tweetBody.html('');
          for (var i = 0; i < streams.home.length; i++) {
            var tweet = streams.home[i];
            now = moment(tweet.created_at).fromNow();
            if (tweet.user === name) {
              var $tweet = $('<div></div>');
              $tweet.text('@' + tweet.user + ': ' + tweet.message + '  --' + now);
              $tweetBody.prepend($tweet);
            }
          }
        });
        $('.home').on('click', function() {
          $tweetBody.html('');
          streams.lastRead = 0;
          updateTweets();
        });
        $('.refresh').hover(function(){
          $(this).css("background-color", '#47d1d1');
          }, function(){
          $(this).css("background-color", '#2eb8b8');
        });
      });     