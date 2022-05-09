import React from 'react';

const EmptyCart = () => {
    return (
        <div className={"text-center mt-2"}>
            <div className={"fs-1 fw-bold"}>Корзина пуста</div>
            <div className={"fs-4"}>Добавьте товары, чтобы продолжить</div>
        </div>
    );
};

export default EmptyCart;