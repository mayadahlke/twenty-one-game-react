export default function Card({ card, hidden = false }) {
    return (
        <div
            className="flex flex-col bg-[#9C2B2B] p-2 rounded w-[65px] h-[104px]"

        >
            {hidden ? (
                <div className="border-2 border-double border-white h-full"></div>
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
