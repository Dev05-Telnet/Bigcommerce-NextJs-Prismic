import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '@components/features/custom-link';

import { toDecimal } from '@utils/index';

function ProductThree(props) {
    const { product, adClass, toggleWishlist, addToCart, openQuickview, isCat = true } = props;

    // decide if the product is wishlisted
    let isWishlisted;

    const showQuickviewHandler = () => {
        openQuickview(product.path);
    }

    const wishlistHandler = (e) => {
        if (toggleWishlist) {
            toggleWishlist(product);
        }

        e.preventDefault();
        let currentTarget = e.currentTarget;
        currentTarget.classList.add('load-more-overlay', 'loading');

        setTimeout(() => {
            currentTarget.classList.remove('load-more-overlay', 'loading');
        }, 1000);
    }

    const addToCartHandler = (e) => {
        e.preventDefault();
        addToCart({ ...product, qty: 1, price: product.price[0] });
    }

    return (
        <div className={`product product-classic ${adClass} ${product.variants.length > 0 ? 'product-variable' : ''}`}>
            <figure className="product-media">
                <ALink href={`/product${product.path}`}>
                    <LazyLoadImage
                        alt={product.images[0].alt}
                        src={product.images[0].url}
                        threshold={500}
                        effect="opacity"
                        width="300"
                        height="338"
                    />

                    {
                        product.images.length >= 2 ?
                            <LazyLoadImage
                                alt={product.images[1].alt}
                                src={product.images[1].url}
                                threshold={500}
                                width="300"
                                height="338"
                                effect="opacity"
                                wrapperClassName="product-image-hover"
                            />
                            : ""
                    }
                </ALink>

                <div className="product-label-group">
                    {product.is_new ? <label className="product-label label-new">New</label> : ''}
                    {product.is_top ? <label className="product-label label-top">Top</label> : ''}
                    {
                        product.discount > 0 ?
                            product.variants.length === 0 ?
                                <label className="product-label label-sale">{product.discount}% OFF</label>
                                : <label className="product-label label-sale">Sale</label>
                            : ''
                    }
                </div>
            </figure>

            <div className="product-details">
                {
                    isCat ?
                        <div className="product-cat">
                            {
                                product.categories ?
                                    product.categories.map((item, index) => (
                                        <React.Fragment key={item.name + '-' + index}>
                                            <ALink href={{ pathname: '/shop', query: { category: item.path } }}>
                                                {item.name}
                                                {index < product.categories.length - 1 ? ', ' : ""}
                                            </ALink>
                                        </React.Fragment>
                                    )) : ""
                            }
                        </div>
                        : ''
                }

                <h3 className="product-name">
                    <ALink href={`/product${product.path}`}>{product.name}</ALink>
                </h3>

                <div className="product-price">
                    {product.prices?.salePrice ?
                        <>
                            <ins className="new-price">${toDecimal(product.prices.salePrice)}</ins>
                            <del className="old-price">${toDecimal(product.prices.retailPrice)}</del>
                        </>
                        :
                        <>
                            <ins className="new-price">${toDecimal(product.price.value)}</ins>
                            <del className="old-price">${toDecimal(product.price.value * 1.2)}</del>
                        </>
                    }
                    {/* {
                        product.price[ 0 ] !== product.price[ 1 ] ?
                            product.variants.length === 0 || ( product.variants.length > 0 && !product.variants[ 0 ].price ) ?
                                <>
                                    <ins className="new-price">${ toDecimal( product.price[ 0 ] ) }</ins>
                                    <del className="old-price">${ toDecimal( product.price[ 1 ] ) }</del>
                                </>
                                :
                                < del className="new-price">${ toDecimal( product.price[ 0 ] ) } – ${ toDecimal( product.price[ 1 ] ) }</del>
                            : <ins className="new-price">${ toDecimal( product.price[ 0 ] ) }</ins>
                    } */}
                </div>

                {product.reviewSummary &&
                    <div className="ratings-container">
                        <div className="ratings-full">
                            {`${product.reviewSummary.numberOfReviews} ratings`}
                            <span className="ratings" style={{ width: 20 * product.reviewSummary.numberOfReviews + '%' }}></span>
                            <span className="tooltiptext tooltip-top">{toDecimal(product.reviewSummary.summationOfRatings / product.reviewSummary.numberOfReviews)}</span>
                        </div>

                        <ALink href={`/product${product.path}`} className="rating-reviews">( {product.reviews} reviews )</ALink>
                    </div>
                }

                <div className="product-action">
                    {
                        product.variants.length > 0 ?
                            <ALink href={`/product${product.path}`} className="btn-product btn-cart" title="Go to product">
                                <span>Select Options</span>
                            </ALink> :
                            <a href="#" className="btn-product btn-cart" title="Add to cart" onClick={addToCartHandler}>
                                <i className="d-icon-bag"></i><span>Add to cart</span>
                            </a>
                    }
                    <a href="#" className="btn-product-icon btn-wishlist" title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'} onClick={wishlistHandler}>
                        <i className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}></i>
                    </a>
                    <ALink href="#" className="btn-product-icon btn-quickview" title="Quick View" onClick={showQuickviewHandler}><i className="d-icon-search"></i></ALink>
                </div>
            </div>
        </div>
    )
}

export default ProductThree