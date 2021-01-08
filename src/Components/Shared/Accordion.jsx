import React, {useState} from 'react'
import styled from 'styled-components'
import { AllEquipment } from '../../GlobalStates';
import { useRecoilValue } from 'recoil';
import dropDownArrow from '../../Assets/dropdownarrow.svg'

// const AccordionWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     background-color: var(--Secondary-color-dark);
//     border-radius: 10px;
//     height: auto;
//     padding: 2%;
//     text-align: center;
//     transition: all 0.6s ease-in-out;
// `;

// const InternalWrapper = styled.div`
//     width: 100%;
//     max-height: ${(props) => (props.open ? '100%' : '0')};
//     ${'' /* transition: all 1s ease-in-out; */}
//     overflow: hidden;
// `;

const Wrapper = styled.div`
    margin:2rem;

`;
const ItemWrapper = styled.div`

    display:grid;
    grid-template-columns:1fr 1fr;
    grid-template-rows:1fr 1fr 1fr;

    &:nth-child(odd){
        background-color:${props => props.theme.white};
    }
    &:nth-child(even){
        background-color:${props => props.theme.grey};
    }
    &:first-child{
        border-radius:5px 5px 0px 0px;
    }
    &:last-child{
        border-radius:0px 0px 5px 5px;
    }

`;

const TopRowWrapper = styled.div` 
    grid-column:1/4;
    grid-row:1/2;
    display:grid;
    grid-template-columns:repeat(12, 1fr);
    align-items:center;
    margin: auto 1rem;
`
const Dot=styled.div` 
    
    width:0.5rem;
    height:0.5rem;
    border-radius:5px;
    display:inline-block;
    grid-column:1/2;

    background-color: ${(prop) => 
        {
            if(prop.categoryColor === 'living') return '#D38324';

            if(prop.categoryColor === 'clothes') return '#67C070';

            if(prop.categoryColor === 'sleeping') return '#678AC0';

            if(prop.categoryColor === 'fun') return '#BF67C0'

            if(prop.categoryColor === 'cooking') return '#6E67C0'

            if(prop.categoryColor === 'cooking') return '#6E67C0'

            if(prop.categoryColor === 'hygiene') return '#67C0B0'

            if(prop.categoryColor === 'storage') return '#D15933'

            if(prop.categoryColor === 'other') return '#BABCAB'

        }

    };
`
const Name = styled.p`
    color:${props=> props.theme.black};
    text-align:left;
    grid-column:2/10;
    font-weight:bold;

`; 
const Weight = styled.p` 
    color:${props=> props.theme.black};
    grid-column:10/11;

`;
const DropDownArrow = styled.img`
    height:0.7rem;
    width:auto;
    justify-self:end;
    grid-column:12/13;
   
    padding:0.5rem;

    &:hover{
        cursor:pointer;
    }
 
`;
const Info = styled.div`
grid-row:2/3;
border:1px solid grey;
border-radius:5px;

    box-shadow: 5px 6px 4px 1px rgba(197,197,197,0.84);
    text-align:left;
    margin: auto 1rem;
    max-width:73%;
    margin-top:0rem;

`


const Accordion=()=>{

    const allEquipment=useRecoilValue(AllEquipment)
    const [ open, setOpen ] = useState(false);
    const handleClick = () => {
        console.log('cklick')
    };
   

    return(

       
       <Wrapper>
       {allEquipment.map((item)=>{
           return (
               <ItemWrapper>
                    <TopRowWrapper>
                        <Dot categoryColor={item.category}></Dot>
                        <Name>{item.equipment}</Name>
                        <Weight>{item.weight}</Weight>
                        <DropDownArrow src={dropDownArrow} onClick={handleClick}></DropDownArrow>
                    </TopRowWrapper>
                    <Info>{item.info}</Info>
               

               
               
               </ItemWrapper>
           )
       })}

          

       </Wrapper>


      
    )
}


export default Accordion



