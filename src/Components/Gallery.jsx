import React from 'react'
import styled from 'styled-components'
// import FrostedBackground from './Shared/FrostedBackground'

import imageTentSolo from '../Assets/mainDSC00103.JPG'
import imagePinkField from '../Assets/DSC00009.JPG'
import imageLake from '../Assets/DSC_1663.JPG'
import imageStorm from '../Assets/DSC_1540.JPG'
import imageTent from '../Assets/DSC_1347.JPG'

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    min-height:100vh;
   
    ${'' /* background-color: #D4DBD4; */}
    background-color:rgba(239,239,239,0.8);
   
    ${'' /* margin: 1rem auto 1rem auto;
    padding:2rem; */}
 

    @media screen and (min-width: 600px){
      
       
    }

`
const Image = styled.img`

    height: 10rem;
    width:10rem;
    margin:1rem;
    transition: transform .5s ;

    ${'' /* box-shadow: 0px 1px 3px 3px #9D9D9D; */}
   
   

   &:hover {
       transform: scale(2, 1.2);
       ${'' /* box-shadow: 0px 1px 23px 12px #9D9D9D; */}
   }

    @media screen and (min-width: 600px){

        &:hover {
            transform: scale(4, 2.5);
        }

    }
`

const Gallery = () => {

    return (
   
                 <Wrapper ontouchstart="">
            <Image src={imageTentSolo}></Image>
            <Image src={imagePinkField}></Image>
            <Image src={imageLake}></Image>
            <Image src={imageStorm}></Image>
            <Image src={imageTent}></Image>


        </Wrapper>


        
   
    )

}

export default Gallery