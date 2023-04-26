
function HomeShowcase() {

    const setOpacityHome = () => {
        var showcaseText = document.querySelector('#showcase-main-text')
        var header = document.querySelector('#header')
        showcaseText.style.opacity = '1';
        header.style.opacity = '1';
    }

    return (
        <>
            <section id="showcase-background"></section>
            <section id="showcase">
                <section id="showcase-main">
                    <div id="showcase-main-div">
                        <div id="observed"></div>
                        <div id="showcase-main-text" data-aos="zoom-out" style={{opacity: '0'}}>
                            <img src="images/logo.png" alt="" onLoad={setOpacityHome}></img>
                            <h3>High quality watches with in-house made movement</h3>
                            <h4>A recreation of the oficial Nomos Glashütte website</h4>
                        </div>
                    </div>
                </section>
            </section>
        </>
        
    )
}

export default HomeShowcase;