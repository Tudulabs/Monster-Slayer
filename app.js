function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      rounds: [],
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  methods: {
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },

    surrender() {
      this.winner = "Monster";
    },
    newGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.rounds = [];
      this.winner = null;
      this.addLogMessage("Game", "Started");
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomInt(5, 12);
      this.monsterHealth -= attackValue;
        this.addLogMessage("Player", "Attack", attackValue);
      this.attackPlayer();

      console.log(`Player hits monster for ${attackValue}`);
      console.log(`Monster health: ${this.monsterHealth}`);
      console.log(`Player health: ${this.playerHealth}`);
    },
    attackPlayer() {
      const attackValue = getRandomInt(8, 15);
      this.playerHealth -= attackValue;
        this.addLogMessage("Monster", "Attack", attackValue);
      console.log(`Monster hits player for ${attackValue}`);
    },
    specialAttack() {
      this.currentRound++;

      const attackValue = getRandomInt(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage("Player", "Special Attack", attackValue);

      console.log(`Player hits monster for ${attackValue}`);
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomInt(10, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
        console.log(`Player heals for ${healValue}`);
      }
        this.addLogMessage("Player", "Heal", healValue);
      this.attackPlayer();
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return {
          width: "0%",
          backgroundColor: "green",
        };
      }
      return {
        width: `${this.monsterHealth}%`,
      };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return {
          width: "0%",
          backgroundColor: "red",
        };
      }
      return {
        width: `${this.playerHealth}%`,
      };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "Draw";
        console.log("Draw");
      } else if (value <= 0) {
        this.winner = "Monster";
        console.log(this.winner);
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "Player";
        console.log("Player wins");
        console.log(this.winner);
      }
    },
  },
}).mount("#game");
