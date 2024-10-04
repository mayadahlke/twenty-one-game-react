export default function Card({ card }) {
    /*************************** render *****************************/
    return (
        <div className={"flex flex-col justify-between p-2 rounded w-[120px] h-[170px] bg-[#9C2B2B]"}>
            {card.hidden ? (
                <div className="border-2 border-double border-white text-white flex items-center justify-center h-full"></div>
            ) : (
                <>
                    <div className="text-white text-5xl text-start">
                        {card.name}
                    </div>
                    <div className="text-white text-5xl text-center">
                        {card.suit}
                    </div>
                    <div className="text-white text-5xl text-end">
                        {card.name}
                    </div>
                </>
            )}
        </div>
    );
}
