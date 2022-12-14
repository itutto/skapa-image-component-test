import React from 'react';
import logo from './logo.svg';
import Image from '@ingka/image';
import '@ingka/image/dist/style.css';
import '@ingka/svg-icon/dist/style.css';
import './App.css';

const startNewDesignImageAlt = 'Some alt text';
const TEST_ID = {
  IMAGE: 'Some-test-id'
}

function App() {

  const [ imageLoaded, setImageLoaded ] = React.useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ backgroundColor: 'black'}}>
     {/*  <Image
          style={{ maxWidth: '3rem'}}
          src="https://media.newyorker.com/photos/5dfab39dde5fcf00086aec77/4:3/w_2271,h_1703,c_limit/Lane-Cats.jpg"
          // src={fallbackImage}
          alt={startNewDesignImageAlt}
          onLoad={() => {
            setImageLoaded(true);
          }}
          onError={() => {
            setImageLoaded(true);
          }}
          data-testid={TEST_ID.IMAGE}
        /> */}
          <Image
          style={{ maxWidth: '3rem'}}
          // loading="eager"
          src="https://media.newyorker.com/photos/5dfab39dde5fcf00086aec77/4:3/w_2271,h_1703,c_limit/Lane-Cats.jpg"
          // src="image-that-doesnt-exist"
          alt={startNewDesignImageAlt}
          onLoad={() => {
            setImageLoaded(true);
          }}
         /*  onError={({ currentTarget }: { currentTarget: HTMLImageElement }) => {
            console.log('onError triggered');
            // eslint-disable-next-line no-param-reassign
            // currentTarget.src = ''; // This is an infinite state update loop as it will trigger the onError again.
            // eslint-disable-next-line no-param-reassign
            // currentTarget.onerror = null; // This does not do what it was meant to do.
            setImageLoaded(true);
          }} */
          data-testid={TEST_ID.IMAGE}
        />
        </div>
        <h3>Is it loaded: { imageLoaded ? 'Yes!' : 'Not yet'}</h3>
        
      </header>
    </div>
  );
}

export default App;
