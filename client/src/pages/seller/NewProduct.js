import React, {useEffect, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import ClothesProductDetailsEdit from "../../components/product/ClothesProductDetailsEdit";
import ClothesProductEdit from "../../components/product/ClothesProductEdit";
import {useDispatch, useSelector} from "react-redux";
import {saveProduct} from "../../redux/actions";
import {useHistory} from "react-router-dom";
import {SELLER_PRODUCTS_ROUTE} from "../../utils/consts";

const NewProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const product = useSelector(state => state.productReducer);
    const user = useSelector(state => state.userReducer.user);
    const [step, setStep] = useState(1);
    const [productType, setProductType] = useState("");
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (Object.keys(product.product).length !== 0) {
            dispatch(saveProduct(productType, product.productDetails,
                product.detailsId, product.product, product.photos, user.id));
            if (isDone) {
                history.push(SELLER_PRODUCTS_ROUTE);
            }
        }
    }, [product.product]);

    return (
        <Container>
            {step === 1 &&
                <div>
                    <div className={"mt-4 fs-4 fw-bold"}>Общая информация</div>
                    <Form>
                        <Form.Label className={"mt-2 opacity-95"}>Тип товара <span className={"text-danger"}>*</span></Form.Label>
                        <Form.Select
                            className={"mb-2 border-radius-10 w-25"}
                            value={productType}
                            onChange={e => setProductType(e.target.value)}
                        >
                            <option hidden>Тип товара</option>
                            <option value="CLOTHES">Одежда</option>
                        </Form.Select>
                        {productType === "CLOTHES" &&
                            <ClothesProductDetailsEdit step={step} setStep={setStep}/>
                        }
                    </Form>
                </div>
            }
            {step === 2 && productType === "CLOTHES" &&
                <div>
                    <div className={"mt-4 fs-4 fw-bold"}>Информация о варианте товара</div>
                    <ClothesProductEdit setIsDone={setIsDone}/>
                </div>
            }
        </Container>
    );
};

export default NewProduct;