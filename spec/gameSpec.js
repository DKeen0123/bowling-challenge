describe('Game', function() {
  var game;
  var bowlingFrame;

  beforeEach(function() {
    bowlingFrame = {
      total: function() {
        return 8;
      },
      firstRoll: function() {
        return 3;
      },
      secondRoll: function() {
        return 5;
      }
    };
    game = new Game(bowlingFrame);
  });

  describe('.readScore', function() {
    it('gets the total score from the targeted frame', function() {
      expect(game.readScore(game.frameOne)).toBe(8);
    });
  });

  describe('.bowl', function() {
    it('bowls the first ball', function() {
      expect(game.bowl(game.frameOne)).toBe(3);
    });

    describe('.bowl already rolled first ball', function() {
      it('if the first ball has already been played, it bowls the second', function() {
        game.bowl(game.frameOne);
        game.frameOne.firstRollScore = 3;
        expect(game.bowl(game.frameOne)).toBe(5);
      });
    });
  });

  describe('.strikeTracker', function() {
    var game;
    var bowlingFrame;

    beforeEach(function() {
      bowlingFrame = {
        firstRoll: function() {
          return 10;
        },
        firstRollScore: 10
      };
      game = new Game(bowlingFrame);
    });

    it('reads if the firstRoll was a strike', function() {
      expect(game.strikeTracker(game.frameOne)).toBe(true);
    });

    it('auto populates secondRollScore with 0 if it was a strike', function() {
      game.strikeTracker(game.frameOne);
      expect(game.frameOne.secondRollScore).toBe(0);
    });
  });
});
