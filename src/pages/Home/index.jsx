import React, { useRef } from 'react';
import { useState } from 'react';

import ButtonCartCount from '../../components/common/ButtonCartCount';
import Footer from '../../components/common/Footer';
import Banner from '../../components/Home/Banner';
import Menu from '../../components/common/Menu';
import { menuItemsData } from '../../components/common/Menu/data';

import Button from '../../components/common/Button';

const allCategories = ['All', ...new Set(menuItemsData.map(item => item.category))];
console.log(allCategories);
 

const Home = () => {
  const menuRef = useRef();
  const [buttons, setButtons] = useState(allCategories);
  const [menuItem, setMenuItem] = useState(menuItemsData);

  const filter = (button) =>{

    if(button === 'All'){
      setMenuItem(menuItemsData);
      return;
    }

    const filteredData = menuItemsData.filter(item => item.category ===  button);
    setMenuItem(filteredData)
  } 

  const handleScrollMenu = () => {
    menuRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Banner handleScrollMenu={handleScrollMenu} />
      <Button  button={buttons} filter={filter} /> 
      <Menu list={menuItem} ref={menuRef} />
      <Footer />
      <ButtonCartCount />
    </div>
  );
};

export default Home;
