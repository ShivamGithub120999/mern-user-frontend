import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsBySlug } from "../../../actions";
import Layout from "../../../components/Layout";
import { generatePublicUrl } from "../../../urlConfig";
// import getParams from "../../utils/getParams";
// import ClothingAndAccessories from "./ClothingAndAccessories";
// import ProductPage from "./ProductPage";
// import ProductStore from "./ProductStore";
import "./style.css";
import Card from "../../../components/UI/Card"
import { MaterialButton } from "../../../components/MaterialUI";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";

/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {
    const product = useSelector(state => state.product);
    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000
    })

    // const priceRange = product.priceRange;
    const dispatch = useDispatch();
    useEffect(() => {
        const { match } = props;
        console.log("match.params.slug", match.params.slug)
        dispatch(getProductsBySlug(match.params.slug))
    }, []);

    console.log("product",product);
    return (
        <>
            {Object.keys(product.productsByPrice).map((key, index) => {
                console.log("key", key);
                return (
                    <>
                        {Object.keys(product.productsByPrice).map((key, index) => {
                            return (
                                <Card
                                    headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
                                    headerRight={
                                        <MaterialButton
                                            title={"VIEW ALL"}
                                            style={{
                                                width: "96px",
                                            }}
                                            bgColor="#2874f0"
                                            fontSize="12px"
                                        />
                                    }
                                    style={{
                                        width: "calc(100% - 40px)",
                                        margin: "20px",
                                    }}
                                >
                                    <div style={{ display: "flex" }}>
                                        {product.productsByPrice[key].map((product) => (
                                            <Link
                                                to={`/${product.slug}/${product._id}/p`}
                                                style={{
                                                    display: "block",
                                                    textDecoration: "none",
                                                    color: "#000",
                                                }}
                                                className="productContainer"
                                            >
                                                <div className="productImgContainer">
                                                    <img src={generatePublicUrl(product.productPictures[0].img)} alt="Preview not Available" />
                                                </div>
                                                <div className="productInfo">
                                                    <div style={{ margin: "10px 0" }}>{product.name}</div>
                                                    <div>
                                                        <Rating value="4.3" />
                                                        &nbsp;&nbsp;
                                                        <span
                                                            style={{
                                                                color: "#777",
                                                                fontWeight: "500",
                                                                fontSize: "12px",
                                                            }}
                                                        >
                                                            (3353)
                                                        </span>
                                                    </div>
                                                    <Price value={product.price} />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </Card>
                            );
                        })}
                    </>
                );

            })}
        </>
    )
};

export default ProductListPage;
