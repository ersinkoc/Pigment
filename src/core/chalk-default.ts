import { Chalk as ChalkClass } from './chalk.js';

const chalk = new ChalkClass();
chalk.level = chalk.supportsColor.level;

export { ChalkClass as Chalk };
export default chalk;
