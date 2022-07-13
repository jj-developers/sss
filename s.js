const puppeteer = require('puppeteer');
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const fs = require('fs');

const token = '5069197424:AAHgLKylLG1sY5uue8dZhVLiubisKSPDzxA';

let idchattest="-762067585"

let idchatshopee="-1001667054000";
let idchatcashback="-1001670216935";
let idchatcategorias="-1001757811260";
let idchatsinminimo="-1001658041833";
let idgrupo="-1001517029891";
let chatmin40="-1001243926874";
let chatmin200="-1708820739";

const debug=false;

if(debug){
  idchatshopee=idchattest;
  idchatcashback=idchattest;
  idchatcategorias=idchattest;
  idchatsinminimo=idchattest;
}

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  console.log(chatId);
});

l("Servidor iniciado");
cron.schedule('*/1 * * * *',async () => {

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    l("Escaneando shopee");
    const options = {
      waitUntil: 'networkidle2',
      timeout: 30000,
    };
    await page.goto('https://shopee.com.mx/m/cupones-diarios',options);
   
    await banner(page);

    const elHandleArray = await page.$$('div')

for (const el of elHandleArray) {
    const boundingBox = await el.boundingBox();
    try{
    await page.mouse.move(
      boundingBox.x + boundingBox.width / 2,
      boundingBox.y + boundingBox.height / 2
    );
    }catch(e){
      await page.waitForTimeout("1000")
    }
    await page.mouse.wheel({ deltaY: +200 })
  }

  
await getCodigos(page);
await browser.close()

})();

async function getCodigos(page){
  l("Obteniendo cupones")
  const data = await page.evaluate(() => {
    const list = []
    const items = document.querySelectorAll("article")

    for (const item of items) {
      
          const tit = item.querySelectorAll("p");
          const tit2 = item.querySelectorAll("h1");

          const spa = item.querySelectorAll("span");

          let canjeado=item.querySelector("button")?.textContent;
     if(!canjeado){
  canjeado="Canjeado por Completo"
}     
let imagen="https://cf.shopee.com.mx/file/6de058d41a7fdf4be74cb8d8998fbd01";

let idchattest="-762067585"

let idchatshopee="-1001667054000";
let idchatcashback="-1001670216935";
let idchatcategorias="-1001757811260";
let idchatsinminimo="-1001658041833";

let idchat="";

const debug=false;

if(debug){
  idchatshopee=idchattest;
  idchatcashback=idchattest;
  idchatcategorias=idchattest;
  idchatsinminimo=idchattest;
}

if(spa[0]?.innerText=="SHOPEE"){
  imagen="https://cdn.lovesavingsgroup.com/logos/shopee.png"
  idchat=idchatshopee;
}else if(spa[0]?.innerText=="ELECTRO"){
  imagen="https://cf.shopee.com.mx/file/d5c417d1edee8d33f4eb78d65b8fdca2_tn"
  idchat=idchatcategorias;

}else if(spa[0]?.innerText=="MODA"){
  imagen="https://cf.shopee.com.mx/file/f28848266831a5865e607bdb374fa9c0";
  idchat=idchatcategorias;


}else if(spa[0]?.innerText=="ESTILO DE VIDA"){
  imagen="https://cf.shopee.com.mx/file/8deb23800d9c6730a627a1397d2faa7d"
  idchat=idchatcategorias;

}else if(spa[0]?.innerText=="CONSUMO DIARIO"){
  imagen="https://cf.shopee.com.mx/file/15d3aa32a4a5f8c54f59b22f36b3c7f6"
  idchat=idchatcategorias;

}else if(spa[0]?.innerText=="CASHBACK"){
  imagen="https://cdn.lovesavingsgroup.com/logos/shopee.png"
  idchat=idchatcashback;

}


if(spa[0]?.innerText=="SHOPEE"||spa[0]?.innerText=="ELECTRO"||spa[0]?.innerText=="MODA"||spa[0]?.innerText=="ESTILO DE VIDA"
    ||spa[0]?.innerText=="CONSUMO DIARIO"||spa[0]?.innerText=="CASHBACK"
    
    ){
        list.push({
        tipo: spa[0]?.innerText,
        descuento: tit[0]?.innerText,
        descuento2: tit2[0]?.innerText,

        minimo: tit[1]?.innerText,
        usado:  spa[1]?.textContent,
        canjeado:canjeado,
        imagen:imagen,
        chat:idchat


      });

    }
    }
  
    return list
  })

  data.forEach((e,index) => {
//console.log(e)

    if(e.canjeado.includes('Conseguir')||!e.canjeado.includes('Canjeado')){
      console.log(e)

let encabezado="";
if(e.usado==undefined){
  e.usado="";
}

if(e.descuento2==undefined){
  encabezado="<b>"+e.descuento+"</b>"
}else{
  encabezado="<b>"+e.descuento2+"</b>\n\n"+
  e.descuento

}

let texto=encabezado+"\n"+
e.minimo+"\n"+"\n"+
e.usado;

    let options;

    
    options={
      caption:texto,
      parse_mode:'HTML',
      reply_markup: {
        inline_keyboard: [
            [{
                text: e.canjeado,
                url: 'https://shopee.com.mx/m/cupones-diarios'
            }], [{
              text: "Visita nuestra tienda",
              url: 'https://shopee.com.mx/takitodzuadero'
          }]
          , [{
            text: "Usa en NanoPay codigo [TC9FW8]",
            url: 'http://bit.ly/inviteNanoP'
        }]
        ]
      }
      
      } 
      

      

      if(e.minimo?.includes("MX$0")){
              bot.sendPhoto(idchatsinminimo,e.imagen,options);

            }

            

if(e.descuento?.includes("MÍNIMO DE COMPRA ")){
  if(e.descuento=="MÍNIMO DE COMPRA MX$40"){
    
    let options40;

    
    options40={
      caption:texto,
      parse_mode:'HTML',
      reply_markup: {
        inline_keyboard: [
          [{
            text: "Rastrear solo minimo $40",
            url: 'https://t.me/shopeehunters_cupon40'
        }],
            [{
                text: e.canjeado,
                url: 'https://shopee.com.mx/m/cupones-diarios'
            }], [{
              text: "Visita nuestra tienda",
              url: 'https://shopee.com.mx/takitodzuadero'
          }]
          , [{
            text: "Usa en NanoPay codigo [TC9FW8]",
            url: 'http://bit.ly/inviteNanoP'
        }]
        ]
      }
      
      } 

    bot.sendPhoto(chatmin40,e.imagen,options);
    bot.sendPhoto(e.chat,e.imagen,options40);


  }else 
  if(e.descuento=="MÍNIMO DE COMPRA MX$200"){
    let options200;

    
    options200={
      caption:texto,
      parse_mode:'HTML',
      reply_markup: {
        inline_keyboard: [
          [{
            text: "Rastrear solo minimo $200",
            url: 'https://t.me/shopeehunters_cupon200'
        }],
            [{
                text: e.canjeado,
                url: 'https://shopee.com.mx/m/cupones-diarios'
            }], [{
              text: "Visita nuestra tienda",
              url: 'https://shopee.com.mx/takitodzuadero'
          }]
          , [{
            text: "Usa en NanoPay codigo [TC9FW8]",
            url: 'http://bit.ly/inviteNanoP'
        }]
        ]
      }
      
      } 

    bot.sendPhoto(chatmin200,e.imagen,options);
    bot.sendPhoto(e.chat,e.imagen,options200);


  }else{
    bot.sendPhoto(e.chat,e.imagen,options);

  }

}else if(e.minimo?.includes("MÍNIMO DE COMPRA ")){
  if(e.minimo=="MÍNIMO DE COMPRA MX$40"){
    
    let options40;

    
    options40={
      caption:texto,
      parse_mode:'HTML',
      reply_markup: {
        inline_keyboard: [
          [{
            text: "Rastrear solo minimo $40",
            url: 'https://t.me/shopeehunters_cupon40'
        }],
            [{
                text: e.canjeado,
                url: 'https://shopee.com.mx/m/cupones-diarios'
            }], [{
              text: "Visita nuestra tienda",
              url: 'https://shopee.com.mx/takitodzuadero'
          }]
          , [{
            text: "Usa en NanoPay codigo [TC9FW8]",
            url: 'http://bit.ly/inviteNanoP'
        }]
        ]
      }
      
      } 

    bot.sendPhoto(chatmin40,e.imagen,options);
    bot.sendPhoto(e.chat,e.imagen,options40);


  }else 
  if(e.minimo=="MÍNIMO DE COMPRA MX$200"){
    let options200;

    
    options200={
      caption:texto,
      parse_mode:'HTML',
      reply_markup: {
        inline_keyboard: [
          [{
            text: "Rastrear solo minimo $200",
            url: 'https://t.me/shopeehunters_cupon200'
        }],
            [{
                text: e.canjeado,
                url: 'https://shopee.com.mx/m/cupones-diarios'
            }], [{
              text: "Visita nuestra tienda",
              url: 'https://shopee.com.mx/takitodzuadero'
          }]
          , [{
            text: "Usa en NanoPay codigo [TC9FW8]",
            url: 'http://bit.ly/inviteNanoP'
        }]
        ]
      }
      
      } 

    bot.sendPhoto(chatmin200,e.imagen,options);
    bot.sendPhoto(e.chat,e.imagen,options200);


  }else{
    bot.sendPhoto(e.chat,e.imagen,options);

  }

}
            



            
          }
  });
  l("Proceso terminado" )
}



async function banner(page){

  const data = await page.evaluate(() => {
    const list = []
  const banners = document.querySelectorAll("img")

  for (const ban of banners) {

  list.push(ban?.getAttribute("src"))
  }
  return list
  })
  fs.writeFileSync('banner.txt', data[0]);

}

})

function l(m){
  console.log(m);
}

cron.schedule('0 0 */6 * * *', () => {
  const data = fs.readFileSync('banner.txt',
            {encoding:'utf8', flag:'r'});

            let options={
              caption:"<b> Visita nuestra tienda una vez al dia.</b>\n\nEsto nos ayudara a mantener el bot en linea y asi aprovecharas todos los descuentos. \n\n<b>Mil gracias ShopeeHunters.</b> Y a cazar cupones.",
              parse_mode:'HTML',
              reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Visita nuestra tienda",
                        url: 'https://shopee.com.mx/takitodzuadero'
                    }],
                    [{
                      text: "Unete a nuestra comunidad",
                      url: 'https://t.me/shopee_cupones_grupo'
                  }],
                   [{
                    text: "Usa en NanoPay codigo [TC9FW8]",
                    url: 'http://bit.ly/inviteNanoP'
                }],
                  [{
                    text: "Cupones de temporada",
                    url: 'https://t.me/shopee_cupones'
                }],
                [{
                  text: "Cupones de cashback",
                  url: 'https://t.me/shopeehunters_cashback'
              }]
              
                    
                ]
              }
              
              } 
              bot.sendPhoto(idchatcashback,data,options)

            bot.sendPhoto(idchatshopee,data,options)
            bot.sendPhoto(idgrupo,data,options)

          });



          