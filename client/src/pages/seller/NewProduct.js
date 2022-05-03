import React, {useState} from 'react';
import {Container, Form} from "react-bootstrap";
import NewClothesProductDetails from "../../components/product/NewClothesProductDetails";
import NewClothesProduct from "../../components/product/NewClothesProduct";

const NewProduct = () => {
    const [step, setStep] = useState(1);
    const [productType, setProductType] = useState("");

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