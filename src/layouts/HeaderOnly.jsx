/* eslint-disable react/prop-types */
import Header from '../components/Header';

function HeaderOnly({ children }) {
    return (
        <>
            <Header></Header>
            {children}
        </>
    );
}

export default HeaderOnly;
