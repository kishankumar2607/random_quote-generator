$(document).ready(function () {
  // Quotes array and favorites
  const quotes = [
    "The best way to predict the future is to invent it.",
    "Life is what happens when you're busy making other plans.",
    "Get your facts first, then you can distort them as you please.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Do not watch the clock. Do what it does. Keep going.",
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "The only impossible journey is the one you never begin.",
    "Believe you can and you're halfway there.",
    "When something is important enough, you do it even if the odds are not in your favor.",
    "I have not failed. I've just found 10,000 ways that won't work.",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    "Your time is limited, so don't waste it living someone else's life.",
    "The purpose of our lives is to be happy.",
    "You only live once, but if you do it right, once is enough.",
    "To live is the rarest thing in the world. Most people exist, that is all.",
    "The only way to do great work is to love what you do.",
    "If you want to live a happy life, tie it to a goal, not to people or things.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "In three words I can sum up everything I've learned about life: it goes on.",
    "If you tell the truth, you don't have to remember anything.",
    "A friend is someone who knows all about you and still loves you.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Be yourself; everyone else is already taken.",
    "Without music, life would be a mistake.",
    "The only thing necessary for the triumph of evil is for good men to do nothing.",
    "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    "The journey of a thousand miles begins with one step.",
  ];

  const favorites = [];

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  // Quote Generation
  $("#new-quote").click(function () {
    $("#quote-text").text(getRandomQuote());
  });

  // Daily Quote Refresh
  function refreshDailyQuote() {
    $("#daily-quote").text(getRandomQuote());
  }

  $("#refresh-quote").click(refreshDailyQuote);

  // Share Quote
  $(document).ready(function () {
    function shareQuote(platform) {
      const quoteText = $("#quote-text").text();
      const url = encodeURIComponent(window.location.href);
      let shareUrl = "";

      switch (platform) {
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            quoteText
          )}&url=${url}`;
          break;
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(
            quoteText
          )}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(
            quoteText
          )}`;
          break;
        case "whatsapp":
          shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
            quoteText
          )}%20${url}`;
          break;
        case "instagram":
          showNotification(
            "Instagram does not support direct sharing via URL. Please use the Instagram app."
          );
          return;
        default:
          console.error("Unsupported platform:", platform);
          return;
      }

      window.open(shareUrl, "_blank");
    }

    $("#share-twitter").click(function () {
      shareQuote("twitter");
    });

    $("#share-facebook").click(function () {
      shareQuote("facebook");
    });

    $("#share-linkedin").click(function () {
      shareQuote("linkedin");
    });

    $("#share-whatsapp").click(function () {
      shareQuote("whatsapp");
    });

    $("#share-instagram").click(function () {
      shareQuote("instagram");
    });
  });

  // Function to show notification
  function showNotification(message) {
    const $notification = $("#notification-message");
    $notification.text(message);
    $notification.show();
    $notification.fadeIn();
    setTimeout(function () {
      $notification.fadeOut();
    }, 2000);
  }

  // Add to Favorites
  $("#add-to-favorites").click(function () {
    const quote = $("#quote-text").text();
    if (quote && !favorites.includes(quote)) {
      favorites.push(quote);
      updateFavoritesList();
      showNotification("Quote added to favorites!");
    }
  });

  $("#add-daily-to-favorites").click(function () {
    const quote = $("#daily-quote").text();
    if (quote && !favorites.includes(quote)) {
      favorites.push(quote);
      updateFavoritesList();
      showNotification("Quote added to favorites!");
    }
  });

  // clear from Favorites
  $("#clear-favorites").click(function () {
    favorites.length = 0;
    updateFavoritesList();
  });

  // update Favorites
  function updateFavoritesList() {
    const $favoritesList = $("#favorites-list");
    $favoritesList.empty();
    favorites.forEach(function (favorite) {
      $favoritesList.append(`<li>${favorite}</li>`);
    });
    $("#clear-favorites").toggle(favorites.length > 0);
  }

  // Quote Submission
  $("#quote-form").submit(function (event) {
    event.preventDefault(); // Prevents the default form submission

    const quote = $("#user-quote").val().trim();

    if (quote) {
      // Add the new quote to the history list
      $("#history-list").append(`<li>${quote}</li>`);

      // Show clear history button if not already visible
      $("#clear-history").show();

      // Clear the textarea
      $("#user-quote").val("");
    } else {
      alert("Please enter a quote before submitting.");
    }
  });

  // Clear History
  $("#clear-history").click(function () {
    $("#history-list").empty(); // Clear the quote history list
    $(this).hide(); // Hide the clear history button
  });

  function toggleClearHistoryButton() {
    $("#clear-history").toggle($("#history-list li").length > 0);
  }

  // Initial calls
  toggleClearHistoryButton();
  updateFavoritesList(); // Initial call to toggle the visibility of the clear favorites button
});
