import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


const DropdownContainer = styled.div`
    position:relative;
    margin-left:4rem;
    z-index:2;
    border:1px solid blue;

    &:hover{
        cursor:pointer;
    }

`;
const DropdownHeader = styled.p`
    color:#EFEFEF;
    font-size:1.2rem;
    padding-left:.5rem;
    padding-right:.5rem;

`;
const DropdownListContainer = styled.div`
    position:absolute;
    left:-0.4rem;
    width:110%;
   
`;
const DropdownList = styled.ul`
    background-color: rgba(186, 188, 171, 0.8);
    font-size: .9rem;
    padding-inline-start:0;
    text-align:center;
    border-radius:5px;
`;
const ListItem = styled.li`
    list-style: none;
    margin-bottom: 0.8em;
    padding:0.2rem;
    border-radius:5px;
   
    &:first-child{
      padding-top:1rem;
    }
    &:last-child{
      padding-bottom:1rem;
    }
    
  &:hover{
      background-color:white;
  }

`;

const DropdownMenu=(props)=>{

    const {menuHeadline, links}=props;
    
    //TODO GÖra detta till en helper?
    const ref = useRef();

    const useOutsideClick = (ref) => {
        const handleClick = e => {
          if (ref.current && !ref.current.contains(e.target)) {
            setIsOpen(false);
          }
        };
      
        useEffect(() => {
          document.addEventListener("click", handleClick);
      
          return () => {
            document.removeEventListener("click", handleClick);
          };
        });
      };

    

    useOutsideClick(ref)
    
     
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    // <ListItem key={link} ref={wrapperRef}>{link}</ListItem>

    return(
        <DropdownContainer ref={ref}>
            <DropdownHeader onClick={toggling} >{menuHeadline}</DropdownHeader>
                {isOpen && (
                   
                    <DropdownListContainer>
                        <DropdownList>
                            {links.map((link)=>(
                                <ListItem key={link.text}><Link to={link.link}>{link.text}</Link></ListItem>
                                
                            ))}
                        </DropdownList>
                    </DropdownListContainer>

                    
                    
                )}
               

      </DropdownContainer>
    )


}

export default DropdownMenu