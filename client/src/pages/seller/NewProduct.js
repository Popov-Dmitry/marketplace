import React, {useEffect, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import NewClothesProductDetails from "../../components/product/NewClothesProductDetails";
import NewClothesProduct from "../../components/product/NewClothesProduct";
import {useDispatch, useSelector} from "react-redux";
import {saveProduct} from "../../redux/actions";

const NewProduct = () => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.productReducer);
    const user = useSelector(state => state.userReducer.user);
    const [step, setStep] = useState(1);
    const [productType, setProductType] = useState("");

    useEffect(() => {
        if (Object.keys(product.product).length !== 0) {
            dispatch(saveProduct(productType, product.productDetails,
                product.detailsId, product.product, product.photos, user.id));
        }
    }, [product.product]);

    return (
        <Container>
            {step === 1 &&
                <div>
                    <div className={"mt-4 fs-4 fw-bold"}>Общая информация</div>
                    <Form>
                        <Form.Label className={"mt-2 opacity-95"}>Тип товара</Form.Label>
                        <Form.Select
                            className={"mb-2 border-radius-10 w-25"}
                            value={productType}
                            onChange={e => setProductType(e.target.value)}
                        >
                            <option hidden>Тип товара</option>
                            <option value="CLOTHES">Одежда</option>
                        </Form.Select>
                        {productType === "CLOTHES" &&
                            <NewClothesProductDetails step={step} setStep={setStep}/>
                        }
                    </Form>
                </div>
            }
            {step === 2 && productType === "CLOTHES" &&
                <div>
                    <div className={"mt-4 fs-4 fw-bold"}>Информация о варианте товара</div>
                    <NewClothesProduct/>
                </div>
            }
        </Container>
    );
};

export default NewProduct;