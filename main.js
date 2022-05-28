const { Telegraf } = require("telegraf");

const bot = new Telegraf("5326564242:AAF5idCE2cVw4Rp6L87PLo1pRn56H_9ZzJM");

let limits = {};
let limitsTime = {};

bot.on("audio", function (ctx) {
  if (limits[ctx.from.id]) {
    limits[ctx.from.id]++;
  } else {
    limits[ctx.from.id] = 1;
  }

  limitsTime[ctx.from.id] = new Date();

  if (
    limits[ctx.from.id] > 1 &&
    Math.abs(limitsTime[ctx.from.id] - new Date()) < 432000
  ) {
    bot.telegram.sendMessage(
      ctx.from.id,
      "Вы уже прислали музыку. На сегодня хватит"
    );
    ctx.deleteMessage(ctx.message.message_id);
  }
});

bot.on("message", function (ctx) {
  ctx.deleteMessage(ctx.message.message_id);
});

bot.launch();
