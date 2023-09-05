const Money = ({ title }) => {
    return (
        <div className="flex gap-4 mt-4">
            <div>
                <h3 className="text-lg">Budget</h3>
                <p>{title?.budget.toLocaleString()}$</p>
            </div>
            <div>
                <h3 className="text-lg">Revenue</h3>
                <p>{title?.revenue.toLocaleString()}$</p>
            </div>
        </div>
    );
};

export default Money;
