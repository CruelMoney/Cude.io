'use strict';
import getGhContribStats from 'github-contrib-stats'

exports = module.exports = async (store) => {
  
  //Get github contributions
  try {
    const stats = await getGhContribStats('cruelmoney');
    store = {
        ...store,
        other :
        {
            ...store.other,
            todaysContributions: stats.contributionStats.todaysContributions,
            totalContributions: stats.contributionStats.totalContributions
        }
    }
  } catch (err) {
    console.log(err)
    store = {
        ...store,
        other :
        {
            ...store.other,
            todaysContributions: "_",
            totalContributions: "_"
        }
    }

  }

  return store
  
  }

