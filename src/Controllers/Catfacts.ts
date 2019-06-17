import { Request, Response } from "express";
import { SlackRequest, SlackResponse } from '../interfaces';
import { pluck, weightedPluck, randomInt } from "ossuary/dist/lib/Random";
import Parser from "ossuary/dist/lib/Parser";
import config from '../config';
import dictionary from '../dictionary';

enum Command {
  Help = 'help',
  Unsubscribe = 'unsubscribe',
  Cancel = 'cancel',
  Snowden = 'snowden'
}

class Catfacts {

  private parser: Parser;

  constructor () {
    this.parser = new Parser(dictionary);
  }

  /**
   * This does all the route handling and magic stuff happens
   * @param req 
   * @param res 
   */
  async handle (req: Request, res: Response): Promise<void> { // < This has to resolve a promise according to some dumb stuff
    const body: SlackRequest = req.body;
    // String all string-quoted
    let { text } = body;
    let options = text.split(' ');
    let response: SlackResponse;

    let command = '';
    if (options[0]) {
      command = options[0].toLowerCase().trim();
    }

    switch (command) {
      case Command.Help:
      response = {
        text: this.parser.recursiveslyParse(`[help]`),
        response_type: "ephemeral"
      };
        break;
      case Command.Unsubscribe:
      case Command.Cancel:
        response = {
          text: this.parser.recursiveslyParse(`[cancel]`),
          response_type: "ephemeral"
        };
        break;
      case Command.Snowden:
        response = {
          text: this.parser.recursiveslyParse(`[snowden]`),
          response_type: "in_channel"
        };
        break;
      default:
        response = {
          text: this.parser.recursiveslyParse(`[facts|quotes]`),
          response_type: "in_channel"
        };
    }
    res.json(response);
  }

}

export default Catfacts;
