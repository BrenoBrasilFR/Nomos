import { Link } from "react-router-dom"

function Slide(props) {

    var y = false

    const setOpacityRelease = () => {
        y = true
        if (props.location === 'home') return
        var releaseShop = document.querySelector('#releaseShop')
        releaseShop.style.opacity = '1';
    }

    setTimeout(() => {
        if (y === true) { return }
        var loaderRelease = document.querySelector('.loaderRelease')
        loaderRelease.style.display = "block"
    }, 500)

    const slide = {
        display: 'none'
    }

    if (props.location === 'home') {
        return (
            <div className='RSwrapper' >
                {/* <div className="loaderWraper"><div className="loaderRelease"></div></div> */}
                <section id="new-release" data-aos='fade' data-aos-duration="1500" data-aos-offset="0">
                    <button className="release-button prev"><div className="release-img-div"><img src="images/Arrows/arrow2/arrow2.png" alt=""></img></div></button>
                    <button className="release-button next"><div className="release-img-div"><img src="images/Arrows/arrow2/arrow2.png" alt=""></img></div></button>
                    <Link to={'/shop/search?tag=orion_silver_gold'} className="release-item">
                        <div className="new-release-text text-1">
                            <h3>Orion now in silver and gold</h3>
                        </div>
                        <img className="img-1" src="images/orion-silver.jpg" alt="Orion gold" onLoad={setOpacityRelease}></img>
                    </Link>
                    <Link to={'/shop/search?tag=orion_silver_gold'} className="release-item">
                        <div className="new-release-text text-2">
                            <h3>Orion now in silver and gold</h3>
                        </div>
                        <img className="img-2" src="images/orion-gold2.jpg" alt="Orion silver"></img>
                    </Link>
                    <Link to={'/shop/search?tag=orion_silver_gold'} className="release-item">
                        <div className="new-release-text text-3"></div>
                        <img className="img-3" src="images/orion-gold-silver.jpg" alt="Orion gold and silver"></img>
                    </Link>
                </section>
            </div>
        )
    }

    if (props.location === 'shop') {
        return (
            <div className='RSwrapper' style={window.screen.width >= '915' ? {} : slide}>
                {/* <div className="loaderWraper"><div className="loaderRelease"></div></div> */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', opacity: '0' }} id='releaseShop' data-aos='fade'>
                    <section id="new-release" className="releaseShop">
                        <button className="release-button prev shop"><div className="release-img-div"><img src="images/Arrows/arrow2/arrow2.png" alt=""></img></div></button>
                        <button className="release-button next shop"><div className="release-img-div"><img src="images/Arrows/arrow2/arrow2.png" alt=""></img></div></button>
                        <Link to={`/shop/product/${15}`} state={{ from: "shop" }} className="release-item">
                            <div className="new-release-text text-shop">
                                <h3>Orion Silver</h3>
                            </div>
                            <img className="img-1" src="images/orion-silver2.jpg" alt="Orion gold" onLoad={setOpacityRelease}></img>
                        </Link>
                        <Link to={`/shop/product/${14}`} state={{ from: "shop" }} className="release-item">
                            <div className="new-release-text text-shop">
                                <h3>Orion Gold</h3>
                            </div>
                            <img className="img-2" src="images/orion-gold2.jpg" alt="Orion silver"></img>
                        </Link>
                    </section>
                </div>
            </div>

        )
    }
}

export default Slide;