import React from 'react';
import logo from './logo.svg';
import Image from '@ingka/image';
import Choice, { ChoiceItem } from '@ingka/choice';
import Expander from '@ingka/expander';
import '@ingka/button/dist/style.css'
import '@ingka/image/dist/style.css';
import '@ingka/svg-icon/dist/style.css';
import '@ingka/choice/dist/style.css';
import '@ingka/expander/dist/style.css';

import './App.css';


/**This is a setup created to test the collapsing animation features of ChoiceItem and Expander */

function App() {
  return (
    <div className="App">
      <header className="App-header">

  <Choice>
    <ChoiceItem id='ch_1' title='Item 1'>
      <div>
        <h4>Some nested content 1 </h4>
        <p>With a paragraph inside it that should open and close and stuff</p>
      </div>
    </ChoiceItem>
    <ChoiceItem id='ch_2' title='Item 2'>
      <p>
            Dolor ipsum Lorem cupidatat aute aliquip commodo do et eu ex commodo
            non nulla voluptate. Officia elit magna id dolore. Do consectetur
            culpa aliqua eiusmod nostrud deserunt anim irure ipsum velit id
            veniam dolore quis. Id exercitation voluptate ut eiusmod incididunt
            laboris aliqua id excepteur nulla est elit excepteur qui. Ut non
            ipsum in nostrud est id incididunt id cupidatat eu magna. Aute
            deserunt mollit deserunt voluptate esse fugiat anim sit. Consequat
            id ex occaecat reprehenderit velit elit reprehenderit qui ut est
            enim culpa laboris.
        </p>
    </ChoiceItem>
    </Choice>        
    <Expander labelOpen={"Close down"} labelClosed='open up' generic>
      <h4>This is the content</h4>
      <p>That should be revealed!</p>
    </Expander>

       
        
      </header>
    </div>
  );
}

export default App;
