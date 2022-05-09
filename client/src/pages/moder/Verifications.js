import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllSellersInfo} from "../../redux/actions";
import VerificationsList from "../../components/moder/VerificationsList";

const Verifications = () => {
    const dispatch = useDispatch();
    const sellersInfo = useSelector(state => state.moderReducer.sellersInfo);

    useEffect(() => dispatch(fetchAllSellersInfo()), []);

    return (
        <Container>
            <div className={"mt-4 fs-3 fw-bold"}>
                {sellersInfo.length} заяв
                {(sellersInfo.length % 10 === 0 || sellersInfo.length % 10 === 5 ||
                    sellersInfo.length % 10 === 6 || sellersInfo.length % 10 === 7 || sellersInfo.length % 10 === 8 ||
                    sellersInfo.length % 10 === 9 || (sellersInfo.length >= 10 && sellersInfo.length <= 20)) && "ок "}
                {sellersInfo.length % 10 === 1 && (sellersInfo.length < 10 || sellersInfo.length > 20) && "ка "}
                {(sellersInfo.length % 10 === 2 || sellersInfo.length % 10 === 3 || sellersInfo.length % 10 === 4) &&
                    (sellersInfo.length < 10 || sellersInfo.length > 20) && "ки "}
                на верификацию
            </div>
            <VerificationsList/>
        </Container>
    );
};

export default Verifications;