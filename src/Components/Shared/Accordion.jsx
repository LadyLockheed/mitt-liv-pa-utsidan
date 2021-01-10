import React, {useState} from 'react'
import styled from 'styled-components'
import { AllEquipment } from '../../GlobalStates';
import { useRecoilValue } from 'recoil';
import dropDownArrow from '../../Assets/dropdownarrow.svg'
import editIcon from '../../Assets/editIcon.svg'
import trashcanIcon from '../../Assets/trashcanIcon.svg'

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
    margin: 1rem 2rem 2rem 2rem;

`;
const ItemWrapper = styled.div`

    display: grid;
    grid-template-columns: 1fr 1fr;
    padding:0rem 1rem 0rem 1rem;

    &:nth-child(odd) {
        background-color:${props => props.theme.white};
    }
    &:nth-child(even) {
        background-color:${props => props.theme.grey};
    }
    &:first-child {
        border-radius:5px 5px 0px 0px;
    }
    &:last-child {
        border-radius:0px 0px 5px 5px;
    }

`;

const TopRowWrapper = styled.div` 
    grid-column: 1/4;

    ${'' /* grid-row:1/2; */}
    display: grid;
    grid-template-columns: repeat(14, 1fr);
    align-items: center;
    ${'' /* margin: auto 1rem; */}
`
const CategoryDot=styled.div` 
    
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 6px;
    display: inline-block;
    grid-column: 1/2;

    background-color: ${(prop) => 
        {
            if(prop.categoryColor === 'living') return '#D38324';

            if(prop.categoryColor === 'clothes') return '#67C070';

            if(prop.categoryColor === 'sleeping') return '#678AC0';

            if(prop.categoryColor === 'fun') return '#BF67C0'

            if(prop.categoryColor === 'cooking') return '#6E67C0'

            if(prop.categoryColor === 'electronics') return '#C0B267'

            if(prop.categoryColor === 'hygiene') return '#67C0B0'

            if(prop.categoryColor === 'storage') return '#D15933'

            if(prop.categoryColor === 'other') return '#BABCAB'

        }

    };
`
const Name = styled.p`
    color: ${props=> props.theme.black};
    text-align: left;
    grid-column: 2/12;
    font-weight: bold;
 
`; 
const Weight = styled.p` 
    color: ${props=> props.theme.black};
    grid-column: 12/13;

`;
const DropDownArrow = styled.img`
    height: 0.7rem;
    width: auto;
    justify-self: end;
    grid-column: 13/15;
   
    padding: 0.5rem 0rem 0.5rem 0.5rem;

    &:hover {
        cursor: pointer;
    }
 
`;
const BottomRowWrapper = styled.div` 
   
    grid-column: 1/3;
    display:grid;
    grid-template-columns: 6fr 1fr;
    margin-bottom: 0.6rem;
    
`;
const Info = styled.div`
    border: 1px solid #E2E2E2;
    border-radius: 5px;
    box-shadow: 4px 4px 4px 1px rgba(197,197,197,0.30);
    text-align: left;
    padding: 0.5rem;
    background-color: ${props=> props.theme.beige};
    margin-left: 1.5rem;
    

`;
const IconWrapper = styled.div`
    margin-top: 0.2rem;
    display: grid;
    justify-content: end;
    max-height: 3.5rem;
 

`

const TrachcanIcon = styled.img`
    height: 1.5rem;
    width: auto;
    margin-bottom: 0.5rem;

`;
const EditIcon = styled.img`
    height: 1.2rem;
    width: auto;
   
`;



const Accordion=()=>{

    const allEquipment=useRecoilValue(AllEquipment)
    const [ open, setOpen ] = useState(true);
    const handleClick = () => {
        console.log('cklick')
    };
   

    return(

       
       <Wrapper>
        {allEquipment.map((item, index)=>{
            return (
                    <ItemWrapper key={item.equipment+index}>
                        <TopRowWrapper>
                            <CategoryDot categoryColor={item.category}></CategoryDot>
                            <Name>{item.equipment}</Name>
                            <Weight>{item.weight}g</Weight>
                            <DropDownArrow src={dropDownArrow} onClick={handleClick}></DropDownArrow>
                        </TopRowWrapper>
                        {open &&
                        
                        <BottomRowWrapper>
                            <Info>{item.info}</Info>
                            <IconWrapper>
                                <TrachcanIcon src={trashcanIcon}></TrachcanIcon>
                                <EditIcon src={editIcon}></EditIcon>
                            </IconWrapper>
        
                        </BottomRowWrapper>
                    }
            
        
                    </ItemWrapper>
                )
        })}

          

       </Wrapper>


      
    )
}


export default Accordion


// const Accordion=({items, ...props})=>{

//     const [isOpened, setIsOpened]=uesState({})

//     const toggleIsOpened=(index)=>()=>{
//         setIsOpened(prevState=>({...prevState, [index]: !prevState[index]}));
//     }

//     return(

//         <Container {...props}>

//         {items.map((item, index)=>(

//             <li key={item.title}>
//                 <QuestionDiv>

//                     <TitleQueistion onClick={toggleIsOpened(index)}>
//                         <Text>{item.title}</Text>
//                         <Arrow isOpen={isOpened[index]}>
//                             <ArrowDown/>
//                         </Arrow>
//                     </TitleQueistion>
//                     <Collapse isOpened={isOpened[index] || false}>

//                         <TextQuestion className='gfgfd'></TextQuestion>
//                     </Collapse>
//                 </QuestionDiv>


//             </li>
//         ))}


//         </Container>
//     )
// }



