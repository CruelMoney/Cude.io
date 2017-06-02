'use strict';
const getGhContribStats = require( 'github-contrib-stats')

exports = module.exports = async (store) => {
  
  //Get github contributions
  try {
    const stats = await getGhContribStats('cruelmoney');
    store.other = 
        {
            todaysContributions: stats.contributionStats.todaysContributions,
            totalContributions: stats.contributionStats.totalContributions
        }
   
  } catch (err) {
    console.log(err)
    store.other = 
        {
            todaysContributions: "_",
            totalContributions: "_"
        }
  }

  return store
  
  }

