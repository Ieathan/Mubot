// Description:
//   Cryptographic currency information
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   mubot swap|crypto|c [market] [amount] <coin> [coin2] [depth] a coin - Returns information about the coin(s).
//
// Author:
//   leathan

(function() {
  var CompatibleBook, Get, Loop;

  module.exports = bot => {
    var cR = {};
    bot.on('CryptoReply', function(req, mode, msg) {

      var key;
      if(key = Object.keys(req)[0]) {
        mode !== 'swap' ? cR[key] = req[key] : cR = req;
      }

      if(mode === "hack_btc_usdt") {
        if(key !== 'asks') return;
        msg.send(req[key].BTC + " BTC at current books gives you " + (+req[key].USDT).toFixed(2) + " USDT.");
      }
      else if(mode === "hack_usdt_btc") {
        if(key !== 'asks') return;
        msg.send(req[key].USDT + " USDT at current books gives you " + req[key].BTC + " BTC.");
      }
      else if(mode === "all" && Object.keys(cR).length === 3) {
        msg.send(msg.header ? cR : Object.keys(cR.bids)[0] + " price is " + cR.price + ".\n" + "People are buying " + cR.bids[Object.keys(cR.bids)[0]] + " " + Object.keys(cR.bids)[0]
            + ".  (worth " + cR.bids.BTC + " BTC)\n" + "People are selling " + cR.asks[Object.keys(cR.asks)[0]] + " " + Object.keys(cR.asks)[0] + ".  (worth " + cR.asks.BTC + " BTC)")
      } else if(mode === "depth" && Object.keys(cR).length === 2) {
        msg.send(msg.header ? cR : "Total " + Object.keys(cR.asks)[0] + " being sold at that depth is " + cR.asks[Object.keys(cR.asks)[0]] + ". (worth " + cR.asks.BTC + " BTC)\n" + "Total "
            + Object.keys(cR.bids)[0] + " being bought at that depth is " + cR.bids[Object.keys(cR.bids)[0]] + ". (worth " + cR.bids.BTC + " BTC)")
      } else if(mode === "swap") {
        msg.send(msg.header ? {[cR.target]: cR.amount} : cR.base_amount + " " + cR.base + " at current books gives you " + cR.amount + " " + cR.target + ".")
      } else if(mode === "amount" && Object.keys(cR).length === 2) {
        msg.send(msg.header ? cR : "Buying " + cR.asks[Object.keys(cR.asks)[0]] + " " + Object.keys(cR.asks)[0] + " at current books gives you " + cR.asks.BTC + " BTC.\n" + "Selling "
            + cR.bids[Object.keys(cR.bids)[0]] + " " + Object.keys(cR.bids)[0] + " at current books gives you " + cR.bids.BTC + " BTC.")
      } else return;// cR = {};
    });
    bot.on('CryptoRequest', (req, msg) => {

      if(!req.market) req.market = 'p';
      req.mode = "all";
      if(req.depth) req.mode = "depth";
      if(req.ticker2) req.mode = "swap";
      if(req.amount && !req.ticker2) req.mode = "amount";
      if(req.ticker) req.ticker = req.ticker.toUpperCase();
      if(req.ticker2 && req.ticker2 !== 'false') req.ticker2 = req.ticker2.toUpperCase();
      req.amount = req.amount;
      req.depth = req.depth;

      // If no depth is specified, use max.
      if(req.amount || !req.depth) req.depth = 999999;
      Get(req.ticker, req.depth, req.market, msg, bot, orderBook => {
        var price;
        if(orderBook.error) return;
        price = parseFloat((+orderBook.asks[0][0] + +orderBook.bids[0][0]) / 2).toFixed(8);
        if(req.mode === "all") {
          bot.emit('CryptoReply', {
            price: price
          }, req.mode, msg)
        }
        Loop(orderBook, req, msg, bot)
      })
    });
    bot.respond(/(?:crypto|c|swap) (?:-(b?p?|p?b?) )?(\d*\.?\d{0,8})? ?(\w{2,5}) ?(?:for)? ?(\d{1,6}|\w{2,5})? ?(.+)?/i, msg => {

      var depth, ticker2;
      if(/^\d{1,6}$/.test(msg.match[4])) {
        depth = msg.match[4]
      } else {
        ticker2 = msg.match[4]
      }
      bot.emit('CryptoRequest', {
        market: msg.match[1],
        ticker: msg.match[3],
        ticker2: ticker2,
        amount: msg.match[2],
        depth: depth
      }, msg)
    })
  };

  Get = (ticker, depth, market, msg, bot, cb) => {

    var marketLink;
    var tmpTicker = 'BTC'; 
    if(ticker === "BTC" || ticker === "USDT") {
      tmpTicker = "USDT";
      ticker = "BTC";
    }
    if(market === "b") marketLink = "https://bittrex.com/api/v1.1/public/getorderbook?market=BTC" + tmpTicker + "-" + ticker + "&type=both&depth=" + depth;
    else marketLink = "https://poloniex.com/public?command=returnOrderBook&currencyPair=" + tmpTicker + "_" + ticker + "&depth=" + depth;
    bot.http(marketLink, (err, resp, body) => {

      var orderBook;
      if(err) return msg.send("Error with http call.");
      if(market === "b") {
        orderBook = JSON.parse(body).result;
        if(!orderBook) return msg.send("Error, probably invalid ticker(s).");
        CompatibleBook(orderBook, orderBook => cb(orderBook))
      } else {
        orderBook = JSON.parse(body);
        if(orderBook.error) return msg.send(orderBook.error);
        cb(orderBook)
      }
    })
  };

  CompatibleBook = (orderBook, cb) => {
    var compatibleBook, compatibleKey, i, j, key;
    compatibleBook = {};
    i = 0;
    while(i < Object.keys(orderBook).length) {
      key = Object.keys(orderBook)[i];
      if(key === 'buy') {
        compatibleKey = 'bids';
      } else {
        compatibleKey = 'asks';
      }
      j = 0;
      compatibleBook[compatibleKey] = [];
      while(j < orderBook[key].length) {
        compatibleBook[compatibleKey].push([orderBook[key][j].Rate, orderBook[key][j].Quantity]);
        ++j
      }
      ++i
    }
    cb(compatibleBook)
  };

  Loop = (orderBook, req, msg, bot) => {

    var amountInBtc, cur, key, keys, reply, totalBtc, totalTicker;
    keys = Object.keys(orderBook);
    for(let i = 0, len = keys.length; i < len; ++i) {
      key = keys[i];
      if(key === 'seq' || key === 'isFrozen') continue;
      amountInBtc = totalBtc = totalTicker = 0;
      for(let i = 0, len = orderBook[key].length; i < len; ++i) {
        cur = orderBook[key][i];
        // If the amount of coins found is greater than the amount we are looking for stop looping
        // Short cut for if(totalTicker > req.amount  && req.amount !== 0) break;
        if(totalTicker >= req.amount) break;
        totalTicker = parseFloat(+totalTicker + cur[1]).toFixed(8);

        if(req.ticker === "BTC" && req.ticker2 === "USDT") {
          totalBtc = totalTicker;

        } else {
          if(req.ticker === "USDT" && req.ticker2 === "BTC") {
            totalTicker = parseFloat(+totalBtc + cur[0] * cur[1]).toFixed(8);
          } else {
            totalBtc = parseFloat(+totalBtc + cur[0] * cur[1]).toFixed(8);
          }
        }
        // This iteration causes the amount of coins found to be greater than the amount were looking for
        if(+totalTicker >= +req.amount) {
          if(req.ticker === "USDT" && req.mode === "swap" && req.ticker2 === "BTC") {
            amountInBtc = req.amount / cur[0];
            totalTicker = req.amount;
            break;
          }
          else if(req.ticker === "BTC") {
            amountInBtc = parseFloat((totalBtc - (totalTicker - req.amount)) * cur[0]).toFixed(8);
          } else {
            amountInBtc = parseFloat(totalBtc - (totalTicker - req.amount) * cur[0]).toFixed(8);
          }
          if(req.ticker2 && key === 'bids') {
            Get(req.ticker2, req.depth, req.market, msg, bot, orderBook => {
              var amountTicker2, asks, totalTicker2, cur;
              if(orderBook.error) return;
              totalBtc = totalTicker2 = amountTicker2 = 0;
              asks = orderBook.asks;
              for(let i = 0, len = asks.length; i < len; ++i) {
                cur = asks[i];
                if(+totalBtc > +amountInBtc) break;
                totalTicker2 = parseFloat(+totalTicker2 + cur[1]).toFixed(8);
                totalBtc = parseFloat(+totalBtc + cur[0] * cur[1]).toFixed(8);
                if(totalBtc >= amountInBtc) {
                  let obj = {
                    base: req.ticker,
                    base_amount: req.amount,
                    target: req.ticker2,
                    amount: parseFloat(totalTicker2 - ((totalBtc - amountInBtc) / cur[0])).toFixed(8)
                  }
                  ;
                  bot.emit('CryptoReply', obj, req.mode, msg)
                }
              }
            })
          }
        }
      }

      reply = {};
      reply[key] = {};
      if(req.ticker === "USDT" && req.mode === "swap" && req.ticker2 === "BTC") {
        reply[key]["USDT"] = totalTicker;
        reply[key]["BTC"] = amountInBtc.toFixed(8);
        req.mode = "hack_usdt_btc";
        bot.emit('CryptoReply', reply, req.mode, msg)
      }
      else if(req.ticker === "BTC") {
        reply[key]["BTC"] = req.amount;
        reply[key]["USDT"] = amountInBtc;
        req.mode = "hack_btc_usdt";
        bot.emit('CryptoReply', reply, req.mode, msg)
      } else if(req.amount && !req.ticker2) {
        reply[key][req.ticker] = req.amount;
        reply[key][req.ticker==="BTC"?"USDT":"BTC"] = amountInBtc;
        bot.emit('CryptoReply', reply, req.mode, msg)
      } else if(!req.ticker2) {
        reply[key][req.ticker] = totalTicker;
        reply[key].BTC = totalBtc;
        bot.emit('CryptoReply', reply, req.mode, msg)
      }
    }
  }
}).call(this);
