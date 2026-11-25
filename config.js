// Add confirmed business details here when ready. Blank fields never invent coverage or contact information.
window.BOLTZ_CONFIG = {
  businessName: 'Boltz TV Setup',
  aboutContactName: 'Michael Tyler',
  phone: '+1 (870) 293-5517',
  email: 'michaeltyler1121@gmail.com',
  serviceArea: 'Bentonville, Arkansas',
  address: {
    streetAddress: 'Southwest Juniper Avenue',
    city: 'Bentonville',
    state: 'AR',
    postalCode: '72713'
  },
  hours: '',
  bookingUrl: '',
  // TV mounting ranges supplied by the owner. Optional service rates still need confirmation.
  pricing: {
    status: 'confirmed',
    currency: 'USD',
    tv: {'32 inches and smaller':[49.99,79.99],'33 to 60 inches':[109.99,149.99],'61 to 75 inches':[149.99,179.99],'Over 75 inches':[199.99,199.99]},
    wall: {'Drywall / wood studs':0,'Brick or concrete':49,'Stone or tile':79},
    mount: {'Fixed / low profile':39,'Tilting':59,'Full motion / swivel':79,'I already have a mount':0,'Art TV / manufacturer mount':0},
    extras: {'Soundbar installation':49,'Above fireplace':49,'Frame / art TV':79},
    cables: {'Surface cable cover':39,'In-wall low-voltage routing':79}
  }
};
