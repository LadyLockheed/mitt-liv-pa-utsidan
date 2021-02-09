import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

//globalstates
import { allEquipmentState } from './GlobalStates'
import { useSetRecoilState } from 'recoil'

//images
import dropDownArrow from '../../Assets/dropdownarrow.svg'
import editIcon from '../../Assets/editIcon.svg'
import trashcanIcon from '../../Assets/trashcanIcon.svg'

//components
import AlertModal from './AlertModal'
import EditEquipment from '../Equipment/EditEquipment'
import SpinnerFireLog from './SpinnerFireLog'


const Wrapper = styled.div`
   
    max-height: 61vh;
    overflow:scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
    border-radius: 3px;
  
    @media screen and (min-width:600px;){
        ${'' /* margin: 1rem 2rem 2rem 2rem; */}
        
    }
`;
const ItemWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding:0rem 1rem 0rem 1rem;
    cursor:pointer;
    position: relative;

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
`;

const CheckBox = styled.input`

    height: 20px;
    width: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    display: inline-block;
    grid-column: 1/2;
    margin-right:0.7rem;
    border:3px solid ${(prop) => {
        if (prop.categoryColor === 'living') return '#D38324';
        if (prop.categoryColor === 'clothes') return '#67C070';
        if (prop.categoryColor === 'sleeping') return '#678AC0';
        if (prop.categoryColor === 'fun') return '#BF67C0'
        if (prop.categoryColor === 'cooking') return '#6E67C0'
        if (prop.categoryColor === 'electronics') return '#C0B267'
        if (prop.categoryColor === 'hygiene') return '#67C0B0'
        if (prop.categoryColor === 'storage') return '#D15933'
        if (prop.categoryColor === 'other') return '#BABCAB'
    }};

    &:checked{

        &:before{
            content:'X';
            font-weight: bold;
            margin-left: 3px;
            margin-bottom:2px;
            color: ${(prop) => {
            if (prop.categoryColor === 'living') return '#D38324';
            if (prop.categoryColor === 'clothes') return '#67C070';
            if (prop.categoryColor === 'sleeping') return '#678AC0';
            if (prop.categoryColor === 'fun') return '#BF67C0'
            if (prop.categoryColor === 'cooking') return '#6E67C0'
            if (prop.categoryColor === 'electronics') return '#C0B267'
            if (prop.categoryColor === 'hygiene') return '#67C0B0'
            if (prop.categoryColor === 'storage') return '#D15933'
            if (prop.categoryColor === 'other') return '#BABCAB'
            }};

        }

    }  

`;
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
    justify-self: end;
   
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
const Collapse = styled.div` 
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
    font-size: 0.8rem;

   
    @media screen and (min-width: 600px){
        margin-left: 1.5rem;
        font-size: 1rem;
      
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
    transition: all .2s ease-in-out;
  
  &:hover {
    transform: scale(1.4);
  }
    
`;
const TrachcanIcon = styled.img`
    height: 1.5rem;
    width: auto;
    align-self:end;
    transition: all .2s ease-in-out;
  
  &:hover {
    transform: scale(1.4);
  }
    
`;


const Accordion = (props) => {


    const { equipmentList, displayDotOrBox, packingList=[], setPackingList, totalWeight, setTotalWeight } = props;
  
    const [expandedItems, setExpandedItems] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false)
    const [displayModal, setDisplayModal] = useState(false)
    const [displayEditEquipment, setDisplayEditEquipment] = useState(false)
    const setAllEquipment = useSetRecoilState(allEquipmentState)
    const [deleteItemId, setDeleteItemId] = useState('')
    const [editItemId, setEditItemId] = useState('')



    useEffect(() => {
        //skapar kopia av allEquipment så att ändringarna inte sker i originallistan
        setExpandedItems(equipmentList.map(equipment => {

            return { ...equipment, isExpanded: false }
        }))

    }, [equipmentList])

    //hanterar open/close av element i accordion
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

    //delete equipment
    const handleDelete = (id) => {

        setDisplayModal(true)
        setDeleteItemId(id)
    }

    async function deleteEquipment(id) {

        setIsDeleting(true)
        try {
            const response = await axios.delete('/api/deleteEquipment', { data: { _id: id } })
            console.log(response)
            getAllEquipment();

        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)
        }
    }

    //get all equipment
    async function getAllEquipment() {

        try {
            const response = await axios.get('/api/allEquipment')
            setAllEquipment(response.data)
            setIsDeleting(false)
        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)
        }
    };

    //edit equipment
    const handleEdit = (id) => {
        setDisplayEditEquipment(true)
        setEditItemId(id)
    }


    // editing packinglists
    const handleChecked = (event) => {
        const newId = event.target.value

        const isIdAlreadyChecked = packingList.find((id) => id === newId)

        if (isIdAlreadyChecked) {
            setPackingList(packingList.filter((id) => id !== newId))

        }
        else {

            setPackingList([...packingList, newId])

        }

    }

    const countTotalWeight = (weight, itemId) => {
        
        const isAlreadyCounted = packingList.find((id) => id === itemId)

        if (isAlreadyCounted) {

           
            setTotalWeight(totalWeight - weight)


        }
        else {

          
            setTotalWeight(totalWeight + weight)

        }


    }

    return (

        <Wrapper>

            {isDeleting && <SpinnerFireLog text={'bränner upp skiten'} />}

            {!isDeleting && <>
                {expandedItems.map((item, index) => {
                    return (

                        <ItemWrapper key={item.equipment + index} >
                            <TopRowWrapper >

                                {displayDotOrBox === 'dot' && <CategoryDot categoryColor={item.category} />}

                                {displayDotOrBox === 'box' && <CheckBox categoryColor={item.category} type='checkbox' value={item._id} onChange={(event) => { handleChecked(event); countTotalWeight(item.weight, item._id) }} checked={packingList.includes(item._id)} />}


                                <Name>{item.equipment}</Name>
                                <Weight>{item.weight}g</Weight>
                                <DropDownArrow src={dropDownArrow} isUpsideDown={item.isExpanded} onClick={() => toggleOpen(item)}></DropDownArrow>
                            </TopRowWrapper>
                            {item.isExpanded &&

                                <Collapse>
                         
                                    <Info>Kategori: {item.category} <br />{item.info}</Info>
                                    <IconWrapper>

                                        <EditIcon src={editIcon} onClick={() => handleEdit(item._id)} />

                                        {displayEditEquipment && (editItemId === item._id) && <EditEquipment setDisplayEditEquipment={setDisplayEditEquipment} equipmentToEdit={item} />}

                                        <TrachcanIcon src={trashcanIcon} onClick={() => handleDelete(item._id)}></TrachcanIcon>

                                        {displayModal && (deleteItemId === item._id) && <AlertModal
                                            setDisplayModal={setDisplayModal}
                                            confirmFunction={() => deleteEquipment(item._id)} />}



                                    </IconWrapper>

                                </Collapse>
                            }

                        </ItemWrapper>

                    )
                })}
            </>}

        </Wrapper>

    )
}


export default Accordion

