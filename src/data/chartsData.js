export const amplificationData = {
  spikes: [
    { date: 'Mon', value: 45 },
    { date: 'Tue', value: 52 },
    { date: 'Wed', value: 38 },
    { date: 'Thu', value: 65 },
    { date: 'Fri', value: 59 },
    { date: 'Sat', value: 72 },
    { date: 'Sun', value: 48 }
  ],
  
  botClusters: [
    { name: 'Bot Networks', value: 45 },
    { name: 'Real Users', value: 35 },
    { name: 'Suspicious', value: 20 }
  ],
  
  coordinationHeatmap: [
    { hour: '00-04', activity: 23 },
    { hour: '04-08', activity: 45 },
    { hour: '08-12', activity: 67 },
    { hour: '12-16', activity: 89 },
    { hour: '16-20', activity: 78 },
    { hour: '20-24', activity: 56 }
  ],
  
  hashtagSpam: [
    { tag: '#trending', count: 2345, fake: 1567 },
    { tag: '#viral', count: 1890, fake: 1234 },
    { tag: '#foryou', count: 3456, fake: 2789 },
    { tag: '#love', count: 1234, fake: 567 },
    { tag: '#instagood', count: 2341, fake: 890 }
  ]
};

export const platformCoverage = {
  instagram: {
    aiMedia: 34,
    fakeAds: 23,
    botCampaigns: 45
  },
  youtube: {
    aiMedia: 28,
    fakeAds: 19,
    botCampaigns: 32
  },
  facebook: {
    aiMedia: 31,
    fakeAds: 27,
    botCampaigns: 38
  },
  twitter: {
    aiMedia: 42,
    fakeAds: 31,
    botCampaigns: 52
  }
};