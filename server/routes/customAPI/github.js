'use strict';
const requestify = require('requestify');
const cheerio = require('cheerio');
const moment = require('moment');

exports.get = async function (req, res, next) {
    try {
        const data = await getContributionStats("CruelMoney")
        return res.send(JSON.stringify(data))        
       
      } catch (err) {
          console.log(err)
        return next('error fetching github stats', err);
      }
}

const isoDate = date => moment(date).format('YYYY-MM-DD');

// getContributionss()
async function getContributions(username, toDate) {
    const res = await requestify.get(`https://github.com/users/${username}/contributions?to=${isoDate(toDate)}`);
    const $ = cheerio.load(res.getBody());
    const fromDate = moment(toDate).subtract(1, 'd');
    const data = [];
    let contributions = 0;
    let date;
    let count;
  
    $('.day').each((_, e) => {
      date = $(e).data('date');
      count = parseInt($(e).data('count'), 10);
      if (moment(date).unix() > fromDate.unix()) {
        data.push({ date, count });
        contributions += count;
      }
    });
  
    return { data, count: contributions };
  }


  // getContributionStats()
async function getContributionStats(username) {
    let fromDate = new Date() 
    fromDate.setDate(fromDate.getDate() - 7);
    fromDate = moment(fromDate).startOf('d');
    let toDate = moment(new Date()).startOf('d');
    let totalContributions = 0;
    let contributions;
    let data = [];
  
    while (toDate.unix() > fromDate.unix()) {
      contributions = await getContributions(username, toDate);
      totalContributions += contributions.count;
      toDate = toDate.subtract(1, 'd').startOf('d');
    }
  
    return totalContributions;
  }