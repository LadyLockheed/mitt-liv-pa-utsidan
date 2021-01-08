import { atom } from "recoil";
import {useEffect} from 'react'

export const currentContactState = atom({
  key: "currenContactState",
  default: 1,
});

export const isAuthenticatedState = atom({
  key:'isAuthenticatedState',
  default:true
})

export const AllEquipment = atom({
  key:'AllEquipment',
  default:[
    {equipment:'Sovsäck Marmot Never Summer',
    category:'sleeping',
    weight:1002,
    info:'Väldigt fluffig. Orange färg. Billigare än sommarsäcken'
    },
    {equipment:'Tält Unna',
    category:'living',
    weight:2400,
    info:'Bästa tältet. 4 säsongers, går att vika undan golvet om man behöver plats för blöt utrustning. Sätt i tältbågen närmast öppningen först.'
    },
    {equipment:'Optimus Crux Weekend kök',
    category:'cooking',
    weight:420,
    info:'Packa allting i nätförvaringspåsen.'
    },
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
  
})





