import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import dropDownArrow from '../../Assets/dropdownarrow.svg'
import editIcon from '../../Assets/editIcon.svg'
import trashcanIcon from '../../Assets/trashcanIcon.svg'
import { allEquipmentState } from './GlobalStates'
import { useSetRecoilState } from 'recoil'
import AlertModal from './AlertModal'
import axios from 'axios'


const Wrapper = styled.div`
    margin: 1rem 1rem 2rem 1rem;
    @media screen and (min-width:600px;){
        margin: 1rem 2rem 2rem 2rem;
    }
`;
const ItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding:0rem 1rem 0rem 1rem;
    cursor:pointer;

    &:nth-child(odd) {
        background-color:#D4DBD4;
    }
    &:nth-child(even) {
        background-color:#E7EEE2;
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
    display: grid;
    grid-template-columns: repeat(14, 1fr);
    align-items: center;
   
`
const CategoryDot = styled.div` 
    
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 6px;
    display: inline-block;
    grid-column: 1/2;
    margin-right:0.7rem;
    background-color: ${(prop) => {
        if (prop.categoryColor === 'living') return '#D38324';
        if (prop.categoryColor === 'clothes') return '#67C070';
        if (prop.categoryColor === 'sleeping') return '#678AC0';
        if (prop.categoryColor === 'fun') return '#BF67C0'
        if (prop.categoryColor === 'cooking') return '#6E67C0'
        if (prop.categoryColor === 'electronics') return '#C0B267'
        if (prop.categoryColor === 'hygiene') return '#67C0B0'
        if (prop.categoryColor === 'storage') return '#D15933'
        if (prop.categoryColor === 'other') return '#BABCAB'
    }
    };
`
const Name = styled.p`
    color: ${props => props.theme.black};
    text-align: left;
    grid-column: 2/12;
    font-weight: bold;
    font-size:0.8rem;
    
    @media screen and (min-width: 600px){
        font-size:1rem;
    }
 
`;
const Weight = styled.p` 
    color: ${props => props.theme.black};
    grid-column: 12/13;
    font-size:0.9rem;
    margin-left:0.2rem;
   
    @media screen and (min-width:350px){
        font-weight:1rem;
        
    }
`;
const DropDownArrow = styled.img`
    height: 0.7rem;
    width: auto;
    
    grid-column: 14/15;
    transform: rotate(${props => props.isUpsideDown ? `180deg` : `0deg`});
   
    padding:${props => props.isUpsideDown ? '0.5rem 0.5rem 0.5rem 0rem' : '0.5rem 0rem 0.5rem 0.5rem'};
    &:hover {
        cursor: pointer;
    }
 
`;
const BottomRowWrapper = styled.div` 
    grid-column: 1/3;
    display: grid;
    grid-template-columns: 6fr 1fr;
    margin-bottom: 1rem;
    
`;
const Info = styled.div`
    border: 1px solid #E2E2E2;
    border-radius: 3px;
    box-shadow: 4px 4px 4px 1px rgba(197,197,197,0.30);
    text-align: left;
    padding: 0.5rem;
    background-color: #F5F8F4;
   
    @media screen and (min-width: 600px;){
        margin-left: 1.5rem;
    }
    
`;
const IconWrapper = styled.div`
    margin-top: 0.2rem;
    display: grid;
    justify-content: end;
    margin-right:0.4rem;
    
`;
const EditIcon = styled.img`
    height: 1.2rem;
    width: auto;
    margin-bottom: 1rem;
   
    
`;
const TrachcanIcon = styled.img`
    height: 1.5rem;
    width: auto;
    align-self:end;
    
`;

const Accordion = ({ equipmentList }) => {

    const [expandedItems, setExpandedItems] = useState([]);
    const [displayModal, setDisplayModal] = useState(false)

    const  setAllEquipment = useSetRecoilState(allEquipmentState)



    useEffect(() => {
        //skapar kopia av allEquipment så att ändringarna inte sker i originallistan
        setExpandedItems(equipmentList.map(equipment => {

            return { ...equipment, isExpanded: false }
        }))

    }, [equipmentList])

    const toggleOpen = (item) => {
        setDisplayModal(false);
        setExpandedItems(expandedItems.map((equipment) => {

            if (equipment !== item) {
                return equipment
            } else {
                return { ...equipment, isExpanded: !equipment.isExpanded }
            }

        }))
    }

    async function deleteEquipment(id) {
     
        try {
            const response = await axios.delete('/api/deleteEquipment', { data: { _id: id } })
            console.log(response)
            getAllEquipment();
       
        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)
        }
    }

  
    async function getAllEquipment() {
        //TODO setIsLoading true
        try {
            const response = await axios.get('/api/allEquipment')
            
            setAllEquipment(response.data)

        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)

        }
    };

    const editEquipment = (equipment) => {


    }

    return (

        <Wrapper>
            {expandedItems.map((item, index) => {
                return (
                    <ItemWrapper key={item.equipment + index} >
                        <TopRowWrapper onClick={() => toggleOpen(item)}>
                            <CategoryDot categoryColor={item.category} />
                            <Name>{item.equipment}</Name>
                            <Weight>{item.weight}g</Weight>
                            <DropDownArrow src={dropDownArrow} isUpsideDown={item.isExpanded}></DropDownArrow>
                        </TopRowWrapper>
                        {item.isExpanded &&

                            <BottomRowWrapper>
                                <Info>{item.category} <br />{item.info}</Info>
                                <IconWrapper>

                                    <EditIcon src={editIcon} onClick={() => editEquipment(item._id)} />

                                    <TrachcanIcon src={trashcanIcon} onClick={() => deleteEquipment(item._id)}></TrachcanIcon>
                                    {/* <TrachcanIcon src={trashcanIcon} onClick={()=> setDisplayModal(!displayModal)}></TrachcanIcon> */}

                                    {/* {displayModal && 
                                    <AlertModal 
                                    setDisplayModal = {setDisplayModal} 
                                    displayModal = {displayModal}
                                    headline = {'Are u sure?'}
                                    confirmFunction = { deleteEquipment }/>
                                    } */}

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

