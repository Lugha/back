export default ({ room, roundTotal = 3, stageTotal = 5, socket1, socket2 }) => {
  return {
    room,
    active: true,
    actualStage: 1,
    actualRound: 1,
    roundTotal,
    waitingNextStage: 0,
    stageType: null,
    stageData: {},
    stageFailed: false,
    player1: {
      socket: socket1,
      stageSubmited: false
    },
    player2: {
      socket: socket2,
      stageSubmited: false
    }
  };
};
