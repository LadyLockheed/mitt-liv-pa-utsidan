import { atom } from "recoil";




export const isAuthenticatedState = atom({
  key:'isAuthenticatedState',
  default:false
})

export const ongoingAddingAdventure = atom({
  key:'ongoingAddingAdventure',
  default:{}

})



export const Adventures = atom({
  key:'Adventures',
  default:[
    {
      adventureName: 'Kungsleden 2019',
      season: 'summer',
      distance: '150',
      days: '14.5',
      weight:'20',
      notes: 'Långt, ont i fötterna',
      dateStarting: '02-07-2018',
      dateAdded: '02-07-2018',
      packinglist:[
        {equipment:'Sovsäck Marmot Never Summer',
        category:'sleeping',
        weight:1002,
        info:'Väldigt fluffig. Orange färg. Billigare än sommarsäcken'
        },
        {equipment:'Tält Unna',
        category:'living',
        weight:2400,
        info:'Bästa tältet. 4 säsongers, går att vika undan golvet om man behöver plats för blöt utrustning. Sätt i tältbågen närmast öppningen först.fdfdsfds gfgfgfdgf gdfgfdgf gfdgfdg gfd gfdg fdg fdgfd gf fgd gfd gfd gfd gfd gfd fgfdgfdgfd gfd gfdgfd gfdgfdgfd fdgfd gg dfgfd gfdg df'
        },
        {equipment:'Optimus Crux Weekend kök',
        category:'cooking',
        weight:420,
        info:'Packa allting i nätförvaringspåsen.'
        }
      ]

    },
    {
      adventureName: 'Svartedalen',
      season: 'winter',
      distance: '0',
      days: '1',
      weight:'13',
      notes: 'Fina stigar',
      dateStarting: '12-12-2020',
      dateAdded: '02-07-2018',
      packinglist:[
        {equipment:'Turkos hoodie',
        category:'clothes',
        weight:520,
        info:'Skön att ha vår, sommar, höst.'
        },
        {equipment:'Läsplatta',
        category:'fun',
        weight:230,
        info:'Svinbra läsplatta i tältet. Får ej glömma denna'
        },
        {equipment:'Ryggsäck Osprey Aegis 65 liter',
        category:'storage',
        weight:2600,
        info:'Smidigt att dra ut sovsäcken genom öppningen ner. Läcker in i sömmarna.'
        }
      ]

    },
    {
      adventureName: 'Vildmarksleden',
      season: 'spring',
      distance: '42',
      days: '2',
      weight:'16',
      notes: 'Tradition att gå här varje vår',
      dateStarting: '03-05-2019',
      dateAdded: '02-07-2018',
      packinglist:[
        {equipment:'Turkos hoodie',
        category:'clothes',
        weight:520,
        info:'Skön att ha vår, sommar, höst.'
        },
        {equipment:'Läsplatta',
        category:'fun',
        weight:230,
        info:'Svinbra läsplatta i tältet. Får ej glömma denna'
        },
        {equipment:'Ryggsäck Osprey Aegis 65 liter',
        category:'storage',
        weight:2600,
        info:'Smidigt att dra ut sovsäcken genom öppningen ner. Läcker in i sömmarna.'
        }
      ]

    },
    {
      adventureName: 'Bohusleden',
      season: 'autumn',
      distance: '15',
      days: '1',
      weight: '13',
      notes: 'Första tältplatsen på kartan var en bra tältplats',
      dateStarting: '03-10-2019',
      dateAdded: '02-07-2018',
      packinglist:[
        {equipment:'Turkos hoodie',
        category:'clothes',
        weight:520,
        info:'Skön att ha vår, sommar, höst.'
        },
        {equipment:'Läsplatta',
        category:'fun',
        weight:230,
        info:'Svinbra läsplatta i tältet. Får ej glömma denna'
        },
        {equipment:'Ryggsäck Osprey Aegis 65 liter',
        category:'storage',
        weight:2600,
        info:'Smidigt att dra ut sovsäcken genom öppningen ner. Läcker in i sömmarna.'
        }
      ]

    }

  ]
})

export const AllEquipment = atom({
  key:'AllEquipment',
  default:[
    {equipment:'Sovsäck Marmot Never Summer',
    category:'sleeping',
    weight:1002,
    info:'Väldigt fluffig. Orange färg. Billigare än sommarsäcken',
    id: 1
    },
    {equipment:'Tält Unna',
    category:'living',
    weight:2400,
    info:'Bästa tältet. 4 säsongers, går att vika undan golvet om man behöver plats för blöt utrustning. Sätt i tältbågen närmast öppningen först. Går bra att koppla loss ena hörnet  på innertältet för att laga mat i dåligt väder eller lägga blöta saker där. Torka av insidan av yttertält, plocka isär inner och ytter vid nedpackning.',
    id: 2
    },
    {equipment:'Optimus Crux Weekend kök',
    category:'cooking',
    weight:420,
    info:'Packa allting i nätförvaringspåsen.',
    id: 3
    },
    {equipment:'Turkos hoodie',
    category:'clothes',
    weight:520,
    info:'Skön att ha vår, sommar, höst.',
    id: 4
    },
    {equipment:'Läsplatta',
    category:'fun',
    weight:230,
    info:'Svinbra läsplatta i tältet. Får ej glömma denna',
    id: 5
    },
    {equipment:'Ryggsäck Osprey Aegis 65 liter',
    category:'storage',
    weight:2600,
    info:'Smidigt att dra ut sovsäcken genom öppningen ner. Läcker in i sömmarna.',
    id: 6
    }

  ]
  
})





