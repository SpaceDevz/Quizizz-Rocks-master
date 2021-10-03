window.open(
  `https://quizizz.rocks/?pin=${
    JSON.parse(localStorage.previousContext).game.roomCode
  }`,
  "_blank"
);
