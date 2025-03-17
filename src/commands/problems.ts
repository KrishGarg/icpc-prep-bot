import { SlashCommand, CommandOptionType, SlashCreator, CommandContext, MessageEmbedOptions } from 'slash-create/web';
import { result } from '../cf.json';

const { problems } = result;

export default class BotCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'problems',
      description: 'Sends n problems from codeforces problem set to you.',
      options: [
        {
          type: CommandOptionType.INTEGER,
          name: 'n',
          description: 'Number of problems to send. MAX = 6'
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    let emb = [];
    if (ctx.options.n > 6) return 'Nuh uh';
    for (let i = 0; i < ctx.options.n; i++) {
      let prob = problems[Math.floor(Math.random() * problems.length)];
      const embopt: MessageEmbedOptions = {
        color: 0xff11ff,
        url: `https://codeforces.com/problemset/problem/${prob.contestId}/${prob.index}`,
        title: prob.name
      };
      emb.push(embopt);
    }
    return await ctx.send({ embeds: emb });
  }
}
