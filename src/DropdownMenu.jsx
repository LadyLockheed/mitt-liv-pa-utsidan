import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


const DropdownContainer = styled.div`
    position:relative;
    margin-left:4rem;
    z-index:2;

    &:hover{
      cursor:pointer;
    }

`;
const DropdownHeader = styled.p`
    color:${props => props.theme.white};
    font-size:1.2rem;
    padding-left:.5rem;
    padding-right:.5rem;

`;
const DropdownListContainer = styled.div`
    position:absolute;
    left:-0.4rem;
    width:110%;
    ${'' /* display:block; */}
   
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

const LinkStyled = styled(Link)`
    text-decoration:none;
    color:${props => props.theme.black};
    &.active{
        color:white;
        border-bottom:1px solid white;
    }
    &.selected{
        color:white;
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
            <DropdownHeader onClick={toggling}>{menuHeadline}</DropdownHeader>
                {isOpen && (
                   
                    <DropdownListContainer>
                        <DropdownList>
                            {links.map((link)=>(
                                <ListItem key={link.linkText} onClick={()=>setIsOpen(!isOpen)}>
                                  <LinkStyled to={link.linkAdress}>{link.linkText}</LinkStyled>
                                </ListItem>
                                
                            ))}
                        </DropdownList>
                    </DropdownListContainer>

                    
                    
                )}
               

      </DropdownContainer>
    )


}

export default DropdownMenu