export const getFormatedDate = (dateText) => {
    const monthNum = dateText.substring(
        dateText.indexOf("-") + 1,
        dateText.lastIndexOf("-")
    );
    const dateNum = dateText.substring(
        dateText.lastIndexOf("-") + 1,
        dateText.length
    );
    const date = new Date();
    date.setMonth(+monthNum - 1);
    return (
        dateNum +
        " " +
        date.toLocaleString("en-us", {
            month: "long",
        })
    );
};
