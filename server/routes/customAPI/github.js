'use strict';
const getGhContribStats = require( 'github-contrib-stats')

exports.get = async function (req, res, next) {
    try {
        const stats = await getGhContribStats('cruelmoney');
        const data = 
            {
                todaysContributions: stats.contributionStats.todaysContributions,
                totalContributions: stats.contributionStats.totalContributions
            }
        return res.send(JSON.stringify(stats))
       
      } catch (err) {
        return next('error fetching github stats', err);
      }
}