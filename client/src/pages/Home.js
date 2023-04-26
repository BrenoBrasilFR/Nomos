import Alert from './global/Alert';
import HomeShowcase from './home/HomeShowcase';
import Header from './global/Header';
import Carousel from './home/Carousel';
import OurWatches from './home/OurWatches';
import Slide from './global/Slide';
import Footer from './global/Footer';
import { useEffect } from 'react';

function Home() {

    useEffect(() => {
        var scriptShop1 = document.querySelector('#scriptShop1');
        if (scriptShop1) {
            document.head.removeChild(scriptShop1);
        };

        var scriptHome2 = document.createElement("script");
        scriptHome2.id = 'scriptHome2';
        scriptHome2.src = "javascript/slideRelease.js";
        scriptHome2.defer = true;
        document.head.appendChild(scriptHome2);
    });

    return (
        <>

            <Alert />
            <Header location='home' />
            <HomeShowcase />
            <Carousel />
            <Slide location='home' />
            <OurWatches />
            <Footer />

        </>
    );
};

export default Home;
