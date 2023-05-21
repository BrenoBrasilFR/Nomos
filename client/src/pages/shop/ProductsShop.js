import Product from './Product';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function ProductsShop({ location, param }) {
    const tags = useSelector(state => state.tags)
    const products = useSelector(state => state.products)
    let [selectedProducts, setSelected] = useState([])
    let [menProducts, setMen] = useState([])
    let [womenProducts, setWomen] = useState([])
    let [bestSellers, setBest] = useState([])
    let [unisexProducts, setUnisex] = useState([])
    let [tag, setTag] = useState('')

    useEffect(() => {
        setSelected(products)
    }, [products])

    useEffect(() => {
        let arr1 = []
        let arr2 = []
        let arr3 = []
        let arr4 = []

        tags.forEach(tag => {
            switch (tag.category_id) {
                case 1: arr1.push(products.find(p => p.id === tag.product_id)); break;
                case 2: arr2.push(products.find(p => p.id === tag.product_id)); break;
                case 3: arr3.push(products.find(p => p.id === tag.product_id)); break;
                default:
            }
        })

        arr4 = arr1.filter(product => arr2.find(e => e.id === product.id));

        setMen(arr1)
        setWomen(arr2)
        setBest(arr3)
        setUnisex(arr4)

    }, [tags, products])

    useEffect(() => {
        if (param === undefined) return
        if (param.get("tag") === 'mens') { setSelected(menProducts); setTag('Men\'s watches') }
        if (param.get("tag") === 'womens') { setSelected(womenProducts); setTag('Women\'s watches') }
        if (param.get("tag") === 'unisex') { setSelected(unisexProducts); setTag('Unisex watches') }
        if (param.get("tag") === 'best_sellers') { setSelected(bestSellers); setTag('Best Sellers') }
        if (param.get("tag") === 'orion_silver_gold') { setSelected(products.filter(p => p.id === 14 || p.id === 15)); setTag('Orion Silver and Gold') }
    }, [bestSellers, menProducts, womenProducts, unisexProducts, param, products])

    const categories = {
        flexDirection: 'column',
        marginLeft: '0'
    }

    const sec1 = { padding: '50px 40px 90px', opacity: '0' }

    const sec2 = { padding: '25px 10px 25px', opacity: '0' }

    if (location === 'shop') {
        return (
            <section style={window.screen.width >= '915' ? sec1 : sec2} data-aos='fade' id='productsShop'>
                <h1 style={{ width: 'fit-content', margin: '0px auto', fontSize: '2.1rem', fontWeight: '300' }}>Our Collection</h1>
                <div className='categories' style={window.screen.width >= '915' ? {} : categories}>
                    <h3 style={{ margin: '5px 5px 0 0' }}>Select By Category:&nbsp;&nbsp;</h3>
                    {menProducts.length !== 0 &&
                        womenProducts.length !== 0 &&
                        unisexProducts.length !== 0 &&
                        bestSellers.length !== 0
                        ? <div className='categoriesh4'>
                            <h4 onClick={() => setSelected(menProducts)}>Men's</h4>
                            <h4 onClick={() => setSelected(womenProducts)}>Women's</h4>
                            <h4 onClick={() => setSelected(unisexProducts)}>Unisex</h4>
                            <h4 onClick={() => setSelected(bestSellers)}>Best Sellers</h4>
                            <h4 onClick={() => setSelected(products)}>All</h4>
                        </div>
                        : null}
                </div>
                <div className="productsContainer">
                    {selectedProducts.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </section>
        )
    } else if (location === 'search') {
        return (
            <section style={window.screen.width >= '915' ? sec1 : sec2} data-aos='fade' id='productsShop'>
                {param.get("search_query") !== null
                    ? <h2 className='search-text'>Results for {param.get("search_query")}</h2>
                    : <h2 className='search-text'>{tag}</h2>
                }

                <div className="productsContainer">
                    {param.get("search_query") !== null
                        ? products.filter(product => product.product_name.toLowerCase().includes(param.get("search_query").toLowerCase())).map(prod =>
                            <Product key={prod.id} product={prod} />)
                        : selectedProducts.map(product => (
                            <Product key={product.id} product={product} />))
                    }
                </div>
            </section>
        )
    }
}

export default ProductsShop;