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

        var scriptHome = document.createElement("script");
        scriptHome.id = 'scriptHome';
        scriptHome.src = "javascript/slideRelease.js";
        scriptHome.defer = true;
        document.head.appendChild(scriptHome);
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
