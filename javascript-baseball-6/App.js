import { Console, Random } from '@woowacourse/mission-utils';
import {
  GAME_RULES,
  GAME_MESSAGES,
  USER_INPUT,
  ERROR_MESSAGES,
} from './constants.js';
import { CustomError } from './CustomError.js';

class App {
  async play() {
    Console.print(GAME_MESSAGES.GAME_START);

    await this.gameFlow();
  }

  async gameFlow() {
    while (true) {
      const COMPUTER_ANSWER = this.createComputerAnswer();
      let doesUserWin = false;

      do {
        doesUserWin = await this.checkUserGuess(COMPUTER_ANSWER);
      } while (!doesUserWin);

      const userRestartNumberInput = await this.getUserRestartNumberInput();
      if (userRestartNumberInput === USER_INPUT.VALID_RESTART_OPTIONS[1]) break;
    }
  }

  async getUserNumbersInput() {
    const answer = await Console.readLineAsync(USER_INPUT.USER_GUESS_PROMPT);
    const UserNumbersInput = [...answer];

    this.isValidated(UserNumbersInput);

    return UserNumbersInput.map(char => parseInt(char, 10));
  }

  isValidated = UserNumbersInput => {
    if (UserNumbersInput.length !== GAME_RULES.NUM_DIGITS) {
      throw new CustomError(
        'InvalidInputLength',
        ERROR_MESSAGES.INVALID_USER_INPUT_LENGTH,
      );
    }
    if (UserNumbersInput.some(char => isNaN(parseInt(char, 10)))) {
      throw new CustomError(
        'InvalidInputNotNumber',
        ERROR_MESSAGES.INVALID_USER_INPUT_NOT_NUMBER,
      );
    }

    const uniqueDigits = new Set(UserNumbersInput);
    if (uniqueDigits.size !== GAME_RULES.NUM_DIGITS) {
      throw new CustomError(
        'InvalidInputDuplicate',
        ERROR_MESSAGES.INVALID_USER_INPUT_DUPLICATE,
      );
    }
  };

  createComputerAnswer = () => {
    const computerAnswer = [];
    while (computerAnswer.length < GAME_RULES.NUM_DIGITS) {
      let randomNum = Random.pickNumberInRange(
        GAME_RULES.RANDOM_NUMBER_RANGE.min,
        GAME_RULES.RANDOM_NUMBER_RANGE.max,
      );

      if (!computerAnswer.includes(randomNum)) computerAnswer.push(randomNum);
    }
    return computerAnswer;
  };

  checkStrikeOrBall = (userGuess, computerAnswer) => {
    let strikeCount = 0;
    let ballCount = 0;

    for (let i = 0; i < userGuess.length; i++) {
      if (userGuess[i] === computerAnswer[i]) {
        strikeCount += 1;
        continue;
      }
      if (computerAnswer.includes(userGuess[i])) {
        ballCount += 1;
      }
    }

    return { strikeCount, ballCount };
  };

  printGuessResult = ({ strikeCount, ballCount }) => {
    switch (true) {
      case strikeCount === 3:
        Console.print(GAME_MESSAGES.GAME_END);
        break;
      case ballCount === 0 && strikeCount === 0:
        Console.print('낫싱');
        break;
      case ballCount === 0:
        Console.print(`${strikeCount}스트라이크`);
        break;
      case strikeCount === 0:
        Console.print(`${ballCount}볼`);
        break;
      default:
        Console.print(`${ballCount}볼 ${strikeCount}스트라이크`);
    }
  };

  // 사용자의 입력을 받고 체크하는 과정의 함수
  async checkUserGuess(computerAnswer) {
    let userGuess = await this.getUserNumbersInput();
    let guessResult = this.checkStrikeOrBall(userGuess, computerAnswer);
    this.printGuessResult(guessResult);
    if (guessResult.strikeCount === 3) {
      return true;
    }
    return false;
  }

  async getUserRestartNumberInput() {
    const answer = await Console.readLineAsync(USER_INPUT.RESTART_PROMPT);

    if (!USER_INPUT.VALID_RESTART_OPTIONS.includes(Number(answer))) {
      throw new Error(ERROR_MESSAGES.INVALID_RESTART_INPUT);
    }
    return Number(answer);
  }
}

export default App;
