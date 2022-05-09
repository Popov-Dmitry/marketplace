import React, {useEffect} from 'react';
import ProductsList from "../../components/product/ProductsList";
import {Col, Container, Row} from "react-bootstrap";
import SearchPanel from "../../components/SearchPanel";
import {useDispatch} from "react-redux";
import {fetchSearchPanelInfo} from "../../redux/actions";

const Search = () => {
    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchSearchPanelInfo()), [])

    return (
        <Container>
            <Row className={"mt-2"}>
                <Col md={3}>
                    <SearchPanel/>
                </Col>
                <Col md={9}>
                    <ProductsList/>
                </Col>
            </Row>
        </Container>
    );
};

export default Search;