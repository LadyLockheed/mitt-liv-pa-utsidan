import React, {useState} from 'react'
import Accordion from '../Shared/Accordion'
import FrostedBackground from '../Shared/FrostedBackground'


const AllEquipment=()=>{
    const [isAuthenticated, setIsAuthenticated]=useState(false)
    console.log('all utrustning')
    return(
        <div>AllEquipment
        <FrostedBackground headline={'All utrustning'}>
            
            <Accordion/>
        </FrostedBackground>
        
        </div>
    )
}

export default AllEquipment