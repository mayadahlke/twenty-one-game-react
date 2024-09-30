export default function Ace({
    setCardScore
}) {
    /*************************** render *****************************/
    return (
        <div className="text-2xl text-center">
            You got and Ace! Would you like to make it worth{" "}
            <button className="ace-btn" onClick={() => setCardScore(1)}>
                1
            </button>{" "}
            or{" "}
            <button className="ace-btn" onClick={() => setCardScore(11)}>
                11
            </button>
            ?
        </div>
    );
}
