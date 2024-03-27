import Koa from 'koa';
import { faker, fakerZH_TW } from '@faker-js/faker';
import Router from '@koa/router';
import { koaBody } from 'koa-body';

const app = new Koa();
const router = new Router();

fakerZH_TW.seed(5);

const data = Array.from(new Array(40), (_, index) => {
  return {
    gender: fakerZH_TW.person.sexType(),
    fullName: fakerZH_TW.person.fullName(),
    id: index,
  };
});

let pollingCount = 0;

router.get('/list', async (ctx, next) => {
  if (ctx.request.query?.gender) {
    console.log(ctx.request.query?.gender);
    ctx.body = data.filter((d) => d.gender === ctx.request.query?.gender);
  } else {
    ctx.body = data;
  }

  await next();
});

router.post('/list', async (ctx, next) => {
  console.log('/list', ctx.request.query);
  if (ctx.request.query?.fail === 'true') return;
  const id = ctx.request.query?.id;
  console.log('post', ctx.request.body, id);
  if (!Number.isNaN(+id)) {
    const newDatum = { ...data[id], ...ctx.request.body };

    data[id] = newDatum;

    ctx.body = newDatum;
    await next();

  }

});

const queue = [];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
await delay(1000); /// waiting 1 second.

app
  .use(koaBody())
  .use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (ctx.method === 'OPTIONS') {
      ctx.status = 200;
    } else {
      await next();
    }
  })
  .use(async (ctx, next) => {
    console.log('polling', ctx.request.query);
    if (!ctx.request.query?.polling) {
      pollingCount = 0;
      await next();
      return;
    }

    if (
      ctx.request.query?.polling &&
      +ctx.request.query?.polling > pollingCount
    ) {
      pollingCount++;
    } else {
      pollingCount = 0;
      await next();
    }
  })
 

  .use(async (ctx, next) => {
    console.log('test');
    await Promise.all(queue);
    console.log('wait', +ctx.request.query?.wait);
    queue.push(delay(+ctx.request.query?.wait));
    await Promise.all(queue);
    await next();
    console.log('test end');
  })
  .use(router.routes())
  .listen(3000);
