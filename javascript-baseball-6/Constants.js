export const GAME_MESSAGES = {
  GAME_START: '숫자 야구 게임을 시작합니다.',
  GAME_END: '3스트라이크\n3개의 숫자를 모두 맞히셨습니다! 게임 종료',
  NOTHING: '낫싱',
};

export const USER_INPUT = {
  RESTART_PROMPT: '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요',
  USER_GUESS_PROMPT: '숫자를 입력해주세요 : ',
  VALID_RESTART_OPTIONS: [1, 2],
};

export const GAME_RULES = {
  NUM_DIGITS: 3,
  RANDOM_NUMBER_RANGE: { min: 1, max: 9 },
};

export const ERROR_MESSAGES = {
  INVALID_USER_INPUT_LENGTH: '[ERROR] 3개의 숫자만 입력해 주세요',
  INVALID_USER_INPUT_NOT_NUMBER: '[ERROR] 숫자만 입력해 주세요',
  INVALID_USER_INPUT_DUPLICATE:
    '[ERROR] 서로 다른 세 개의 숫자를 입력해 주세요',
  INVALID_RESTART_INPUT: '[ERROR] 1 또는 2의 숫자만 입력해 주세요.',
};
