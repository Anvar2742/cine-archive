import useAuth from "./../hooks/useAuth";

const Catalog = () => {
    const { auth } = useAuth();
    console.log(auth);
    return (
        <div>
            Catalog
        </div>
    );
};

export default Catalog;
