export default function Card({ card }) {
    /*************************** render *****************************/
    return (
        <div className={"flex flex-col p-2 rounded w-[65px] h-[104px] bg-[#9C2B2B]"}>
            {card.hidden ? (
                <div className="border-2 border-double border-white text-white flex items-center justify-center h-full"></div>
            ) : (
                <>
                    <div className="text-white text-lg text-start">
                        {card.name}
                    </div>
                    <div className="text-white text-2xl text-center">
                        {card.suit}
                    </div>
                    <div className="text-white text-lg text-end">
                        {card.name}
                    </div>
                </>
            )}
        </div>
    );
}
